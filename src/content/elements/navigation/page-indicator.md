---
id: page-indicator
name: 페이지 점
nameEn: Page Indicator
category: navigation
summary: 가로 목록의 위치를 보여 주는 8px 정사각 점 줄. 현재 점은 잉크로 채운다.
aliases: [페이지 점, 점 인디케이터, 인디케이터, 도트, dots, page dots, page control, 캐러셀 점, 슬라이드 위치]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .rail-dots · .rail-dot
pillars: [minimalism, pixel-art]
tokens: [--mp-line, --mp-ink, --mp-opacity-meta, --mp-line-strong, --mp-duration-hover, --mp-border]
effects: []
related: [carousel-nav, rail, pagination]
---

## 용도
`rail`(가로 캐러셀) 카드가 한 화면에 다 보이지 않을 때 몇 번째인지 보여 주고 바로 옮긴다.
metaphr.dev는 카드가 3개를 넘을 때만 붙인다. 점이 10개를 넘으면 `pagination`이나 `3 / 12` 숫자 표기를 쓴다.
온보딩처럼 한 장씩 넘기는 화면에도 같은 점을 쓴다.

**함께 쓰는 요소**
- `rail`: 가로 카드 목록 아래. 카드 4개 이상일 때만
- `carousel-nav`: 넓은 화면에서 화살표와 함께. 화살표로 넘기면 점의 현재 표시도 바뀐다 — 점과 화살표가 서로 다른 위치를 말하지 않게 같은 계산을 쓴다
- `onboarding`: 한 장씩 넘기는 화면 아래 가운데. 마지막 장에서는 점 아래 `button` 하나
- `pagination`: 10개를 넘으면 점 대신 `3 / 12` 숫자 또는 `pagination` — 둘을 함께 두지 않는다

## 생김새
**모양**
- 점: 정사각, radius 0, 1px `--mp-line` 테두리, 투명 배경
- 현재 점: 배경·테두리 `--mp-ink`, `opacity: var(--mp-opacity-meta)`
- 점 줄은 가운데 정렬, 목록 아래에 둔다
- 점마다 `<button>` — 누르면 그 위치로 스크롤

**크기·간격**
- 점 `8px × 8px`, `padding: 0`
- 점 사이 `gap: 0.55rem`
- 목록과 위 간격 `margin-top: clamp(1.1rem, 3vh, 1.7rem)`
- 기본 점 opacity `0.7`(metaphr.dev 원값)

**반응형**
- 크기는 화면 폭과 상관없이 8px 고정 — 픽셀 단위를 유지한다
- 터치 기기(`hover: none`): 점 크기는 그대로, 버튼에 투명 여백을 줘 누를 곳을 넓힌다(`padding` 대신 `::after { inset: -10px }`), 점 사이는 `gap: 0.9rem`로 넓힌다
- 좁은 화면에서 점이 한 줄을 넘으면 점을 없애고 숫자 표기로 바꾼다

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line`, 비어 있음, opacity 0.7 |
| 호버 | 테두리 `--mp-line-strong`, opacity 1 |
| 포커스 | 호버와 같음 + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 현재 `aria-current="true"` | 배경·테두리 `--mp-ink`, `--mp-opacity-meta`(0.7) |
| 비활성 | 없음 — 모든 점은 누를 수 있다 |

## 동작
- 배경·테두리·투명도 `--mp-duration-hover`(0.25s) ease
- 스크롤이 멈추면 가장 많이 보이는 카드의 점을 현재로 바꾼다(`IntersectionObserver` 또는 `scroll` 끝에서 계산)
- 점을 누르면 해당 카드로 `scrollTo({ behavior: 'smooth' })`, reduced-motion이면 `'auto'`
- 현재 점이 늘어나거나 미끄러지지 않는다 — 채움만 바뀐다

**접근성**
- 줄은 `<div role="group" aria-label="카드 위치">`
- 점은 `<button type="button" aria-label="3번째 카드">`, 현재 점만 `aria-current="true"`
- 키보드: `Tab`으로 각 점, `Enter`/`Space`로 이동. 이동 후 포커스는 점에 남긴다
- 선택 기능(점이 6개 이상): 로빙 탭인덱스 — 현재 점만 `tabindex="0"`, 나머지 `-1`, `←` `→`로 점 사이 이동, `Home`/`End`로 처음·끝. 이때 줄은 `role="group"` 그대로(`tablist`로 만들지 않는다)
- 누를 곳: 점 8px + `::after { inset: -10px }` = 28px, 점 사이 `0.9rem`까지 합쳐 옆 점과 겹치지 않게
- 점만으로 위치를 알리지 않는다 — 스크린리더용으로 목록에 `aria-roledescription="캐러셀"`과 카드마다 `aria-label="3 / 5"`를 준다
- 점은 장식 성격이라 opacity 0.7이지만, 목록 자체가 스크롤로 전부 닿을 수 있어야 한다

**reduced-motion**
- transition과 부드러운 스크롤을 끈다

## 데모
```html demo
<div class="mp-page-indicator" role="group" aria-label="카드 위치">
  <button type="button" aria-label="1번째 카드"></button>
  <button type="button" aria-label="2번째 카드" class="is-hover"></button>
  <button type="button" aria-label="3번째 카드" aria-current="true"></button>
  <button type="button" aria-label="4번째 카드"></button>
  <button type="button" aria-label="5번째 카드"></button>
</div>
```

## 코드
```css
.mp-page-indicator { display: flex; justify-content: center; gap: 0.55rem; }
.mp-page-indicator button {
  position: relative; width: 8px; height: 8px; padding: 0; cursor: pointer;
  border: var(--mp-border) solid var(--mp-line); border-radius: 0; background: transparent; opacity: 0.7;
  transition: background var(--mp-duration-hover) ease, border-color var(--mp-duration-hover) ease, opacity var(--mp-duration-hover) ease;
}
.mp-page-indicator button:hover, .mp-page-indicator button:focus-visible, .mp-page-indicator button.is-hover { border-color: var(--mp-line-strong); opacity: 1; }
.mp-page-indicator button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-page-indicator button[aria-current="true"] { background: var(--mp-ink); border-color: var(--mp-ink); opacity: var(--mp-opacity-meta); }
@media (hover: none) {
  .mp-page-indicator { gap: 0.9rem; }
  .mp-page-indicator button::after { content: ""; position: absolute; inset: -10px; }
}
@media (prefers-reduced-motion: reduce) { .mp-page-indicator button { transition: none; } }
```

## 앱
- SwiftUI: `TabView(.page)`의 시스템 점(원형)은 `.tabViewStyle(.page(indexDisplayMode: .never))`로 끄고 `HStack(spacing: 9)`에 `Rectangle().frame(width: 8, height: 8)`로 그린다. 현재는 `.fill(ink.opacity(0.7))`, 나머지는 `.stroke(line, lineWidth: 1)`.
- Compose: `HorizontalPager` 아래 `Row(horizontalArrangement = Arrangement.spacedBy(9.dp))`에 `Box(Modifier.size(8.dp).border(1.dp, line))`, 현재는 `background(ink.copy(alpha = 0.7f))`.
- 점 터치 영역은 `contentShape`/`Modifier.minimumInteractiveComponentSize()`로 넓히고 점 크기는 8 그대로.

```swift
HStack(spacing: 9) {
  ForEach(0..<count, id: \.self) { i in
    Rectangle()
      .fill(i == current ? ink.opacity(0.7) : .clear)
      .overlay(Rectangle().stroke(i == current ? ink : line, lineWidth: 1))
      .frame(width: 8, height: 8)
      .frame(width: 28, height: 44).contentShape(Rectangle())
      .onTapGesture { withAnimation(reduceMotion ? nil : .easeInOut(duration: 0.25)) { current = i } }
      .accessibilityLabel("\(i + 1)번째 카드").accessibilityAddTraits(i == current ? .isSelected : [])
  }
}
```

```kotlin
Row(horizontalArrangement = Arrangement.spacedBy(9.dp)) {
  repeat(count) { i ->
    val on = i == pagerState.currentPage
    Box(Modifier.size(48.dp).clickable { scope.launch { pagerState.animateScrollToPage(i) } }
        .semantics { contentDescription = "${i + 1}번째 카드"; selected = on }, contentAlignment = Alignment.Center) {
      Box(Modifier.size(8.dp).border(1.dp, if (on) ink else line).background(if (on) ink.copy(alpha = 0.7f) else Color.Transparent))
    }
  }
}
```
- OS 예외: 잠금 화면·홈 화면 위젯 스택, 시스템 온보딩 화면의 점. 시스템 `UIPageControl`을 그대로 쓰는 화면은 원형 점을 받아들인다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 8px 정사각, 1px 선, 현재는 잉크 채움 0.7.
- 해야 할 것: 누르면 해당 위치로 이동, 점마다 `aria-label`.
- 해야 할 것: 카드가 3개 이하면 점을 두지 않는다.
- 하지 말 것: 동그란 점, 현재 점을 길쭉하게 늘리기.
- 하지 말 것: teal·orange 점, 점 크기를 화면에 따라 늘리기.
- 하지 말 것: 점만으로 10개 넘게 나열, 자동으로 넘어가는 캐러셀.

**자주 틀리는 것**
- 동그란 점(모서리 50%) → 8px 정사각, 모서리 0
- 현재 점을 `width: 20px`로 늘린 알약 → 크기 그대로, 채움만 바꾼다
- 현재 점 `opacity: 1` 진한 잉크 → `--mp-opacity-meta`(0.7)
- 점을 `<span>`으로 그려 누를 수 없음 → `<button aria-label>`
- 스크롤로 넘겨도 점이 안 바뀜 → `IntersectionObserver`로 가장 많이 보이는 카드와 동기화
- 터치 기기에서 점 크기를 16px로 키움 → 점 8px, 투명 영역으로 누를 곳 확보
