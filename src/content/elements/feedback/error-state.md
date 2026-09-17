---
id: error-state
name: 오류 상태
nameEn: Error state
category: feedback
summary: 화면이나 목록을 불러오지 못했을 때 그 자리에 강조 ■ 하나와 원인·해결 두 줄, [ 다시 시도 ]를 둔다.
aliases: [오류 상태, 에러 화면, 불러오기 실패, 연결 실패, 404, 500, 문제 발생, 페이지 없음, 권한 없음, error state, error page, failed to load, not found, offline, server error]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-ink, --mp-bg, --mp-accent, --mp-line, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-size-hero, --mp-tracking-hero, --mp-opacity-body, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-kicker, --mp-duration-hover, --mp-duration-caret]
effects: [invert-hover, caret, reduced-motion]
related: [empty-state, banner, form-validation, microcopy, text-action, loading]
---

## 용도
화면 전체나 한 영역의 내용을 **가져오지 못했을 때** 그 자리에 둔다.
- 입력이 틀렸으면 `form-validation`, 화면은 보이되 일부 기능·연결만 안 되면 `banner`, 결과가 0개면 `empty-state`.
- 두 크기: **영역 오류**(목록·카드 자리) / **페이지 오류**(404·500·권한 없음, 화면 전체).

## 생김새
공통:
- 영역 오류는 `empty-state`와 같은 자리·폭·틀(1px `--mp-line`, radius 0, 여백 `2.4em 1.5em`), 모눈 없이 빈 배경 — 빈 상태와 한눈에 구분
- 첫 줄 앞 `■` `--mp-accent`, `margin-right: 0.5em` — **이 화면의 강조 하나**. ■에는 opacity를 주지 않는다
- 첫 줄 = **원인**: `--mp-size-body`, 글자 `--mp-ink`, 글자에만 `opacity: var(--mp-opacity-body)`. orange 글자 금지
- 둘째 줄 = **해결**: `--mp-size-small`, `opacity: var(--mp-opacity-secondary)`
- 행동 하나: `text-action` `[ 다시 시도 ]`, 호버·포커스 반전
- 오류 코드(선택): `ERR 503`, `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`, 맨 아래. 지원 문의에 필요한 경우만

페이지 오류:
- 큰 코드 `404` + 커서 `_`: `--mp-size-hero`, `--mp-tracking-hero`, 커서 `opacity: var(--mp-opacity-kicker)` 깜빡임(`caret`)
- 아래 원인·해결 두 줄(■는 원인 줄 앞), 행동은 이동 링크 `< 처음으로`
- 틀 없이 페이지 가운데 정렬, 헤더·푸터는 유지

문구(원인 — 해결, 합쇼체):
- 연결: `목록을 불러오지 못했습니다.` / `연결을 확인한 뒤 다시 시도해 주세요.`
- 404: `페이지를 찾을 수 없습니다.` / `주소를 확인하거나 처음으로 돌아가 주세요.`
- 권한: `볼 수 있는 권한이 없습니다.` / `로그인 상태를 확인해 주세요.`
- 서버: `잠시 문제가 생겼습니다.` / `잠시 뒤 다시 시도해 주세요.`

## 상태
| 상태 | ■ | 행동 | 비고 |
|---|---|---|---|
| 영역 실패 | 강조 | `[ 다시 시도 ]` | `role="alert"` |
| 다시 시도 중 | 강조 유지 | 행동 자리를 `loading` 세 칸으로 교체 | 틀·문구 유지(자리 튐 없음) |
| 다시 실패 | 강조 | `[ 다시 시도 ]` 복귀 | 3회 실패 시 해결 줄을 `잠시 뒤 다시 시도해 주세요.`로 |
| 성공 | — | — | 즉시 내용으로 교체 |
| 404·권한 없음 | 강조 | 이동 링크 | 다시 시도 없음 |
| 화면에 다른 강조 있음 | 잉크 ■로 낮춤 | — | 강조는 화면당 하나 |
| 행동 호버·포커스 | — | 반전 + 1px 잉크 윤곽선 offset 3px | — |

## 동작
### 모션
- 나타남은 즉시. 흔들기·튀기 없음. 행동 버튼 반전만 `--mp-duration-hover` ease.
- 페이지 오류의 `_` 커서: `var(--mp-duration-caret) steps(1, end) infinite`.
- `prefers-reduced-motion: reduce`이면 커서 정지(보이는 상태), 반전 전환 없음.

### 키보드·접근성
- 영역 오류가 사용자 동작 뒤에 나타나면 `role="alert"`. 페이지를 열 때부터 오류(404)라면 역할 없이 `<h1>`에 원인 문구를 두고 `<title>`도 `페이지를 찾을 수 없습니다 — …`.
- ■·커서는 `aria-hidden="true"`.
- 다시 시도 버튼 `aria-label="다시 시도"`. 누르면 `aria-busy="true"` 후 결과에 따라 포커스: 성공 → 내용 첫 제목, 실패 → 다시 시도 버튼.
- 사용자 동작으로 생긴 영역 오류는 포커스를 옮기지 않는다(alert가 읽어 준다).
- HTTP 상태 코드는 서버에서 정확히(404 페이지가 200을 돌려주지 않게).

### 반응형
- 폭 480px 이하: 영역 여백 `1.8em 1em`, 페이지 오류 코드는 `--mp-size-hero`가 clamp로 자동 축소.
- 오류 코드 줄은 좁은 화면에서도 한 줄(`white-space: nowrap`).

## 데모
```html demo
<div class="mp-error-state-demo">
  <div class="mp-error-state">
    <p class="mp-error-state-cause"><span class="mp-error-state-mark" aria-hidden="true">■</span><span class="mp-error-state-text">실패</span></p>
    <button class="mp-error-state-action" type="button" aria-label="다시 시도">[ 재시도 ]</button>
    <span class="mp-error-state-code">ERR 503</span>
  </div>
  <div class="mp-error-state is-page">
    <p class="mp-error-state-big">404<span class="mp-error-state-caret" aria-hidden="true">_</span></p>
    <a class="mp-error-state-action" href="#">&lt; 처음</a>
  </div>
</div>
```

## 코드
```css
.mp-error-state-demo { display: grid; grid-template-columns: repeat(auto-fit, minmax(10em, 1fr)); gap: 1em; }
.mp-error-state {
  display: grid; justify-items: center; align-content: center; gap: 0.6em;
  padding: 2.4em 1.5em; text-align: center; color: var(--mp-ink);
  border: var(--mp-border) solid var(--mp-line); border-radius: 0;
}
.mp-error-state.is-page { border-color: transparent; }
.mp-error-state p { margin: 0; max-width: 24em; }
.mp-error-state-cause { font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body); }
.mp-error-state-text { opacity: var(--mp-opacity-body); }
.mp-error-state-mark { margin-right: 0.5em; color: var(--mp-accent); } /* 강조 — 화면당 하나 */
.mp-error-state-fix { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-error-state-action {
  margin-top: 0.8em; padding: 0.2em 0.4em; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-small) / 1.5 var(--mp-font); letter-spacing: var(--mp-tracking-small); cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-error-state-action:hover, .mp-error-state-action:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-error-state-action:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-error-state-code { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); white-space: nowrap; }
.mp-error-state-big { font-size: var(--mp-size-hero); letter-spacing: var(--mp-tracking-hero); line-height: 1.1; }
.mp-error-state-caret { opacity: var(--mp-opacity-kicker); animation: mp-error-state-caret var(--mp-duration-caret) steps(1, end) infinite; }
@keyframes mp-error-state-caret { 50% { opacity: 0; } }
@media (max-width: 480px) { .mp-error-state { padding: 1.8em 1em; } }
@media (prefers-reduced-motion: reduce) { .mp-error-state-action { transition: none; } .mp-error-state-caret { animation: none; } }
```

## 앱
- SwiftUI: 목록 자리에 같은 구성의 `VStack(spacing: 8)`, ■은 `Rectangle().fill(accent).frame(width: 8, height: 8)`. 불러오기 실패를 시스템 `.alert`로 띄우지 않는다(목록 자리에 둔다). `AccessibilityNotification.Announcement("목록을 불러오지 못했습니다")`.
- Compose: 같은 구성의 `Column`, 루트에 `Modifier.semantics { liveRegion = LiveRegionMode.Assertive }`.
- 오프라인이 원인이면 영역 오류 대신 캐시된 내용 + `banner`를 우선한다.
- OS 예외: 권한 거절 뒤 설정 앱 이동 확인은 시스템 대화상자, 웹뷰 네트워크 오류 페이지는 가능하면 직접 그린 화면으로 대체.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 원인 — 해결 두 줄, 행동 하나. 다시 시도 중에는 같은 자리에서 `loading`. 강조 ■ 하나, 글자는 잉크. 404는 올바른 상태 코드로.
- 하지 말 것: orange·빨강 글자, 경고 삼각형·이모지, 스택 추적·기술 오류 문장을 그대로, 사과만 하고 해결이 없는 문구, 강조 ■을 옅게 하기, 흔들기 애니메이션, 실패를 빈 상태로 위장, 목록 불러오기 실패를 시스템 알림창으로.
