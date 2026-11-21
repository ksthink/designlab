---
id: login-form
name: 로그인 폼
nameEn: Login form
category: patterns
summary: 이메일·비밀번호 두 칸과 [ 로그인 ] 하나로 된 터미널풍 인증 화면. 소셜 로그인은 1px 선 아래 제공사 버튼 그대로 쌓는다.
aliases: [로그인, 로그인 폼, 로그인 화면, 회원가입, 가입, sign in, sign up, login, auth, 인증, 비밀번호, 소셜 로그인, 이메일 인증, OTP, 매직 링크]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-accent, --mp-line, --mp-line-strong, --mp-line-button, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-muted, --mp-opacity-kicker, --mp-opacity-link, --mp-duration-hover, --mp-gutter]
effects: [invert-hover, press, caret, reduced-motion]
related: [text-field, form-validation, text-action, button, link, divider, terminal-vocabulary, microcopy, banner, loading, modal, bottom-sheet]
---

## 용도
계정에 들어가거나(로그인) 계정을 만들 때(가입) 쓴다. timeboard 로그인 화면의 `> ` 라벨과 `[ 로그인 ]` 버튼이 근거다.
- 로그인과 가입은 같은 틀을 쓰고 제목·버튼 글자·비밀번호 `autocomplete`만 바꾼다. 둘 사이 전환은 폼 아래 링크 한 줄.
- 이메일 인증번호(OTP)·매직 링크는 같은 틀의 두 번째 단계로 둔다.
- 앱 안에서 계정이 필요 없는 기능은 로그인 없이 쓰게 한다. 로그인 폼은 필요한 순간에 `modal`·`bottom-sheet`로 부른다.

## 생김새
- 폭: 최대 `22em`, 가운데. 세로 순서 **제목 → 칸 → 주 행동 → 보조 링크 → 또는 → 소셜 → 약관 링크 한 줄**(`--mp-size-meta`)
- 제목: 한 단어 `로그인` / `가입`(`--mp-size-body`). 부제·환영 문장 없음
- 칸 라벨: 칸 위, `--mp-size-small`, `opacity: var(--mp-opacity-secondary)`. 터미널풍이면 라벨 앞 `> `(`opacity: var(--mp-opacity-kicker)`, `aria-hidden`)
- 칸: `text-field`와 같다 — 1px `--mp-line`, radius 0, 여백 `0.7em 0.9em`, 글자 `--mp-size-body`(모바일 16px 이상)
- 칸 사이 `1.2em`, 각 칸 아래 오류 자리 `min-height: 1.6em`을 미리 비운다

### 이메일
- `type="email" autocomplete="username" inputmode="email" autocapitalize="off" spellcheck="false"`

### 비밀번호
- `type="password"`, 로그인 `autocomplete="current-password"`, 가입 `autocomplete="new-password"` + `minlength`
- 칸 오른쪽 안에 `[ 보기 ]` 글자 버튼(`--mp-size-meta`, `opacity: var(--mp-opacity-link)`), 누르면 `type="text"` + `[ 숨김 ]`, `aria-pressed="true"`
- 가입 시 규칙은 칸 아래 한 줄로 미리: `8자 이상`(`--mp-size-meta`, `opacity: var(--mp-opacity-meta)`). 강도 막대·색 신호등 없음

### 주 행동
- `[ 로그인 ]` / `[ 가입 ]`: `text-action` 글자형 또는 `button` 모양, 전체 폭, 최소 높이 44px
- 호버·포커스 반전. orange는 쓰지 않는다(주 행동이라도 강조 표시는 오류용으로 남긴다)

### 보조 링크
- 주 행동 아래 한 줄에 둘: 왼쪽 `비밀번호 찾기`, 오른쪽 `가입`(또는 `로그인`). `--mp-size-small`, `opacity: var(--mp-opacity-link)`, 호버 1

### 또는 + 소셜 로그인
- 1px `--mp-line` 가로선 가운데 `또는`(`--mp-size-meta`, `opacity: var(--mp-opacity-meta)`) — `divider`
- 소셜 버튼은 세로로 쌓고 사이 `0.6em`, 전체 폭. **Apple·Google·카카오·네이버 버튼은 각 제공사 브랜드 가이드 그대로**(둥근 모서리·브랜드 색·로고 허용 — 제공사 예외). `--mp-bg` 위에 그대로 두고 틀·반전 호버를 덧씌우지 않는다. 순서는 제공사 정책을 따른다(iOS 앱에서 다른 소셜 로그인을 제공하면 Sign in with Apple을 함께 둔다)

### 인증번호(OTP) 단계
- 칸 **하나**: `inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]*" maxlength="6"`, 가운데 정렬, 자간 `0.4em`
- 칸 여섯 개로 쪼개지 않는다. 디자인상 칸이 필요하면 한 입력 위에 1px 사각 6칸을 그려 보이기만 한다
- 아래 `[ 다시 받기 ]`(남은 시간 `0:42` 동안 비활성) + 받은 주소 `k***@metaphr.dev`

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 빈 칸 두 개, 첫 칸에 자동 포커스(데스크톱만) |
| 칸 포커스 | 테두리 `--mp-line-strong` + 1px 잉크 윤곽선 offset 3px |
| 칸 형식 오류 | 칸을 벗어날 때만: 테두리 `--mp-ink` + `■` + `이메일 형식이 아닙니다.` |
| 제출 중 | `[ 로그인 ]` → `로그인하는 중` + `loading` ■■■, 버튼 `disabled` + `aria-busy`, 칸 `readonly` |
| 인증 실패 | 폼 위 한 줄 ■(`--mp-accent`) + `이메일 또는 비밀번호가 맞지 않습니다.` — 어느 쪽이 틀렸는지 말하지 않는다. 비밀번호 칸 비우고 포커스 |
| 시도 제한 | `banner`: ■ + `시도가 많습니다. 5분 뒤 다시 시도해 주세요.` 남은 시간 표시, 버튼 비활성 |
| 계정 잠김 | `banner`: `계정이 잠겼습니다. 메일로 보낸 안내를 확인해 주세요.` + `[ 다시 보내기 ]` |
| 인증번호 보냄 | 두 번째 단계로 교체, 칸 포커스 |
| 인증번호 만료 | `인증번호가 만료되었습니다. 다시 받아 주세요.` + `[ 다시 받기 ]` 활성 |
| 매직 링크 보냄 | 칸 대신 `메일을 보냈습니다.` + 주소 + `[ 다시 보내기 ]`(60초 뒤 활성) |
| 성공 | 바로 원래 화면으로 이동. 환영 토스트 없음 |

orange ■은 화면에 하나: 인증 실패 줄 또는 첫 형식 오류 중 하나에만 쓰고, 나머지 오류 ■은 잉크.

## 동작
### 모션
- 버튼·링크 반전 `invert-hover`(`--mp-duration-hover`), 누름 `press`.
- 인증번호 칸이 비었을 때 placeholder 뒤 `_` 커서는 `caret`(`steps(1, end)`)으로 깜빡일 수 있다. reduced-motion이면 정지.
- 실패 시 폼을 흔들지 않는다. 단계 전환은 즉시.

### 검증 시점
- 형식 검사는 칸을 벗어날 때와 제출할 때. 입력 중에는 이미 오류인 칸만 다시 검사해 오류를 지운다.
- 빈 칸 제출: 첫 빈 칸에 `필수 항목입니다.`와 포커스.
- 서버 인증 실패는 형식 오류와 분리해 폼 위 한 줄로.

### 키보드·접근성
- `<form>` 안 `<label for>` + 칸. placeholder만 있는 칸 금지.
- 오류 칸 `aria-invalid="true"` + `aria-describedby`(오류 메시지와 규칙 안내를 공백으로 함께), 제출 시 첫 오류 칸에 포커스.
- 인증 실패 줄 `role="alert"`, 제출 중·인증번호 보냄 알림은 `role="status"`.
- `[ 보기 ]`는 `<button type="button" aria-pressed>`, 접근 이름 `비밀번호 보기`. 누른 뒤 포커스는 칸으로 돌려 커서 위치를 유지한다.
- Enter = 제출. Tab 순서 = 이메일 → 비밀번호 → 보기 → 로그인 → 비밀번호 찾기 → 가입 → 소셜.
- 비밀번호 관리자 호환: `name`·`id`·`autocomplete`를 표준대로, 칸을 JS로 늦게 만들지 않는다. **붙여넣기를 막지 않는다.**
- 패스키: 이메일 칸에 `autocomplete="username webauthn"`을 붙여 조건부 UI(자동완성 목록의 패스키)를 켠다. 별도 `[ 패스키로 로그인 ]`은 소셜 버튼 위 첫 줄에.
- CAPTCHA가 필요하면 시도 제한 뒤에만, 제공사 위젯 그대로(예외).

### 반응형
- 모든 폭에서 한 단. 좁은 화면은 좌우 `--mp-gutter`, 폼 폭 100%. 넓은 화면에서도 폭 `22em`을 넘기지 않는다.
- 모바일에서 키보드가 올라와도 주 행동이 보이게 폼을 위쪽에 둔다(세로 가운데 정렬 금지).
- 좁은 화면에서 칸 글자 `--mp-size-subheading`(24px, 12px 격자의 2×)로 iOS 확대 방지.

## 데모
```html demo
<form class="mp-login-form">
  <label class="mp-login-form-field"><span class="mp-login-form-label">이메일</span>
    <input type="email" autocomplete="username" value="ks@metaphr.dev"></label>
  <label class="mp-login-form-field"><span class="mp-login-form-label">비밀번호</span>
    <span class="mp-login-form-pw"><input type="password" autocomplete="current-password" value="metaphr"><button class="mp-login-form-toggle" type="button" aria-pressed="false" aria-label="비밀번호 보기">[ 보기 ]</button></span></label>
  <button class="mp-login-form-submit" type="button">[ 로그인 ]</button>
  <p class="mp-login-form-or"><span>또는</span></p>
</form>
```

## 코드
```css
.mp-login-form { display: grid; gap: 1.2em; max-width: 22em; font: 400 var(--mp-size-small) / 1.5 var(--mp-font); letter-spacing: var(--mp-tracking-small); color: var(--mp-ink); }
.mp-login-form-field { display: grid; gap: 0.5em; }
.mp-login-form-label { opacity: var(--mp-opacity-secondary); }
.mp-login-form-label.is-prompt::before { content: "> "; opacity: var(--mp-opacity-kicker); }
.mp-login-form input { width: 100%; padding: 0.7em 0.9em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0; background: transparent; color: var(--mp-ink); caret-color: var(--mp-ink); font: 400 var(--mp-size-body) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-body); }
.mp-login-form input:hover { border-color: var(--mp-line-strong); }
.mp-login-form input:focus-visible { border-color: var(--mp-line-strong); outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-login-form input[aria-invalid="true"] { border-color: var(--mp-ink); }
.mp-login-form-pw { position: relative; display: block; }
.mp-login-form-pw input { padding-right: 5.5em; }
.mp-login-form-toggle { position: absolute; right: 0.5em; top: 50%; transform: translateY(-50%); padding: 0.3em; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink); font: 400 var(--mp-size-meta) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-link); cursor: pointer; }
.mp-login-form-toggle:hover, .mp-login-form-toggle:focus-visible { opacity: 1; }
.mp-login-form-toggle:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 2px; }
.mp-login-form-submit { width: 100%; min-height: 44px; padding: 0.75em 1.5em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0; background: transparent; color: var(--mp-ink); font: inherit; cursor: pointer; transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease; }
.mp-login-form-submit:hover:not(:disabled), .mp-login-form-submit:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-login-form-submit:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-login-form-submit:active:not(:disabled) { transform: translateY(1px); }
.mp-login-form-submit:disabled { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-login-form-or { display: flex; align-items: center; gap: 0.8em; margin: 0; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); }
.mp-login-form-or::before, .mp-login-form-or::after { content: ""; flex: 1; border-top: var(--mp-border) solid var(--mp-line); }
.mp-login-form-or span { opacity: var(--mp-opacity-meta); }
.mp-login-form-error { min-height: 1.6em; margin: 0; }
.mp-login-form-error:not(:empty)::before { content: "■"; margin-right: 0.5em; color: var(--mp-ink); }
.mp-login-form-error.is-first::before { color: var(--mp-accent); } /* 강조 — 화면당 하나 */
.mp-login-form-otp { text-align: center; letter-spacing: 0.4em; font-variant-numeric: tabular-nums; }
@media (max-width: 480px) { .mp-login-form input { font-size: var(--mp-size-subheading); } }
@media (prefers-reduced-motion: reduce) { .mp-login-form-submit { transition: none; } }
```

```js
// 비밀번호 보기 전환 + 제출 시 첫 오류 칸 포커스 + 이중 제출 방지. 실제 인증은 'mp:login' 이벤트에서 done(ok, message)
(() => {
  document.querySelectorAll('form.mp-login-form').forEach((form) => {
    form.querySelectorAll('.mp-login-form-toggle').forEach((btn) => {
      const input = btn.parentElement && btn.parentElement.querySelector('input');
      if (!input) return;
      btn.addEventListener('click', () => {
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.textContent = show ? '[ 숨김 ]' : '[ 보기 ]';
        btn.setAttribute('aria-pressed', String(show));
        input.focus();
      });
    });
    const submit = form.querySelector('.mp-login-form-submit');
    const alertEl = form.querySelector('.mp-login-form-error[role="alert"]');
    if (!submit) return;
    const label = submit.textContent;
    let busy = false;
    form.noValidate = true;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (busy) return;
      const fields = [...form.querySelectorAll('input')];
      fields.forEach((f) => { if (f.checkValidity()) f.removeAttribute('aria-invalid'); else f.setAttribute('aria-invalid', 'true'); });
      const bad = fields.find((f) => !f.checkValidity());
      if (bad) { bad.focus(); return; }
      busy = true; submit.disabled = true; submit.setAttribute('aria-busy', 'true'); submit.textContent = '로그인하는 중';
      const done = (ok, message) => {
        busy = false; submit.disabled = false; submit.removeAttribute('aria-busy'); submit.textContent = label;
        if (ok) return;
        if (alertEl) { alertEl.textContent = message || '이메일 또는 비밀번호가 맞지 않습니다.'; alertEl.classList.add('is-first'); }
        const pw = form.querySelector('input[autocomplete="current-password"]');
        if (pw) { pw.value = ''; pw.focus(); }
      };
      form.dispatchEvent(new CustomEvent('mp:login', { bubbles: true, detail: { done } }));
    });
  });
})();
```
마크업: 폼 맨 위에 `<p class="mp-login-form-error" role="alert"></p>`를 둔다. 주 행동을 폼 제출로 쓰려면 버튼을 `type="submit"`으로 바꾼다(데모는 `type="button"`).

## 앱
- SwiftUI 이메일 `TextField` + `.textContentType(.username)` + `.keyboardType(.emailAddress)` + `.textInputAutocapitalization(.never)` + `.autocorrectionDisabled()`. 비밀번호 `SecureField` + `.textContentType(.password)`(가입은 `.newPassword`), 보기 전환은 `SecureField` ↔ `TextField` 교체. 인증번호 `.textContentType(.oneTimeCode)` + `.keyboardType(.numberPad)` — 시스템이 문자 속 코드를 제안한다. 패스키·Sign in with Apple: `ASAuthorizationController`(`ASAuthorizationPlatformPublicKeyCredentialProvider`), 버튼은 `SignInWithAppleButton` 그대로(OS 예외). 오류 알림 `AccessibilityNotification.Announcement`, 첫 오류 칸 `@FocusState`.
- Compose 칸 `Modifier.semantics { contentType = ContentType.Username }` / `ContentType.Password` / `ContentType.SmsOtpCode`, `KeyboardOptions(keyboardType = KeyboardType.Email, autoCorrectEnabled = false)`. 비밀번호 `visualTransformation = if (show) None else PasswordVisualTransformation()`. 로그인·패스키·Google 계정은 `CredentialManager.getCredential()`, Google 버튼은 제공사 가이드 그대로. 오류 줄 `Modifier.semantics { liveRegion = LiveRegionMode.Assertive }`, 첫 오류 칸 `FocusRequester`.
- OS 예외: 키보드 위 자동완성 막대, 비밀번호 저장 제안, 패스키 시트, 계정 선택 시트는 시스템 모양 그대로 둔다.
- 앱 안 웹 로그인(OAuth)은 `ASWebAuthenticationSession` / Custom Tabs를 쓰고 WebView에 비밀번호를 받지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 칸 위에 보이는 라벨, 표준 `autocomplete`(`username`, `current-password`, `new-password`, `one-time-code`). 인증 실패 문구는 하나로: `이메일 또는 비밀번호가 맞지 않습니다.` 계정 존재 여부를 드러내지 않는다. 시도 제한·잠김은 남은 시간과 할 일을 문장으로. 제출 중 버튼을 잠그고 글자를 `로그인하는 중`으로. 인증번호는 칸 하나, 숫자 키패드, 붙여넣기 허용. 소셜·패스키 버튼은 제공사 가이드 그대로, 1px `또는` 선 아래에. orange ■은 인증 실패 줄이나 첫 오류 하나에만.
- 하지 말 것: placeholder만 있는 칸, 비밀번호 붙여넣기 막기, 비밀번호 확인 칸 강요. `이메일이 존재하지 않습니다`처럼 어느 칸이 틀렸는지 알려 주기. 인증번호 칸 여섯 개로 포커스 옮겨 다니기(자동완성·붙여넣기 깨짐). 실패 시 폼 흔들기, 빨간 글자, orange 로그인 버튼. 환영 일러스트·긴 소개 문단, 로그인 성공 축하 토스트. 제공사 버튼을 직각·잉크색으로 다시 그리기, 로고를 픽셀로 바꾸기. 비밀번호 강도를 색 막대(빨강·노랑·초록)로 표시하기.
