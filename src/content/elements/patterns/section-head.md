---
id: section-head
name: 분류 제목
nameEn: Section Head
category: patterns
summary: 분류 이름 h2와 옅은 한 줄 설명을 같은 기준선에 나란히 둔다. 둘 다 천천히 떠 있다.
aliases: [분류 제목, section head, 섹션 제목, 섹션 헤더, 카테고리 제목, 소제목, section title, 그룹 제목]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .cat-head
pillars: [minimalism]
tokens: [--mp-size-heading, --mp-tracking-heading, --mp-opacity-secondary, --mp-size-small, --mp-section, --mp-ease-float, --mp-border, --mp-line]
effects: [float, reveal]
related: [rail, page-list, card, typography]
---

## 용도
목록 화면에서 분류(앱 종류, 요소 분류)를 시작할 때 쓴다. 바로 아래에 `rail`이나 카드 격자가 온다.
분류 하나에 제목 하나. 제목만으로 뜻이 통하면 설명은 생략한다.
읽기 문서(`page-read`) 안의 소제목은 이 패턴이 아니라 일반 h2(`--mp-size-heading`)를 쓴다.
앱에서는 목록의 구획 머리(설정의 분류, 기록의 날짜 묶음)에 같은 규칙을 쓴다.

## 생김새
**구조**
- `<section class="cat" aria-labelledby="cat-<id>">` 안에 `<div class="cat-head">` → `<h2 id="cat-<id>">` + `<span>`(설명)
- 그 아래 `rail-box`(레일) 또는 카드 격자

**수치**
- 머리: `display: flex; align-items: baseline; flex-wrap: wrap; gap: 0 1.2em`
- 머리 아래 여백 `clamp(1.5rem, 4vh, 2.5rem)`
- 제목 h2: `--mp-size-heading`(`clamp(1.15rem, 3.2vw, 1.7rem)`), `--mp-tracking-heading`(.06em), 굵기 400, `margin: 0`
- 설명: `--mp-size-small`(12px), 자간 `0.04em`, `opacity: var(--mp-opacity-muted)`(.5)
- 분류 영역 `.cat`: 위아래 `--mp-section`, `overflow-x: clip`(떠 있는 레일이 가로 스크롤을 만들지 않게)
- 제목 글자 수: 한 단어(2–6자). 설명: 한 줄, 20자 안팎

**반응형**
| 폭 | 동작 |
|---|---|
| 390px | 제목 약 18px(`3.2vw` 하한 1.15rem), 설명이 대개 제목 아래 줄로 내려간다(`gap` 세로 0) |
| 700px | 제목·설명이 한 줄. 아래 레일 카드는 360px 고정 폭이 된다 |
| 860px | 레일 좌우 `< >` 버튼이 나타나므로 머리 좌우 정렬을 레일 틀(`.wrap`)과 맞춘다 |
| 1180px 이상 | 제목 `1.7rem` 상한, 머리는 1180px 틀 왼쪽에 붙는다 |
- 미디어 쿼리는 두지 않는다 — 크기는 clamp로 따라간다
- 설명이 두 줄 넘게 접히면 문구를 줄인다(390px에서 한 줄이 기준)

**접근성**
- 제목은 문서 구조상 h2(페이지 h1은 히어로 슬로건 또는 페이지 제목). 크기 때문에 h3 등으로 바꾸지 않는다
- section에 `aria-labelledby`로 제목을 연결하면 스크린리더 랜드마크 목록에 분류 이름이 나온다
- 설명은 .5라 보조 정보 전용이다. 분류를 이해하는 데 꼭 필요한 말은 제목에 둔다
- 떠 있는 움직임은 움직임 줄이기에서 정지
- 제목·설명은 포커스 대상이 아니다. Tab은 머리를 건너뛰고 레일 첫 카드로 간다
- 떠 있는 `transform`은 글자 위치만 옮기고 레이아웃·읽기 순서를 바꾸지 않는다

**조합 규칙**
- 바로 아래에는 `rail` 하나 또는 카드 격자 하나만 온다. 머리 둘을 연달아 두지 않는다
- 첫 분류 머리 위에는 `lead` 문단(홈) 또는 페이지 제목 h1(하위 목록)이 있어야 한다
- 한 화면의 분류 머리들은 모두 같은 모양 — 하나만 크게·강조색으로 만들지 않는다
- orange ■·배지·버튼·링크를 머리에 붙이지 않는다. 분류 상태(준비 중 등)는 카드 배지로 말한다
- 설명 문구는 분류끼리 길이를 비슷하게 맞춘다(한 줄)

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 제목 불투명, 설명 .5, 각자 떠 있음 |
| 스크롤 진입 전 | `reveal` 대기(`opacity: 0; translateY(14px)`) |
| 진입 | `--mp-duration-reveal` ease로 나타남 |
| 설명 없음 | 제목만. 빈 span을 남기지 않는다 |
| 움직임 줄이기 | 정지, 바로 보임 |

제목은 링크가 아니다. 분류 전체 보기가 필요하면 레일 끝 카드나 별도 `link`로 둔다.

## 동작
- 제목과 설명 각각 `float`: 진폭 2.5–5.5px, 주기 3.4–5.8s(`--mp-ease-float`), 위상 `--fdl` 0 – -5s. 두 요소의 값을 서로 다르게 줘서 따로 숨쉰다.
- 분류 영역 `reveal`: IntersectionObserver `rootMargin: 0px 0px -12% 0px`.
- `prefers-reduced-motion: reduce`: 애니메이션 없음.

## 데모
```html demo
<div class="mp-section-head-demo">
  <div class="mp-section-head">
    <h2 style="--fd:4.6s;--fdl:-2s">도구</h2>
    <span style="--fd:5.2s;--fdl:-4s">기록</span>
  </div>
  <div class="mp-section-head-rail" aria-hidden="true"><i></i><i></i><i></i></div>
</div>
```

## 코드
```css
.mp-section-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 0 1.2em; margin-bottom: clamp(1.5rem, 4vh, 2.5rem); }
.mp-section-head h2, .mp-section-head span {
  animation: mp-section-head-float var(--fd, 4s) var(--mp-ease-float) var(--fdl, 0s) infinite alternate;
}
.mp-section-head h2 { margin: 0; font-weight: 400; font-size: var(--mp-size-heading); letter-spacing: var(--mp-tracking-heading); }
.mp-section-head span { font-size: var(--mp-size-small); letter-spacing: 0.04em; opacity: var(--mp-opacity-secondary); }
@keyframes mp-section-head-float {
  from { transform: translateY(var(--fa, 3px)); }
  to   { transform: translateY(calc(var(--fa, 3px) * -1)); }
}
.mp-section-head-rail { display: flex; gap: 0.9rem; }
.mp-section-head-rail i { flex: 1; aspect-ratio: 4 / 3; border: var(--mp-border) solid var(--mp-line); }
@media (prefers-reduced-motion: reduce) { .mp-section-head h2, .mp-section-head span { animation: none; } }
```
실제 분류 영역: `.cat { padding-block: var(--mp-section); overflow-x: clip; }`.

## 앱
- SwiftUI: `HStack(alignment: .firstTextBaseline, spacing: 12)` 제목 + `.opacity(0.5)` 설명. `List`의 `Section` 헤더 기본 스타일(대문자·회색·작은 글자)을 쓰지 않고 커스텀 뷰로.
- Compose: `Row` + `Modifier.alignByBaseline()`, 제목 `fontSize` heading 상수, 설명 `alpha = 0.5f`.
- 접근성: iOS `.accessibilityAddTraits(.isHeader)`, Android `Modifier.semantics { heading() }`.
- 앱에서는 떠 있는 움직임을 생략한다. 넣는다면 시스템 동작 줄이기에서 끈다.
- 고정(sticky) 헤더가 필요하면 배경 `bg` 한 면, 아래 1px `line`. 흐림 배경 없음.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 제목은 한 단어, 설명은 한 줄.
- 해야 할 것: 제목과 설명은 같은 기준선(`baseline`).
- 해야 할 것: h2 레벨을 지키고 section과 연결한다.
- 해야 할 것: 제목·설명의 떠 있는 주기를 서로 다르게.
- 하지 말 것: 제목 아래 밑줄·짧은 강조 막대 장식.
- 하지 말 것: 제목 앞 아이콘, 번호, orange ■.
- 하지 말 것: 설명을 필수 정보로 쓰기(.5는 보조 전용).
- 하지 말 것: "더보기 >" 링크를 제목 옆에 붙이기.
- 하지 말 것: 분류마다 다른 색·배경 띠.
**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `align-items: center`로 크기가 다른 두 글자의 기준선이 어긋남 | `align-items: baseline` |
| 설명을 `color: #888` 회색으로 | `color` 그대로, `opacity: var(--mp-opacity-secondary)` |
| 작아 보이게 하려고 `<h4>` 사용 | 문서 구조대로 `h2`, 크기는 `--mp-size-heading` |
| 제목·설명을 한 요소로 묶어 같이 떠오름 | 두 요소에 서로 다른 `--fd`/`--fdl` |
| 떠오름 때문에 가로 스크롤 생김 | 분류 영역 `.cat { overflow-x: clip }` |
