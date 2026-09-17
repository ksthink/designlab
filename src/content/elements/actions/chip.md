---
id: chip
name: 칩
nameEn: Chip
category: actions
summary: 필터·선택지를 켜고 끄는 작은 1px 사각 표시. 켜진 칩은 teal 면에 slate 글자.
aliases: [칩, chip, 필터 칩, 선택 칩, filter chip, 토글 태그, 필터 버튼, 해시태그 선택]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-border, --mp-line, --mp-size-meta, --mp-tracking-meta, --mp-font, --mp-opacity-meta, --mp-opacity-secondary, --mp-ink, --mp-bg, --mp-secondary, --mp-palette-slate, --mp-opacity-muted, --mp-duration-hover]
effects: [invert-hover]
related: [tag, badge, segmented-control, checkbox]
---

## 용도
목록을 거르는 조건을 여러 개 켜고 끌 때 쓴다(분류, 상태, 플랫폼). 여러 개를 동시에 켤 수 있다.
하나만 골라야 하면 `segmented-control`, 읽기만 하는 표시는 `badge`·`tag`.
입력한 값을 지울 수 있는 칩(받는 사람, 검색어)은 같은 모양에 뒤 `x` 버튼을 붙인다.

**함께 쓰는 요소**
- `chip` 줄 + `list`·`table`: 칩 줄은 목록 바로 위, 간격 `1em`. 켤 때마다 목록 머리의 건수(`labels-numbers`)가 바뀐다
- 켜진 칩 조합에 결과가 없으면 `empty-state`를 보여 주고, 그 안에 `[ 조건 지우기 ]`(`text-action`)를 둔다
- 하나만 골라야 하면 칩 대신 `segmented-control`. 칩과 세그먼트를 같은 줄에 섞지 않는다
- 칩의 teal 켜짐 면은 보조색이라 화면의 orange 강조 하나(`fab`·`status-dot`)와 함께 있어도 된다. 단 둘을 맞붙이지 않는다(1.24:1)
- 읽기 전용 분류 표시는 `badge`·`tag`. 같은 카드 안에서 칩과 배지를 섞지 않는다

## 생김새
**모양**
- `badge`와 같은 틀: `border: var(--mp-border) solid var(--mp-line)`, radius 0
- 글자 `--mp-size-meta`, 자간 `--mp-tracking-meta`, `--mp-font` 400, 행간 `1.6`
- 켜짐 표시는 면 색 하나로 충분하다. 체크 아이콘·■를 더하지 않는다
- 지우기 칩: 글자 뒤 `0.5em` 간격으로 `x`, `x`는 따로 누르는 버튼

**크기·간격**
- 안쪽 여백 `0.25em 0.6em`(metaphr.dev `.badge`)
- 칩 사이 간격 `0.5em`, 줄 사이도 `0.5em`
- 칩 글자 1–2단어, 최대 12자. 넘치면 말줄임 대신 짧은 이름으로 바꾼다
- 칩 줄 위 라벨(선택)은 `--mp-size-meta`, `--mp-opacity-meta`

**반응형**
- 좁은 화면에서는 `flex-wrap: wrap`으로 줄바꿈이 기본
- 칩이 3줄을 넘으면 한 줄 가로 스크롤(`overflow-x: auto`, 스크롤바 숨기지 않기)이나 `dropdown-menu`로 옮긴다
- 터치 기기: 보이는 크기는 그대로, 누를 곳은 `label`의 세로 여백으로 44px 이상

## 상태
| 상태 | 표현 |
|---|---|
| 꺼짐 | 1px `--mp-line`, 투명 배경, `--mp-opacity-secondary` |
| 호버 | 배경 `--mp-ink`, 글자 `--mp-bg`, opacity 1 |
| 포커스 | 호버와 같음 + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 누름 | 호버와 같음(이동 없음) |
| 켜짐 | 배경 `--mp-secondary`, 글자 `--mp-palette-slate`, 테두리 `--mp-secondary` |
| 켜짐 + 호버 | 켜짐 그대로 |
| 비활성 | dashed 테두리, `--mp-opacity-muted`, 호버 없음 |

## 동작
- `invert-hover`: 배경·글자색·opacity `--mp-duration-hover` ease
- 켜고 끄면 목록이 즉시 걸러진다. 결과 개수가 바뀌면 목록 머리에 숫자로 알린다
- 모든 칩을 끄면 전체 보기. "전체" 칩을 따로 두지 않는 것을 우선한다

**접근성**
- 필터 칩 구조: `<label>` + 숨긴 `<input type="checkbox">` + `<span>`. 체크박스 의미로 켜짐이 읽힌다
- 버튼으로 만들면 `<button type="button" aria-pressed="true|false">`
- 칩 묶음은 `<fieldset>` + `<legend>`(또는 `role="group"` + `aria-label="분류"`)
- 키보드: `Tab`으로 칩마다 이동, `Space`로 켜고 끈다. 지우기 칩의 `x`는 `aria-label="사이트 지우기"`, `Backspace`·`Delete`로도 지운다
- 걸러진 결과 개수는 `aria-live="polite"` 영역에서 알린다
- teal 위 slate 글자 대비 4.64:1. 꺼짐 opacity 0.7은 필수 정보 기준을 지킨다
- 구조 선택 기준: 필터 묶음은 체크박스(`fieldset`), 단독 토글 하나는 `button aria-pressed`. 둘을 한 묶음에 섞지 않는다
- 지우기 칩을 지운 뒤 포커스는 다음 칩으로, 마지막이면 앞 칩, 모두 지웠으면 입력 칸으로 옮긴다

**reduced-motion**
- transition 없이 즉시

## 데모
```html demo
<div class="mp-chip-row" role="group" aria-label="분류">
  <label class="mp-chip"><input type="checkbox" checked><span>웹</span></label>
  <label class="mp-chip"><input type="checkbox"><span>앱</span></label>
  <label class="mp-chip is-hover"><input type="checkbox"><span>서체</span></label>
  <label class="mp-chip"><input type="checkbox" disabled><span>색</span></label>
</div>
```

## 코드
```css
.mp-chip-row { display: flex; flex-wrap: wrap; gap: 0.5em; }
.mp-chip { position: relative; display: inline-block; }
.mp-chip input { position: absolute; opacity: 0; pointer-events: none; }
.mp-chip span {
  display: inline-block; padding: 0.25em 0.6em; cursor: pointer;
  border: var(--mp-border) solid var(--mp-line); border-radius: 0;
  font: 400 var(--mp-size-meta) / 1.6 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  color: var(--mp-ink); opacity: var(--mp-opacity-secondary);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, opacity var(--mp-duration-hover) ease;
}
.mp-chip:hover span, .mp-chip.is-hover span, .mp-chip input:focus-visible + span { background: var(--mp-ink); color: var(--mp-bg); opacity: 1; }
.mp-chip input:focus-visible + span { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; }
.mp-chip input:checked + span { background: var(--mp-secondary); border-color: var(--mp-secondary); color: var(--mp-palette-slate); opacity: 1; }
.mp-chip input:disabled + span { border-style: dashed; background: transparent; color: var(--mp-ink); opacity: var(--mp-opacity-muted); cursor: not-allowed; }
@media (prefers-reduced-motion: reduce) { .mp-chip span { transition: none; } }
```

## 앱
- SwiftUI: `Toggle(isOn:) { Text("웹") }` + 사용자 `ToggleStyle`: 꺼짐 `Rectangle().stroke(line, lineWidth: 1)` + `.opacity(0.7)`, 켜짐 `.background(secondary)` `.foregroundStyle(slate)`. `.accessibilityAddTraits(.isSelected)`.
- 칩 줄 줄바꿈은 사용자 `Layout`(flow) 또는 `ScrollView(.horizontal)`.
- Compose: `FilterChip(selected, onClick, label = { Text("웹") }, shape = RectangleShape, leadingIcon = null, colors = FilterChipDefaults.filterChipColors(selectedContainerColor = secondary, selectedLabelColor = slate), border = FilterChipDefaults.filterChipBorder(enabled, selected, borderColor = line, selectedBorderColor = secondary, borderWidth = 1.dp), elevation = null)`, 줄바꿈은 `FlowRow`.
- 지우기 칩: Compose `InputChip(trailingIcon = { Text("x") })`, SwiftUI는 `HStack`에 `x` 버튼.
- OS 예외 없음.

```swift
struct ChipToggleStyle: ToggleStyle {
  func makeBody(configuration: Configuration) -> some View {
    Button { configuration.isOn.toggle() } label: { configuration.label }
      .font(.custom("Mulmaru", size: 12)).padding(.horizontal, 8).padding(.vertical, 3)
      .foregroundStyle(configuration.isOn ? MP.slate : MP.ink)
      .background(configuration.isOn ? MP.secondary : .clear)
      .overlay(Rectangle().stroke(configuration.isOn ? MP.secondary : MP.line, lineWidth: 1))
      .opacity(configuration.isOn ? 1 : 0.7)
      .accessibilityAddTraits(configuration.isOn ? .isSelected : [])
  }
}
```

```kotlin
FilterChip(
  selected = on, onClick = { on = !on }, label = { Text("웹", fontFamily = Mulmaru) },
  shape = RectangleShape, leadingIcon = null, elevation = null,
  colors = FilterChipDefaults.filterChipColors(containerColor = Color.Transparent,
    labelColor = MP.ink.copy(alpha = 0.7f), selectedContainerColor = MP.secondary, selectedLabelColor = MP.slate),
  border = FilterChipDefaults.filterChipBorder(enabled = true, selected = on,
    borderColor = MP.line, selectedBorderColor = MP.secondary, borderWidth = 1.dp),
)
```
- OS 예외 목록: 없음. 칩은 모두 앱이 그린다

## 해야 할 것 / 하지 말 것
- 해야 할 것: `badge`와 같은 1px 사각 틀.
- 해야 할 것: 켜짐은 teal 면 + slate 글자 하나로.
- 해야 할 것: 체크박스 의미(또는 `aria-pressed`).
- 해야 할 것: 칩 글자는 1–2단어.
- 해야 할 것: 결과 개수를 알려 주기.
- 하지 말 것: 알약 모양, 둥근 모서리.
- 하지 말 것: 체크 아이콘 + 면 색 이중 표시.
- 하지 말 것: 칩마다 다른 색, 켜짐을 orange로.
- 하지 말 것: teal 글자(라이트).
- 하지 말 것: 읽기 전용 표시를 칩으로(→ `badge`·`tag`).

**자주 틀리는 것**
- Compose `FilterChip` 기본 체크 아이콘이 남음 → `leadingIcon = null`
- Material 기본 `shape`(8dp 둥근 모서리) 그대로 → `RectangleShape`
- 켜짐 칩 글자를 paper(`--mp-bg` 라이트값)로 둠 → 두 테마 모두 `--mp-palette-slate`
- 꺼짐 칩을 kicker 투명도(0.45)까지 흐리게 → `--mp-opacity-secondary`(0.7)
- `div` + 클릭 처리로 만들어 키보드로 못 켬 → 체크박스 또는 `button aria-pressed`
