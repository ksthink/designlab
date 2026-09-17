import { existsSync } from 'node:fs';
import apps from '../data/libraries/apps.json';
import schema from '../data/libraries/schema.json';
import sites from '../data/libraries/sites.json';

export type LibraryStatus = 'adopted' | 'recommended' | 'candidate' | 'avoid';
export type Pillar = 'minimalism' | 'pixel-art' | 'retro-color';
export type LibraryKind = 'sites' | 'apps';

export type Library = {
  id: string;
  name: string;
  url: string;
  repo?: string;
  category: string;
  platforms?: ('web' | 'ios' | 'android' | 'desktop' | 'pwa')[];
  license?: string;
  status: LibraryStatus;
  pillars?: Pillar[];
  why: string;
  howToUse?: string;
  caveats?: string;
  usedIn?: string[];
  addedAt?: string;
  /** 메인 화면 썸네일(/v1/ 기준 상대 경로). `npm run shots`로 찍은 파일이 있을 때만 채워진다. 데이터 파일에 직접 쓰지 않는다. */
  thumbnail?: string;
};

/** 우선순위 순서. 라벨은 사람용 한국어. */
export const LIBRARY_STATUS = [
  { id: 'adopted', label: '사용 중', desc: 'metaphr 프로젝트에서 이미 사용한다. 가장 먼저 고른다.' },
  { id: 'recommended', label: '권장', desc: 'metaphr 원칙에 맞아 권장한다.' },
  { id: 'candidate', label: '검토 중', desc: '검토 중이다. 쓰기 전에 사용자에게 묻는다.' },
  { id: 'avoid', label: '쓰지 않음', desc: 'metaphr 원칙과 충돌한다. 쓰지 않는다.' },
] as const satisfies readonly { id: LibraryStatus; label: string; desc: string }[];

export const LIBRARY_KIND = [
  { id: 'sites', title: '사이트', summary: '웹사이트·웹앱 제작용' },
  { id: 'apps', title: '앱', summary: '네이티브 앱·PWA 제작용' },
] as const satisfies readonly { id: LibraryKind; title: string; summary: string }[];

/* ---------- 빌드 시 검증: schema.json의 규칙(required, enum, pattern, type …)을 그대로 적용한다 ---------- */

type S = Record<string, any>;

function check(value: unknown, s: S, at: string, errors: string[]) {
  if (s.$ref) s = (schema as S).$defs[s.$ref.replace('#/$defs/', '')];
  if (s.enum && !s.enum.includes(value)) errors.push(`${at}: ${JSON.stringify(value)}는 허용값(${s.enum.join(', ')})이 아니다`);
  if (s.type === 'string') {
    if (typeof value !== 'string') return void errors.push(`${at}: 문자열이어야 한다`);
    if (s.minLength && value.length < s.minLength) errors.push(`${at}: 비어 있으면 안 된다`);
    if (s.pattern && !new RegExp(s.pattern).test(value)) errors.push(`${at}: 형식 ${s.pattern}에 맞지 않는다`);
  }
  if (s.type === 'array') {
    if (!Array.isArray(value)) return void errors.push(`${at}: 배열이어야 한다`);
    if (s.uniqueItems && new Set(value.map((v) => JSON.stringify(v))).size !== value.length) errors.push(`${at}: 중복 항목`);
    value.forEach((v, i) => s.items && check(v, s.items, `${at}[${i}]`, errors));
  }
  if (s.type === 'object') {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return void errors.push(`${at}: 객체여야 한다`);
    const obj = value as S;
    for (const key of s.required ?? []) if (!(key in obj)) errors.push(`${at}: 필수 필드 '${key}'가 없다`);
    for (const [key, v] of Object.entries(obj)) {
      if (s.properties?.[key]) check(v, s.properties[key], `${at}.${key}`, errors);
      else if (s.additionalProperties === false) errors.push(`${at}: 모르는 필드 '${key}'`);
    }
  }
}

function load(file: string, data: S, kind: LibraryKind): Library[] {
  const errors: string[] = [];
  check(data, schema as S, file, errors);
  if (data.kind !== kind) errors.push(`${file}: kind는 '${kind}'여야 한다`);
  const ids = (data.items ?? []).map((l: Library) => l.id);
  ids.filter((id: string, i: number) => ids.indexOf(id) !== i).forEach((id: string) => errors.push(`${file}: id '${id}' 중복`));
  if (errors.length) throw new Error(`참고 라이브러리 데이터 검증 실패\n- ${errors.join('\n- ')}`);
  const rank = (s: LibraryStatus) => LIBRARY_STATUS.findIndex((x) => x.id === s);
  const shot = (id: string) => `libraries/shots/${kind}-${id}.webp`;
  return [...(data.items as Library[])]
    .map((l) => (existsSync(`public/v1/${shot(l.id)}`) ? { ...l, thumbnail: shot(l.id) } : l))
    .sort((a, b) => rank(a.status) - rank(b.status));
}

export const libraries: { sites: Library[]; apps: Library[] } = {
  sites: load('src/data/libraries/sites.json', sites, 'sites'),
  apps: load('src/data/libraries/apps.json', apps, 'apps'),
};

export const librarySchema = schema;

/** status 순서대로 묶는다. 빈 status는 뺀다. */
export const byStatus = (list: Library[]) =>
  LIBRARY_STATUS.map((s) => ({ ...s, items: list.filter((l) => l.status === s.id) })).filter((g) => g.items.length);
