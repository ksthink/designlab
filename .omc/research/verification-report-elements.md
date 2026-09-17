# 검증 보고서 — 디자인 요소(Elements) 구조

- 날짜: 2026-09-17 · 대상: `dist/` (strict 빌드, 요소 97개) · 방법: 기계 스크립트(Python·fontTools), Playwright(chrome-headless-shell), `astro preview :4350` (검증 뒤 중지)
- 증거 파일(scratchpad): `vmach.py`, `vcontent.py`, `v2.py`, `shot/ve1–ve5.mjs`, `shot/ve1.json`, `shot/ve2.json`, `shot/ve3.json`, 스크린샷 `shot/ve/*.png`

## 판정
**조건부 통과.** AI 경로(llms.txt → 요소 문서)는 목표대로 작동한다. 기계 출력은 깨끗하다(URL·파일·폐기색·`~` 문제 0건). 사람용 화면은 텍스트가 적고 데모가 양쪽 테마에서 모두 그려진다.
blocker는 없다. major는 2건이다: **(M1) 요소 페이지 18곳에서 JS 오류**, **(M2) settings와 switch 문서의 켜짐 색이 서로 모순**. 둘 다 사용자 예시와 같은 흐름("설정 화면에 스위치")에서 AI가 틀린 결과를 낼 수 있다.

---

## 1. AI 경로 시뮬레이션

### 예시 요청 "메뉴 버튼 모양과 이펙트를 적용해줘"
- `llms.txt`: 13,204자(한글 2,656자), **약 5.4k 토큰**(목표 12k 이하 충족). 맨 위에 "요청한 요소만 골라 읽는 법"이 있고, 예시로 이 요청을 그대로 들어 `menu`·`button`·호버 이펙트로 안내한다.
- 색인만 보고 찾을 수 있는가: 예. `menu`(검색어 "메뉴 버튼"), `button`, 이펙트 분류의 `invert-hover`("호버")와 `fx-fill`을 찾을 수 있다. menu.md에 "이펙트(함께 읽기)" 링크가 있어 따라 읽을 수 있다.
- 읽은 문서와 토큰 추정: menu 4.9k · button 1.8k · invert-hover 2.5k · fx-fill 2.6k → **경로 전체 약 17k 토큰**. 문서마다 공통 규칙 블록(약 0.6k)이 반복된다.
- 품질: 네 문서 모두 혼자 읽어도 이해되고, 수치·상태 표·동작·접근성·반응형·앱(SwiftUI/Compose)·자주 틀리는 것까지 담겨 있다. 토큰 값도 tokens.css와 맞는다(hover 0.25s, fill 0.19s, `steps(4, end)`, nav .7, meta .55, muted .5).
- 문서끼리 맞는가:
  - 메뉴 버튼의 호버·열림 = ink/bg 반전. button·invert-hover와 같다 ✓
  - 현재 위치 = teal ■ 면 + opacity 1 + 밑선. tab-bar의 현재 탭도 같은 표현이다 ✓
  - orange는 현재 위치에 쓰지 않고 화면당 하나만 쓴다. menu·tab-bar·공통 규칙이 같은 말을 한다 ✓
  - 작은 차이는 minor m1에 적었다.

### 다른 요청 3건 (라우팅)
| 요청 | 색인에서 찾은 문서 | 결과 |
|---|---|---|
| 설정 화면에 스위치와 토스트 | `settings`, `switch`, `toast` | 찾기는 정확하다. 하지만 **settings와 switch의 내용이 모순된다(M2)** |
| 다크 모드 모달 | `theme`(다크 모드), `modal`, 필요하면 `theme-switch` | 정확하다 |
| 앱 하단 탭 바 | `tab-bar`(하단 탭) | 정확하다. iOS 26 유리 탭 바를 OS 예외로 적어 두었다 |

검색어가 비는 곳(elements.json 전체 검색어 기준): "이펙트"(사용자 예시에 나오는 단어인데 어느 요소의 검색어에도 없고, 분류 제목에만 있다), "테이블", "앱바"(띄어 쓴 "앱 바"는 있다), "리플", "로그인 폼", "채팅", "차트", "결제", "가격". 앞의 네 개는 추가를 권한다. 나머지는 요소가 없는 영역이다(q2). 사람용 필터에서 "이펙트"로 찾으면 0개가 나온다(m3).

## 2. 기계 출력
- `llms.txt`, `llms-full.txt`, `elements.json`, `v1/elements.json`, manifest, logos/fonts/libraries JSON, 모든 `.md` 안의 design.metaphr.dev URL 2,153개를 확인했다. 깨진 것은 0개다. 스크립트가 잡은 5건은 JSON 이스케이프(`\"`)나 `<id>` 자리표시를 잘못 읽은 것이다.
- 절대 URL은 모두 `https://design.metaphr.dev`다. localhost·vercel.app 주소는 fontcdn 보관 기록(`archive`)에만 있고, 이는 의도된 것이다.
- `/elements/<id>.md`·`.html` 97개와 분류 문서 `/elements/<category>.md` 10개가 모두 있다. `elements.json`과 `v1/elements.json`은 바이트 단위로 같다.
- 97개 문서 모두 공통 규칙 블록이 있다. `~` 범위 표기 0건, 폐기색(#F7F2E9·#3A3A38·#FF6347·58,58,56) 0건.
- libraries: 항목 7개 모두 썸네일이 절대 URL이고 파일도 있다.

## 3. 내용 규칙 (97개 원본 md)
- 토큰: 쓰인 `--mp-*` 이름이 모두 tokens.css에 있다. `color.md:44`의 `--mp-opacity-`는 접두사를 설명하는 글이라 문제없다.
- 굵기·radius·그림자·blur: 400이 아닌 굵기, 0이 아닌 radius, `box-shadow`는 0건이다. 걸린 줄은 모두 금지를 설명하는 문장이다. 앱 코드 쪽 `.clipShape(Circle())` 등도 "하지 말 것" 예시다.
- 그라데이션: 11건 모두 모눈선 `linear-gradient(var(--mp-grid-line) 1px, transparent 1px)`이라 허용된다.
- 데모의 `<script>`: 0건.
- 글리프: 데모 HTML 글자·aria-label·placeholder·CSS `content:`의 모든 문자가 mulmaru.woff2 cmap에 있다(fontTools 확인). `− ‹ ›`는 "Mulmaru에 없음"을 설명하는 줄(date-picker·stepper·terminal-vocabulary)에만 나온다.
- 라이트 테마 orange·teal 글자: 브라우저 계산값으로 97개 라이트 패널을 검사했다. ■를 뺀 글자 중 orange·teal 색은 0건이다. `color: var(--mp-accent)`는 모두 ■ 마크에만 쓰였다.
- 데모 글자 수: 12자가 넘는 문장은 0건이다. 걸린 2건(glyph-field, hero)은 장식 글리프 줄이다.

## 4. 사람용 화면
스크린샷 28장(페이지 7개 × 1280/390 × 라이트/다크)을 찍고 확인했다.
- **텍스트 최소:** 요소 상세 페이지에 용도·생김새 같은 설명 절이 없다(`main` 안의 h2/h3 0개, 본문 글자 127–165자). 이름, 배지, AI 문서 링크, 라이트/다크 데모, 이펙트·함께 보기 칩, 접힌 CSS/JS/HTML만 있다 ✓
- **데모 렌더링:** 97개 요소 × 2패널을 검사했다. 빈 iframe 0, 깨진 이미지 0, 패널 높이는 내용에 맞는다(1280에서 280px, 390에서 209–264px) ✓. 다크 패널에는 slate 바탕이 적용된다.
- **갤러리:** `/elements` 썸네일 97/97이 스크롤 뒤 그려진다(`.on`, 보이는 상자 > 0, 깨진 이미지 0) ✓
- **가로 넘침:** 390에서 7개 페이지 모두 0 ✓. 단, grid-thumbnail 패널 안에서만 20px 넘친다(m4).
- **콘솔:** 최상위 페이지의 404는 0건이다. **18개 요소 페이지에서 JS 오류(M1)**
- **계산 스타일(iframe 밖):** 모든 페이지에서 글꼴은 Mulmaru, 굵기 400, radius 0, 그림자 0 ✓. iframe 밖 orange는 `/`에 1개(`span.rc.orange`, 팔레트 칩)이고 나머지 페이지는 0이다 ✓
- **필터:** "메뉴" → 9개(menu·button·tab-bar·drawer 등), "switch" → switch·theme-switch, 없는 단어 → "0개" ✓. "이펙트" → 0개(m3)
- **테마 전환:** `[ 시스템 ] → [ 라이트 ] → [ 다크 ] → [ 시스템 ]`. 썸네일 iframe의 `data-theme`와 body 배경이 즉시 따라 바뀐다 ✓
- **reduced-motion:** `/`, float, caret, loading, status-dot, fx-fill에서 페이지와 iframe 모두 실행 중인 애니메이션이 0개다. 일반 모드에서는 float 8, caret 4, loading 18개가 돈다 ✓

## 5. 성능 (로컬 preview, 참고값)
- `/elements`: HTML 572KB(전송 압축 53KB), iframe 97개(`loading="lazy"`), FCP 0.79s, DOMContentLoaded 1.6s, load 5.8s. JS 힙 40MB.
- 네트워크에서 실제로 받는 것은 서체 100KB 한 번이다. iframe마다 `tokens.css` 요청이 97번 가지만 캐시로 처리된다. Vercel에서는 `/v1/` 캐시 헤더가 있어 문제가 크지 않다.
- 첫 화면은 빠르다. load 5.8s는 iframe 문서 97개 때문이다(m5).

---

## 발견 사항

### BLOCKER
없음.

### MAJOR

**M1. 요소 페이지 18곳에서 데모 iframe 안 JS 오류** · 영역: 디자인(`src/components/DemoFrame.astro`, `src/pages/elements/[id].astro`), 또는 작성
- 원인: 패널 데모가 `## 코드`의 ```js 조각을 그대로 실행한다(`DemoFrame.astro`의 `mode==='panel' && js`). 조각이 선언하지 않은 변수(`btn`, `dialog`, `panel` …)를 쓰므로 `ReferenceError`가 난다. 요소마다 라이트·다크 두 번 난다.
- 해당 요소: menu(btn), tabs(list), breadcrumb(ol), drawer(null.addEventListener), dropdown-menu(menu), context-menu(list), carousel-nav(prev), table-of-contents(toc), slider(input), file-upload(zone), toast(layer), tooltip(target), modal(dialog), bottom-sheet(grip), popover(pop), action-sheet(sheet), page-read(item), theme-switch(btn)
- 영향: 콘솔 오류. theme-switch 데모는 세 버튼이 모두 같아 보여 현재 값 표시가 없다(스크린샷 `_elements_theme-switch-1280-dark.png`).
- 권장: 명세("데모는 script 없이 동작, JS는 코드 섹션에만")대로 패널에서는 JS를 실행하지 않는다. 필요한 요소(fx-fill `applyFill` 등)만 데모 마크업을 완성형으로 두거나 `demo-js` 같은 명시 블록만 실행한다. 최소한 `try{}catch{}`로 감싼다. 실행을 끄면 fx-fill 첫 데모 링크에 label이 없어 호버 때 글자가 칸에 가려진다. 그러니 fx-fill 데모 마크업도 label을 넣은 완성형으로 바꿔야 한다(작성 effects).

**M2. settings와 switch의 켜짐 색 모순** · 영역: 작성(patterns/settings.md ↔ inputs/switch.md)
- `switch.md:27,36,103,107`: 켜짐은 `--mp-ink` 채움. "하지 말 것: 초록·teal·orange 켜짐 색". OS 예외에서도 `.tint`는 잉크 값이다(`:99`).
- `settings.md:67`: "토글 행의 켜짐 색은 teal(`--mp-secondary`) 면". `:145` `.tint(secondary)`로 teal, `:143` Android `checkedTrackColor = secondary`.
- "설정 화면에 스위치" 요청에서 AI가 두 문서를 같이 읽으면 결과가 갈린다. 결정이 필요하다(q1). 정한 쪽에 맞춰 다른 문서를 고친다.

### MINOR

**m1. 반전 호버 적용 방식이 문서마다 조금 다르다** · 영역: 작성(actions, navigation)
- invert-hover는 `@media (hover: hover)`에서만 `:hover`, 터치는 `:active` 반전, 반전 때 테두리도 `--mp-ink`로 바꾼다.
- button.md·menu.md 코드는 미디어 쿼리 없이 `:hover`만 쓰고 테두리색을 바꾸지 않는다. button 웹 코드에는 터치 `:active` 반전이 없다(앱 섹션에만 "눌림 = 반전").
- AI가 menu+button만 읽으면 invert-hover의 터치 규칙을 놓친다. button·menu 코드에 `(hover: hover)`와 `border-color`를 맞추기를 권한다.

**m2. button 강조 ■ 위치 표현이 어긋난다** · 영역: 작성(actions/button.md)
- 상태 표는 "기본 버튼 **옆에** ■ 강조 마크"라고 한다. 데모와 코드는 ■를 버튼 **안** 글자 앞에 둔다. 하나로 맞춘다.

**m3. 검색어·필터가 "이펙트"를 모른다** · 영역: 기능(`src/pages/elements/index.astro` 필터) + 작성(effects 검색어)
- 필터가 분류 이름을 검색하지 않는다("이펙트" → 0개). effects 요소 검색어에도 "이펙트"가 없다.
- 추가 권장 검색어: "이펙트"(invert-hover·fx-fill·press), "테이블"(table), "앱바"(header), "리플"(press)

**m4. grid-thumbnail 패널 가로 넘침** · 영역: 작성(foundations/grid-thumbnail.md 데모) 또는 디자인
- 패널 안 문서 폭이 532 > 512px라 셋째 칸이 오른쪽에서 잘린다(`shot/ve/grid-thumb-panel.png`). 데모에 `flex-wrap`을 넣거나 폭을 줄인다.

**m5. `/elements`의 iframe 97개** · 영역: 디자인
- 로컬 load 5.8s, iframe마다 tokens.css 요청이 한 번씩 간다. 지금도 쓸 만하다. 요소가 더 늘면 분류별 접기나 IntersectionObserver로 srcdoc을 늦게 넣는 방식을 검토한다.

**m6. 문서당 공통 규칙 블록 반복(약 0.6k 토큰)** · 영역: 기능
- 요소 4개를 읽으면 약 2.4k 토큰이 중복된다. 허용 범위라 그대로 둬도 된다. 줄이려면 두 번째 문서부터 링크로 대신한다.

### QUESTION

**q1. 설정 화면 스위치의 켜짐 색**: 잉크 채움(switch)인가, teal 면(settings)인가? M2를 고치려면 결정이 필요하다. 선택 지속 표시에 teal 면을 쓰는 어휘(invert-hover, chip)와 맞추려면 teal, 반전 어휘와 맞추려면 ink다.

**q2. 갤러리 썸네일의 orange 개수**: iframe 안은 규칙 검사 대상에서 뺐다. 그래도 홈 갤러리 썸네일 12개 중 4개(버튼 ■, 상태 점, 텍스트 입력 오류 ■, 배지 ■)에 orange가 있고, iframe 밖 팔레트 칩까지 하면 한 화면에 orange가 5곳 보인다. `/elements`는 16곳이다. 견본 모음이라 예외로 둘지, 썸네일에서 강조를 끌지 결정이 필요하다.

**q3. 없는 요소 영역**: 차트·채팅·결제·가격표·로그인 폼 패턴이 없다. 제안안(proposed)으로 추가할지 결정이 필요하다.
