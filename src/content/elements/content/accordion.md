---
id: accordion
name: 아코디언
nameEn: Accordion
category: content
summary: details 요소로 접고 펴는 영역. 제목 앞 +/- 글자와 윗선 1px, 기본은 접힌 상태.
aliases: [아코디언, accordion, details, 접기, 펼치기, collapse, 더보기, FAQ, 토글 영역, disclosure]
platforms: [web, ios, android]
status: extracted
source: design_lab src/pages/libraries.astro details, summary
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-line, --mp-size-small, --mp-tracking-small, --mp-opacity-link, --mp-size-kicker, --mp-leading-card, --mp-tracking-body, --mp-opacity-body, --mp-ink, --mp-opacity-muted]
effects: []
related: [list, table-of-contents, divider, key-value]
---

## 용도
평소에는 필요 없는 부가 설명을 숨겨 둘 때 쓴다: 쓰는 법, 주의, FAQ 답, 라이브러리 세부, 코드 보기.
사용자가 부르기 전에는 펼치지 않는다(기본 닫힘).
모두가 읽어야 하는 핵심 정보(가격, 되돌릴 수 없음 경고)는 접지 않는다.
탭처럼 한 번에 하나만 보여야 하는 전환은 `tabs`, 문서 안 이동은 `table-of-contents`를 쓴다.

## 생김새
**구조**
- HTML `<details>` + `<summary>` + 내용. 스크립트 없이 동작하고 키보드·스크린리더가 기본 지원한다.
- 여러 항목은 `<details>`를 연속으로 둔다. 감싸는 카드·박스 없음.
- 제목은 `summary` 안에 글자만. 제목 레벨이 필요하면 `summary` 안에 `h3`를 두되 크기는 아래 값으로 되돌린다.

**수치** (design_lab 원값)
- 항목: 윗선 `var(--mp-border) solid var(--mp-line)`, 위 바깥 `0.9em`, 선 아래 `0.7em`, 연속 항목 사이 `0.7em`
- 마지막 항목 아래선은 없다(다음 요소가 여백으로 나눈다). 목록이 페이지 끝이면 아래선 하나를 더한다
- 제목: `--mp-size-small`, `--mp-tracking-small`, `opacity: var(--mp-opacity-link)`(.75), `cursor: pointer`, `list-style: none`
- 표시 글자: 닫힘 `+`, 열림 `-`, `display: inline-block; width: 1.2em`. 브라우저 삼각형(`::-webkit-details-marker`) 숨김
- 내용: 위 `0.6em`, 아래 `0.2em`, `--mp-size-kicker`, 행간 `--mp-leading-card`, 자간 `--mp-tracking-body`, `opacity: var(--mp-opacity-body)`
- 내용 들여쓰기 없음(제목 글자와 표시 글자 폭만큼 맞추려면 `padding-left: 1.2em`)
- 터치 영역: 제목 줄 최소 높이 `2.75em`(약 44px)

**반응형**
- 폭은 부모를 따른다. 좁은 화면에서 제목이 두 줄이 되면 `+` 표시는 첫 줄 앞에 그대로 둔다(`display: flex; align-items: baseline`).
- 카드 안(라이브러리 목록)에서는 수치 그대로, 긴 읽기 문서(FAQ)에서는 제목을 `--mp-size-body`로 한 단계 올려도 된다.
- 390px: 제목 줄 최소 높이 2.75em 유지, 긴 제목은 두 줄로 감기고 `+`는 첫 줄 앞.
- 700px / 860px: 변화 없음.
- 1180px: 목록형 틀 안에서도 아코디언 폭은 `--mp-width-read`(760px)를 넘기지 않는다 — 내용이 한 줄로 너무 길어진다.

**접근성**
- `<summary>`가 버튼 역할과 펼침 상태(aria-expanded)를 브라우저가 알린다. `div` + JS로 흉내 내지 않는다.
- 키보드: Tab으로 제목에 멈추고 Enter/Space로 여닫는다.
- `+`/`-` 글자는 시각 표시일 뿐, 제목 글자가 뜻을 전한다. `::before` 내용이라 읽히지 않는다.
- 페이지 내 찾기(Ctrl+F)가 닫힌 내용을 찾을 수 있게 `hidden="until-found"`를 쓰는 커스텀 구현도 허용.
- 제목 투명도 .75라 필수 정보 기준(.7 이상)을 지킨다.
- 네이티브 `<summary>`에는 `aria-expanded`를 직접 붙이지 않는다(브라우저가 알린다). `role="button"`도 붙이지 않는다.
- 커스텀 구현(앱 웹뷰, 프레임워크 컴포넌트)일 때만: `<button aria-expanded="false" aria-controls="p1">` + `<div id="p1" role="region" aria-labelledby="b1" hidden>`, Enter/Space로 토글, 열면 `aria-expanded="true"`와 `hidden` 제거.
- 포커스는 여닫은 뒤에도 제목에 남는다. 열 때 내용으로 포커스를 옮기지 않는다.

**조합 규칙**
- 아코디언 안에 아코디언을 넣지 않는다(중첩 금지). 안에는 문단·목록·`code-block`·`table`까지.
- `card` 안에서는 항목 1–3개까지(라이브러리 카드의 `쓰는 법`·`주의`). 그 이상이면 상세 화면으로.
- 윗선이 구분을 맡으므로 바로 위에 `divider`를 두지 않는다.
- orange `■`는 제목 앞 `+` 자리를 대신하지 않는다. 필요하면 제목 뒤 한 곳.

## 상태
| 상태 | 표현 |
|---|---|
| 닫힘(기본) | `+ 제목` |
| 열림 | `- 제목`, 내용 표시 |
| 호버 | 제목 `opacity: 1` |
| 포커스(키보드) | 제목 `opacity: 1` + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 비활성 | 쓰지 않는다. 내용이 없으면 항목을 지운다 |
| 열린 채 시작 | `<details open>` — 사용자가 방금 연 항목을 새로고침 뒤 복원할 때만 |

## 동작
- 여닫기는 즉시. 높이 트윈·페이드·표시 글자 회전 애니메이션을 넣지 않는다.
- 여러 항목을 동시에 열 수 있다. 하나만 열리게 할 필요가 있을 때만 같은 `name` 속성(`<details name="faq">`)을 준다.

## 데모
```html demo
<div class="mp-accordion">
  <details><summary>주의</summary><p>■</p></details>
  <details class="is-hover"><summary>호버</summary><p>■</p></details>
  <details open><summary>열림</summary><p>■ ■ ■</p></details>
</div>
```

## 코드
```css
.mp-accordion details { border-top: var(--mp-border) solid var(--mp-line); margin-top: 0.9em; padding-top: 0.7em; }
.mp-accordion details + details { margin-top: 0.7em; }
.mp-accordion summary {
  display: flex; align-items: baseline; min-height: 2.75em;
  list-style: none; cursor: pointer;
  font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small);
  opacity: var(--mp-opacity-link);
}
.mp-accordion summary::-webkit-details-marker { display: none; }
.mp-accordion summary::before { content: "+"; display: inline-block; flex: 0 0 1.2em; width: 1.2em; }
.mp-accordion details[open] > summary::before { content: "-"; }
.mp-accordion summary:hover, .mp-accordion details.is-hover > summary { opacity: 1; }
.mp-accordion summary:focus-visible { opacity: 1; outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-accordion details > :not(summary) {
  margin: 0.6em 0 0.2em;
  font-size: var(--mp-size-kicker); line-height: var(--mp-leading-card); letter-spacing: var(--mp-tracking-body);
  opacity: var(--mp-opacity-body);
}
.mp-accordion--end details:last-child { border-bottom: var(--mp-border) solid var(--mp-line); padding-bottom: 0.7em; }
.mp-accordion .mp-accordion-empty { opacity: var(--mp-opacity-muted); }
```

## 앱
- SwiftUI: `DisclosureGroup(isExpanded:)`의 기본 화살표 대신 커스텀 `DisclosureGroupStyle` — `Button { withAnimation(nil) { isExpanded.toggle() } } label: { HStack { Text(isExpanded ? "-" : "+").frame(width: 16); Text(title) } }`, 윗선 `Rectangle().frame(height: 1)`.
- Compose: `Column { Row(Modifier.clickable(indication = null) { open = !open }.heightIn(min = 48.dp)) { Text(if (open) "-" else "+"); Text(title) }; if (open) Text(body) }`. `AnimatedVisibility`·`animateContentSize` 없이 즉시.
- 접근성: SwiftUI `.accessibilityAddTraits(.isButton)` + `.accessibilityValue(isExpanded ? "펼침" : "접힘")`, Compose `Modifier.semantics { stateDescription = if (open) "펼침" else "접힘" }`.
- 행 전체가 터치 영역, 최소 44pt/48dp. 리플·하이라이트 색 없음(누르는 동안 제목 opacity 1).
```swift
struct MPDisclosure<Content: View>: View {
  let title: String; @ViewBuilder var content: Content; @State private var open = false
  var body: some View {
    VStack(alignment: .leading, spacing: 8) {
      Rectangle().fill(Color("Line")).frame(height: 1)
      Button { open.toggle() } label: { HStack(alignment: .firstTextBaseline) { Text(open ? "-" : "+").frame(width: 16); Text(title) } }
        .buttonStyle(.plain).frame(minHeight: 44).accessibilityValue(open ? "펼침" : "접힘")
      if open { content.opacity(0.85) }
    }.transaction { $0.animation = nil }
  }
}
```
```kotlin
var open by rememberSaveable { mutableStateOf(false) }
Column { HorizontalDivider(thickness = 1.dp, color = line)
  Row(Modifier.heightIn(min = 48.dp).toggleable(open, indication = null, interactionSource = src, role = Role.Button) { open = it }) { Text(if (open) "-" else "+", Modifier.width(16.dp)); Text(title) }
  if (open) Text(body, Modifier.alpha(0.85f)) }
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 기본은 닫힘.
- 해야 할 것: 제목은 짧은 명사("주의", "쓰는 법", "라이선스").
- 해야 할 것: `<details>`/`<summary>`를 우선 쓴다.
- 해야 할 것: 표시는 `+`/`-` 글자, 구분은 윗선 1px.
- 하지 말 것: 회전하는 화살표·셰브론 아이콘.
- 하지 말 것: 미끄러지는 높이 애니메이션, 페이드.
- 하지 말 것: 항목마다 카드 박스·배경색, 열린 항목 배경 강조.
- 하지 말 것: 필수 경고를 접어 두기.
- 하지 말 것: 다른 항목을 열면 강제로 닫히게 하기(필요한 경우 `name`만).

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 셰브론 아이콘이 180° 회전 | `+`/`-` 글자 교체 |
| `max-height` 트랜지션으로 미끄러짐 | 즉시 열고 닫기 |
| `<div onclick>` 토글 | `<details>/<summary>` 또는 `<button aria-expanded>` |
| `<summary aria-expanded>` 중복 | 네이티브에는 aria 없음 |
| 열린 항목 배경 teal | 배경 변화 없음 |
| 되돌릴 수 없음 경고를 접어 둠 | 필수 경고는 펼친 본문에 |
