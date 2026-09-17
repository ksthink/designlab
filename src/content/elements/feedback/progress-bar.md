---
id: progress-bar
name: 진행 막대
nameEn: Progress bar
category: feedback
summary: 1px 선 틀 안을 잉크 면이 5% 단위로 끊어 채우는 진행 막대. 퍼센트나 남은 양을 숫자로 함께 둔다.
aliases: [진행 막대, 프로그레스바, 진행률, 다운로드 진행, 업로드 진행, 게이지, 달성률, 용량 막대, progress bar, progress, meter, percentage, usage bar, quota]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-line-strong, --mp-border, --mp-font, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-meta, --mp-duration-fill, --mp-steps-fill]
effects: [fx-fill, reduced-motion]
related: [loading, file-upload, stat, labels-numbers, confirm-step]
---

## 용도
**끝이 정해진** 작업이나 양을 보여준다.
- 진행: 다운로드·업로드·내보내기·동기화(바이트나 개수를 셀 수 있을 때).
- 양(meter): 저장 공간 사용량, 목표 달성률, 남은 시간.
- 끝을 모르면 `loading`, 숫자 하나가 핵심이면 `stat`을 쓴다. 가짜 진행률을 만들지 않는다.

## 생김새
- 머리 줄(막대 위, 간격 `0.5em`): 라벨 왼쪽, 숫자 오른쪽
  - `--mp-size-meta`, `--mp-tracking-meta`, 라벨 `opacity: var(--mp-opacity-secondary)`, 숫자 `tabular-nums`
  - 숫자 형식(`labels-numbers`): `45%` 또는 `12.4MB / 27.5MB` 또는 둘 다 `45% · 12.4MB / 27.5MB`
- 틀: 높이 `0.75em`(작은 목록 행은 `0.5em`), `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`, 안쪽 여백 2px
- 채움: `--mp-ink` 면 하나, `border-radius: 0`
- 값은 **5% 단위(20칸)로 내림**해 채운다 — 픽셀 막대처럼 한 칸씩 늘어난다. 숫자는 실제 값(정수 %)
- 폭: 부모 폭 100%, 최대 `26em`(목록 행 안에서는 행 폭)
- 완료 뒤: 막대를 지우고 결과 문구 한 줄(`받았습니다`) 또는 행 상태로 교체

## 상태
| 상태 | 채움 | 머리 줄 숫자 | 비고 |
|---|---|---|---|
| 대기 | 0 | `대기` | 틀만 |
| 진행 중 | 값(5% 내림) | `45% · 12.4MB / 27.5MB` | 1초 이상 걸릴 때만 표시 |
| 일시정지 | 유지 | `멈춤 · 45%` | 채움 `opacity: var(--mp-opacity-meta)` |
| 실패 | 유지 | 원인 한 줄 `연결이 끊겼습니다` + `[ 다시 ]` | 강조 ■은 화면에 다른 강조가 없을 때만 |
| 완료 | 100% → 즉시 결과 문구로 교체 | `받았습니다` | — |
| 양(meter) 경고 | 값 | `90% 사용` | 90% 이상이면 숫자 앞 강조 ■(화면당 하나) |

## 동작
### 모션
- 값이 바뀌면 `width`를 `var(--mp-duration-fill) var(--mp-steps-fill)`로 끊어 늘린다(`fx-fill`과 같은 계단). 부드러운 트윈·줄무늬 흐름 금지.
- 값 갱신은 최대 초당 4번(250ms 간격)으로 모은다 — 칸이 떨리지 않게.
- `prefers-reduced-motion: reduce`이면 전환 없이 즉시.

### 키보드·접근성
- 진행: `role="progressbar"` + `aria-valuemin="0"` `aria-valuemax="100"` `aria-valuenow="45"` + `aria-valuetext="45%, 12.4MB / 27.5MB"` + `aria-label`(또는 머리 줄 라벨을 `aria-labelledby`).
- 양(meter): `<meter>` 또는 `role="meter"`, 같은 aria 값.
- 진행 중 영역에 `aria-busy="true"`, 완료 시 `false`와 함께 결과 문구를 `role="status"`로 읽어 준다. 매 % 변화를 live로 읽지 않는다(10% 단위 이상일 때만 선택적으로).
- 막대는 포커스를 받지 않는다. 취소 버튼이 있으면 막대 오른쪽 `[ 취소 ]` 텍스트 버튼.

### 반응형
- 폭 480px 이하: 머리 줄 숫자가 길면 `45%`만 남기고 용량은 막대 아래 줄로 내린다.
- 목록 행 안에서는 이름 아래 한 줄로, 높이 `0.5em`.

## 데모
```html demo
<div class="mp-progress-bar-demo">
  <div class="mp-progress-bar"><div class="mp-progress-bar-head"><span>0%</span></div><div class="mp-progress-bar-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="0%"><span class="mp-progress-bar-fill" style="width: 0%"></span></div></div>
  <div class="mp-progress-bar"><div class="mp-progress-bar-head"><span>45%</span></div><div class="mp-progress-bar-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45" aria-label="45%"><span class="mp-progress-bar-fill" style="width: 45%"></span></div></div>
  <div class="mp-progress-bar is-paused"><div class="mp-progress-bar-head"><span>멈춤</span></div><div class="mp-progress-bar-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="70" aria-label="멈춤"><span class="mp-progress-bar-fill" style="width: 70%"></span></div></div>
  <div class="mp-progress-bar"><div class="mp-progress-bar-head"><span>100%</span></div><div class="mp-progress-bar-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-label="100%"><span class="mp-progress-bar-fill" style="width: 100%"></span></div></div>
</div>
```

## 코드
```css
.mp-progress-bar-demo { display: grid; gap: 1em; max-width: 20em; }
.mp-progress-bar { display: grid; gap: 0.5em; width: 100%; max-width: 26em; font: 400 var(--mp-size-meta) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta); }
.mp-progress-bar-head { display: flex; justify-content: space-between; gap: 1em; opacity: var(--mp-opacity-secondary); font-variant-numeric: tabular-nums; }
.mp-progress-bar-track { height: 0.75em; padding: 2px; border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0; }
.mp-progress-bar-fill {
  display: block; height: 100%; max-width: 100%; border-radius: 0; background: var(--mp-ink);
  transition: width var(--mp-duration-fill) var(--mp-steps-fill);
}
.mp-progress-bar.is-paused .mp-progress-bar-fill { opacity: var(--mp-opacity-meta); }
.mp-progress-bar.is-compact .mp-progress-bar-track { height: 0.5em; padding: 1px; }
@media (prefers-reduced-motion: reduce) { .mp-progress-bar-fill { transition: none; } }
```

```js
// 5% 단위로 내림해 채우고, 숫자는 실제 값
// 쓰기: root.dispatchEvent(new CustomEvent('mp:progress', { detail: { value: 45, text: '45%, 12.4MB / 27.5MB' } }))
(() => {
  document.querySelectorAll('.mp-progress-bar').forEach((root) => {
    const fill = root.querySelector('.mp-progress-bar-fill');
    const track = root.querySelector('[role="progressbar"]');
    if (!fill || !track) return;
    root.addEventListener('mp:progress', (e) => {
      const { value = 0, text } = e.detail || {};
      const v = Math.max(0, Math.min(100, Math.round(value)));
      fill.style.width = Math.floor(v / 5) * 5 + '%';
      track.setAttribute('aria-valuenow', String(v));
      track.setAttribute('aria-valuetext', text ?? v + '%');
    });
  });
})();
```

## 앱
- SwiftUI: `ProgressView(value:)`의 둥근 캡슐 대신 `GeometryReader` 안 `ZStack(alignment: .leading)` — 틀 `Rectangle().stroke(lineStrong, lineWidth: 1)`, 채움 `Rectangle().fill(ink).frame(width: w * floor(v * 20) / 20)`, `.padding(2)`. 애니메이션 없음. `.accessibilityValue("45%")`.
- Compose: `LinearProgressIndicator` 대신 `Box(Modifier.border(1.dp, lineStrong, RectangleShape).padding(2.dp))` 안 `Box(Modifier.fillMaxWidth(floor(v * 20) / 20).fillMaxHeight().background(ink))`. `Modifier.semantics { progressBarRangeInfo = ProgressBarRangeInfo(v, 0f..1f) }`.
- 백그라운드 다운로드 진행은 OS 예외: iOS Live Activity·Android 알림 진행 막대는 시스템 모양 그대로.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 숫자와 단위를 함께. 5% 단위로 끊어 채운다. 1초 이상 걸릴 때만 보인다. 대용량이면 시작 전에 `confirm-step`으로 용량을 확인시킨다. 완료되면 결과 문구로 교체.
- 하지 말 것: 둥근 캡슐 막대, 줄무늬·빛이 흐르는 애니메이션, 부드러운 폭 트윈, teal·orange 채움(경고 ■만 예외), 끝을 모르는데 가짜 진행률, 100%에서 멈춰 있는 막대, 두꺼운(1em 초과) 막대.
