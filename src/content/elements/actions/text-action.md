---
id: text-action
name: 텍스트 액션
nameEn: Text Action
category: actions
summary: 대괄호로 감싼 터미널형 글자 버튼. 테두리 없이 투명도로 위계를 두고, 호버하면 반전된다.
aliases: [텍스트 버튼, 터미널 버튼, 대괄호 버튼, "[ 확인 ]", text button, ghost button, 보조 버튼, 토글 글자, 메뉴 버튼]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-size-kicker, --mp-tracking-meta, --mp-font, --mp-opacity-meta, --mp-size-meta, --mp-ink, --mp-bg, --mp-opacity-muted, --mp-duration-hover, --mp-border, --mp-opacity-kicker]
effects: [invert-hover]
related: [button, menu, terminal-vocabulary, microcopy]
---

## 용도
보조 행동(테마 바꾸기, 취소, 닫기, 더 보기, 편집)과 한 줄에 여러 행동을 둘 때 쓴다.
화면의 주 행동은 테두리 있는 `button`. 텍스트 액션은 주 행동 옆의 "덜 중요한 쪽"이다.
design_lab 머리의 테마 토글 `[ 시스템 ]`, `menu`의 메뉴 버튼 `[ 메뉴 ]`, `modal`의 `[ 취소 ]`가 이 모양이다.
다른 페이지로 이동만 하면 `link`를 쓴다.

**함께 쓰는 요소**
- `text-action` + `button`: 행동 줄에서 `[ 취소 ]`는 왼쪽, 주 `button`은 오른쪽(`modal`·`confirm-step`)
- `text-action` + `header`: 머리 오른쪽 테마 토글 `[ 시스템 ]`(`theme-switch`), 앱 바의 `[ 편집 ]`
- `text-action` + `menu`: 접힌 메뉴 버튼 `[ 메뉴 ]` → `drawer`·`dropdown-menu`를 연다
- `text-action` + `empty-state`·`error-state`: `[ 다시 ]`, `[ 조건 지우기 ]` 같은 복구 행동
- 괄호 어휘는 `terminal-vocabulary`, 괄호 안 말은 `microcopy`. orange·teal은 쓰지 않는다

## 생김새
**모양**
- 글자를 `[ ` ` ]`로 감싼다. 괄호 안쪽에 한 칸씩 띄운다: `[ 확인 ]`
- 테두리·배경 없음, radius 0
- 글자 `--mp-size-kicker`, 자간 `--mp-tracking-meta`, `--mp-font` 400, `opacity: var(--mp-opacity-meta)`
- `white-space: nowrap` — 괄호가 줄바꿈으로 떨어지지 않게

**크기·간격**
- 안쪽 여백 `0.2em 0.35em` — 반전 면이 글자에 딱 붙지 않게
- 행간 `1.4`
- 한 줄에 나열할 때 간격 `0.6em 1.2em`(세로·가로)
- 주 `button` 옆에 둘 때 간격 `1.2em`, 텍스트 액션이 왼쪽, 주 버튼이 오른쪽
- 괄호 안 글자는 1–4자 동사·상태어

**반응형**
- 좁은 화면에서도 크기를 줄이지 않는다. 넘치면 `flex-wrap`으로 다음 줄
- 터치 기기(`hover: none`)는 누르는 동안(`:active`) 반전. 세로 여백을 늘려 터치 높이 44px 이상
- 머리·푸터처럼 좁은 줄에서는 `--mp-size-meta`까지 줄일 수 있다

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | `--mp-opacity-meta`(0.55), 투명 배경 |
| 호버 | opacity 1 + 배경 `--mp-ink`, 글자 `--mp-bg` |
| 포커스 | 호버와 같음 + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 누름 | 호버와 같음(이동 없음) |
| 켜짐·열림 | 반전 유지 + 글자가 상태를 말한다: `[ 메뉴 ]` → `[ 닫기 ]`, `[ 라이트 ]` → `[ 다크 ]` |
| 진행 중 | 글자를 `[ ... ]`로 바꾸고 `aria-busy="true"` |
| 비활성 | 괄호 없이 글자만, `opacity: var(--mp-opacity-muted)`, 반전 없음 |

## 동작
- `invert-hover`: opacity·배경·글자색 `--mp-duration-hover` ease
- 누름 이동(`press`)은 쓰지 않는다 — 테두리 없는 글자라 1px 이동이 흔들림으로 보인다
- 토글은 글자를 즉시 바꾼다. 페이드·스크램블 없음

**접근성**
- 요소는 `<button type="button">`
- 스크린리더가 괄호를 읽지 않도록 `aria-label`에 괄호 없는 이름을 준다: `aria-label="확인"`
- 토글은 상태를 이름에 담는다: `aria-label="화면 테마: 라이트 — 눌러서 바꾸기"`(design_lab 방식) 또는 `aria-pressed`
- 패널을 열면 `aria-expanded` + `aria-controls`
- 키보드: `Tab` 포커스, `Enter`·`Space` 실행. 닫기 동작은 `Esc`에도 연결한다
- 기본 opacity 0.55는 보조 행동이라 허용한다. 필수 행동이면 `button`으로 올린다
- 메뉴를 여는 텍스트 액션은 `aria-haspopup="menu"` 또는 `"dialog"`를 맞게 준다
- 진행 중(`[ ... ]`)에는 `aria-busy="true"`와 함께 누름을 막고, 끝나면 `aria-live="polite"` 영역에 결과를 알린다

**reduced-motion**
- transition 없이 최종 상태만

## 데모
```html demo
<div class="mp-text-action-row">
  <button class="mp-text-action" type="button" aria-label="확인">[ 확인 ]</button>
  <button class="mp-text-action is-hover" type="button" aria-label="취소">[ 취소 ]</button>
  <button class="mp-text-action" type="button" aria-expanded="true" aria-label="닫기">[ 닫기 ]</button>
  <button class="mp-text-action" type="button" disabled>편집</button>
</div>
```

## 코드
```css
.mp-text-action-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6em 1.2em; }
.mp-text-action {
  padding: 0.2em 0.35em; border: 0; border-radius: 0;
  background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-kicker) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  white-space: nowrap; cursor: pointer; opacity: var(--mp-opacity-meta);
  transition: opacity var(--mp-duration-hover) ease, background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-text-action:hover, .mp-text-action:focus-visible, .mp-text-action:active,
.mp-text-action.is-hover, .mp-text-action[aria-expanded="true"], .mp-text-action[aria-pressed="true"] {
  opacity: 1; background: var(--mp-ink); color: var(--mp-bg);
}
.mp-text-action:focus-visible { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; }
.mp-text-action:disabled { opacity: var(--mp-opacity-muted); background: transparent; color: var(--mp-ink); cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) { .mp-text-action { transition: none; } }
```

## 앱
- SwiftUI: `Button("[ 확인 ]") { }` + `.buttonStyle(.plain)`, 사용자 `ButtonStyle`에서 `configuration.isPressed`일 때 배경 ink·글자 bg, 기본 `.opacity(0.55)`. `.accessibilityLabel("확인")`.
- Compose: `TextButton(shape = RectangleShape, contentPadding = PaddingValues(horizontal = 6.dp, vertical = 2.dp), colors = ButtonDefaults.textButtonColors(contentColor = ink))`, ripple 대신 눌림 반전, `Modifier.semantics { contentDescription = "확인" }`.
- 앱 바 오른쪽의 `[ 편집 ]`, 시트 맨 아래 `[ 취소 ]`에 쓴다. 최소 터치 높이 44pt/48dp.
- OS 예외: 시스템 알림창(`.alert`, `AlertDialog` 기본형)의 버튼 글자는 괄호 없이 OS 모양 그대로 둔다.

```swift
struct TextActionStyle: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .font(.custom("Mulmaru", size: 13)).tracking(1)
      .padding(.horizontal, 5).padding(.vertical, 3).frame(minHeight: 44)
      .foregroundStyle(configuration.isPressed ? MP.bg : MP.ink)
      .background(configuration.isPressed ? MP.ink : .clear)
      .opacity(configuration.isPressed ? 1 : 0.55)
  }
}
// Button("[ 취소 ]", action: cancel).buttonStyle(TextActionStyle()).accessibilityLabel("취소")
```

```kotlin
val pressed by source.collectIsPressedAsState()
Text(
  "[ 취소 ]", fontFamily = Mulmaru, color = if (pressed) MP.bg else MP.ink,
  modifier = Modifier
    .background(if (pressed) MP.ink else Color.Transparent)
    .alpha(if (pressed) 1f else 0.55f).heightIn(min = 48.dp).padding(horizontal = 6.dp, vertical = 2.dp)
    .clickable(interactionSource = source, indication = null, onClick = cancel)
    .semantics { role = Role.Button; contentDescription = "취소" },
)
```
- OS 예외 목록: `.alert`·`AlertDialog` 시스템 버튼, 키보드 위 시스템 "완료" 버튼, 시스템 공유 시트의 취소

## 해야 할 것 / 하지 말 것
- 해야 할 것: 괄호 안쪽 한 칸 띄움 `[ 확인 ]`.
- 해야 할 것: 1–4자 동사·상태어.
- 해야 할 것: 호버·포커스는 opacity 1 + 반전.
- 해야 할 것: 괄호 없는 접근성 이름.
- 해야 할 것: 토글이면 글자가 지금 상태를 말한다.
- 하지 말 것: 괄호 안쪽 공백 빼기(`[확인]`), 다른 괄호(`<확인>`, `(확인)`).
- 하지 말 것: 테두리를 더해 버튼처럼 만들기.
- 하지 말 것: teal·orange 글자, 밑줄.
- 하지 말 것: 투명도 `--mp-opacity-kicker` 이하로 흐리게.
- 하지 말 것: 화면의 주 행동을 텍스트 액션으로만 두기.

**자주 틀리는 것**
- `[확인]`처럼 괄호 안 공백 없음 → `[ 확인 ]`
- 줄바꿈으로 `]`만 다음 줄 → `white-space: nowrap`
- 스크린리더가 "왼쪽 대괄호 확인" → `aria-label="확인"`
- 주 행동을 텍스트 액션으로 → 테두리 `button`
- 호버 시 opacity만 올리고 반전 없음(메뉴 버튼 제외 규칙 혼동) → opacity 1 + 반전
