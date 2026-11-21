# metaphr/design_lab — 공통 명세 (기능·디자인·검증 에이전트 공유)

> ⚠️ 2026-09-17 사용자 확정 결정이 아래 '결정 로그'에 있다. 본문(추출 규칙)과 충돌하면 **결정 로그가 우선**한다.

## 결정 로그 (사용자 확정, 최우선)
1. **팔레트 4색으로 전면 교체.** metaphr.dev의 크림 #F7F2E9 · 차콜 #3A3A38 · 토마토 #FF6347은 폐기. (metaphr.dev도 나중에 4색으로 맞춘다 — 지금은 design_lab이 새 기준.)
   | 원시 이름 | 값 | CSS 변수 | 역할 |
   |---|---|---|---|
   | paper | `#F5F5F5` | `--mp-palette-paper` | 라이트 배경 / 다크 글자 |
   | slate | `#303841` | `--mp-palette-slate` | 라이트 글자·선 / 다크 배경 |
   | teal | `#76ABAE` | `--mp-palette-teal` | 보조: 면·선택 상태·보조 표시. 라이트에서 글자 금지(2.35:1), 다크에서는 글자 가능(4.64:1) |
   | orange | `#FF5722` | `--mp-palette-orange` | 강조: 한 화면에 하나. 면·■ 마크·픽셀 포인트 위주. 라이트에서 글자 금지(2.9:1). 다크에서는 heading 크기 이상 글자만(3.76:1) |
   대비 실측: slate/paper 10.9 · teal/slate 4.64 · orange/paper 2.9 · orange/slate 3.76 · teal/paper 2.35 · teal/orange 1.24(둘을 맞붙이지 않는다).
   팔레트는 앞으로 계속 추가된다. tokens.json에 등록되지 않은 색은 만들지 않는다.
2. **다크 모드 전면 허용** (사이트·앱). 라이트: bg paper, ink slate. 다크: bg slate, ink paper. `prefers-color-scheme` 자동 + `[data-theme="light"|"dark"]` 수동 지정. 파생값(line, line-strong, line-button, grid-bg, grid-line, glyph)은 ink의 투명도로 테마마다 따로 정의: 라이트 ink rgb(48,56,65), 다크 ink rgb(245,245,245), 알파는 기존과 동일(.16/.45/.4/.035/.07/.55). `theme-color`도 테마별 meta 두 개.
3. **앱(iOS/Android)도 같은 원칙**(직각, 굵기 400, 그림자 없음). OS가 강제하는 요소(시스템 시트, 앱 아이콘 마스크, 시스템 컨트롤)만 예외로 명시.
4. **철학 문서 구조**: 세 기둥(미니멀리즘·픽셀아트·레트로 컬러) + '만드는 태도' 섹션 — (a) 빼기·가벼움·범위, (b) 되돌릴 수 없는 일 앞의 확인 단계·결정 이유 기록, (c) 터미널 어휘·말투. 로컬 우선은 원칙에 넣지 않음(미정 사항으로만 기록). 근거는 `.omc/research/portfolio-analysis.md`.
5. 미정으로 남김: MonaS12→Mulmaru 교체 여부, 다음 추가 색.

### 2026-11-21 보강 (사용자 확정)
6. **글자 크기는 Mulmaru 12px 격자의 정수배만.** `--mp-size-*`: hero 72 · title 48 · heading 36 · subheading 24 · lead 24 · body/small/kicker/meta/fine 12px. 좁은 화면(≤480px)은 hero 48, title 36(`$extensions.dev.metaphr.narrow` → tokens.css 미디어 쿼리). 이유: 유동 크기(14.4px 등)에서 픽셀이 뭉개져 버튼의 "켜짐"이 "커짐"으로 읽혔다. `clamp()`·`vw`·분수 em·16px 금지, 입력 칸 iOS 확대 방지는 24px.
7. **글자 투명도는 .7 이상.** meta .55→.7, kicker .45→.7, fine .35→.7(라이트 3.06·2.41·1.93 → 4.53:1). muted .5는 비활성 요소 전용, 노트·placeholder는 secondary .7. 1× 글자끼리의 위계는 자간.
8. **조작 요소 테두리 3:1.** `--mp-line-button` .4→.55(라이트 3.06, 다크 4.51:1). 입력 칸·선택 칸·검색 칸·드롭 영역도 `--mp-line`(장식) 대신 `--mp-line-button`.
9. **분류 색:** 새 색 없이 투명도(body·secondary)와 빗금, 계열 최대 3개(chart 요소의 방법을 규칙으로).
10. **견본 예외:** "orange 한 화면에 하나"는 라이트·다크 데모를 나란히 보여 주는 문서 영역에는 적용하지 않는다.
11. **기준:** design_lab이 기준이고 metaphr.dev·앱이 따라온다(CLAUDE.md 갱신).


## 목표
design_lab 사이트는 **metaphr.dev(https://github.com/ksthink/metaphr.dev)와 디자인이 동일**해야 한다.
metaphr.dev가 원본이고, design_lab은 그 디자인을 문서화하고 배포하는 곳이다.
design_lab 자신도 이 규칙을 그대로 따른다 (같은 사이트 계열로 보여야 한다).

원본 참고 파일: `reference/index.html`, `reference/app.html` (metaphr.dev 소스 복사본),
`reference/ref-hero.png`, `ref-body.png`, `ref-foot.png`, `ref-app.png` (실제 화면).

이전 초안(종이/잉크 격자, signal 강조색, neodgm·Galmuri11·KakaoSmallSans·IyagiGGC 4서체, 2px 선, 하드 그림자, 다크 모드)은 **전부 폐기**한다.

## 디자인의 세 기둥 (사용자 확정)
metaphr 디자인의 핵심은 **미니멀리즘 · 픽셀아트 · 레트로 컬러** 세 가지다. 철학 문서, 홈, AI 가이드는 이 세 기둥을 최상위 구조로 삼고, 아래 규칙을 각 기둥 밑에 정리한다.
- 미니멀리즘: 여백, 서체 하나, 굵기 하나, 투명도 위계, 1px 헤어라인, 장식 없음, 빼고 덜어내기
- 픽셀아트: Mulmaru 비트맵 서체, 40×40 1비트 아이콘, 정수 배율, 모눈 배경, ■ 커서, 셀 단위 터미널 모션, steps() 반전 채움
- 레트로 컬러: 바랜 종이 크림 `#F7F2E9` + 먹빛 차콜 `#3A3A38`. 순백·순흑 대신 따뜻하게 바랜 두 색(오래된 인쇄물·초기 흑백 화면의 느낌). 기본 2색 + **토마토 `#FF6347`(확정, 역할: 강조)**. 팔레트는 계속 추가되며, tokens.json에 등록되지 않은 색은 임의로 만들지 않는다.

## metaphr 정체성 (metaphr.dev에서 추출)
- 라이프스타일·생산성 웹앱/네이티브 앱을 만들어 내놓는 스튜디오.
- 슬로건: **여백을 담습니다**
- 소개문: "metaphr는 일과 삶의 여백을 지향합니다. 모두가 더 많은 기능을 다툴 때, 빼고 덜어내는 미학을 고민합니다. 복잡한 스마트폰 속, 당신의 마음이 오직 '하나'에만 온전히 집중할 수 있도록 만듭니다."
- 연락: ksthink@metaphr.dev · 블로그: https://blog.metaphr.dev

## 추출한 디자인 규칙
1. **서체는 Mulmaru 하나** (SIL OFL 1.1, © 2025 Mushsooni, https://github.com/mushsooni/mulmaru). 굵기 400만. 굵게/기울임 없음. 위계는 크기·자간·투명도로 만든다.
2. **색은 두 개**: 배경 `#F7F2E9`, 잉크 `#3A3A38`. 다른 색상(강조색, 상태색) 없음. 다크 모드 없음 (`theme-color` = `#F7F2E9`).
3. **위계는 투명도로**: 잉크 색을 그대로 두고 opacity 단계만 쓴다.
   - 0.85 본문 문단 · 0.8 브랜드 · 0.75 푸터 링크 · 0.7 보조 설명(카드 설명, tagline) · 0.7 상단 링크 (링크 두 단계는 결정: metaphr.dev .65/.6에서 상향) · 0.55 메타·배지·뒤로가기 · 0.5 분류 설명·노트 · 0.45 kicker·커서 · 0.35 저작권
   - 호버 시 opacity 1.
4. **선은 1px 헤어라인**: `rgba(58,58,56,0.16)`. 호버 시 `rgba(58,58,56,0.45)`. 버튼 테두리 `rgba(58,58,56,0.4)`. 모서리 직각(radius 0), 그림자 없음, 그라데이션 장식 없음.
5. **모눈 배경** (썸네일): 배경 `rgba(58,58,56,0.035)` + 1px 격자선 `rgba(58,58,56,0.07)`, 칸 12px(카드)/16px(상세). 안의 글리프 색 `rgba(58,58,56,0.55)`.
6. **픽셀 아트**: 40×40 1비트 PNG, 정수 배율만(카드 3× = 120px, 상세 5× = 200px), `image-rendering: pixelated; crisp-edges`, opacity 0.72.
7. **여백이 넓다**: 섹션 세로 여백 `clamp(2.5rem, 8vh, 5rem)`~`clamp(4rem, 12vh, 9rem)`. 목록 폭 1180px, 읽기 폭 760px, 좌우 `clamp(1.25rem, 5vw, 4rem)`. 문단 최대 30em.
8. **유동 크기**(clamp)와 넉넉한 자간·행간:
   - hero: `clamp(1.95rem, 7.8vw, 5.2rem)`, 자간 .05em
   - title(h1 상세): `clamp(1.8rem, 6vw, 3rem)`, 자간 .04em, 행간 1.35
   - heading(h2 분류): `clamp(1.15rem, 3.2vw, 1.7rem)`, 자간 .06em
   - subheading(h3 카드): `clamp(1.1rem, 3.1vw, 1.45rem)`, 자간 .04em
   - lead: `clamp(0.95rem, 2.2vw, 1.2rem)`, 행간 2.1, 자간 .02em
   - body: `clamp(0.92rem, 2.2vw, 1.05rem)`, 행간 2.1, 자간 .01em
   - small(링크·버튼): `clamp(0.82rem, 2vw, 0.95rem)`, 자간 .06em
   - kicker: `clamp(0.75rem, 2vw, 0.9rem)`, 자간 .14em
   - meta(배지): `clamp(0.68rem, 1.7vw, 0.75rem)`, 자간 .08em
   - fine(저작권): 0.72rem, 자간 .1em
   - 카드 설명 행간 1.85
9. **상호작용 = 잉크/배경 반전**. 버튼 호버: 배경 잉크, 글자 배경색 (0.25s ease). 링크 강조 효과 `fx-fill`: 8칸이 `steps(4, end)` 0.19s로 차오르며 반전. 다른 색으로 바뀌는 호버 없음.
10. **움직임은 두 종류**:
    - 숨쉬기: 글자/카드가 ±2.5~5.5px 위아래로 3.4~5.8s `ease-in-out infinite alternate`, 요소마다 위상 다르게. 등장은 opacity+translateY(14px) 0.9s ease.
    - 터미널: 커서 `■`가 `steps(1,end)` 1.2s로 깜빡임(opacity .45). 글리프 캔버스는 83ms 셀 단위 갱신, 부드러운 트윈 금지.
    - `prefers-reduced-motion`이면 모든 움직임 정지, 최종 상태만.
11. **작은 장치들**: 배지(1px 선, padding .25em .6em; "준비 중"은 dashed), 8px 정사각 점(활성은 잉크 채움 opacity .55), 화살표 `‹` `›` 글자, 스크롤 힌트 `down.svg`(12×6 픽셀 삼각형), 뒤로가기 `‹ metaphr`, 푸터 로고 `metaphr.svg`(폭 `clamp(120px,20vw,168px)`, 가운데) + `© metaphr`.

## CSS 변수 계약 (기능 에이전트가 tokens.json에서 생성, 디자인 에이전트가 사용)
접두사 `--mp-`. 이름은 아래로 고정.

```
--mp-bg: #F7F2E9
--mp-ink: #3A3A38
--mp-line: rgba(58,58,56,0.16)
--mp-line-strong: rgba(58,58,56,0.45)
--mp-line-button: rgba(58,58,56,0.4)
--mp-grid-bg: rgba(58,58,56,0.035)
--mp-grid-line: rgba(58,58,56,0.07)
--mp-glyph: rgba(58,58,56,0.55)

--mp-font: "Mulmaru", sans-serif

--mp-size-hero / -title / -heading / -subheading / -lead / -body / -small / -kicker / -meta / -fine   (위 clamp 값)
--mp-tracking-hero .05em / -title .04em / -heading .06em / -subheading .04em / -lead .02em / -body .01em / -small .06em / -kicker .14em / -meta .08em / -fine .1em
--mp-leading-title 1.35 / -card 1.85 / -body 2.1

--mp-opacity-body .85 / -brand .8 / -secondary .7 / -link .75 / -nav .7 / -meta .55 / -muted .5 / -kicker .45 / -fine .35 / -pixel .72

--mp-width-list 1180px / -read 760px / -para 30em
--mp-gutter clamp(1.25rem, 5vw, 4rem)
--mp-section clamp(2.5rem, 8vh, 5rem)
--mp-section-lg clamp(4rem, 12vh, 9rem)

--mp-grid-cell-card 12px / -detail 16px
--mp-pixel-card 120px / -detail 200px
--mp-border 1px

--mp-ease-float ease-in-out
--mp-duration-float-min 3.4s / -max 5.8s
--mp-float-amp-min 2.5px / -max 5.5px
--mp-duration-reveal 0.9s / -fade 0.6s / -hover 0.25s / -fill 0.19s
--mp-steps-fill steps(4, end)
--mp-duration-caret 1.2s
--mp-tick 83ms

--mp-palette-paper #F5F5F5 / -slate #303841 / -teal #76ABAE / -orange #FF5722   (원시 팔레트, tokens.json color.palette.*)
--mp-secondary, --mp-accent   (테마 시맨틱: teal, orange)
(결정 로그 2: --mp-bg, --mp-ink, --mp-line, --mp-line-strong, --mp-line-button, --mp-grid-bg, --mp-grid-line, --mp-glyph, --mp-secondary, --mp-accent 는
 tokens.json theme.light.* / theme.dark.* 에서 생성되어 테마마다 값이 바뀐다. 위 --mp-bg 등의 옛 값은 무효.)
```

tokens.css 구조: `:root{공통+light}` · `@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){dark} }` · `:root[data-theme="dark"]{dark}` · `:root[data-theme="light"]{light}`.
토큰 상태: `$extensions["dev.metaphr"].status` = `stable` | `candidate` (상속), `role` = 역할.
`src/lib/tokens.ts`: `tokenList` 항목 `{ name, value, resolved, group, description?, theme?: 'light'|'dark', status?, role?, ref?, meta?, path, type? }` (테마 토큰은 light/dark 두 항목이 같은 name).
헬퍼: `themeColors()` → `[{ name, description, light: Token, dark: Token }]`, `palette()` → 팔레트 + `contrastOnLight`/`contrastOnDark`, `contrastPairs()`, `paletteTokens()`, `commonTokens()`, `tokenMap()`/`tokenMapDark()`.
candidate 색은 제품 UI 금지(시안 전용). 색 추가 = color.palette에 항목 하나 추가.

## 자원 경로 (고정)
- `/v1/tokens.css`, `/v1/tokens.json`, `/v1/fonts.css`(Mulmaru @font-face, font-display swap, 자기 호스팅 `/v1/fonts/mulmaru.woff2`), `/v1/fonts.json`, `/v1/logos.json`, `/v1/manifest.json`, `/v1/libraries.json`, `/v1/libraries/sites.json`, `/v1/libraries/apps.json`, `/v1/libraries.schema.json`
- 파일: `public/v1/fonts/mulmaru.woff2`, `public/v1/logos/metaphr.svg`, `public/v1/logos/down.svg`, `public/v1/icons/*.png`(앱 아이콘 예시 40×40)
- 문서: `/philosophy`, `/tokens`, `/fonts`, `/logos`, `/ai`, `/libraries` (+ 각 `.md`, 그리고 `/libraries/sites.md`, `/libraries/apps.md`), `/llms.txt`, `/llms-full.txt`

## 배포 위치
metaphr.dev에 붙는다. 서브도메인(예: design.metaphr.dev)이 될지 경로(metaphr.dev/design_lab)가 될지 미정이므로,
모든 내부 링크와 절대 URL은 Astro `base`(환경변수 `BASE_PATH`, 기본 `/`)와 `site`(환경변수 `SITE_URL`)를 따라야 한다.
