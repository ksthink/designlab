---
id: dropdown-menu
name: 드롭다운 메뉴
nameEn: Dropdown Menu
category: navigation
summary: 버튼 아래로 펼쳐지는 행동·링크 목록 상자. 1px 진한 선, 항목 호버는 잉크/배경 반전, 선택 항목은 teal ■.
aliases: [드롭다운, 드롭다운 메뉴, dropdown, dropdown menu, 펼침 메뉴, 더보기 메뉴, 더보기, 옵션 메뉴, 정렬 메뉴, 메뉴 버튼, overflow menu, kebab menu, menu button, 풀다운 메뉴]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art, retro-color]
tokens: [--mp-line-button, --mp-bg, --mp-line-strong, --mp-size-small, --mp-tracking-small, --mp-line, --mp-secondary, --mp-opacity-meta, --mp-gutter, --mp-ink, --mp-opacity-muted, --mp-duration-hover, --mp-font, --mp-border]
effects: [invert-hover, reduced-motion]
related: [menu, context-menu, select, popover, button, text-action, drawer]
---

## 용도
버튼 하나 뒤에 행동·링크 3–8개를 접어 둘 때 쓴다(정렬 기준, 더보기 행동, 좁은 머리의 짧은 메뉴).
폼 값을 고르는 입력이면 `select`, 설명·설정 내용이면 `popover`, 전체 사이트 메뉴가 두 줄을 넘으면 `drawer`.
자주 쓰는 행동 1–2개는 접지 않고 `button`으로 꺼내 둔다.

**함께 쓰는 요소**
- `menu`의 메뉴 버튼으로 여는 짧은 사이트 메뉴(4개 이하)는 드롭다운, 5개 이상은 `drawer`
- 같은 행동 목록을 항목 오른쪽 클릭으로도 열면 `context-menu` — 상자 모양·항목 규칙은 이 문서와 같다
- 삭제 항목 → 바로 실행하지 않고 `confirm-step`(또는 `modal`)
- teal ■는 선택형 무리 안에 하나. 행동형 항목에는 ■를 쓰지 않는다. orange는 상자 안에 쓰지 않는다

## 생김새
**여는 버튼**
- `button` 모양(1px `--mp-line-button`, `padding: 0.75em 1.5em`) 또는 `text-action` 모양 `[ 정렬 ]`
- 글자 뒤 `0.8em` 띄워 열림 표시 글자: 닫힘 `+`, 열림 `-`. 둥근 쉐브론(⌄)·삼각형 아이콘을 쓰지 않는다
- 더보기 버튼만 필요하면 `icon-button` 정사각 2.4rem 안에 `...`

**상자**
- 버튼 바로 아래 `0.4em` 간격, 왼쪽 정렬(화면 오른쪽 끝에 닿으면 오른쪽 정렬)
- 배경 `--mp-bg`, 1px `--mp-line-strong`, radius 0, 그림자 없음 — 선 하나로 뜬 것을 보인다
- 최소 폭 = 여는 버튼 폭, 최대 폭 `18rem`, 항목 글자는 한 줄(`white-space: nowrap`)
- 위아래 안쪽 여백 `0.3em`

**항목**
- `padding: 0.6em 1em`, 글자 `--mp-size-small`, 자간 `--mp-tracking-small`, opacity 1(상자 안 항목은 모두 읽혀야 한다)
- 항목 사이 선 없음. 무리를 나눌 때만 1px `--mp-line` 가로선, 위아래 `0.3em`
- **선택된 값**: 글자 앞 `0.5em` 정사각 **teal ■ 면**(`--mp-secondary`), 오른쪽 `0.6em`. 선택이 없는 항목도 같은 자리를 비워 글자 줄을 맞춘다
- 단축키가 있으면 오른쪽 끝에 `--mp-opacity-meta`
- 되돌릴 수 없는 행동(삭제)은 맨 아래 무리, 글자에 `…`를 붙이고 다음 단계는 `confirm-step`

**크기·간격**
- 터치 기기 항목 높이 최소 44px: `padding: 0.85em 1em`
- 상자와 화면 가장자리 최소 `--mp-gutter`

**반응형**
- 상자가 화면 아래로 넘치면 버튼 위로 연다
- 560px 미만에서 항목이 6개를 넘으면 상자 대신 `bottom-sheet` 목록으로 연다

## 상태
| 상태 | 표현 |
|---|---|
| 버튼 닫힘 | 기본 모양 + `+` |
| 버튼 호버·포커스 | 배경 `--mp-ink`, 글자 `--mp-bg` |
| 버튼 열림 | 반전 유지 + `-`, `aria-expanded="true"` |
| 항목 기본 | opacity 1, 배경 투명 |
| 항목 호버·키보드 포커스 | 배경 `--mp-ink`, 글자 `--mp-bg` (■는 teal 그대로) |
| 선택 항목 | teal ■ |
| 비활성 항목 | `--mp-opacity-muted`, `aria-disabled="true"`, 반전 없음 |

## 동작
- 상자는 움직임 없이 즉시 나타나고 사라진다(펼침·페이드·크기 변화 없음)
- 반전은 `invert-hover`, `--mp-duration-hover` ease. 키보드로 항목을 옮길 때도 같은 반전
- 항목을 고르면 실행하고 닫는다. 선택형(정렬)이면 ■를 옮기고 닫는다
- 바깥 누름, `Esc`, 스크롤로 버튼이 화면 밖으로 나가면 닫는다
- `reduced-motion`: transition 없음

**접근성**
- 행동 목록: 버튼 `aria-haspopup="menu" aria-expanded aria-controls`, 상자 `role="menu"`, 항목 `role="menuitem"`(선택형은 `role="menuitemradio" aria-checked`)
- 링크 목록(사이트 메뉴)은 ARIA menu 역할을 쓰지 않고 `<nav>` + `<ul>` + `<a>` + 버튼 `aria-expanded`만(디스클로저 패턴)
- 키보드(menu 역할): `Enter`/`Space`/`↓` 열고 첫 항목 포커스, `↑` 열고 마지막 항목, `↓` `↑` 이동(순환), `Home` `End`, 글자 입력 시 그 글자로 시작하는 항목, `Esc` 닫고 버튼으로 포커스, `Tab` 닫고 다음 요소로
- 포커스는 항목에 실제로(로빙 탭인덱스), 가상 포커스(`aria-activedescendant`)는 쓰지 않는다
- 스크립트 없이 `<details>`로 만들 수 있다(데모) — 이때는 링크 목록 디스클로저로 취급한다

## 데모
```html demo
<div class="mp-dropdown-menu-stage">
  <details class="mp-dropdown-menu" open>
    <summary>정렬</summary>
    <ul>
      <li><a href="#" aria-current="true">최근</a></li>
      <li><a href="#" class="is-hover">이름</a></li>
      <li><a href="#">상태</a></li>
      <li><a aria-disabled="true">크기</a></li>
    </ul>
  </details>
</div>
```

## 코드
```css
.mp-dropdown-menu-stage { position: relative; min-height: 14rem; }
.mp-dropdown-menu { position: relative; display: inline-block; font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small); }
.mp-dropdown-menu summary {
  list-style: none; cursor: pointer; padding: 0.75em 1.5em; color: var(--mp-ink);
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-dropdown-menu summary::-webkit-details-marker { display: none; }
.mp-dropdown-menu summary::after { content: "+"; margin-left: 0.8em; }
.mp-dropdown-menu[open] summary::after { content: "-"; }
.mp-dropdown-menu summary:hover, .mp-dropdown-menu summary:focus-visible, .mp-dropdown-menu[open] summary { background: var(--mp-ink); color: var(--mp-bg); }
.mp-dropdown-menu summary:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-dropdown-menu ul {
  position: absolute; top: calc(100% + 0.4em); left: 0; z-index: 3; min-width: 100%; max-width: 18rem;
  margin: 0; padding: 0.3em 0; list-style: none; white-space: nowrap;
  background: var(--mp-bg); border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
}
.mp-dropdown-menu a {
  display: block; padding: 0.6em 1em; cursor: pointer;
  color: var(--mp-ink); text-decoration: none;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-dropdown-menu a::before { content: ""; display: inline-block; width: 0.5em; height: 0.5em; margin-right: 0.6em; vertical-align: 0.12em; }
.mp-dropdown-menu a[aria-current="true"]::before, .mp-dropdown-menu [aria-checked="true"]::before { background: var(--mp-secondary); }
.mp-dropdown-menu a:hover, .mp-dropdown-menu a:focus-visible, .mp-dropdown-menu a.is-hover { background: var(--mp-ink); color: var(--mp-bg); outline: 0; }
.mp-dropdown-menu a[aria-disabled="true"] { opacity: var(--mp-opacity-muted); background: transparent; color: var(--mp-ink); cursor: not-allowed; }
.mp-dropdown-menu hr { margin: 0.3em 0; border: 0; border-top: var(--mp-border) solid var(--mp-line); }
@media (pointer: coarse) { .mp-dropdown-menu a { padding: 0.85em 1em; } }
@media (prefers-reduced-motion: reduce) { .mp-dropdown-menu summary, .mp-dropdown-menu a { transition: none; } }
```

```js
// role="menu" 판: 화살표 이동, Esc 닫기, 포커스 돌려주기
// 마크업: <button aria-haspopup="menu" aria-expanded="false" aria-controls="sort-menu"> + <ul role="menu" id="sort-menu" hidden>
(() => {
  const btn = document.querySelector('[aria-haspopup="menu"][aria-controls]');
  const menu = btn && document.getElementById(btn.getAttribute('aria-controls'));
  if (!btn || !menu) return;
  const items = [...menu.querySelectorAll('[role^="menuitem"]:not([aria-disabled="true"])')];
  if (!items.length) return;
  items.forEach((x) => (x.tabIndex = -1));
  const open = (i) => { menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); items.at(i).focus(); };
  const hide = () => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); };
  const close = () => { hide(); btn.focus(); };
  btn.addEventListener('click', () => (menu.hidden ? open(0) : close()));
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); open(0); }
    if (e.key === 'ArrowUp') { e.preventDefault(); open(-1); }
  });
  menu.addEventListener('keydown', (e) => {
    const i = items.indexOf(document.activeElement);
    const n = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 }[e.key];
    if (n !== undefined) { e.preventDefault(); items[(n + items.length) % items.length].focus(); }
    else if (e.key === 'Escape') close();
    else if (e.key === 'Tab') hide();
    else if (e.key.length === 1) items.find((x) => x.textContent.trim().startsWith(e.key))?.focus(); // 글자로 찾기
  });
  document.addEventListener('click', (e) => { if (!menu.hidden && !menu.contains(e.target) && !btn.contains(e.target)) hide(); });
})();
```

## 앱
- SwiftUI: 시스템 `Menu`는 둥근 유리 상자를 OS가 그린다 — **OS 예외**. 글자·순서·`Divider` 무리만 맞춘다. 모양까지 맞춰야 하면 직접 그린다.
```swift
VStack(alignment: .leading, spacing: 0) {
  ForEach(options) { o in
    Button { sort = o; isOpen = false } label: { HStack(spacing: 8) {
      Rectangle().fill(o == sort ? Color.mpSecondary : .clear).frame(width: 8, height: 8)
      Text(o.title).font(.custom("Mulmaru", size: 15))
    }.padding(.horizontal, 16).frame(minHeight: 44, alignment: .leading) }
    .buttonStyle(.plain).accessibilityAddTraits(o == sort ? .isSelected : [])
  }
}
.background(Color.mpBg).overlay(Rectangle().stroke(Color.mpLineStrong, lineWidth: 1))
```
```kotlin
DropdownMenu(expanded = open, onDismissRequest = { open = false }, shape = RectangleShape,
  containerColor = MpBg, tonalElevation = 0.dp, shadowElevation = 0.dp, border = BorderStroke(1.dp, MpLineStrong)) {
  options.forEach { o -> DropdownMenuItem(
    text = { Text(o.title, fontFamily = Mulmaru, fontWeight = FontWeight.Normal) },
    leadingIcon = { Box(Modifier.size(8.dp).background(if (o == sort) MpSecondary else Color.Transparent, RectangleShape)) },
    onClick = { sort = o; open = false }) }
}
```
- 눌림은 ripple 대신 ink 배경(`indication = null` + `collectIsPressedAsState()`).
- OS 예외(모양을 바꾸지 않는다): SwiftUI 시스템 `Menu`·`Picker(.menu)`, 텍스트 선택 시 시스템 편집 메뉴(복사·붙여넣기), iOS 26 이상 툴바 메뉴의 유리 재질.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 1px `--mp-line-strong` 상자, 배경 `--mp-bg`, 버튼 바로 아래.
- 해야 할 것: 항목 호버·키보드 포커스는 잉크/배경 반전, 선택 값은 teal ■.
- 해야 할 것: `+`/`-`로 열림 표시, 열린 동안 버튼 반전 유지.
- 해야 할 것: `Esc`·바깥 누름으로 닫고 포커스를 버튼으로.
- 해야 할 것: 삭제 같은 행동은 맨 아래 + `confirm-step`.
- 하지 말 것: 그림자로 띄우기, 둥근 상자, 펼쳐지는·페이드 애니메이션.
- 하지 말 것: 체크 아이콘, 항목마다 색 아이콘, 선택 항목 teal 글자.
- 하지 말 것: 호버만으로 열기, 드롭다운 안에 드롭다운(하위 메뉴).
- 하지 말 것: 삭제 항목을 빨강·orange 글자로.

**자주 틀리는 것**
- 사이트 링크 목록에 `role="menu"`를 붙인다 → 링크면 `<nav>` 디스클로저, `role="menu"`는 행동 목록만
- 열 때 포커스를 버튼에 둔다 → 첫(또는 선택된) 항목으로 옮긴다
- `Esc`로 닫은 뒤 포커스가 사라진다 → 버튼으로 `focus()`
- 선택 표시를 체크 아이콘 + teal 글자로 겹친다 → 앞의 teal ■ 하나, `aria-checked="true"`
- `box` 그림자로 떠 보이게 한다 → 1px `--mp-line-strong` 선 하나
