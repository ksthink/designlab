# 디자인 요소(Elements) 명세 — 기능·디자인·작성·검증 에이전트 공유

> ⚠️ 사용자 추가 지시(최우선): **사람용 화면은 예시(데모) 중심, 텍스트는 최대한 뺀다. AI용 문서(.md)는 상세하게.**
> - 사람용: 요소 이름 + 데모(라이트/다크) + 최소 배지. 설명 문단·상태 표·규칙 목록은 사람용 화면에 기본 노출하지 않는다(필요하면 접힌 코드만).
> - AI용: 수치·상태·동작·접근성·앱 적용·해야 할 것/하지 말 것을 빠짐없이. proposed 요소도 AI가 바로 구현할 수 있을 만큼 구체적으로.
> - 데모는 요소마다 '간략한 예시' — 요소의 핵심 형태와 주요 상태(예: 기본·호버/선택·비활성)를 한 화면에 보여 주되 글자는 최소(짧은 라벨만).

> 사용자 요청(2026-09-17): 사람은 이미지(실제 동작하는 예시) 중심으로 보고, AI는 요청에 맞는 **요소 문서만** 골라 읽고 원칙에 따라 적용한다.
> 예: "디자인랩을 참고해서 메뉴 버튼 모양과 이펙트를 적용해줘" → AI가 색인에서 `menu`, `button`, `invert-hover`/`fx-fill` 문서를 골라 읽고 적용.
> 사이트·앱 요소를 이름과 기능으로 분류한다. 현재 없는 요소도 metaphr 원칙에 맞춰 **제안안(proposed)** 으로 간략히 넣는다.

상위 규칙은 `.omc/research/design-spec.md`(결정 로그 우선)와 `src/content/philosophy.md`, 토큰은 `src/data/tokens.json`(`--mp-*`)을 따른다.

## 1. 원본 위치와 파일 형식
요소 하나 = 마크다운 파일 하나: `src/content/elements/<category>/<id>.md`

```md
---
id: button                      # 영문 kebab-case, 주소가 된다(/elements/button). 한번 정하면 바꾸지 않는다
name: 버튼                       # 한국어 이름
nameEn: Button
category: actions               # 아래 분류 id
summary: 행동 하나를 실행하는 1px 테두리 사각형. 호버하면 잉크/배경이 반전된다.   # 한 문장
aliases: [버튼, btn, CTA, 누르기, 액션 버튼, primary button]   # 한·영 검색어. AI가 요청을 이 문서에 연결하는 열쇠
platforms: [web, ios, android]  # 해당하는 것만
status: extracted               # extracted = metaphr.dev·기존 작업에서 추출 / proposed = metaphr 원칙으로 새로 만든 제안안
source: metaphr.dev app.html .btn   # extracted면 출처, proposed면 생략
pillars: [minimalism, pixel-art]    # minimalism | pixel-art | retro-color
tokens: [--mp-ink, --mp-bg, --mp-line-button, --mp-size-small, --mp-tracking-small, --mp-duration-hover]
effects: [invert-hover]         # 이 요소가 쓰는 effects 분류 요소 id
related: [icon-button, link, menu]
---
```

본문 섹션은 **이 순서, 이 제목** 그대로 (없으면 섹션 생략 가능한 것은 표시):

```md
## 용도
언제 쓰고, 언제 쓰지 않는지 (2–4줄).

## 생김새
구조와 수치. 토큰 이름으로. (목록)

## 상태
기본 / 호버 / 포커스 / 누름 / 비활성 / 선택 / 오류 등 해당하는 것만. (표 또는 목록)

## 동작                           ← 이펙트·모션이 없으면 생략
연결된 effects 문서와 시간·계단 값. reduced-motion 처리.

## 데모
```html demo
<!-- 사람용 페이지에서 실제로 렌더링되는 예시. 아래 CSS만으로 동작해야 한다. 클래스는 mp- 접두사. -->
```

## 코드
```css
/* 복사해서 쓰는 CSS. --mp-* 변수만. 데모와 같은 코드. */
```
(필요하면 ```js 블록 추가 — 최소한으로)

## 앱                             ← platforms에 ios/android가 있을 때만
SwiftUI / Jetpack Compose 적용 요점 3–5줄(코드 조각 짧게 가능). OS가 강제하는 부분은 예외로 명시.

## 해야 할 것 / 하지 말 것
- 해야 할 것: …
- 하지 말 것: …
```

### 작성 규칙
- **AI용이므로 상세하게.** 문서 하나 본문 80–180줄 목표. extracted·proposed 모두 수치·상태·동작·접근성(역할/aria/키보드)·반응형·앱 적용까지 구현 가능한 수준으로. 데모만 짧고 텍스트가 적게.
- 데모는 텍스트 최소: 라벨은 1–3글자 또는 짧은 단어, 설명 문장 금지. 여러 상태를 나란히 보여 준다(상태 표시는 시각적으로; 필요하면 아주 작은 meta 라벨).
- 한국어, 해라체 규칙 문장("…한다", "…하지 않는다"). 범위는 `–`(en dash), `~` 금지.
- 값은 **토큰 이름**으로 쓴다. 새 색·새 크기를 만들지 않는다. 토큰에 없는 수치(예: 버튼 padding .75em 1.5em)는 metaphr.dev 원값이면 그대로, 아니면 em 단위의 절제된 값.
- 세 기둥 준수: Mulmaru 400 하나 · 1px 헤어라인 · radius 0 · 그림자·그라데이션·blur 없음 · 위계는 투명도(필수 정보 .7 이상) · 강조 orange는 화면당 하나(면·■ 위주, 라이트에서 글자 금지, 글자면 24px 이상) · teal은 보조 면/선택 표시(라이트에서 글자 금지) · 상호작용은 잉크/배경 반전 · 모션은 숨쉬기(ease-in-out 느리게) 또는 터미널(steps) · reduced-motion에서 정지 · 라이트/다크 둘 다 변수로 자동 대응.
- 터미널 어휘: `[ 확인 ]`, `>`, `■`, `_` 등은 요소에 맞을 때만. 말투는 짧게.
- 데모 HTML은 `<script>` 없이 동작하는 것을 우선. 꼭 필요하면 `## 코드`에 ```js 로 두고 데모는 정적 상태(예: 열린 모달)를 보여준다.
- 데모 CSS 클래스는 `mp-<id>` 접두사로 요소끼리 충돌하지 않게. 공통 리셋·폰트·토큰은 사이트가 제공한다고 가정.
- 앱 섹션: iOS SwiftUI / Android Compose 기준. 직각(`RoundedCornerShape(0)`/`Rectangle()`), 그림자 없음(`elevation 0`), Mulmaru 400, 토큰 값을 앱 상수로. 시스템 시트·스위치 등 OS 강제 요소는 예외로 명시.

## 2. 분류 (category id → 요소 id 목록)
`[E]` = extracted(metaphr.dev·기존 작업에 근거 있음), 나머지 = proposed.

### foundations — 기초
color[E] · typography[E] · spacing-layout[E] · grid-thumbnail[E] · pixel-icon[E] · logo[E] · motion[E] · theme[E] · elevation(그림자 없음 규칙)[E] · focus-ring[E]

### actions — 행동
button[E] · icon-button · link[E] · text-action(`[ 확인 ]`형 터미널 버튼) · fab(앱 플로팅 버튼, 사각·그림자 없음) · segmented-control · chip

### navigation — 이동
header[E](상단 바/앱 바) · menu[E](내비게이션 링크 목록, 현재 위치 표시) · tab-bar(앱 하단 탭) · tabs · back-link[E] · breadcrumb · pagination · drawer(사이드 메뉴) · dropdown-menu · context-menu · page-indicator[E](8px 사각 점) · carousel-nav[E](‹ › 대신 < > 버튼) · scroll-hint[E] · table-of-contents[E]

### inputs — 입력
text-field · textarea · search-field · checkbox · radio · switch · select · slider · stepper(+/−) · date-picker · file-upload · form-validation

### content — 내용 표시
card[E] · list · table[E] · badge[E] · tag · avatar · image · divider[E] · code-block[E] · stat(숫자 강조) · accordion[E](`<details>` +/−) · rail[E](가로 캐러셀) · quote · key-value · timeline

### feedback — 상태 알림
status-dot[E](기록 중 점 등, 강조 orange 한 곳) · toast · banner · progress-bar · loading(터미널형 `...`/■ 계단) · skeleton · tooltip · empty-state[E] · error-state · confirm-step[E](되돌릴 수 없는 행동 전 확인·입력 확인)

### overlays — 겹침
modal · bottom-sheet(앱) · popover · action-sheet(앱, OS 예외 명시)

### effects — 이펙트
invert-hover[E](잉크/배경 반전) · fx-fill[E](8칸 steps 채움) · float[E](숨쉬기) · caret[E](■ 깜빡임) · reveal[E](등장) · glyph-field[E](터미널 글리프 배경) · scramble[E](브랜드 글자 스크램블) · press(누름: 1px 이동, 그림자 없음) · reduced-motion[E]

### patterns — 화면 패턴
hero[E] · section-head[E](분류 제목 + 옅은 설명) · footer[E] · page-list[E](1180px 목록형) · page-read[E](760px 읽기형) · settings(앱 설정 화면) · onboarding · splash(앱) · app-icon(앱 아이콘, OS 마스크 예외) · widget(앱 위젯) · notification(알림 문구) · theme-switch[E] · dark-images[E](테마별 이미지·mask 예외)

### writing — 문구
microcopy[E](짧은 말투) · terminal-vocabulary[E](`>`, `[ ]`, `■`, `_`) · labels-numbers(숫자·단위 표기)

## 3. 출력 (기능 에이전트)
- Astro content collection `elements` (zod 스키마로 frontmatter 검증: 필수 필드, category·status·pillars·platforms enum, id=파일명, related/effects가 실제 id인지, tokens가 tokens.css에 실제로 있는지 → 없으면 빌드 실패).
- `/elements.json` (= `/v1/elements.json`): 색인. `{ categories:[{id,name,nameEn,summary}], elements:[{id,name,nameEn,category,summary,aliases,platforms,status,pillars,effects,related,url,markdown}] }`
- `/elements/<id>.md`: 요소 문서 원문 + 끝에 **공통 규칙 블록**(200–300 토큰: 세 기둥 핵심 규칙, 토큰 import 두 줄, 화면당 강조 하나 같은 요소 간 규칙, 전체 철학 링크) 자동 첨부. frontmatter는 사람이 읽는 메타 줄로 변환해 머리에.
- `/elements/<category>.md`: 분류별 요약 목록(각 요소 한 줄 + 링크).
- `/llms.txt`를 **요소 색인 중심**으로 재구성: 맨 위에 "요청한 요소만 골라 읽는 법"(1. 요청에서 요소 찾기 → 2. aliases로 매칭 → 3. /elements/<id>.md 읽기 → 4. effects·related 따라가기 → 5. 공통 규칙 확인), 그 아래 분류별 요소 한 줄 목록(id — 이름 — aliases 일부 — URL). 기존 문서(철학·토큰 등)는 아래로.
- `llms-full.txt`는 유지하되 요소 문서는 넣지 않음(대신 색인 링크).
- manifest에 elements 추가. `ai.md`의 레시피 0–14는 해당 요소 문서로 옮기고 ai.md에는 요소 문서 링크 표만 남긴다(내용 중복 제거).

## 4. 사람용 화면 (디자인 에이전트)
- `/elements`: **이미지 중심 갤러리.** 분류 섹션(metaphr.dev 분류 섹션 스타일) × 요소 카드. 카드 썸네일 = 모눈 배경 위 **실제 데모 렌더링**(축소·클릭 불가 처리) 또는 픽셀 글리프. 카드 하단은 이름·한 줄·배지(추출/제안, 플랫폼). 상단에 분류 바로가기와 검색(클라이언트 필터: 이름·aliases).
- `/elements/<id>`: 큰 데모 패널(라이트·다크 나란히), 상태 목록, 짧은 설명, 코드는 `<details>`로 접기 + 복사 버튼, "AI용 문서: /elements/<id>.md" 표시, related/effects 링크 칩.
- 데모 CSS는 요소 문서의 ```css 블록을 그대로 페이지에 주입(요소 페이지 범위). 갤러리 썸네일은 CSS 충돌을 피하려 요소별 스코프(예: `@scope` 또는 id 접두 클래스, 필요 시 iframe srcdoc)로.
- 내비게이션: 첫 메뉴를 "요소"로. 홈은 이미지 중심으로 요소 갤러리 미리보기 강화.
- proposed 요소는 배지 `제안` (dashed), extracted는 `추출` (실선).
