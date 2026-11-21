---
id: text-field
name: 텍스트 입력
nameEn: Text field
category: inputs
summary: 한 줄 글자를 받는 1px 테두리 사각 칸. 포커스하면 선이 진해지고 잉크 윤곽선이 3px 떨어져 생긴다.
aliases: [텍스트 입력, 입력칸, 인풋, 입력 필드, 텍스트필드, input, text input, textfield, form field, 이메일 입력, 비밀번호 입력, 로그인 입력]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-accent, --mp-line, --mp-line-strong, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-muted, --mp-opacity-meta, --mp-opacity-body, --mp-duration-hover]
effects: [reduced-motion]
related: [textarea, search-field, form-validation, focus-ring, select, labels-numbers]
---

## 용도
이름·이메일·비밀번호·숫자처럼 **한 줄 값**을 받을 때 쓴다.
- 여러 줄 글이면 `textarea`, 목록 거르기·검색이면 `search-field`, 정해진 선택지면 `select`·`radio`, 날짜면 `date-picker`를 쓴다.
- 라벨은 항상 칸 위에 보이게 둔다. placeholder를 라벨 대신 쓰지 않는다(입력하면 사라져 무엇을 쓰는 칸인지 잃는다).
- 한 화면에 칸이 많으면 묶음마다 제목을 두고, 한 묶음은 5칸 이하로 줄인다(빼고 덜어내기).

## 생김새
- 구조: `라벨` → `칸` → `도움말/오류 줄`, 세로로 쌓고 간격 `0.5em`. 칸과 칸 사이(다음 필드) `1.6em`
- 라벨: `--mp-size-small`, `--mp-tracking-small`, `opacity: var(--mp-opacity-secondary)`. 필수 여부는 라벨 뒤 `(필수)` 또는 선택 칸에 `(선택)` — 적은 쪽 하나만 표시한다
- 터미널 느낌이 맞는 화면(로그인, 설정)에서는 라벨 앞에 `> `를 붙일 수 있다(`>`는 `aria-hidden`)
- 칸
  - 전체 테두리 `var(--mp-border) solid var(--mp-line-button)`(조작 요소 경계 3:1), `border-radius: 0`, 배경 투명
  - 글자 `--mp-size-body` / `--mp-tracking-body`, 행간 `1.4`, 색 `--mp-ink`
  - 안쪽 여백 `0.7em 0.9em` → 높이 약 `2.8em`(터치 44px 이상 확보)
  - 폭: 값 길이에 맞춘다. 이메일·이름 `max-width: 22em`, 숫자 4자리 `6em`, 인증번호 6자리 `8em`
  - placeholder: 예시 값만(`name@metaphr.dev`), `color: var(--mp-ink)` + `opacity: var(--mp-opacity-secondary)`
  - 커서 `caret-color: var(--mp-ink)`
- 조용한 화면(설정 목록 안)에서는 아래 선 하나(`border-width: 0 0 var(--mp-border)`)로 줄여도 된다. 한 화면 안에서 두 모양을 섞지 않는다
- 도움말 줄: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`. 오류 문구가 뜰 수 있으면 `min-height: 1.6em`으로 자리를 미리 잡는다
- 뒤쪽 부속(비밀번호 보기, 지우기 `×`, 단위 `MB`)은 칸 안 오른쪽, 오른쪽 여백을 `2.4em`로 늘린다

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line` 테두리 |
| 호버 | 테두리 `--mp-line-strong` (`--mp-duration-hover` ease) |
| 포커스 | 테두리 `--mp-line-strong` + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 입력됨 | 기본과 같다(값 자체가 표시) |
| 읽기 전용 | 테두리 없음(아래 선만), 배경 투명, 선택·복사 가능 |
| 비활성 | `opacity: var(--mp-opacity-muted)`, `cursor: not-allowed`, 호버 변화 없음 |
| 오류 | 테두리 `--mp-ink`, `aria-invalid="true"`, 아래 줄 `■` + 원인·해결 문구 — 첫 오류만 ■ `--mp-accent` (`form-validation`) |
| 자동완성됨 | 브라우저 노란 배경을 지운다(아래 코드의 `:autofill`) |

## 동작
### 모션
- 테두리 색만 `--mp-duration-hover` ease로 바뀐다. 떠오르는 라벨·밑줄이 늘어나는 애니메이션은 없다.
- 오류가 생겨도 칸을 흔들지 않는다. `prefers-reduced-motion: reduce`이면 transition 없음.

### 키보드·접근성
- `<label>`로 칸을 감싸거나 `for`/`id`로 연결한다. 도움말·오류 줄은 `aria-describedby`로 연결한다.
- 필수 칸은 `required`(또는 `aria-required="true"`), 오류는 `aria-invalid="true"`.
- 종류에 맞는 `type`·`inputmode`·`autocomplete`: 이메일 `type="email" autocomplete="email"`, 비밀번호 `autocomplete="current-password"`/`new-password`, 인증번호 `inputmode="numeric" autocomplete="one-time-code"`.
- Tab 순서는 화면에서 읽는 순서와 같다. Enter는 폼 제출(한 줄 칸의 기본 동작)을 막지 않는다.
- 비밀번호 보기 버튼은 `aria-pressed`와 `aria-label="비밀번호 보기"`.
- 포커스 윤곽선을 `outline: none`으로 지우지 않는다(`focus-ring`).

### 반응형
- 480px 이하에서 칸은 `width: 100%`, `max-width` 해제.
- iOS Safari는 16px 미만 글자의 칸에 포커스하면 화면을 확대한다. 좁은 화면에서는 `font-size: var(--mp-size-subheading)`(24px, 12px 격자의 2×)로 올린다. 16px은 격자에서 벗어나 글자가 깨진다.
- 라벨과 칸을 가로로 나란히 두는 배치는 폭 720px 이상에서만, 라벨 폭 `8em`.

## 데모
```html demo
<div class="mp-text-field-demo">
  <label class="mp-text-field"><span class="mp-text-field-label">이름</span><input class="mp-text-field-input" type="text"></label>
  <label class="mp-text-field"><span class="mp-text-field-label">메일</span><input class="mp-text-field-input is-focus" type="text" value="ks"></label>
  <label class="mp-text-field"><span class="mp-text-field-label">코드</span><input class="mp-text-field-input" type="text" value="12" aria-invalid="true"><span class="mp-text-field-msg is-error">오류</span></label>
  <label class="mp-text-field"><span class="mp-text-field-label">잠김</span><input class="mp-text-field-input" type="text" disabled></label>
</div>
```

## 코드
```css
.mp-text-field-demo { display: flex; flex-wrap: wrap; gap: 1.2em; align-items: start; }
.mp-text-field { display: grid; gap: 0.5em; width: 100%; max-width: 22em; }
.mp-text-field-demo .mp-text-field { max-width: 8em; }
.mp-text-field-label { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-text-field-input {
  width: 100%; margin: 0; padding: 0.7em 0.9em;
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink); caret-color: var(--mp-ink);
  font: 400 var(--mp-size-body) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-body);
  transition: border-color var(--mp-duration-hover) ease;
}
.mp-text-field-input::placeholder { color: var(--mp-ink); opacity: var(--mp-opacity-secondary); }
.mp-text-field-input:hover { border-color: var(--mp-line-strong); }
.mp-text-field-input:focus-visible, .mp-text-field-input.is-focus { border-color: var(--mp-line-strong); outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-text-field-input[aria-invalid="true"] { border-color: var(--mp-ink); }
.mp-text-field-input:disabled { opacity: var(--mp-opacity-muted); cursor: not-allowed; border-color: var(--mp-line); }
.mp-text-field-input:autofill { -webkit-text-fill-color: var(--mp-ink); transition: background-color 600000s 0s; }
.mp-text-field-msg { min-height: 1.6em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-text-field-msg.is-error { opacity: var(--mp-opacity-body); }
.mp-text-field-msg.is-error::before { content: "■"; margin-right: 0.4em; color: var(--mp-accent); } /* 첫 오류 하나만 */
@media (max-width: 480px) { .mp-text-field-input { font-size: var(--mp-size-subheading); } }
@media (prefers-reduced-motion: reduce) { .mp-text-field-input { transition: none; } }
```

## 앱
- SwiftUI: `TextField(...).textFieldStyle(.plain).padding(.horizontal, 12).frame(minHeight: 44).overlay(Rectangle().stroke(focused ? lineStrong : line, lineWidth: 1))`. 포커스는 `@FocusState`로, 윤곽선은 3pt 바깥에 1pt `Rectangle().stroke(ink)`를 `padding(-4)`로 겹친다.
- 종류: `.textContentType(.emailAddress)`, `.keyboardType(.emailAddress)`, `.textInputAutocapitalization(.never)`, 비밀번호는 `SecureField`.
- Compose: `BasicTextField(textStyle = TextStyle(fontFamily = Mulmaru, fontWeight = FontWeight.Normal), decorationBox = { Box(Modifier.border(1.dp, if (focused) lineStrong else line, RectangleShape).padding(12.dp)) { it() } })`. `OutlinedTextField`를 쓰면 `shape = RectangleShape`로 두고 떠오르는 라벨(`label =`) 대신 칸 위 `Text` 라벨을 쓴다.
- `KeyboardOptions(keyboardType = KeyboardType.Email, imeAction = ImeAction.Next)`로 다음 칸 이동.
- OS 예외: 키보드, 자동완성 막대, 비밀번호 제안·강력한 비밀번호 표시, 텍스트 선택 핸들은 시스템 모양 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 칸 위에 짧은 명사 라벨(`이메일`, `이름`).
- 해야 할 것: 입력 종류에 맞는 `type`·`inputmode`·`autocomplete`로 키보드와 자동완성을 돕는다.
- 해야 할 것: 오류 문구 자리를 미리 비워 레이아웃이 흔들리지 않게 한다.
- 해야 할 것: 값 길이에 맞는 칸 폭. 라이트·다크 모두 변수로.
- 하지 말 것: 둥근 칸, 안쪽 그림자, 회색 채운 배경 칸.
- 하지 말 것: 포커스 때 orange·teal 테두리, 오류 글자를 orange로.
- 하지 말 것: Material식 떠오르는 라벨, placeholder만 있는 칸, 칸 안 아이콘 장식.
- 하지 말 것: 입력 중에 오류를 띄우기(칸을 벗어날 때 확인한다), 칸 흔들기.
