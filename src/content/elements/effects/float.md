---
id: float
name: 숨쉬기
nameEn: Float
category: effects
summary: 글자·카드가 2.5–5.5px 위아래로 3.4–5.8초에 걸쳐 천천히 오르내린다. 요소마다 위상이 다르다.
aliases: [숨쉬기, 둥둥, 떠다니기, 부유, 흔들림, 살랑, 부유 애니메이션, float, floating, breathing, bob, idle animation, hover float, 이펙트, 효과, effect]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .card-float · bob · float2()
pillars: [minimalism, pixel-art]
tokens: [--mp-ease-float, --mp-duration-float-min, --mp-duration-float-max, --mp-float-amp-min, --mp-float-amp-max]
effects: [reduced-motion]
related: [card, hero, section-head, rail, motion, elevation]
---

## 용도
화면이 멈춰 있지 않다는 느낌만 조용히 줄 곳에 쓴다: 히어로 슬로건·브랜드 글자, 분류 제목과 옆 설명, 카드 레일의 카드.
읽는 중인 본문, 입력 칸, 버튼 라벨, 표, 모달 안에는 쓰지 않는다. 움직이는 대상을 누르거나 읽기 어려워진다.
한 화면에서 숨쉬는 영역은 한두 곳(히어로, 카드 레일)까지.

## 생김새
**값**
| 대상 | 진폭(`--fa`) | 주기(`--fd`) | 시작 위상(`--fdl`) |
|---|---|---|---|
| 카드 | `--mp-float-amp-min`–`--mp-float-amp-max` (2.5–5.5px) | `--mp-duration-float-min`–`--mp-duration-float-max` (3.4–5.8s) | 0 – -5s |
| 분류 제목 | 2–4px | 3.4–5.8s | 0 – -5s |
| 제목 옆 설명 | 1.5–3px | 3.4–5.8s | 0 – -5s (제목과 다르게) |
| 글자 한 자씩(히어로) | 1–2.5px | 2–3.8s | 0 – -4s |

- 곡선 `--mp-ease-float`(ease-in-out), `infinite alternate` — 위 끝과 아래 끝에서 천천히 멈췄다 돌아온다.
- 움직임은 `transform: translateY()`만. 회전·확대·가로 이동·opacity 변화를 섞지 않는다.
- **요소마다 값이 달라야 한다.** 같은 값이면 한 덩어리로 굳어 보인다. 제목과 설명처럼 붙은 요소도 위상을 어긋나게 둔다.
- 글자 단위로 쪼갤 때는 각 글자를 `display: inline-block` span으로 감싸고 공백은 `&nbsp;` span으로 남긴다.

**상호작용**
- 가리키면 제자리에 멈춘다(`animation-play-state: paused`). 누르려는 대상이 움직이지 않게.
- 키보드 포커스에서도 멈춘다(`:focus-within`).
- 카드 호버의 -3px 올라감(`elevation`)은 float가 멈춘 위치에서 적용된다. 둘을 같은 요소의 `transform`에 걸면 충돌하므로 float는 바깥 래퍼(`.card-float`), 호버 이동은 안쪽 카드에 둔다.

**성능**
- 화면 밖 요소도 CSS 애니메이션은 브라우저가 알아서 줄이지만, 카드가 수십 개면 레일이 보일 때만 `animation-play-state: running`으로 켠다.

**접근성**
- 5초 넘게 계속되는 장식 움직임이므로 `prefers-reduced-motion: reduce`이면 반드시 멈춘다.
- 정보를 담지 않는다. 멈춰도 잃는 것이 없어야 한다.

**반응형**
- 좁은 화면(480px 이하)에서는 진폭을 최소값 쪽(2.5px)으로. 작은 화면에서 5px은 크게 느껴진다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 천천히 오르내림 |
| 호버·포커스 | 제자리에서 멈춤 |
| 화면 밖 | (선택) 정지 |
| 움직임 줄이기 | 정지, `transform: none` |

## 동작
- 값은 요소의 사용자 정의 속성 `--fa`(진폭), `--fd`(주기), `--fdl`(음수 지연)로 넣는다.
- 데모는 인라인 style로 고정, 실제로는 `data-float`을 붙인 요소에 아래 JS가 범위 안에서 무작위로 정한다(새로고침마다 달라진다).
- `prefers-reduced-motion: reduce`이면 `animation: none`.

## 데모
```html demo
<div class="mp-float-row">
  <span class="mp-float mp-float-box" style="--fa:3px; --fd:3.4s; --fdl:-1.2s"></span>
  <span class="mp-float mp-float-box" style="--fa:5.5px; --fd:4.6s; --fdl:-3s"></span>
  <span class="mp-float mp-float-box" style="--fa:2.5px; --fd:5.8s; --fdl:-0.4s"></span>
  <span class="mp-float mp-float-box" style="--fa:4px; --fd:4s; --fdl:-2.2s"></span>
</div>
```

## 코드
```css
.mp-float-row { display: flex; justify-content: center; gap: 1em; padding: 1.5em 0; }
.mp-float-box { width: 3em; height: 4em; border: var(--mp-border) solid var(--mp-line); }
.mp-float {
  display: inline-block;
  animation: mp-float var(--fd, var(--mp-duration-float-min)) var(--mp-ease-float) var(--fdl, 0s) infinite alternate;
}
.mp-float:hover, .mp-float:focus-within { animation-play-state: paused; }
@keyframes mp-float {
  from { transform: translateY(var(--fa, var(--mp-float-amp-min))); }
  to   { transform: translateY(calc(var(--fa, var(--mp-float-amp-min)) * -1)); }
}
@media (prefers-reduced-motion: reduce) { .mp-float { animation: none; } }
```

```js
// data-float가 붙은 .mp-float마다 진폭·주기·위상을 다르게. data-float-amp="2-4"로 진폭 범위를 바꿀 수 있다.
(function () {
const els = document.querySelectorAll('.mp-float[data-float]');
if (!els.length) return;
els.forEach((el) => {
  const [lo, hi] = (el.dataset.floatAmp || '2.5-5.5').split('-').map(Number);
  el.style.setProperty('--fa', (lo + Math.random() * (hi - lo)).toFixed(2) + 'px');
  el.style.setProperty('--fd', (3.4 + Math.random() * 2.4).toFixed(2) + 's');
  el.style.setProperty('--fdl', (-Math.random() * 5).toFixed(2) + 's');
});
})();
```

## 앱
- SwiftUI: `@State var up = false`, `.offset(y: up ? -amp : amp).animation(.easeInOut(duration: d).repeatForever(autoreverses: true).delay(phase), value: up).onAppear { up = true }`. amp·d·phase는 항목마다 `Double.random(in:)`으로 한 번 정해 저장한다.
- Compose: `val t = rememberInfiniteTransition(); val y by t.animateFloat(-amp, amp, infiniteRepeatable(tween(d, easing = FastOutSlowInEasing), RepeatMode.Reverse, StartOffset(phase)))`, `Modifier.graphicsLayer { translationY = y.dp.toPx() }`.
- 목록 스크롤 중·드래그 중에는 멈춘다. 누를 수 있는 카드는 누르는 동안 멈춘다.
- 줄이기 설정(`accessibilityReduceMotion`, 애니메이터 배율 0)이면 오프셋 0으로 고정. `.spring`을 쓰지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 느리게, 작게, 요소마다 다르게. `translateY`만. 호버·포커스에서 멈춤. 줄이기 설정에서 정지.
- 하지 말 것: 6px 넘는 진폭, 2초보다 빠른 주기, 모든 요소 같은 위상, 회전·확대·opacity 섞기, 본문·버튼·입력·표에 적용, 화면 전체를 숨쉬게 하기, 호버 이동과 같은 요소의 transform에 겹치기.
