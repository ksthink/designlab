---
id: badge
name: 배지
nameEn: Badge
category: content
summary: 플랫폼·상태 같은 짧은 속성을 1px 선 사각형 안에 옅게 적는다. "준비 중"은 점선.
aliases: [배지, badge, 뱃지, 라벨, 플랫폼 표시, 상태 표시, 준비 중, soon, pill]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .meta .badge
pillars: [minimalism]
tokens: [--mp-border, --mp-line, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-accent]
effects: []
related: [tag, card, chip, status-dot]
---

## 용도
누를 수 없는 짧은 속성을 항목에 붙일 때 쓴다: 플랫폼(`web`, `ios`, `android`), 상태(`준비 중`), 형식(`svg`, `png`).
여러 개면 한 줄 묶음(`meta`)으로 나열한다.
누를 수 있거나 필터로 쓰면 `chip`, 분류·키워드 이름이면 `tag`, 켜짐/기록 중 같은 실시간 상태는 `status-dot`을 쓴다.
숫자 알림 수(읽지 않은 3개 등)를 원형 배지로 붙이지 않는다. 숫자는 글자로 적는다.

## 생김새
**구조**
- 묶음 `div.meta` 안에 `span.badge`를 나열한다. 묶음이 투명도를 한 번만 갖고, 배지는 선만 갖는다(투명도가 겹쳐 곱해지지 않게).

**수치**
- 묶음: `display: flex; align-items: center; flex-wrap: wrap; gap: 0.5em`
- 글자: `--mp-size-meta`, 자간 `--mp-tracking-meta`, 굵기 400, 행간 기본
- 묶음 투명도: `opacity: var(--mp-opacity-meta)` (.55)
- 배지: `border: var(--mp-border) solid var(--mp-line)`, 안쪽 여백 `0.25em 0.6em`(목록 카드), `0.3em 0.7em`(읽기 화면, 글자 `clamp(0.7rem, 1.8vw, 0.78rem)`)
- radius 0, 배경 없음, 아이콘 없음
- 글자: 영문은 소문자(`ios`), 한국어는 짧은 명사(`준비 중`). 두 단어 이하
- 순서: 플랫폼(web → ios → android) → 상태

**반응형**
- 줄바꿈은 `flex-wrap`에 맡긴다. 배지 하나 안의 글자는 `white-space: nowrap`으로 끊지 않는다.
- 좁은 화면에서도 크기를 줄이지 않는다(`--mp-size-meta`가 이미 clamp).
- 390px: 배지 묶음이 두 줄로 넘어갈 수 있다. 줄 간격은 `gap` 0.5em 그대로.
- 700px / 860px: 변화 없음 — 글자 크기가 clamp라 따로 조정하지 않는다.
- 1180px: 변화 없음. 읽기 화면(760px 틀)은 `.mp-badge-meta--read` 값.

**접근성**
- 장식이 아닌 정보이므로 `aria-hidden`을 붙이지 않는다. 묶음에 `aria-label="플랫폼"` 같은 이름을 줄 수 있다.
- .55 투명도라 대비가 낮다. 배지에만 있는 필수 정보가 없게 한다(예: 출시 여부는 상세 화면 노트에도 쓴다).
- 점선/실선 차이만으로 뜻을 전하지 않는다 — `준비 중` 글자가 함께 있다.
- 포커스를 받지 않는다(`tabindex` 없음). 누를 수 있어 보이는 커서·호버를 주지 않는다.

**조합 규칙**
- 배지 줄은 카드·읽기 화면에서 하나. 제목 옆에 붙이지 않고 설명 아래·버튼 위에 둔다(`page-read` 순서).
- `■` 강조는 화면 전체에서 하나이므로 배지에 쓰면 같은 화면의 버튼·점에는 쓰지 않는다.
- `tag`(글자만)와 한 줄에 섞지 않는다. 필요하면 태그 줄과 배지 줄을 나눈다.
- 배지 안에 `status-dot`·아이콘을 넣지 않는다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 실선 1px `--mp-line` |
| 준비 중 | `border-style: dashed` + `준비 중` 글자 |
| 강조가 꼭 필요할 때 | 배지 앞에 `■` 하나를 `--mp-accent`로(화면당 하나). 배지 면·선을 칠하지 않는다 |
| 호버·포커스 | 없음(누를 수 없다) |

## 데모
```html demo
<div class="mp-badge-meta">
  <span class="mp-badge">web</span>
  <span class="mp-badge">ios</span>
  <span class="mp-badge mp-badge--soon">soon</span>
  <span class="mp-badge"><span class="mp-badge-mark" aria-hidden="true">■</span>new</span>
</div>
```

## 코드
```css
.mp-badge-meta {
  display: flex; align-items: center; flex-wrap: wrap; gap: 0.5em;
  font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta);
  opacity: var(--mp-opacity-meta);
}
.mp-badge {
  display: inline-flex; align-items: center; gap: 0.4em;
  border: var(--mp-border) solid var(--mp-line); border-radius: 0;
  padding: 0.25em 0.6em; white-space: nowrap;
}
.mp-badge--soon { border-style: dashed; }
.mp-badge-mark { color: var(--mp-accent); font-size: 0.8em; } /* 강조 — 화면당 하나 */
.mp-badge-meta--read { font-size: clamp(0.7rem, 1.8vw, 0.78rem); }
.mp-badge-meta--read .mp-badge { padding: 0.3em 0.7em; }
```

```html
<!-- 실제 사용 -->
<div class="mp-badge-meta" aria-label="플랫폼">
  <span class="mp-badge">web</span><span class="mp-badge">ios</span>
  <span class="mp-badge mp-badge--soon">준비 중</span>
</div>
```

## 앱
- SwiftUI: `Text("ios").font(.custom("Mulmaru", size: 11)).tracking(0.9).padding(.horizontal, 7).padding(.vertical, 3).overlay(Rectangle().stroke(line, lineWidth: 1))`, 묶음 `HStack(spacing: 6)`에 `.opacity(0.55)`.
- 점선: `Rectangle().stroke(line, style: StrokeStyle(lineWidth: 1, dash: [3, 2]))`.
- Compose: `Text(modifier = Modifier.border(1.dp, line, RectangleShape).padding(horizontal = 7.dp, vertical = 3.dp))`. 점선은 `Modifier.drawBehind { drawRect(line, style = Stroke(1.dp.toPx(), pathEffect = PathEffect.dashPathEffect(floatArrayOf(6f, 4f)))) }`.
- Material `Badge`/`BadgedBox`(원형 숫자 점)와 iOS `.badge()`(탭 아이템 빨간 원)는 쓰지 않는다. 탭 바 알림 수는 OS 탭 바를 쓸 때만 OS 모양 예외.
- 줄바꿈: `FlowRow`(Compose), `Layout` 또는 `ViewThatFits`(SwiftUI).
```swift
HStack(spacing: 6) {
  ForEach(platforms, id: \.self) { p in
    Text(p).font(.custom("Mulmaru", size: 11)).tracking(0.9)
      .padding(.horizontal, 7).padding(.vertical, 3)
      .overlay(Rectangle().stroke(Color("Line"), style: StrokeStyle(lineWidth: 1, dash: p == "준비 중" ? [3, 2] : [])))
  }
}.opacity(0.55).accessibilityElement(children: .combine).accessibilityLabel("플랫폼: " + platforms.joined(separator: ", "))
```
```kotlin
FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp), modifier = Modifier.alpha(0.55f)) {
  platforms.forEach { Text(it, fontFamily = Mulmaru, fontSize = 11.sp, modifier = Modifier.border(1.dp, line, RectangleShape).padding(horizontal = 7.dp, vertical = 3.dp)) }
}
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 한두 단어, 같은 줄 배지는 같은 모양·크기.
- 해야 할 것: 투명도는 묶음에 한 번만 준다.
- 해야 할 것: 상태는 글자로 말하고, 점선은 보조 표시로만.
- 하지 말 것: 알약 모양(radius 9999px), 둥근 모서리.
- 하지 말 것: 색 배경 배지(초록 "출시", 빨강 "종료"), teal·orange 테두리.
- 하지 말 것: 굵은 글자, 대문자 `IOS`, 아이콘 붙인 배지.
- 하지 말 것: 누를 수 있어 보이는 호버·커서, 배지를 링크로 만들기(그럴 땐 `chip`).
- 하지 말 것: 한 항목에 배지 5개 이상.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 반지름 999px 알약 모양 | radius 0 사각형 |
| 초록 배경 `출시`, 빨강 `종료` | 선만, 상태는 글자 + 점선 |
| 배지마다 `opacity: .55` 후 묶음에도 `.55` | 투명도는 묶음에 한 번 |
| `IOS`, `Android` 표기 섞기 | 소문자 `ios`, `android` 통일 |
| 배지를 `<a>`로 만들어 필터 | `chip` 사용 |
