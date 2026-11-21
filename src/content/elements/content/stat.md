---
id: stat
name: 숫자 강조
nameEn: Stat
category: content
summary: 숫자 하나를 크게, 이름과 단위를 옅게 적는다. 색이나 굵기가 아니라 크기로 강조한다.
aliases: [숫자 강조, stat, 통계, KPI, 지표, 수치, metric, big number, 카운터, 요약 숫자, 대시보드 숫자]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-size-title, --mp-tracking-title, --mp-leading-title, --mp-size-kicker, --mp-tracking-kicker, --mp-opacity-kicker, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-muted, --mp-border, --mp-line, --mp-accent, --mp-ink, --mp-bg, --mp-duration-hover]
effects: []
related: [key-value, widget, labels-numbers, status-dot, table]
---

## 용도
화면의 핵심 수치(남은 일, 이번 달 합계, 오늘 고도, 연속 기록 일수)를 한눈에 보여 줄 때 쓴다. 한 영역에 2–4개.
숫자가 5개를 넘거나 비교가 필요하면 `table`, 한 대상의 속성 나열이면 `key-value`로 내린다.
추세를 보이려고 차트를 붙이기 전에, 숫자 하나와 짧은 비교 문구(예: `지난주 +2`)로 충분한지 본다.

## 생김새
**구조**
- 한 칸 = 이름(kicker) → 숫자(+단위) → 보조 설명(meta, 선택).
- 여러 칸은 가로 나열 `dl`(이름 `dt`, 숫자 `dd`) 또는 `div` 묶음.

**수치**
- 이름: `--mp-size-kicker`, `--mp-tracking-kicker`, `opacity: var(--mp-opacity-kicker)`, 아래 `0.3em`. 명사 하나("남은 일").
- 숫자: `--mp-size-title`(24px 이상 보장), `--mp-tracking-title`, 행간 `--mp-leading-title`, 불투명, `font-variant-numeric: tabular-nums`, 굵기 400.
- 단위: 숫자 뒤 `0.5em` 크기, 왼쪽 `0.2em`. 원·개·일·m처럼 한 글자 단위 우선.
- 보조 설명: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, 위 `0.3em`.
- 칸 사이: 세로 1px `--mp-line`, 칸 좌우 여백 `1.6em`, 첫 칸은 왼쪽 선·여백 없음.
- 숫자 표기: 천 단위 쉼표(`12,480`), 소수 한 자리까지, 큰 수는 `1.2만`(`labels-numbers`).

**반응형**
- 390px: 2열 격자 유지, 세로 선 대신 칸 위 1px 선. 숫자 크기는 `--mp-size-title` clamp가 줄인다(따로 줄이지 않는다). 360px 미만에서 1열.
- 700px 미만: 2열 격자(`grid-template-columns: 1fr 1fr`).
- 700px 이상: 한 줄 가로 나열, 칸 사이 세로 1px 선.
- 860px: 4칸까지 한 줄. 5칸 이상이면 `table`로 바꾼다.
- 1180px: 칸 폭을 늘려 벌리지 않는다. 왼쪽부터 내용 폭만큼.
- 숫자가 칸을 넘으면 단위를 다음 줄로 보내지 말고 약식 표기(`1.2만`)로 바꾼다.

**접근성**
- `dl`로 이름–값 관계를 전달한다. 스크린리더는 "남은 일, 12개"로 읽는다.
- 단위를 기호로만 쓰면(`m`) `aria-label="고도 1,240미터"`로 풀어 준다.
- 주의 상태 `■`는 `aria-hidden="true"`, 뜻은 옆 글자("곧 끝남")로 전달한다. 색만으로 말하지 않는다.
- 실시간으로 바뀌는 숫자는 `aria-live="polite"`, 초 단위로 바뀌면 live 영역에 넣지 않는다.
- 이름은 작은 1× 글자라 이름만으로 필수 맥락을 전하지 않는다. 화면 제목이 맥락을 준다.
- 숫자와 단위는 한 덩어리로 읽혀야 한다. 단위를 `span`으로 쪼개 따로 읽히면 `dd`에 `aria-label="12개"`를 주고 안쪽 `span`은 그대로 둔다.
- 누르는 칸은 `a`, 이름 = "기록 7일, 자세히". 키보드 Tab/Enter.

**조합 규칙**
- orange `■`는 화면당 하나 — 여러 칸이 주의여도 가장 급한 한 칸만 orange, 나머지는 잉크 `■`.
- stat 줄 위 제목과 `1em`, 아래 `table`·`list`와 `--mp-section`.
- 칸 안에 차트·아이콘·배지를 넣지 않는다. stat 줄을 `card` 안에 넣을 때는 한 줄 최대 2칸.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 잉크 숫자, 옅은 이름 |
| 주의(조건이 참일 때만) | 숫자 앞 `■` 하나 `--mp-accent`(화면당 하나) + 보조 설명에 뜻("곧 끝남") |
| 값 없음 | `-` 한 글자, `opacity: var(--mp-opacity-muted)` |
| 불러오는 중 | `...` (`loading`의 터미널 표기), 칸 폭 유지 |
| 누를 수 있는 칸 | 호버·포커스 반전(배경 `--mp-ink`, 글자 `--mp-bg`), 상세 화면으로 이동 |

## 동작
- 값이 바뀌면 즉시 교체한다. 굴러가는 카운트업·깜빡임 없음.
- 누르는 칸의 반전은 `--mp-duration-hover` ease. reduced-motion이면 즉시.
- 값 변경·불러오기에 움직임 없음. reduced-motion에서는 반전 전환도 없앤다.

## 데모
```html demo
<dl class="mp-stat-row">
  <div class="mp-stat"><dt>일</dt><dd class="mp-stat-value">12<span>개</span></dd></div>
  <div class="mp-stat"><dt>마감</dt><dd class="mp-stat-value"><span class="mp-stat-mark" aria-hidden="true">■</span>2<span>일</span></dd></div>
  <div class="mp-stat"><dt>합계</dt><dd class="mp-stat-value is-empty">-</dd></div>
  <a class="mp-stat is-hover" href="#"><dt>기록</dt><dd class="mp-stat-value">7<span>일</span></dd></a>
</dl>
```

## 코드
```css
.mp-stat-row { display: flex; flex-wrap: wrap; margin: 0; }
.mp-stat { display: block; padding: 0 1.6em; border-left: var(--mp-border) solid var(--mp-line); color: inherit; text-decoration: none; transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease; }
.mp-stat:first-child { padding-left: 0; border-left: 0; }
.mp-stat dt { margin: 0 0 0.3em; font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-kicker); opacity: var(--mp-opacity-kicker); }
.mp-stat dd { margin: 0; }
.mp-stat-value {
  font-size: var(--mp-size-title); letter-spacing: var(--mp-tracking-title); line-height: var(--mp-leading-title);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.mp-stat-value span { font-size: 0.5em; margin-left: 0.2em; }
.mp-stat-value .mp-stat-mark { margin: 0 0.3em 0 0; color: var(--mp-accent); }
.mp-stat-value.is-empty { opacity: var(--mp-opacity-muted); }
.mp-stat-note { margin-top: 0.3em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
a.mp-stat { padding-block: 0.3em; }
a.mp-stat:hover, a.mp-stat:focus-visible, a.mp-stat.is-hover { background: var(--mp-ink); color: var(--mp-bg); outline: none; }
@media (max-width: 699px) {
  .mp-stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1em; }
  .mp-stat, .mp-stat:first-child { padding: 0.8em 0 0; border-left: 0; border-top: var(--mp-border) solid var(--mp-line); }
}
@media (max-width: 359px) { .mp-stat-row { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .mp-stat { transition: none; } }
```

## 앱
- SwiftUI: `VStack(alignment: .leading, spacing: 4) { Text("남은 일").opacity(0.7); Text("12").font(.custom("Mulmaru", size: 36)).monospacedDigit() }`. 값 변경에 `.contentTransition(.numericText())`을 쓰지 않는다(`.identity`).
- Compose: `Text("12", style = TextStyle(fontFamily = mulmaru, fontSize = 36.sp, fontFeatureSettings = "tnum"))`. `AnimatedContent` 없이 즉시 교체.
- 앱 숫자 크기는 최소 24pt/24sp(orange ■ 옆 숫자도 잉크).
- 여러 칸은 `Grid`/`LazyVerticalGrid` 2열, 칸 사이 1pt 선.
- 위젯에서 쓰는 형태는 `widget` 문서.
```swift
VStack(alignment: .leading, spacing: 4) {
  Text("남은 일").font(.custom("Mulmaru", size: 12)).opacity(0.7)
  Text("12개").font(.custom("Mulmaru", size: 36)).monospacedDigit().contentTransition(.identity)
}.accessibilityElement(children: .combine)
```
```kotlin
Column(Modifier.semantics(mergeDescendants = true) {}) {
  Text("남은 일", Modifier.alpha(0.7f), fontSize = 12.sp)
  Text("12개", fontSize = 36.sp, style = TextStyle(fontFeatureSettings = "tnum"))
}
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 크기로 강조, 단위는 작게, 이름은 명사 하나.
- 해야 할 것: `tabular-nums`로 자릿수 흔들림 방지.
- 해야 할 것: 주의는 ■ 하나와 뜻을 말하는 글자로, 조건이 참일 때만.
- 하지 말 것: 굵은 숫자, 숫자에 orange 글자색.
- 하지 말 것: 증감을 초록/빨강 화살표로.
- 하지 말 것: 차오르는 카운트업 애니메이션, 원형 게이지·스파크라인 장식.
- 하지 말 것: 칸마다 카드 박스·배경색.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 굵게(700) 숫자 | 400 + `--mp-size-title` |
| 숫자 글자색 orange | 잉크 숫자 + 옆 `■` 하나 |
| ▲초록 ▼빨강 증감 | `지난주 +2` 글자 |
| 카운트업 애니메이션 | 즉시 교체 |
| 칸마다 카드 박스 | 칸 사이 1px 선 |
| 24px 미만 숫자로 강조 | `--mp-size-title` 이상 |
