---
id: checkbox
name: 체크박스
nameEn: Checkbox
category: inputs
summary: 여러 개를 각각 켜고 끄는 픽셀 사각 칸. 선택하면 잉크로 가득 칠한다. 곡선 체크 표시는 쓰지 않는다.
aliases: [체크박스, 체크, 선택 상자, 다중 선택, 동의, 약관 동의, 할 일 체크, checkbox, check, tick box, multi select, todo check]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-accent, --mp-line-strong, --mp-border, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-muted, --mp-opacity-meta, --mp-opacity-body]
effects: []
related: [radio, switch, form-validation, list]
---

## 용도
- 여러 항목을 **각각** 켜고 끌 때(알림 종류 여러 개, 할 일 목록).
- 동의 한 줄(`약관에 동의합니다`)을 받을 때.
- 목록에서 여러 항목을 골라 한꺼번에 처리할 때(전체 선택 + 행 선택).
- 하나만 고르면 `radio`, 누르는 즉시 반영되는 설정이면 `switch`를 쓴다. 체크박스는 보통 "저장"·"다음"을 눌러야 반영된다.

## 생김새
- 칸: `1em × 1em` 정사각형(글자 크기 `--mp-size-small` 기준 약 14–15px), 테두리 `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`, 배경 투명
- 켜짐: 칸 전체를 `--mp-ink`로 채운다(■ 한 덩어리). 테두리도 `--mp-ink`. 곡선 체크 표시(✓)는 쓰지 않는다 — Mulmaru에도 없고, 픽셀 사각이 metaphr 어휘다
- 일부 선택(indeterminate, 전체 선택 칸): 빈 칸 가운데 가로 막대 `0.5em × 2px` `--mp-ink`
- 라벨: 칸 오른쪽, 간격 `0.6em`, `--mp-size-small` / `--mp-tracking-small`, 글자 색 `--mp-ink` 불투명. 칸과 라벨 첫 줄을 세로 가운데 맞춘다(`align-items: center`, 여러 줄 라벨이면 `start` + 칸 `margin-top: 0.3em`)
- 누르는 영역: 라벨 전체(`<label>`로 감싼다). 줄 높이 최소 `2.4em`(터치 44px)
- 목록: 세로로 쌓고 간격 `0.8em`. 묶음 제목은 `<fieldset>` + `<legend>`(`--mp-size-small`, 아래 여백 `0.6em`)
- 할 일 목록에서 완료 항목은 라벨 `opacity: var(--mp-opacity-meta)`. 취소선은 쓰지 않아도 된다(투명도로 충분)
- 보조 설명(라벨 아래): `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`, 칸 폭 + 간격만큼 들여쓴다

## 상태
| 상태 | 표현 |
|---|---|
| 꺼짐 | 1px `--mp-line-strong` 빈 칸 |
| 켜짐 | 칸 `--mp-ink` 채움, 테두리 `--mp-ink` |
| 일부 | 빈 칸 + 가운데 2px 잉크 막대, `aria-checked="mixed"` |
| 호버 | 칸 테두리 `--mp-ink`(꺼짐일 때) |
| 포커스 | 칸에 `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 누름 | 변화 없음(즉시 켜짐/꺼짐) |
| 비활성 | 칸·라벨 `opacity: var(--mp-opacity-muted)`, `cursor: not-allowed` |
| 오류(필수 동의 누락) | 칸 테두리 `--mp-ink`, 아래 줄 `■` + 문구 — 첫 오류만 ■ `--mp-accent` (`form-validation`) |

## 동작
### 키보드·접근성
- 네이티브 `<input type="checkbox">`에 `appearance: none`만 주고 모양을 그린다. 역할·상태·키보드가 그대로 유지된다.
- `Space`로 켜고 끈다(Enter는 폼 제출). Tab으로 칸마다 이동한다.
- 일부 선택은 JS로 `input.indeterminate = true`(HTML 속성은 없다). 누르면 전체 켜짐으로 바뀐다.
- 묶음은 `<fieldset>` + `<legend>`. 필수 동의는 `required`, 오류는 `aria-invalid="true"` + `aria-describedby`.
- 할 일 체크처럼 누르는 즉시 저장되는 경우도 체크박스로 둘 수 있다. 그때 저장 실패는 체크를 되돌리고 `toast`로 알린다.
- 전체 선택: 켜진 개수를 `aria-live="polite"`로 `3개 선택` 한 번 읽는다.

### 반응형
- 좁은 화면에서도 칸 크기를 줄이지 않는다. 누르는 영역은 줄 전체(폭 100%).
- 두 열로 나누는 체크박스 목록은 폭 720px 이상에서만.

## 데모
```html demo
<div class="mp-checkbox-demo">
  <label class="mp-checkbox"><input type="checkbox"> 끔</label>
  <label class="mp-checkbox"><input type="checkbox" checked> 켬</label>
  <label class="mp-checkbox"><input type="checkbox" class="is-mixed"> 일부</label>
  <label class="mp-checkbox"><input type="checkbox" class="is-focus"> 포커스</label>
  <label class="mp-checkbox"><input type="checkbox" checked disabled> 잠김</label>
</div>
```

## 코드
```css
.mp-checkbox-demo { display: flex; flex-wrap: wrap; gap: 0.8em 1.6em; }
.mp-checkbox { display: inline-flex; align-items: center; gap: 0.6em; min-height: 2.4em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); color: var(--mp-ink); cursor: pointer; }
.mp-checkbox input {
  appearance: none; -webkit-appearance: none; flex: none; position: relative; margin: 0;
  width: 1em; height: 1em; border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  background: transparent; cursor: pointer;
}
.mp-checkbox input:hover { border-color: var(--mp-ink); }
.mp-checkbox input:checked { background: var(--mp-ink); border-color: var(--mp-ink); }
.mp-checkbox input:indeterminate, .mp-checkbox input.is-mixed {
  box-sizing: border-box; padding: calc(0.5em - 2px) 0.25em; /* 안쪽 내용 영역 = 0.5em × 2px */
  background: var(--mp-ink); background-clip: content-box;
}
.mp-checkbox input:focus-visible, .mp-checkbox input.is-focus { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-checkbox input[aria-invalid="true"] { border-color: var(--mp-ink); }
.mp-checkbox:has(input:disabled) { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-checkbox input:disabled { cursor: not-allowed; }
.mp-checkbox.is-done { opacity: var(--mp-opacity-meta); }
.mp-checkbox-note { display: block; padding-left: 1.6em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-checkbox-error::before { content: "■"; margin-right: 0.4em; color: var(--mp-accent); } /* 첫 오류 하나만 */
.mp-checkbox-error { font-size: var(--mp-size-small); opacity: var(--mp-opacity-body); }
```
일부 선택의 가로 막대는 `padding` + `background-clip: content-box`로 가운데 내용 영역만 칠해 그린다. `::after`는 input에서 브라우저마다 다르게 동작해 쓰지 않는다.

## 앱
- SwiftUI: `Toggle(isOn:)` + 사용자 `ToggleStyle` — `Button { configuration.isOn.toggle() } label: { HStack(spacing: 8) { Rectangle().fill(isOn ? ink : .clear).overlay(Rectangle().stroke(isOn ? ink : lineStrong, lineWidth: 1)).frame(width: 16, height: 16); configuration.label } }`. `.accessibilityAddTraits(isOn ? .isSelected : [])`.
- Compose: `Row(Modifier.toggleable(value = on, role = Role.Checkbox, onValueChange = { }).heightIn(min = 48.dp)) { Box(Modifier.size(16.dp).border(1.dp, if (on) ink else lineStrong, RectangleShape).background(if (on) ink else Color.Transparent)); Text(label) }`. 일부 선택은 `triStateToggleable` + `Role.Checkbox`.
- 터치 영역은 줄 전체 44pt/48dp 이상.
- OS 예외: 시스템 `Form`·설정 번들 안의 체크 표시(iOS 목록의 체크마크)는 시스템 모양 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 라벨을 눌러도 켜지게 `<label>`로 감싼다.
- 해야 할 것: 켜짐은 잉크 한 덩어리 ■로 분명하게.
- 해야 할 것: 네이티브 input을 유지해 키보드(Space)·스크린리더를 살린다.
- 해야 할 것: 여러 개 묶음은 `fieldset`·`legend`로.
- 하지 말 것: 둥근 칸, 곡선 체크 아이콘(✓), 체크 SVG 장식.
- 하지 말 것: teal·orange로 채우기, 켜질 때 튀거나 커지는 애니메이션.
- 하지 말 것: 즉시 반영 설정에 체크박스(→ `switch`), 하나만 고르는 선택에 체크박스(→ `radio`).
- 하지 말 것: 칸만 누를 수 있는 작은 터치 영역.
