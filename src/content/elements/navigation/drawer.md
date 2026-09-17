---
id: drawer
name: 서랍 메뉴
nameEn: Drawer
category: navigation
summary: 메뉴 버튼으로 여는 옆 패널. 배경 면과 1px 진한 선뿐이고, 4계단(steps)으로 밀려 들어오며, 현재 위치는 teal ■.
aliases: [서랍, 서랍 메뉴, 드로어, drawer, navigation drawer, 사이드 메뉴, 사이드바, sidebar, 햄버거 메뉴, 햄버거, 슬라이드 메뉴, off-canvas, 모바일 메뉴, 전체 메뉴, 메뉴, 메뉴 패널, nav]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art, retro-color]
tokens: [--mp-bg, --mp-line-strong, --mp-opacity-body, --mp-size-small, --mp-tracking-small, --mp-opacity-nav, --mp-secondary, --mp-line, --mp-opacity-meta, --mp-gutter, --mp-ink, --mp-duration-fill, --mp-steps-fill, --mp-duration-hover, --mp-border, --mp-font, --mp-size-kicker, --mp-tracking-meta]
effects: [invert-hover, reduced-motion]
related: [menu, header, text-action, icon-button, modal, bottom-sheet, tab-bar]
---

## 용도
좁은 화면에서 `menu` 링크가 두 줄을 넘을 때, 머리의 **메뉴 버튼**(`[ 메뉴 ]` 글자 또는 픽셀 막대 세 줄, `menu` 문서)으로 여는 전체 메뉴다.
넓은 화면(860px 이상)에서는 쓰지 않는다 — 머리에 `menu`를 펼쳐 둔다. 메뉴를 숨기는 것은 공간이 없을 때만이다.
앱의 주 메뉴는 `tab-bar`를 먼저 쓴다. 필터·설정처럼 화면에 딸린 내용은 `bottom-sheet`.

**함께 쓰는 요소**
- 여는 쪽은 `header` 안 `menu`의 메뉴 버튼. 목적지 5개 이상이면 서랍, 4개 이하 짧은 목록이면 `dropdown-menu`
- 서랍 안은 세로 `menu` 그대로(같은 링크·같은 순서). 머리 메뉴와 서랍에 다른 목록을 두지 않는다
- 서랍 안에서 되돌릴 수 없는 행동(로그아웃, 초기화)은 바로 실행하지 않고 `confirm-step`
- teal ■ 현재 표시는 서랍 목록에 하나. orange는 서랍에 쓰지 않는다
- 서랍 위에 `modal`을 열지 않는다. 필요하면 서랍을 닫고 연다

## 생김새
- 오른쪽에서 들어오는 세로 패널(메뉴 버튼이 오른쪽에 있으므로). 왼쪽 버튼이면 왼쪽에서
- 폭 `min(20rem, 85%)`, 높이 화면 전체(`100dvh`), 배경 `--mp-bg`
- 안쪽 가장자리 1px `--mp-line-strong` 하나. radius 0, 그림자 없음
- **가림막**: 패널 뒤 전체를 `--mp-bg` 면으로 덮고 `opacity: var(--mp-opacity-body)`. 흐림·검은 반투명 없음
- 패널 맨 위 줄: 오른쪽 끝 `[ 닫기 ]`(`text-action`) — 메뉴 버튼과 같은 자리·같은 모양이라 손이 옮겨 가지 않는다
- 그 아래 세로 `menu`: 링크 `--mp-size-small`·자간 `--mp-tracking-small`·`--mp-opacity-nav`
- **현재 위치**: 글자 앞 `0.5em` 정사각 **teal ■ 면**(`--mp-secondary`) + opacity 1. 세로 목록에서는 밑선을 두지 않는다(■만)
- 링크 무리를 나누면 사이에 1px `--mp-line` 가로선, 위아래 `0.9em`
- 맨 아래(선택): 테마 토글 `[ 시스템 ]`, 이메일 링크 — `--mp-opacity-meta`

**크기·간격**
- 패널 안쪽 여백 `1.2em var(--mp-gutter)`
- `[ 닫기 ]` 아래 `1.6em` 띄우고 링크 시작
- 링크 행 높이 최소 44px: `padding: 0.7em 0`, 링크 사이 추가 간격 없음
- 호버 반전 면은 패널 폭 전체가 아니라 글자 폭 + 좌우 `0.35em`

**반응형**
- 메뉴 버튼과 서랍은 860px 미만에서만 허용한다. 실제로 접는 기준은 `menu` 문서(559px 이하에서 링크가 두 줄을 넘을 때). 860px 이상에서 열린 채 넓어지면 서랍을 닫고 머리 `menu`를 보인다
- 가로 모드 폰: 패널 안에서 세로 스크롤(`overflow-y: auto`), 가림막은 고정

## 상태
| 상태 | 표현 |
|---|---|
| 닫힘 | 패널·가림막 `hidden`, 메뉴 버튼 `aria-expanded="false"`, `[ 메뉴 ]` |
| 열림 | 패널 + 가림막, 메뉴 버튼 `aria-expanded="true"`, 뒤 스크롤 잠금 |
| 링크 기본 | `--mp-opacity-nav` |
| 링크 호버·포커스 | 배경 `--mp-ink`, 글자 `--mp-bg`, opacity 1 (`invert-hover`) |
| 현재 위치 | teal ■ + opacity 1 |
| `[ 닫기 ]` 호버 | 반전, opacity 1 |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |

## 동작
- 열기: 패널 `translateX(100%)` → `0`을 `--mp-duration-fill`(0.19s) `--mp-steps-fill`(4계단). 부드러운 미끄러짐 대신 터미널처럼 칸 단위로 들어온다
- 가림막은 움직임 없이 바로 나타난다
- 닫기: 움직임 없이 즉시 사라진다(나갈 때 기다리게 하지 않는다)
- 링크를 누르면 이동과 함께 닫는다
- 링크 반전은 `--mp-duration-hover` ease
- `reduced-motion`: 열기 계단 없이 바로 나타난다

**접근성**
- 메뉴 버튼: `<button aria-expanded="false" aria-controls="drawer-id">`. 막대형은 `aria-label="메뉴 열기"`
- 패널: `<dialog>`를 `showModal()`로 열면 포커스 가두기·`Esc`·뒤 비활성이 기본으로 된다. 직접 만들면 `role="dialog" aria-modal="true" aria-label="전체 메뉴"` + 뒤 콘텐츠 `inert`
- 안의 목록은 `<nav aria-label="전체 메뉴">`, 현재 링크 `aria-current="page"`
- 첫 포커스는 현재 링크(`aria-current`), 없으면 첫 링크. `[ 닫기 ]`에 두지 않는다
- `Tab`/`Shift+Tab`은 패널 안에서만 돈다(마지막 → 첫). 직접 만들면 `main`·`header`·`footer`에 `inert`
- 뒤 스크롤 잠금: 열 때 `document.documentElement.style.overflow = 'hidden'`, 닫을 때 원래 값으로. 스크롤 위치는 바뀌지 않게
- 닫기: `Esc`, `[ 닫기 ]`, 가림막 누름. 닫히면 포커스를 메뉴 버튼으로 돌려준다
- `[ 닫기 ]`의 스크린리더 이름은 `aria-label="메뉴 닫기"`

## 데모
```html demo
<div class="mp-drawer-stage">
  <div class="mp-drawer-scrim" aria-hidden="true"></div>
  <nav class="mp-drawer" aria-label="전체 메뉴">
    <button class="mp-drawer-close" type="button" aria-label="메뉴 닫기">[ 닫기 ]</button>
    <a href="#" aria-current="page">요소</a>
    <a href="#" class="is-hover">철학</a>
    <a href="#">토큰</a>
    <a href="#">서체</a>
  </nav>
</div>
```

## 코드
```css
.mp-drawer-stage { position: relative; height: 18rem; overflow: hidden; border: var(--mp-border) solid var(--mp-line); }
.mp-drawer-scrim { position: absolute; inset: 0; background: var(--mp-bg); opacity: var(--mp-opacity-body); }
.mp-drawer {
  position: absolute; top: 0; right: 0; bottom: 0; width: min(20rem, 85%); overflow-y: auto;
  display: flex; flex-direction: column; align-items: flex-start;
  padding: 1.2em var(--mp-gutter);
  background: var(--mp-bg); border-left: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  animation: mp-drawer-in var(--mp-duration-fill) var(--mp-steps-fill);
}
.mp-drawer a {
  margin-left: -0.35em; padding: 0.7em 0.35em;
  color: var(--mp-ink); text-decoration: none; opacity: var(--mp-opacity-nav);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, opacity var(--mp-duration-hover) ease;
}
.mp-drawer a[aria-current="page"] { opacity: 1; }
.mp-drawer a[aria-current="page"]::before {
  content: ""; display: inline-block; width: 0.5em; height: 0.5em;
  margin-right: 0.45em; vertical-align: 0.12em; background: var(--mp-secondary);
}
.mp-drawer a:hover, .mp-drawer a:focus-visible, .mp-drawer a.is-hover { background: var(--mp-ink); color: var(--mp-bg); opacity: 1; }
.mp-drawer-close {
  align-self: flex-end; margin-bottom: 1.6em; padding: 0.2em 0.35em; cursor: pointer;
  border: 0; border-radius: 0; background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-kicker) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  opacity: var(--mp-opacity-meta);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, opacity var(--mp-duration-hover) ease;
}
.mp-drawer-close:hover, .mp-drawer-close:focus-visible { opacity: 1; background: var(--mp-ink); color: var(--mp-bg); }
.mp-drawer a:focus-visible, .mp-drawer-close:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@keyframes mp-drawer-in { from { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) {
  .mp-drawer { animation: none; }
  .mp-drawer a, .mp-drawer-close { transition: none; }
}
/* 실제 화면: .mp-drawer-stage 대신 <dialog class="mp-drawer"> + position: fixed; inset: 0 0 0 auto; height: 100dvh
   dialog::backdrop { background: var(--mp-bg); opacity: var(--mp-opacity-body); } */
```

```js
// 메뉴 버튼 ↔ <dialog id="site-drawer" class="mp-drawer"> 서랍
(() => {
  const dlg = document.getElementById('site-drawer');
  const btn = document.querySelector('[aria-controls="site-drawer"]');
  if (!dlg || !btn || typeof dlg.showModal !== 'function') return;
  btn.addEventListener('click', () => {
    dlg.showModal();
    btn.setAttribute('aria-expanded', 'true');
    (dlg.querySelector('[aria-current="page"]') || dlg.querySelector('a'))?.focus();
  });
  dlg.addEventListener('close', () => { btn.setAttribute('aria-expanded', 'false'); btn.focus(); });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); }); // 가림막 누름
  dlg.querySelector('.mp-drawer-close')?.addEventListener('click', () => dlg.close());
  matchMedia('(min-width: 860px)').addEventListener('change', (m) => { if (m.matches && dlg.open) dlg.close(); });
})();
```

## 앱
- SwiftUI: 기본 서랍이 없다. 주 메뉴는 `tab-bar`를 우선하고, 꼭 필요하면 직접 그린다.
```swift
ZStack(alignment: .trailing) {
  Content().accessibilityHidden(isOpen)
  if isOpen {
    Rectangle().fill(Color.mpBg).opacity(0.85).ignoresSafeArea().onTapGesture { isOpen = false }
    VStack(alignment: .leading, spacing: 0) {
      Button("[ 닫기 ]") { isOpen = false }.buttonStyle(.plain).frame(maxWidth: .infinity, alignment: .trailing)
      ForEach(items) { MenuRow(title: $0.title, current: $0.id == currentID) }  // menu 문서의 teal ■ 행
    }
    .padding(20).frame(width: 300).frame(maxHeight: .infinity, alignment: .top)
    .background(Color.mpBg).overlay(alignment: .leading) { Rectangle().fill(Color.mpLineStrong).frame(width: 1) }
    .accessibilityAddTraits(.isModal)
  }
}
```
```kotlin
ModalNavigationDrawer(drawerState = state, scrimColor = MpBg.copy(alpha = 0.85f), drawerContent = {
  ModalDrawerSheet(drawerShape = RectangleShape, drawerContainerColor = MpBg, drawerTonalElevation = 0.dp) {
    items.forEach { item -> NavigationDrawerItem(
      label = { Text(item.title, fontFamily = Mulmaru, fontWeight = FontWeight.Normal) },
      icon = { Box(Modifier.size(8.dp).background(if (item.id == currentId) MpSecondary else Color.Transparent, RectangleShape)) },
      selected = item.id == currentId, onClick = { navigate(item); scope.launch { state.close() } },
      shape = RectangleShape, colors = NavigationDrawerItemDefaults.colors(selectedContainerColor = Color.Transparent)) }
  }
}) { Content() }
```
- 아이패드: `NavigationSplitView`의 시스템 사이드바를 쓰면 **OS 예외**(모양은 OS), 행 글꼴·현재 teal ■만 맞춘다.
- OS 예외: 아이패드 `NavigationSplitView` 사이드바와 그 토글 버튼, 안드로이드 predictive back 미리보기·가장자리 스와이프로 닫히는 동작은 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 1px `--mp-line-strong` 선 하나로 경계, 가림막은 `--mp-bg` 면.
- 해야 할 것: 현재 위치는 teal ■ + opacity 1, 링크 호버는 잉크/배경 반전.
- 해야 할 것: 메뉴 버튼과 같은 자리에 `[ 닫기 ]`, `Esc`·가림막으로도 닫기.
- 해야 할 것: 포커스 가두기, 닫으면 메뉴 버튼으로 포커스 돌려주기, `aria-expanded` 갱신.
- 해야 할 것: 열기는 4계단 0.19s, 닫기는 즉시.
- 하지 말 것: 그림자, 흐린 가림막, 검은 반투명 가림막.
- 하지 말 것: 둥근 안쪽 모서리, 부드럽고 긴 슬라이드, 튕기는 움직임.
- 하지 말 것: 현재 위치를 teal·orange 글자나 알약 배경으로.
- 하지 말 것: 넓은 화면에서 서랍으로 메뉴 숨기기, 둥근 선 햄버거 아이콘.

**자주 틀리는 것**
- 가림막을 `rgba(0,0,0,.5)`로 어둡게 → `--mp-bg` 면 + `--mp-opacity-body`
- 닫은 뒤 포커스가 `body`로 사라진다 → `close` 이벤트에서 메뉴 버튼으로 `focus()`
- 서랍이 열려도 뒤 페이지가 스크롤·탭된다 → `showModal()` 또는 `inert` + 스크롤 잠금
- `aria-expanded`를 열 때만 바꾼다 → `Esc`·가림막으로 닫혀도 `false`로 되돌린다
- 열기·닫기 모두 0.4s 슬라이드 → 열기 4계단 0.19s, 닫기 즉시
