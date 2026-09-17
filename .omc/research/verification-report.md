# 검증 보고서 — metaphr/design_lab

- 검증일: 2026-09-17 (KST)
- 검증 대상: 작업 중인 트리를 두 번 스냅샷해 스크래치패드에서 빌드
  - snap1 15:34 (전체 검사), snap2 15:41 (`ThemeLogo.astro`, `metaphr-dark.svg`, `Base.astro`, `docs.ts`, `logos.*`가 바뀐 뒤 기계 출력·화면 검사를 다시 돌림)
  - 검증 중에도 다른 에이전트가 파일을 고치고 있었고 `dist/`도 함께 다시 빌드되고 있었음. 아래 줄 번호는 snap2 기준
- 스크래치패드: `/tmp/claude-1000/-home-ubuntu-designlab/24b503c9-4ecb-4227-a44b-bcf9ecc9e3f2/scratchpad/`
  (스크린샷 `shot/verify/`, `shot/verify2/`, 측정 원자료 `shot/verify*/results.json`, 스크립트 `machine.mjs`, `shot/verify.mjs`)

## 판정: **PASS, 문제 있음** (blocker 0 · major 1 · minor 8 · question 6)

### 통과한 항목 (증거 요약)
- **빌드**: 기본 빌드와 `BASE_PATH=/design_lab` 빌드 모두 경고·오류 0건(7페이지). `@astrojs/check`는 설치돼 있지 않아 건너뜀.
- **base 경로**: `/design_lab` 빌드의 HTML에서 `href|src|content="/…"` 가운데 base를 무시한 것 0건. fonts.css의 `url()`도 `/design_lab/v1/fonts/mulmaru.woff2`로 나옴.
- **JSON**: dist의 `*.json` 전부 파싱됨.
- **URL**: `https://design.metaphr.dev/…` 절대 URL은 모두 dist 안의 파일로 이어짐(llms.txt, llms-full.txt, manifest, *.md). 이 사이트를 가리키는 http URL이나 다른 도메인 URL 없음.
- **tokens.css 계약**: 명세의 변수 71개가 빠짐도 남음도 없음. 테마 블록 4개(:root 안의 light 부분, media dark, `[data-theme=dark]`, `[data-theme=light]`)가 모두 같은 10개 이름을 가짐. `~` 범위 표기 0건. 유일한 `~`는 philosophy.md:114의 "아직 ~이 없습니다"로, 한국어 자리표시라 범위가 아님.
- **대비 재계산**(WCAG 2 상대 휘도): paper/slate 10.897, paper/teal 2.347, paper/orange 2.902, slate/teal 4.643, slate/orange 3.755, teal/orange 1.236. 문서의 10.9 / 2.35 / 2.9 / 4.64 / 3.76 / 1.24와 모두 맞음.
- **폐기색**: `#F7F2E9`, `FF6347`, `tomato`는 0건. `#3A3A38`, `크림`, `차콜`은 "폐기"라고 적힌 설명 안에만 있음(아래 minor 5는 파일 자체 문제).
- **라이브러리**: 7개(sites: pixelarticons, piskel, nes-css, pixel-icon-library / apps: aseprite, pixelarticons-app, libresprite). 개수·status가 HTML, libraries.md, `/v1/libraries.json`에서 서로 같음.
- **HTML과 .md의 수치**: philosophy·ai·libraries는 변수·hex·clamp·대비 집합이 완전히 같음. tokens 81개가 HTML "81개", tokens.md 81행, css 고유 이름 71개 + 다크 10개로 서로 맞음.
- **철학 구조**: 세 기둥 → '만드는 태도'(빼기와 범위 / 확인 단계·이유 기록 / 터미널 어휘) → '미정 사항'(MonaS12, 분류 색, 다음 색)으로 결정 로그와 같음. '가벼움'은 엔지니어링 뜻으로 쓰이지 않음(단어 자체가 없음). 로컬 우선, 번들, 빌드 없음, 프레임워크 같은 원칙은 philosophy.md에 0건.
- **화면(28조합 = 7페이지 × 1280/390 × light/dark)**, snap1과 snap2 모두:
  - 390px 가로 스크롤 0건
  - border-radius > 0, box-shadow, text-shadow 0건
  - 글자가 있는 요소의 font-weight는 400뿐, italic 0건
  - font-family는 `Mulmaru, sans-serif` 하나이고 Mulmaru는 `loaded`
  - 그라데이션은 모눈 `.thumb` 배경뿐(명세가 허용한 예외)
  - orange: 홈 1곳(`.rc.orange` 스와치), tokens 페이지 11곳(표본 페이지라 허용, `.stage.bad` 나쁜 예 포함), 나머지 페이지 0곳
  - 라이트 테마에서 teal/orange 글자색: tokens의 나쁜 예 `span.u-text` 한 곳뿐(의도한 것)
  - 콘솔 오류·경고 0건, 4xx/실패 요청 0건, naturalWidth 0인 이미지 0건, alt 없는 이미지 0건
  - 다크에서 로고가 보임: snap2에서 `metaphr-dark.svg`로 바뀌고, system=light + `mp-theme=dark`와 그 반대 조합에서도 맞게 전환됨(`shot/verify2/foot-light-dark.png`, `logos-top-light-dark.png`)
- **테마 토글**: 시스템 → 라이트 → 다크 → 시스템 순환. `localStorage mp-theme`에 저장되고, 다른 페이지로 가도 `data-theme=dark`가 유지됨. theme-color meta의 media가 테마를 따라 바뀜.
- **접근성**: 7페이지 모두 h1 1개, `lang="ko"`. 첫 Tab이 스킵 링크(`#main` 있음)이고 `:focus-visible`은 1px solid ink outline(`Base.astro:175`). reducedMotion을 흉내 내면 7페이지 모두 실행 중인 애니메이션 0개, CSS animation 0건(평소 홈은 98개).
- **느낌**: `ref-hero.png`와 같은 계열. 여백, 1px 헤어라인, 가운데 히어로 문구, 픽셀 서체, ▼ 힌트가 같음(`shot/verify/v-home-1280-light-0.png`).

---

## 발견 사항 (심각도 순)

### MAJOR

**M1. "강조색 면 위 글자는 slate"를 크기 조건 없이 적음 — slate/orange 3.76:1은 본문 크기에서 AA 미달** · 영역: 기능
- 레시피는 맞게 씀: `ai.md` 레시피 13의 `.accent-block`은 `font-size: var(--mp-size-heading)`로 제한함.
- 요약 규칙에는 크기 조건이 없음:
  - `src/lib/docs.ts:446` → ai.md:50 "orange 면·teal 면 위 글자는 slate."
  - `src/lib/docs.ts:937` → ai.md:73(붙여넣는 지시문) "강조색 면 위 글자는 slate."
  - "자주 틀리는 것" 표(docs.ts:437 부근)도 "slate 글자"만 적음
- 결과: AI가 요약만 읽으면 orange 버튼에 body 크기 slate 글자를 넣게 됨. "다크에서 orange 글자는 heading 이상"이라는 같은 비율(3.76)의 규칙과도 앞뒤가 맞지 않음.
- 레시피 주석(docs.ts:379) "위 글자는 --mp-ink"는 다크에서 ink가 paper(2.9:1)가 되므로 바로 옆 코드(`--mp-palette-slate`)와 모순됨.

### MINOR

**m1. tokens 페이지 테마 표에서 rgba 값의 닫는 괄호가 잘림** · 영역: 디자인
- `src/pages/tokens.astro:145-146`의 `.replace(')', '')`가 `rgba(48,56,65,0.16)`의 `)`를 지워 화면에 `rgba(48,56,65,0.16`으로 나옴
- 스크린샷: `shot/verify/v-tokens-1280-light-35.png`

**m2. `‹` 글리프가 Mulmaru에 없어 대체 서체로 그려짐** · 영역: 디자인
- 상단 뒤로가기 `‹ metaphr`(`src/layouts/Base.astro:59`), 모든 페이지에서 나옴
- 캔버스 측정: `Mulmaru, monospace`와 `Mulmaru, serif`로 잰 폭이 이 글자만 다름. 화면에서도 매끈한 작은 글자로 보임(`v-home-1280-light-0.png` 왼쪽 위)
- 선택지: 픽셀 글리프(`<`), SVG 사용, 또는 서체에 이 글리프가 있는지 확인

**m3. 프로젝트 `CLAUDE.md:15`가 결정 로그와 충돌** · 영역: 공통 문서
- "이전 초안(… 하드 그림자, **다크 모드**)은 폐기됨. 되살리지 않는다."라고 적혀 있으나, 결정 로그 2는 다크 모드를 전면 허용함
- 명세 본문의 "다크 모드 없음" 문구도 결정 로그로 덮였다는 표시 없이 남아 있음

**m4. `ai.md` 레시피 13의 주석 오류** · 영역: 기능
- `docs.ts:379` "위 글자는 --mp-ink"를 "--mp-palette-slate"로 고쳐야 함(M1과 같이 고치면 됨)

**m5. 공개 자원 `public/v1/logos/down.svg`의 fill이 폐기색 `#3A3A38`** · 영역: 디자인
- 사이트 화면에서는 mask로 칠해서 문제없고, logos.md:93에 설명도 있음
- 하지만 `/v1/logos/down.svg`를 `<img>`로 바로 쓰는 외부 사용자는 폐기색을 받음. `#303841`로 바꾸거나 `currentColor`로 가는 편이 안전함

**m6. tokens 페이지 HTML에 `--mp-tracking-*` 변수 이름이 없음** · 영역: 디자인
- 크기 표본은 "자간 .05em" 값만 보여줌(`tokens.astro:167`). tokens.md는 `--mp-tracking-hero` 등 10개 이름을 표로 제공
- 사람이 보는 페이지에서 복사할 이름이 없음

**m7. logos 페이지 HTML과 logos.md의 정보 차이** · 영역: 디자인
- md에는 푸터 로고 표시 margin `clamp(2.5rem, 7vh, 4rem)`, down.svg 표시 폭 `clamp(16px, 2.2vw, 22px)`, 격자 칸 변수 등이 있음. HTML 본문에는 없음(값이 틀린 것은 아님)
- snap2 기준이며 logos는 수정이 진행 중이었음

**m8. `src/pages/.omc/state/…`(HUD 상태 파일)가 pages 폴더 안에 있음** · 영역: 기능/정리
- 점 폴더라 라우트는 생기지 않음(빌드 결과 확인)
- 하지만 소스 트리 오염이고 배포 저장소에 섞일 수 있음. 삭제하거나 `.gitignore`에 넣기 권장

### QUESTION (사용자·리드 판단 필요)

**q1. fontTools/pip 서브셋 방법** · 영역: 기능
- 위치: `fonts.md:53,66`, `/v1/fonts.json`, manifest의 `heroSubset` (`pip install fonttools brotli && python3 build-font.py`, "약 1.5KB / 약 98KB")
- 서체 사용 방법으로 남길지, 엔지니어링 내용이라 뺄지 결정 필요

**q2. "새 의존성은 넣기 전에 참고 라이브러리 목록을 확인한다"가 미니멀리즘 기둥 규칙에 있음** · 영역: 기능
- 위치: `docs.ts:414` → llms.txt·manifest `pillars[minimalism].rules`
- ai.md 지시문에도 "의존성:" 블록이 있고, 순서 2단계와 자주 틀리는 것 표에도 나옴. libraries.md는 "AI가 … 어떤 라이브러리를 쓸지"라고 소개함
- 사용자는 "라이브러리 보관함은 픽셀아트 예시만"이라고 했으므로 의존성 선택 규칙(엔지니어링)으로 읽히는 문구를 디자인 기둥에서 빼는 편이 맞는지 확인 필요
- 같은 맥락: `src/data/libraries/schema.json:25`의 category 예시(framework, cms, storage, sync, notifications …)

**q3. 다크에서 "orange 글자는 --mp-size-heading 이상 3.76:1"의 근거** · 영역: 기능
- WCAG의 3:1 "큰 글자"는 24px 이상(굵게면 18.66px)임
- heading은 `clamp(1.15rem, 3.2vw, 1.7rem)` = 18.4–27.2px이고 굵기 400만 쓰므로, 대부분의 뷰포트에서 큰 글자가 아님
- 기준을 `--mp-size-title` 이상으로 올릴지 결정 필요

**q4. 투명도 위계의 대비** · 영역: 기능/디자인
- metaphr.dev에서 물려받은 값이지만, 라이트 기준 meta .55 = 3.06:1, kicker .45 = 2.41:1, fine .35 = 1.93:1로 본문 크기 AA 미달
- 다크: .45 = 3.56, .35 = 2.74
- 원칙으로 받아들일지, 문서에 "장식·보조 정보 전용" 같은 단서를 달지 결정 필요

**q5. 로고 원화 색이 순흑에 가까워 보임** · 영역: 디자인
- `metaphr.svg`는 PNG를 넣은 SVG이고, 라이트 화면에서 거의 검정으로 렌더됨(`shot/verify2/logos-top-light-dark.png`)
- "#000 금지, 로고는 다시 그리지 않음" 두 규칙 가운데 무엇이 우선인지 문서에 명시가 필요한지
- 원화 안의 픽셀 그림자 모양은 box-shadow가 아닌 그림이라 규칙 위반은 아님

**q6. down.svg 힌트의 5px 왕복(2.6s ease-in-out)** · 영역: 기능
- 위치: `logos.json:10,85`
- 철학의 "움직임은 숨쉬기(3.4–5.8s)와 터미널, 둘뿐"과 주기가 다름. 명시된 예외로 둘지, 숨쉬기 범위에 맞출지 결정 필요

---

## 실행 기록
- `BASE_PATH=/design_lab npx astro build` → `scratchpad/dist-base`로 복사
- `npx astro build`(기본)로 루트 `dist/`를 되돌려 둠. 다만 그 뒤에도 다른 에이전트의 빌드가 `dist/`를 다시 씀
- snap1/snap2: `scratchpad/snap*/`에서 `npx astro build` → `node scratchpad/machine.mjs <dist>`
- `npx astro preview --port 4330`(snap1, snap2)과 `node shot/verify.mjs`(28조합 스캔, reducedMotion 7페이지, 토글·포커스) 실행. `shot/views.mjs`로 뷰포트 스크린샷 49장, `shot/foot.mjs`로 수동 테마에서 로고 전환 확인
- 프리뷰 서버는 종료했음(`pgrep -af 'astro preview'` 결과 없음)
