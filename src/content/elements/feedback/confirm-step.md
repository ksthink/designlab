---
id: confirm-step
name: 확인 단계
nameEn: Confirm step
category: feedback
summary: 삭제·종료·대용량 다운로드처럼 되돌릴 수 없는 행동 앞에서 한 번 멈춘다. 결과 정보를 보여 주고, 무거운 행동은 짧은 코드를 입력해야 실행된다.
aliases: [확인 단계, 확인 창, 삭제 확인, 되돌릴 수 없음, 입력 확인, 타이핑 확인, 정말 삭제, 종료 확인, 다운로드 확인, confirm, confirmation, confirm dialog, destructive action, typed confirmation, are you sure, danger zone]
platforms: [web, ios, android]
status: extracted
source: timeboard DESIGN.md:218 다운로드 확인 모달 · hihi ClimbEndConfirmView 무작위 2자리 숫자 입력 · hihi "이 기록을 삭제할까요? 되돌릴 수 없습니다." · syn 삭제 hover 표시
pillars: [minimalism, retro-color]
tokens: [--mp-ink, --mp-bg, --mp-accent, --mp-line, --mp-line-strong, --mp-line-button, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-size-subheading, --mp-tracking-subheading, --mp-opacity-secondary, --mp-opacity-muted, --mp-opacity-meta, --mp-duration-hover]
effects: [invert-hover, press, reduced-motion]
related: [modal, action-sheet, button, text-field, form-validation, microcopy, toast]
---

## 용도
되돌릴 수 없는 행동 **직전에** 한 번 멈춘다: 삭제, 기록 종료, 초기화, 계정 삭제, 대용량 다운로드(데이터 요금).
- 되돌릴 수 있는 행동(보관, 이동, 휴지통으로)은 확인 없이 실행하고 `toast`의 `[ 되돌리기 ]`로 대신한다. 모든 행동에 확인을 붙이면 사용자가 읽지 않고 누르게 된다.
- 무게에 따라 두 단계 중 하나를 고른다.

| 단계 | 언제 | 구성 |
|---|---|---|
| **한 번 더 누르기** | 항목 하나 삭제, 다운로드, 로그아웃(작성 중 내용 있음) | 질문 + 결과 정보 + 경고 + `[ 취소 ]` `[ 삭제 ]` |
| **입력 확인** | 기록 종료, 전체 초기화, 계정·프로젝트 삭제, 여러 항목 일괄 삭제 | 위 구성 + 무작위 2자리 숫자(또는 항목 이름) 입력, 일치해야 실행 버튼이 켜짐 |

## 생김새
- 담는 곳: 웹은 `modal`(가운데) 또는 행 아래 제자리 펼침, 앱은 `sheet`/전체 화면. 모서리 직각, 그림자 없음
- 상자: `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`, 배경 `--mp-bg`, 여백 `1.6em`, 폭 `min(26em, 100%)`, 줄 간격 `0.8em`
- 읽는 순서(위→아래), 이 순서를 바꾸지 않는다
  1. 질문: `이 기록을 삭제할까요?` — `--mp-size-subheading`, `--mp-tracking-subheading`. 동사로 끝나는 의문문, 대상 이름 포함 가능 `"한라산" 기록을 삭제할까요?`
  2. 결과 정보: 무엇이 얼마나 영향받는지 `기록 12개 · 3.4MB` / `00:48:12 · 사진 8장` — `--mp-size-small`, `opacity: var(--mp-opacity-secondary)`, `tabular-nums`
  3. 경고: `■ 되돌릴 수 없습니다.` — ■ `--mp-accent`(이 화면의 강조 하나), 글자 `--mp-ink` 불투명. orange 글자 금지
  4. (입력 확인만) 안내 `확인하려면 42를 입력하세요` + 입력칸: 폭 `4em`, 가운데 정렬, `--mp-size-body`, 1px `--mp-line`, 숫자 키패드
  5. 버튼 줄: 오른쪽 정렬, 간격 `0.8em`, 위와 간격 `1.4em`. `[ 취소 ]` 왼쪽, 실행 버튼 오른쪽
- 버튼: `button`과 같은 1px `--mp-line-button` 사각, 여백 `0.75em 1.5em`, `--mp-size-small`
  - 실행 버튼 라벨은 동사 하나: `삭제`, `종료`, `받기`. `확인`·`예`는 쓰지 않는다
  - 실행 버튼을 orange 면으로 채우지 않는다(경고 ■이 이미 강조)
- 목록의 삭제 진입 버튼: 평소 숨김 또는 잉크색. 웹은 행 호버·포커스 때만 드러내고(`opacity: 0` → 1), 앱은 스와이프로 드러낸다

## 상태
| 상태 | 표현 |
|---|---|
| 평소(목록 행) | 삭제 버튼 `opacity: 0`, 행 `:hover`·`:focus-within`에서 1 |
| 확인 열림 | 상자 표시, 기본 포커스 = `[ 취소 ]`(한 번 더 누르기) 또는 입력칸(입력 확인) |
| 입력 전·불일치 | 실행 버튼 `disabled`, `opacity: var(--mp-opacity-muted)`, 반전 없음 |
| 입력 일치 | 실행 버튼 활성, 호버·포커스 반전(`--mp-ink`/`--mp-bg`) |
| 틀린 값으로 Enter | 입력칸 테두리 `--mp-ink` + `form-validation` 문구 `숫자가 다릅니다. 42를 입력해 주세요.` (■는 경고 줄의 강조와 겹치므로 잉크 ■) |
| 실행 중 | 실행 버튼 글자 `삭제하는 중` + `loading`, 두 버튼 `aria-disabled` |
| 실패 | 상자 유지, 경고 줄 아래 원인·해결 문구, 실행 버튼 다시 활성 |
| 완료 | 상자 즉시 닫힘 → `toast` `삭제했습니다`, 포커스는 목록의 다음 항목(없으면 목록 제목) |
| 취소·Esc·바깥 누름 | 상자 즉시 닫힘, 포커스는 확인을 연 버튼으로 복귀 |

## 동작
### 모션
- 상자 열림·닫힘은 즉시(페이드·확대·미끄러짐 없음). 버튼 반전은 `invert-hover`(`--mp-duration-hover` ease), 누름은 `press`(1px 이동).
- 목록 행의 삭제 버튼 드러남은 opacity `--mp-duration-hover` ease.
- `prefers-reduced-motion: reduce`이면 모든 전환 없음.

### 키보드·접근성
- 상자: `role="alertdialog"` `aria-modal="true"` `aria-labelledby`(질문) `aria-describedby`(결과 정보 + 경고). 모달이면 배경 `inert`.
- 포커스 가두기: Tab이 상자 안에서만 돈다. `Esc` = 취소.
- 기본 포커스는 **파괴적이지 않은 쪽**(취소 또는 입력칸). Enter로 실행 버튼이 눌리는 기본값을 두지 않는다 — 입력 확인에서 Enter는 값이 일치할 때만 실행.
- 입력칸: `inputmode="numeric"` `autocomplete="off"` `maxlength="2"`, 라벨은 안내 문구와 `aria-labelledby`로 연결, 불일치 제출 시 `aria-invalid="true"`.
- 확인 숫자는 **열 때마다 새로 뽑는다**(10–99). 붙여넣기는 허용(보조 기술 사용자).
- ■은 `aria-hidden="true"`, `되돌릴 수 없습니다`는 글자로 읽힌다.

### 반응형
- 폭 480px 이하(웹): 상자를 화면 아래에 붙은 전체 폭으로(좌우 여백 없이 가장자리까지), 버튼은 두 개를 같은 폭으로 나눠 한 줄(`flex: 1`), 순서는 그대로 취소 왼쪽.
- 가상 키보드가 열리면 입력칸과 버튼이 키보드 위에 보이게 스크롤.

## 데모
```html demo
<div class="mp-confirm-step-demo">
  <div class="mp-confirm-step" role="alertdialog" aria-labelledby="mp-confirm-step-q1">
    <p class="mp-confirm-step-q" id="mp-confirm-step-q1">삭제?</p>
    <p class="mp-confirm-step-info">3.4MB</p>
    <div class="mp-confirm-step-actions"><button type="button">취소</button><button type="button">삭제</button></div>
  </div>
  <div class="mp-confirm-step" role="alertdialog" aria-labelledby="mp-confirm-step-q2">
    <p class="mp-confirm-step-q" id="mp-confirm-step-q2">종료?</p>
    <p class="mp-confirm-step-warn"><span aria-hidden="true">■</span>42</p>
    <label class="mp-confirm-step-code"><input type="text" inputmode="numeric" maxlength="2" placeholder="_" aria-label="42 입력"></label>
    <div class="mp-confirm-step-actions"><button type="button">취소</button><button type="button" disabled>종료</button></div>
  </div>
</div>
```

## 코드
```css
.mp-confirm-step-demo { display: grid; grid-template-columns: repeat(auto-fit, minmax(12em, 1fr)); gap: 1em; align-items: start; }
.mp-confirm-step {
  display: grid; gap: 0.8em; width: min(26em, 100%); padding: 1.6em;
  border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0; background: var(--mp-bg); color: var(--mp-ink);
}
.mp-confirm-step p { margin: 0; }
.mp-confirm-step-q { font-size: var(--mp-size-subheading); letter-spacing: var(--mp-tracking-subheading); }
.mp-confirm-step-info { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); font-variant-numeric: tabular-nums; }
.mp-confirm-step-warn { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-confirm-step-warn span { margin-right: 0.5em; color: var(--mp-accent); } /* 강조 — 화면당 하나 */
.mp-confirm-step-code { display: grid; gap: 0.5em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-confirm-step-code input {
  width: 4em; padding: 0.5em; text-align: center; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink); caret-color: var(--mp-ink);
  font: 400 var(--mp-size-body) / 1.2 var(--mp-font); letter-spacing: var(--mp-tracking-body);
}
.mp-confirm-step-code input[aria-invalid="true"] { border-color: var(--mp-ink); }
.mp-confirm-step-code input:focus-visible { border-color: var(--mp-line-strong); outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-confirm-step-actions { display: flex; justify-content: flex-end; gap: 0.8em; margin-top: 0.6em; }
.mp-confirm-step-actions button {
  padding: 0.75em 1.5em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small); cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-confirm-step-actions button:hover:not(:disabled), .mp-confirm-step-actions button:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-confirm-step-actions button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-confirm-step-actions button:active:not(:disabled) { transform: translateY(1px); }
.mp-confirm-step-actions button:disabled { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-confirm-step-row-delete { opacity: 0; transition: opacity var(--mp-duration-hover) ease; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); }
.mp-confirm-step-row:hover .mp-confirm-step-row-delete, .mp-confirm-step-row:focus-within .mp-confirm-step-row-delete { opacity: var(--mp-opacity-meta); }
.mp-confirm-step-row-delete:hover, .mp-confirm-step-row-delete:focus-visible { opacity: 1; }
@media (max-width: 480px) { .mp-confirm-step-actions button { flex: 1; } }
@media (prefers-reduced-motion: reduce) { .mp-confirm-step-actions button, .mp-confirm-step-row-delete { transition: none; } }
@media (hover: none) { .mp-confirm-step-row-delete { opacity: var(--mp-opacity-meta); } }
```

```js
// 입력 확인: 열 때마다 새 숫자(10–99), 일치해야 실행 버튼이 켜진다
// 여는 쪽: dialog.dispatchEvent(new CustomEvent('mp:confirm-open'))  실행: 'mp:confirm-run' 이벤트를 받는다
(() => {
  document.querySelectorAll('.mp-confirm-step[data-typed]').forEach((dialog) => {
    const input = dialog.querySelector('.mp-confirm-step-code input');
    const run = dialog.querySelector('[data-run]');
    const codeEl = dialog.querySelector('[data-code]');
    if (!input || !run || !codeEl) return;
    let code = '';
    const open = () => {
      code = String(Math.floor(Math.random() * 90) + 10);
      codeEl.textContent = code;
      input.setAttribute('aria-label', `${code} 입력`);
      input.value = ''; run.disabled = true; input.removeAttribute('aria-invalid');
      if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
      input.focus();
    };
    const tryRun = () => {
      if (input.value.trim() !== code) { input.setAttribute('aria-invalid', 'true'); return; }
      dialog.dispatchEvent(new CustomEvent('mp:confirm-run', { bubbles: true }));
      if (typeof dialog.close === 'function') dialog.close();
    };
    input.addEventListener('input', () => { run.disabled = input.value.trim() !== code; input.removeAttribute('aria-invalid'); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); tryRun(); } });
    run.addEventListener('click', tryRun);
    dialog.addEventListener('mp:confirm-open', open);
  });
})();
```
마크업: 입력 확인 상자에 `data-typed`, 숫자 자리에 `data-code`, 실행 버튼에 `data-run`을 단다(`<dialog class="mp-confirm-step" data-typed>` 권장).

## 앱
- SwiftUI: 입력 확인은 `.sheet` 또는 `.fullScreenCover`에 같은 구성(`ClimbEndConfirmView` 방식). `TextField` + `.keyboardType(.numberPad)` + `@FocusState`로 열자마자 포커스, 불일치면 실행 `Button`을 `.disabled(true)`. 틀린 값 제출 시 칸 테두리를 잉크로 진하게 하고 문구 표시, 칸 흔들기 없이 `UINotificationFeedbackGenerator().notificationOccurred(.error)` 진동만.
- Compose: `Dialog(properties = DialogProperties(usePlatformDefaultWidth = false))` 안에 `Column(Modifier.border(1.dp, lineStrong, RectangleShape).background(bg).padding(24.dp))`, `KeyboardOptions(keyboardType = KeyboardType.NumberPad, imeAction = ImeAction.Done)`.
- 목록 삭제: 스와이프로 삭제 버튼을 드러낸 뒤 다시 한 번 누르게 한다(스와이프 끝까지 밀어 바로 삭제하는 full swipe는 끈다).
- 대용량 다운로드: 결과 정보에 용량과 연결 종류(`Wi-Fi 아님`)를 함께.
- OS 예외: **한 번 더 누르기** 단계는 시스템 `confirmationDialog`/`alert`(iOS), `AlertDialog`(Android)를 써도 된다 — 그때 파괴적 버튼 역할(`role: .destructive`)의 시스템 빨강은 그대로 둔다. **입력 확인**은 시스템 대화상자로 만들 수 없으니 직접 그린다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: `되돌릴 수 없습니다`를 직접 말한다. 영향받는 양(개수·용량·시간)을 보여 준다. 질문 → 정보 → 경고 → 버튼, 읽는 순서대로. 무거운 행동은 입력 확인, 숫자는 매번 새로. 기본 포커스는 취소나 입력칸. 실행 버튼은 동사. 완료 후 `toast`.
- 하지 말 것: 되돌릴 수 있는 행동에 확인 창, 실행 버튼을 orange·빨강 면으로 채우기, `정말요?`·`확인`·`예/아니요` 같은 모호한 문구, 확인 숫자 고정, Enter 기본 실행, 목록에 삭제 버튼을 늘 강조색으로 노출, 경고 문구를 orange 글자로, 확인 상자에 그림자·둥근 모서리, 칸 흔들기.
