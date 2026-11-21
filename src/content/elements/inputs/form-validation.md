---
id: form-validation
name: 입력 검증
nameEn: Form validation
category: inputs
summary: 잘못된 입력은 칸 테두리를 잉크로 진하게 하고, 아래에 ■ 표시와 원인·해결 문구 한 줄을 둔다. 강조색은 화면의 첫 오류 하나에만.
aliases: [입력 검증, 폼 검증, 유효성 검사, 오류 메시지, 에러 문구, 필수 입력, 입력 오류, 잘못된 입력, form validation, validation, error message, invalid, required, inline error]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-ink, --mp-accent, --mp-line, --mp-line-strong, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-body, --mp-opacity-meta, --mp-opacity-muted]
effects: []
related: [text-field, textarea, select, error-state, banner, microcopy, confirm-step]
---

## 용도
폼 입력이 규칙에 맞지 않을 때 **어느 칸이 왜 틀렸고 어떻게 고치는지** 그 칸 바로 아래에 알린다.
- 화면 전체를 불러오지 못함: `error-state`. 저장 요청이 서버에서 실패: 폼 위 `banner`.
- 행동 결과(저장했습니다): `toast`. 검증 문구로 성공을 알리지 않는다(초록 체크 없음).

## 생김새
- 칸(오류)
  - 테두리 `--mp-line` → `--mp-ink`(선이 진해진다), 굵기는 그대로 1px
  - `aria-invalid="true"`, 배경·글자색 변화 없음
- 메시지 자리
  - 칸 바로 아래, 칸과 간격 `0.5em`
  - `min-height: 1.6em`으로 **미리 비워 둔다** — 오류가 떠도 아래 칸이 밀리지 않는다(timeboard form-status 원칙)
  - 글자 `--mp-size-small`, `--mp-tracking-small`, `--mp-ink`, `opacity: var(--mp-opacity-body)`, 행간 1.6
- 메시지 앞 `■`
  - 간격 `0.5em`, `aria-hidden`
  - 화면의 **첫 오류 하나**만 `--mp-accent`, 나머지 오류는 `--mp-ink`
  - ■ 자체에는 opacity를 주지 않는다(강조는 옅게 하지 않는다)
  - 라이트·다크 모두 오류 **글자**는 orange로 칠하지 않는다
- 문구: 원인 + 해결 두 마디, 합쇼체, 느낌표 없음
  - `이메일 형식이 아닙니다. @를 포함해 주세요.`
  - `8자 이상 입력해 주세요.` (현재 글자 수를 알면 `지금 5자입니다.`)
  - `이미 쓰고 있는 이름입니다. 다른 이름을 입력해 주세요.`
- 필수 표시: 라벨 뒤 `(필수)` — `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`. 빨간 `*` 쓰지 않는다. 대부분이 필수면 선택 칸에 `(선택)`만 적는다
- 도움말(오류 아닐 때 규칙 안내): 같은 메시지 자리에 `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`, ■ 없음. 오류가 뜨면 도움말을 오류로 **교체**한다
- 제출 요약(오류 3개 이상일 때만): 폼 맨 위 `오류 3개` + 각 칸으로 가는 링크 목록, 1px `--mp-line-strong` 상자. 이때 첫 오류의 강조 ■은 요약 상자로 옮기고 칸의 ■은 모두 잉크

## 상태
| 상태 | 표현 |
|---|---|
| 확인 전 | 메시지 자리 비어 있음(또는 도움말) |
| 입력 중 | 오류 표시하지 않음. 이미 오류였던 칸은 고쳐지는 순간 즉시 지움 |
| 칸 벗어남 + 틀림 | 테두리 `--mp-ink` + ■ + 문구 |
| 오류(화면의 첫 번째) | ■ `--mp-accent` |
| 오류(그 밖) | ■ `--mp-ink` |
| 오류 칸 포커스 | 테두리 `--mp-ink` 유지 + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 고쳐짐 | 테두리 `--mp-line`, 문구 지움(자리 높이는 유지) |
| 제출 시 오류 | 제출 중단, 첫 오류 칸으로 포커스 이동 |
| 서버 검증 중 | 칸 옆 `loading`(■ 계단), 제출 버튼 `disabled` `opacity: var(--mp-opacity-muted)` |
| 서버 오류(이름 중복 등) | 해당 칸에 같은 방식으로 표시 |

## 동작
### 모션
- 없음. 오류는 즉시 나타나고 즉시 사라진다. 칸 흔들기·빨간 번쩍임·페이드를 쓰지 않는다.

### 키보드·접근성
- 칸: `aria-invalid="true"` + `aria-describedby="<메시지 id>"`(도움말이 있으면 두 id를 함께). 오류가 사라지면 `aria-invalid` 제거.
- 메시지 요소는 늘 DOM에 두고 내용만 바꾼다. 칸을 벗어날 때 생긴 오류는 `aria-live="polite"`로 읽는다(입력 중 매 글자 읽지 않게).
- 제출 시: 브라우저 기본 풍선 대신 `novalidate` + 직접 표시. 첫 오류 칸에 `focus()`, 오류가 여럿이면 요약 상자에 `role="alert"` + `tabindex="-1"` 후 포커스.
- 필수 칸은 `required` + `aria-required="true"`, 글자 `(필수)`는 라벨 안에 두어 함께 읽힌다.
- 색이 아니라 ■ + 문구 + 테두리 세 가지로 오류를 알린다(색만으로 전달하지 않는다).
- 검증 시점: `focusout`(칸 벗어남)과 `submit`. 이미 오류인 칸만 `input`마다 다시 검사해 고쳐지면 즉시 지운다.

### 반응형
- 메시지는 칸 폭에 맞춰 줄바꿈한다(`max-width`는 칸과 같게). 한 줄 요약이 두 줄이 되어도 자리 높이가 늘어나는 것은 허용한다.
- 좁은 화면에서 첫 오류 칸으로 이동할 때 라벨까지 보이게 `scrollIntoView({ block: 'center' })`.
- 모바일 가상 키보드가 메시지를 가리지 않게 칸 아래 여백을 확보한다.

## 데모
```html demo
<div class="mp-form-validation-demo">
  <label class="mp-form-validation">
    <span class="mp-form-validation-label">기본</span>
    <input class="mp-form-validation-input" type="text" value="metaphr">
    <span class="mp-form-validation-msg"></span>
  </label>
  <label class="mp-form-validation">
    <span class="mp-form-validation-label">오류</span>
    <input class="mp-form-validation-input" type="text" value="meta" aria-invalid="true" aria-describedby="mp-form-validation-m1">
    <span class="mp-form-validation-msg is-first" id="mp-form-validation-m1">형식</span>
  </label>
  <label class="mp-form-validation">
    <span class="mp-form-validation-label">오류</span>
    <input class="mp-form-validation-input" type="text" value="" aria-invalid="true" aria-describedby="mp-form-validation-m2">
    <span class="mp-form-validation-msg" id="mp-form-validation-m2">필수</span>
  </label>
</div>
```

## 코드
```css
.mp-form-validation-demo { display: flex; flex-wrap: wrap; gap: 1.2em; }
.mp-form-validation-demo .mp-form-validation { width: 10em; }
.mp-form-validation { display: grid; gap: 0.5em; width: 100%; max-width: 22em; }
.mp-form-validation-label { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-form-validation-required { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-form-validation-input {
  width: 100%; padding: 0.7em 0.9em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink); caret-color: var(--mp-ink);
  font: 400 var(--mp-size-body) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-body);
}
.mp-form-validation-input:hover { border-color: var(--mp-line-strong); }
.mp-form-validation-input[aria-invalid="true"] { border-color: var(--mp-ink); }
.mp-form-validation-input:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-form-validation-msg { display: block; min-height: 1.6em; font-size: var(--mp-size-small); line-height: 1.6; letter-spacing: var(--mp-tracking-small); color: var(--mp-ink); }
.mp-form-validation-msg:not(:empty)::before { content: "■"; margin-right: 0.5em; color: var(--mp-ink); }
.mp-form-validation-msg.is-first::before { color: var(--mp-accent); } /* 강조 — 화면당 하나 */
.mp-form-validation-help { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-form-validation-summary { padding: 1em 1.2em; border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0; }
.mp-form-validation-input:disabled { opacity: var(--mp-opacity-muted); }
```
문구 글자를 `--mp-opacity-body`로 옅게 하려면 문구를 `<span>`으로 감싸 그 span에만 opacity를 준다(■까지 옅어지지 않게).

```js
// 칸을 벗어날 때와 제출할 때 검사, 이미 틀린 칸은 입력마다 다시 검사
(() => {
  document.querySelectorAll('form').forEach((form) => {
    const fields = [...form.querySelectorAll('.mp-form-validation-input')];
    if (!fields.length) return;
    const msgOf = (field) => document.getElementById(field.getAttribute('aria-describedby') || '');
    const check = (field) => {
      const msg = msgOf(field);
      if (!msg) return true;
      const ok = field.checkValidity();
      if (ok) { field.removeAttribute('aria-invalid'); msg.textContent = ''; }
      else { field.setAttribute('aria-invalid', 'true'); msg.textContent = field.dataset.msg || field.validationMessage; }
      return ok;
    };
    const markFirst = () => {
      form.querySelectorAll('.mp-form-validation-msg').forEach((m) => m.classList.remove('is-first'));
      const first = form.querySelector('.mp-form-validation-msg:not(:empty)');
      if (first) first.classList.add('is-first');
    };
    form.noValidate = true;
    fields.forEach((field) => {
      field.addEventListener('focusout', () => { check(field); markFirst(); });
      field.addEventListener('input', () => { if (field.getAttribute('aria-invalid') === 'true') { check(field); markFirst(); } });
    });
    form.addEventListener('submit', (e) => {
      const bad = fields.filter((f) => !check(f));
      markFirst();
      if (bad.length) { e.preventDefault(); bad[0].focus(); }
    });
  });
})();
```

## 앱
- SwiftUI: 칸 아래 `HStack(spacing: 6) { Rectangle().fill(isFirst ? accent : ink).frame(width: 8, height: 8); Text(message) }`, 자리는 `.frame(minHeight: 22, alignment: .top)`로 고정.
  - 테두리 `.overlay(Rectangle().stroke(invalid ? ink : line, lineWidth: 1))`.
  - `.accessibilityHint(message)` 또는 오류 발생 시 `AccessibilityNotification.Announcement(message).post()`.
- Compose: `OutlinedTextField(isError = …)`의 Material 빨간색을 쓰지 않는다. `BasicTextField` + `Modifier.border(1.dp, if (invalid) ink else line, RectangleShape)` + 아래 `Row { Box(Modifier.size(8.dp).background(markColor)); Text(message) }`.
  - `Modifier.semantics { error(message) }`.
- 틀린 입력을 제출하면 가벼운 오류 햅틱(iOS `.error`, Android `HapticFeedbackType.Reject`)을 줄 수 있다. 칸 흔들기 애니메이션은 쓰지 않는다.
- 시스템 `Alert`로 검증 오류를 띄우지 않는다. 칸 아래에 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것
  - 원인과 해결을 한 문장씩, 칸 바로 아래에.
  - 메시지 자리를 미리 비워 레이아웃이 흔들리지 않게.
  - 여러 오류면 첫 오류만 강조 ■, 제출 시 그 칸으로 포커스.
  - 칸을 벗어날 때 검사하고, 고쳐지면 즉시 지운다.
  - ■ + 문구 + 테두리로 알린다(색만으로 알리지 않는다).
- 하지 말 것
  - orange·빨강 글자 오류, 칸 테두리를 orange로 칠하기, 모든 칸에 orange ■.
  - 입력하는 매 글자마다 실시간 오류(아직 다 치지 않았다).
  - 칸 흔들기·번쩍임, 느낌표·이모지·"잘못되었습니다"만 있는 문구.
  - 빨간 `*` 필수 표시, 성공 초록 체크.
  - 브라우저 기본 검증 풍선을 그대로 쓰기.
