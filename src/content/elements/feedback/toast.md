---
id: toast
name: 토스트
nameEn: Toast
category: feedback
summary: 방금 한 행동의 결과를 화면 아래에 잠깐 띄우는 반전 사각 상자. 몇 초 뒤 즉시 사라진다.
aliases: [토스트, 스낵바, 알림 메시지, 저장됨 알림, 잠깐 알림, 되돌리기 알림, toast, snackbar, flash message, notification toast, undo toast]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-font, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-body, --mp-opacity-meta, --mp-duration-fade, --mp-gutter]
effects: [reduced-motion]
related: [banner, text-action, microcopy, notification, confirm-step]
---

## 용도
저장·복사·삭제·이동처럼 사용자가 **방금 한 행동의 결과**를 알린다(`저장했습니다`, `링크를 복사했습니다`).
- 되돌리기가 가능한 행동은 `confirm-step` 대신 실행 후 토스트에 `[ 되돌리기 ]`를 둔다.
- 쓰지 않는다: 사용자가 반드시 읽고 조치해야 하는 내용(`banner`, `modal`), 지속되는 상태(오프라인 → `banner`), 입력 오류(`form-validation`), 앱 밖 알림(`notification`).
- 성공을 매번 알리지 않는다. 결과가 눈에 보이면(목록에 항목이 생김) 토스트를 생략한다.

## 생김새
- 반전 상자: 배경 `--mp-ink`, 글자 `--mp-bg`, `border-radius: 0`, 테두리·그림자 없음 — 반전 자체가 바닥과 분리해 준다
- 여백 `0.8em 1.2em`, 최소 폭 `12em`, 최대 폭 `min(24em, 100vw - 2 × var(--mp-gutter))`
- 글자 `--mp-size-small`, `--mp-tracking-small`, 행간 1.5, 한 줄(최대 두 줄)
- 문구는 과거형 합쇼체, 마침표 생략 가능: `저장했습니다`, `3개를 삭제했습니다`
- 행동 버튼(선택, 최대 1개): 오른쪽 끝 `[ 되돌리기 ]`, 글자 `--mp-bg`, `opacity: var(--mp-opacity-body)`, 문구와 간격 `1.2em`
- 닫기 `×`(선택): 행동 버튼이 없고 머무는 시간이 길 때만, `opacity: var(--mp-opacity-meta)`
- 위치: 화면 아래 가운데, 아래 여백 `1.5em`. 앱은 탭 바 위 `1em`
- 한 번에 하나만 보인다. 새 토스트가 오면 이전 것을 즉시 교체(쌓지 않는다)
- 겹침 순서: 콘텐츠 위, `modal`보다 아래. 모달이 열려 있으면 모달 닫힌 뒤 보인다

## 상태
| 상태 | 표현 | 시간 |
|---|---|---|
| 나타남 | 즉시 표시 또는 opacity 0→1 | `--mp-duration-fade`(0.6s) 이하 |
| 머무름(문구만) | 그대로 | 4초 |
| 머무름(행동 버튼 있음) | 그대로 | 6초 |
| 호버·포커스 안 | 타이머 멈춤 | 벗어나면 남은 시간 이어서 |
| 행동 버튼 호버·포커스 | 버튼 opacity 1 + 1px `--mp-bg` 윤곽선 offset 3px | — |
| 사라짐 | 즉시 제거 | — |
| 교체 | 이전 것 제거 후 새 것 표시 | 즉시 |

## 동작
### 모션
- 아래에서 미끄러져 올라오거나 튀지 않는다. 나타남은 즉시 또는 짧은 페이드(`--mp-duration-fade` ease), 사라짐은 즉시.
- `prefers-reduced-motion: reduce`이면 페이드도 없이 즉시.

### 키보드·접근성
- 토스트를 담는 층(`.mp-toast-layer`)을 페이지에 **미리** 두고 `role="status"` `aria-live="polite"` `aria-atomic="true"`. 문구만 갈아 끼워야 스크린 리더가 읽는다.
- 실패·경고 문구는 토스트로 보내지 않는다(`banner` `role="alert"`).
- 포커스를 토스트로 옮기지 않는다. 행동 버튼이 있는 층은 DOM에서 행동을 일으킨 영역 바로 뒤에 두어 Tab 한 번으로 닿게 한다. 행동 있는 토스트는 최소 6초 머문다.
- `Esc`로 현재 토스트를 닫는다.
- 행동 버튼은 `<button type="button">`, 라벨은 `되돌리기`(괄호는 `aria-hidden` 처리하거나 `aria-label="되돌리기"`).

### 반응형
- 폭 480px 이하: 좌우 `--mp-gutter` 여백을 두고 가로로 꽉 채운다(`left: var(--mp-gutter); right: var(--mp-gutter)`), 문구가 길면 두 줄, 행동 버튼은 오른쪽 아래.
- 화면 아래 고정 요소(탭 바, 입력창)가 있으면 그 위로 올린다. 가상 키보드가 열려 있으면 키보드 위.

## 데모
```html demo
<div class="mp-toast-demo">
  <div class="mp-toast"><span>저장</span></div>
  <div class="mp-toast"><span>삭제</span><button class="mp-toast-action" type="button">[ 취소 ]</button></div>
</div>
```

## 코드
```css
.mp-toast-demo { display: grid; justify-items: center; gap: 0.8em; }
.mp-toast {
  display: inline-flex; align-items: center; justify-content: space-between; gap: 1.2em;
  min-width: 12em; max-width: 24em; padding: 0.8em 1.2em; border-radius: 0;
  background: var(--mp-ink); color: var(--mp-bg);
  font: 400 var(--mp-size-small) / 1.5 var(--mp-font); letter-spacing: var(--mp-tracking-small);
}
.mp-toast-action {
  flex: none; padding: 0; border: 0; border-radius: 0; background: transparent; color: inherit;
  font: inherit; opacity: var(--mp-opacity-body); cursor: pointer;
}
.mp-toast-action:hover, .mp-toast-action:focus-visible { opacity: 1; }
.mp-toast-action:focus-visible { outline: 1px solid var(--mp-bg); outline-offset: 3px; }
.mp-toast-close { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }

/* 실제 화면의 층 — 데모에서는 쓰지 않는다 */
.mp-toast-layer { position: fixed; left: 50%; bottom: 1.5em; transform: translateX(-50%); z-index: 50; }
.mp-toast.is-entering { animation: mp-toast-in var(--mp-duration-fade) ease both; }
@keyframes mp-toast-in { from { opacity: 0; } }
@media (max-width: 480px) {
  .mp-toast-layer { left: var(--mp-gutter); right: var(--mp-gutter); transform: none; }
  .mp-toast-layer .mp-toast { display: flex; max-width: none; }
}
@media (prefers-reduced-motion: reduce) { .mp-toast.is-entering { animation: none; } }
```

```js
// 한 번에 하나, 호버·포커스 중 멈춤. 띄우기: document.dispatchEvent(new CustomEvent('mp:toast', { detail: { text: '저장했습니다' } }))
(() => {
  const layer = document.querySelector('.mp-toast-layer'); // role="status", 안에 .mp-toast-text
  const textEl = layer && layer.querySelector('.mp-toast-text');
  if (!layer || !textEl) return;
  let timer, left = 0, started = 0;
  const start = () => { started = Date.now(); clearTimeout(timer); timer = setTimeout(() => { layer.hidden = true; }, left); };
  const pause = () => { clearTimeout(timer); left = Math.max(0, left - (Date.now() - started)); };
  document.addEventListener('mp:toast', (e) => {
    const { text = '', ms = 4000 } = e.detail || {};
    textEl.textContent = text;
    layer.hidden = false; left = ms; start();
  });
  layer.addEventListener('pointerenter', pause);
  layer.addEventListener('pointerleave', start);
  layer.addEventListener('focusin', pause);
  layer.addEventListener('focusout', start);
})();
```

## 앱
- SwiftUI: 루트 `ZStack` 하단 `overlay(alignment: .bottom)`에 `Text` + `.padding(.horizontal, 18).padding(.vertical, 12).background(ink).foregroundStyle(bg)`. `.clipShape`·`.shadow` 없음. 전환은 `.transition(.identity)` 또는 `.opacity`. `UIAccessibility.post(notification: .announcement, argument:)`로 읽어 준다.
- Compose: `Snackbar(shape = RectangleShape, containerColor = ink, contentColor = bg, actionContentColor = bg)`, `SnackbarHost`에서 elevation 0. `SnackbarDuration.Short`(4초) / 행동 있으면 `Long`.
- 탭 바가 있으면 탭 바 위에 띄운다. 제스처로 밀어 닫기는 허용(즉시 제거).
- OS 예외: 푸시·시스템 알림은 `notification`. Android 12 이상 시스템 `Toast`(앱 아이콘 포함)는 쓰지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 과거형 한 줄(`복사했습니다`). 한 번에 하나. 되돌릴 수 있으면 `[ 되돌리기 ]` 하나. 호버·포커스 중 타이머 멈춤. `role="status"` 층을 미리 둔다.
- 하지 말 것: 쌓이는 토스트 여러 개, 성공 초록·실패 빨강·orange 배경, 둥근 알약, 그림자, 미끄러져 튀어 오르기, 느낌표·이모지, 오류를 토스트로만 알리기, 2초 이하로 사라지는 행동 토스트, 행동 버튼 두 개.
