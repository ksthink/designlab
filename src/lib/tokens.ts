import tokens from '../data/tokens.json';

/** 그룹 이름을 CSS 변수 이름에 넣는 그룹. 나머지(color·layout·pixel·motion·font)는 그룹 이름을 뺀다. */
const PREFIXED = new Set(['size', 'tracking', 'leading', 'opacity']);

export type TokenStatus = 'stable' | 'candidate';
export type Theme = 'light' | 'dark';

export type Token = {
  /** CSS 변수 이름, 예: '--mp-bg'. 테마 토큰은 light/dark 두 항목이 같은 이름을 가진다. */
  name: string;
  /** CSS 값. 참조 토큰은 'var(--mp-palette-paper)' */
  value: string;
  /** 참조를 끝까지 푼 값, 예: '#F5F5F5' */
  resolved: string;
  /** 'color'(palette·theme) | 'font' | 'size' | 'tracking' | 'leading' | 'opacity' | 'layout' | 'pixel' | 'motion' */
  group: string;
  description?: string;
  /** 테마 토큰이면 'light' | 'dark'. 없으면 테마와 무관한 공통 토큰. */
  theme?: Theme;
  /** stable = 제품에 사용 가능, candidate = 시안에서만. $extensions["dev.metaphr"].status (상위 그룹에서 상속) */
  status?: TokenStatus;
  /** 역할(용도), 예: '강조(accent)' */
  role?: string;
  /** 참조 토큰이면 대상 CSS 변수 이름, 예: '--mp-palette-orange' */
  ref?: string;
  /** 그 밖의 $extensions["dev.metaphr"] 값 */
  meta?: Record<string, unknown>;
  /** tokens.json 안의 경로, 예: ['theme', 'dark', 'bg'] */
  path: string[];
  /** DTCG $type (상위 그룹에서 상속) */
  type?: string;
};

type Node = Record<string, any>;
type Ext = { status?: TokenStatus; role?: string; [k: string]: unknown };

export const varName = (path: string[]) => {
  if (path[0] === 'theme') return `--mp-${path.slice(2).join('-')}`;
  return `--mp-${(PREFIXED.has(path[0]) || path.length === 1 ? path : path.slice(1)).join('-')}`;
};

const REF = /^\{(.+)\}$/;
const refName = (value: unknown) => {
  const m = typeof value === 'string' ? value.match(REF) : null;
  return m ? varName(m[1].split('.')) : undefined;
};

function cssValue(value: unknown): string {
  if (Array.isArray(value)) return value.map((f) => (/^[A-Z]|\s/.test(f) ? `"${f}"` : f)).join(', ');
  const ref = refName(value);
  return ref ? `var(${ref})` : String(value);
}

function flatten(node: Node, path: string[] = [], inheritedType?: string, inheritedStatus?: TokenStatus): Token[] {
  const type = node.$type ?? inheritedType;
  const ext: Ext = node.$extensions?.['dev.metaphr'] ?? {};
  // status만 상속한다. role·기타 메타데이터는 토큰 자신의 것만 쓴다.
  const status = ext.status ?? inheritedStatus;
  if ('$value' in node) {
    const { status: _s, role, ...meta } = ext;
    const ref = refName(node.$value);
    const value = cssValue(node.$value);
    const theme = path[0] === 'theme' ? (path[1] as Theme) : undefined;
    return [
      {
        name: varName(path),
        value,
        resolved: value,
        group: path[0] === 'theme' ? 'color' : path[0],
        description: node.$description,
        ...(theme && { theme }),
        ...(status && { status }),
        ...(role && { role }),
        ...(ref && { ref }),
        ...(Object.keys(meta).length && { meta }),
        path,
        type,
      },
    ];
  }
  return Object.entries(node)
    .filter(([key]) => !key.startsWith('$'))
    .flatMap(([key, child]) => flatten(child as Node, [...path, key], type, status));
}

export const tokenList: Token[] = flatten(tokens);

// 참조를 끝까지 풀어 resolved를 채운다. 참조 대상은 테마가 없는 토큰(palette 등)이어야 한다.
const common = new Map(tokenList.filter((t) => !t.theme).map((t) => [t.name, t]));
for (const t of tokenList) {
  let cur = t;
  const seen = new Set<string>();
  while (cur.ref) {
    if (seen.has(cur.name)) throw new Error(`tokens.json: 순환 참조 ${t.name}`);
    seen.add(cur.name);
    const next = common.get(cur.ref);
    if (!next) throw new Error(`tokens.json: ${t.name}의 참조 대상 ${cur.ref}가 없다(테마 없는 토큰만 참조 가능)`);
    cur = next;
  }
  t.resolved = cur.value;
}

const light = tokenList.filter((t) => t.theme === 'light');
const dark = tokenList.filter((t) => t.theme === 'dark');
{
  const a = light.map((t) => t.name).join();
  const b = dark.map((t) => t.name).join();
  if (a !== b) throw new Error('tokens.json: theme.light와 theme.dark의 토큰 이름·순서가 같아야 한다');
}

/** 원시 팔레트(--mp-palette-*). tokens.json의 color.palette에 항목을 추가하면 자동으로 늘어난다. */
export const paletteTokens = () => tokenList.filter((t) => t.path[0] === 'color' && t.path[1] === 'palette');

/** 테마 시맨틱 색의 light/dark 쌍. [{ name: '--mp-bg', description, light: Token, dark: Token }, ...] */
export const themeColors = () =>
  light.map((l, i) => ({ name: l.name, description: l.description, light: l, dark: dark[i] }));

/** 테마와 무관한 토큰 (palette, font, size …). */
export const commonTokens = () => tokenList.filter((t) => !t.theme);

/** 그룹 순서(tokens.json 순서)대로 묶는다. 테마 토큰은 'color' 그룹 안에 light, dark 순으로 들어 있다. */
export const tokenGroups = () => {
  const groups = new Map<string, Token[]>();
  for (const t of tokenList) groups.set(t.group, [...(groups.get(t.group) ?? []), t]);
  return groups;
};

/** 라이트 기준 평면 맵. { '--mp-bg': 'var(--mp-palette-paper)', ... } 다크 값은 tokenMapDark(). */
export const tokenMap = (): Record<string, string> =>
  Object.fromEntries(tokenList.filter((t) => t.theme !== 'dark').map((t) => [t.name, t.value]));
export const tokenMapDark = (): Record<string, string> => Object.fromEntries(dark.map((t) => [t.name, t.value]));

const decl = (list: Token[], indent: string) =>
  list
    .map((t) => `${indent}${t.name}: ${t.value};${t.status === 'candidate' ? ' /* candidate: 시안 전용, 제품 UI 금지 */' : ''}`)
    .join('\n');

export function tokensCss(): string {
  const groups = [...tokenGroups()]
    .map(([group, list]) => [group, list.filter((t) => !t.theme)] as const)
    .filter(([, list]) => list.length)
    .map(([group, list]) => `  /* ${group} */\n${decl(list, '  ')}`)
    .join('\n\n');
  const narrow = tokenList.filter((t) => !t.theme && typeof t.meta?.narrow === 'string');
  const narrowCss = narrow.length
    ? `\n/* 좁은 화면: 글자 크기를 12px 격자 한 단계 아래로 (tokens.json $extensions.dev.metaphr.narrow) */\n@media (max-width: 480px) {\n  :root {\n${narrow.map((t) => `    ${t.name}: ${t.meta!.narrow};`).join('\n')}\n  }\n}\n`
    : '';
  return `/* metaphr design tokens — tokens.json에서 생성됨. 직접 수정하지 말 것. */
/* 테마: 기본 라이트, prefers-color-scheme: dark 자동, [data-theme="light"|"dark"] 수동 지정. */
:root {
${groups}

  /* theme: light (기본) */
${decl(light, '  ')}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
${decl(dark, '    ')}
  }
}

:root[data-theme="dark"] {
${decl(dark, '  ')}
}

:root[data-theme="light"] {
${decl(light, '  ')}
}
${narrowCss}`;
}

export { tokens };

/** WCAG 2 명도 대비. '#RRGGBB'만 받는다. 소수 둘째 자리. */
export function contrast(a: string, b: string): number {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/** 팔레트 색과 라이트 배경·다크 배경 대비. 색을 추가하면 자동으로 계산된다. */
export const palette = () => {
  const bgLight = light.find((t) => t.name === '--mp-bg')!.resolved;
  const bgDark = dark.find((t) => t.name === '--mp-bg')!.resolved;
  return paletteTokens().map((t) => ({
    ...t,
    contrastOnLight: contrast(t.resolved, bgLight),
    contrastOnDark: contrast(t.resolved, bgDark),
  }));
};

/** 팔레트 모든 쌍의 대비. [{ a: '--mp-palette-slate', b: '--mp-palette-paper', ratio: 10.9 }, ...] */
export const contrastPairs = () => {
  const list = paletteTokens();
  return list.flatMap((a, i) =>
    list.slice(i + 1).map((b) => ({ a: a.name, b: b.name, ratio: contrast(a.resolved, b.resolved) })),
  );
};

/** ink를 opacity로 옅게 한 글자가 bg 위에서 갖는 실효 대비. 테마마다 계산한다. */
export const opacityContrast = () => {
  const hex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  const blend = (fg: string, bg: string, a: number) =>
    '#' +
    [1, 3, 5]
      .map((i) => hex(parseInt(fg.slice(i, i + 2), 16) * a + parseInt(bg.slice(i, i + 2), 16) * (1 - a)))
      .join('');
  const pair = (list: Token[]) => ({
    bg: list.find((t) => t.name === '--mp-bg')!.resolved,
    ink: list.find((t) => t.name === '--mp-ink')!.resolved,
  });
  const l = pair(light);
  const d = pair(dark);
  return tokenList
    .filter((t) => t.group === 'opacity')
    .map((t) => {
      const a = Number(t.value);
      return {
        ...t,
        contrastLight: contrast(blend(l.ink, l.bg, a), l.bg),
        contrastDark: contrast(blend(d.ink, d.bg, a), d.bg),
      };
    });
};
