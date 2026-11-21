---
id: timeline
name: 타임라인
nameEn: Timeline
category: content
summary: 시간 순 기록을 왼쪽 1px 세로선과 8px 사각 점으로 잇는다. 지금 항목만 점을 채운다.
aliases: [타임라인, timeline, 연표, 기록, 히스토리, history, 변경 이력, changelog, 활동 기록, 일정 흐름, 진행 단계, steps]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-line, --mp-line-strong, --mp-ink, --mp-bg, --mp-accent, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-muted, --mp-size-body, --mp-opacity-body, --mp-size-kicker, --mp-tracking-kicker, --mp-opacity-kicker]
effects: []
related: [list, page-indicator, status-dot, labels-numbers, progress-bar]
---

## 용도
변경 이력, 하루 기록, 등반 구간, 주문 진행 단계처럼 순서가 의미 있는 항목에 쓴다.
순서가 중요하지 않으면 `list`, 진행률 하나만 보이면 `progress-bar`를 쓴다.

## 생김새
**구조**
- `ol`(순서 있음) > `li` 항목. 항목 = 시각(`time datetime`) + 내용(`p`, 선택적으로 짧은 메타).
- 날짜가 바뀌는 곳에 날짜 머리(`li` 안 `h3` 또는 별도 `li.is-date`)를 둔다. 같은 날짜는 반복하지 않는다.
- 두 방향: 기록(최신이 위) / 단계(처음이 위). 한 화면에서 섞지 않는다.

**수치**
- 세로선: `ol`의 `border-left: var(--mp-border) solid var(--mp-line)`, 항목은 선에서 `1.4em` 떨어져 시작.
- 점: 8×8px 정사각, `box-sizing: border-box`, 1px `--mp-line` 테두리, 배경 `--mp-bg`(선을 끊는다). 선 가운데에 맞춤: `left: calc(-1.4em - 4.5px)` 반올림 `-5px`, 시각 글자 첫 줄 가운데 높이 `top: 0.55em`.
- 시각: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, `tabular-nums`. 형식 `HH:mm`(같은 날) / `MM.DD HH:mm`(다른 날) — `labels-numbers`.
- 내용: 위 `0.2em`, `--mp-size-body`, `opacity: var(--mp-opacity-body)`. 한두 줄.
- 항목 사이 `1.4em`, 날짜 머리 위 `2em`: `--mp-size-kicker`, `--mp-tracking-kicker`, `--mp-opacity-kicker`.
- 긴 기록은 20개씩 보이고 아래 `[ 더 보기 ]` 글자 버튼.

**반응형**
- 390px: 한 줄기, 시각은 내용 위. 항목 사이 `1.4em`.
- 700px 이상: 시각을 내용 왼쪽 열(`grid-template-columns: 7em 1fr`)로. 점은 그대로 선 위.
- 860px: 상세 화면 옆 칸이면 390px 배치(시각 위)로 되돌린다.
- 1180px: 폭 `--mp-width-read` 이하. 좌우 지그재그로 바꾸지 않는다.
- 긴 기록은 20개씩, 아래 `[ 더 보기 ]`.

**접근성**
- `ol`로 순서를 전달한다. 단계형이면 `aria-label="진행 단계"`.
- 현재 단계 `aria-current="step"`, 지난 단계는 내용에 "완료"를 글자로 둔다(점 채움만으로 말하지 않는다).
- `time`에 기계용 `datetime="2026-09-17T14:20"`.
- 점은 `::before` 장식이라 읽히지 않는다(의도).
- 새 기록이 실시간으로 붙으면 목록 위 `aria-live="polite"` 영역에 "새 기록 1개"만 알린다.
- 키보드: 누르는 항목만 Tab(항목 전체를 `a` 하나로). `[ 더 보기 ]`는 `button`, 누른 뒤 포커스를 새로 붙은 첫 항목으로 옮긴다.
- 날짜 머리는 `h3`로 두어 제목 탐색으로 건너뛸 수 있게 한다.

**조합 규칙**
- orange 점은 타임라인 전체에서 하나(가장 급한 지연 한 곳). 나머지 주의는 잉크 점 + 글자.
- 타임라인 위 제목과 `1em`, 아래 블록과 `--mp-section`.
- 항목 안에 카드·표·다른 타임라인을 넣지 않는다. 내용은 한두 줄 + 링크 하나.

## 상태
| 상태 | 표현 |
|---|---|
| 지난 항목 | 빈 점(1px `--mp-line`) |
| 지금·최신 | 점 채움 `--mp-ink` |
| 예정 | 빈 점 + 내용 `opacity: var(--mp-opacity-muted)` |
| 주의(한 곳, 조건이 참일 때만) | 점 채움 `--mp-accent` + 내용에 뜻("지연") |
| 누르는 항목 호버·포커스 | 점 테두리 `--mp-line-strong`, 내용 반전(배경 `--mp-ink`, 글자 `--mp-bg`) |
| 비어 있음 | 타임라인 대신 `empty-state` |

## 동작
- 움직임 없음. 새 항목은 즉시 삽입, 선이 그려지거나 점이 깜빡이는 효과 없음. reduced-motion에서도 같다.

## 데모
```html demo
<ol class="mp-timeline">
  <li class="is-now"><time datetime="2026-09-17T14:20">14:20</time><p>지금</p></li>
  <li class="is-alert"><time datetime="2026-09-17T11:05">11:05</time><p>지연</p></li>
  <li><time datetime="2026-09-17T09:00">09:00</time><p>완료</p></li>
  <li class="is-future"><time datetime="2026-09-17T18:00">18:00</time><p>예정</p></li>
</ol>
```

## 코드
```css
.mp-timeline { list-style: none; margin: 0; padding: 0 0 0 1.4em; border-left: var(--mp-border) solid var(--mp-line); }
.mp-timeline li { position: relative; margin-bottom: 1.4em; }
.mp-timeline li:last-child { margin-bottom: 0; }
.mp-timeline li::before {
  content: ""; position: absolute; left: calc(-1.4em - 5px); top: 0.55em;
  width: 8px; height: 8px; box-sizing: border-box;
  border: var(--mp-border) solid var(--mp-line); background: var(--mp-bg);
}
.mp-timeline li.is-now::before, .mp-timeline li[aria-current]::before { background: var(--mp-ink); border-color: var(--mp-ink); }
.mp-timeline li.is-alert::before { background: var(--mp-accent); border-color: var(--mp-accent); }
.mp-timeline li.is-future p { opacity: var(--mp-opacity-muted); }
.mp-timeline time {
  display: block; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta);
  opacity: var(--mp-opacity-meta); font-variant-numeric: tabular-nums;
}
.mp-timeline p { margin: 0.2em 0 0; font-size: var(--mp-size-body); opacity: var(--mp-opacity-body); }
.mp-timeline .is-date { margin-top: 2em; font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-kicker); opacity: var(--mp-opacity-kicker); }
.mp-timeline .is-date::before { display: none; }
.mp-timeline a { color: inherit; text-decoration: none; }
.mp-timeline a:hover p, .mp-timeline a:focus-visible p { background: var(--mp-ink); color: var(--mp-bg); opacity: 1; }
.mp-timeline li:has(a:hover)::before { border-color: var(--mp-line-strong); }
@media (min-width: 700px) {
  .mp-timeline li { display: grid; grid-template-columns: 7em 1fr; align-items: baseline; }
  .mp-timeline p { margin: 0; }
}
```

## 앱
- SwiftUI: 행마다 `HStack(alignment: .firstTextBaseline, spacing: 14)` — 왼쪽 `ZStack { Rectangle().fill(line).frame(width: 1); Rectangle().fill(isNow ? ink : bg).frame(width: 8, height: 8).overlay(Rectangle().stroke(line, lineWidth: 1)) }`, 오른쪽 시각·내용. `Circle()` 쓰지 않는다.
- Compose: `LazyColumn` 행에 `Modifier.drawBehind { drawLine(line, start, end, 1.dp.toPx()); drawRect(dotColor, topLeft, Size(8.dp.toPx(), 8.dp.toPx())) }`. `CircleShape` 금지.
- 새 항목 추가는 즉시 삽입, `animateItemPlacement` 없음.
- 등반 기록처럼 길면 날짜·구간 머리를 `stickyHeader`로 고정할 수 있다(배경 `bg`, 아래 1pt 선).
```swift
HStack(alignment: .firstTextBaseline, spacing: 14) {
  Rectangle().fill(isNow ? Color("Ink") : Color("Bg")).frame(width: 8, height: 8)
    .overlay(Rectangle().stroke(Color("Line"), lineWidth: 1))
  VStack(alignment: .leading) { Text(time).opacity(0.7).monospacedDigit(); Text(title) }
}.accessibilityElement(children: .combine).accessibilityAddTraits(isNow ? .isSelected : [])
```
```kotlin
Row(Modifier.semantics(mergeDescendants = true) { if (isNow) stateDescription = "현재" }) {
  Box(Modifier.padding(top = 6.dp).size(8.dp).border(1.dp, Line, RectangleShape).background(if (isNow) Ink else Bg))
  Spacer(Modifier.width(14.dp)); Column { Text(time, Modifier.alpha(0.7f)); Text(title) }
}
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 시각은 한 형식으로, 같은 날짜 반복은 생략.
- 해야 할 것: 방향(최신 위/처음 위)을 화면마다 하나로.
- 해야 할 것: 상태는 점 채움 + 글자로 함께.
- 하지 말 것: 원형 점, 굵은 세로선, 점선 연결선.
- 하지 말 것: 항목마다 색 구분, orange 점 여러 개.
- 하지 말 것: 좌우 지그재그 배치, 항목마다 카드 박스.
- 하지 말 것: 스크롤에 따라 선이 그려지는 애니메이션.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 원형 점 | 8px 정사각 |
| 2px 세로선 | 1px `--mp-line` |
| 날짜를 항목마다 반복 | 날짜 머리 한 번 |
| 상태를 점 색만으로 | 점 + "완료"·"지연" 글자 |
| 좌우 지그재그 | 왼쪽 한 줄기 |
| orange 점 여러 개 | 하나, 나머지 잉크 |
