import { getCollection } from 'astro:content';
import { marked } from 'marked';
import categoryData from '../data/element-categories.json';
import { abs, url } from './paths';
import { tokenList } from './tokens';

export type Platform = 'web' | 'ios' | 'android';
export type ElementStatus = 'extracted' | 'proposed';
export type ElementPillar = 'minimalism' | 'pixel-art' | 'retro-color';

export type ElementCategory = { id: string; name: string; nameEn: string; summary: string; order: string[] };

export type DesignElement = {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  summary: string;
  aliases: string[];
  platforms: Platform[];
  status: ElementStatus;
  source?: string;
  pillars: ElementPillar[];
  tokens: string[];
  effects: string[];
  related: string[];
  /** frontmatter를 뺀 마크다운 본문 */
  body: string;
  /** 저장소 기준 원본 경로, 예: src/content/elements/actions/button.md */
  file: string;
};

export const ELEMENT_STATUS = [
  { id: 'extracted', label: '추출', desc: 'metaphr.dev·기존 작업에서 추출한 요소' },
  { id: 'proposed', label: '제안', desc: 'metaphr 원칙으로 새로 만든 제안안' },
] as const satisfies readonly { id: ElementStatus; label: string; desc: string }[];

/** 본문 섹션 제목과 순서. optional은 생략 가능. */
export const ELEMENT_SECTIONS = [
  { title: '용도', optional: false },
  { title: '생김새', optional: false },
  { title: '상태', optional: true },
  { title: '동작', optional: true },
  { title: '데모', optional: false },
  { title: '코드', optional: false },
  { title: '앱', optional: true },
  { title: '해야 할 것 / 하지 말 것', optional: false },
] as const;

export const elementCategories: ElementCategory[] = categoryData.categories;

/** AI용 문서(/elements/<id>.md)는 자세히 쓴다. 본문이 이보다 짧으면 경고. */
const MIN_BODY_LINES = 60;

const STRICT = (globalThis as any).process?.env?.ELEMENTS_STRICT === '1';

/* ---------- 본문 파싱 ---------- */

type Block = { lang: string; info: string; code: string; section: string };

/** 코드 펜스 밖의 `## 제목` 기준으로 나눈다. */
function parse(body: string): { sections: [string, string][]; blocks: Block[]; prose: string } {
  const sections: [string, string][] = [];
  const blocks: Block[] = [];
  let title = '';
  let buf: string[] = [];
  let fence: { marker: string; info: string; lines: string[] } | null = null;
  const prose: string[] = [];
  const flush = () => {
    if (title || buf.join('').trim()) sections.push([title, buf.join('\n').trim()]);
  };
  for (const line of body.split('\n')) {
    if (fence) {
      buf.push(line);
      if (line.trim().startsWith(fence.marker) && line.trim().replace(/`+|~+/, '') === '') {
        const [lang = ''] = fence.info.split(/\s+/);
        blocks.push({ lang, info: fence.info, code: fence.lines.join('\n'), section: title });
        fence = null;
      } else fence.lines.push(line);
      continue;
    }
    const open = line.match(/^\s*(```+|~~~+)\s*(.*)$/);
    if (open) {
      fence = { marker: open[1], info: open[2].trim(), lines: [] };
      buf.push(line);
      continue;
    }
    const h = line.match(/^## (.+?)\s*$/);
    if (h) {
      flush();
      title = h[1];
      buf = [];
      continue;
    }
    buf.push(line);
    prose.push(line.replace(/`[^`]*`/g, ''));
  }
  flush();
  return { sections, blocks, prose: prose.join('\n') };
}

/* ---------- 불러오기 + 검증 ---------- */

const entries = await getCollection('elements');

const categoryIds = new Set(elementCategories.map((c) => c.id));
const tokenNames = new Set(tokenList.map((t) => t.name));

const errors: string[] = [];
const warnings: string[] = [];

const raw: DesignElement[] = entries.map((e) => {
  const file = e.filePath ?? `src/content/elements/${e.id}.md`;
  return { ...(e.data as Omit<DesignElement, 'body' | 'file'>), body: e.body ?? '', file };
});

const byId = new Map<string, DesignElement>();
for (const el of raw) {
  const at = el.file;
  const parts = at.split('/');
  const base = parts.at(-1)!.replace(/\.md$/, '');
  const folder = parts.at(-2);
  if (el.id !== base) errors.push(`${at}: id '${el.id}'가 파일 이름 '${base}'와 다르다`);
  if (folder !== el.category) errors.push(`${at}: category '${el.category}'가 폴더 '${folder}'와 다르다`);
  if (byId.has(el.id)) errors.push(`${at}: id '${el.id}' 중복 (${byId.get(el.id)!.file})`);
  if (categoryIds.has(el.id)) errors.push(`${at}: id '${el.id}'가 분류 id와 겹친다 (/elements/${el.id}.md 충돌)`);
  byId.set(el.id, el);
}

for (const el of raw) {
  const at = el.file;
  const warn = (m: string) => warnings.push(`${at}: ${m}`);

  if (el.status === 'proposed' && el.source) warn('proposed 요소에는 source를 쓰지 않는다');
  for (const t of el.tokens) if (!tokenNames.has(t)) errors.push(`${at}: 토큰 '${t}'가 tokens.css에 없다`);
  for (const r of el.related) {
    if (r === el.id) warn(`related에 자기 자신 '${r}'`);
    else if (!byId.has(r)) warn(`related '${r}' 요소가 아직 없다`);
  }
  for (const f of el.effects) {
    const target = byId.get(f);
    if (!target) warn(`effects '${f}' 요소가 아직 없다`);
    else if (target.category !== 'effects') warn(`effects '${f}'는 effects 분류가 아니다 (${target.category})`);
  }

  const { sections, blocks, prose } = parse(el.body);
  const lines = el.body.trim().split('\n').length;
  if (lines < MIN_BODY_LINES) warn(`본문 ${lines}줄 — AI용 문서로 너무 얇다 (${MIN_BODY_LINES}줄 이상)`);
  const titles = sections.map(([t]) => t).filter(Boolean);
  if (sections[0] && !sections[0][0] && sections[0][1]) warn('첫 ## 섹션 앞에 본문이 있다');
  const known = ELEMENT_SECTIONS.map((s) => s.title) as string[];
  for (const t of titles) if (!known.includes(t)) warn(`모르는 섹션 '## ${t}'`);
  const dup = titles.filter((t, i) => titles.indexOf(t) !== i);
  if (dup.length) warn(`섹션 중복: ${[...new Set(dup)].join(', ')}`);
  const order = titles.filter((t) => known.includes(t)).map((t) => known.indexOf(t));
  if (order.some((n, i) => i > 0 && n < order[i - 1])) warn(`섹션 순서가 다르다: ${titles.join(' → ')}`);
  for (const s of ELEMENT_SECTIONS) if (!s.optional && !titles.includes(s.title)) warn(`필수 섹션 '## ${s.title}'이 없다`);

  const demos = blocks.filter((b) => b.lang === 'html' && /\bdemo\b/.test(b.info));
  if (demos.length !== 1) errors.push(`${at}: \`\`\`html demo 블록은 정확히 하나여야 한다 (${demos.length}개)`);
  if (!blocks.some((b) => b.lang === 'css' && b.section === '코드')) errors.push(`${at}: '## 코드'에 \`\`\`css 블록이 없다`);

  const app = el.platforms.some((p) => p !== 'web');
  if (app && !titles.includes('앱')) warn("platforms에 ios/android가 있는데 '## 앱' 섹션이 없다");
  if (!app && titles.includes('앱')) warn("platforms가 web뿐인데 '## 앱' 섹션이 있다");
  if (/~/.test(prose)) warn('범위에 `~`를 썼다 (– en dash를 쓴다)');
}

const fatal = STRICT ? [...errors, ...warnings] : errors;
if (!(globalThis as any).__mpElementsReported) {
  (globalThis as any).__mpElementsReported = true;
  const count = elementCategories.map((c) => `${c.id} ${raw.filter((e) => e.category === c.id).length}`).join(' · ');
  console.log(
    `[elements] ${raw.length}개 (${count}) — 오류 ${errors.length}, 경고 ${warnings.length}${STRICT ? ' (ELEMENTS_STRICT=1)' : ''}`,
  );
  if (warnings.length && !STRICT) {
    // 작성 중에는 아직 없는 요소 참조가 많으므로 대상 id별로 묶어 한 줄로 보여 준다.
    const missing = new Map<string, number>();
    const other: string[] = [];
    for (const w of warnings) {
      const m = w.match(/: (?:related|effects) '(.+)' 요소가 아직 없다$/);
      if (m) missing.set(m[1], (missing.get(m[1]) ?? 0) + 1);
      else other.push(w);
    }
    if (missing.size)
      console.warn(`[elements] 아직 없는 요소 참조 ${missing.size}개: ${[...missing].map(([id, n]) => `${id}×${n}`).join(', ')}`);
    if (other.length) console.warn(`[elements] 경고\n- ${other.join('\n- ')}`);
  }
}
if (fatal.length) throw new Error(`디자인 요소 검증 실패\n- ${fatal.join('\n- ')}`);

/* ---------- 공개 API ---------- */

const catIndex = (id: string) => elementCategories.findIndex((c) => c.id === id);
const orderIndex = (el: DesignElement) => {
  const i = elementCategories[catIndex(el.category)].order.indexOf(el.id);
  return i < 0 ? Number.MAX_SAFE_INTEGER : i;
};

/** 분류 순서 → 분류 안 기본 순서(element-categories.json order) → 이름 순 */
export const elements: DesignElement[] = [...raw].sort(
  (a, b) => catIndex(a.category) - catIndex(b.category) || orderIndex(a) - orderIndex(b) || a.name.localeCompare(b.name, 'ko'),
);

export const getElement = (id: string): DesignElement | undefined => byId.get(id);

export const getElementCategory = (id: string): ElementCategory | undefined => elementCategories.find((c) => c.id === id);

/** 분류 순서대로, 요소가 있는 분류만 */
export const elementsByCategory = (): (ElementCategory & { elements: DesignElement[] })[] =>
  elementCategories
    .map((c) => ({ ...c, elements: elements.filter((e) => e.category === c.id) }))
    .filter((c) => c.elements.length);

/** 데모 HTML(```html demo)과 코드 섹션의 CSS·JS(여러 블록이면 이어 붙임) */
export function elementDemo(el: DesignElement): { html: string; css: string; js?: string } {
  const { blocks } = parse(el.body);
  const html = blocks.find((b) => b.lang === 'html' && /\bdemo\b/.test(b.info))?.code ?? '';
  const code = blocks.filter((b) => b.section === '코드');
  const css = code.filter((b) => b.lang === 'css').map((b) => b.code).join('\n\n');
  const js = code.filter((b) => b.lang === 'js' || b.lang === 'javascript').map((b) => b.code).join('\n\n');
  return { html, css, ...(js && { js }) };
}

/** 섹션 제목 → 섹션 마크다운(제목 줄 제외). 본문 순서 유지. */
export const elementSections = (el: DesignElement): Record<string, string> =>
  Object.fromEntries(parse(el.body).sections.filter(([t]) => t));

export type ElementCode = { lang: string; info: string; code: string };
export type ElementSectionHtml = { title: string; html: string; code: ElementCode[] };

/**
 * 사람용 페이지를 위한 섹션 목록. 본문 순서 유지.
 * html = 코드 펜스를 뺀 마크다운을 HTML로 렌더링한 것, code = 그 섹션의 코드 블록(```html demo·css·js·swift …).
 */
export const elementSectionsHtml = (el: DesignElement): ElementSectionHtml[] => {
  const { blocks } = parse(el.body);
  return parse(el.body)
    .sections.filter(([t]) => t)
    .map(([title, md]) => ({
      title,
      html: (marked.parse(md.replace(/^\s*(```+|~~~+)[^\n]*\n[\s\S]*?^\s*\1\s*$/gm, '').trim(), { async: false }) as string).trim(),
      code: blocks.filter((b) => b.section === title).map(({ lang, info, code }) => ({ lang, info, code })),
    }));
};

/** 사람용 페이지 경로. absolute=true면 절대 URL. */
export const elementUrl = (id: string, absolute = false) => (absolute ? abs : url)(`/elements/${id}`);

/** AI용 마크다운 경로. absolute=true면 절대 URL. */
export const elementMarkdownUrl = (id: string, absolute = false) => (absolute ? abs : url)(`/elements/${id}.md`);

/** 클라이언트 검색용 최소 색인 */
export const searchIndex = elements.map(({ id, name, nameEn, aliases, category, summary }) => ({
  id,
  name,
  nameEn,
  aliases,
  category,
  summary,
}));

export const elementValidation = { errors: [...errors], warnings: [...warnings], strict: STRICT };
