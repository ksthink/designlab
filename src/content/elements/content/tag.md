---
id: tag
name: 태그
nameEn: Tag
category: content
summary: 분류 이름을 선·면 없이 옅은 글자로 적고 가운뎃점으로 잇는다. 링크면 호버에 진해진다.
aliases: [태그, tag, 꼬리표, 분류, 카테고리 표시, label, 키워드, hashtag, 주제, topic]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism]
tokens: [--mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-link, --mp-opacity-muted, --mp-ink, --mp-bg, --mp-duration-hover]
effects: [invert-hover]
related: [badge, chip, list, card, microcopy]
---

## 용도
항목이 속한 분류·주제·키워드를 적을 때 쓴다. 여러 개면 가운뎃점 `·`로 잇는다.
속성(플랫폼·상태)은 `badge`, 눌러서 목록을 거르거나 켜고 끄는 것은 `chip`을 쓴다.
태그가 한 화면의 주된 탐색 수단이 되면 `tabs`나 `menu`를 검토한다.

## 생김새
**구조**
- 한 줄 묶음 `p` 또는 `ul` 안에 태그들. 태그는 글자(`span`) 또는 링크(`a`).
- 구분자 `·`는 두 번째 태그부터 `::before`로 붙인다.
- `#` 접두사는 쓰지 않는다. 사용자가 직접 입력하는 해시태그 기능일 때만 입력값 그대로 보인다.

**수치**
- 선·면·radius 없음.
- 글자 `--mp-size-meta`, 자간 `--mp-tracking-meta`.
- 글자 태그 `opacity: var(--mp-opacity-meta)`(보조 정보 전용).
- 링크 태그 `opacity: var(--mp-opacity-link)`, 호버·포커스 1.
- 구분자 `·` 좌우 `0.4em`, `opacity: var(--mp-opacity-meta)`.
- 한 항목에 1–3개. 넘치면 앞 3개 + `+2` 표기.
- 카드 안에서는 설명 아래, 배지 줄 위 또는 배지 줄과 같은 줄 앞쪽.

**반응형**
- 390px: 3개를 넘으면 앞 3개 + `+N`. 줄 첫머리에 `·`가 오지 않게 구분자는 뒤 태그 앞(`::before`)에 둔다.
- 700px: 카드 안에서는 한 줄, 넘치면 `flex-wrap: wrap`.
- 860px: 상세 화면(`page-read`)에서는 kicker 아래 또는 본문 끝에 모두 펼친다(`+N` 없음).
- 1180px: 목록 화면 필터 줄로 쓰지 않는다(그건 `chip`). 폭이 넓어도 태그 수를 늘리지 않는다.

**접근성**
- 태그 묶음은 `ul` + `li`로 개수를 전달하거나, `p`면 `aria-label="분류"`로 묶음 뜻을 준다.
- 구분자 `·`는 CSS 의사 요소라 읽히지 않는다(의도).
- 링크 태그는 링크 텍스트가 그대로 목적지다: "생산성" → 생산성 분류 목록. `aria-current="page"`로 현재 분류 표시.
- `.55` 투명도라 필수 정보를 태그에만 두지 않는다. 분류가 중요하면 제목 근처에 불투명 글자로.
- 포커스 링 `outline: 1px solid var(--mp-ink); outline-offset: 2px`.
- 링크 태그 묶음이 탐색 역할이면 `nav aria-label="분류"` > `ul` > `li` > `a`.
- 키보드: 링크 태그만 Tab에 들어간다. 글자 태그(`span`)는 포커스를 받지 않는다. `+N`은 `button aria-expanded="false" aria-label="태그 2개 더 보기"`.

**조합 규칙**
- 태그는 orange·teal을 쓰지 않는다. 화면의 orange 하나는 다른 요소에 양보한다.
- `badge` 줄과 같은 줄에 두면 태그 먼저, 사이 `0.8em`. 카드 제목 바로 아래는 `0.4em`.
- 태그 안에 아이콘·배지를 넣지 않는다. 태그끼리 중첩 없음.

## 상태
| 상태 | 표현 |
|---|---|
| 기본(글자) | `--mp-opacity-meta` |
| 기본(링크) | `--mp-opacity-link` |
| 호버·포커스(링크) | `opacity: 1`, 강한 강조가 필요하면 반전(배경 `--mp-ink`, 글자 `--mp-bg`) |
| 현재 분류 | `opacity: 1` + `aria-current` |
| 접힘 | `+N` 글자, 누르면 모두 보임 |
| 비활성 | `opacity: var(--mp-opacity-muted)` |

## 동작
- 호버는 opacity → 1 (`--mp-duration-hover` ease). 반전을 쓰면 `invert-hover`.
- `+N`을 누르면 즉시 펼친다. 애니메이션 없음.
- reduced-motion이면 transition 없음.
- `+N` 펼침은 즉시. reduced-motion에서는 opacity 전환도 없앤다(움직임 없음).

## 데모
```html demo
<p class="mp-tag-row">
  <span class="mp-tag">기록</span>
  <a class="mp-tag" href="#">생산</a>
  <a class="mp-tag is-hover" href="#">픽셀</a>
  <a class="mp-tag is-current" href="#" aria-current="page">메모</a>
  <span class="mp-tag">+2</span>
</p>
```

## 코드
```css
.mp-tag-row { display: flex; flex-wrap: wrap; align-items: baseline; margin: 0; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); }
.mp-tag { color: inherit; text-decoration: none; opacity: var(--mp-opacity-meta); transition: opacity var(--mp-duration-hover) ease; }
a.mp-tag { opacity: var(--mp-opacity-link); }
.mp-tag + .mp-tag::before { content: "·"; display: inline-block; margin: 0 0.4em; opacity: var(--mp-opacity-meta); }
a.mp-tag:hover, a.mp-tag:focus-visible, a.mp-tag.is-hover, .mp-tag.is-current, .mp-tag[aria-current] { opacity: 1; }
a.mp-tag:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 2px; }
.mp-tag--invert:hover, .mp-tag--invert:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-tag.is-disabled { opacity: var(--mp-opacity-muted); pointer-events: none; }
@media (prefers-reduced-motion: reduce) { .mp-tag { transition: none; } }
```

## 앱
- SwiftUI: `Text(tags.prefix(3).joined(separator: " · "))`, `.font(.custom("Mulmaru", size: 12))`, `.opacity(0.55)`. 누르는 태그는 `Button` + `.buttonStyle(.plain)`로 각각.
- Compose: `FlowRow` 안에 `Text`, 구분자 `" · "`, `Modifier.alpha(0.55f)`. Material `AssistChip`/`SuggestionChip`은 둥글고 테두리가 있어 쓰지 않는다.
- 터치 태그는 글자가 작으므로 `Modifier.minimumInteractiveComponentSize()`/`.contentShape(Rectangle())`로 44pt/48dp 영역을 확보한다.
```swift
Text(tags.prefix(3).joined(separator: " · ") + (tags.count > 3 ? " +\(tags.count - 3)" : ""))
  .font(.custom("Mulmaru", size: 12)).opacity(0.55).accessibilityLabel("분류: " + tags.joined(separator: ", "))
```
```kotlin
FlowRow(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
  tags.forEachIndexed { i, t -> Text(if (i == 0) t else "· $t", Modifier.alpha(0.55f), fontSize = 12.sp) }
}
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 한 단어 명사, 한 항목에 3개 안팎.
- 해야 할 것: 같은 분류는 모든 화면에서 같은 이름으로.
- 해야 할 것: 링크 태그는 그 분류 목록으로 바로 이동.
- 하지 말 것: 색깔별 태그(분류용 색은 미정 — 필요하면 사용자에게 묻는다).
- 하지 말 것: 알약 모양 배경, 태그마다 테두리.
- 하지 말 것: `#` 접두사 남발, 대문자 영문 태그.
- 하지 말 것: 필수 정보를 태그에만 두기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `#생산성` 알약 배지 | `생산성` 글자, 선·면 없음 |
| 분류마다 다른 색 | 색 없음, 이름으로 구분 |
| `AssistChip`·`Chip` 컴포넌트 | `Text` + `·` 구분 |
| 태그 10개 나열 | 3개 + `+N` |
| 필터 토글로 쓰기 | 누르고 켜는 것은 `chip` |
