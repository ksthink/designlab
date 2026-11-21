---
id: page-list
name: 목록형 페이지
nameEn: List Page
category: patterns
summary: 폭 1180px 안에 lead 문단, 분류 제목과 카드 레일을 차례로 쌓고 푸터로 닫는 목록 화면 뼈대.
aliases: [목록형 페이지, list page, 목록 화면, 인덱스 페이지, 홈 레이아웃, 갤러리 페이지, 카탈로그, overview page, "1180"]
platforms: [web]
status: extracted
source: metaphr.dev index.html main, .wrap, .lead, .cat
pillars: [minimalism]
tokens: [--mp-width-list, --mp-gutter, --mp-section, --mp-section-lg, --mp-size-lead, --mp-tracking-lead, --mp-leading-body, --mp-opacity-body, --mp-width-para, --mp-duration-caret, --mp-opacity-kicker, --mp-size-heading, --mp-opacity-muted, --mp-border, --mp-line, --mp-ink, --mp-opacity-fine]
effects: [caret, reveal, float]
related: [page-read, hero, section-head, rail, card, footer, spacing-layout, header]
---

## 용도
여러 항목을 분류별로 훑어보는 화면(홈, 요소 갤러리, 앱 목록)에 쓴다.
한 대상을 자세히 읽는 화면은 `page-read`(760px)를 쓴다.
분류가 하나뿐이면 `section-head`를 생략하고 레일 또는 격자만 둔다.

## 생김새
**구조**
- `header.hero`(홈만) 또는 `header.top`(상단 바)
- `main#main`
  - `section.wrap.lead` — 소개 문단 1–2개, 끝 ■
  - `section.cat` × 분류 수 — `section-head` + `rail`(또는 격자)
- `footer.wrap.foot`

**수치**
- 틀 `.wrap`: `max-width: var(--mp-width-list)`(1180px), `margin: 0 auto`, 좌우 `--mp-gutter`(`clamp(1.25rem, 5vw, 4rem)`)
- lead: 위 `--mp-section-lg`(`clamp(4rem, 12vh, 9rem)`), 아래 `clamp(2rem, 6vh, 4rem)`. `.wrap`의 좌우 여백을 지우지 않도록 세로 값만 지정
- lead 문단: `max-width: var(--mp-width-para)`(30em), `--mp-size-lead`, `--mp-tracking-lead`(.02em), 행간 `--mp-leading-body`(2.1), `opacity: var(--mp-opacity-body)`, 문단 사이 `1.1em`
- lead 마지막 문단 끝 `■`: `margin-left: 0.35em; opacity: var(--mp-opacity-kicker)`
- 분류 `.cat`: 위아래 `--mp-section`(`clamp(2.5rem, 8vh, 5rem)`), `overflow-x: clip`
- 레일 대신 격자: `grid-template-columns: repeat(auto-fill, minmax(288px, 1fr))`, 간격 `clamp(0.9rem, 2.2vw, 1.5rem)`
- 푸터: 위 바깥 `clamp(3rem, 8vh, 5rem)`, 윗선 1px `--mp-line`

**반응형**
| 폭 | 동작 |
|---|---|
| 390px | 좌우 `--mp-gutter` 20px, 카드 `84vw` ≈ 328px 하나 + 다음 카드 가장자리. 레일은 스와이프, 점(`page-indicator`)으로 위치 표시 |
| 480px 이하 | 히어로가 있으면 슬로건 축소 단계(`hero` 문서) |
| 700px 이상 | 카드 폭 360px 고정(`.card-float { flex-basis: 360px }`) |
| 860px 이상 + 호버 기기 | 레일 좌우 `< >` 버튼 표시(`(hover: hover) and (min-width: 860px)`), 버튼은 틀 밖 `-1.2rem` |
| 1180px 이상 | 틀 1180px 고정, 좌우 여백 `4rem` 상한. 카드 3장이 한 줄에 들어가고 적으면 가운데(`safe center`) |
- 격자를 쓰면 `minmax(288px, 1fr)`: 390px 1열 · 700px 2열 · 1180px 3열
- 미디어 쿼리는 위 두 곳(700, 860)만. 나머지 여백·글자는 clamp로 따라간다

**접근성**
- 랜드마크: `header`(banner) · `main` · `footer`(contentinfo). 분류마다 `section` + `aria-labelledby`
- h1 하나(히어로 슬로건 또는 페이지 제목), 분류 제목 h2, 카드 제목 h3
- 첫 요소로 "본문으로 건너뛰기" 링크(`href="#main"`), 포커스될 때만 보인다
- 카드 순서 = DOM 순서 = 탭 순서. 레일 끌기와 무관하게 Tab으로 모든 카드에 닿는다
- 데이터를 못 불러오면 `.load-error` 문단(`opacity: var(--mp-opacity-secondary)` .7, 행간 2)으로 원인 한 줄. 이 문단은 `role="status"`
- 레일 좌우 버튼은 `aria-label="이전"`/`"다음"`, 점은 `aria-label="3번째"` + `aria-current="true"`. 키보드 사용자는 Tab으로 카드를 돌며 레일이 `scroll-snap`으로 따라온다(`scrollIntoView({ inline: 'center' })`)
- 반응형에서도 DOM 순서를 바꾸지 않는다(CSS `order` 금지)

**움직임 줄이기**
- lead 끝 ■ caret 켜진 채 정지, 카드·분류 제목 float 정지, `reveal` 없이 보임
- 레일 버튼·점 이동은 `behavior: 'auto'`(즉시), `html { scroll-behavior: auto }`

**조합 규칙**
- 순서: (`hero` 또는 상단 바 `header`) → lead → 분류 × n → `footer`. 분류 사이에 광고·배너·다른 패턴을 끼우지 않는다
- 분류 하나 = `section-head` 하나 + `rail`/격자 하나. 레일과 격자를 한 페이지에 섞지 않는다
- 강조 orange는 화면 전체에서 한 곳(보통 카드 하나의 ■). 분류마다 하나씩 쓰지 않는다
- 같은 화면에 fx-fill은 히어로 링크·푸터 메일 링크까지
- 페이지 제목 h1은 히어로 슬로건 또는 상단 바 아래 제목 중 하나만

## 상태
| 상태 | 표현 |
|---|---|
| 불러오는 중 | 분류 영역 비움(스켈레톤 반짝임 없음) |
| 불러옴 | 분류마다 `reveal`로 등장 |
| 실패 | `load-error`: "불러오지 못했습니다" + 다시 시도 안내 |
| 항목 없음 | 분류를 통째로 숨긴다. 빈 분류 제목을 남기지 않는다 |
| 움직임 줄이기 | caret·float·reveal 정지, 바로 보임 |

## 동작
- lead 끝 `caret`: `--mp-duration-caret`(1.2s) `steps(1, end)` infinite — 히어로 아래의 유일한 상시 모션.
- 섹션마다 `reveal`(IntersectionObserver, `rootMargin: 0px 0px -12% 0px`).
- 카드·분류 제목 `float`.
- `prefers-reduced-motion: reduce`: `html { scroll-behavior: auto }`, 모든 애니메이션 정지.

## 데모
```html demo
<div class="mp-page-list">
  <div class="mp-page-list-lead"><i></i><i></i></div>
  <section class="mp-page-list-cat">
    <div class="mp-page-list-head"><b></b><i></i></div>
    <div class="mp-page-list-grid"><div></div><div></div><div></div></div>
  </section>
  <section class="mp-page-list-cat">
    <div class="mp-page-list-head"><b></b><i></i></div>
    <div class="mp-page-list-grid"><div></div><div></div><div></div></div>
  </section>
  <div class="mp-page-list-foot"><i></i></div>
</div>
```

## 코드
```css
.mp-page-list { max-width: var(--mp-width-list); margin: 0 auto; padding: 0 var(--mp-gutter); }
.mp-page-list i, .mp-page-list b { display: block; height: 0.5em; background: var(--mp-ink); }
.mp-page-list-lead { padding: 1.5em 0 1em; max-width: var(--mp-width-para); }
.mp-page-list-lead i { margin-bottom: 0.7em; opacity: var(--mp-opacity-body); }
.mp-page-list-lead i:last-child { width: 60%; }
.mp-page-list-lead i:last-child::after {
  content: ""; position: relative; left: calc(100% + 0.4em); display: block; width: 0.5em; height: 0.5em;
  background: var(--mp-ink); opacity: var(--mp-opacity-kicker);
  animation: mp-page-list-caret var(--mp-duration-caret) steps(1, end) infinite;
}
@keyframes mp-page-list-caret { 50% { opacity: 0; } }
.mp-page-list-cat { padding: 1em 0; }
.mp-page-list-head { display: flex; align-items: flex-end; gap: 1.2em; margin-bottom: 0.8em; }
.mp-page-list-head b { width: 4em; height: calc(var(--mp-size-heading) * 0.5); }
.mp-page-list-head i { width: 6em; opacity: var(--mp-opacity-secondary); }
.mp-page-list-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(72px, 1fr)); gap: clamp(0.9rem, 2.2vw, 1.5rem); }
.mp-page-list-grid div { aspect-ratio: 3 / 4; border: var(--mp-border) solid var(--mp-line); }
.mp-page-list-foot { margin-top: 1em; padding-top: 1.2em; border-top: var(--mp-border) solid var(--mp-line); }
.mp-page-list-foot i { width: 3em; margin: 0 auto; opacity: var(--mp-opacity-fine); }
@media (prefers-reduced-motion: reduce) { .mp-page-list-lead i:last-child::after { animation: none; } }
```
데모는 글자 대신 막대로 뼈대만 보인다. 실제 뼈대 값은 `생김새`의 수치를 따른다: `.wrap { max-width: var(--mp-width-list); padding: 0 var(--mp-gutter) }`, `.lead { padding-top: var(--mp-section-lg) }`, `.lead p { font-size: var(--mp-size-lead); letter-spacing: var(--mp-tracking-lead); line-height: var(--mp-leading-body) }`, `.cat { padding-block: var(--mp-section); overflow-x: clip }`.


## 해야 할 것 / 하지 말 것
- 해야 할 것: 분류는 읽는 순서대로, 분류마다 넓은 여백.
- 해야 할 것: 섹션 경계는 여백으로. 선은 푸터 윗선 하나.
- 해야 할 것: 빈 분류는 숨긴다.
- 해야 할 것: 상시 모션은 lead 끝 ■ 하나 + 숨쉬기만.
- 하지 말 것: 사이드바, 필터 패널을 기본으로 펼치기.
- 하지 말 것: 폭 1180px을 넘는 전체 폭 격자.
- 하지 말 것: 촘촘한 4–5열 카드, 카드 사이 간격 줄이기.
- 하지 말 것: 분류마다 배경색 띠, 섹션마다 구분선.
- 하지 말 것: 무한 스크롤·자동 캐러셀.
**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `.lead { padding: 9rem 0 }`로 `.wrap` 좌우 여백이 사라짐 | 세로 값만: `padding-top`, `padding-bottom` |
| 전체 폭(`100vw`) 카드 격자 | `max-width: var(--mp-width-list)` 틀 안 |
| 카드 간격 8px로 촘촘하게 5열 | 간격 `clamp(0.9rem, 2.2vw, 1.5rem)`, 1180px에서 3열 |
| 빈 분류에 "항목이 없습니다" 머리만 남김 | 분류 전체를 렌더링하지 않는다 |
| 로딩 중 반짝이는 스켈레톤 카드 줄 | 비워 두고 불러오면 `reveal` |
| 분류마다 `hr` 구분선 | 여백 `--mp-section`, 선은 푸터 윗선 하나 |
