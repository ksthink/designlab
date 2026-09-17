---
id: icon-button
name: 아이콘 버튼
nameEn: Icon Button
category: actions
summary: 글자 대신 픽셀 아이콘·글리프 하나를 담은 정사각 1px 테두리 버튼. 호버하면 반전된다.
aliases: [아이콘 버튼, icon button, 정사각 버튼, 닫기 버튼, 도구 버튼, toolbar button, 아이콘만 있는 버튼]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-line-button, --mp-ink, --mp-size-small, --mp-font, --mp-bg, --mp-opacity-muted, --mp-duration-hover]
effects: [invert-hover, press]
related: [button, fab, carousel-nav, pixel-icon]
---

## 용도
공간이 좁고 뜻이 분명한 행동(닫기, 이전·다음, 더하기·빼기, 복사)에 쓴다.
뜻이 애매하거나 처음 보는 행동이면 글자 `button`을 쓴다. 아이콘만으로 설명하려 하지 않는다.
한 줄에 여러 개를 둘 때는 같은 크기로 나란히 둔다(도구 줄). 화면의 주 행동 하나가 떠 있어야 하면 `fab`.

**함께 쓰는 요소**
- `icon-button` + `tooltip`: 뜻이 덜 분명한 아이콘은 호버·포커스에 이름을 보여 준다
- `icon-button` 줄 + `button`: 도구 줄 끝에 글자 `button` 하나(주 행동)를 둘 수 있다. 크기는 높이를 맞춘다(`2.4rem`)
- `icon-button`(`x`) + `modal`·`bottom-sheet`: 오버레이의 닫기는 `[ 닫기 ]`(`text-action`)을 우선하고, 좁은 머리에서만 `x` 아이콘 버튼
- `carousel-nav`는 이 요소의 특수형(배경 `--mp-bg`, 옅은 투명도). 같은 화면에서 둘의 크기를 맞춘다
- 아이콘은 `pixel-icon` 규칙(40×40 1비트, 정수 배율). 강조 orange 아이콘 버튼은 두지 않는다 — 강조는 `fab`·`button`에서

## 생김새
**모양**
- 정사각, `border-radius: 0`, 테두리 `var(--mp-border) solid var(--mp-line-button)`
- 배경 투명, 안의 글리프·아이콘 색 `--mp-ink`
- 안에는 글리프 한 자(`<` `>` `+` `-` `x` `?`) 또는 `pixel-icon`(1비트, 정수 배율) 하나만
- 글리프 크기 `--mp-size-small`, `--mp-font` 400, `line-height: 1`

**크기·간격**
- 웹 기본 `2.4rem × 2.4rem`(metaphr.dev `.rail-nav`와 같은 크기)
- 작은 도구 줄 `2rem × 2rem`까지 줄일 수 있다. 그보다 작게 만들지 않는다
- 픽셀 아이콘은 40×40 원본을 정수 배율로 줄이지 않는다 — 버튼보다 크면 글리프를 쓴다
- 버튼 사이 간격 `0.8em`, 글자 버튼과 섞일 때도 같은 간격
- 포커스 링 `outline-offset: 3px`

**반응형**
- 터치 기기(`hover: none`)에서는 보이는 크기는 그대로 두고, 바깥 여백·`::after` 영역으로 누를 곳을 44×44px 이상 확보한다
- 좁은 화면에서 도구 줄이 넘치면 줄바꿈하지 않고 덜 쓰는 행동을 `dropdown-menu`로 옮긴다

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line-button` 테두리, 투명 배경, ink 글리프 |
| 호버 | 배경 `--mp-ink`, 글리프 `--mp-bg` |
| 포커스 | 호버와 같음 + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 누름 | 반전 + `translateY(1px)` |
| 켜짐(토글) | 반전 유지, `aria-pressed="true"` |
| 비활성 | `opacity: var(--mp-opacity-muted)`, 반전 없음, `cursor: not-allowed` |

## 동작
- 호버 반전: `invert-hover`, 배경·글자색 `--mp-duration-hover` ease
- 누름: `press`, 1px 아래로 즉시(transition 없음)
- 아이콘이 돌거나 커지거나 색이 바뀌지 않는다

**접근성**
- 요소는 `<button type="button">`. `<div>`·`<a>`로 흉내 내지 않는다
- 보이는 글자가 없으므로 `aria-label`을 반드시 단다("닫기", "이전 카드")
- 안의 글리프·아이콘은 `aria-hidden="true"`로 읽히지 않게 한다(글리프가 곧 라벨이면 `aria-label`이 덮는다)
- 토글이면 `aria-pressed`, 패널을 열면 `aria-expanded` + `aria-controls`
- 키보드: `Tab` 포커스, `Enter`·`Space` 실행. 도구 줄이 5개를 넘으면 `role="toolbar"` + 좌우 화살표 이동을 검토한다
- 뜻이 덜 분명하면 `title` 대신 `tooltip`으로 이름을 보여 준다(포커스에도 보이게)
- 비활성은 `disabled` 속성. 포커스가 필요하면 `aria-disabled="true"`로 두고 실행만 막는다
- `role="toolbar"`일 때: 도구 줄에 `aria-label`, 로빙 `tabindex`(현재 버튼만 0), `←` `→`로 이동, `Home`·`End`로 처음·끝
- 메뉴를 여는 아이콘 버튼(`...`)은 `aria-haspopup="menu"` + `aria-expanded`, 열린 메뉴 첫 `menuitem`에 포커스

**reduced-motion**
- transition 없이 최종 상태만. 1px 누름 이동은 유지해도 된다(순간 이동)

## 데모
```html demo
<div class="mp-icon-button-row">
  <button class="mp-icon-button" type="button" aria-label="이전">&lt;</button>
  <button class="mp-icon-button is-hover" type="button" aria-label="더하기">+</button>
  <button class="mp-icon-button" type="button" aria-label="고정" aria-pressed="true">■</button>
  <button class="mp-icon-button" type="button" aria-label="닫기" disabled>x</button>
</div>
```

## 코드
```css
.mp-icon-button-row { display: flex; flex-wrap: wrap; gap: 0.8em; }
.mp-icon-button {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2.4rem; height: 2.4rem; padding: 0;
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-small) / 1 var(--mp-font); cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-icon-button:hover, .mp-icon-button:focus-visible, .mp-icon-button.is-hover,
.mp-icon-button[aria-pressed="true"] { background: var(--mp-ink); color: var(--mp-bg); }
.mp-icon-button:focus-visible { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; }
.mp-icon-button:active { background: var(--mp-ink); color: var(--mp-bg); transform: translateY(1px); }
.mp-icon-button:disabled { opacity: var(--mp-opacity-muted); background: transparent; color: var(--mp-ink); cursor: not-allowed; transform: none; }
@media (hover: none) { .mp-icon-button { position: relative; } .mp-icon-button::after { content: ""; position: absolute; inset: -0.4rem; } }
@media (prefers-reduced-motion: reduce) { .mp-icon-button { transition: none; } }
```

## 앱
- SwiftUI: `Button { } label: { Image("icon").interpolation(.none) }` + `button`의 `ButtonStyle` 재사용, `.frame(width: 44, height: 44)`, 테두리 `Rectangle().stroke(lineButton, lineWidth: 1)`, `.accessibilityLabel("닫기")`.
- Compose: `OutlinedIconButton(onClick, shape = RectangleShape, border = BorderStroke(1.dp, lineButton))`, `Modifier.size(48.dp)`, `Icon(painter, contentDescription = "닫기", tint = ink)`, 비트맵은 `FilterQuality.None`.
- 눌림 반전은 `configuration.isPressed` / `interactionSource.collectIsPressedAsState()`로. ripple 끄기.
- SF Symbols·Material 아이콘은 둥근 선이라 쓰지 않고 픽셀 아이콘 또는 글리프를 쓴다.
- OS 예외: 시스템 내비게이션 바의 뒤로 버튼, 키보드 위 시스템 도구 막대.

```swift
struct IconButtonStyle: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .frame(width: 44, height: 44)
      .foregroundStyle(configuration.isPressed ? MP.bg : MP.ink)
      .background(configuration.isPressed ? MP.ink : .clear)
      .overlay(Rectangle().stroke(MP.lineButton, lineWidth: 1))
      .offset(y: configuration.isPressed ? 1 : 0)
  }
}
// Button(action: close) { Image("close40").interpolation(.none) }.buttonStyle(IconButtonStyle()).accessibilityLabel("닫기")
```

```kotlin
val pressed by source.collectIsPressedAsState()
OutlinedIconButton(
  onClick = close, shape = RectangleShape, interactionSource = source,
  border = BorderStroke(1.dp, MP.lineButton), modifier = Modifier.size(48.dp),
  colors = IconButtonDefaults.outlinedIconButtonColors(
    containerColor = if (pressed) MP.ink else Color.Transparent, contentColor = if (pressed) MP.bg else MP.ink),
) { Text("x", fontFamily = Mulmaru, modifier = Modifier.semantics { contentDescription = "닫기" }) }
```
- OS 예외 목록: 시스템 내비게이션 바 뒤로 버튼, 키보드 위 시스템 도구 막대, iOS 26 이상 툴바의 유리 버튼 묶음

## 해야 할 것 / 하지 말 것
- 해야 할 것: 정사각, 1px 테두리, radius 0.
- 해야 할 것: `aria-label` / `accessibilityLabel` / `contentDescription`을 반드시.
- 해야 할 것: 호버·포커스·누름은 잉크/배경 반전.
- 해야 할 것: 터치 영역 44pt/48dp 이상.
- 해야 할 것: 한 줄의 아이콘 버튼은 모두 같은 크기.
- 하지 말 것: 원형 버튼, 둥근 선 아이콘.
- 하지 말 것: 테두리 없이 아이콘만 떠 있는 버튼(글자형이 필요하면 `text-action`).
- 하지 말 것: 색으로 채운 아이콘, teal·orange 아이콘.
- 하지 말 것: 호버 시 회전·확대, 그림자.
- 하지 말 것: 뜻이 모호한 행동을 아이콘만으로.

**자주 틀리는 것**
- `aria-label` 없이 `x` 글자만 → 스크린리더가 "엑스"로 읽음. `aria-label="닫기"` + 글리프 `aria-hidden`
- 원형 모서리(반지름 50%) 복사 → `0`
- 24px짜리 아이콘 버튼 → 보이는 크기 `2rem` 이상, 터치 영역 44px 이상
- 40×40 아이콘을 28px로 줄여 흐려짐 → 정수 배율 또는 글리프로 대체
- Compose 기본 `IconButton` ripple 원형 → ripple 끄고 반전
