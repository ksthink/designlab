---
id: action-sheet
name: 액션 시트
nameEn: Action Sheet
category: overlays
summary: 앱에서 행동 몇 개를 아래에서 고르게 하는 목록. iOS 시스템 시트는 OS 모양 그대로, 직접 그리면 직각 바텀 시트 안의 글자 목록.
aliases: [액션 시트, action sheet, 선택 시트, 행동 선택, 공유 메뉴, 하단 선택 메뉴, confirmationDialog, 옵션 시트]
platforms: [ios, android]
status: proposed
pillars: [minimalism]
tokens: [--mp-bg, --mp-line-strong, --mp-size-kicker, --mp-opacity-kicker, --mp-size-body, --mp-tracking-body, --mp-line, --mp-opacity-meta, --mp-gutter, --mp-width-read, --mp-opacity-body, --mp-ink, --mp-opacity-muted, --mp-duration-fill, --mp-steps-fill, --mp-border, --mp-font]
effects: []
related: [bottom-sheet, context-menu, confirm-step, modal, microcopy]
---

## 용도
누른 대상에 대해 행동 2–5개 중 하나를 고를 때 쓴다(사진: 찍기 / 고르기 / 지우기).
되돌릴 수 없는 행동은 액션 시트에서 바로 실행하지 않고 다음 `confirm-step`(또는 `modal`)으로 한 번 더 묻는다.
행동이 6개를 넘거나 설명이 필요하면 별도 화면·`bottom-sheet`로 옮긴다. 넓은 웹 화면에서는 `dropdown-menu`·`context-menu`를 쓴다.

**함께 쓰는 요소**
- `action-sheet` → `confirm-step`·`modal`: "지우기…"를 누르면 시트를 닫고 확인창을 연다
- 결과 알림은 시트가 닫힌 뒤 `toast`
- 같은 행동의 웹 넓은 화면 버전은 `dropdown-menu`(버튼) 또는 `context-menu`(오른쪽 클릭)
- 설명·입력이 필요하면 `bottom-sheet`로 옮긴다
- 시트 안에 orange·teal을 두지 않는다. 행동은 모두 잉크 글자

## 생김새
**OS 시트(기본, iOS)**
- `confirmationDialog`는 시스템이 그리는 **OS 예외**다. 모양을 바꾸거나 흉내 내지 않는다
- 맞추는 것은 문구·순서뿐: 제목 한 줄(선택), 행동은 동사, 취소는 시스템 자리

**직접 그릴 때(Android·웹·모양을 맞춰야 할 때)**
- `bottom-sheet` 틀: 배경 `--mp-bg`, 위 1px `--mp-line-strong`, 직각, 그림자 없음
- 제목(선택): `--mp-size-kicker`, `--mp-opacity-kicker`, 가운데 아닌 왼쪽 정렬
- 행동 목록: 글자만, 왼쪽 정렬, `--mp-size-body`, 자간 `--mp-tracking-body`, 항목 사이 1px `--mp-line`
- 맨 아래 `[ 취소 ]`: 위에 1px `--mp-line-strong`로 떼고, `--mp-opacity-meta`
- 되돌릴 수 없는 행동(삭제)은 목록 맨 아래(취소 바로 위), 색으로 구분하지 않고 말줄임 `…`을 붙여 다음 단계가 있음을 알린다: "지우기…"
- 아이콘은 넣지 않는다. 꼭 필요하면 `pixel-icon` 정수 배율, 잉크 한 색

**크기·간격**
- 항목 높이 최소 `3rem`(48dp/44pt 이상), 좌우 여백 `--mp-gutter`
- 제목 위아래 `0.9em`, 취소 아래에 안전 영역 여백
- 높이는 항목 수만큼(내용 높이), 스크롤이 생기면 항목이 너무 많은 것이다

**반응형**
- 폭 600px 이상: `bottom-sheet`처럼 가운데 `min(var(--mp-width-read), 100%)`
- 마우스가 있는 넓은 웹 화면: 액션 시트 대신 누른 곳 옆 `dropdown-menu`

## 상태
| 상태 | 표현 |
|---|---|
| 닫힘 | 없음 |
| 열림 | 목록 + 가림막(`--mp-bg` `--mp-opacity-body`) |
| 항목 누름·포커스 | 배경 `--mp-ink`, 글자 `--mp-bg` |
| 비활성 항목 | 빼는 것을 우선. 남기면 `--mp-opacity-muted`, `aria-disabled="true"` |
| 취소 누름 | opacity 1 + 반전 |
| 선택 후 | 시트를 닫고 행동 실행(되돌릴 수 없으면 확인 단계로) |

## 동작
**시간**
- 올라오기·내려가기는 `bottom-sheet`와 같다: `--mp-duration-fill` `--mp-steps-fill` 4계단
- 항목 반전은 누르는 즉시(터치에는 transition 없음)

**접근성**
- 직접 그릴 때: 틀은 `role="dialog"` `aria-modal="true"` `aria-labelledby`(제목) 또는 `aria-label`
- 목록은 `role="menu"`, 항목은 `role="menuitem"` 버튼. 위아래 화살표로 이동, Enter·Space 실행
- 열면 첫 항목에 포커스, Tab은 시트 안에서 순환, 뒤 화면 `inert`
- `Esc`·가림막 누름·`[ 취소 ]`로 닫고 포커스는 연 요소로
- 스크린리더가 괄호를 읽지 않게 취소 버튼에 `aria-label="취소"`
- 첫 항목 포커스 예외: 되돌릴 수 없는 항목이 맨 위라면(두지 않는 것이 원칙) 포커스는 첫 안전한 항목으로
- `Home`·`End`로 첫·마지막 항목, 글자 입력으로 해당 글자로 시작하는 항목으로 이동(`menu` 패턴)

**reduced-motion**
- 계단 이동 없이 바로 나타나고 사라진다

## 데모
```html demo
<div class="mp-action-sheet-stage">
  <div class="mp-action-sheet-scrim" aria-hidden="true"></div>
  <div class="mp-action-sheet" role="dialog" aria-modal="true" aria-label="사진">
    <div role="menu">
      <button role="menuitem" type="button">찍기</button>
      <button role="menuitem" type="button" class="is-active">고르기</button>
      <button role="menuitem" type="button">지우기…</button>
    </div>
    <button class="mp-action-sheet-cancel" type="button" aria-label="취소">[ 취소 ]</button>
  </div>
</div>
```

## 코드
```css
.mp-action-sheet-stage { position: relative; display: flex; align-items: flex-end; height: 16rem; overflow: hidden; border: var(--mp-border) solid var(--mp-line); }
.mp-action-sheet-scrim { position: absolute; inset: 0; background: var(--mp-bg); opacity: var(--mp-opacity-body); }
.mp-action-sheet {
  position: relative; width: 100%;
  background: var(--mp-bg); border-top: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  animation: mp-action-sheet-in var(--mp-duration-fill) var(--mp-steps-fill);
}
.mp-action-sheet button {
  display: block; width: 100%; min-height: 3rem; padding: 0 var(--mp-gutter); text-align: left; cursor: pointer;
  border: 0; border-bottom: var(--mp-border) solid var(--mp-line); border-radius: 0;
  background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-body) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-body);
}
.mp-action-sheet button:active, .mp-action-sheet button:focus-visible, .mp-action-sheet button.is-active { background: var(--mp-ink); color: var(--mp-bg); outline: 0; }
.mp-action-sheet button[aria-disabled="true"] { opacity: var(--mp-opacity-muted); background: transparent; color: var(--mp-ink); }
.mp-action-sheet .mp-action-sheet-cancel { border-top: var(--mp-border) solid var(--mp-line-strong); border-bottom: 0; opacity: var(--mp-opacity-meta); }
.mp-action-sheet .mp-action-sheet-cancel:active, .mp-action-sheet .mp-action-sheet-cancel:focus-visible { opacity: 1; }
@keyframes mp-action-sheet-in { from { transform: translateY(100%); } }
@media (min-width: 600px) { .mp-action-sheet-stage { justify-content: center; } .mp-action-sheet { width: min(var(--mp-width-read), 100%); } }
@media (prefers-reduced-motion: reduce) { .mp-action-sheet { animation: none; } }
```

```js
// 위아래 화살표·Home·End로 항목 이동, Esc·취소로 닫기
// 마크업: <dialog class="mp-action-sheet"> 안에 <div role="menu"> 항목들 + .mp-action-sheet-cancel
(() => {
  const sheet = document.querySelector('dialog.mp-action-sheet');
  if (!sheet) return;
  const close = () => sheet.close(); // dialog가 연 요소로 포커스를 돌려준다
  sheet.querySelector('.mp-action-sheet-cancel')?.addEventListener('click', close);
  sheet.addEventListener('keydown', (e) => {
    const items = [...sheet.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')];
    if (!items.length) return;
    const i = items.indexOf(document.activeElement);
    const n = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: items.length - 1 }[e.key];
    if (n !== undefined) { e.preventDefault(); items[(n + items.length) % items.length].focus(); }
    else if (e.key === 'Escape') { e.preventDefault(); close(); }
  });
})();
```

## 앱
- SwiftUI: `.confirmationDialog("사진", isPresented: $show, titleVisibility: .visible) { Button("찍기") {}; Button("고르기") {} }` — **OS 예외**, 모양은 시스템(아이패드에서는 팝오버로 뜨는 것도 OS 동작).
- SwiftUI 삭제: `role: .destructive`의 시스템 빨강을 피할 수 없으면 허용하되, 누른 뒤 `confirm-step`으로 한 번 더 묻는다.
- SwiftUI 모양을 맞춰야 할 때: `.sheet` + `bottom-sheet` 문서 설정 안에 `VStack(spacing: 0)` 행동 버튼, 행 사이 `Divider().overlay(line)`.
- Compose: 기본 액션 시트가 없다. `ModalBottomSheet(shape = RectangleShape, tonalElevation = 0.dp, containerColor = bg, dragHandle = null)` 안에 `ListItem` 목록, `ListItemDefaults.colors(containerColor = bg)`.
- OS 예외: 안드로이드 공유(`Intent.createChooser`), iOS `ShareLink`·`UIActivityViewController`, 사진 선택기는 OS 시트 그대로.

```swift
.confirmationDialog("사진", isPresented: $show, titleVisibility: .visible) {
  Button("찍기", action: camera)
  Button("고르기", action: library)
  Button("지우기…") { confirmDelete = true }   // 바로 지우지 않는다
  Button("취소", role: .cancel) { }
}
// OS 예외: 모양·글꼴은 시스템. 문구와 순서만 맞춘다
```

```kotlin
ModalBottomSheet(onDismissRequest = close, shape = RectangleShape, containerColor = MP.bg,
  tonalElevation = 0.dp, scrimColor = MP.bg.copy(alpha = 0.85f), dragHandle = null) {
  listOf("찍기" to camera, "고르기" to library, "지우기…" to askDelete).forEach { (label, act) ->
    Text(label, fontFamily = Mulmaru, color = MP.ink, modifier = Modifier.fillMaxWidth().heightIn(min = 48.dp)
      .clickable(onClick = act).padding(horizontal = 20.dp, vertical = 14.dp).semantics { role = Role.Button })
    HorizontalDivider(color = MP.line, thickness = 1.dp)
  }
  Text("[ 취소 ]", fontFamily = Mulmaru, modifier = Modifier.alpha(0.7f).clickable(onClick = close).padding(20.dp))
}
```
- OS 예외 목록: iOS `confirmationDialog`·`UIAlertController(.actionSheet)`, 아이패드에서 팝오버로 뜨는 시트, 공유 시트, 사진 선택기

## 해야 할 것 / 하지 말 것
- 해야 할 것: 행동 2–5개, 동사 하나로 짧게("찍기", "고르기").
- 해야 할 것: 취소는 맨 아래 따로, 되돌릴 수 없는 행동은 취소 바로 위 + `…` + 확인 단계.
- 해야 할 것: OS 시트는 문구·순서만 다듬고 모양은 둔다.
- 해야 할 것: 직접 그릴 때 첫 항목 포커스, 화살표 이동, `Esc` 닫기.
- 하지 말 것: 시스템 시트 모양 흉내(둥근 덩어리 두 개, 가운데 정렬 파란 글자).
- 하지 말 것: 행동마다 아이콘·색, 삭제를 orange·빨강 글자로 칠하기(직접 그릴 때).
- 하지 말 것: 6개 넘는 목록, 설명 문장이 붙은 항목(→ 화면으로).
- 하지 말 것: 액션 시트에서 되돌릴 수 없는 행동을 바로 실행.

**자주 틀리는 것**
- iOS 시스템 시트를 흉내 낸 둥근 덩어리 두 개 → 시스템을 쓰거나 직각 시트
- "지우기"를 누르자마자 삭제 → `confirm-step`
- 삭제 항목을 orange·빨강 글자로(직접 그릴 때) → 잉크 + `…`
- Compose 시트 기본 `dragHandle` 알약 남김 → `null` 또는 사각 손잡이
- 취소를 목록 중간에 → 맨 아래, 1px 진한 선으로 분리
