---
id: motion
name: 움직임
nameEn: Motion
category: foundations
summary: 움직임은 두 종류뿐이다. 느린 숨쉬기(ease-in-out)와 한 칸씩 끊는 터미널(steps). 줄이기 설정이면 멈춘다.
aliases: [움직임, 모션, 애니메이션, 트랜지션, 전환, 이징, 지속 시간, 인터랙션, motion, animation, transition, easing, duration, micro-interaction]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html bob·cardfloat·caret·fx-fill·reveal·glyph TICK
pillars: [pixel-art, minimalism]
tokens: [--mp-ease-float, --mp-duration-float-min, --mp-duration-float-max, --mp-float-amp-min, --mp-float-amp-max, --mp-duration-reveal, --mp-duration-fade, --mp-duration-hover, --mp-duration-fill, --mp-steps-fill, --mp-duration-caret, --mp-tick, --mp-opacity-kicker]
effects: [float, caret, fx-fill, invert-hover, reveal, glyph-field, scramble, press, reduced-motion]
related: [theme, typography, hero]
---

## 용도
모든 움직임의 종류·시간·곡선을 정한다. 구체적인 구현은 `effects` 분류의 각 문서를 따른다.
움직임은 정보를 꾸미지 않는다. 없어도 뜻이 전해지면 넣지 않는다. 새 움직임이 필요해 보이면 아래 두 종류 중 어디에 속하는지 먼저 정하고, 둘 다 아니면 만들지 않는다.

## 생김새
**1. 숨쉬기** — 느리고 부드럽게, 끝없이
- 위아래 이동만. 진폭 `--mp-float-amp-min`–`--mp-float-amp-max`(2.5–5.5px), 글자 단위면 1–2.5px.
- 주기 `--mp-duration-float-min`–`--mp-duration-float-max`(3.4–5.8s), 곡선 `--mp-ease-float`(ease-in-out), `infinite alternate`.
- 요소마다 진폭·주기·시작 위상을 다르게 → `float`.
- 등장: opacity 0→1 + translateY(14px)→0, `--mp-duration-reveal` 0.9s ease, 한 번 → `reveal`.
- 글자 페이드 인: opacity만 `--mp-duration-fade` 0.6s ease.
- 호버 반전: 배경·글자색 `--mp-duration-hover` 0.25s ease → `invert-hover`.

**2. 터미널** — 한 칸씩 끊어서
- 반전 채움: 8칸, `--mp-steps-fill` steps(4, end), `--mp-duration-fill` 0.19s → `fx-fill`.
- 커서: `steps(1, end)`, `--mp-duration-caret` 1.2s, opacity `--mp-opacity-kicker` → `caret`.
- 글리프 갱신: `--mp-tick` 83ms 셀 단위 → `glyph-field`, 스크램블 68ms → `scramble`.
- 셀 사이 보간 없음. 60fps 트윈 금지.

**즉시** — 움직이지 않는 전환
- 화면 전환, 모달·시트·메뉴 열고 닫기, 탭 전환, 누름(`press` 1px), 상태 메시지 교체.
- 이유: 상태 전환에 애니메이션을 두면 기다리게 된다. 전환은 결과만 보인다.

**한 화면의 움직임 예산**
- 상시 움직이는 것(숨쉬기·커서·글리프)은 히어로 영역 하나 + 커서 하나까지.
- 본문·목록·폼 영역에는 호버 반응과 등장 외의 상시 움직임을 두지 않는다.

**성능**
- `transform`·`opacity`만 애니메이션한다. `top`·`height`·`box-shadow`·`filter`를 애니메이션하지 않는다.
- 화면 밖이거나 탭이 숨겨지면 JS 애니메이션을 멈춘다(IntersectionObserver, `visibilitychange`).
- `will-change`는 쓰지 않거나 애니메이션 중에만 잠깐.

**접근성**
- `prefers-reduced-motion: reduce`이면 모든 움직임을 멈추고 최종 상태만 보인다(`reduced-motion`).
- 5초 넘게 계속 움직이는 것은 장식이어야 하고(정보 없음), 가리키면 멈춘다(`float:hover`).
- 초당 3회 넘게 깜빡이지 않는다. 커서 1.2s 주기는 기준 안.

## 상태
| 종류 | 시간 | 곡선 | 반복 |
|---|---|---|---|
| 숨쉬기 | 3.4–5.8s | ease-in-out | 무한 왕복 |
| 등장 | 0.9s | ease | 한 번 |
| 페이드 | 0.6s | ease | 한 번 |
| 호버 반전 | 0.25s | ease | 상호작용 |
| 채움 | 0.19s | steps(4, end) | 상호작용 |
| 커서 | 1.2s | steps(1, end) | 무한 |
| 글리프 | 83ms 틱 | 없음 | 보일 때만 |
| 전환·누름 | 0 | 없음 | — |
| 움직임 줄이기 | 0 | 최종 상태 | 없음 |

## 동작
효과별 문서: `float`, `reveal`, `invert-hover`, `fx-fill`, `caret`, `glyph-field`, `scramble`, `press`. 모든 효과는 `reduced-motion` 규칙을 함께 넣는다.

## 데모
```html demo
<div class="mp-motion">
  <span class="mp-motion-breath">■</span>
  <span class="mp-motion-step">■</span>
  <span class="mp-motion-still">■</span>
</div>
```

## 코드
```css
.mp-motion { display: flex; gap: 2.5em; align-items: center; justify-content: center; padding: 1.5em 0; font-size: var(--mp-size-heading); }
.mp-motion-breath { display: inline-block; animation: mp-motion-float var(--mp-duration-float-min) var(--mp-ease-float) infinite alternate; }
@keyframes mp-motion-float { from { transform: translateY(var(--mp-float-amp-max)); } to { transform: translateY(calc(var(--mp-float-amp-max) * -1)); } }
.mp-motion-step { opacity: var(--mp-opacity-kicker); animation: mp-motion-blink var(--mp-duration-caret) steps(1, end) infinite; }
@keyframes mp-motion-blink { 50% { opacity: 0; } }
.mp-motion-still { opacity: var(--mp-opacity-kicker); }
@media (prefers-reduced-motion: reduce) { .mp-motion-breath, .mp-motion-step { animation: none; } }
```

## 앱
- 숨쉬기: SwiftUI `.animation(.easeInOut(duration: 4).repeatForever(autoreverses: true), value: phase)`, Compose `infiniteRepeatable(tween(4000, easing = FastOutSlowInEasing), RepeatMode.Reverse)`.
- 터미널: 타이머(`Timer.publish(every: 0.083)`, `LaunchedEffect` + `delay(83)`)로 상태를 교체한다. `withAnimation`·`animate*AsState`로 보간하지 않는다.
- 화면 전환: 앱이 제어하는 전환은 `.transaction { $0.animation = nil }`, Compose Navigation `enterTransition = { EnterTransition.None }`.
- `.spring`, `.bouncy`, 오버슈트 곡선을 쓰지 않는다. OS 예외: 시스템 내비게이션 푸시·시트 등장·키보드.
- 줄이기: iOS `accessibilityReduceMotion`, Android `ANIMATOR_DURATION_SCALE == 0`이면 멈춘다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 숨쉬기·터미널·즉시 셋 중 하나로 분류한다. 토큰 시간만 쓴다. 요소마다 위상 다르게. transform·opacity만. 줄이기 설정 존중.
- 하지 말 것: 스프링·바운스·오버슈트, 부드러운 슬라이드 전환, 빠른 회전·확대, 자동 재생 캐러셀, 화면 전환 애니메이션, 로딩 스피너 회전, 본문 영역 상시 움직임.
