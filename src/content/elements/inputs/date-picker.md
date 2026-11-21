---
id: date-picker
name: 날짜 선택
nameEn: Date picker
category: inputs
summary: 7열 정사각 격자로 된 달력. 오늘은 1px 잉크 테두리, 고른 날은 잉크와 배경이 반전된다.
aliases: [날짜 선택, 달력, 데이트피커, 날짜 입력, 일정 선택, 기간 선택, 예약 날짜, date picker, calendar, datepicker, date input, date range]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-bg, --mp-line, --mp-line-strong, --mp-border, --mp-font, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-muted, --mp-opacity-nav, --mp-duration-hover]
effects: [invert-hover, reduced-motion]
related: [text-field, labels-numbers, popover, bottom-sheet, form-validation]
---

## 용도
가까운 날짜 하나나 기간(시작–끝)을 달력에서 고를 때 쓴다: 예약, 기록 조회 기간, 마감일.
- 생년월일·먼 과거처럼 이미 아는 날짜는 숫자 `text-field`(`2026-09-17`, `inputmode="numeric"`)가 빠르다.
- 달력은 `text-field` 옆 `[ 달력 ]`으로 여는 `popover`(웹) 또는 `bottom-sheet`(앱)에 담거나, 화면에 늘 펼쳐 둔다.

## 생김새
- 틀: `var(--mp-border) solid var(--mp-line)`, `border-radius: 0`, 배경 `--mp-bg`, 여백 `1em`, 글자 `--mp-size-small`
- 머리 줄(높이 `2.4em`)
  - 가운데 `2026.09` (`labels-numbers`: 점 구분, 두 자리 달)
  - 양옆 달 이동 버튼 `<` `>` 글자(Mulmaru에 `‹ ›` 없음), `2.4em` 정사각, `opacity: var(--mp-opacity-nav)`
- 요일 줄: `월 화 수 목 금 토 일`(주 시작은 월요일로 통일, 지역 설정이 일요일이면 일요일 먼저), `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, 아래 간격 `0.6em`
- 날짜 격자
  - `grid-template-columns: repeat(7, 2.4em)`, 칸 `2.4em` 정사각, 칸 사이 선·틈 없음
  - 숫자 가운데, `font-variant-numeric: tabular-nums`
  - 6주를 항상 그린다(달마다 높이가 흔들리지 않게). 앞뒤 달 날짜는 `opacity: var(--mp-opacity-muted)`
- 오늘: 1px `--mp-ink` 테두리(칸 안쪽, 크기 불변)
- 선택: 반전(배경 `--mp-ink`, 글자 `--mp-bg`)
- 기간: 시작·끝은 반전, 사이 날짜는 칸 위아래 1px `--mp-line-strong` 선(면을 칠하지 않는다)
- 아래 줄(선택): `[ 오늘 ]` `[ 지우기 ]` 텍스트 버튼, 오른쪽 정렬

## 상태
| 상태 | 표현 |
|---|---|
| 날짜 기본 | 투명 칸, 잉크 숫자 |
| 호버·포커스 | 반전 (`--mp-duration-hover` ease) |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: -3px`(칸 안쪽, 이웃 칸 침범 방지) |
| 오늘 | 1px `--mp-ink` 테두리 |
| 선택 | 반전 고정, `aria-selected="true"` |
| 오늘 + 선택 | 반전(테두리는 반전 면에 묻힘) |
| 기간 사이 | 위아래 1px `--mp-line-strong` |
| 다른 달 | `opacity: var(--mp-opacity-muted)`, 누르면 그 달로 이동 + 선택 |
| 고를 수 없음 | `opacity: var(--mp-opacity-muted)` + `aria-disabled="true"`, 호버 반전 없음 |
| 달 이동 버튼 호버 | opacity 1 |
| 잠긴 날(예약됨·마감) | 숫자 `opacity: var(--mp-opacity-meta)` + 1px 가로줄(`text-decoration: line-through 1px`), `aria-readonly="true"`, 호버 반전 없음. 고를 수 없음(muted)보다 한 단계 진하게 — 사유가 있는 날임을 보여 준다 |
| 달력 전체 읽기 전용 | 격자 `aria-readonly="true"` + `.is-readonly`. 선택·오늘·잠긴 날 표시는 그대로, 호버 반전 없음, `cursor: default`. 틀 테두리는 `--mp-line` 유지(비활성처럼 옅게 하지 않는다) |

## 동작
### 모션
- 달 넘김은 즉시 바뀐다(좌우 슬라이드·페이드 없음). 날짜 반전만 `invert-hover`.
- `prefers-reduced-motion: reduce`이면 반전 전환도 없음.

### 키보드·접근성
- 구조: 표 `role="grid"` + `aria-labelledby`(머리 `2026.09`), 요일 `role="columnheader"`(`abbr="월요일"`), 날짜 `role="gridcell"` 안 `<button>`.
- 격자 안 포커스는 한 칸만 `tabindex="0"`(선택 또는 오늘), 나머지 `-1`(roving tabindex).
- 키: ←→ 하루, ↑↓ 한 주, Home/End 주의 처음·끝, PageUp/PageDown 이전·다음 달, Shift+PageUp/PageDown 이전·다음 해, Enter·Space 선택, Esc 닫기(팝오버일 때 입력칸으로 포커스 복귀).
- 날짜 버튼 `aria-label="2026년 9월 17일 목요일"`, 오늘은 `aria-current="date"`.
- 달이 바뀌면 머리 글자를 `aria-live="polite"`로 알린다.
- 잠긴 날·읽기 전용: `disabled`를 쓰지 않는다(포커스가 건너뛰어 사유를 읽을 수 없다). 버튼은 포커스를 받고, `aria-readonly="true"` + `aria-label`에 사유를 붙인다(`"2026년 9월 20일 토요일, 예약됨"`). Enter·Space는 아무것도 하지 않는다.
- 읽기 전용 달력도 방향키·PageUp/PageDown 이동은 그대로 허용한다(일정 확인용).
- 입력칸과 함께 쓰면 입력칸이 원본이다. 달력은 보조이며, 입력칸 형식 오류는 `form-validation`.

### 반응형
- 칸 `2.4em`이 44px보다 작으면 칸을 `44px`로 키운다(7칸 = 308px + 여백).
- 폭 360px 이하: 틀 여백을 `0.5em`으로 줄이고 칸을 `calc((100vw - 2em) / 7)`로 나눈다.
- 기간 선택은 넓은 화면(768px 이상)에서만 두 달을 나란히, 좁으면 한 달.

## 데모
```html demo
<div class="mp-date-picker">
  <div class="mp-date-picker-head"><button type="button" aria-label="이전 달">&lt;</button><span>2026.09</span><button type="button" aria-label="다음 달">&gt;</button></div>
  <div class="mp-date-picker-grid" role="grid" aria-label="2026.09">
    <span class="mp-date-picker-dow">월</span><span class="mp-date-picker-dow">화</span><span class="mp-date-picker-dow">수</span><span class="mp-date-picker-dow">목</span><span class="mp-date-picker-dow">금</span><span class="mp-date-picker-dow">토</span><span class="mp-date-picker-dow">일</span>
    <button type="button" class="is-other">31</button><button type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">4</button><button type="button">5</button><button type="button">6</button>
    <button type="button">14</button><button type="button">15</button><button type="button" class="is-hover">16</button><button type="button" class="is-today" aria-current="date">17</button><button type="button" aria-selected="true">18</button><button type="button" aria-disabled="true">19</button><button type="button" class="is-locked" aria-readonly="true">20</button>
  </div>
</div>
```

## 코드
```css
.mp-date-picker {
  display: inline-grid; gap: 0.8em; padding: 1em; border: var(--mp-border) solid var(--mp-line); border-radius: 0;
  background: var(--mp-bg); color: var(--mp-ink); font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
}
.mp-date-picker-head { display: flex; justify-content: space-between; align-items: center; }
.mp-date-picker button {
  width: 2.4em; height: 2.4em; padding: 0; border: 0; border-radius: 0;
  background: transparent; color: var(--mp-ink); font: inherit; font-variant-numeric: tabular-nums; cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-date-picker-head button { opacity: var(--mp-opacity-nav); }
.mp-date-picker-head button:hover, .mp-date-picker-head button:focus-visible { opacity: 1; }
.mp-date-picker-grid { display: grid; grid-template-columns: repeat(7, 2.4em); justify-items: center; align-items: center; }
.mp-date-picker-dow { padding-bottom: 0.6em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-date-picker-grid:not(.is-readonly) button:hover:not([aria-disabled="true"]):not(.is-locked),
.mp-date-picker-grid button:focus-visible,
.mp-date-picker-grid button.is-hover,
.mp-date-picker-grid button[aria-selected="true"] { background: var(--mp-ink); color: var(--mp-bg); }
.mp-date-picker button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: -3px; }
.mp-date-picker-grid button[aria-selected="true"]:focus-visible { outline-color: var(--mp-bg); }
.mp-date-picker .is-today { border: var(--mp-border) solid var(--mp-ink); }
.mp-date-picker .is-in-range { border-block: var(--mp-border) solid var(--mp-line-strong); }
.mp-date-picker .is-other, .mp-date-picker [aria-disabled="true"] { opacity: var(--mp-opacity-muted); }
.mp-date-picker [aria-disabled="true"] { cursor: default; }
.mp-date-picker .is-locked { opacity: var(--mp-opacity-meta); text-decoration: line-through 1px; cursor: default; }
.mp-date-picker-grid.is-readonly button { cursor: default; }
@media (pointer: coarse) { .mp-date-picker button { min-width: 44px; min-height: 44px; } .mp-date-picker-grid { grid-template-columns: repeat(7, minmax(44px, 2.4em)); } }
@media (prefers-reduced-motion: reduce) { .mp-date-picker button { transition: none; } }
```
`.is-hover`는 데모에서 호버 상태를 고정해 보여 주는 클래스다. 오늘·선택·기간·다른 달은 JS가 날짜를 그릴 때 클래스와 aria를 붙인다.

## 앱
- SwiftUI: `DatePicker(.graphical)`는 둥근 선택 원이 있는 시스템 달력(OS 예외 — 시스템 `Form`에서만, `.tint(ink)`). 브랜드 화면은 직접 그린다.
  - `LazyVGrid(columns: Array(repeating: GridItem(.fixed(44), spacing: 0), count: 7), spacing: 0)`.
  - 선택 칸 `Rectangle().fill(ink)` + 글자 `bg`, 오늘 `Rectangle().stroke(ink, lineWidth: 1)`.
  - 각 칸 `.accessibilityLabel("9월 17일 목요일")`, 선택 `.accessibilityAddTraits(.isSelected)`.
- Compose: Material3 `DatePicker` 대신 `LazyVerticalGrid(GridCells.Fixed(7))` + `Box(Modifier.size(48.dp).background(if (selected) ink else Color.Transparent))`.
  - `Modifier.semantics { selected = isSelected; contentDescription = "9월 17일 목요일" }`.
- 잠긴 날: SwiftUI `Text(day).strikethrough(true).opacity(0.7)` + `.accessibilityLabel("9월 20일 토요일, 예약됨")`, 탭 동작 없음. Compose `TextDecoration.LineThrough` + `alpha(0.7f)`, `semantics { stateDescription = "예약됨" }`, `clickable` 없이 `focusable()`.
- iOS 휠(`.wheel`)·Android 시스템 날짜 대화상자는 OS 모양 그대로 둔다.
- 앱에서 달력은 `bottom-sheet`에 담고, 고르면 즉시 닫는다(기간은 끝 날짜를 고를 때 닫는다).

## 해야 할 것 / 하지 말 것
- 해야 할 것
  - 오늘(테두리)과 선택(반전)을 모양으로 구분한다.
  - 주 시작 요일을 앱 전체에서 한 가지로 통일한다.
  - 6주를 항상 그려 높이를 고정한다.
  - 입력칸으로도 날짜를 칠 수 있게 한다.
  - 날짜 표기는 `2026.09.17` 형식(`labels-numbers`).
  - 예약·마감된 날은 잠긴 날(가로줄)로 두고 사유를 `aria-label`에 적는다.
- 하지 말 것
  - 둥근 선택 원, 기간을 채운 teal·회색 띠.
  - 토·일요일을 orange·teal 글자로 칠하기.
  - 잠긴 날·읽기 전용을 `disabled`로 처리해 포커스와 사유를 지우기, 잠긴 날을 orange로 표시하기.
  - 달 넘김 슬라이드·페이드 애니메이션.
  - 오늘을 orange ■로 표시하기(강조는 화면의 다른 곳에 남긴다).
  - 칸 사이 격자선으로 달력을 표처럼 가두기.
