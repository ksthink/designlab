---
id: segmented-control
name: 세그먼트 컨트롤
nameEn: Segmented Control
category: actions
summary: 붙어 있는 1px 칸 중 하나를 고르는 선택기. 고른 칸은 teal 면에 slate 글자.
aliases: [세그먼트, 세그먼트 컨트롤, segmented control, 토글 그룹, 보기 전환, 단위 전환, 라디오 버튼 그룹, 필터 탭]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-border, --mp-line-button, --mp-size-small, --mp-tracking-small, --mp-font, --mp-size-meta, --mp-opacity-meta, --mp-opacity-nav, --mp-ink, --mp-bg, --mp-secondary, --mp-palette-slate, --mp-opacity-muted, --mp-duration-hover]
effects: [invert-hover]
related: [tabs, chip, radio, switch]
---

## 용도
2–4개 중 하나를 고르고 결과가 **같은 화면에서 바로** 바뀔 때(목록/격자 보기, 일/주/월, km/mi) 쓴다.
패널 내용을 통째로 바꾸면 `tabs`, 5개 이상이거나 이름이 길면 `select`, 켜고 끄기 둘뿐이면 `switch`.
여러 개를 동시에 켤 수 있으면 `chip`.

**함께 쓰는 요소**
- `segmented-control` + `list`·`card`: 보기 전환(목록/격자)은 목록 머리 오른쪽, `section-head`와 같은 줄
- `segmented-control` + `stat`·`timeline`: 기간(일/주/월) 전환은 숫자 위, 바꾸면 숫자가 즉시 바뀐다(`reveal` 없음)
- 패널을 바꾸는 `tabs`와 한 화면에 함께 두면 탭이 위, 세그먼트가 패널 안
- 선택 teal 면은 보조색. 같은 화면 orange 강조 하나와 맞붙이지 않는다
- 필터 여러 개는 `chip`, 설정 화면의 켜기/끄기는 `switch`

## 생김새
**모양**
- 칸들이 한 줄로 붙는다. 바깥 테두리 `var(--mp-border) solid var(--mp-line-button)`, radius 0
- 칸 사이 선도 같은 1px `--mp-line-button`(두 줄이 겹쳐 2px가 되지 않게 왼쪽 선만 긋는다)
- 글자 `--mp-size-small`, 자간 `--mp-tracking-small`, `--mp-font` 400, 가운데 정렬
- 모든 칸은 같은 폭(`flex: 1 1 0`)
- 아이콘은 쓰지 않는다. 필요하면 1–2자 글자로

**크기·간격**
- 칸 안쪽 여백 `0.6em 1.2em`, `line-height: 1`
- 칸 이름 1–4자
- 컨트롤 전체 폭은 내용 폭(`inline-flex`). 좁은 화면에서만 `width: 100%`
- 위 라벨(`legend`)이 보여야 하면 `--mp-size-meta`, `--mp-opacity-meta`, 아래 간격 `0.5em`

**반응형**
- 360px 이하에서 칸이 넘치면 `width: 100%`로 늘리고 여백을 `0.6em 0.4em`으로 줄인다. 줄바꿈하지 않는다
- 그래도 넘치면 `select`로 바꾼다
- 터치 기기는 칸 높이 44px 이상(세로 여백으로)

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 투명 배경, ink 글자 `--mp-opacity-nav` |
| 호버 | 배경 `--mp-ink`, 글자 `--mp-bg`, opacity 1 |
| 포커스 | 호버와 같음 + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 선택 | 배경 `--mp-secondary`(teal), 글자 `--mp-palette-slate`, opacity 1 — 두 테마 모두 |
| 선택 + 호버 | 선택 그대로(반전하지 않는다) |
| 비활성 칸 | `--mp-opacity-muted`, 호버 없음 |
| 비활성 전체 | 컨트롤 전체 `--mp-opacity-muted` |

## 동작
- 호버: `invert-hover`, 배경·글자색·opacity `--mp-duration-hover` ease
- 선택 면은 즉시 옮겨진다. 미끄러지는 인디케이터·늘어나는 면 없음
- 선택하자마자 결과를 적용한다(확인 버튼 없음)

**접근성**
- 구조: `<fieldset>` + 숨긴 `<legend>` + `<input type="radio">` + `<label>`. 라디오 그룹이 키보드·스크린리더 동작을 공짜로 준다
- 버튼으로 만들면 `role="radiogroup"` + 각 칸 `role="radio"` `aria-checked`, 로빙 `tabindex`
- 키보드: `Tab`으로 그룹에 들어가 선택 칸에 포커스, `←` `→`(`↑` `↓`)로 이동하며 바로 선택, `Tab`으로 나간다
- `legend`는 시각적으로 숨겨도 읽히게(`clip-path: inset(50%)`)
- 선택은 teal 면 + slate 글자로 표시되지만 색만으로 알리지 않도록 라디오 상태가 읽힌다
- teal 위 slate 글자 대비 4.64:1
- `role="radiogroup"` 방식의 로빙 `tabindex`: 선택 칸만 `tabindex="0"`, 나머지 `-1`. 화살표로 포커스와 선택을 함께 옮기고, 끝에서 처음으로 순환한다
- 비활성 칸은 `aria-disabled="true"`로 두고 화살표 이동에서 건너뛴다

**reduced-motion**
- transition 없이 즉시

## 데모
```html demo
<fieldset class="mp-segmented-control">
  <legend>보기</legend>
  <input type="radio" name="mp-seg" id="mp-seg-1" checked><label for="mp-seg-1">일</label>
  <input type="radio" name="mp-seg" id="mp-seg-2"><label class="is-hover" for="mp-seg-2">주</label>
  <input type="radio" name="mp-seg" id="mp-seg-3"><label for="mp-seg-3">월</label>
  <input type="radio" name="mp-seg" id="mp-seg-4" disabled><label for="mp-seg-4">년</label>
</fieldset>
```

## 코드
```css
.mp-segmented-control { position: relative; display: inline-flex; margin: 0; padding: 0; border: var(--mp-border) solid var(--mp-line-button); }
.mp-segmented-control legend { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.mp-segmented-control input { position: absolute; opacity: 0; pointer-events: none; }
.mp-segmented-control label {
  flex: 1 1 0; padding: 0.6em 1.2em; text-align: center; cursor: pointer;
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  color: var(--mp-ink); opacity: var(--mp-opacity-nav);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, opacity var(--mp-duration-hover) ease;
}
.mp-segmented-control label + input + label { border-left: var(--mp-border) solid var(--mp-line-button); }
.mp-segmented-control label:hover, .mp-segmented-control label.is-hover,
.mp-segmented-control input:focus-visible + label { background: var(--mp-ink); color: var(--mp-bg); opacity: 1; }
.mp-segmented-control input:focus-visible + label { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; }
.mp-segmented-control input:checked + label { background: var(--mp-secondary); color: var(--mp-palette-slate); opacity: 1; }
.mp-segmented-control input:disabled + label { opacity: var(--mp-opacity-muted); background: transparent; color: var(--mp-ink); cursor: not-allowed; }
@media (max-width: 360px) { .mp-segmented-control { display: flex; width: 100%; } .mp-segmented-control label { padding: 0.6em 0.4em; } }
@media (prefers-reduced-motion: reduce) { .mp-segmented-control label { transition: none; } }
```

## 앱
- SwiftUI: 시스템 `Picker(.segmented)`는 둥근 캡슐이라 쓰지 않는다. `HStack(spacing: 0)`에 칸마다 `Button`, 선택 칸 `.background(secondary)` `.foregroundStyle(slate)`, 전체 `.overlay(Rectangle().stroke(lineButton, lineWidth: 1))`, 칸 사이 `Rectangle().frame(width: 1)`.
- 접근성: 각 칸 `.accessibilityAddTraits(isSelected ? .isSelected : [])`, 그룹 `.accessibilityElement(children: .contain)` + `.accessibilityLabel("보기")`.
- Compose: `SingleChoiceSegmentedButtonRow { SegmentedButton(shape = RectangleShape, selected, onClick, icon = {}, colors = SegmentedButtonDefaults.colors(activeContainerColor = secondary, activeContentColor = slate, inactiveContainerColor = Color.Transparent), border = BorderStroke(1.dp, lineButton)) }`.
- 칸 높이 44pt/48dp 이상. 선택 변화에 햅틱은 가벼운 `selection` 하나만.
- OS 예외 없음.

```swift
HStack(spacing: 0) {
  ForEach(options.indices, id: \.self) { i in
    Button(options[i]) { selection = i }
      .font(.custom("Mulmaru", size: 12)).frame(maxWidth: .infinity, minHeight: 44)
      .foregroundStyle(selection == i ? MP.slate : MP.ink.opacity(0.7))
      .background(selection == i ? MP.secondary : .clear)
      .overlay(alignment: .leading) { if i > 0 { Rectangle().fill(MP.lineButton).frame(width: 1) } }
      .accessibilityAddTraits(selection == i ? .isSelected : [])
  }
}
.overlay(Rectangle().stroke(MP.lineButton, lineWidth: 1)).buttonStyle(.plain)
```

```kotlin
SingleChoiceSegmentedButtonRow {
  options.forEachIndexed { i, label ->
    SegmentedButton(
      selected = selection == i, onClick = { selection = i }, shape = RectangleShape, icon = {},
      colors = SegmentedButtonDefaults.colors(activeContainerColor = MP.secondary, activeContentColor = MP.slate,
        inactiveContainerColor = Color.Transparent, inactiveContentColor = MP.ink.copy(alpha = 0.7f)),
      border = BorderStroke(1.dp, MP.lineButton),
    ) { Text(label, fontFamily = Mulmaru) }
  }
}
```
- OS 예외 목록: 없음. 시스템 `Picker(.segmented)`·`UISegmentedControl`은 쓰지 않는다

## 해야 할 것 / 하지 말 것
- 해야 할 것: 칸 2–4개, 같은 폭, 1px 선으로 붙이기.
- 해야 할 것: 선택은 teal 면 + slate 글자.
- 해야 할 것: 라디오 그룹 의미(화살표 키 이동).
- 해야 할 것: 선택 즉시 결과 반영.
- 해야 할 것: 넘치면 `select`로 바꾸기.
- 하지 말 것: 둥근 캡슐, 선택 칸 그림자.
- 하지 말 것: teal 글자(라이트), paper 글자를 teal 위에.
- 하지 말 것: orange 선택 면.
- 하지 말 것: 미끄러지는 인디케이터 애니메이션.
- 하지 말 것: 칸마다 폭이 다르거나 두 줄로 줄바꿈.

**자주 틀리는 것**
- 칸마다 네 변 테두리 → 칸 사이 선이 2px. 왼쪽 선만
- Compose `SegmentedButton` 기본 체크 아이콘 → `icon = {}`
- `SegmentedButtonDefaults.itemShape`(양끝 둥근) 그대로 → `RectangleShape`
- 선택 칸도 호버 반전 → 선택은 teal 면 유지
- 버튼 여러 개에 각각 `tabindex="0"` → 로빙 `tabindex`
