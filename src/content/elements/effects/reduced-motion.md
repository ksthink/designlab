---
id: reduced-motion
name: 움직임 줄이기
nameEn: Reduced Motion
category: effects
summary: 사용자가 움직임 줄이기를 켜면 모든 애니메이션·전환을 멈추고 최종 상태만 보인다. 모든 효과의 필수 짝.
aliases: [움직임 줄이기, 동작 줄이기, 모션 끄기, 애니메이션 끄기, 접근성 모션, 멀미, reduced motion, prefers-reduced-motion, reduce motion, accessibility, vestibular, 이펙트, 효과, effect]
platforms: [web, ios, android]
status: extracted
source: "metaphr.dev index.html @media (prefers-reduced-motion: reduce) · REDUCE 분기"
pillars: [minimalism]
tokens: [--mp-opacity-kicker, --mp-duration-caret, --mp-line, --mp-border]
effects: []
related: [motion, float, caret, reveal, fx-fill, glyph-field, scramble, invert-hover]
---

## 용도
움직임이 있는 모든 화면에 반드시 넣는다. 효과 문서마다 이 규칙을 함께 적용한다.
기준은 "느리게"가 아니라 **멈춤**이다. 대신 정보는 하나도 빠지지 않아야 한다 — 숨어 있던 것은 보이고, 켜져야 할 것은 켜진 채로 멈춘다.
OS 설정(macOS·iOS "동작 줄이기", Windows "애니메이션 표시 끄기", Android "애니메이션 삭제")이 브라우저의 `prefers-reduced-motion: reduce`로 전달된다.

## 생김새
**CSS 세 겹**
1. 효과별 최종 상태: 각 효과 문서의 `@media (prefers-reduced-motion: reduce)` 블록(아래 표).
2. 스크롤: `html { scroll-behavior: auto; }` — 부드러운 앵커 스크롤도 끈다.
3. 안전망: 모든 요소의 `animation`·`transition`을 끈다. 요소별 최종 상태 지정 없이 안전망만 두면 `opacity: 0`으로 시작하는 요소가 숨은 채 남으므로 1을 대신하지 않는다.

**JS**
- 시작 전에 `matchMedia('(prefers-reduced-motion: reduce)').matches`를 확인한다.
- 참이면: 최종(또는 대표) 프레임 한 장만 그리고 타이머·`requestAnimationFrame`·`setInterval`을 시작하지 않는다. 포인터 이벤트 효과(스크램블)는 걸지 않는다.
- 페이지를 연 뒤 설정이 바뀔 수 있다. 오래 열어 두는 화면은 `change` 이벤트로 멈춤·재개한다.

**효과별 최종 상태**
| 효과 | 줄이기 설정일 때 |
|---|---|
| `float` | 정지, `transform` 없음 |
| `reveal` | 처음부터 보임 (`opacity: 1; transform: none`) |
| `caret` | 켜진 채 정지 (opacity `--mp-opacity-kicker`) |
| `invert-hover` | 즉시 반전 (transition 없음) |
| `fx-fill` | 즉시 가득 반전 |
| `glyph-field` | 정지 프레임 1장, 타이머 없음 |
| `scramble` | 효과 없음, 원문 |
| `press` | 그대로 (즉시 상태 변화라 모션이 아님) |
| 스크롤 힌트 왕복 | 정지 |
| 카드 호버 -3px | 이동 없음, 선만 진해짐 |

**줄이지 않는 것**
- 상태를 알리는 즉시 변화(반전, 1px 누름, 선 색 변화, 글자 교체)는 움직임이 아니므로 그대로 둔다.
- 진행 표시(`loading`의 `…` 계단)는 멈추되 "저장 중…" 글자는 남긴다. 진행 막대(`progress-bar`)는 값이 바뀔 때 즉시 갱신한다.

**접근성 근거**
- WCAG 2.3.3(상호작용으로 생기는 움직임을 끌 수 있어야 함), 2.2.2(5초 넘게 자동으로 움직이는 것은 멈출 수 있어야 함).
- 줄이기 설정이 없어도 5초 넘게 움직이는 장식(float, glyph-field)은 화면 밖·탭 숨김에서 멈춘다.

## 상태
| 상태 | 표현 |
|---|---|
| 설정 꺼짐 | 모든 효과 정상 |
| 설정 켜짐 (로드 때) | 최종 상태로 렌더, 타이머 없음 |
| 사용 중 켜짐 (`change`) | 진행 중 애니메이션 정지, 최종 상태로 |
| 사용 중 꺼짐 | 다음 상호작용·재진입부터 효과 재개 |

## 동작
- 화면 전환·모달은 원래 즉시이므로 바꿀 것이 없다.
- 테스트: 브라우저 개발자 도구의 렌더링 에뮬레이션(`prefers-reduced-motion: reduce`)으로 모든 화면을 확인한다. 숨은 채 남은 요소, 꺼진 채 멈춘 커서가 없어야 한다.

## 데모
```html demo
<div class="mp-reduced-motion">
  <span class="mp-reduced-motion-box mp-reduced-motion-live"><i>■</i></span>
  <span class="mp-reduced-motion-box"><i>■</i></span>
</div>
```

## 코드
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; } /* 안전망. 요소별 최종 상태도 함께 지정한다 */
  .mp-reveal { opacity: 1; transform: none; }
}

.mp-reduced-motion { display: flex; gap: 1.2em; }
.mp-reduced-motion-box { display: flex; align-items: center; justify-content: center; width: 4em; height: 4em; border: var(--mp-border) solid var(--mp-line); }
.mp-reduced-motion-box:nth-child(2) { border-style: dashed; }
.mp-reduced-motion i { font-style: normal; opacity: var(--mp-opacity-kicker); }
.mp-reduced-motion-live i { display: inline-block; animation: mp-reduced-motion var(--mp-duration-caret) steps(1, end) infinite, mp-reduced-motion-bob var(--mp-duration-float-min) var(--mp-ease-float) infinite alternate; }
@keyframes mp-reduced-motion { 50% { opacity: 0; } }
@keyframes mp-reduced-motion-bob { from { transform: translateY(var(--mp-float-amp-min)); } to { transform: translateY(calc(var(--mp-float-amp-min) * -1)); } }
```

```js
// 줄이기 설정을 한 곳에서 읽고, 바뀌면 등록된 효과를 멈추거나 재개한다
const mpMotion = (() => {
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const effects = new Set();
  mq.addEventListener('change', () => effects.forEach((fx) => (mq.matches ? fx.stop() : fx.start())));
  return {
    get reduce() { return mq.matches; },
    register(fx) { effects.add(fx); mq.matches ? fx.stop() : fx.start(); }, // fx: { start(), stop() } — stop은 최종 상태를 그린다
  };
})();
```

## 앱
- SwiftUI: `@Environment(\.accessibilityReduceMotion) var reduceMotion` — 참이면 반복 애니메이션을 시작하지 않고 `.animation(reduceMotion ? nil : …)`. 값이 바뀌면 뷰가 다시 그려지므로 `onChange(of: reduceMotion)`에서 타이머를 멈춘다.
- Compose: `Settings.Global.getFloat(contentResolver, Settings.Global.ANIMATOR_DURATION_SCALE, 1f) == 0f`이면 `rememberInfiniteTransition`을 만들지 않고 최종 값으로. Android 13 이상은 `AccessibilityManager` 설정도 확인한다.
- 커서·진행 표시는 켜진 상태로 정지, 등장 요소는 처음부터 보이게.
- OS 예외: OS가 알아서 줄이는 시스템 전환(내비게이션 푸시, 시트)은 건드리지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 모든 움직임에 분기한다. 효과별 최종 상태를 명시하고 안전망을 더한다. JS 타이머는 시작하지 않는다. `change` 이벤트를 듣는다. 에뮬레이션으로 전 화면 확인.
- 하지 말 것: 느리게만 바꾸기, 등장 요소를 숨긴 채 두기, 커서를 꺼진 상태로 멈추기, CSS만 처리하고 캔버스·타이머 애니메이션은 계속 돌리기, 즉시 상태 변화(반전·누름)까지 없애기, 안전망만 두고 최종 상태 지정 생략.
