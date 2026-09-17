---
id: radio
name: 라디오
nameEn: Radio
category: inputs
summary: 여러 선택지 중 하나를 고르는 픽셀 사각 칸. 고른 칸은 안쪽에 작은 잉크 사각형이 찍힌다. 원은 쓰지 않는다.
aliases: [라디오, 라디오 버튼, 단일 선택, 하나 고르기, 옵션 선택, 선택지, radio, radio button, single select, option, radio group]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-line, --mp-line-strong, --mp-border, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-muted, --mp-opacity-meta]
effects: []
related: [checkbox, segmented-control, select, settings]
---

## 용도
- 2–5개 선택지 중 **정확히 하나**를 고를 때(테마: 자동·라이트·다크, 정렬 기준, 요금제).
- 선택지가 6개 이상이면 `select`, 보기 방식을 바로 바꾸는 짧은 전환(목록/격자)이면 `segmented-control`을 쓴다.
- 켜기/끄기 둘뿐이면 라디오 두 개 대신 `switch`나 `checkbox` 하나를 쓴다.
- 라디오 묶음은 항상 하나가 골라진 상태로 시작한다(기본값). "선택 안 함"이 필요하면 그것도 선택지로 넣는다.

## 생김새
- 칸: `1em × 1em` 정사각형, 테두리 `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`. **원을 쓰지 않는다** — 원형은 픽셀 격자와 어긋난다
- 선택: 안쪽 여백 3px을 두고 잉크 사각형(`padding: 3px` + `background-clip: content-box`), 테두리 `--mp-ink`. `checkbox`의 가득 채움과 모양으로 구분된다
- 라벨: 칸 오른쪽 `0.6em`, `--mp-size-small` / `--mp-tracking-small`, 글자 `--mp-ink` 불투명
- 누르는 영역: `<label>` 줄 전체, 최소 높이 `2.4em`
- 배치: 세로로 쌓고 간격 `0.8em`. 선택지가 3개 이하·라벨이 짧으면 가로 한 줄(간격 `1.6em`)도 된다
- 묶음: `<fieldset>`(테두리·여백 없음) + `<legend>`(`--mp-size-small`, 아래 `0.6em`)
- 보조 설명(요금제 가격 등): 라벨 아래 `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`, 칸 폭 + 간격만큼 들여쓴다
- 카드형 선택(큰 선택지): 줄 전체를 1px `--mp-line` 상자로 두고, 선택된 상자는 테두리 `--mp-ink`. 배경은 칠하지 않는다

## 상태
| 상태 | 표현 |
|---|---|
| 꺼짐 | 1px `--mp-line-strong` 빈 칸 |
| 선택 | 테두리 `--mp-ink` + 안쪽 3px 떨어진 잉크 사각형 |
| 호버 | 꺼짐 칸 테두리 `--mp-ink` |
| 포커스 | 칸에 `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 비활성 | 칸·라벨 `opacity: var(--mp-opacity-muted)`, `cursor: not-allowed` |
| 오류(필수인데 기본값 없음) | 묶음 아래 `form-validation` 문구, 칸 테두리 `--mp-ink` |

## 동작
### 키보드·접근성
- 네이티브 `<input type="radio">`를 같은 `name`으로 묶고 `appearance: none`으로 모양만 바꾼다.
- 묶음 안에서 Tab은 **선택된 칸 하나**에만 들어간다. 화살표(↑↓←→)가 선택을 옮기며 동시에 고른다.
- 묶음은 `<fieldset>` + `<legend>`(또는 `role="radiogroup"` + `aria-labelledby`).
- 선택이 바로 화면을 바꾸면(테마) 즉시 반영한다. 그렇지 않으면 저장 버튼으로 반영한다 — 한 화면에서 섞지 않는다.
- 필수 묶음은 첫 칸에 `required`.

### 반응형
- 가로 배치는 480px 이하에서 세로로 바꾼다.
- 칸 크기는 줄이지 않는다. 누르는 영역은 줄 폭 전체.

## 데모
```html demo
<fieldset class="mp-radio-group">
  <legend>테마</legend>
  <label class="mp-radio"><input type="radio" name="mp-radio-demo" checked> 자동</label>
  <label class="mp-radio"><input type="radio" name="mp-radio-demo" class="is-focus"> 밝게</label>
  <label class="mp-radio"><input type="radio" name="mp-radio-demo"> 어둡게</label>
  <label class="mp-radio"><input type="radio" name="mp-radio-demo" disabled> 잠김</label>
</fieldset>
```

## 코드
```css
.mp-radio-group { display: flex; flex-wrap: wrap; gap: 0.8em 1.6em; margin: 0; padding: 0; border: 0; min-width: 0; }
.mp-radio-group legend { width: 100%; margin-bottom: 0.6em; padding: 0; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-radio-group.is-stacked { flex-direction: column; }
.mp-radio { display: inline-flex; align-items: center; gap: 0.6em; min-height: 2.4em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); color: var(--mp-ink); cursor: pointer; }
.mp-radio input {
  appearance: none; -webkit-appearance: none; flex: none; margin: 0; box-sizing: border-box;
  width: 1em; height: 1em; padding: 3px; border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  background: transparent; background-clip: content-box; cursor: pointer;
}
.mp-radio input:hover { border-color: var(--mp-ink); }
.mp-radio input:checked { background-color: var(--mp-ink); border-color: var(--mp-ink); }
.mp-radio input:focus-visible, .mp-radio input.is-focus { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-radio:has(input:disabled) { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-radio input:disabled { cursor: not-allowed; }
.mp-radio-note { display: block; padding-left: 1.6em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
@media (max-width: 480px) { .mp-radio-group { flex-direction: column; } }
```

## 앱
- SwiftUI: `Picker(.inline)`·`Picker(.radioGroup)`(macOS)는 시스템 모양이라 브랜드 화면에서는 `ForEach(options) { opt in Button { sel = opt } label: { HStack(spacing: 8) { Rectangle().stroke(sel == opt ? ink : lineStrong, lineWidth: 1).frame(width: 16, height: 16).overlay(Rectangle().fill(sel == opt ? ink : .clear).padding(3)); Text(opt.label) } } }`. `.accessibilityAddTraits(sel == opt ? [.isSelected] : [])`.
- Compose: `Column(Modifier.selectableGroup())` 안에 `Row(Modifier.selectable(selected, role = Role.RadioButton, onClick = { }).heightIn(min = 48.dp))` + `Box(Modifier.size(16.dp).border(1.dp, color, RectangleShape).padding(3.dp).background(if (selected) ink else Color.Transparent))`. Material `RadioButton`의 원은 쓰지 않는다.
- OS 예외: 시스템 `Form`/설정 화면의 체크마크 목록 선택, `confirmationDialog` 선택지는 시스템 모양 그대로.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 기본 선택지 하나를 미리 고른다.
- 해야 할 것: 줄 전체를 누르는 영역으로, 화살표 키로 선택 이동.
- 해야 할 것: 체크박스와 모양을 구분(안쪽 작은 사각형 vs 가득 채움).
- 해야 할 것: 선택지 라벨은 짧은 명사, 같은 문법 형태로 맞춘다.
- 하지 말 것: 동그라미 라디오, 체크박스와 똑같은 가득 채움.
- 하지 말 것: 선택지 6개 이상 나열(→ `select`), 선택지 하나짜리 라디오.
- 하지 말 것: 선택된 칸을 teal·orange로 칠하기, 선택 시 튀는 애니메이션.
- 하지 말 것: 아무것도 고르지 않은 상태로 시작하는 필수 묶음.
