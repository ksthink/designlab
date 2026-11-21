---
id: chart
name: 차트
nameEn: Chart
category: content
summary: 막대와 계단선을 정수 픽셀 격자에 그린다. 계열은 잉크 투명도와 빗금으로 나누고, 강조 한 곳만 orange 면으로 칠한다.
aliases: [차트, 그래프, chart, graph, 막대 그래프, 선 그래프, bar chart, line chart, 데이터 시각화, dataviz, 스파크라인, sparkline]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, retro-color, minimalism]
tokens: [--mp-ink, --mp-bg, --mp-accent, --mp-secondary, --mp-border, --mp-line, --mp-grid-line, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-secondary, --mp-opacity-kicker, --mp-duration-reveal, --mp-steps-fill]
effects: []
related: [table, stat, tooltip, empty-state, loading, labels-numbers, color]
---

## 용도
값의 추세(주간 기록, 월별 합계)나 몇 항목의 크기 비교를 한눈에 보여 줄 때 쓴다.
숫자 하나면 `stat`, 정확한 값을 읽고 비교해야 하면 `table`을 쓴다. 차트를 붙이기 전에 숫자와 짧은 비교 문구(`지난주 +2`)로 충분한지 먼저 본다.
한 화면에 차트는 하나를 기본으로 한다. 원형·도넛·레이더·3D 차트는 쓰지 않는다.

## 생김새
**구조**
- 종류는 셋만: 세로 막대(비교·기간별 합계), 계단선(추세), 스파크라인(칸 안 작은 추세, 축 없음).
- 차트 영역 = 그림 영역(막대·선) + 가로축 1px 선 + 축 라벨 줄. 세로축 선은 그리지 않고 기준 격자선 2–4개로 대신한다.
- 선 그래프는 부드러운 곡선 대신 **계단선**(`stepEnd`) 또는 **픽셀 점**(정사각 점)으로 그린다.

**수치**
- 격자: 모든 좌표를 정수 px로 반올림한다. 막대 높이·점 위치는 4px 단위(작은 차트는 2px)로 스냅한다.
- 막대: 폭 8–16px(정수), 간격은 막대 폭의 0.5–1배, 모서리 직각. 막대 최소 높이 2px(값이 0이면 그리지 않고 축만).
- 계단선·축: 두께 1px(`--mp-border`). 축 `--mp-line`, 기준 격자선 `--mp-grid-line`.
- 픽셀 점: 4×4px 정사각, 강조 점만 6×6px.
- 스파크라인: 높이 24–32px, 점 2×2 또는 계단선 1px, 축·라벨 없음.
- 라벨: Mulmaru `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, `tabular-nums`. 값은 `labels-numbers` 형식(천 단위 쉼표, 단위 한 글자).
- 캔버스·SVG: `image-rendering: pixelated`(캔버스), `shape-rendering: crispEdges`(SVG), 안티에일리어싱 없음. devicePixelRatio만큼 캔버스를 키워 정수 배율로 그린다.

**계열 구분 (새 색 금지)**
| 계열 | 표현 |
|---|---|
| 1 | 잉크 채움 `opacity: 1` |
| 2 | 잉크 `opacity: var(--mp-opacity-secondary)` (.7) |
| 3 | 잉크 `opacity: var(--mp-opacity-muted)` (.5) + 빗금(2px 간격 1px 선) |
| 강조 한 곳 | `--mp-accent` 면(막대 하나·점 하나·구간 하나). 글자는 칠하지 않는다 |
| 비교·선택 | `--mp-secondary` 면(선택한 막대, 비교 기준 구간). orange와 맞붙이지 않는다 |
- 계열은 최대 3개. 넘으면 차트를 나누거나 `table`로.
- 빗금은 격자선처럼 선 패턴이라 허용한다(`repeating-linear-gradient`로 2px 간격 1px 선). 장식 그라데이션은 금지.
- 범례는 차트 위 한 줄: `■ 이번 주 ■ 지난주` — ■ 견본에 같은 투명도·빗금을 준다.

**반응형**
- 390px: 막대 폭 8px, 라벨은 처음·끝·강조 값만. 가로 스크롤 대신 기간을 줄인다(7일).
- 700px: 막대 폭 12px, 라벨 격일 또는 전체(7개 이하).
- 860px: 막대 폭 16px, 모든 라벨. 범례를 차트 위 오른쪽으로.
- 1180px: 차트 폭은 `--mp-width-read`(760px)를 넘기지 않는다. 넓다고 막대를 늘리지 않는다.
- 폭이 바뀌면 다시 계산해 정수 px로 스냅한다(CSS % 폭으로 막대를 늘이지 않는다).

**접근성**
- 차트 그림에 `role="img"` + `aria-label` 요약("주간 기록, 7일 중 목요일 12개로 가장 많음").
- 같은 데이터를 `<table>`로 함께 둔다: `<details><summary>표로 보기</summary><table>…</table></details>` 또는 시각적으로 숨긴 표. `th scope` 포함.
- 색만으로 말하지 않는다: 강조 막대에는 값 라벨이나 ■ 범례 글자, 계열 3은 빗금으로도 구분한다.
- 누를 수 있는 막대는 `button`(`aria-label="목요일 12개"`), 좌우 화살표로 이동, 포커스 시 `tooltip` 표시. 누를 수 없으면 포커스를 받지 않는다.
- 대비: 계열 3(.5)은 면이라 허용하지만(빗금이 함께 구분) 라벨 글자로 쓰지 않는다.

**움직임 줄이기**
- 막대는 처음 한 번만 `steps(4, end)`로 계단식으로 자란다. `prefers-reduced-motion: reduce`이면 움직임 없이 최종 상태.
- 선은 그려지는 애니메이션 없음. 값 갱신은 즉시 교체.

**조합 규칙**
- orange는 화면당 하나: 차트에 강조를 쓰면 같은 화면 `stat`·`status-dot`에는 orange를 쓰지 않는다.
- 차트 위 `stat` 하나(현재 값)와 `1em`, 아래 `table`(표로 보기)와 `1.2em`.
- 값을 짚을 때는 `tooltip`, 데이터 없음은 `empty-state`, 불러오는 중은 `loading`(축만 그리고 `...`).
- `card` 안에는 스파크라인만 넣는다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 잉크 막대·계단선, 1px 축 |
| 호버·포커스(누르는 막대) | 막대 위 1px `--mp-ink` 테두리 + `tooltip` (색 바꾸지 않음) |
| 선택 | 막대 `--mp-secondary` 면 |
| 강조 | 막대 하나 `--mp-accent` 면 |
| 불러오는 중 | 축과 격자선만, 가운데 `...` |
| 데이터 없음 | 축만 + `empty-state` 한 줄("기록 없음") |
| 오류 | 축 없이 `error-state` 문구 |

## 동작
- 등장: 막대 `transform: scaleY(0 → 1)`, `transform-origin: bottom`, `var(--mp-duration-reveal)` `var(--mp-steps-fill)`, 한 번만.
- 누르는 막대의 tooltip은 즉시 표시(페이드 없음).
- reduced-motion: 등장 애니메이션 없음.

## 데모
```html demo
<div class="mp-chart-demo">
  <div class="mp-chart" role="img" aria-label="막대 6개, 넷째가 가장 큼">
    <span style="--h:16px"></span><span style="--h:28px"></span><span class="is-s2" style="--h:20px"></span>
    <span class="is-accent" style="--h:44px"></span><span class="is-s3" style="--h:24px"></span><span style="--h:32px"></span>
  </div>
  <div class="mp-chart-spark" role="img" aria-label="추세 상승">
    <i style="--y:4px"></i><i style="--y:8px"></i><i style="--y:8px"></i><i style="--y:4px"></i><i style="--y:12px"></i><i style="--y:16px"></i><i style="--y:20px"></i><i style="--y:20px"></i>
  </div>
</div>
```

## 코드
```css
.mp-chart-demo { display: flex; align-items: flex-end; gap: 32px; }
.mp-chart {
  display: flex; align-items: flex-end; gap: 8px; height: 48px; padding: 0 4px;
  border-bottom: var(--mp-border) solid var(--mp-line);
  background-image: linear-gradient(var(--mp-grid-line) 1px, transparent 1px);
  background-size: 100% 16px;   /* 기준 격자선 16px 간격 */
}
.mp-chart span {
  display: block; width: 12px; height: var(--h); background: var(--mp-ink);
  transform-origin: bottom; animation: mp-chart-grow var(--mp-duration-reveal) var(--mp-steps-fill) both;
}
.mp-chart span.is-s2 { opacity: var(--mp-opacity-secondary); }
.mp-chart span.is-s3 {
  opacity: var(--mp-opacity-muted); background: transparent;
  background-image: repeating-linear-gradient(0deg, var(--mp-ink) 0 1px, transparent 1px 3px);   /* 빗금: 2px 간격 1px 선 */
  outline: var(--mp-border) solid var(--mp-ink); outline-offset: -1px;
}
.mp-chart span.is-accent { background: var(--mp-accent); }
.mp-chart span.is-selected { background: var(--mp-secondary); }
@keyframes mp-chart-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
.mp-chart-spark { display: flex; align-items: flex-end; width: 64px; height: 24px; }
.mp-chart-spark i { display: block; width: 8px; height: 2px; margin-bottom: var(--y); background: var(--mp-ink); }
.mp-chart-label { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) { .mp-chart span { animation: none; } }
```

```js
// 캔버스 계단선 — 정수 픽셀 스냅, 안티에일리어싱 없음. <canvas class="mp-chart-canvas" data-values="3,5,5,4,8,9">
(() => {
  const cv = document.querySelector('.mp-chart-canvas');
  if (!cv || !cv.getContext) return;
  const vals = (cv.dataset.values || '').split(',').map(Number).filter((n) => !Number.isNaN(n));
  if (!vals.length) return;
  const dpr = Math.max(1, Math.round(window.devicePixelRatio || 1));
  const w = cv.clientWidth, h = cv.clientHeight;
  cv.width = w * dpr; cv.height = h * dpr;
  const ctx = cv.getContext('2d');
  ctx.imageSmoothingEnabled = false; ctx.scale(dpr, dpr);
  ctx.fillStyle = getComputedStyle(cv).color;   /* color: var(--mp-ink) */
  const max = Math.max(...vals), step = Math.floor(w / vals.length);
  const y = (v) => h - 1 - Math.round((v / max) * (h - 1));
  vals.forEach((v, i) => {
    ctx.fillRect(i * step, y(v), step, 1);                            // 가로 1px
    if (i) { const a = y(vals[i - 1]), b = y(v); ctx.fillRect(i * step, Math.min(a, b), 1, Math.abs(a - b) + 1); }   // 세로 1px
  });
})();
```

## 앱
- SwiftUI Swift Charts:
  ```swift
  Chart(data) { d in
    BarMark(x: .value("일", d.day), y: .value("개", d.count), width: .fixed(12))
      .foregroundStyle(d.isPeak ? Color("Accent") : Color("Ink"))
    // 선: LineMark(...).interpolationMethod(.stepEnd).lineStyle(StrokeStyle(lineWidth: 1))
    // 점: PointMark(...).symbol(.square).symbolSize(16)
  }
  .chartYAxis { AxisMarks { AxisGridLine().foregroundStyle(Color("GridLine")) } }
  .chartLegend(.hidden)
  ```
  둥근 막대(`cornerRadius`)·`.catmullRom` 보간·그라데이션 `foregroundStyle` 금지. 축 글자는 `.font(.custom("Mulmaru", size: 12))`.
- Compose: `Canvas`에 `drawRect`로 막대·1px 계단선을 정수 px로(`toPx().roundToInt()`), `Paint.isAntiAlias = false`. Vico를 쓰면 `lineSpec(pointConnector = 계단형)`·`shape = Shapes.rectShape`, 그림자·그라데이션 끄기.
- 두 플랫폼 모두 차트에 `accessibilityLabel` 요약, iOS는 `AXChartDescriptor`(Swift Charts 기본 제공), Android는 `contentDescription` + 표 화면 제공.
- OS 예외: 시스템 위젯·잠금 화면에서 OS가 단색 렌더링하면 강조색이 사라진다 — 값 라벨로 말한다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 정수 픽셀 격자, 계단선·정사각 점, 계열은 투명도와 빗금으로.
- 해야 할 것: 강조는 막대·점 하나에 orange 면, 요약 문장과 표 대체를 함께.
- 하지 말 것: 부드러운 곡선, 원형·도넛·3D·그림자·장식 그라데이션.
- 하지 말 것: 계열마다 새 색(파랑·초록), orange 글자 라벨, 둥근 막대 끝.
- 하지 말 것: 튕기며 자라는 막대, 선이 그려지는 애니메이션, 자동 재생 갱신.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 라이브러리 기본 팔레트(파랑·주황·초록) | 잉크 1 / .7 / .5+빗금, 강조 하나만 `--mp-accent` |
| 곡선 보간(`monotone`, `catmullRom`) | `stepEnd` 계단선 또는 정사각 점 |
| 막대 폭 `%`로 늘여 1.5px 경계가 흐림 | 정수 px로 계산·스냅, `crispEdges` |
| 강조 값을 orange 글자로 | orange 면 + 잉크 라벨 |
| 차트만 있고 대체 텍스트 없음 | `role="img"` 요약 + 표로 보기 |
| 값이 없는데 빈 축만 덩그러니 | `empty-state` 한 줄 |
