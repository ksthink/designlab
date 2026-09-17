# metaphr/design_lab

metaphr의 디자인 철학·토큰·폰트·로고·참고 라이브러리를 사람과 AI가 함께 참조하는 정적 사이트 (Astro 5, Vercel 배포).

공식 주소: **https://design.metaphr.dev**

## 디자인의 세 기둥
**미니멀리즘 · 픽셀아트 · 레트로 컬러.** 모든 규칙은 이 셋 중 하나에 속한다. 규칙 목록은 `src/lib/docs.ts`의 `PILLARS`가 원본이다(ai.md·llms.txt·manifest가 여기서 생성).

## 디자인 원본은 metaphr.dev
- 디자인의 원본은 https://metaphr.dev (소스: https://github.com/ksthink/metaphr.dev). design_lab은 그 디자인을 **문서화하고 배포**할 뿐, 새 규칙을 만들지 않는다.
- 참고 사본: `reference/index.html`, `reference/app.html`, `reference/ref-*.png`.
- 공통 명세: `.omc/research/design-spec.md` (CSS 변수 계약, 자원 경로).
- design_lab 사이트 자신도 같은 규칙을 따른다: Mulmaru 한 서체(굵기 400), 4색 팔레트 paper `#F5F5F5`·slate `#303841`·teal `#76ABAE`(보조)·orange `#FF5722`(강조, 한 화면에 하나), 라이트/다크 두 테마, 투명도 위계, 1px 헤어라인, 모서리 직각, 그림자·그라데이션 없음. 결정 로그(`.omc/research/design-spec.md` 맨 위)가 본문보다 우선한다.
- 이전 초안(종이/잉크 격자, signal 강조색, fontcdn 4서체, 2px 선, 하드 그림자)은 폐기됨. 되살리지 않는다. 다크 모드는 결정 로그에 따라 허용한다(라이트/다크 두 테마).

## 원칙: 원본은 한 곳
내용을 바꿀 때는 아래 원본만 수정한다. HTML 페이지, `/*.md`, `/llms*.txt`, `/v1/*`는 모두 여기서 생성된다.

- `src/data/tokens.json` — 디자인 토큰 (W3C DTCG). `--mp-*` 변수 이름 규칙은 파일의 `$description` 참고
  - 원시 색은 `color.palette.*`(`--mp-palette-*`), 화면용 시맨틱 색은 `theme.light.*`/`theme.dark.*`(`--mp-bg`, `--mp-ink`, `--mp-secondary`, `--mp-accent` …, 테마마다 값이 바뀜).
  - 색 추가 = `color.palette`에 항목 하나(`--mp-palette-<이름>`). 새 색은 `$extensions["dev.metaphr"].status: "candidate"`로 넣고, 사용자가 확정하면 `stable` + `role`. 대비는 빌드 때 자동 계산.
  - 등록되지 않은 색을 만들지 않는다. candidate 색은 제품 UI에 쓰지 않는다.
- `src/data/fonts.json` — 브랜드 서체 Mulmaru + `archive`(사용하지 않는 fontcdn 서체 기록)
- `src/data/logos.json` + `public/v1/logos/` — 로고 (metaphr.svg, down.svg)
- `src/data/icons.json` + `public/v1/icons/` — 40×40 1비트 픽셀 아이콘 예시
- `src/content/philosophy.md` — 디자인 철학
- `src/content/elements/<category>/<id>.md` — 디자인 요소(요소 하나 = 파일 하나). 분류는 `src/data/element-categories.json`(순서·요소 기본 순서 `order`). 아래 "요소 추가하는 법"
- `src/data/libraries/sites.json`, `apps.json` — 참고 라이브러리 (항목 하나 추가 = 모든 출력에 반영). 스키마 `src/data/libraries/schema.json`, 빌드 시 검증(필수 누락·모르는 status/필드면 빌드 실패). 라이브러리를 추가한 뒤 `npm run shots`로 메인 화면 썸네일을 찍어 커밋한다 (`-- --all` 전부 다시, `-- <id>` 지정). 썸네일은 `public/v1/libraries/shots/<kind>-<id>.webp`, JSON 출력에는 절대 URL `thumbnail`
- `src/lib/tokens.ts` — `tokensCss()`, `tokenList`(name/value/resolved/group/theme/status/role/ref), `themeColors()`, `palette()`, `contrastPairs()`, `paletteTokens()`, `tokenMap()`/`tokenMapDark()`, `contrast()`
- `src/lib/libraries.ts` — `libraries`, `Library`, `LIBRARY_STATUS`, `LIBRARY_KIND`, 스키마 검증
- `src/content.config.ts` — content collection `elements` (zod 스키마)
- `src/lib/elements.ts` — 요소 불러오기·검증. `elements`, `elementCategories`, `getElement(id)`, `getElementCategory(id)`, `elementsByCategory()`, `elementDemo(el)` → `{html, css, js?}`, `elementSections(el)`, `elementUrl(id, abs?)`, `elementMarkdownUrl(id, abs?)`, `searchIndex`, `ELEMENT_STATUS`
- `src/lib/paths.ts` — `VERSION`, `url()`/`abs()`/`asset()` (docs.ts가 다시 내보냄)
- `src/lib/docs.ts` — 문서 목록(`pages`), `PILLARS`, `url()`/`abs()`/`asset()`, AI용 마크다운·llms.txt·manifest·fonts.css·라이브러리·요소(`elementMarkdown`, `categoryMarkdown`, `elementsIndex`) 출력 생성

data JSON의 `file` 필드는 `/v1/` 기준 상대 경로다. 절대 URL은 `asset(file)`로 만든다.

## 프로젝트 지도
- `src/pages/*.astro` — 사람용 페이지 (`/`, `/philosophy`, `/tokens`, `/fonts`, `/logos`, `/ai`, `/libraries`)
- `src/pages/[slug].md.ts` — AI용 마크다운 (`/philosophy.md` …), `src/pages/libraries/[kind].md.ts` — `/libraries/sites.md`, `/libraries/apps.md`
- `src/pages/elements/[slug].md.ts` — `/elements/<id>.md`(요소 문서 + 공통 규칙 블록)와 `/elements/<category>.md`. `src/pages/elements.json.ts` = `/v1/elements.json` 색인
- `src/pages/llms.txt.ts`(요소 색인 중심), `llms-full.txt.ts`(요소 문서는 넣지 않고 색인 링크만)
- `src/pages/v1/*.ts` — `tokens.css`, `tokens.json`, `fonts.css`, `fonts.json`, `logos.json`, `libraries.json`, `libraries/{sites,apps}.json`, `libraries.schema.json`, `manifest.json`
- `public/v1/fonts/mulmaru.woff2` — 자기 호스팅 서체 (SIL OFL 1.1, © 2025 Mushsooni)

새 문서를 추가하면 `pages`에 항목을 넣고, `docs.ts`의 `markdown`에 생성 함수를, `src/pages/<slug>.astro`에 사람용 페이지를 만든다.

## 요소 추가하는 법
1. 파일: `src/content/elements/<category>/<id>.md`. `id`는 영문 kebab-case, 파일 이름·주소(`/elements/<id>`)와 같고 한번 정하면 바꾸지 않는다. 폴더 = `category`. 분류 id와 같은 요소 id는 쓸 수 없다.
2. frontmatter: `id`, `name`(한국어), `nameEn`, `category`(element-categories.json의 id), `summary`(한 문장), `aliases`(한·영 검색어, 1개 이상), `platforms`(web|ios|android), `status`(extracted|proposed), `source`(extracted면 필수, proposed면 생략), `pillars`, `tokens`(tokens.css에 있는 `--mp-*`만), `effects`(effects 분류 요소 id), `related`(요소 id). 값이 `` ` ``·`[`·`>` 등으로 시작하거나 `: `를 포함하면 큰따옴표로 감싼다.
3. 본문 섹션은 이 순서·이 제목: `## 용도` · `## 생김새` · [`## 상태`] · [`## 동작`] · `## 데모` · `## 코드` · [`## 앱`] · `## 해야 할 것 / 하지 말 것`. `## 앱`은 platforms에 ios/android가 있을 때만.
4. `## 데모`에 ` ```html demo ` 블록 정확히 하나(클래스 `mp-<id>` 접두사, script 없이), `## 코드`에 ` ```css ` 블록 하나 이상(필요하면 ` ```js `). 사람용 페이지가 이 CSS를 그대로 주입한다.
5. 범위는 `–`(en dash), `~` 금지. 새 분류 안 순서는 element-categories.json의 `order`에 id를 넣는다.
6. 검증(`npm run build` 때 `[elements]` 요약 출력):
   - 항상 오류: 스키마 위반, id≠파일명, 폴더≠category, id 중복·분류 id 충돌, 없는 토큰, demo 블록 개수≠1, 코드 섹션에 css 없음.
   - 경고: 본문 60줄 미만(AI용 문서로 너무 얇음), 없는 related/effects 대상, effects가 effects 분류가 아님, 섹션 누락·순서·모르는 제목, 앱 섹션 유무 불일치, `~`, proposed에 source.
   - `ELEMENTS_STRICT=1 npm run build`면 경고도 빌드 실패. 작성이 끝나면 strict로 확인한다.

## 배포 위치: BASE_PATH / SITE_URL
공식 배포 위치는 서브도메인 https://design.metaphr.dev 이다 (BASE_PATH `/`). 기본값 그대로 빌드하면 된다.
경로 배포를 위한 base 지원 코드는 남아 있다.

- `SITE_URL` — 도메인 (기본 `https://design.metaphr.dev`)
- `BASE_PATH` — 경로 (기본 `/`)
- 내부 링크·자원 경로는 **반드시** `url('/fonts')`, 절대 URL은 `abs('/v1/tokens.css')`. `href="/..."`를 하드코딩하지 않는다.
- 확인: `npm run build` 후 `dist/llms.txt`의 URL이 `https://design.metaphr.dev/…`인지 본다.

## 명령
- `npm run dev` / `npm run build` / `npm run preview`
- `/v1/` 아래 계약(파일 경로, `--mp-*` 변수 이름)은 한 번 공개하면 깨지 않는다. 호환되지 않는 변경은 `/v2/`로 낸다.
