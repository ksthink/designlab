import philosophyRaw from '../content/philosophy.md?raw';
import fonts from '../data/fonts.json';
import icons from '../data/icons.json';
import logos from '../data/logos.json';
import { byStatus, LIBRARY_KIND, LIBRARY_STATUS, libraries, librarySchema, type Library, type LibraryKind } from './libraries';
import { elementCategories, elementMarkdownUrl, elements, elementsByCategory, elementUrl, ELEMENT_STATUS, getElement, getElementCategory, type DesignElement } from './elements';
import { abs, asset, url, VERSION } from './paths';
import { contrastPairs, opacityContrast, palette, themeColors, tokenGroups, tokenList, tokenMap, tokenMapDark } from './tokens';

export { abs, asset, url, VERSION };
export { elementCategories, elements, type DesignElement };
export { LIBRARY_KIND, LIBRARY_STATUS, libraries, type Library, type LibraryKind };

export const STATUS = 'draft 0.1';

/** 디자인 원본. design_lab은 이 사이트의 디자인을 문서화한다. */
export const ORIGIN = 'https://metaphr.dev';

/** design_lab 공식 주소. 실제 URL은 SITE_URL/BASE_PATH 빌드 설정을 따른다(abs 참고). */
export const OFFICIAL_URL = 'https://design.metaphr.dev';

/** 사이트의 모든 문서. 사람용 페이지(/slug)와 AI용 마크다운(/slug.md)이 같은 목록에서 만들어진다. */
export const pages = [
  { slug: 'elements', title: '요소', summary: '버튼·메뉴·입력·카드·이펙트 등 디자인 요소를 분류별로. 요소 하나 = 문서 하나(데모·CSS·앱 적용)' },
  { slug: 'philosophy', title: '디자인 철학', summary: '미니멀리즘 · 픽셀아트 · 레트로 컬러, 세 기둥' },
  { slug: 'tokens', title: '디자인 토큰', summary: '--mp-* CSS 변수 전체: 레트로 팔레트(상태·대비), 크기, 자간, 행간, 투명도, 레이아웃, 픽셀, 모션' },
  { slug: 'fonts', title: '폰트', summary: '유일한 브랜드 서체 Mulmaru, @font-face, 히어로 서브셋 기법' },
  { slug: 'logos', title: '로고와 아이콘', summary: '워드마크 metaphr.svg, 스크롤 힌트 down.svg, 40×40 픽셀 아이콘과 정수 배율 규칙' },
  { slug: 'ai', title: 'AI로 만들 때', summary: '세 기둥별 규칙, 붙여넣을 지시문, 적용 순서, 요소 문서 찾는 법, 자주 틀리는 것' },
  { slug: 'libraries', title: '참고 라이브러리', summary: '사이트·앱을 만들 때 고를 라이브러리 목록 (사용 중·권장·검토 중·쓰지 않음)' },
] as const;

export type Slug = (typeof pages)[number]['slug'];

export const endpoints = [
  { path: `/${VERSION}/elements.json`, desc: '디자인 요소 색인: 분류, 요소별 이름·aliases·플랫폼·상태·이펙트·관련 요소·문서 URL (= /elements.json)' },
  { path: `/${VERSION}/tokens.css`, desc: ':root에 --mp-* CSS 변수 전체를 정의. 가장 먼저 import' },
  { path: `/${VERSION}/fonts.css`, desc: 'Mulmaru @font-face (woff2, weight 400, font-display: swap)' },
  { path: `/${VERSION}/tokens.json`, desc: 'W3C DTCG 형식 원본 토큰' },
  { path: `/${VERSION}/fonts.json`, desc: '서체 정보, 라이선스, 사용 규칙, 히어로 서브셋 기법' },
  { path: `/${VERSION}/logos.json`, desc: '로고 파일(metaphr.svg, down.svg), 표시 크기, 사용 규칙, 아이콘 목록' },
  { path: `/${VERSION}/libraries.json`, desc: '참고 라이브러리 전체 (sites + apps)' },
  { path: `/${VERSION}/libraries/sites.json`, desc: '사이트 제작용 참고 라이브러리' },
  { path: `/${VERSION}/libraries/apps.json`, desc: '앱 제작용 참고 라이브러리' },
  { path: `/${VERSION}/libraries.schema.json`, desc: '참고 라이브러리 항목의 JSON Schema' },
  { path: `/${VERSION}/manifest.json`, desc: '세 기둥·문서·자원·토큰 맵·팔레트·폰트·로고·아이콘·라이브러리의 기계용 색인' },
];

function table(head: string[], rows: (string | number)[][]): string {
  return [
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.map((c) => String(c).replace(/\|/g, '\\|').replace(/\n/g, ' ')).join(' | ')} |`),
  ].join('\n');
}

const GROUP_TITLE: Record<string, string> = {
  color: '색 (color)',
  font: '서체 (font)',
  size: '글자 크기 (size)',
  tracking: '자간 (tracking)',
  leading: '행간 (leading)',
  opacity: '투명도 (opacity)',
  layout: '레이아웃 (layout)',
  pixel: '픽셀·선 (pixel)',
  motion: '모션 (motion)',
};

/** 로고 JSON 속 html 예시의 /v1/ 경로를 절대 URL로 바꾼다. */
const absHtml = (html: string) => html.replace(/(["(])\/v1\//g, (_, q) => `${q}${abs(`/${VERSION}/`)}`);

export const fontsCss = () => `/* metaphr 브랜드 서체 — Mulmaru (${fonts.brand.license.name}, ${fonts.brand.license.copyright}, ${fonts.brand.license.source}) */
@font-face {
  font-family: "${fonts.brand.family}";
  src: url("${asset(fonts.brand.file)}") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;

export const fontsData = () => ({
  ...fonts,
  brand: { ...fonts.brand, url: asset(fonts.brand.file), css: abs(`/${VERSION}/fonts.css`) },
});

export const logosData = () => ({
  ...logos,
  logos: logos.logos.map((l: any) => ({
    ...l,
    url: asset(l.file),
    html: absHtml(l.html),
    ...(l.variants && {
      variants: Object.fromEntries(Object.entries(l.variants as Record<string, string>).map(([k, f]) => [k, asset(f)])),
    }),
    ...(l.themeSwitch && {
      themeSwitch: { ...l.themeSwitch, html: absHtml(l.themeSwitch.html), picture: absHtml(l.themeSwitch.picture) },
    }),
  })),
  icons: iconsData(),
});

export const iconsData = () => ({
  ...icons,
  icons: icons.icons.map((i) => ({ ...i, url: asset(i.file) })),
});

/** ai.md의 옛 레시피 번호 → 옮겨 간 요소 문서 */
const RECIPE_MAP: [string, string[]][] = [
  ['0. 기반', ['theme', 'typography', 'spacing-layout']],
  ['1. 글자 위계', ['typography']],
  ['2. 카드', ['card']],
  ['3. 배지', ['badge']],
  ['4. 버튼 (잉크/배경 반전)', ['button', 'invert-hover']],
  ['5. 헤어라인 구분선·링크', ['divider', 'link', 'back-link', 'footer']],
  ['6. 모눈 썸네일', ['grid-thumbnail']],
  ['7. 픽셀 아이콘', ['pixel-icon']],
  ['8. 점 인디케이터', ['page-indicator']],
  ['9. 깜빡이는 ■ 커서', ['caret']],
  ['10. 숨쉬기(float)·등장', ['float', 'reveal']],
  ['11. fx-fill 호버', ['fx-fill']],
  ['12. 움직임 줄이기', ['reduced-motion']],
  ['13. 강조(orange)와 보조(teal)', ['color']],
  ['14. 테마별 이미지', ['dark-images']],
];

const IMPORTS = () => `@import url("${abs(`/${VERSION}/tokens.css`)}");
@import url("${abs(`/${VERSION}/fonts.css`)}");`;

/** 요소 문서 끝에 붙는 공통 규칙. 요소 문서 하나만 읽어도 지켜야 할 요소 간 규칙이 빠지지 않게 한다. */
const commonRules = () => `## 공통 규칙 (모든 요소)

\`\`\`css
${IMPORTS()}
\`\`\`

- 세 기둥: 미니멀리즘 · 픽셀아트 · 레트로 컬러. 서체는 Mulmaru(\`var(--mp-font)\`) 하나, 굵기 400만, 기울임 없음.
- 값은 \`--mp-*\` 변수만. 등록되지 않은 색·크기를 만들지 않는다. \`#FFF\`·\`#000\` 금지.
- 선은 1px \`--mp-line\`, 모서리 직각(radius 0), 그림자·그라데이션·blur 없음.
- 글자 위계는 색이 아니라 opacity. 필수 정보(본문·버튼·링크 라벨)는 .7 이상.
- 상호작용은 잉크/배경 반전 또는 opacity → 1. 호버로 다른 색이 되지 않는다.
- 강조 orange(\`--mp-accent\`)는 **화면 전체에서 하나**. 여러 요소를 조합하면 강조를 하나만 남긴다. 라이트에서 orange·teal 글자 금지, 강조 면 위 글자는 slate.
- 라이트/다크 두 테마를 시맨틱 변수(\`--mp-bg\`, \`--mp-ink\` …)로 자동 대응한다.
- 모션은 숨쉬기(ease-in-out 느리게) 또는 계단(\`steps()\`). \`prefers-reduced-motion: reduce\`면 정지.
- 앱(iOS/Android)도 같은 원칙. OS가 강제하는 요소만 예외.
- 규칙이 요구와 충돌하면 임의로 판단하지 말고 사용자에게 묻는다.

전체 철학: ${abs('/philosophy.md')} · 요소 색인: ${abs('/elements.json')} · 토큰: ${abs('/tokens.md')}`;

const PLATFORM_LABEL: Record<string, string> = { web: '웹', ios: 'iOS', android: 'Android' };
const statusLabel = (s: string) => ELEMENT_STATUS.find((x) => x.id === s)!.label;
const elLink = (id: string) => (getElement(id) ? `[${id}](${elementMarkdownUrl(id, true)})` : `${id}(준비 중)`);
const elLine = (e: DesignElement, aliasCount = 4) =>
  `- ${e.id} — ${e.name} — ${e.aliases.slice(0, aliasCount).join(', ')} — ${elementMarkdownUrl(e.id, true)}`;

/** /elements/<id>.md */
export function elementMarkdown(el: DesignElement): string {
  const cat = getElementCategory(el.category)!;
  const meta = [
    `- 분류: ${cat.name} (\`${cat.id}\`) · 상태: ${statusLabel(el.status)} (\`${el.status}\`)${el.source ? ` · 출처: ${el.source}` : ''}`,
    `- 플랫폼: ${el.platforms.map((p) => PLATFORM_LABEL[p]).join(', ')} · 기둥: ${el.pillars.map((p) => PILLAR_TITLE[p]).join(', ') || '없음'}`,
    `- 검색어: ${el.aliases.join(', ')}`,
    el.tokens.length && `- 토큰: ${el.tokens.map((t) => `\`${t}\``).join(', ')}`,
    el.effects.length && `- 이펙트(함께 읽기): ${el.effects.map(elLink).join(', ')}`,
    el.related.length && `- 관련 요소: ${el.related.map(elLink).join(', ')}`,
    `- 사람용 데모: ${elementUrl(el.id, true)}`,
  ].filter(Boolean);
  return `# ${el.name} (${el.nameEn}) — \`${el.id}\`

> ${el.summary}

${meta.join('\n')}

${el.body.trim()}

---

${commonRules()}
`;
}

/** /elements/<category>.md */
export function categoryMarkdown(id: string): string {
  const cat = getElementCategory(id)!;
  const list = elements.filter((e) => e.category === id);
  return `# 요소 — ${cat.name} (${cat.nameEn})

> ${cat.summary}

요소 ${list.length}개. 요청에 맞는 요소 문서만 골라 읽는다. 전체 색인: ${abs('/elements.json')}

${list.length ? list.map((e) => `- [${e.name} \`${e.id}\`](${elementMarkdownUrl(e.id, true)}) (${statusLabel(e.status)}): ${e.summary}`).join('\n') : '아직 등록된 요소가 없다.'}
`;
}

const PICK_STEPS = () => [
  '요청에서 요소를 찾는다. 예: "메뉴 버튼 모양과 이펙트" → 메뉴, 버튼, 호버 이펙트.',
  '아래 목록(또는 ' + abs('/elements.json') + ')의 이름·aliases로 요소 id를 고른다.',
  '고른 요소의 문서 `/elements/<id>.md`만 읽는다. 전체 문서를 다 읽을 필요는 없다.',
  '문서의 이펙트(effects)·관련 요소(related) 중 요청에 필요한 것을 따라가 읽는다.',
  '문서 끝의 공통 규칙(세 기둥, 토큰 import, 화면당 강조 하나)을 확인하고 적용한다.',
];

/** /elements.json, /v1/elements.json */
export const elementsIndex = () => ({
  version: VERSION,
  status: STATUS,
  llms: abs('/llms.txt'),
  statuses: ELEMENT_STATUS,
  categories: elementCategories.map(({ id, name, nameEn, summary }) => ({ id, name, nameEn, summary, markdown: abs(`/elements/${id}.md`) })),
  elements: elements.map((e) => ({
    id: e.id,
    name: e.name,
    nameEn: e.nameEn,
    category: e.category,
    summary: e.summary,
    aliases: e.aliases,
    platforms: e.platforms,
    status: e.status,
    pillars: e.pillars,
    effects: e.effects,
    related: e.related,
    url: elementUrl(e.id, true),
    markdown: elementMarkdownUrl(e.id, true),
  })),
});

type PillarId = 'minimalism' | 'pixel-art' | 'retro-color';

/** 디자인의 세 기둥. 모든 규칙은 이 셋 중 하나에 속한다. */
export const PILLARS: { id: PillarId; title: string; en: string; summary: string; rules: string[] }[] = [
  {
    id: 'minimalism',
    title: '미니멀리즘',
    en: 'Minimalism',
    summary: '빼고 덜어낸다. 넓은 여백, 서체 하나, 굵기 하나, 투명도 위계, 1px 헤어라인, 장식 없음.',
    rules: [
      '여백을 넓게: 섹션 세로 padding `--mp-section` `clamp(2.5rem, 8vh, 5rem)` – `--mp-section-lg` `clamp(4rem, 12vh, 9rem)`, 좌우 `--mp-gutter`, 목록 폭 `--mp-width-list` 1180px, 읽기 폭 `--mp-width-read` 760px, 문단 폭 `--mp-width-para` 30em.',
      '글자 크기는 `--mp-size-*` 10단계만, 같은 이름의 `--mp-tracking-*`와 짝. 모든 단계는 Mulmaru 12px 격자의 정수배(12·24·36·48·72px). 본문 행간 `--mp-leading-body` 2.1, 카드 설명 1.85, h1 1.35.',
      '굵기 400 하나. `font-weight` 500 이상·`font-style: italic` 금지. 위계는 크기·자간·투명도로.',
      '글자는 모두 opacity 0.7 이상(라이트 4.53:1, 다크 6.24:1 이상). 0.5(`--mp-opacity-muted`)는 비활성 요소 전용.',
      '글자 위계는 색이 아니라 `opacity`: 본문 0.85 · 브랜드 0.8 · 푸터 링크 0.75 · 보조·노트 0.7 · 상단 링크 0.7 · 메타/배지 0.7 · kicker/커서 0.7 · 저작권 0.7 · 비활성 0.5. 1× 글자끼리의 위계는 자간이 맡는다. 호버 시 1.',
      '선은 1px `--mp-line`(ink 알파 0.16), 호버 `--mp-line-strong` 0.45, 버튼·입력 칸 `--mp-line-button` 0.55(조작 요소 경계 3:1 이상).',
      '`border-radius: 0`, `box-shadow`·`text-shadow`·장식 그라데이션·`backdrop-filter` 없음.',
      '라이트/다크 두 테마를 모두 지원한다: `prefers-color-scheme` 자동 + `[data-theme="light"|"dark"]` 수동. 색은 항상 시맨틱 변수(`--mp-bg`, `--mp-ink` …)로 써서 테마가 저절로 바뀌게 한다.',
      '앱(iOS/Android)도 같은 원칙(직각, 굵기 400, 그림자 없음, 같은 팔레트). 예외는 OS가 강제하는 요소(시스템 시트, 앱 아이콘 마스크, 시스템 컨트롤)뿐이다.',
      '상호작용은 잉크/배경 반전(버튼 `--mp-duration-hover` 0.25s ease) 또는 opacity → 1. 다른 색으로 바뀌는 호버 없음.',
      '숨쉬기 모션: ±2.5–5.5px, 3.4–5.8s `ease-in-out infinite alternate`, 요소마다 위상 다르게. 등장은 opacity + translateY(14px) 0.9s ease. 예외 하나: metaphr.dev에서 이어받은 스크롤 힌트 down.svg의 세로 5px 왕복(2.6s ease-in-out infinite).',
      '`prefers-reduced-motion: reduce`이면 모든 움직임 정지, 최종 상태만.',
    ],
  },
  {
    id: 'pixel-art',
    title: '픽셀아트',
    en: 'Pixel art',
    summary: '화면이 격자라는 사실을 드러낸다. 비트맵 서체, 1비트 아이콘, 정수 배율, 모눈, 계단식 움직임.',
    rules: [
      '서체는 비트맵 서체 Mulmaru 하나(`--mp-font`). 다른 서체를 섞지 않는다.',
      '글자도 정수 배율: Mulmaru는 12px 격자 서체라 글자 크기는 12px의 정수배만(1× 12 · 2× 24 · 3× 36 · 4× 48 · 6× 72px). `clamp()`·`vw`·`0.85em` 같은 연속·분수 크기 금지. 좁은 화면(≤480px)은 한 단계씩 내린다(hero 72→48, title 48→36).',
      '아이콘은 40×40 1비트 PNG. 정수 배율만: 카드 3× `--mp-pixel-card` 120px, 상세 5× `--mp-pixel-detail` 200px. `image-rendering: pixelated; crisp-edges`, opacity 0.72.',
      '썸네일은 모눈 배경: 면 `--mp-grid-bg`, 1px 격자선 `--mp-grid-line`, 칸 12px(카드)/16px(상세), 대체 글리프 `--mp-glyph`.',
      '커서 `■`는 `steps(1, end)` 1.2s로 깜빡임, opacity `--mp-opacity-kicker`(0.7), 크기는 부모 글자와 같게.',
      '호버 강조 fx-fill: 8칸이 `steps(4, end)` 0.19s로 차오르며 잉크/배경 반전.',
      '글리프 캔버스는 83ms(`--mp-tick`) 셀 단위 갱신. 셀 사이 부드러운 트윈 금지.',
      '로고·스크롤 힌트는 등록된 파일을 그대로, `image-rendering: pixelated`. 워드마크는 테마별 파일(라이트 `metaphr.svg`, 다크 `metaphr-dark.svg`), 1비트 단색(아이콘 PNG, `down.svg`)은 mask로 `--mp-ink`를 칠해도 된다.',
    ],
  },
  {
    id: 'retro-color',
    title: '레트로 컬러',
    en: 'Retro color',
    summary: '등록된 4색 팔레트만: paper #F5F5F5 · slate #303841 · 보조 teal #76ABAE · 강조 orange #FF5722. 라이트/다크 두 테마.',
    rules: [
      '팔레트: paper `#F5F5F5`(`--mp-palette-paper`), slate `#303841`(`--mp-palette-slate`), teal `#76ABAE`(`--mp-palette-teal`, 보조), orange `#FF5722`(`--mp-palette-orange`, 강조).',
      '화면에서는 시맨틱 변수만 쓴다: `--mp-bg`, `--mp-ink`, `--mp-secondary`(teal), `--mp-accent`(orange), `--mp-line*`, `--mp-grid-*`, `--mp-glyph`. 라이트: bg paper·ink slate. 다크: bg slate·ink paper.',
      '대비: slate/paper 10.9:1 · teal/slate 4.64:1 · orange/paper 2.9:1 · orange/slate 3.76:1 · teal/paper 2.35:1 · teal/orange 1.24:1.',
      '흰색 `#FFFFFF`·검정 `#000000`(`white`, `black`) 금지.',
      'tokens.json에 등록되지 않은 색을 만들지 않는다. 팔레트 확장은 `color.palette`에 항목을 추가하는 방식으로만(`--mp-palette-*`). status `candidate` 색은 제품 UI에 쓰지 않는다(시안에서만).',
      '강조 orange(`--mp-accent`)는 한 화면에 하나. 면·■ 마크·픽셀 포인트 위주로 쓴다.',
      '라이트 테마에서 orange·teal 글자 금지(paper 위 2.9:1, 2.35:1).',
      '다크 테마에서 teal 글자는 가능(4.64:1), orange 글자는 `--mp-size-title` 이상(최소 24px)만(3.76:1, WCAG 큰 글자 기준만 통과, 굵기 400이라 24px).',
      'orange 면·teal 면 위 글자는 두 테마 모두 slate(`#303841`). orange 면 위 글자는 `--mp-size-title` 이상(최소 24px). teal과 orange를 맞붙이지 않는다(1.24:1).',
      '호버 반전은 ink/bg 반전 그대로. 강조색으로 바꾸지 않는다. 강조색을 opacity로 옅게 쓰지 않는다.',
    ],
  },
];

const PILLAR_TITLE = Object.fromEntries(PILLARS.map((p) => [p.id, p.title])) as Record<PillarId, string>;

const MISTAKES: [PillarId, string, string, string][] = [
  ['minimalism', '굵은 글자', '`font-weight: 700`, `<strong>`/`<b>`/`<th>`/`h1`의 브라우저 기본 bold', '모든 요소 `font-weight: 400`. 강조는 크기·자간·투명도'],
  ['minimalism', '기울임', '`font-style: italic`, `<em>` 기본 기울임', '`font-style: normal`'],
  ['minimalism', '회색 글자색', '`color: #888`, `color: rgba(0,0,0,.5)`', '`color: var(--mp-ink)` + `opacity: var(--mp-opacity-*)`'],
  ['minimalism', '둥근 모서리', '`border-radius` 4px, 8px, 9999px(알약)', '`border-radius: 0`'],
  ['minimalism', '그림자', '`box-shadow`, `text-shadow`, `filter: drop-shadow()`', '없음. 구분은 1px `--mp-line` 헤어라인'],
  ['minimalism', '그라데이션·유리 효과', '배경 그라데이션, `backdrop-filter: blur()`', '없음. 모눈 격자선과 단색 강조 블록의 linear-gradient만 예외'],
  ['minimalism', '두꺼운 선', '`border: 2px`, 진한 `--mp-ink` 테두리 기본 사용', '`border: var(--mp-border) solid var(--mp-line)`(1px)'],
  ['minimalism', '호버 시 색 변경', '호버하면 다른 색(orange·teal 포함)으로 바뀜', 'ink/bg 반전 또는 opacity → 1'],
  ['minimalism', '테마 하드코딩', '`background: #F5F5F5`, `color: #303841`, 다크에서 안 바뀌는 색', '`var(--mp-bg)`, `var(--mp-ink)` 등 시맨틱 변수'],
  ['minimalism', '좁은 여백·빽빽한 행간', '섹션 padding 16px, `line-height: 1.5`, 문단 폭 제한 없음', '`--mp-section`/`--mp-section-lg`, `--mp-leading-body` 2.1, `--mp-width-para` 30em'],
  ['minimalism', '임의의 글자 크기', '`font-size: 14px`, `18px`, `2rem`', '`--mp-size-*` 10단계만'],
  ['minimalism', '움직임 줄이기 무시', '`prefers-reduced-motion` 분기 없음', '`reduced-motion` 요소 문서의 블록 포함'],
  ['minimalism', '앱에서 OS 관습 따라가기', 'SwiftUI `RoundedRectangle`·`.shadow`·`.spring`, Material 둥근 카드', '직각·그림자 없음. OS 강제 요소(시스템 시트·아이콘 마스크·시스템 컨트롤)만 예외'],
  ['pixel-art', '다른 서체', 'system-ui, Pretendard, Inter, 다른 픽셀 서체, 코드 블록 monospace', '`font-family: var(--mp-font)` 하나'],
  ['pixel-art', '정수배가 아닌 픽셀 확대', '40×40 아이콘을 100px·150px·`width: 100%`로 표시, `image-rendering` 누락', '120px(3×) 또는 200px(5×) + `image-rendering: pixelated; crisp-edges`'],
  ['pixel-art', '글리프 효과에 부드러운 트윈', 'fx-fill·커서·글리프 캔버스에 `ease`/`linear` 트윈, 60fps 보간', '`steps(4, end)`, `steps(1, end)`, 83ms 셀 단위 갱신'],
  ['pixel-art', '로고 재작성', '텍스트나 SVG로 로고를 새로 그림', `등록된 ${abs(`/${VERSION}/logos/metaphr.svg`)} 파일을 그대로`],
  ['pixel-art', '워드마크 칠하기·패널에 올리기', '다크 테마에서 metaphr.svg에 filter: invert()·mask, 밝은 박스 위에 로고', '라이트 metaphr.svg, 다크 metaphr-dark.svg를 --mp-bg 위에 그대로'],
  ['pixel-art', '아이콘 PNG를 다크 배경에 그대로', '어두운 잉크 PNG를 slate 위에 img로', '1비트 단색은 mask + background: var(--mp-ink)'],
  ['retro-color', '순수 흰색·검정', '`#FFFFFF`, `#000000`, `white`, `black`', '`--mp-palette-paper` `#F5F5F5`, `--mp-palette-slate` `#303841` (시맨틱 변수로)'],
  ['retro-color', '등록되지 않은 색', '파란 링크, 빨간 오류, 초록 성공, 프레임워크 기본 팔레트(gray-500 등), orange와 비슷한 새 주황', 'tokens.json에 등록된 색만. 상태는 글자로 말한다'],
  ['retro-color', 'candidate 색 사용', 'status `candidate` 색을 제품 UI에 사용', '시안에서만. 제품은 `stable`만'],
  ['retro-color', '강조 남용', 'orange를 버튼 여러 개·제목·배지 등 여러 곳에 사용', '한 화면에 하나(가장 중요한 한 가지)'],
  ['retro-color', '라이트에서 강조색 글자', '`color: var(--mp-accent)` 링크, `color: var(--mp-secondary)` 설명', '면·■ 마크·픽셀 포인트 (paper 위 2.9:1, 2.35:1)'],
  ['retro-color', '다크에서 작은 orange 글자', 'body 크기 orange 링크', '--mp-size-title 이상(최소 24px)만 (slate 위 3.76:1). 작은 글자는 teal 또는 ink'],
  ['retro-color', '강조색 면 위 흰/paper/작은 글자', 'orange 버튼에 흰 글자, orange 면 위 body 크기 글자', 'slate 글자(`--mp-palette-slate`), orange 면 위는 `--mp-size-title` 이상(최소 24px)'],
  ['minimalism', '옅은 글자', '메타·노트·placeholder에 opacity .55 이하', '글자는 opacity .7 이상, .5는 비활성 요소만'],
  ['pixel-art', '격자에서 벗어난 글자 크기', '`font-size: clamp(0.9rem, 2vw, 1.1rem)`, `16px`, `0.85em`', '`--mp-size-*`(12px의 정수배)만'],
  ['retro-color', 'teal과 orange 맞붙이기', 'teal 면 위 orange ■, orange 테두리 teal 칸', '사이에 bg를 두거나 한쪽만 (1.24:1)'],
  ['retro-color', '옅은 강조색', '`opacity: .5` orange 면, `rgba(255,87,34,.2)` 배경', '불투명 `--mp-accent`만'],
];

function paletteTable(): string {
  return table(
    ['CSS 변수', '값', '상태', '역할', '라이트 bg(paper) 대비', '다크 bg(slate) 대비'],
    palette().map((t) => [
      `\`${t.name}\``,
      `\`${t.value}\``,
      t.status ?? '',
      t.role ?? '미정',
      `${t.contrastOnLight}:1`,
      `${t.contrastOnDark}:1`,
    ]),
  );
}

const opacityTable = () => `### 투명도별 실효 대비

ink를 opacity로 옅게 한 글자가 같은 테마 bg 위에서 갖는 대비(WCAG 2, 빌드 때 계산). 글자는 모두 opacity 0.7 이상. 0.5(muted)는 비활성 요소 전용.

${table(
  ['CSS 변수', 'opacity', '라이트(slate on paper)', '다크(paper on slate)', '용도 구분'],
  opacityContrast().map((t) => [
    `\`${t.name}\``,
    t.value,
    `${t.contrastLight}:1`,
    `${t.contrastDark}:1`,
    t.name === '--mp-opacity-pixel'
      ? '픽셀 이미지용(글자 아님)'
      : Number(t.value) >= 0.7
        ? '필수 정보 가능'
        : '비활성 요소 전용(글자 아님)',
  ]),
)}`;

const pairTable = () =>
  table(['색 A', '색 B', '대비'], contrastPairs().map((p) => [`\`${p.a}\``, `\`${p.b}\``, `${p.ratio}:1`]));

const themeTable = () =>
  table(
    ['CSS 변수', '라이트', '다크', '용도'],
    themeColors().map((c) => [
      `\`${c.name}\``,
      `\`${c.light.value}\`${c.light.ref ? ` (${c.light.resolved})` : ''}`,
      `\`${c.dark.value}\`${c.dark.ref ? ` (${c.dark.resolved})` : ''}`,
      c.light.description === c.dark.description
        ? (c.description ?? '')
        : `라이트: ${c.light.description} / 다크: ${c.dark.description}`,
    ]),
  );

function libraryTable(list: Library[]): string {
  return table(
    ['이름', '분류', '플랫폼', '라이선스', '기둥', '왜 맞는가', 'metaphr 스타일로 쓰는 법', '주의', '사용처', '추가일'],
    list.map((l) => [
      `[${l.name}](${l.url})${l.repo ? ` ([저장소](${l.repo}))` : ''} \`${l.id}\``,
      l.category,
      (l.platforms ?? []).join(', '),
      l.license ?? '',
      (l.pillars ?? []).map((p) => PILLAR_TITLE[p]).join(', '),
      l.why,
      l.howToUse ?? '',
      l.caveats ?? '',
      (l.usedIn ?? []).join(', '),
      l.addedAt ?? '',
    ]),
  );
}

const LIBRARY_RULES = [
  '아이콘·UI·픽셀아트 도구 같은 라이브러리를 고르기 전에 이 목록을 먼저 확인한다.',
  '같은 용도면 `adopted`(사용 중) > `recommended`(권장) 순으로 고른다.',
  '`candidate`(검토 중)는 쓰기 전에 사용자에게 묻는다.',
  '`avoid`(쓰지 않음)는 쓰지 않는다.',
  '목록에 없는 라이브러리가 필요하면 설치 전에 사용자에게 먼저 묻는다.',
  '라이브러리의 기본 스타일(radius, shadow, 색, 굵은 글자)은 끄고 `--mp-*` 변수로 연결한다.',
];

function librarySection(kind: LibraryKind, depth = 2): string {
  const h = '#'.repeat(depth);
  const meta = LIBRARY_KIND.find((k) => k.id === kind)!;
  const groups = byStatus(libraries[kind]);
  const body = groups.length
    ? groups.map((g) => `${h}# ${g.label} (\`${g.id}\`) — ${g.items.length}개\n\n${g.desc}\n\n${libraryTable(g.items)}`).join('\n\n')
    : '아직 등록된 항목이 없다. 이 분야의 라이브러리가 필요하면 사용자에게 먼저 묻는다.';
  return `${h} ${meta.title} (\`${kind}\`)

${meta.summary}. 기계용: ${abs(`/${VERSION}/libraries/${kind}.json`)} · 마크다운: ${abs(`/libraries/${kind}.md`)}

${body}`;
}

const libraryIntro = () => `상태: ${STATUS}. 기계용: ${abs(`/${VERSION}/libraries.json`)} · 스키마: ${abs(`/${VERSION}/libraries.schema.json`)}

AI가 사이트·앱을 만들 때 어떤 라이브러리를 쓸지 참고하는 목록이다.

## 규칙

${LIBRARY_RULES.map((r) => `- ${r}`).join('\n')}

## 상태

${table(['status', '라벨', '뜻'], LIBRARY_STATUS.map((s) => [`\`${s.id}\``, s.label, s.desc]))}`;

/** /libraries/sites.md, /libraries/apps.md */
export const libraryMarkdown = (kind: LibraryKind) =>
  `# 참고 라이브러리 — ${LIBRARY_KIND.find((k) => k.id === kind)!.title}\n\n${libraryIntro()}\n\n${librarySection(kind, 2)}`;

/** JSON 출력용: thumbnail(/v1/ 기준 상대 경로)을 절대 URL로 */
const withThumbUrl = (list: Library[]) => list.map((l) => (l.thumbnail ? { ...l, thumbnail: asset(l.thumbnail) } : l));

export const librariesData = () => ({
  schema: abs(`/${VERSION}/libraries.schema.json`),
  status: LIBRARY_STATUS,
  rules: LIBRARY_RULES,
  sites: withThumbUrl(libraries.sites),
  apps: withThumbUrl(libraries.apps),
});

export const libraryKindData = (kind: LibraryKind) => ({
  schema: abs(`/${VERSION}/libraries.schema.json`),
  kind,
  status: LIBRARY_STATUS,
  items: withThumbUrl(libraries[kind]),
});

export { librarySchema };

const pillarsMarkdown = (depth = 2) =>
  PILLARS.map(
    (p, i) => `${'#'.repeat(depth)} ${i + 1}. ${p.title} (${p.en})

${p.summary}

${p.rules.map((r) => `- ${r}`).join('\n')}`,
  ).join('\n\n');

const markdown: Record<Slug, () => string> = {
  elements: () => `# 요소

상태: ${STATUS}. 기계용 색인: ${abs('/elements.json')}

metaphr의 디자인 요소를 분류별로 모았다. 요소 하나 = 문서 하나(용도·생김새·상태·동작·데모·CSS·앱·해야 할 것). 상태 \`추출\`은 metaphr.dev·기존 작업에서 가져온 것, \`제안\`은 원칙에 맞춰 새로 만든 제안안이다.

## 요청한 요소만 골라 읽는 법

${PICK_STEPS().map((s, i) => `${i + 1}. ${s}`).join('\n')}

${elementCategories
  .map((c) => {
    const list = elements.filter((e) => e.category === c.id);
    return `## ${c.name} (${c.nameEn}) — [${c.id}.md](${abs(`/elements/${c.id}.md`)})\n\n${c.summary}\n\n${list.length ? list.map((e) => `- [${e.name} \`${e.id}\`](${elementMarkdownUrl(e.id, true)}) (${statusLabel(e.status)}): ${e.summary}`).join('\n') : '아직 등록된 요소가 없다.'}`;
  })
  .join('\n\n')}`,

  philosophy: () => philosophyRaw.trim(),

  tokens: () => {
    const sections = [...tokenGroups()].map(
      ([group, list]) =>
        `## ${GROUP_TITLE[group] ?? group}\n\n${table(
          ['CSS 변수', '값', '상태', '용도'],
          list.filter((t) => !t.theme).map((t) => [`\`${t.name}\``, `\`${t.value}\``, t.status ?? '', t.description ?? '']),
        )}${group === 'opacity' ? `\n\n${opacityTable()}` : ''}`,
    );
    return `# 디자인 토큰

상태: ${STATUS}. 디자인 원본: ${ORIGIN}. 토큰 원본: ${abs(`/${VERSION}/tokens.json`)} (W3C DTCG 형식). 변수 ${tokenList.length}개.

## 사용법

\`\`\`css
@import url("${abs(`/${VERSION}/tokens.css`)}");
@import url("${abs(`/${VERSION}/fonts.css`)}");
\`\`\`

- 모든 값은 \`:root\`의 \`--mp-*\` 변수로 쓴다. 표에 없는 값(새 hex 색, 새 글자 크기, radius, shadow)을 만들지 않는다.
- 글자 위계는 \`color\`를 바꾸지 않고 \`opacity: var(--mp-opacity-*)\`로 만든다. 호버 시 \`opacity: 1\`.
- \`--mp-size-X\`는 같은 이름의 \`--mp-tracking-X\`와 짝으로 쓴다.
- 라이트/다크 두 테마. 기본 라이트, \`prefers-color-scheme: dark\`면 다크, \`<html data-theme="light"|"dark">\`로 수동 지정.

## 레트로 팔레트

등록된 색만 쓴다. 원시 팔레트는 \`--mp-palette-*\`, 화면에서는 테마에 따라 값이 바뀌는 시맨틱 변수를 쓴다. 대비는 WCAG 2 기준으로 빌드 때 계산한다.

${paletteTable()}

### 모든 쌍의 대비

${pairTable()}

### 테마 시맨틱 색

${themeTable()}

### 상태(status)

- \`stable\`: 제품 UI에 사용 가능.
- \`candidate\`: 후보 값. **제품 UI에 쓰지 않는다**(시안에서만).
- 역할(role)이 "미정"인 색은 장식·강조로 쓰지 않는다.
- 여기에 없는 색을 만들지 않는다.

### 사용 규칙

${PILLARS.find((p) => p.id === 'retro-color')!.rules.slice(3).map((r) => `- ${r}`).join('\n')}

### 테마 CSS 구조 (tokens.css)

\`\`\`css
:root { /* 공통 + 라이트 */ }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { /* 다크 */ } }
:root[data-theme="dark"] { /* 다크 */ }
:root[data-theme="light"] { /* 라이트 */ }
\`\`\`

### 색 추가 방법

\`src/data/tokens.json\`의 \`color.palette\`에 항목 하나를 추가하면 \`tokens.css\`, 이 문서, manifest, 토큰 페이지에 자동으로 반영된다. 이름은 \`color.palette.<이름>\` → \`--mp-palette-<이름>\`.

\`\`\`json
"<이름>": { "$value": "#RRGGBB", "$description": "후보 값 — 사용자 확정 전. 역할 미정", "$extensions": { "dev.metaphr": { "status": "candidate" } } }
\`\`\`

## metaphr.dev 변수와의 대응

metaphr.dev 원본 CSS는 접두사 없는 변수 3개를 쓴다. 이름만 옮기면 새 팔레트 값을 받는다(metaphr.dev의 크림·차콜 값은 폐기, 나중에 4색으로 맞춘다).

${table(
  ['metaphr.dev', 'design_lab', '라이트 값', '다크 값'],
  ['--bg', '--ink', '--line'].map((n) => {
    const c = themeColors().find((x) => x.name === `--mp-${n.slice(2)}`)!;
    return [`\`${n}\``, `\`${c.name}\``, `\`${c.light.resolved}\``, `\`${c.dark.resolved}\``];
  }),
)}

## 변수 이름 규칙

- \`color\`·\`layout\`·\`pixel\`·\`motion\` 그룹: 그룹 이름을 뺀다. \`color.palette.orange\` → \`--mp-palette-orange\`, \`layout.width.list\` → \`--mp-width-list\`.
- \`size\`·\`tracking\`·\`leading\`·\`opacity\` 그룹: 그룹 이름을 넣는다. \`size.hero\` → \`--mp-size-hero\`.
- 최상위 \`font\` → \`--mp-font\`.
- \`theme.light.*\`·\`theme.dark.*\`: 테마 이름까지 뺀다. \`theme.dark.bg\` → \`--mp-bg\`(다크 블록 안).
- 참조 값 \`{color.palette.paper}\` → \`var(--mp-palette-paper)\`.

${sections.join('\n\n')}`;
  },

  fonts: () => {
    const b = fonts.brand;
    return `# 폰트

상태: ${STATUS}. 기계용: ${abs(`/${VERSION}/fonts.json`)}

metaphr의 브랜드 서체는 **Mulmaru 하나**다. 다른 서체를 섞지 않는다.

${table(
  ['항목', '값'],
  [
    ['font-family', `\`${b.family}\` (${b.name})`],
    ['CSS 변수', `\`${b.cssVariable}\` = \`${b.stack}\``],
    ['파일', asset(b.file)],
    ['형식·크기', `${b.format}, ${b.bytes} bytes`],
    ['글자 범위', b.coverage],
    ['굵기', b.weights.join(', ')],
    ['스타일', b.styles.join(', ')],
    ['font-display', b.fontDisplay],
    ['라이선스', `${b.license.name} (${b.license.spdx}), ${b.license.copyright}`],
    ['출처', b.license.source],
  ],
)}

## 불러오기

\`\`\`css
@import url("${abs(`/${VERSION}/fonts.css`)}");
\`\`\`

\`fonts.css\`의 내용 (직접 호스팅할 때도 이대로):

\`\`\`css
${fontsCss().trim()}
\`\`\`

## 규칙

${b.rules.map((r) => `- ${r}`).join('\n')}

## 히어로 서브셋 기법 (metaphr.dev build-font.py)

${b.heroSubset.summary}

${b.heroSubset.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

\`\`\`css
/* 1) 전체 파일 먼저 */
@font-face { font-family: "Mulmaru"; src: url("/mulmaru.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; }
/* 2) 서브셋을 나중에 — 겹치는 글자는 이 파일이 이긴다 */
@font-face { font-family: "Mulmaru"; src: url("/mulmaru.subset.woff2") format("woff2"); font-weight: 400; font-style: normal; font-display: swap; unicode-range: U+0020,U+002E,/* … build-font.py 출력 */; }
\`\`\`

- 스크립트: ${b.heroSubset.source}
- 실행: \`${b.heroSubset.command}\`

## 보관: 이전 서체 라이브러리 (${fonts.archive.status})

${fonts.archive.note} CDN: ${fonts.archive.cdn}

${table(
  ['font-family', '이름', 'CSS', '라이선스', '상태'],
  fonts.archive.families.map((f) => [`\`${f.family}\``, f.name, f.css, f.license, fonts.archive.status]),
)}`;
  },

  logos: () => {
    const logoSections = logos.logos.map(
      (l) => `### ${l.name} — \`${l.file.split('/').pop()}\`

${table(
  ['항목', '값'],
  [
    ['URL', asset(l.file)],
    ['형식', l.format],
    ['viewBox', `\`${l.viewBox}\``],
    ['고유 크기', `${l.intrinsic.width}×${l.intrinsic.height}`],
    ['용도', l.use],
    ...Object.entries(l.display).map(([k, v]) => [`표시 ${k}`, `\`${v}\``]),
    ['alt', l.alt === '' ? '`""` (장식, 부모 링크에 aria-label)' : `\`${l.alt}\``],
    ...('pairsWith' in l ? [['함께 쓰는 요소', (l as any).pairsWith]] : []),
    ...((l as any).theme ? [['테마', (l as any).theme]] : []),
    ...((l as any).variantOf ? [['원본', `\`${(l as any).variantOf}\` 의 테마 변형`]] : []),
  ],
)}

\`\`\`html
${absHtml(l.html)}
\`\`\`${
        (l as any).themeSwitch
          ? `

#### 테마에 따라 파일 바꾸기

라이트 테마 → \`${(l as any).variants.light.split('/').pop()}\`, 다크 테마 → \`${(l as any).variants.dark.split('/').pop()}\`. prefers-color-scheme과 [data-theme]를 모두 따르는 방식:

\`\`\`html
${absHtml((l as any).themeSwitch.html)}
\`\`\`

\`\`\`css
${(l as any).themeSwitch.css}
\`\`\`

${(l as any).themeSwitch.note}

\`\`\`html
${absHtml((l as any).themeSwitch.picture)}
\`\`\``
          : ''
      }`,
    );
    return `# 로고와 아이콘

상태: ${STATUS}. 기계용: ${abs(`/${VERSION}/logos.json`)}

${logos.$description}

## 사용 규칙

${logos.rules.map((r) => `- ${r}`).join('\n')}

1비트 단색 이미지용 mask CSS (워드마크에는 쓰지 않는다):

\`\`\`css
${logos.maskCss}
\`\`\`

## 로고 파일

${logoSections.join('\n\n')}

## 픽셀 아이콘 (40×40 1비트)

${icons.$description}

- 원본 크기: ${icons.spec.size.width}×${icons.spec.size.height} ${icons.spec.format}
- 색: ${icons.spec.colors}

${table(
  ['쓰는 곳', '배율', '표시 크기', 'CSS 변수', '모눈 칸'],
  icons.spec.scale.map((s) => [s.context, `${s.factor}×`, s.size, `\`${s.cssVariable}\``, `\`${s.gridCell}\``]),
)}

${icons.spec.rules.map((r) => `- ${r}`).join('\n')}

\`\`\`css
${icons.spec.css}
\`\`\`

${table(
  ['id', '파일', '앱 예시', '대체 글리프', '설명'],
  icons.icons.map((i) => [i.id, asset(i.file), i.app, i.glyph, i.tagline]),
)}`;
  },

  ai: () => `# AI로 만들 때

AI 코딩 도구(Claude Code, Cursor 등)로 metaphr 스타일의 사이트나 앱을 만들 때의 규칙, 지시문, 순서다. 컴포넌트별 CSS는 요소 문서에 있다. 디자인 원본은 ${ORIGIN} 이다. 결과물은 그 사이트와 같은 계열로 보여야 한다.

## 세 기둥

metaphr 디자인의 핵심은 **미니멀리즘 · 픽셀아트 · 레트로 컬러** 세 가지다. 모든 규칙은 이 셋 중 하나에 속한다. 판단이 애매하면 세 기둥에 비추어 결정하고, 그래도 애매하면 사용자에게 묻는다.

${pillarsMarkdown(3)}

## 붙여넣을 지시문

\`\`\`text
${aiPrompt()}
\`\`\`

## AI가 따라야 할 순서

1. ${abs('/llms.txt')} 를 읽고, 요청에 필요한 요소 문서(\`/elements/<id>.md\`)만 골라 읽는다. 규칙 전체가 필요하면 ${abs('/llms-full.txt')}.
2. 아이콘·UI·픽셀아트 도구 등 참고 라이브러리가 필요하면 ${abs('/libraries.md')} 를 먼저 확인한다. \`adopted\` > \`recommended\` 순으로 고르고, \`avoid\`는 쓰지 않으며, 목록에 없으면 설치 전에 사용자에게 묻는다.
3. 전역 CSS 맨 위에 \`tokens.css\`, \`fonts.css\`를 import하고 테마별 \`<meta name="theme-color">\` 두 개(라이트 \`#F5F5F5\`, 다크 \`#303841\`)를 넣는다. 바탕 초기화는 ${elLink('theme')}·${elLink('typography')}·${elLink('spacing-layout')}.
4. 화면은 요소 문서의 \`## 코드\` CSS를 조합해 만든다. 새 요소는 요소 문서의 재료(1px \`--mp-line\`, opacity 단계, 잉크/배경 반전)로만 만든다.
5. 강조가 필요하면 한 화면에 하나만 orange를 쓴다(${elLink('color')}). 보조 표시는 teal(\`--mp-secondary\`). status \`candidate\` 색은 쓰지 않는다. 라이트·다크 두 테마에서 모두 확인한다.
6. 색·크기·자간·행간·투명도·여백·시간은 전부 \`--mp-*\` 변수로 쓴다. 하드코딩한 값이 있으면 토큰으로 바꾼다.
7. ${elLink('reduced-motion')}의 \`prefers-reduced-motion\` 블록을 반드시 넣는다.
8. 마지막에 "자주 틀리는 것" 표를 한 줄씩 대조해 검사한다. 예: 코드에서 \`font-weight: [5-9]00\`, \`border-radius: [1-9]\`, \`box-shadow\`, \`#fff\`, \`#000\`, \`white\`, \`black\` 검색 결과가 0건, 팔레트 hex(\`#F5F5F5\` 등)를 직접 쓴 곳이 0건, \`var(--mp-accent)\` 사용 위치가 화면당 1곳이어야 한다.

## 기반

\`\`\`css
${IMPORTS()}
\`\`\`

\`\`\`html
<meta name="theme-color" content="#F5F5F5" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#303841" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
\`\`\`

## 자원 목록

${endpoints.map((e) => `- ${abs(e.path)} — ${e.desc}`).join('\n')}

## 레트로 팔레트 (상태·대비)

${paletteTable()}

${pairTable()}

${themeTable()}

## 참고 라이브러리 규칙

${LIBRARY_RULES.map((r) => `- ${r}`).join('\n')}

## metaphr.dev 변수와의 대응

metaphr.dev 원본 코드를 옮겨 올 때: \`var(--bg)\` → \`var(--mp-bg)\`, \`var(--ink)\` → \`var(--mp-ink)\`, \`var(--line)\` → \`var(--mp-line)\`.

## 요소 문서 (옛 컴포넌트 레시피)

컴포넌트 CSS는 요소 문서로 옮겼다. 요소 전체 목록은 ${abs('/elements.md')}.

${table(
  ['옛 레시피', '요소 문서'],
  RECIPE_MAP.map(([r, ids]) => [r, ids.map(elLink).join(', ')]),
)}

## 자주 틀리는 것

${PILLARS.map(
  (p) => `### ${p.title}\n\n${table(
    ['항목', '틀린 예', '맞는 방법'],
    MISTAKES.filter((m) => m[0] === p.id).map((m) => m.slice(1)),
  )}`,
).join('\n\n')}`,

  libraries: () => `# 참고 라이브러리

${libraryIntro()}

${LIBRARY_KIND.map((k) => librarySection(k.id, 2)).join('\n\n')}`,
};

export function aiPrompt(): string {
  return `이 프로젝트는 metaphr 디자인 시스템(${VERSION}, 원본 ${ORIGIN}, 문서 ${abs('/')})을 따른다.
작업 전에 ${abs('/llms.txt')} 를 읽고, 요청에 필요한 요소 문서(/elements/<id>.md)를 골라 읽어 모든 규칙을 지켜라.
- 전역 CSS 맨 위: @import url("${abs(`/${VERSION}/tokens.css`)}"); @import url("${abs(`/${VERSION}/fonts.css`)}");
디자인의 세 기둥:
[미니멀리즘]
- 여백을 넓게: 섹션 --mp-section, 문단 폭 --mp-width-para, 행간 --mp-leading-body.
- font-weight 400만. 굵게·기울임 금지. 위계는 --mp-size-*, --mp-tracking-*, --mp-opacity-* 로.
- 선은 1px --mp-line, 모서리 직각, 그림자·그라데이션 없음.
- 호버는 잉크/배경 반전 또는 opacity 1. prefers-reduced-motion이면 모든 움직임 정지.
[픽셀아트]
- 서체는 Mulmaru(var(--mp-font)) 하나.
- 픽셀 이미지는 정수 배율(3× 120px, 5× 200px) + image-rendering: pixelated.
- 글리프 효과는 steps() 계단 움직임만.
[레트로 컬러]
- 팔레트: paper #F5F5F5, slate #303841, 보조 teal #76ABAE, 강조 orange #FF5722. 흰색 #FFF·검정 #000 금지.
- 라이트(bg paper, ink slate)와 다크(bg slate, ink paper) 모두 지원. 색은 --mp-bg, --mp-ink, --mp-secondary, --mp-accent 등 시맨틱 변수로만.
- tokens.json에 없는 색을 만들지 마라. status가 candidate인 색은 제품 UI에 쓰지 마라.
- orange(--mp-accent)는 한 화면에 하나. 면·■ 마크·픽셀 포인트 위주. 라이트에서 orange·teal 글자 금지(2.9:1, 2.35:1). 다크에서 teal 글자 가능(4.64:1), orange 글자는 --mp-size-title 이상·최소 24px만(3.76:1). 강조색 면 위 글자는 slate. teal과 orange를 맞붙이지 마라(1.24:1).
[앱]
- iOS/Android도 같은 원칙(직각, 굵기 400, 그림자 없음, 같은 팔레트·두 테마). OS가 강제하는 요소(시스템 시트, 앱 아이콘 마스크, 시스템 컨트롤)만 예외.
참고 라이브러리 고르기:
- 아이콘·UI·픽셀아트 도구가 필요하면 ${abs('/libraries.md')} 를 먼저 확인(adopted > recommended, avoid 금지). 목록에 없으면 설치 전에 나에게 물어라.
- 규칙이 요구사항과 충돌하면 임의로 판단하지 말고 나에게 물어라.`;
}

export const pageMarkdown = (slug: Slug) => markdown[slug]();

export function llmsTxt(): string {
  return `# metaphr/design_lab

> metaphr(${ORIGIN})의 디자인 시스템 공식 참조(${OFFICIAL_URL}). 상태: ${STATUS}. 슬로건 "여백을 담습니다". 디자인의 세 기둥은 미니멀리즘 · 픽셀아트 · 레트로 컬러다. metaphr 스타일의 사이트나 앱을 만들 때 이 규칙을 그대로 따른다.

## 요청한 요소만 골라 읽는 법

${PICK_STEPS().map((s, i) => `${i + 1}. ${s}`).join('\n')}

기계용 색인: ${abs('/elements.json')} · 사람용: ${abs('/elements')}

## 요소

형식: id — 이름 — 검색어 일부 — 문서 URL

${elementsByCategory()
  .map((c) => `### ${c.name} (${c.id}) — ${c.summary}\n\n${c.elements.map((e) => elLine(e)).join('\n')}`)
  .join('\n\n')}

## 세 기둥

${PILLARS.map((p) => `- ${p.title} (${p.en}): ${p.summary}`).join('\n')}

## 문서

${pages.map((p) => `- [${p.title}](${abs(`/${p.slug}.md`)}): ${p.summary}`).join('\n')}
${LIBRARY_KIND.map((k) => `- [참고 라이브러리 — ${k.title}](${abs(`/libraries/${k.id}.md`)}): ${k.summary}`).join('\n')}
- [전체 가이드](${abs('/llms-full.txt')}): 세 기둥·철학·토큰·폰트·로고·AI 가이드·라이브러리를 한 파일로 (요소 문서는 제외)

## 바로 쓰는 자원

${endpoints.map((e) => `- [${e.path}](${abs(e.path)}): ${e.desc}`).join('\n')}
`;
}

export function llmsFull(): string {
  return [
    `# metaphr/design_lab — 전체 가이드 (${VERSION}, ${STATUS})`,
    `출처: ${abs('/')} · 디자인 원본: ${ORIGIN}`,
    `## 디자인 요소\n\n요소 문서(버튼·메뉴·입력·이펙트 …)는 이 파일에 넣지 않는다. 요청에 맞는 요소만 골라 읽는다.\n\n- 목록: ${abs('/llms.txt')} · ${abs('/elements.md')}\n- 색인: ${abs('/elements.json')}\n- 문서: ${abs('/elements/<id>.md')}`,
    `## 디자인의 세 기둥\n\n${pillarsMarkdown(3)}`,
    ...pages.filter((p) => p.slug !== 'elements').map((p) => pageMarkdown(p.slug).replace(/^#/gm, '##')),
  ].join('\n\n---\n\n');
}

export function manifest() {
  return {
    name: 'metaphr/design_lab',
    version: VERSION,
    status: STATUS,
    origin: ORIGIN,
    officialUrl: OFFICIAL_URL,
    site: abs('/'),
    llms: abs('/llms.txt'),
    llmsFull: abs('/llms-full.txt'),
    pillars: PILLARS,
    elements: {
      index: abs('/elements.json'),
      categories: elementCategories.map((c) => ({
        id: c.id,
        name: c.name,
        nameEn: c.nameEn,
        markdown: abs(`/elements/${c.id}.md`),
        elements: elements.filter((e) => e.category === c.id).map((e) => e.id),
      })),
      count: elements.length,
    },
    docs: [
      ...pages.map((p) => ({ ...p, html: abs(`/${p.slug}`), markdown: abs(`/${p.slug}.md`) })),
      ...LIBRARY_KIND.map((k) => ({
        slug: `libraries/${k.id}`,
        title: `참고 라이브러리 — ${k.title}`,
        summary: k.summary,
        markdown: abs(`/libraries/${k.id}.md`),
      })),
    ],
    resources: endpoints.map((e) => ({ url: abs(e.path), description: e.desc })),
    tokens: tokenMap(),
    tokensDark: tokenMapDark(),
    palette: palette().map((t) => ({
      name: t.name,
      value: t.value,
      status: t.status,
      role: t.role ?? null,
      contrast: { onLight: t.contrastOnLight, onDark: t.contrastOnDark },
      description: t.description,
    })),
    contrastPairs: contrastPairs(),
    themes: {
      selectors: {
        light: [':root', ':root[data-theme="light"]'],
        dark: ['@media (prefers-color-scheme: dark) :root:not([data-theme="light"])', ':root[data-theme="dark"]'],
      },
      colors: themeColors().map((c) => ({
        name: c.name,
        light: { value: c.light.value, resolved: c.light.resolved },
        dark: { value: c.dark.value, resolved: c.dark.resolved },
        lightDescription: c.light.description,
        darkDescription: c.dark.description,
      })),
      themeColorMeta: {
        light: themeColors().find((c) => c.name === '--mp-bg')!.light.resolved,
        dark: themeColors().find((c) => c.name === '--mp-bg')!.dark.resolved,
      },
    },
    colorRules: PILLARS.find((p) => p.id === 'retro-color')!.rules,
    fonts: fontsData(),
    logos: logosData().logos,
    icons: iconsData(),
    libraries: librariesData(),
  };
}
