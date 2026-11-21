---
id: status-dot
name: 상태 점
nameEn: Status dot
category: feedback
summary: 지금 켜져 있는 상태(기록 중, 저장 안 됨)를 알리는 8px 정사각 점. 강조 orange는 화면에서 이 점 하나에만 쓴다.
aliases: [상태 점, 기록 중, 녹화 중, 녹음 표시, 라이브 표시, 미저장 표시, 온라인 표시, 연결 상태, status dot, recording, live indicator, unsaved dot, presence, online indicator]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev app.html .dot(8px 사각 점) · syn ScenarioEditor 미저장 경고 점 · hihi 등반 기록 중 표시
pillars: [pixel-art, retro-color]
tokens: [--mp-accent, --mp-ink, --mp-line, --mp-border, --mp-opacity-meta, --mp-opacity-secondary, --mp-duration-caret, --mp-size-meta, --mp-tracking-meta]
effects: [caret, reduced-motion]
related: [page-indicator, badge, loading, color, header]
---

## 용도
평소에는 없다가 조건이 참일 때만 켜지는 상태를 알린다: 기록 중, 저장되지 않은 변경, 연결 끊김, 동기화됨.
- 쓴다: 앱 바·목록 행·편집기 제목 옆처럼 "지금 무엇이 켜져 있는지"를 한눈에 보여야 할 때.
- 쓰지 않는다: 항목 여러 개의 분류·상태 나열(`badge`), 페이지 위치(`page-indicator`), 진행률(`progress-bar`), 기다림(`loading`).
- 점만으로 뜻을 전하지 않는다. 옆에 짧은 글자(`기록 중`)를 두거나 `aria-label`을 단다.

## 생김새
- 점: `8px × 8px` 정사각형, `border-radius: 0` — metaphr.dev 점 인디케이터와 같은 크기. 원을 쓰지 않는다
- 세 종류만 있다
  - 강조 점: 채움 `--mp-accent`, 테두리 없음, opacity 1. **화면 전체에서 하나**
  - 보통 점: 채움 `--mp-ink`, `opacity: var(--mp-opacity-meta)`(.7)
  - 꺼진 점: 배경 투명, `var(--mp-border) solid var(--mp-line)` 테두리
- 글자와 한 줄: `display: inline-flex; align-items: center; gap: 0.5em`
- 글자: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-secondary)`(.7), 시간·숫자는 `tabular-nums`
- 점은 글자의 세로 가운데. 점에 opacity를 주면 글자에 번지지 않도록 점과 글자를 형제 요소로 둔다
- 앱 바 안: 제목 오른쪽 끝, 제목과 간격 `0.8em`
- 목록 행 안: 행 이름 앞, 간격 `0.5em`. 행마다 강조 점을 두지 않는다(보통 점)

## 상태
| 상태 | 점 | 글자 예 | 움직임 |
|---|---|---|---|
| 기록 중 | 강조 `--mp-accent` | `기록 중 00:12:48` | 깜빡임 `steps(1, end)` |
| 저장 안 됨 | 강조 `--mp-accent` | `저장 안 됨` | 멈춤 |
| 동기화됨·연결됨 | 보통 잉크 .7 | `동기화됨` | 멈춤 |
| 오프라인·꺼짐 | 빈 1px 칸 | `오프라인` | 멈춤 |
| 조건 없음 | 점과 글자를 지운다 | — | — |

- 강조 점이 필요한 상태가 동시에 두 개면(기록 중 + 저장 안 됨) 더 급한 하나만 강조, 나머지는 보통 점으로 낮춘다.
- 오류로 화면 다른 곳에 강조 ■이 이미 있으면 이 점은 보통 점으로 낮춘다.

## 동작
### 모션
- 깜빡임은 `caret`과 같다: `animation: var(--mp-duration-caret) steps(1, end) infinite`, keyframes `50% { opacity: 0 }` — 켜짐/꺼짐 두 단계.
- 깜빡이는 점은 화면에 하나만. "지금 흘러가는 중"(기록·녹음)일 때만 깜빡이고, 멈춘 상태(저장 안 됨)는 깜빡이지 않는다.
- 부드러운 pulse·크기 변화·glow 금지. 상태 전환(켜짐 ↔ 꺼짐)은 즉시.
- `prefers-reduced-motion: reduce`이면 `animation: none`, 켜진 채로 멈춘다.

### 키보드·접근성
- 점은 장식이다: `aria-hidden="true"`. 뜻은 옆 글자가 전한다.
- 글자를 숨긴 점 단독 표시(좁은 앱 바)라면 부모에 `role="img"` + `aria-label="기록 중"`.
- 상태가 바뀌어 사용자가 알아야 하면(연결 끊김) 글자를 감싼 요소에 `role="status"`(`aria-live="polite"`). 기록 시간처럼 매초 바뀌는 글자에는 live를 걸지 않는다.
- 점은 포커스를 받지 않는다. 누를 수 있게 만들려면 `button`으로 감싸고 `focus-ring`을 따른다.
- 색만으로 구분하지 않는다: 강조/보통/꺼짐은 채움·투명도·테두리 모양도 다르다.

### 반응형
- 좁은 화면(`max-width: 480px`)의 앱 바에서는 글자를 줄여(`기록 중` → 시간만) 한 줄을 유지한다. 점 크기는 8px 그대로.
- 점은 확대하지 않는다. 고해상도에서도 8 CSS px.

## 데모
```html demo
<div class="mp-status-dot-row">
  <span class="mp-status-dot"><span class="mp-status-dot-mark is-accent is-live" aria-hidden="true"></span>REC</span>
  <span class="mp-status-dot"><span class="mp-status-dot-mark" aria-hidden="true"></span>ON</span>
  <span class="mp-status-dot"><span class="mp-status-dot-mark is-off" aria-hidden="true"></span>OFF</span>
</div>
```

## 코드
```css
.mp-status-dot-row { display: flex; flex-wrap: wrap; gap: 1.6em; }
.mp-status-dot {
  display: inline-flex; align-items: center; gap: 0.5em;
  font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta);
  font-variant-numeric: tabular-nums; color: var(--mp-ink);
}
.mp-status-dot-mark { flex: none; width: 8px; height: 8px; border-radius: 0; background: var(--mp-ink); opacity: var(--mp-opacity-meta); }
.mp-status-dot-mark.is-accent { background: var(--mp-accent); opacity: 1; } /* 강조 — 화면당 하나 */
.mp-status-dot-mark.is-off { background: transparent; border: var(--mp-border) solid var(--mp-line); opacity: 1; }
.mp-status-dot-mark.is-live { animation: mp-status-dot-blink var(--mp-duration-caret) steps(1, end) infinite; }
@keyframes mp-status-dot-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .mp-status-dot-mark.is-live { animation: none; } }
```
글자를 옅게(`--mp-opacity-secondary`) 하려면 글자를 `<span class="mp-status-dot-text">`로 감싸 `opacity`를 준다. 강조 점에는 opacity를 주지 않는다.

## 앱
- SwiftUI: `Rectangle().fill(accent).frame(width: 8, height: 8)`. 깜빡임은 `TimelineView(.periodic(from: .now, by: 0.6))`에서 켜짐/꺼짐을 번갈아(`.animation(nil)`, 트윈 없음). `@Environment(\.accessibilityReduceMotion)`이 참이면 켠 채로.
- Compose: `Box(Modifier.size(8.dp).background(accent))`. `rememberInfiniteTransition` + `keyframes { durationMillis = 1200; 1f at 0; 0f at 600 }` 대신 `LaunchedEffect`에서 `delay(600)`마다 Boolean을 뒤집는다(보간 없음).
- 접근성: iOS `.accessibilityElement(children: .combine)` + `.accessibilityLabel("기록 중")`, Android `Modifier.semantics { contentDescription = "기록 중" }`.
- 위치: 앱 바 오른쪽 한 곳. 탭 바 아이콘 위 빨간 숫자 배지(`.badge`)는 쓰지 않는다 — 필요하면 보통 점.
- OS 예외: 상태 표시줄의 시스템 녹음·위치·카메라 점, Dynamic Island·Live Activity의 시스템 표시는 건드리지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 조건이 참일 때만 켠다. 점 옆에 짧은 글자(`기록 중`, `저장 안 됨`). 강조 점은 화면에 하나, 깜빡임도 하나. 8px 정사각형 고정. reduced-motion이면 멈춘다.
- 하지 말 것: 동그란 점, 부드러운 pulse·glow·크기 변화, 초록/노랑/빨강 신호등 색, orange 점 여러 개, teal 점과 orange 점을 맞붙이기, 점만으로 의미 전달, 강조 점을 opacity로 옅게 하기, 탭 아이콘 위 숫자 배지.
