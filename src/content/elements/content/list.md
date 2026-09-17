---
id: list
name: 목록
nameEn: List
category: content
summary: 한 줄 항목을 1px 선으로 나눠 세로로 쌓는다. 글머리 표시는 옅은 ■, 누르는 행은 잉크/배경 반전.
aliases: [목록, list, 리스트, 행 목록, list item, 설정 목록, 메모 목록, 불릿, bullet, ul, 항목 목록]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-line, --mp-size-body, --mp-tracking-body, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-kicker, --mp-opacity-body, --mp-opacity-muted, --mp-ink, --mp-bg, --mp-secondary, --mp-palette-slate, --mp-duration-hover, --mp-leading-body]
effects: [invert-hover]
related: [card, table, key-value, settings, divider, empty-state]
---

## 용도
한 줄로 설명되는 항목(메모, 기록, 설정, 파일)을 차례로 보여 줄 때 쓴다. 문장 속 나열은 글머리 목록(■)으로 쓴다.
썸네일이 필요하면 `card`, 여러 열을 같은 기준으로 비교하면 `table`, 이름–값 쌍이면 `key-value`를 쓴다.
항목이 0개면 목록 틀을 그리지 않고 `empty-state`를 보인다.

## 생김새
**구조** — 두 종류가 있다.
- 행 목록(누르는 목록): `ul` > `li` > `a`(또는 `button`). 행 안은 왼쪽 제목, 오른쪽 메타와 `>`.
- 글머리 목록(읽는 목록): `ul` > `li`, 앞에 `■` 의사 요소. 본문 속 나열용.
- 번호가 의미 있으면 `ol`을 쓰고 번호는 `01.`처럼 두 자리 + 점(`labels-numbers`).

**수치 — 행 목록**
- 목록 윗선과 행마다 아랫선 `var(--mp-border) solid var(--mp-line)`. 세로 선 없음.
- 행 안쪽 여백 `0.9em 0.4em`, 최소 높이 44px(터치 영역).
- 제목 `--mp-size-body`, 자간 `--mp-tracking-body`, 불투명(필수 정보). 한 줄 넘치면 `text-overflow: ellipsis`.
- 메타(날짜·개수) `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, `tabular-nums`, 줄바꿈 금지.
- 제목과 메타 사이 `gap: 1em`, `align-items: baseline`.
- 끝 표시 `>` 는 메타 뒤 `0.4em`, 다른 화면으로 이동하는 행에만.

**수치 — 글머리 목록**
- `list-style: none`, `li` 왼쪽 여백 `1.3em`.
- `■` 크기 `0.55em`, `opacity: var(--mp-opacity-kicker)`, 첫 줄 가운데 높이에 맞춘다.
- 본문 `opacity: var(--mp-opacity-body)`, 행간 `--mp-leading-body`, 항목 사이 `0.4em`.
- 중첩은 한 단계까지, 안쪽 목록은 `■` 대신 `-`.

**반응형**
- 390px(휴대폰): 메타를 제목 아래 줄로 내린다(`flex-wrap: wrap`, 메타 `width: 100%`). 행 좌우 여백 `0.4em` 유지, `>` 는 메타 줄 끝.
- 700px: 제목·메타 한 줄. 목록은 부모 폭 100%.
- 860px: 목록–상세 두 칸 화면이면 목록 칸 폭 `clamp(280px, 32vw, 380px)`, 현재 항목 `aria-current="page"` + 제목 앞 `>`.
- 1180px(`--mp-width-list`): 목록만 있는 화면도 행이 너무 길어지지 않게 `max-width: var(--mp-width-read)`로 가운데 둔다.
- 항목이 수백 개면 페이지 나누기(`pagination`)나 가상 스크롤. 무한 스크롤 로딩 표시는 `loading`.

**접근성**
- 행 목록은 `ul`/`li`의 목록 의미를 유지한다. 행 전체를 `a` 하나로 감싸 탭 순서에 행당 하나만 둔다.
- 행 안에 두 번째 행동(삭제 등)이 필요하면 행 링크 밖 별도 `button`으로 두고 `aria-label="장보기 목록 삭제"`처럼 대상을 적는다.
- 선택 가능한 목록은 `role="listbox"` + `li role="option" aria-selected`, 위아래 화살표로 이동, Space/Enter로 선택.
- 현재 보고 있는 항목은 `aria-current="page"`.
- 포커스 표시는 반전 배경으로 충분하지만 `outline: 1px solid var(--mp-ink); outline-offset: -1px`을 함께 둔다(고대비 모드).
- `■`, `>` 는 장식이므로 CSS 의사 요소 또는 `aria-hidden="true"`.
- 키보드: Tab은 행 링크 사이만 이동한다. `listbox`형이면 Tab으로 목록에 한 번 들어가고 ↑/↓ 이동, Home/End 처음·끝, Space/Enter 선택(`aria-activedescendant` 또는 roving `tabindex`).
- 행 링크 이름은 제목 + 메타가 함께 읽힌다("장보기 09.16"). `>` 는 이름에 넣지 않는다.
- 비활성 행은 `aria-disabled="true"`, 링크면 `href`를 빼고 `tabindex="-1"`.

**조합 규칙**
- orange는 목록 전체에서 한 행의 `■` 하나까지(예: 마감 임박). 선택 teal 면과 같은 행에 두지 않는다(1.24:1).
- 목록 위 `section-head`나 kicker와 `0.8em`, 아래 다른 블록과 `--mp-section` 간격.
- 행 안에 카드·목록·표를 넣지 않는다. 중첩은 글머리 목록 한 단계까지.
- `card` 격자와 행 목록을 한 분류에서 섞지 않는다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px 선 구분, 투명 배경 |
| 호버·포커스(누르는 행) | 배경 `--mp-ink`, 글자 `--mp-bg`, 메타도 같이 반전(`--mp-duration-hover` ease) |
| 누름(터치) | 호버와 같은 반전, 즉시 |
| 선택 | 행 앞 `■`(잉크) 또는 배경 `--mp-secondary` + 글자 `--mp-palette-slate` |
| 현재 위치 | `aria-current`, 제목 앞 `>` |
| 비활성 | `opacity: var(--mp-opacity-muted)`, 반전 없음, `pointer-events: none` |
| 비어 있음 | 목록 대신 `empty-state` |

## 동작
- 호버 반전은 `invert-hover`: 배경·글자 `--mp-duration-hover` ease.
- 항목 추가·삭제는 즉시 반영한다. 미끄러져 사라지는 애니메이션을 넣지 않는다.
- 스와이프 삭제(앱)는 OS 동작을 쓰되 되돌릴 수 없으면 `confirm-step`.
- `prefers-reduced-motion: reduce`이면 transition 없음.
- 움직임 없음이 기본이다. reduced-motion에서는 반전도 즉시 바뀐다(최종 상태만).

## 데모
```html demo
<ul class="mp-list">
  <li><a href="#"><span>메모</span><span class="mp-list-meta">09.17 &gt;</span></a></li>
  <li><a class="is-hover" href="#"><span>장보기</span><span class="mp-list-meta">09.16 &gt;</span></a></li>
  <li><a class="is-selected" href="#"><span>책</span><span class="mp-list-meta">09.12 &gt;</span></a></li>
  <li><a class="is-disabled" href="#" aria-disabled="true"><span>보관</span><span class="mp-list-meta">08.30</span></a></li>
</ul>
<ul class="mp-list-bullet"><li>하나</li><li>둘</li></ul>
```

## 코드
```css
.mp-list { list-style: none; margin: 0; padding: 0; border-top: var(--mp-border) solid var(--mp-line); }
.mp-list li { border-bottom: var(--mp-border) solid var(--mp-line); }
.mp-list a {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: baseline; gap: 0 1em;
  min-height: 44px; box-sizing: border-box; padding: 0.9em 0.4em; color: inherit; text-decoration: none;
  font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-list a:hover, .mp-list a:focus-visible, .mp-list a.is-hover {
  background: var(--mp-ink); color: var(--mp-bg); outline: 1px solid var(--mp-ink); outline-offset: -1px;
}
.mp-list a.is-selected, .mp-list a[aria-selected="true"] { background: var(--mp-secondary); color: var(--mp-palette-slate); }
.mp-list a.is-disabled, .mp-list a[aria-disabled="true"] { opacity: var(--mp-opacity-muted); pointer-events: none; }
.mp-list-meta {
  font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta);
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.mp-list-bullet { list-style: none; margin: 1.2em 0 0; padding: 0; }
.mp-list-bullet li { position: relative; padding-left: 1.3em; margin-bottom: 0.4em; line-height: var(--mp-leading-body); opacity: var(--mp-opacity-body); }
.mp-list-bullet li::before {
  content: "■"; position: absolute; left: 0; top: 0; font-size: 0.55em;
  line-height: calc(var(--mp-leading-body) * 1em / 0.55); opacity: var(--mp-opacity-kicker);
}
@media (max-width: 390px) { .mp-list-meta { width: 100%; } }
@media (prefers-reduced-motion: reduce) { .mp-list a { transition: none; } }
```

## 앱
- SwiftUI: `List { }.listStyle(.plain)`, `.listRowSeparatorTint(line)`, `.listRowInsets(EdgeInsets(top: 0, leading: 6, bottom: 0, trailing: 6))`. 눌림 반전은 커스텀 `ButtonStyle`에서 `configuration.isPressed ? ink : .clear`.
- 선택 행은 `.listRowBackground(teal)` + 글자 slate. 시스템 체크마크(`✓`)는 쓰지 않는다.
- Compose: `LazyColumn` + 행마다 `HorizontalDivider(thickness = 1.dp, color = line)`. Material `ListItem`을 쓰면 `tonalElevation = 0.dp`, `shadowElevation = 0.dp`, `colors`를 토큰으로.
- 행 높이 최소 44pt/48dp. 스와이프 삭제(`.swipeActions`, `SwipeToDismissBox`)는 OS 동작 유지(예외), 삭제 확인은 `confirm-step`.
- 당겨서 새로고침의 시스템 스피너는 OS 예외로 둔다.
```swift
List(items) { item in
  NavigationLink(value: item) { HStack { Text(item.title); Spacer(); Text(item.date).opacity(0.55).monospacedDigit() } }
    .listRowSeparatorTint(Color("Line")).listRowBackground(Color.clear)
}.listStyle(.plain)
```
```kotlin
LazyColumn { items(items) { item ->
  Row(Modifier.fillMaxWidth().heightIn(min = 48.dp).clickable { open(item) }.padding(horizontal = 6.dp),
      verticalAlignment = Alignment.CenterVertically) {
    Text(item.title, Modifier.weight(1f)); Text(item.date, Modifier.alpha(0.55f))
  }
  HorizontalDivider(thickness = 1.dp, color = Line)
} }
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 제목은 짧게, 메타는 오른쪽에 옅게.
- 해야 할 것: 같은 날짜처럼 정보 없는 표기는 뺀다(예: 오늘 항목은 시각만).
- 해야 할 것: 행 전체를 누를 수 있게 하고, 탭 순서는 행당 하나.
- 해야 할 것: 비어 있으면 `empty-state`로 사실과 할 일을 말한다.
- 하지 말 것: 원형 불릿, 행마다 카드 박스, 줄무늬(zebra) 색.
- 하지 말 것: 행마다 장식 아이콘, 색으로 분류 구분.
- 하지 말 것: 호버 시 teal·orange로 색 바꾸기, 행이 커지거나 밀려나는 호버.
- 하지 말 것: 긴 설명 문단을 행 안에 펼쳐 두기(필요하면 `accordion`).

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 원형 `•` 불릿, `list-style: disc` | `■` 0.55em, `--mp-opacity-kicker` |
| 행마다 카드 박스·그림자 | 행 사이 1px `--mp-line`만 |
| 제목과 `>` 를 따로 누르게(탭 두 번) | 행 전체가 링크 하나 |
| 호버 시 teal 배경 | 호버는 `--mp-ink`/`--mp-bg` 반전, teal은 선택 상태만 |
| 메타를 .35로 옅게 | 메타 `--mp-opacity-meta`(.55), 필수면 제목에 |
| 빈 목록에 선만 남김 | `empty-state` |
