---
id: modal
name: 모달
nameEn: Modal
category: overlays
summary: 화면 가운데 뜨는 1px 진한 선의 사각 대화 상자. 뒤는 배경색 가림막으로 옅게, 그림자·흐림 없음.
aliases: [모달, 모달 창, 대화 상자, 다이얼로그, dialog, modal, 팝업, 팝업 창, 확인 창, 알림 창, 라이트박스]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-bg, --mp-border, --mp-line-strong, --mp-opacity-body, --mp-size-subheading, --mp-tracking-subheading, --mp-size-body, --mp-leading-body, --mp-width-para, --mp-gutter, --mp-size-small, --mp-ink, --mp-duration-hover, --mp-line, --mp-font, --mp-tracking-small, --mp-opacity-meta, --mp-line-button]
effects: [reduced-motion]
related: [confirm-step, bottom-sheet, popover, button, text-action]
---

## 용도
흐름을 멈추고 답을 받아야 할 때만 쓴다: 되돌릴 수 없는 행동 확인(지우기, 초기화), 두세 칸짜리 짧은 입력(이름 바꾸기).
알리기만 하면 `toast`·`banner`, 딸린 정보를 보여 주기만 하면 `bottom-sheet`·`popover`, 긴 내용·여러 단계 입력은 별도 페이지로.
확인 문구·행동 순서는 `confirm-step`을 따른다. 한 번에 모달 하나 — 모달 위에 모달을 띄우지 않는다.

**함께 쓰는 요소**
- `modal` + `confirm-step` + `button`: 되돌릴 수 없는 행동 앞 확인창. 제목은 질문, 주 행동 이름은 결과(`지우기`)
- `modal` + `text-field`·`form-validation`: 이름 바꾸기 같은 한 칸 입력, 오류는 칸 아래 글자로(모달을 흔들지 않는다)
- 행동 뒤 결과 알림은 모달을 닫은 다음 `toast`로
- 모달 안의 강조: 주 행동 `button`이 화면 강조를 쓴다면 뒤 화면의 orange는 가림막에 옅어지므로 허용. 모달 안에는 orange 하나까지
- 앱의 선택지 목록은 모달 대신 `action-sheet`, 딸린 정보는 `bottom-sheet`

## 생김새
**구조**
- 웹은 `<dialog>` 요소 하나. 안은 위에서 아래로 제목 → 설명(선택) → 입력(선택) → 행동 줄
- 틀: 배경 `--mp-bg`, 테두리 `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`, **그림자 없음**
- 가림막(`::backdrop`): `--mp-bg` 면을 `opacity: var(--mp-opacity-body)`(0.85). 검은 반투명·흐림(blur) 없음 — 뒤 화면은 옅어질 뿐 어두워지지 않는다
- 제목 `--mp-size-subheading`, 자간 `--mp-tracking-subheading`, 400
- 설명 `--mp-size-body`, 행간 `--mp-leading-body`, `--mp-opacity-body`
- 행동 줄: 오른쪽 정렬, 주 행동(`button` 모양)이 오른쪽 끝, 취소는 그 왼쪽 `text-action` `[ 취소 ]` 모양
- 닫기용 모서리 `x` 버튼은 두지 않는다. 닫는 길은 취소와 `Esc`

**크기·간격**
- 폭 `min(var(--mp-width-para), 100% - 2 * var(--mp-gutter))` — 문단 폭(30em)을 넘지 않는다
- 안쪽 여백 `1.6em`, 제목 아래 `0.6em`, 행동 줄 위 `1.6em`, 행동 사이 `1.2em`
- 최대 높이 `calc(100dvh - 2 * var(--mp-gutter))`, 넘치면 설명 영역만 스크롤
- 주 행동 버튼 `padding: 0.75em 1.5em`(button 원값), 글자 `--mp-size-small`

**반응형**
- 480px 미만: 폭 `100% - 2 * var(--mp-gutter)`, 행동 줄은 그대로 한 줄(글자가 짧으므로). 두 줄이 되면 주 행동을 위, 취소를 아래로 세로 쌓고 폭 100%
- 터치 기기: 행동 높이 최소 44px(여백으로 확보)
- 앱의 아래쪽 선택지는 모달 대신 `action-sheet`·`bottom-sheet`를 우선한다

## 상태
| 상태 | 표현 |
|---|---|
| 닫힘 | DOM에 있어도 `open` 없음, 보이지 않음 |
| 열림 | `showModal()`, 가림막 + 틀, 뒤 화면 `inert`·스크롤 잠금 |
| 행동 호버·포커스 | 주 행동은 배경 `--mp-ink`·글자 `--mp-bg` 반전, 취소는 opacity 1 + 반전 |
| 처리 중 | 주 행동 글자 `...`, `aria-busy="true"`, 두 번 누르지 못하게 `disabled` |
| 입력 오류 | 입력 아래 한 줄 문구(`form-validation`), 모달은 닫지 않는다 |
| 닫힘(취소) | `Esc`·`[ 취소 ]` → 포커스는 연 버튼으로 |
| 닫힘(확정) | 주 행동 완료 후 닫고 결과는 `toast`로 |

되돌릴 수 없는 확인창은 가림막을 눌러도 닫히지 않는다. 정보성 모달만 가림막 누름으로 닫는다.

## 동작
**시간**
- 나타날 때 opacity 0→1만 `--mp-duration-hover`(0.25s) ease. 커지기·튕기기·미끄러지기 없음
- 사라질 때는 즉시(움직임 없음)
- 행동 반전은 `invert-hover`와 같은 `--mp-duration-hover` ease

**접근성**
- 웹: `<dialog aria-labelledby="제목 id" aria-describedby="설명 id">` + `showModal()`. `<dialog>`를 못 쓰면 `role="dialog"`(확인창은 `role="alertdialog"`) + `aria-modal="true"`
- 포커스 가두기: `showModal()`이 해 준다. 직접 만들 때는 Tab/Shift+Tab을 틀 안에서 순환
- 처음 포커스: 되돌릴 수 없는 확인창은 **취소**에, 입력 모달은 첫 입력 칸에
- `Esc`로 닫기(`cancel` 이벤트), 닫힌 뒤 포커스는 모달을 연 요소로 돌려준다
- 뒤 화면: `inert`, `body { overflow: hidden }`로 스크롤 잠금
- 행동 이름은 결과를 말한다("지우기"). "확인"만으로 두지 않는다
- 확인창 전용: `role="alertdialog"`면 설명을 `aria-describedby`로 반드시 연결한다
- `<dialog>`의 `cancel` 이벤트에서 되돌릴 수 없는 작업 진행 중이면 `preventDefault()`로 닫기를 막고 `[ 취소 ]`만 남긴다

**reduced-motion**
- `prefers-reduced-motion: reduce`이면 페이드 없이 바로 나타난다

## 데모
```html demo
<div class="mp-modal-stage">
  <div class="mp-modal-scrim" aria-hidden="true"></div>
  <div class="mp-modal" role="alertdialog" aria-modal="true" aria-labelledby="mp-modal-t">
    <h2 id="mp-modal-t">삭제?</h2>
    <div class="mp-modal-actions">
      <button class="mp-modal-quiet" type="button">[ 취소 ]</button>
      <button class="mp-modal-main is-hover" type="button">삭제</button>
    </div>
  </div>
</div>
```

## 코드
```css
.mp-modal-stage { position: relative; display: grid; place-items: center; min-height: 14rem; padding: 1rem; overflow: hidden; border: var(--mp-border) solid var(--mp-line); }
.mp-modal-scrim { position: absolute; inset: 0; background: var(--mp-bg); opacity: var(--mp-opacity-body); }
.mp-modal {
  position: relative; width: min(var(--mp-width-para), 100%); padding: 1.6em; margin: 0;
  background: var(--mp-bg); color: var(--mp-ink);
  border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
}
.mp-modal h2 { margin: 0 0 0.6em; font-size: var(--mp-size-subheading); letter-spacing: var(--mp-tracking-subheading); font-weight: 400; }
.mp-modal p { margin: 0; font-size: var(--mp-size-body); line-height: var(--mp-leading-body); opacity: var(--mp-opacity-body); }
.mp-modal-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 1.2em; margin-top: 1.6em; }
.mp-modal-quiet, .mp-modal-main {
  border-radius: 0; color: var(--mp-ink); background: transparent; cursor: pointer;
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, opacity var(--mp-duration-hover) ease;
}
.mp-modal-quiet { padding: 0.2em 0.35em; border: 0; opacity: var(--mp-opacity-meta); }
.mp-modal-main { padding: 0.75em 1.5em; border: var(--mp-border) solid var(--mp-line-button); }
.mp-modal-quiet:hover, .mp-modal-quiet:focus-visible { opacity: 1; background: var(--mp-ink); color: var(--mp-bg); }
.mp-modal-main:hover, .mp-modal-main:focus-visible, .mp-modal-main.is-hover { background: var(--mp-ink); color: var(--mp-bg); }
.mp-modal button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }

/* 실제 화면 — <dialog class="mp-modal"> */
dialog.mp-modal { position: fixed; max-height: calc(100dvh - 2 * var(--mp-gutter)); width: min(var(--mp-width-para), 100% - 2 * var(--mp-gutter)); overflow: auto; }
dialog.mp-modal::backdrop { background: var(--mp-bg); opacity: var(--mp-opacity-body); }
dialog.mp-modal[open] { animation: mp-modal-in var(--mp-duration-hover) ease; }
@keyframes mp-modal-in { from { opacity: 0; } }
@media (max-width: 480px) { .mp-modal-actions { flex-direction: column-reverse; align-items: stretch; } }
@media (prefers-reduced-motion: reduce) { .mp-modal button, dialog.mp-modal[open] { transition: none; animation: none; } }
```

```js
// 마크업: <button data-modal-open="confirm-delete">, <dialog id="confirm-delete" class="mp-modal"> 안에 [data-safe] 취소 버튼
(() => {
  document.querySelectorAll('[data-modal-open]').forEach((opener) => {
    const dialog = document.getElementById(opener.dataset.modalOpen);
    if (!dialog || typeof dialog.showModal !== 'function') return;
    opener.addEventListener('click', () => {
      dialog.showModal(); // 모달 dialog는 뒤를 inert로 만들고 Esc로 닫힌다
      document.body.style.overflow = 'hidden';
      (dialog.querySelector('[data-safe]') || dialog.querySelector('button'))?.focus(); // 확인창은 취소에 첫 포커스
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = '';
      opener.focus(); // 연 요소로 포커스 돌려주기
    });
    dialog.querySelectorAll('[data-safe]').forEach((b) => b.addEventListener('click', () => dialog.close()));
    // 되돌릴 수 없는 확인창은 가림막 누름으로 닫지 않는다 — data-light 정보성 모달만
    dialog.addEventListener('click', (e) => { if (e.target === dialog && 'light' in dialog.dataset) dialog.close(); });
  });
})();
```

## 앱
- SwiftUI: `.alert`·`.confirmationDialog`는 시스템이 그리는 **OS 예외**다. 모양은 두고 제목·행동 이름만 `microcopy`에 맞춘다.
- SwiftUI 직접 그리기: `ZStack { bg.opacity(0.85); VStack { … }.padding(24).background(bg).overlay(Rectangle().stroke(lineStrong, lineWidth: 1)) }`, `.shadow` 없음, `.accessibilityAddTraits(.isModal)`.
- Compose: `Dialog(properties = DialogProperties(usePlatformDefaultWidth = false)) { Surface(shape = RectangleShape, color = bg, border = BorderStroke(1.dp, lineStrong), tonalElevation = 0.dp, shadowElevation = 0.dp) }`.
- Compose `AlertDialog`를 쓰면 `shape = RectangleShape`, `tonalElevation = 0.dp`, `containerColor = bg`, 버튼은 `TextButton(shape = RectangleShape)`.
- 가림막: Compose `Dialog`의 기본 어두운 scrim은 `window.setDimAmount(0f)` 후 bg 0.85 면을 직접 깐다.
- OS 예외: 권한 요청, 구독·결제 창, 시스템 알림 허용 창은 OS 모양 그대로.

```swift
ZStack {
  MP.bg.opacity(0.85).ignoresSafeArea()
  VStack(alignment: .leading, spacing: 10) {
    Text("삭제?").font(.custom("Mulmaru", size: 24))
    HStack(spacing: 18) { Spacer(); Button("[ 취소 ]", action: cancel); Button("삭제", action: remove) }
  }
  .padding(24).frame(maxWidth: 420).background(MP.bg)
  .overlay(Rectangle().stroke(MP.lineStrong, lineWidth: 1))
}
.accessibilityAddTraits(.isModal)
```

```kotlin
Dialog(onDismissRequest = cancel, properties = DialogProperties(usePlatformDefaultWidth = false, dismissOnClickOutside = false)) {
  (LocalView.current.parent as DialogWindowProvider).window.setDimAmount(0f)
  Box(Modifier.fillMaxSize().background(MP.bg.copy(alpha = 0.85f)), contentAlignment = Alignment.Center) {
    Surface(shape = RectangleShape, color = MP.bg, border = BorderStroke(1.dp, MP.lineStrong),
      tonalElevation = 0.dp, shadowElevation = 0.dp, modifier = Modifier.widthIn(max = 420.dp).padding(16.dp)) { /* 제목 · 행동 */ }
  }
}
```
- OS 예외 목록: `.alert`·`.confirmationDialog`, 권한 요청, 구독·결제, 알림 허용, 생체 인증 창

## 해야 할 것 / 하지 말 것
- 해야 할 것: 질문형 짧은 제목("삭제?", "기록을 지울까요?").
- 해야 할 것: 결과를 말하는 주 행동 이름("삭제", "초기화"), 오른쪽 끝에 둔다.
- 해야 할 것: 확인창은 취소에 첫 포커스, `Esc` 닫기, 닫은 뒤 포커스 돌려주기.
- 해야 할 것: 뒤 화면 `inert` + 스크롤 잠금, 가림막은 `--mp-bg` 0.85.
- 하지 말 것: 그림자로 띄우기, 흐림(blur)·검은 반투명 가림막.
- 하지 말 것: 커지며·튕기며 나타나기, 둥근 모서리.
- 하지 말 것: "확인 / 취소"처럼 결과를 말하지 않는 버튼, 모서리 `x`만 있는 닫기.
- 하지 말 것: 모달 위에 모달, 페이지 들어오자마자 뜨는 모달, 주 행동을 orange 면으로 칠하기(화면의 강조 하나가 따로 있을 때).

**자주 틀리는 것**
- `::backdrop`을 검은 반투명으로 → `--mp-bg` 면 + `--mp-opacity-body`
- 라이브러리 기본 둥근 모서리·그림자 남김 → radius 0, 그림자 속성 지우기
- 닫힌 뒤 포커스가 `body`로 사라짐 → 연 요소를 기억해 `focus()`
- 확인창 첫 포커스를 "삭제"에 → "취소"에
- Compose `Dialog` 기본 dim 위에 면을 또 깔아 이중으로 어두워짐 → `setDimAmount(0f)`
