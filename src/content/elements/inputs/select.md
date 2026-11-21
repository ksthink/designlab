---
id: select
name: 선택 목록
nameEn: Select
category: inputs
summary: 목록에서 값 하나를 고르는 1px 테두리 칸. 오른쪽에 작은 ▼ 글자를 두고, 펼친 목록은 네이티브 목록을 쓴다.
aliases: [선택 목록, 셀렉트, 드롭다운 선택, 콤보박스, 고르기, 정렬 선택, 옵션 선택, select, dropdown, picker, combobox, option list, sort by]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-line, --mp-line-strong, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-muted, --mp-duration-hover]
effects: [reduced-motion]
related: [text-field, radio, segmented-control, dropdown-menu, form-validation]
---

## 용도
6개 이상의 선택지 중 **값 하나**를 고를 때 쓴다(국가, 정렬 기준, 시간대).
- 선택지 2–5개: 모두 보이게 `radio`(폼 안) 또는 `segmented-control`(보기 전환)을 쓴다.
- 행동 목록(편집·복제·삭제): `dropdown-menu`를 쓴다. select는 값을 고르는 칸이다.
- 여러 개를 고르면 `checkbox` 목록을 쓴다. `<select multiple>`은 쓰지 않는다.
- 선택지가 30개를 넘고 이름을 알고 있으면 입력해서 거르는 콤보박스(`search-field` + 목록)를 검토한다.

## 생김새
- 구조: 라벨(위) → 칸 → 도움말·오류 자리(아래). `text-field`와 같은 세로 리듬
- 라벨: `--mp-size-small`, `--mp-tracking-small`, `opacity: var(--mp-opacity-secondary)`, 칸과 간격 `0.5em`
- 칸
  - 테두리 `var(--mp-border) solid var(--mp-line-button)`(조작 요소 경계 3:1), `border-radius: 0`, 배경 투명, 글자 `--mp-ink`
  - 글자 `--mp-size-body` / `--mp-tracking-body`, 행간 1.4
  - 여백 `0.7em 2.4em 0.7em 0.9em` — 오른쪽 2.4em은 ▼ 자리
  - 폭: 가장 긴 선택지 + ▼ 자리. 폼 안에서는 `max-width: 18em`, 좁은 화면은 100%
  - `appearance: none`으로 OS 화살표를 지운다
- ▼ 표시
  - 글자 `▼`(Mulmaru에 있음), `font-size: var(--mp-size-meta)`, 오른쪽 `0.9em`, 세로 가운데
  - `opacity: var(--mp-opacity-meta)`, `pointer-events: none`, `aria-hidden`
  - 곡선 화살표 아이콘·`▾`(Mulmaru에 없음)는 쓰지 않는다
- 선택되지 않은 첫 값: `<option value="" disabled selected>선택</option>`, 칸 글자 `opacity: var(--mp-opacity-muted)`
- 펼친 목록: 브라우저·OS 네이티브 목록(모양 바꾸지 않음, OS 예외)
- 도움말: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line-button`, ▼ opacity .7 |
| 값 없음(placeholder) | 칸 글자 `opacity: var(--mp-opacity-secondary)` |
| 호버 | 테두리 `--mp-line-strong` (`--mp-duration-hover` ease), ▼ opacity 1 |
| 포커스 | 테두리 `--mp-line-strong` + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 열림 | 네이티브 목록 표시, 칸은 포커스 모양 유지 |
| 비활성 | `opacity: var(--mp-opacity-muted)`, `cursor: not-allowed`, 호버 변화 없음 |
| 오류 | 테두리 `--mp-ink`, `aria-invalid="true"`, 아래 문구 — `form-validation` |

## 동작
### 모션
- 테두리 색 전환만 `--mp-duration-hover` ease. 목록 펼침 애니메이션을 만들지 않는다(네이티브 그대로).
- `prefers-reduced-motion: reduce`이면 전환 없음.

### 키보드·접근성
- 네이티브 `<select>` + `<label for>`를 쓴다. 사용자 목록(`role="listbox"`)을 직접 만들지 않는다 — 키보드·스크린리더·모바일 휠을 모두 잃는다.
- 키보드(브라우저 기본): Tab 포커스, Space·Alt+↓ 열기, ↑↓ 이동, 글자 입력으로 첫 글자 이동, Enter 선택, Esc 닫기.
- 필수면 `required` + 라벨 뒤 `(필수)` 글자. 도움말은 `aria-describedby`.
- 선택이 바뀌면 즉시 반영하는 곳(정렬)은 `change` 이벤트에서 반영하고, 결과 수를 `aria-live="polite"`로 알린다.
- 선택지 그룹은 `<optgroup label>`로. 구분선용 가짜 option(`-----`)을 넣지 않는다.

### 반응형
- 폭 480px 이하: 칸 `width: 100%`, 라벨은 항상 위(옆에 두지 않는다).
- 터치 영역: 칸 높이 최소 44px(여백으로 확보).
- 모바일 브라우저는 OS 휠·시트로 열린다. 그대로 둔다.

## 데모
```html demo
<div class="mp-select-demo">
  <label class="mp-select"><span class="mp-select-label">정렬</span>
    <span class="mp-select-box"><select><option>최근</option><option>이름</option></select></span>
  </label>
  <label class="mp-select"><span class="mp-select-label">포커스</span>
    <span class="mp-select-box"><select class="is-focus"><option>이름</option></select></span>
  </label>
  <label class="mp-select"><span class="mp-select-label">비활성</span>
    <span class="mp-select-box"><select disabled><option>용량</option></select></span>
  </label>
</div>
```

## 코드
```css
.mp-select-demo { display: flex; flex-wrap: wrap; gap: 1.2em; }
.mp-select { display: grid; gap: 0.5em; width: 100%; max-width: 18em; }
.mp-select-demo .mp-select { width: 9em; }
.mp-select-label { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-select-hint { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-select-box { position: relative; display: block; }
.mp-select-box::after {
  content: "▼"; position: absolute; right: 0.9em; top: 50%; transform: translateY(-50%);
  font-size: var(--mp-size-meta); opacity: var(--mp-opacity-meta); pointer-events: none;
}
.mp-select-box:hover::after { opacity: 1; }
.mp-select-box select {
  appearance: none; -webkit-appearance: none; width: 100%; min-height: 44px;
  padding: 0.7em 2.4em 0.7em 0.9em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-body) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-body); cursor: pointer;
  transition: border-color var(--mp-duration-hover) ease;
}
.mp-select-box select option { background: var(--mp-bg); color: var(--mp-ink); }
.mp-select-box select:hover { border-color: var(--mp-line-strong); }
.mp-select-box select:focus-visible, .mp-select-box select.is-focus { border-color: var(--mp-line-strong); outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-select-box select[aria-invalid="true"] { border-color: var(--mp-ink); }
.mp-select-box select:disabled { opacity: var(--mp-opacity-muted); cursor: not-allowed; border-color: var(--mp-line); }
.mp-select-box:has(select:disabled)::after { opacity: var(--mp-opacity-muted); }
@media (prefers-reduced-motion: reduce) { .mp-select-box select { transition: none; } }
```
`.is-focus`는 데모에서 포커스 상태를 고정해 보여 주는 클래스다. 제품에서는 `:focus-visible`만 쓴다.

## 앱
- SwiftUI: `Picker(.menu)`의 펼친 메뉴는 시스템 메뉴(OS 예외). 닫힌 칸은 직접 그린다.
  ```swift
  Menu { ForEach(options) { o in Button(o.name) { value = o } } } label: {
    HStack { Text(value.name); Spacer(); Text("▼").font(.custom("Mulmaru", size: 12)).opacity(0.7) }
      .padding(.horizontal, 14).frame(minHeight: 44)
      .overlay(Rectangle().stroke(line, lineWidth: 1))
  }
  ```
- Compose: `ExposedDropdownMenuBox` 대신 `Box(Modifier.border(1.dp, line, RectangleShape).clickable { expanded = true })` + `DropdownMenu(shape = RectangleShape, tonalElevation = 0.dp, shadowElevation = 0.dp)`. 항목 글자는 Mulmaru 400.
- iOS 휠(`.wheel`)·Android 시스템 선택 대화상자는 OS 모양 그대로 둔다. `.tint`는 잉크 값.
- 설정 화면에서는 칸 대신 `settings` 행(`라벨 ··· 값 >`)으로 쓰고, 누르면 선택 화면으로 이동해도 된다.

## 해야 할 것 / 하지 말 것
- 해야 할 것
  - 현재 값이 칸 안에 그대로 보이게 한다.
  - 선택지는 짧은 명사, 정렬은 의미 순서(자주 쓰는 것 먼저 또는 가나다).
  - 네이티브 `<select>`로 키보드·보조 기술을 그대로 얻는다.
  - 기본값이 합리적이면 미리 고른다. 사용자가 반드시 골라야 하면 빈 첫 값 + `required`.
- 하지 말 것
  - 둥근 칸, 곡선 화살표 아이콘, 목록 그림자, 채운 회색 배경.
  - 선택지 2–3개짜리 select(모두 보여 준다).
  - 행동 목록을 select로 만들기, 고르는 순간 페이지 이동.
  - `role="listbox"` 사용자 목록으로 네이티브를 대체하기.
  - 선택 값을 teal·orange 글자로 칠하기.
