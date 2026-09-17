---
id: carousel-nav
name: 캐러셀 화살표
nameEn: Carousel Nav
category: navigation
summary: 가로 목록 양옆에 걸친 2.4rem 정사각 `<` `>` 버튼. 옅게 있다가 호버하면 투명도가 1이 된다.
aliases: [캐러셀 화살표, 이전 다음 버튼, 슬라이드 버튼, 좌우 버튼, prev next, carousel arrows, rail nav, "< >"]
platforms: [web]
status: extracted
source: metaphr.dev index.html .rail-nav
pillars: [minimalism, pixel-art]
tokens: [--mp-line, --mp-bg, --mp-font, --mp-ink, --mp-opacity-muted, --mp-duration-hover, --mp-border, --mp-grid-bg, --mp-line-strong]
effects: []
related: [rail, page-indicator, icon-button]
---

## 용도
마우스로 가로 목록(`rail`)을 넘길 때 쓴다. 터치 화면은 손가락으로 밀면 되므로 숨긴다.
metaphr.dev는 `(hover: hover) and (min-width: 860px)`에서만 보이고, 끝에 닿은 쪽은 `hidden`.
목록 위치 표시는 `page-indicator`가 맡는다 — 화살표는 넘기기만 한다.

**함께 쓰는 요소**
- `rail`: 이 버튼이 붙는 유일한 대상. 버튼은 `rail` 컨테이너(`position: relative`) 안, 트랙 앞뒤에 둔다
- `page-indicator`: 위치 표시는 점이 맡는다. 화살표를 누르면 점의 현재 표시도 함께 바뀐다
- `card`: 카드 호버(테두리 `--mp-line-strong`)와 버튼이 겹치는 가장자리 `1.2rem`은 카드 쪽 여백으로 비워 둔다
- `section-head`: 분류 제목 오른쪽에 화살표를 따로 두지 않는다 — 목록 양옆 한 쌍만

## 생김새
**모양**
- 정사각, radius 0, 1px `--mp-line` 테두리
- **배경 `--mp-bg`** — 카드 위에 겹치므로 면이 필요하다(그림자로 띄우지 않는다)
- 글리프 `<` `>`, `var(--mp-font)` 400, 색 `--mp-ink`, `opacity: var(--mp-opacity-muted)`

**크기·간격**
- 버튼 `2.4rem × 2.4rem`, 글리프 `0.9rem`
- 위치: 목록 세로 가운데 `top: 50%; margin-top: -1.2rem`
- 목록 가장자리에 반쯤 걸친다: 이전 `left: -1.2rem`, 다음 `right: -1.2rem`
- `z-index: 2` — 카드 위
- 목록 컨테이너는 `position: relative`, 버튼이 잘리지 않게 바깥 여백 `1.2rem` 이상

**반응형**
- `@media (hover: hover) and (min-width: 860px)`에서만 `display: flex`, 그 밖에는 `display: none`
- 터치·좁은 화면: 화살표 없이 스와이프 + `scroll-snap`, 위치는 `page-indicator`
- 카드가 한 화면에 다 들어가면(스크롤 없음) 두 버튼 모두 `hidden`

**앱에서는**
- 쓰지 않는다. `ScrollView(.horizontal)` + `scrollTargetBehavior(.viewAligned)` / `LazyRow` + `rememberSnapFlingBehavior`로 손가락으로 넘기고 위치는 `page-indicator`
- iPad·데스크톱 창(포인터 있음)에서만 같은 모양의 정사각 `<` `>` 버튼을 허용한다

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | `--mp-opacity-muted`(0.5) |
| 호버·포커스 | opacity 1 |
| 누름 | opacity 1, 모양 그대로 |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 끝에 닿음 | `hidden` — 비활성으로 흐리게 두지 않고 없앤다 |
| 터치 기기 | 표시하지 않음 |

## 동작
- opacity `--mp-duration-hover`(0.25s) ease
- 한 번 누르면 목록 보이는 폭의 80%만큼 `scrollBy`, `behavior: 'smooth'`
- 스크롤할 때마다 끝 판정: 처음이면 이전 숨김, 끝이면 다음 숨김(1px 오차 허용)
- 자동 넘김 없음

**접근성**
- 요소는 `<button type="button">`, `aria-label="이전 카드"` / `"다음 카드"` — `<` `>` 글자는 읽히지 않게 라벨로 대신한다
- `aria-controls="목록 id"`
- 키보드: `Tab`으로 이전 → 목록 → 다음 순서가 되도록 DOM에서 이전 버튼을 목록 앞에, 다음 버튼을 뒤에 둔다. `Enter`/`Space`로 넘긴다
- 목록 자체도 키보드로 스크롤할 수 있게 `tabindex="0"`, 좌우 화살표 키는 브라우저 기본 스크롤에 맡긴다
- 끝에 닿아 포커스를 가진 버튼이 `hidden`이 되면 포커스가 `body`로 떨어진다 → 반대쪽 버튼으로 옮긴다(반대쪽도 숨겨졌으면 트랙으로)
- 넘긴 뒤 새로 보이는 카드를 알리려면 트랙 밖에 `aria-live="polite"` 글자 `4–6 / 9`를 시각적으로 숨겨 둔다
- 누를 곳: 버튼 `2.4rem`(38px)에 투명 `::after { inset: -3px }`로 44px 확보

**reduced-motion**
- `behavior: 'auto'`로 즉시 이동, transition 없음

## 데모
```html demo
<div class="mp-carousel-nav">
  <button class="mp-carousel-nav-btn prev" type="button" aria-label="이전 카드">&lt;</button>
  <div class="mp-carousel-nav-track"><span></span><span></span><span></span></div>
  <button class="mp-carousel-nav-btn next is-hover" type="button" aria-label="다음 카드">&gt;</button>
</div>
```

## 코드
```css
.mp-carousel-nav { position: relative; margin: 0 1.4rem; }
.mp-carousel-nav-track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.8rem; height: 7rem; }
.mp-carousel-nav-track span { border: var(--mp-border) solid var(--mp-line); background: var(--mp-grid-bg); }
.mp-carousel-nav-btn {
  position: absolute; top: 50%; margin-top: -1.2rem; z-index: 2;
  display: flex; align-items: center; justify-content: center;
  width: 2.4rem; height: 2.4rem; padding: 0; cursor: pointer;
  border: var(--mp-border) solid var(--mp-line); border-radius: 0;
  background: var(--mp-bg); color: var(--mp-ink); font: 400 0.9rem / 1 var(--mp-font);
  opacity: var(--mp-opacity-muted); transition: opacity var(--mp-duration-hover) ease;
}
.mp-carousel-nav-btn.prev { left: -1.2rem; }
.mp-carousel-nav-btn.next { right: -1.2rem; }
.mp-carousel-nav-btn:hover, .mp-carousel-nav-btn:focus-visible, .mp-carousel-nav-btn.is-hover { opacity: 1; }
.mp-carousel-nav-btn:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-carousel-nav-btn[hidden] { display: none; }
.mp-carousel-nav-btn::after { content: ""; position: absolute; inset: -3px; }
@media (prefers-reduced-motion: reduce) { .mp-carousel-nav-btn { transition: none; } }
/* 실제 화면: 기본 display: none, @media (hover: hover) and (min-width: 860px) { display: flex } */
```

```js
// 마크업: .mp-carousel-nav 안에 .prev · .mp-carousel-nav-track(가로 스크롤) · .next
(() => {
  const root = document.querySelector('.mp-carousel-nav');
  const prev = root?.querySelector('.prev');
  const next = root?.querySelector('.next');
  const track = root?.querySelector('.mp-carousel-nav-track');
  if (!prev || !next || !track) return;
  const smooth = () => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth');
  prev.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: smooth() }));
  next.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: smooth() }));
  const edge = () => {
    const had = document.activeElement;
    prev.hidden = track.scrollLeft <= 1;
    next.hidden = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    // 숨겨진 버튼이 포커스를 갖고 있었다면 반대쪽으로(둘 다 숨으면 목록으로)
    if (had && had.hidden) {
      const other = had === prev ? next : prev;
      if (other.hidden) { track.tabIndex = -1; track.focus(); } else other.focus();
    }
  };
  track.addEventListener('scroll', edge, { passive: true });
  edge();
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: `<` `>` 글자, 정사각 1px, `--mp-bg` 면으로 카드 위에 겹친다.
- 해야 할 것: 끝에서는 숨김, 호버 가능한 넓은 화면에서만 보인다.
- 해야 할 것: `aria-label`로 "이전 카드"/"다음 카드"를 알린다.
- 하지 말 것: 원형 버튼, 둥근 화살표 아이콘, `‹` `›`·`←` `→`.
- 하지 말 것: 그림자로 띄우기, 터치 화면에 표시.
- 하지 말 것: 자동 넘김, 끝에서 처음으로 되감기(무한 루프).

**자주 틀리는 것**
- 끝에서 버튼을 `disabled` + 흐리게 남김 → metaphr.dev는 `hidden`으로 없앤다
- 모바일에도 화살표 표시 → `(hover: hover) and (min-width: 860px)`에서만
- 버튼을 트랙 밖 위쪽 오른편에 `< >` 한 쌍으로 모음 → 목록 세로 가운데 양옆, 가장자리에 반쯤 걸친다
- 버튼 배경 투명 → 카드 선과 겹쳐 글리프가 안 읽힌다 → `--mp-bg` 면
- `aria-label` 없이 `<` 글자만 → "이전 카드"/"다음 카드"
- 한 번에 한 칸씩 `scrollBy(카드 폭)` → 보이는 폭의 80%로 넘겨 맥락 카드가 하나 남게
