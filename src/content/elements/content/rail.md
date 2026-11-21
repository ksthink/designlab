---
id: rail
name: 레일
nameEn: Rail
category: content
summary: 카드를 가로로 늘어놓고 스냅 스크롤하는 캐러셀. 스크롤바는 숨기고 < > 버튼과 8px 점으로 이동한다.
aliases: [레일, rail, 캐러셀, carousel, 가로 스크롤, 슬라이더, 카드 목록, horizontal list, 스와이프 목록]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .rail, .rail-shell, .card-float
pillars: [minimalism, pixel-art]
tokens: [--mp-ease-float, --mp-duration-float-min, --mp-duration-float-max, --mp-float-amp-min, --mp-float-amp-max, --mp-border, --mp-line, --mp-line-strong, --mp-ink, --mp-bg, --mp-opacity-muted, --mp-opacity-meta, --mp-duration-hover]
effects: [float, reveal]
related: [card, carousel-nav, page-indicator, section-head, page-list]
---

## 용도
한 분류의 카드가 한 화면 폭을 넘을 때 가로로 늘어놓는다. 분류 하나에 레일 하나, 위에 `section-head`.
항목을 한꺼번에 비교해야 하거나 12개를 넘으면 줄바꿈 격자(`page-list`의 카드 격자)를 쓴다.
사진 슬라이드쇼·광고 배너 회전용으로 쓰지 않는다. 자동으로 넘어가게 하지 않는다.

## 생김새
**구조** (metaphr.dev)
- `section.cat` (`overflow-x: clip`) > `section-head` + `div.rail-box`(`position: relative`)
- `rail-box` > `div.rail-shell` > `div.rail`(스크롤 영역) > `div.card-float` × n > `a.card`
- `rail-box` 안 양옆에 `button.rail-nav.prev` / `.next`(`carousel-nav`)
- 카드가 3개를 넘으면 `rail-box` 아래 `div.rail-dots` > `button.rail-dot` × n(`page-indicator`)

**수치**
- 레일: `display: flex; justify-content: center; justify-content: safe center`(카드가 적으면 가운데, 넘치면 왼쪽부터)
- 간격 `clamp(0.9rem, 2.2vw, 1.5rem)`
- `overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch`
- 스크롤바 숨김: `scrollbar-width: none`, `::-webkit-scrollbar { display: none }`
- 위 `0.75rem`, 아래 `1.25rem` 여백 — 떠오르는 카드(±5.5px)와 호버 이동(-3px)이 잘리지 않게
- 카드 층: `flex: 0 0 clamp(288px, 84vw, 384px)`, 700px 이상 `flex-basis: 360px`, `scroll-snap-align: center`, `display: flex`
- 이동 버튼: `2.4rem` 정사각, `top: 50%; margin-top: -1.2rem`, 바깥으로 `-1.2rem`, 1px `--mp-line`, 배경 `--mp-bg`, 글자 `<`/`>` `0.9rem`, `opacity: var(--mp-opacity-muted)`, 호버 1
- 점: 8×8px, 간격 `0.55rem`, 위 `clamp(1.1rem, 3vh, 1.7rem)`, 1px `--mp-line`, 현재 점 채움 `--mp-ink` + `opacity: var(--mp-opacity-meta)`

**반응형**
- 이동 버튼은 `@media (hover: hover) and (min-width: 860px)`에서만 보인다. 터치 기기는 스와이프.
- 700px 미만: 카드 폭 84vw — 다음 카드 끝이 살짝 보여 가로로 더 있다는 것을 알린다.
- 확대 연출(metaphr.dev `railZoom`, 스크롤 따라 `rail-shell` 확대)은 선택 사항. 쓰면 `cat`의 `overflow-x: clip`이 필수.
- 390px: 카드 층 `84vw`(약 328px), 다음 카드 끝 약 30px가 보인다. 이동 버튼 없음, 점은 카드 4개 이상일 때.
- 700px: 카드 층 `360px` 고정. 두 장 남짓이 보인다.
- 860px: 호버 가능 기기에서 `<`/`>` 이동 버튼 표시(`rail-box` 바깥으로 1.2rem).
- 1180px: 틀 `--mp-width-list` 안에 카드 3장(360×3 + 간격 2개). 카드 3장 이하면 `safe center`로 가운데, 스크롤 없음·버튼 숨김.

**접근성**
- 레일에 `role="region"`, `aria-label="<분류 이름>"`, 카드 목록은 `role="list"`/`listitem`.
- 키보드: Tab으로 카드 링크를 차례로 지나가면 브라우저가 스크롤해 보여 준다(`scroll-snap`과 충돌하지 않게 `scroll-padding-inline: 1rem`).
- 이동 버튼: `aria-label="이전"`/`"다음"`, 끝에서는 `hidden`(비활성 대신 숨김).
- 점: `aria-label="3번째 카드"`, 현재 점 `aria-current="true"`. 점은 보조 수단이며 Tab 순서에서 빼도 된다(`tabindex="-1"`).
- 스크롤바가 숨겨져도 카드 일부가 잘려 보이게 해 가로 스크롤이 있음을 시각적으로 알린다.
- 마크업 예: `<section aria-labelledby="cat-1"><h2 id="cat-1">생산성</h2><div class="mp-rail" role="list">`… 레일 영역 이름은 분류 제목과 같게 `aria-labelledby`로 잇는다(`role="region"`을 쓰면 반드시 이름).
- `aria-roledescription="carousel"`·`"slide"`는 쓰지 않는다 — 자동 재생이 없는 목록이라 일반 list로 충분하다.
- 화살표 키(←/→)로 카드 이동은 선택 사항. 넣으면 레일 안 포커스가 있을 때만, 다음 카드 링크에 `focus()` 후 `scrollIntoView({ inline: 'center', block: 'nearest' })`.
- Tab 포커스로 카드가 화면 밖에 있으면 `focusin`에서 같은 `scrollIntoView`를 부른다(스냅과 함께 가운데 정렬).
- 끌기(drag) 전용 조작을 만들지 않는다. 키보드·버튼·스와이프로 같은 이동이 가능해야 한다.

**조합 규칙**
- 분류 하나 = `section-head` 1 + 레일 1. 레일 안에는 `card`만(목록 행·배지 단독 금지).
- 한 레일의 카드는 같은 구성·같은 폭. orange `■`는 화면 전체에서 하나이므로 레일 여러 개 중 한 카드에만.
- 분류 섹션 사이 `--mp-section`, 레일과 점 사이 `clamp(1.1rem, 3vh, 1.7rem)`.
- 레일 안에 레일, 레일 안에 아코디언을 두지 않는다. 한 화면 레일 5개 이하.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 가운데 스냅, 카드 층마다 떠 있음 |
| 카드 호버 | 해당 층 떠오름 멈춤, 카드는 `card` 호버 모양 |
| 끌기(마우스) | `cursor: grabbing`, `scroll-snap-type: none`, 안쪽 링크 `pointer-events: none`(클릭 오작동 방지) |
| 처음 / 끝 | 해당 쪽 이동 버튼 `hidden` |
| 이동 버튼 호버 | `opacity: 1` |
| 현재 카드 | 점 채움(가운데에 가장 가까운 카드) |
| 카드 1개 | 이동 버튼·점 없음, 가운데 정렬 |

## 동작
- 카드 층마다 `float`: 진폭 `--mp-float-amp-min`–`--mp-float-amp-max`(2.5–5.5px), 주기 `--mp-duration-float-min`–`--mp-duration-float-max`(3.4–5.8s), `--mp-ease-float`, `alternate infinite`, 음수 지연 0 – -5s로 위상을 다르게. 분류 제목도 같은 결로 뜬다.
- 이동 버튼: 한 번에 카드 하나 폭 + 간격만큼 `scrollBy({ behavior: 'smooth' })`. 점: 해당 카드를 가운데로 `scrollTo`.
- 끌기: 포인터 이동 5px을 넘으면 끌기로 판단, 놓은 뒤 한 틱 뒤에 링크 클릭을 되살린다.
- 등장: 분류 섹션 `reveal`.
- reduced-motion: float 정지, `behavior: 'auto'`(즉시 이동).

## 데모
```html demo
<div class="mp-rail-box">
  <div class="mp-rail">
    <div class="mp-rail-item" style="--fa:3px;--fd:4.2s;--fdl:-1s">A</div>
    <div class="mp-rail-item is-hover" style="--fa:4.5px;--fd:5.1s;--fdl:-3s">B</div>
    <div class="mp-rail-item" style="--fa:2.5px;--fd:3.6s;--fdl:-2s">C</div>
    <div class="mp-rail-item" style="--fa:5px;--fd:4.8s;--fdl:0s">D</div>
  </div>
  <div class="mp-rail-dots"><span class="mp-rail-dot is-current"></span><span class="mp-rail-dot"></span><span class="mp-rail-dot"></span><span class="mp-rail-dot"></span></div>
</div>
```

## 코드
```css
.mp-rail-box { position: relative; }
.mp-rail {
  display: flex; justify-content: center; justify-content: safe center; gap: clamp(0.9rem, 2.2vw, 1.5rem);
  overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; scroll-padding-inline: 1rem;
  padding: 0.75rem 0 1.25rem;
}
.mp-rail::-webkit-scrollbar { display: none; }
.mp-rail.dragging { cursor: grabbing; scroll-snap-type: none; }
.mp-rail.dragging a { pointer-events: none; }
.mp-rail-item {
  flex: 0 0 clamp(120px, 30vw, 180px); aspect-ratio: 4 / 3; scroll-snap-align: center;
  display: flex; align-items: center; justify-content: center;
  border: var(--mp-border) solid var(--mp-line);
  animation: mp-rail-float var(--fd, 4s) var(--mp-ease-float) var(--fdl, 0s) infinite alternate;
}
.mp-rail-item:hover, .mp-rail-item.is-hover { animation-play-state: paused; border-color: var(--mp-line-strong); }
@keyframes mp-rail-float {
  from { transform: translateY(var(--fa, 3px)); }
  to   { transform: translateY(calc(var(--fa, 3px) * -1)); }
}
.mp-rail-nav {
  position: absolute; top: 50%; width: 2.4rem; height: 2.4rem; margin-top: -1.2rem; z-index: 2;
  display: none; align-items: center; justify-content: center;
  border: var(--mp-border) solid var(--mp-line); background: var(--mp-bg); color: inherit;
  font: inherit; font-size: var(--mp-size-small); cursor: pointer; opacity: var(--mp-opacity-muted);
  transition: opacity var(--mp-duration-hover) ease;
}
.mp-rail-nav:hover, .mp-rail-nav:focus-visible { opacity: 1; }
.mp-rail-nav[hidden] { display: none !important; }
.mp-rail-nav.prev { left: -1.2rem; }
.mp-rail-nav.next { right: -1.2rem; }
@media (hover: hover) and (min-width: 860px) { .mp-rail-nav { display: flex; } }
.mp-rail-dots { display: flex; justify-content: center; gap: 0.55rem; margin-top: clamp(1.1rem, 3vh, 1.7rem); }
.mp-rail-dot { width: 8px; height: 8px; padding: 0; border: var(--mp-border) solid var(--mp-line); background: transparent; opacity: 0.7; }
.mp-rail-dot.is-current, .mp-rail-dot[aria-current="true"] { background: var(--mp-ink); border-color: var(--mp-ink); opacity: var(--mp-opacity-meta); }
@media (prefers-reduced-motion: reduce) { .mp-rail-item { animation: none; } .mp-rail-nav { transition: none; } }
```
데모 칸은 축소판이다. 실제 카드 층 폭은 `clamp(288px, 84vw, 384px)`, 700px 이상 360px.

```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.mp-rail-item').forEach((el) => {
  el.style.setProperty('--fa', (2.5 + Math.random() * 3).toFixed(2) + 'px');   // 2.5–5.5px
  el.style.setProperty('--fd', (3.4 + Math.random() * 2.4).toFixed(2) + 's');   // 3.4–5.8s
  el.style.setProperty('--fdl', (-Math.random() * 5).toFixed(2) + 's');
});
function step(rail, dir) {
  const card = rail.firstElementChild; const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
  rail.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: reduce ? 'auto' : 'smooth' });
}
```

## 앱
- SwiftUI(iOS 17+): `ScrollView(.horizontal) { LazyHStack(spacing: 16) { ... }.scrollTargetLayout() }.scrollTargetBehavior(.viewAligned).scrollIndicators(.hidden).contentMargins(.horizontal, 24)`. 카드 폭 `containerRelativeFrame(.horizontal) { w, _ in w * 0.84 }` 최대 360.
- Compose: `LazyRow(flingBehavior = rememberSnapFlingBehavior(lazyListState), horizontalArrangement = Arrangement.spacedBy(16.dp), contentPadding = PaddingValues(horizontal = 24.dp))`. `HorizontalPager` 기본 원형 인디케이터 대신 8dp 사각 점(`page-indicator`).
- 이동 버튼은 앱에서 두지 않는다(스와이프). 점은 카드 4개 이상일 때만.
- 떠오름은 생략해도 된다. 넣으면 `withAnimation(.easeInOut(duration: 4).repeatForever(autoreverses: true))`, 시스템 '동작 줄이기'(`accessibilityReduceMotion`, `Settings.Global.ANIMATOR_DURATION_SCALE == 0`)에서 끈다.
- 접근성: 레일 컨테이너에 분류 이름 라벨, VoiceOver/TalkBack 스와이프로 카드 차례 이동이 되게 각 카드를 하나의 요소로 묶는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 스냅은 가운데, 좁은 화면에서 다음 카드가 살짝 보이게.
- 해야 할 것: 레일 위에 `section-head`, 분류 하나에 레일 하나.
- 해야 할 것: 버튼은 `<`/`>` 글자 사각형, 점은 8px 사각형.
- 해야 할 것: 끌기 중 링크 클릭 막기, 끝에서 버튼 숨기기.
- 하지 말 것: 자동 재생, 무한 루프(끝에서 처음으로 되감기).
- 하지 말 것: 스크롤바 노출, 원형 점, 둥근 화살표 버튼, 셰브론 아이콘.
- 하지 말 것: 좌우 가장자리 그라데이션 페이드 가리개.
- 하지 말 것: 3D 회전·확대되는 가운데 카드(coverflow), 부드러운 관성 트윈 추가.
- 하지 말 것: 한 화면에 레일을 5개 넘게 연달아 쌓기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `setInterval` 자동 넘김 | 사용자가 넘길 때만 |
| 스크롤바 그대로 노출 | `scrollbar-width: none` + 잘린 다음 카드로 암시 |
| 원형 점·둥근 화살표 버튼 | 8px 사각 점, 2.4rem 사각 `<`/`>` |
| 가장자리 `mask-image` 페이드 | 페이드 없이 잘림 |
| 카드 자신에 float + 호버 이동 | float은 `card-float` 층에 |
| `aria-roledescription="carousel"` | `role="list"` + 분류 이름 |
