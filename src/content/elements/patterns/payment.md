---
id: payment
name: 결제
nameEn: Payment
category: patterns
summary: 주문 요약(금액 오른쪽 정렬)·결제 수단(사각 라디오)·카드 입력·금액이 적힌 결제 버튼 하나로 된 결제 화면. 합계는 색이 아니라 크기로 강조한다.
aliases: [결제, 결제 화면, 체크아웃, checkout, payment, 구매, 주문, 카드 결제, 결제 폼, 구독 결제, 인앱 결제, Apple Pay, Google Pay, 토스페이, 카카오페이]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-ink, --mp-bg, --mp-accent, --mp-palette-slate, --mp-line, --mp-line-strong, --mp-line-button, --mp-border, --mp-font, --mp-size-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-size-heading, --mp-tracking-heading, --mp-size-title, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-muted, --mp-duration-hover, --mp-duration-caret, --mp-width-read, --mp-gutter]
effects: [invert-hover, press, reduced-motion]
related: [key-value, labels-numbers, radio, text-field, form-validation, button, confirm-step, loading, error-state, banner, microcopy, bottom-sheet]
---

## 용도
상품·구독·충전 금액을 확인하고 결제 수단을 골라 한 번에 결제할 때 쓴다. 결제는 되돌릴 수 없는 행동이므로 `confirm-step`의 원칙(최종 금액을 보여 주고, 한 번만 실행)을 화면 자체에 담는다.
- 쓴다: 웹 체크아웃, 앱 안의 실물·서비스 결제(외부 PG), 구독 시작 화면의 금액 확인부.
- 쓰지 않는다: 앱 안 디지털 상품·구독은 StoreKit / Google Play Billing의 **시스템 결제 시트**를 쓴다(OS 예외). 이 문서는 그 시트를 여는 버튼 앞 화면까지만 다룬다.

## 생김새
화면은 위에서 아래로 **요약 → 수단 → 입력 → 결제 버튼 → 안내 한 줄** 순서다(읽는 순서대로).

### 주문 요약
- `<dl>` 한 줄 = 이름 왼쪽, 금액 오른쪽(`key-value`). 줄 사이 `0.5em`, 선 없음
- 이름 `--mp-size-small`, `opacity: var(--mp-opacity-secondary)` / 금액 `--mp-size-small`, 잉크 1, `font-variant-numeric: tabular-nums`, `text-align: right`
- 금액 표기는 `labels-numbers`: `12,000원`(쉼표 세 자리, 단위 붙여 씀). 할인은 `-2,000원`(ASCII `-`)
- 합계 줄: 위에 1px `--mp-line` 선, 위 여백 `0.8em`. 금액은 `--mp-size-heading` / `--mp-tracking-heading` — **크기로만** 강조하고 색을 바꾸지 않는다
- 구독이면 합계 아래에 주기 `매월 17일 · 다음 2026.10.17`(`--mp-size-meta`, `opacity: var(--mp-opacity-meta)`)

### 결제 수단
- `<fieldset>` + `<legend>결제 수단</legend>`, 선택지는 `radio`(사각, 안쪽 잉크 사각형)
- 줄 하나 = 라디오 + 이름(`카드`, `계좌이체`, `토스페이`) + 오른쪽 보조 정보(`**** 4242`, `opacity: var(--mp-opacity-meta)`)
- 줄 높이 최소 44px, 줄 사이 1px `--mp-line`. 선택한 줄만 아래에 입력칸을 펼친다

### 카드 입력
- `text-field` 네 개: 카드 번호(전체 폭) / 유효기간·CVC(반반) / 이름(선택)
- 속성: 번호 `inputmode="numeric" autocomplete="cc-number"`, 기간 `autocomplete="cc-exp" placeholder="MM/YY"`, CVC `autocomplete="cc-csc" inputmode="numeric" maxlength="4"`, 이름 `autocomplete="cc-name"`
- 번호는 4자리마다 공백을 자동으로 넣되, 붙여넣기·자동완성 값을 그대로 받는다
- PG가 제공하는 iframe 입력칸을 쓰면 가능한 범위에서 글꼴·1px 선·radius 0을 맞춘다(바꿀 수 없는 부분은 예외)

### 결제 버튼
- 화면에서 **강조(orange)는 이 버튼 하나**. 기본형: `button` 모양(1px `--mp-line-button`, 전체 폭, 여백 `0.9em 1.5em`) 안에 `■`(`--mp-accent`) + `12,000원 결제`
- 면형(선택): 배경 `--mp-accent`, 글자 `--mp-palette-slate`, 글자 크기 `--mp-size-title`(24px 이상)일 때만. 그보다 작으면 면형을 쓰지 않는다
- 버튼 글자에 **최종 금액**을 넣는다. 금액이 바뀌면 버튼 글자도 즉시 바뀐다
- 터미널 화면에서는 `[ 12,000원 결제 ]` 글자형(`text-action`)도 가능하나, 전체 폭·44px 높이를 지킨다

### 안내 한 줄
- 버튼 아래 `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`: `결제 정보는 저장하지 않습니다.` / `언제든 해지할 수 있습니다.` — 사실만, 한 문장(`microcopy`)
- 약관 동의가 필요하면 버튼 위 `checkbox` 한 줄(`구매 조건 확인`), 링크는 `link`

### 간편결제·스토어 버튼 (OS·제공사 예외)
- Apple Pay, Google Pay, 토스페이, 카카오페이, 네이버페이 버튼은 **각 제공사 브랜드 가이드 그대로** 둔다(둥근 모서리·브랜드 색·로고 허용). 바꾸지 않는다
- 위치: 결제 수단 목록 위, `--mp-bg` 위에 그대로. 주위에 1px 틀이나 반전 호버를 덧씌우지 않는다
- 제공사 버튼이 있어도 metaphr 결제 버튼의 orange ■ 규칙은 그대로다(제공사 색은 강조 개수에 세지 않는다)

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 요약 + 기본 수단 선택 + 버튼 활성(`■ 12,000원 결제`) |
| 입력 미완 | 버튼은 활성으로 둔다. 누르면 `form-validation`으로 첫 오류 칸에 포커스 |
| 버튼 호버·포커스 | 반전(배경 `--mp-ink`, 글자 `--mp-bg`), ■은 orange 유지 |
| 처리 중 | 버튼 `disabled` + `aria-busy="true"`, 글자 `결제하는 중` + `loading`의 ■■■, 입력칸·라디오 `disabled`, 다시 누를 수 없음 |
| 3-D 인증·제공사 창 | 제공사 화면(OS·제공사 예외). 돌아오면 처리 중 상태 유지 |
| 성공 | 결제 화면을 결과 화면으로 교체: `결제했습니다` + 금액·수단·일시 `key-value` + `[ 주문 보기 ]` |
| 실패(재시도 가능) | 버튼 위 `banner`: ■ + `카드 승인이 거절되었습니다. 다른 수단을 골라 주세요.` 입력값 유지, 버튼 다시 활성 |
| 실패(확인 불가) | 네트워크 끊김 등 결과를 모르면 재결제를 막고 `error-state`: `결제 결과를 확인하지 못했습니다. 주문 내역을 확인해 주세요.` |
| 비활성 | 품절·금액 0원: 버튼 `disabled`, `opacity: var(--mp-opacity-muted)` |

실패 상태에서는 결제 버튼의 ■ 대신 배너의 ■이 강조가 된다(화면당 강조 하나). 버튼 ■은 잉크로 바꾼다.

## 동작
### 모션
- 버튼 반전 `invert-hover`(`--mp-duration-hover` ease), 누름 `press`(1px 이동).
- 처리 중 ■■■은 `loading`과 같다: `--mp-duration-caret` `steps(1, end)`, 칸마다 0.4s 지연. reduced-motion이면 세 칸 켜진 채 정지.
- 결과 화면으로의 전환은 즉시. 금액 숫자가 굴러가는 애니메이션 금지.

### 이중 결제 방지
- 첫 제출 즉시 버튼·폼을 잠근다(`disabled` + 내부 플래그). 서버 요청에는 주문마다 고유 키(idempotency key)를 붙인다.
- 처리 중 뒤로 가기·새로고침은 `beforeunload`로 한 번 묻는다.

### 키보드·접근성
- 요약 `<dl>`, 수단 `<fieldset>`/`<legend>`, 카드 입력 `<fieldset>`/`<legend>카드 정보</legend>`.
- 모든 칸에 보이는 `<label>`. placeholder(`MM/YY`)는 형식 힌트일 뿐이다.
- 오류 칸 `aria-invalid="true"` + `aria-describedby`로 메시지 연결, 제출 시 첫 오류 칸에 포커스.
- 처리 상태는 폼 안 `<p role="status" aria-live="polite">`에 `결제하는 중` → `결제했습니다`로 알린다. 실패 배너는 `role="alert"`.
- 결제 버튼 접근 이름에 금액 포함(`12,000원 결제`). ■은 `aria-hidden="true"`.
- 색에 기대지 않는다: 합계는 크기, 선택은 라디오 모양, 오류는 ■ + 문장. Enter = 폼 제출(처리 중에는 무시).

### 반응형
- 700px 이하: 한 줄 단, 좌우 `--mp-gutter`, 결제 버튼 전체 폭. 모바일에서 결제 버튼을 화면 아래 고정하면 합계 금액이 버튼 안에 있어야 한다. 700–860px은 한 단, 최대 폭 `--mp-width-read`.
- 860px 이상: 두 단. 왼쪽 수단·입력(1fr), 오른쪽 요약·버튼(`18em`, `position: sticky; top: 1.5em`).
- 입력 글자는 iOS 확대 방지를 위해 좁은 화면에서 `--mp-size-subheading`(24px, 12px 격자의 2×).

## 데모
```html demo
<form class="mp-payment">
  <dl class="mp-payment-summary">
    <div><dt>상품</dt><dd>10,000원</dd></div>
    <div><dt>배송</dt><dd>2,000원</dd></div>
    <div class="is-total"><dt>합계</dt><dd>12,000원</dd></div>
  </dl>
  <fieldset class="mp-payment-method">
    <legend>수단</legend>
    <label><input type="radio" name="mp-payment-m" checked><span>카드</span></label>
    <label><input type="radio" name="mp-payment-m"><span>계좌</span></label>
  </fieldset>
  <button class="mp-payment-pay" type="button"><span class="mp-payment-mark" aria-hidden="true">■</span>12,000원 결제</button>
  <button class="mp-payment-pay is-busy" type="button" disabled aria-busy="true">결제 중<span class="mp-payment-cells" aria-hidden="true"><span>■</span><span>■</span><span>■</span></span></button>
</form>
```

## 코드
```css
.mp-payment { display: grid; gap: 1.4em; max-width: 22em; font: 400 var(--mp-size-small) / 1.5 var(--mp-font); letter-spacing: var(--mp-tracking-small); color: var(--mp-ink); }
.mp-payment-summary { display: grid; gap: 0.5em; margin: 0; }
.mp-payment-summary > div { display: flex; justify-content: space-between; align-items: baseline; gap: 1em; }
.mp-payment-summary dt { opacity: var(--mp-opacity-secondary); }
.mp-payment-summary dd { margin: 0; text-align: right; font-variant-numeric: tabular-nums; }
.mp-payment-summary .is-total { margin-top: 0.3em; padding-top: 0.8em; border-top: var(--mp-border) solid var(--mp-line); }
.mp-payment-summary .is-total dd { font-size: var(--mp-size-heading); letter-spacing: var(--mp-tracking-heading); }
.mp-payment-method { display: grid; margin: 0; padding: 0; border: 0; }
.mp-payment-method legend { padding: 0 0 0.5em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-payment-method label { display: flex; align-items: center; gap: 0.6em; min-height: 44px; border-top: var(--mp-border) solid var(--mp-line); cursor: pointer; }
.mp-payment-method label:last-child { border-bottom: var(--mp-border) solid var(--mp-line); }
.mp-payment-method input { appearance: none; -webkit-appearance: none; margin: 0; flex: none; width: 1em; height: 1em; padding: 3px; border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0; background: transparent; background-clip: content-box; cursor: pointer; }
.mp-payment-method input:checked { background-color: var(--mp-ink); border-color: var(--mp-ink); }
.mp-payment-method input:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-payment-pay { display: flex; justify-content: center; align-items: center; gap: 0.5em; width: 100%; min-height: 44px; padding: 0.9em 1.5em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0; background: transparent; color: var(--mp-ink); font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small); font-variant-numeric: tabular-nums; cursor: pointer; transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease; }
.mp-payment-pay:hover:not(:disabled), .mp-payment-pay:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-payment-pay:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-payment-pay:active:not(:disabled) { transform: translateY(1px); }
.mp-payment-pay:disabled { cursor: not-allowed; }
.mp-payment-pay:disabled:not(.is-busy) { opacity: var(--mp-opacity-muted); }
.mp-payment-mark { color: var(--mp-accent); } /* 강조 — 화면당 하나 */
.mp-payment-cells { display: inline-flex; gap: 0.2em; }
.mp-payment-cells span { opacity: var(--mp-opacity-muted); animation: mp-payment-step var(--mp-duration-caret) steps(1, end) infinite; }
.mp-payment-cells span:nth-child(2) { animation-delay: 0.4s; }
.mp-payment-cells span:nth-child(3) { animation-delay: 0.8s; }
@keyframes mp-payment-step { 0% { opacity: 1; } 33.34% { opacity: var(--mp-opacity-muted); } }
/* 면형 결제 버튼 — 글자 24px 이상일 때만 */
.mp-payment-pay.is-face { background: var(--mp-accent); color: var(--mp-palette-slate); font-size: var(--mp-size-title); border-color: var(--mp-accent); }
@media (min-width: 860px) { .mp-payment-layout { display: grid; grid-template-columns: 1fr 18em; gap: 3em; align-items: start; } .mp-payment-layout .mp-payment-aside { position: sticky; top: 1.5em; } }
@media (prefers-reduced-motion: reduce) { .mp-payment-pay { transition: none; } .mp-payment-cells span { animation: none; opacity: 1; } }
```

```js
// 한 번만 제출: 잠그고 처리 중 표시 → 'mp:pay' 이벤트로 실제 결제를 맡기고 done(ok, message)로 끝낸다
(() => {
  document.querySelectorAll('form.mp-payment').forEach((form) => {
    const pay = form.querySelector('.mp-payment-pay:not(.is-busy)');
    const status = form.querySelector('[role="status"]');
    if (!pay) return;
    const label = pay.innerHTML;
    let busy = false;
    const lock = (on) => {
      busy = on;
      form.querySelectorAll('input, select, button').forEach((el) => { el.disabled = on; });
      pay.setAttribute('aria-busy', String(on));
      pay.innerHTML = on ? '결제하는 중<span class="mp-payment-cells" aria-hidden="true"><span>■</span><span>■</span><span>■</span></span>' : label;
      if (status) status.textContent = on ? '결제하는 중' : '';
    };
    const guard = (e) => { if (busy) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', guard);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (busy) return;
      const bad = form.querySelector(':invalid');
      if (bad) { bad.setAttribute('aria-invalid', 'true'); bad.focus(); return; }
      lock(true);
      const done = (ok, message) => {
        lock(false);
        if (status) status.textContent = message || (ok ? '결제했습니다' : '');
        form.dispatchEvent(new CustomEvent(ok ? 'mp:pay-success' : 'mp:pay-error', { bubbles: true, detail: { message } }));
      };
      form.dispatchEvent(new CustomEvent('mp:pay', { bubbles: true, detail: { done } }));
    });
  });
})();
```
마크업: 폼 안에 `<p class="mp-payment-status" role="status" aria-live="polite"></p>`를 둔다. 성공이면 결과 화면으로 교체하고, 결과를 모르는 실패면 버튼을 다시 열지 말고 `error-state`로 바꾼다.

## 앱
- SwiftUI: `Form` 대신 `ScrollView` + `VStack(spacing: 0)`로 그린다. 금액 `Text(amount, format: .currency(code: "KRW"))`는 `.monospacedDigit()`, 합계는 heading 크기. 카드 칸 `.textContentType(.creditCardNumber)`, `.keyboardType(.numberPad)`; 유효기간 `.creditCardExpiration`, CVC `.creditCardSecurityCode`(iOS 17+). 결제 버튼 `.disabled(isPaying)`, 처리 중 `.accessibilityLabel("결제하는 중")`, 결과는 `AccessibilityNotification.Announcement`. Apple Pay는 `PayWithApplePayButton`(PassKit) 그대로 — 모양·색 OS 예외.
- Compose: `Column(Modifier.verticalScroll())`, 금액 `fontFeatureSettings = "tnum"`. 카드 칸 `Modifier.semantics { contentType = ContentType.CreditCardNumber }`, `KeyboardOptions(keyboardType = KeyboardType.Number)`. 결제 버튼 `enabled = !isPaying`, 상태 `Modifier.semantics { liveRegion = LiveRegionMode.Polite }`. Google Pay는 `PayButton`(compose-pay-button) 그대로 — 제공사 예외.
- 인앱 디지털 상품·구독: iOS `StoreKit`(`Product.purchase()`), Android `BillingClient.launchBillingFlow` 시스템 시트를 쓴다. 앞 화면의 금액·주기 표기만 이 문서를 따른다.
- 토스페이·카카오페이 SDK 화면·버튼은 제공사 가이드 그대로(OS·제공사 예외).
- 앱에서 결제 결과는 푸시가 아니라 화면 전환으로 먼저 알린다. 햅틱은 성공 1회(`.success`)만.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 결제 버튼에 최종 금액을 적는다. 금액·주기·다음 결제일을 버튼 누르기 전에 모두 보여 준다. 합계는 `--mp-size-heading` 크기로만 강조하고, 금액은 오른쪽 정렬 고정폭 숫자로 맞춘다. orange ■은 결제 버튼 하나(실패 시에는 배너 ■ 하나)에만. 첫 제출에서 즉시 잠그고, 서버에는 주문 고유 키를 보낸다. `autocomplete="cc-*"`와 숫자 키패드를 붙이고, 붙여넣기·자동완성을 막지 않는다. 실패 문구는 원인 + 해결, 결과를 모르면 재결제 대신 확인 경로. 제공사 결제 버튼은 브랜드 가이드 그대로 `--mp-bg` 위에 둔다.
- 하지 말 것: 합계 금액을 orange·teal 글자로 칠하기, 할인 금액을 빨간 글자로. 결제 버튼 여러 개에 강조, 버튼 글자 `결제하기`만 쓰고 금액 숨기기. 처리 중 버튼을 다시 누를 수 있게 두기, 결과를 모르는데 `[ 다시 시도 ]` 주기. 자물쇠 이모지·방패 일러스트로 안심시키기, 긴 보안 문구 문단. 카드 번호를 칸 네 개로 쪼개기, 붙여넣기 막기. 제공사 버튼을 직각·잉크색으로 다시 그리기, 인앱 결제를 자체 폼으로 대신하기. 금액이 굴러가거나 성공 폭죽 같은 애니메이션.
