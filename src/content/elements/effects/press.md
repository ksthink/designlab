---
id: press
name: 누름
nameEn: Press
category: effects
summary: 누르는 순간 요소가 1px 아래로 내려간다. 그림자·축소·리플 없이 즉시.
aliases: [누름, 눌림, 클릭 효과, 탭 효과, 터치 피드백, 버튼 눌림, press, pressed, active state, tap feedback, click effect, touch feedback, 이펙트, 효과, effect, 리플, ripple]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-bg, --mp-line-button, --mp-border, --mp-opacity-muted, --mp-size-small, --mp-tracking-small]
effects: [invert-hover]
related: [button, icon-button, fab, text-action, chip, invert-hover]
---

## 용도
행동을 실행하는 요소(버튼, 아이콘 버튼, 텍스트 버튼, FAB, 칩, 스테퍼 +/-)의 눌림 피드백에 쓴다.
링크·카드 전체 링크·목록 행 이동에는 쓰지 않는다. 이동은 누름 표시 없이 바로 일어난다.
오래된 기계식 버튼이 한 칸 들어가는 느낌을 픽셀 한 칸으로 옮긴 것이다. 그림자가 없으므로 위치 1px가 유일한 깊이 표현이다.

## 생김새
- `:active`(누르는 동안)에서 `transform: translateY(1px)` — 정확히 1px, 아래로만.
- 전환 없음: `transition`에 `transform`을 넣지 않는다. 누르는 순간 내려가고 떼는 순간 돌아온다.
- 호버 반전(`invert-hover`)과 겹친다: 눌린 동안 반전 + 1px. 터치 기기에서는 반전도 눌린 동안만.
- 요소 크기·padding·글자 크기는 그대로. 레이아웃 이동이 생기지 않게 `transform`만 쓴다(`margin`·`top` 변경 금지).
- 같은 줄의 다른 요소는 움직이지 않는다.
- `scale(0.97)` 축소, 그림자 줄이기, 리플·물결, 밝기 변화 없음.
- **리플(ripple)을 쓰지 않는다.** Material의 물결 번지는 눌림 효과 대신 이 1px 이동이 metaphr의 눌림 표시다. 라이브러리 기본 리플은 끈다(Compose `indication = null`, MUI `disableRipple`).

**키보드**
- `button` 요소는 Space를 누르는 동안 `:active`가 걸리고 Enter는 즉시 실행된다. 브라우저 기본 동작을 그대로 둔다.
- `role="button"`을 단 비버튼 요소는 Space `keydown`에 `.is-pressed`를 붙이고 `keyup`에서 떼며 실행한다. 가능하면 `<button>`을 쓴다.

**접근성**
- 누름 표시는 보조 피드백이다. 실행 결과(상태 메시지, 화면 변화)가 주 피드백이다.
- 토글 버튼의 "눌린 상태 유지"는 1px 이동이 아니라 `aria-pressed="true"` + teal 면 또는 `■` 표시로 한다. 1px 차이는 지속 상태로 알아보기 어렵다.
- 비활성(`disabled`, `aria-disabled="true"`)은 이동하지 않는다.

**반응형·입력 방식**
- 포인터·터치·펜 모두 같다. 터치에서 스크롤을 시작하면 브라우저가 `:active`를 풀어 준다.
- iOS Safari에서 `:active`가 걸리지 않으면 `document.addEventListener('touchstart', () => {}, { passive: true })` 한 줄로 활성화한다.

## 상태
| 상태 | 위치 | 면 |
|---|---|---|
| 기본 | 제자리 | 투명 |
| 호버 (hover 기기) | 제자리 | 반전 |
| 누름 | 1px 아래 | 반전 |
| 키보드 Space 누름 | 1px 아래 | 반전 + 포커스 링 |
| 토글 켜짐 (`aria-pressed`) | 제자리 | teal 면 |
| 비활성 | 제자리 | 투명, opacity `--mp-opacity-muted` |

## 동작
- 즉시 바뀌는 상태 변화라 움직임 줄이기 설정에서도 그대로 둔다(1px 위치 변화는 애니메이션이 아니다). 반전의 transition만 끈다.

## 데모
```html demo
<div class="mp-press-row">
  <span class="mp-press">가</span>
  <span class="mp-press is-pressed">가</span>
  <span class="mp-press is-toggled">가</span>
  <span class="mp-press is-disabled">가</span>
</div>
```

## 코드
```css
.mp-press-row { display: flex; gap: 0.8em; align-items: flex-start; }
.mp-press {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.75em 1.5em; line-height: 1;
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  cursor: pointer; user-select: none;
  transition: background-color var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease; /* transform은 넣지 않는다 */
}
.mp-press:active, .mp-press.is-pressed { transform: translateY(1px); background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
.mp-press[aria-pressed="true"], .mp-press.is-toggled { background: var(--mp-secondary); color: var(--mp-palette-slate); border-color: var(--mp-secondary); }
.mp-press:disabled, .mp-press[aria-disabled="true"], .mp-press.is-disabled { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-press:disabled:active, .mp-press[aria-disabled="true"]:active { transform: none; background: transparent; color: var(--mp-ink); border-color: var(--mp-line-button); }
@media (prefers-reduced-motion: reduce) { .mp-press { transition: none; } }
```

```js
// role="button"인 비버튼 요소에 Space 누름 표시 (가능하면 <button>을 쓴다)
document.querySelectorAll('[role="button"].mp-press').forEach((el) => {
  el.addEventListener('keydown', (e) => { if (e.key === ' ') { e.preventDefault(); el.classList.add('is-pressed'); } });
  el.addEventListener('keyup', (e) => { if (e.key === ' ') { el.classList.remove('is-pressed'); el.click(); } });
  el.addEventListener('blur', () => el.classList.remove('is-pressed'));
});
```

## 앱
- SwiftUI `ButtonStyle`: `configuration.label.offset(y: configuration.isPressed ? 1 : 0).background(configuration.isPressed ? ink : .clear).foregroundStyle(configuration.isPressed ? bg : ink)`. `.animation(nil, value: configuration.isPressed)`로 트윈을 막는다. 기본 `.opacity` 눌림 효과가 섞이지 않게 `.buttonStyle(.plain)` 대신 이 스타일을 쓴다.
- Compose: `val pressed by interactionSource.collectIsPressedAsState()`, `Modifier.offset(y = if (pressed) 1.dp else 0.dp)`, `clickable(interactionSource, indication = null)`로 리플을 끈다.
- 햅틱: 일반 버튼에는 없음. 되돌릴 수 없는 행동의 최종 확인에만 `UIImpactFeedbackGenerator(style: .light)` / `HapticFeedbackType.LongPress` 한 번.
- OS 예외: 시스템 알림창·시트·내비게이션 바 버튼의 눌림 표시는 OS 모양.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 1px, 아래로, 즉시, 반전과 함께. `transform`만 사용. 토글 유지 상태는 `aria-pressed` + teal 면. 비활성은 움직이지 않는다.
- 하지 말 것: 축소·확대, 그림자 변화, 리플·물결, 밝기·opacity 눌림, 눌림 트윈, 2px 이상 이동, 링크·카드 이동에 누름 표시, 레이아웃이 밀리는 margin 변경.
