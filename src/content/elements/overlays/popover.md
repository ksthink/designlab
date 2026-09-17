---
id: popover
name: 팝오버
nameEn: Popover
category: overlays
summary: 버튼 옆에 붙어 뜨는 작은 1px 상자. 설명·짧은 설정을 담고, 꼬리 화살표 없이 0.5em 떨어진다.
aliases: [팝오버, popover, 말풍선 상자, 설명 상자, 떠 있는 상자, 도움말 상자, info popup, 미니 패널]
platforms: [web, ios]
status: proposed
pillars: [minimalism]
tokens: [--mp-bg, --mp-border, --mp-line-strong, --mp-size-small, --mp-tracking-small, --mp-leading-card, --mp-size-kicker, --mp-opacity-kicker, --mp-gutter, --mp-ink, --mp-duration-hover, --mp-font, --mp-tracking-kicker]
effects: []
related: [tooltip, dropdown-menu, modal, bottom-sheet, icon-button]
---

## 용도
버튼에 딸린 짧은 설명이나 설정 두세 개를 **눌렀을 때** 보여 줄 때 쓴다(도움말 `?`, 보기 설정).
호버로 뜨는 한 줄 설명은 `tooltip`, 행동 목록은 `dropdown-menu`, 답을 강제하면 `modal`.
팝오버는 흐름을 막지 않는다 — 뒤 화면은 계속 조작할 수 있다.

**함께 쓰는 요소**
- `popover` vs `tooltip`: 호버·포커스로 뜨는 한 줄 이름은 tooltip, 눌러서 여는 설명·설정은 popover. 한 버튼에 둘을 함께 달지 않는다
- `icon-button`(`?`) → `popover`: 도움말 상자의 기본 조합
- `popover` 안 `switch`·`segmented-control`: 설정 두세 개까지. 넘으면 `settings` 화면이나 `bottom-sheet`
- 좁은 화면·터치에서는 같은 내용을 `bottom-sheet`로. 행동 목록이면 `dropdown-menu`
- 팝오버 안에는 orange를 두지 않는다(상자는 보조 정보)

## 생김새
**구조**
- 여는 버튼(`icon-button` `?` 또는 `text-action` `[ ? ]`) + 상자
- 상자: 배경 `--mp-bg`, 테두리 `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`, 그림자 없음
- **꼬리 화살표를 그리지 않는다.** 가까이 붙는 것으로 어느 버튼의 상자인지 보인다
- 글자 `--mp-size-small`, 자간 `--mp-tracking-small`, 행간 `--mp-leading-card`
- 제목이 필요하면 첫 줄 `--mp-size-kicker` `--mp-opacity-kicker`(kicker 모양)
- 설정 항목이 있으면 `switch`·`segmented-control`을 그대로 넣는다

**크기·간격**
- 버튼과 `0.5em` 간격, 기본 위치는 버튼 아래 왼쪽 정렬
- 폭 최소 `12rem`, 최대 `18rem`, 안쪽 여백 `0.9em 1.1em`
- 화면 가장자리에서 최소 `--mp-gutter` 떨어진다. 아래 공간이 없으면 위로 뒤집는다

**반응형**
- 터치 기기(`(hover: none)`) 또는 폭 480px 미만: 팝오버 대신 같은 내용을 `bottom-sheet`로 연다
- 넓은 화면: 버튼 기준 배치(anchor positioning 또는 JS 계산)

## 상태
| 상태 | 표현 |
|---|---|
| 닫힘 | 상자 없음, 버튼 `aria-expanded="false"` |
| 버튼 호버·포커스 | 버튼 반전(배경 `--mp-ink`, 글자 `--mp-bg`) |
| 열림 | 상자 보임, 버튼 반전 유지, `aria-expanded="true"` |
| 위로 뒤집힘 | 버튼 위 `0.5em`, 모양 같음 |
| 닫기 | 버튼 다시 누름 · `Esc` · 바깥 누름 |

## 동작
**시간**
- 나타나고 사라질 때 움직임 없음(즉시). 페이드·확대 없음
- 버튼 반전만 `--mp-duration-hover` ease

**접근성**
- 웹: `<button popovertarget="id" aria-expanded>` + `<div id popover>`. 브라우저가 `Esc`·바깥 누름 닫기(light dismiss)를 처리한다
- 내용이 설명뿐이면 상자에 `role="note"` 대신 버튼 `aria-describedby`를 쓰지 않는다 — 누를 때만 보이므로 상자에 `role="dialog"` + `aria-label`
- 포커스를 가두지 않는다. 열면 상자 안 첫 조작 요소가 있을 때만 그리로, 없으면 버튼에 머문다
- 닫히면 포커스는 버튼으로 돌아간다
- Tab 순서상 상자는 버튼 바로 뒤(DOM도 버튼 바로 뒤에 둔다)
- 팝오버 API를 못 쓰면: 버튼 `aria-expanded` + `aria-controls`, 문서 `keydown`에서 `Esc`로 닫고 버튼에 포커스, 바깥 `pointerdown`으로 닫기
- 상자 안 조작 요소 사이 Tab 이동 후 마지막에서 Tab을 누르면 상자를 닫고 버튼 다음 요소로 간다(가두지 않는다)

**reduced-motion**
- 움직임이 없으므로 버튼 반전 transition만 끈다

## 데모
```html demo
<div class="mp-popover-stage">
  <button class="mp-popover-trigger" type="button" aria-expanded="true" aria-controls="mp-popover-d">[ ? ]</button>
  <div class="mp-popover" id="mp-popover-d" role="dialog" aria-label="도움말">
    <span class="mp-popover-kicker">도움말</span>
    <span class="mp-popover-bar"></span>
    <span class="mp-popover-bar short"></span>
  </div>
</div>
```

## 코드
```css
.mp-popover-stage { position: relative; min-height: 9rem; }
.mp-popover-trigger {
  padding: 0.2em 0.35em; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink); cursor: pointer;
  font: 400 var(--mp-size-small) / 1.4 var(--mp-font);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-popover-trigger:hover, .mp-popover-trigger:focus-visible, .mp-popover-trigger[aria-expanded="true"] { background: var(--mp-ink); color: var(--mp-bg); }
.mp-popover-trigger:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-popover {
  position: absolute; top: calc(1.4em + 0.4em + 0.5em); left: 0;
  display: grid; gap: 0.6em; min-width: 12rem; max-width: 18rem; margin: 0; padding: 0.9em 1.1em;
  background: var(--mp-bg); color: var(--mp-ink);
  border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); line-height: var(--mp-leading-card);
}
.mp-popover-kicker { font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-kicker); opacity: var(--mp-opacity-kicker); }
/* 데모용 글줄 자리 — 실제 화면에서는 문장 */
.mp-popover-bar { display: block; height: 0.5em; background: var(--mp-ink); opacity: var(--mp-opacity-kicker); }
.mp-popover-bar.short { width: 60%; }
@media (prefers-reduced-motion: reduce) { .mp-popover-trigger { transition: none; } }
/* 실제 화면: [popover].mp-popover { inset: auto; position-anchor: --trigger; top: calc(anchor(bottom) + 0.5em); left: anchor(left); } UA 기본 테두리·여백은 위 값으로 덮는다 */
```

```js
// aria-expanded 동기화 — popover API가 열고 닫기(Esc·바깥 누름)를 처리한다
// 마크업: <button class="mp-popover-trigger" popovertarget="help" aria-controls="help" aria-expanded="false">, <div id="help" class="mp-popover" popover>
(() => {
  const trigger = document.querySelector('.mp-popover-trigger[popovertarget]');
  const pop = trigger && document.getElementById(trigger.getAttribute('popovertarget'));
  if (!trigger || !pop || !('showPopover' in pop)) return;
  pop.addEventListener('toggle', (e) => {
    trigger.setAttribute('aria-expanded', String(e.newState === 'open'));
    if (e.newState === 'closed' && pop.contains(document.activeElement)) trigger.focus();
  });
  // 터치·좁은 화면은 bottom-sheet로: 같은 내용을 dialog.mp-bottom-sheet에 옮겨 연다
  const sheet = document.querySelector('dialog.mp-bottom-sheet');
  if (sheet && matchMedia('(hover: none), (max-width: 480px)').matches) {
    trigger.removeAttribute('popovertarget');
    trigger.addEventListener('click', () => {
      sheet.querySelector('.mp-bottom-sheet-body')?.replaceChildren(...[...pop.childNodes].map((n) => n.cloneNode(true)));
      sheet.showModal();
    });
  }
})();
```

## 앱
- SwiftUI: `.popover(isPresented:)`는 아이패드에서 둥근 모서리·꼬리 화살표 상자로 그려지는 **OS 예외**다. 내용은 Mulmaru 400·토큰 색으로 맞추고 모양은 받아들인다.
- SwiftUI 아이폰: `.presentationCompactAdaptation(.popover)`로 억지로 띄우지 않고 기본 적응(시트)에 맡기거나 `bottom-sheet` 문서대로 연다.
- 모양까지 맞춰야 하면 `.overlay(alignment: .topLeading)`로 직접 그린다: `Rectangle().stroke(lineStrong, lineWidth: 1)`, `.offset(y: 버튼 높이 + 8)`, `.shadow` 없음.
- Android: 팝오버 요소가 따로 없다. 행동이면 `DropdownMenu`(`dropdown-menu` 문서), 설명·설정이면 `ModalBottomSheet`(`bottom-sheet` 문서).
- OS 예외: iOS 텍스트 선택 메뉴·시스템 편집 메뉴는 OS 모양 그대로.

```swift
Button("[ ? ]") { open.toggle() }
  .overlay(alignment: .topLeading) {
    if open {
      Text("도움말").font(.custom("Mulmaru", size: 14))
        .padding(.horizontal, 14).padding(.vertical, 11).frame(width: 220, alignment: .leading)
        .background(MP.bg).overlay(Rectangle().stroke(MP.lineStrong, lineWidth: 1))
        .offset(y: 44 + 8).accessibilityAddTraits(.isModal)
    }
  }
```

```kotlin
Box {
  TextButton(onClick = { open = true }, shape = RectangleShape) { Text("[ ? ]", fontFamily = Mulmaru, color = MP.ink) }
  Popup(alignment = Alignment.TopStart, offset = IntOffset(0, with(LocalDensity.current) { 56.dp.roundToPx() }),
    onDismissRequest = { open = false }, properties = PopupProperties(focusable = true)) {
    Surface(shape = RectangleShape, color = MP.bg, border = BorderStroke(1.dp, MP.lineStrong),
      tonalElevation = 0.dp, shadowElevation = 0.dp, modifier = Modifier.widthIn(max = 288.dp)) {
      Text("도움말", fontFamily = Mulmaru, modifier = Modifier.padding(horizontal = 14.dp, vertical = 11.dp))
    }
  }
}
```
- OS 예외 목록: iPad `.popover`의 둥근 꼬리 상자, iOS 텍스트 선택·편집 메뉴, Android 텍스트 선택 툴바

## 해야 할 것 / 하지 말 것
- 해야 할 것: 버튼 가까이 `0.5em`, 1px 진한 선, 직각.
- 해야 할 것: 누를 때 열고, 버튼 다시 누름·`Esc`·바깥 누름으로 닫기.
- 해야 할 것: `aria-expanded` 동기화, 닫힌 뒤 포커스를 버튼으로.
- 해야 할 것: 터치·좁은 화면은 `bottom-sheet`로 대신.
- 하지 말 것: 꼬리 화살표, 그림자, 둥근 상자.
- 하지 말 것: 호버만으로 여는 대화형 내용, 팝오버 안에 팝오버.
- 하지 말 것: 폭 `18rem`을 넘는 긴 설명(→ 페이지나 `modal`).
- 하지 말 것: 나타날 때 확대·페이드.

**자주 틀리는 것**
- UA 기본 `[popover]` 테두리·여백 그대로 → 1px `--mp-line-strong`, `0.9em 1.1em`
- 꼬리 삼각형을 `::before`로 그림 → 지운다
- 호버로 열리는 팝오버에 버튼·스위치 → 눌러서 열기
- 팝오버에 포커스 가두기 → 가두지 않는다(비모달)
- 모바일에서도 버튼 옆 작은 상자 → `bottom-sheet`
