---
id: context-menu
name: 맥락 메뉴
nameEn: Context Menu
category: navigation
summary: 오른쪽 클릭·길게 누르기로 여는 항목별 행동 상자. 드롭다운과 같은 1px 진한 선 상자, 호버는 반전, 오른쪽에 옅은 단축키.
aliases: [컨텍스트 메뉴, 맥락 메뉴, 우클릭 메뉴, 오른쪽 클릭 메뉴, 길게 누르기 메뉴, 롱프레스 메뉴, context menu, right click menu, long press menu, 항목 메뉴]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism]
tokens: [--mp-bg, --mp-line-strong, --mp-size-small, --mp-tracking-small, --mp-opacity-meta, --mp-line, --mp-ink, --mp-opacity-muted, --mp-duration-hover, --mp-border, --mp-font]
effects: [invert-hover, reduced-motion]
related: [dropdown-menu, action-sheet, confirm-step, popover, list]
---

## 용도
목록·카드 항목에 딸린 보조 행동(이름 바꾸기, 복제, 옮기기, 삭제)을 빠르게 부를 때 쓴다.
같은 행동은 반드시 **눈에 보이는 다른 길**(항목의 `...` 버튼 → `dropdown-menu`, 상세 화면 버튼)에도 둔다. 맥락 메뉴만으로 기능을 숨기지 않는다.
브라우저 기본 메뉴(링크 복사·검사 등)가 더 쓸모 있는 곳(본문 글자, 링크, 이미지)에서는 가로채지 않는다.

**함께 쓰는 요소**
- 보이는 길: 항목 오른쪽 `icon-button`(`...`) → 같은 항목의 `dropdown-menu`. 두 메뉴의 항목·순서를 똑같이 둔다
- 삭제 등 되돌릴 수 없는 항목 → `confirm-step`(웹은 `modal`, 앱은 확인 시트). 맥락 메뉴 안에서 확인까지 끝내지 않는다
- 터치 길게 누르기 → `action-sheet`/`bottom-sheet` 목록
- `list`·`card` 항목에 붙인다. `menu`·`tabs` 같은 내비게이션 링크에는 붙이지 않는다
- 상자 안에 teal ■·orange를 쓰지 않는다 — 행동 목록이라 선택 상태가 없다

## 생김새
- 상자는 `dropdown-menu`와 같다: 배경 `--mp-bg`, 1px `--mp-line-strong`, radius 0, 그림자 없음
- 위치: 포인터 위치의 오른쪽 아래. 화면 끝에 닿으면 왼쪽·위로 뒤집는다. 길게 누르기는 누른 항목 바로 아래
- 최소 폭 `14rem`, 최대 폭 `20rem`, 위아래 안쪽 여백 `0.3em`
- 항목: `padding: 0.6em 1em`, `--mp-size-small`, 자간 `--mp-tracking-small`, 이름 왼쪽·단축키 오른쪽(`justify-content: space-between`, 사이 최소 `2em`)
- 단축키: `<kbd>`, 같은 서체, `--mp-opacity-meta`. 기호는 글자로 `Ctrl D`, macOS면 `⌘ D`
- 무리 사이 1px `--mp-line` 가로선, 위아래 `0.3em`
- 되돌릴 수 없는 항목(삭제)은 맨 아래 무리, 이름 뒤 `…`. 누르면 바로 실행하지 않고 `confirm-step`
- 아이콘은 쓰지 않는다. 꼭 필요하면 `pixel-icon` 1비트, 모든 항목에 같은 폭 자리

**크기·간격**
- 항목 5–8개. 넘으면 자주 쓰는 것만 남긴다
- 터치로 연 경우 항목 높이 최소 48px: `padding: 0.9em 1em`

**반응형**
- 터치 기기(길게 누르기)에서는 상자 대신 `action-sheet`/`bottom-sheet` 목록으로 연다
- 좁은 화면에서 상자가 화면 폭의 90%를 넘으면 시트로 바꾼다

## 상태
| 상태 | 표현 |
|---|---|
| 닫힘 | 없음 |
| 열림 | 상자, 대상 항목은 1px `--mp-line-strong` 테두리로 "어느 항목의 메뉴인지" 표시 |
| 항목 기본 | opacity 1 |
| 항목 호버·키보드 포커스 | 배경 `--mp-ink`, 글자·단축키 `--mp-bg` |
| 비활성 | `--mp-opacity-muted`, `aria-disabled="true"`, 반전 없음 |
| 포커스 링 | 항목은 반전이 포커스 표시, 상자 밖 포커스는 `outline: 1px solid var(--mp-ink)` |

## 동작
- 즉시 나타나고 즉시 사라진다. 펼침·페이드 없음
- 반전은 `invert-hover`, `--mp-duration-hover` ease
- 항목 실행 후 닫는다. 바깥 누름·`Esc`·스크롤·창 크기 변경으로 닫는다
- 같은 자리에서 다시 오른쪽 클릭하면 새 위치로 다시 연다
- `reduced-motion`: transition 없음

**접근성**
- 여는 방법을 셋 다 지원: 오른쪽 클릭(`contextmenu` 이벤트), `Shift+F10`, `ContextMenu` 키. 키보드로 열면 포커스된 항목 아래에 연다
- 상자 `role="menu" aria-label="<항목 이름> 행동"`, 항목 `role="menuitem"`, 구분선 `role="separator"`
- 열리면 첫 항목에 포커스(로빙 탭인덱스: 포커스 항목만 `tabindex="0"`). `↓` `↑` 이동(순환, 비활성 건너뜀), `Home` `End`, 글자 입력 시 그 글자로 시작하는 항목으로, `Enter`/`Space` 실행, `Esc` 닫고 원래 항목으로 포커스 돌려주기
- `Tab`/`Shift+Tab`은 메뉴를 닫고 원래 항목 기준 다음 요소로 간다(메뉴 안에 가두지 않는다)
- 단축키는 `aria-keyshortcuts="Control+D"`로도 알린다(`<kbd>` 글자는 이름에 섞여 읽히지 않게 `aria-hidden="true"`)
- 눈에 보이는 다른 길(`...` 버튼)이 있어야 스크린리더·터치 사용자도 같은 행동에 닿는다

## 데모
```html demo
<ul class="mp-context-menu" role="menu" aria-label="행동">
  <li role="menuitem" tabindex="0">이름 <kbd aria-hidden="true">F2</kbd></li>
  <li role="menuitem" tabindex="-1" class="is-hover">복제 <kbd aria-hidden="true">Ctrl D</kbd></li>
  <li role="menuitem" tabindex="-1" aria-disabled="true">옮기기</li>
  <li role="separator"></li>
  <li role="menuitem" tabindex="-1">삭제…</li>
</ul>
```

## 코드
```css
.mp-context-menu {
  display: inline-block; min-width: 14rem; max-width: 20rem; margin: 0; padding: 0.3em 0; list-style: none;
  background: var(--mp-bg); border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
}
.mp-context-menu [role="menuitem"] {
  display: flex; justify-content: space-between; gap: 2em; padding: 0.6em 1em; cursor: pointer;
  color: var(--mp-ink); white-space: nowrap;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-context-menu kbd { font: inherit; opacity: var(--mp-opacity-meta); }
.mp-context-menu [role="menuitem"]:hover, .mp-context-menu [role="menuitem"]:focus-visible, .mp-context-menu [role="menuitem"].is-hover { background: var(--mp-ink); color: var(--mp-bg); outline: 0; }
.mp-context-menu [aria-disabled="true"] { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-context-menu [aria-disabled="true"]:hover { background: transparent; color: var(--mp-ink); }
.mp-context-menu [role="separator"] { margin: 0.3em 0; border-top: var(--mp-border) solid var(--mp-line); }
.mp-context-menu-target { outline: 1px solid var(--mp-line-strong); } /* 열린 메뉴의 대상 항목 */
@media (pointer: coarse) { .mp-context-menu [role="menuitem"] { padding: 0.9em 1em; } }
@media (prefers-reduced-motion: reduce) { .mp-context-menu [role="menuitem"] { transition: none; } }
```

```js
// 오른쪽 클릭 · Shift+F10 · ContextMenu 키로 열고, 화면 끝에서 뒤집는다
// 마크업: 목록 <ul data-context-list> 안의 항목 [data-item tabindex="0"], 메뉴 <ul class="mp-context-menu" role="menu" hidden>
(() => {
  const list = document.querySelector('[data-context-list]');
  const menu = document.querySelector('.mp-context-menu[role="menu"]');
  if (!list || !menu) return;
  let opener = null;
  const enabled = () => [...menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')];
  function openAt(x, y, target) {
    menu.hidden = false;
    menu.style.position = 'fixed';
    const r = menu.getBoundingClientRect();
    menu.style.left = Math.max(8, Math.min(x, innerWidth - r.width - 8)) + 'px';
    menu.style.top = Math.max(8, y + r.height > innerHeight ? y - r.height : y) + 'px';
    opener = target;
    target.classList.add('mp-context-menu-target');
    enabled()[0]?.focus();
  }
  function close(back = true) {
    menu.hidden = true;
    if (!opener) return;
    opener.classList.remove('mp-context-menu-target');
    if (back) opener.focus();
    opener = null;
  }
  list.addEventListener('contextmenu', (e) => {
    const t = e.target.closest('[data-item]');
    if (!t) return;
    e.preventDefault();
    openAt(e.clientX, e.clientY, t);
  });
  list.addEventListener('keydown', (e) => {
    const t = e.target.closest('[data-item]');
    if (!t || !(e.key === 'ContextMenu' || (e.shiftKey && e.key === 'F10'))) return;
    e.preventDefault();
    const r = t.getBoundingClientRect();
    openAt(r.left, r.bottom, t);
  });
  menu.addEventListener('keydown', (e) => {
    const items = enabled();
    const i = items.indexOf(document.activeElement);
    const n = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 }[e.key];
    if (n !== undefined) { e.preventDefault(); items[(n + items.length) % items.length]?.focus(); }
    else if (e.key === 'Escape') close();
    else if (e.key === 'Tab') close(false);
    else if (e.key.length === 1) items.find((x) => x.textContent.trim().startsWith(e.key))?.focus();
  });
  document.addEventListener('pointerdown', (e) => { if (!menu.hidden && !menu.contains(e.target)) close(false); });
})();
```

## 앱
- SwiftUI: `.contextMenu`는 시스템 미리보기 확대·배경 흐림을 쓰는 **OS 예외**다. 모양은 두고 항목 글자·순서·`Divider` 무리만 맞춘다. 같은 행동을 보이는 `...` 버튼에도 둔다.
```swift
Row(item)
  .contextMenu {
    Button("이름 바꾸기") { rename(item) }
    Button("복제") { duplicate(item) }
    Divider()
    Button("삭제…") { pendingDelete = item }   // 바로 지우지 않는다
  }
  .confirmationDialog("삭제할까요?", isPresented: .constant(pendingDelete != nil)) {
    Button("삭제", role: .destructive) { delete(pendingDelete!) }   // 시스템 빨강은 OS 예외로 허용
  }
```
```kotlin
Box(Modifier.combinedClickable(onClick = { open(item) }, onLongClick = { expanded = true })) {
  RowContent(item)
  DropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }, shape = RectangleShape,
    containerColor = MpBg, tonalElevation = 0.dp, shadowElevation = 0.dp, border = BorderStroke(1.dp, MpLineStrong)) {
    DropdownMenuItem(text = { Text("이름 바꾸기", fontFamily = Mulmaru, fontWeight = FontWeight.Normal) }, onClick = { rename(item); expanded = false })
    HorizontalDivider(thickness = 1.dp, color = MpLine)
    DropdownMenuItem(text = { Text("삭제…", fontFamily = Mulmaru) }, onClick = { expanded = false; askDelete(item) })
  }
}
```
- 항목이 5개를 넘거나 설명이 필요하면 `ModalBottomSheet`(`action-sheet`)로 연다.
- OS 예외(모양을 바꾸지 않는다): iOS `.contextMenu` 미리보기·흐림, 시스템 `Menu`, 텍스트 선택 편집 메뉴, 링크·이미지 길게 누르기 미리보기, 안드로이드 predictive back으로 닫히는 동작.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 같은 행동을 보이는 버튼에도 두기.
- 해야 할 것: `dropdown-menu`와 같은 1px 진한 선 상자, 호버·포커스는 반전.
- 해야 할 것: 오른쪽 클릭·`Shift+F10`·`ContextMenu` 키 모두 지원, `Esc`로 닫고 포커스 돌려주기.
- 해야 할 것: 단축키는 옅게 오른쪽, 삭제는 맨 아래 + 확인.
- 하지 말 것: 맥락 메뉴에만 있는 기능.
- 하지 말 것: 본문 글자·링크에서 브라우저 기본 메뉴 가로채기.
- 하지 말 것: 삭제를 빨강·orange 글자로, 항목마다 색 아이콘.
- 하지 말 것: 그림자 상자, 펼쳐지는 애니메이션, 하위 메뉴 중첩.

**자주 틀리는 것**
- 페이지 전체에서 `contextmenu`를 `preventDefault()` → 목록 항목(`[data-item]`)에서만 가로챈다
- 키보드로 열 방법이 없다 → `Shift+F10`·`ContextMenu` 키, 보이는 `...` 버튼
- 삭제를 누르면 바로 지운다 → `confirm-step`으로 한 번 더
- 상자를 포인터 위치에 그대로 두어 화면 밖으로 잘린다 → 오른쪽·아래 끝에서 뒤집기
- 닫은 뒤 포커스가 `body`로 간다 → 원래 항목(`opener`)으로 돌려준다
