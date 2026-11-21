---
id: button
name: 버튼
nameEn: Button
category: actions
summary: 행동 하나를 실행하는 1px 테두리 사각형. 호버하면 잉크와 배경이 반전된다.
aliases: [버튼, btn, CTA, 액션 버튼, 누르기, 기본 버튼, primary button, 강조 버튼, 메뉴 버튼, 토글 버튼, toggle button, 제출 버튼, submit]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev app.html .btn
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-accent, --mp-secondary, --mp-palette-slate, --mp-line-button, --mp-border, --mp-font, --mp-size-small, --mp-tracking-small, --mp-size-title, --mp-opacity-muted, --mp-duration-hover, --mp-duration-caret]
effects: [invert-hover, press, caret, reduced-motion]
related: [icon-button, text-action, link, menu, fab, confirm-step, loading]
---

## 용도
화면에서 실행할 행동(저장, 다운로드, 열기, 보내기)에 쓴다. 다른 페이지로 **이동만** 하면 `link`를 쓴다.
한 영역에 버튼은 1–2개까지 둔다. 여러 행동을 나열해야 하면 `menu`나 `text-action`을 검토한다.

**함께 쓰는 요소**
- `text-action`: 주 행동은 버튼, 보조 행동(취소, 닫기)은 `[ 취소 ]`. 한 줄에 둘 때 버튼을 오른쪽 끝에 둔다
- `confirm-step`: 되돌릴 수 없는 행동(삭제, 결제)은 버튼이 바로 실행하지 않고 확인 단계를 연다
- `menu`: 메뉴 버튼은 이 문서의 버튼 틀(또는 `[ 메뉴 ]`)을 쓰고 열림은 `aria-expanded`
- `icon-button`·`fab`: 글자 없는 버튼은 같은 반전 규칙 + 정사각 틀
- 강조 orange는 화면당 하나 — 버튼 ■ 마크를 쓰면 같은 화면의 다른 orange(`status-dot` 등)를 뺀다

## 생김새
- 사각형, `border-radius: 0`, 테두리 `var(--mp-border) solid var(--mp-line-button)`
- 배경 투명, 글자 `var(--mp-ink)`, `var(--mp-font)` 400
- 글자 `--mp-size-small`, 자간 `--mp-tracking-small`, 행간 1
- 아이콘을 함께 쓰면 글자 앞에 두고 간격 `0.5em`, 아이콘은 `pixel-icon` 규칙(정수 배율, `background: currentColor` mask로 반전을 따라감)
- 강조 마크: 버튼 **안** 글자 앞 `■`(`--mp-accent`), `aria-hidden="true"`

**크기·간격**
- 안쪽 여백 `0.75em 1.5em` (metaphr.dev 원값), 버튼 사이 간격 `0.8em`
- 최소 누를 영역 44×44px: 높이가 모자라면 `min-height: 44px`
- 글자는 한 줄(`white-space: nowrap`), 최대 10자 안팎. 더 길면 문구를 줄인다

**반응형**
- 390px 이하 화면에서 폼 끝의 주 행동은 폭 전체(`width: 100%`, `justify-content: center`). 줄 안에 섞인 작은 버튼은 그대로 둔다
- 버튼 줄은 `flex-wrap: wrap`. 좁아지면 주 행동이 **위**로 오도록 `flex-direction: column-reverse`
- `hover: none` 기기는 호버 대신 누르는 동안 반전

## 상태
| 상태 | 표현 | 속성 |
|---|---|---|
| 기본 | 1px `--mp-line-button`, 투명 배경, 글자 `--mp-ink` | — |
| 호버(`hover: hover` 기기) | 반전: 배경 `--mp-ink`, 글자 `--mp-bg`, 테두리 `--mp-ink` | — |
| 키보드 포커스 | 반전 + `outline: 1px solid var(--mp-ink); outline-offset: 3px` | `:focus-visible` |
| 누름 | `translateY(1px)`. 터치에서는 누르는 동안 반전도 | `:active` |
| 켜짐(토글) | 배경 `--mp-secondary`, 글자 `--mp-palette-slate`, 테두리 `--mp-secondary`. 호버하면 반전이 우선 | `aria-pressed="true"` |
| 불러오는 중 | 글자 그대로 + 뒤에 `_` 커서 깜빡임(`--mp-duration-caret` steps), 반전 없음, 다시 누름 막기 | `aria-busy="true"`, `aria-disabled="true"` |
| 비활성 | `opacity: var(--mp-opacity-muted)`, 반전·이동 없음, `cursor: not-allowed` | `disabled` 또는 `aria-disabled="true"` |
| 강조(화면당 하나) | 글자 앞 ■ 마크. 면 전체 강조는 배경 `--mp-accent` + 글자 `--mp-palette-slate`, 글자 `--mp-size-title`(24px) 이상일 때만 | — |

## 동작
- 호버 반전: `invert-hover` — `:hover`는 `@media (hover: hover)` 안에만. 터치는 `@media (hover: none)`의 `:active` 반전
- 배경·글자·테두리색 모두 `--mp-duration-hover`(0.25s) ease
- 누름: `press` (1px 이동, 즉시)
- 불러오는 중 커서: `caret` — `steps(1, end)` `--mp-duration-caret`(1.2s) infinite. 300ms 안에 끝나는 작업에는 표시하지 않는다
- `prefers-reduced-motion: reduce`: transition 없이 최종 상태, 커서는 깜빡이지 않고 보이기만

**접근성**
- 요소: 행동은 `<button type="button">`(폼 제출만 `type="submit"`). 주소로 이동하면 `<a href>` — `<a>`에 `role="button"`을 붙이거나 `<div onclick>`으로 만들지 않는다
- 키보드: `Tab`으로 도달, `Enter`·`Space`로 실행. 포커스 순서는 읽는 순서와 같게(시각적 역순 배치는 `column-reverse`로만, DOM 순서는 주 행동이 먼저)
- 토글: `aria-pressed="true|false"`, 이름은 바뀌지 않는다("굵게"가 켜짐/꺼짐). 이름이 상태에 따라 바뀌면 `aria-pressed`를 쓰지 않는다
- `disabled`는 포커스에서 빠지고 이유를 읽을 수 없다. 왜 안 되는지 알려야 하면 `aria-disabled="true"` + `aria-describedby="이유 id"`, 클릭 처리에서 막는다
- 불러오는 중: `aria-busy="true"` + `aria-disabled="true"`, 끝나면 결과를 `aria-live="polite"` 영역에 짧게("저장했습니다")
- 글자 없는 버튼은 `aria-label`. ■ 마크·커서는 `aria-hidden`
- 대비: 기본·반전 모두 ink/bg 10.9:1, 켜짐 slate/teal 4.64:1

## 데모
```html demo
<div class="mp-button-row">
  <button class="mp-button" type="button">저장</button>
  <button class="mp-button is-hover" type="button">호버</button>
  <button class="mp-button" type="button"><span class="mp-button-mark" aria-hidden="true">■</span>받기</button>
  <button class="mp-button" type="button" aria-pressed="true">켜짐</button>
  <button class="mp-button" type="button" aria-busy="true" aria-disabled="true">저장</button>
  <button class="mp-button" type="button" disabled>준비</button>
</div>
```

## 코드
```css
.mp-button-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.8em; }
.mp-button {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5em;
  min-height: 44px; padding: 0.75em 1.5em; white-space: nowrap;
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  cursor: pointer;
  transition: background-color var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, border-color var(--mp-duration-hover) ease;
}
.mp-button[aria-pressed="true"] { background: var(--mp-secondary); color: var(--mp-palette-slate); border-color: var(--mp-secondary); }
.mp-button:focus-visible, .mp-button.is-hover { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
@media (hover: hover) {
  .mp-button:hover { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
}
@media (hover: none) {
  .mp-button:active { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
}
.mp-button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-button:active { transform: translateY(1px); }
.mp-button:disabled, .mp-button[aria-disabled="true"] {
  opacity: var(--mp-opacity-muted); cursor: not-allowed; transform: none;
  background: transparent; color: var(--mp-ink); border-color: var(--mp-line-button);
}
.mp-button[aria-busy="true"] { opacity: 1; cursor: progress; }
.mp-button[aria-busy="true"]::after { content: "_"; animation: mp-button-caret var(--mp-duration-caret) steps(1, end) infinite; }
@keyframes mp-button-caret { 50% { opacity: 0; } }
.mp-button-mark { color: var(--mp-accent); } /* 강조 마크 — 버튼 안 글자 앞, 화면당 하나 */
@media (max-width: 390px) { .mp-button--block { width: 100%; } }
@media (prefers-reduced-motion: reduce) {
  .mp-button { transition: none; }
  .mp-button[aria-busy="true"]::after { animation: none; }
}
```

```js
// 불러오는 중 — 다시 누름을 막고 끝나면 결과를 알린다
(() => {
  const btn = document.querySelector('.mp-button[data-action="save"]');
  const live = document.querySelector('[data-live]'); // <p data-live aria-live="polite" class="visually-hidden">
  if (!btn) return;
  btn.addEventListener('click', async () => {
    if (btn.getAttribute('aria-disabled') === 'true') return;
    btn.setAttribute('aria-busy', 'true');
    btn.setAttribute('aria-disabled', 'true');
    try {
      await new Promise((r) => setTimeout(r, 800)); // 실제 저장 작업으로 바꾼다
      if (live) live.textContent = '저장했습니다';
    } finally {
      btn.removeAttribute('aria-busy');
      btn.removeAttribute('aria-disabled');
    }
  });
})();
```

## 앱
```swift
struct MPButtonStyle: ButtonStyle {
  var isOn = false
  func makeBody(configuration: Configuration) -> some View {
    let inverted = configuration.isPressed
    configuration.label
      .font(.custom("Mulmaru", size: 12)).tracking(0.9)
      .padding(.vertical, 11).padding(.horizontal, 22).frame(minHeight: 44)
      .foregroundStyle(inverted ? MP.bg : (isOn ? MP.slate : MP.ink))
      .background(inverted ? MP.ink : (isOn ? MP.secondary : .clear))
      .overlay(Rectangle().stroke(inverted ? MP.ink : MP.lineButton, lineWidth: 1))
      .offset(y: inverted ? 1 : 0)
  }
}
```
```kotlin
val pressed by interaction.collectIsPressedAsState()
OutlinedButton(
  onClick = onClick, interactionSource = interaction,
  shape = RectangleShape, elevation = null,
  border = BorderStroke(1.dp, if (pressed) MP.ink else MP.lineButton),
  colors = ButtonDefaults.outlinedButtonColors(containerColor = if (pressed) MP.ink else Color.Transparent, contentColor = if (pressed) MP.bg else MP.ink),
  modifier = Modifier.defaultMinSize(minHeight = 48.dp).offset(y = if (pressed) 1.dp else 0.dp),
) { Text(label, fontFamily = Mulmaru, fontWeight = FontWeight.Normal) }
```
- 터치 기기는 호버가 없으므로 **눌림 = 반전**. 최소 터치 영역 44pt/48dp
- ripple은 끈다(`LocalRippleConfiguration provides null` 또는 `indication = null`)
- 토글은 SwiftUI `.accessibilityAddTraits(.isSelected)`, Compose `Modifier.toggleable` + `Role.Switch` 대신 `Role.Button`과 `stateDescription`
- OS 예외: 시스템 알림창(`.alert`, `AlertDialog` 시스템 버튼), 공유 시트, 결제 시트(Apple Pay·Google Pay 버튼은 각 사 규정 모양), iOS 26 이상 툴바의 유리 버튼은 OS 모양 그대로 둔다

## 해야 할 것 / 하지 말 것
- 해야 할 것: 행동을 동사로 짧게("저장", "열기"). 호버·포커스는 잉크/배경 반전. 라이트·다크 모두 변수로.
- 해야 할 것: 되돌릴 수 없는 행동은 `confirm-step`으로. 불러오는 중에는 다시 누를 수 없게.
- 해야 할 것: 44px 누를 영역, 포커스 링, 토글은 `aria-pressed`.
- 하지 말 것: 둥근 모서리, 그림자, 그라데이션, 굵은 글씨, 채운 색 버튼 여러 개, 호버 시 teal·orange로 색 바꾸기, 크기가 커지는 호버.
- 하지 말 것: 이동에 버튼, 행동에 링크. 불러오는 중에 회전 스피너.

**자주 틀리는 것**
| 틀린 것 | 고친 것 |
|---|---|
| `:hover` 반전을 미디어 쿼리 없이 둠 → 터치 후 반전이 남음 | `@media (hover: hover)` 안에 `:hover`, 터치는 `:active` |
| 반전 때 테두리가 `--mp-line-button` 그대로 | 반전 중 `border-color: var(--mp-ink)` |
| 켜진 토글을 반전(잉크 면)으로 표시 | 지속 선택은 teal 면 + slate 글자, 반전은 가리킬 때만 |
| `<a href="#" onclick>` 버튼 | `<button type="button">` |
| 폼 안 버튼에 `type` 없음 → 의도치 않은 제출 | `type="button"` 명시 |
| Compose 기본 elevation·ripple·둥근 모양 남김 | `shape = RectangleShape`, `elevation = null`, ripple 끔 |
| 강조 ■ 마크를 버튼마다 붙임 | 화면당 하나 |
