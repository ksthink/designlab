---
id: search-field
name: 검색 입력
nameEn: Search field
category: inputs
summary: 터미널 프롬프트처럼 > 뒤에 글을 치는 한 줄 검색 칸. 아래 1px 선 하나와 결과 수.
aliases: [검색, 검색창, 검색 입력, 찾기, 필터 입력, 목록 거르기, search, search bar, search input, filter, find, 프롬프트]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-line, --mp-line-strong, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-meta, --mp-tracking-meta, --mp-opacity-kicker, --mp-opacity-muted, --mp-opacity-meta, --mp-opacity-link, --mp-duration-caret, --mp-duration-hover]
effects: [caret, invert-hover, reduced-motion]
related: [text-field, terminal-vocabulary, empty-state, list, loading]
---

## 용도
목록을 이름으로 거르거나 사이트·앱 안을 검색할 때 쓴다.
- 항목이 10개 이하인 목록에는 두지 않는다. 한눈에 보이면 검색이 필요 없다.
- 결과는 입력하는 대로 거른다(로컬 목록). 서버 검색이면 입력 멈춤 250ms 뒤 요청한다.
- 결과가 없으면 목록 자리에 `empty-state`(검색어 포함)를 보여 준다.

## 생김새
- 한 줄: `[>] [입력] [결과 수] [×]`, 요소 사이 간격 `0.6em`, 세로 가운데가 아닌 글자 기준선 정렬
- 선: 아래 선 하나 `var(--mp-border) solid var(--mp-line-button)`(조작 요소 경계 3:1), 다른 세 변 없음, radius 0, 선 위 여백 `0.4em`
- 프롬프트 `>`: `--mp-size-body`, `opacity: var(--mp-opacity-kicker)`, `aria-hidden="true"`
- 입력: 테두리 없음, 배경 투명, `--mp-size-body` / `--mp-tracking-body`, 커서 `caret-color: var(--mp-ink)`
- placeholder: 한 단어 + 밑줄 `검색_`, `opacity: var(--mp-opacity-secondary)`. "무엇이든 검색하세요" 같은 문장은 쓰지 않는다
- 결과 수: `12개` — `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, `tabular-nums`. 입력이 비었을 때는 숨긴다
- 지우기 `×`: 입력이 있을 때만, 누르는 영역 `2em × 2em`, `opacity: var(--mp-opacity-link)`
- 폭: 목록 머리 안에서 `max-width: 26em`. 상단 바에 넣으면 `14em`
- 브라우저 기본 돋보기·지우기 버튼(`::-webkit-search-*`)은 숨긴다

## 상태
| 상태 | 표현 |
|---|---|
| 기본(비어 있음) | 아래 1px `--mp-line`, `>` 옅게, placeholder `검색_` |
| 호버 | 아래 선 `--mp-line-strong` |
| 포커스 | 아래 선 `--mp-line-strong`, `>` opacity 1, 묶음 전체에 `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 입력 중 | 결과 수 갱신, `×` 표시 |
| 검색 중(서버) | 결과 수 자리에 `loading`의 ■ 세 칸 |
| 결과 없음 | 결과 수 `0개`, 목록 자리에 `empty-state` |
| `×` 호버·포커스 | 반전(배경 `--mp-ink`, 글자 `--mp-bg`) |
| 비활성 | `opacity: var(--mp-opacity-muted)` |

## 동작
### 모션
- 선 색은 `--mp-duration-hover` ease. `×` 반전은 `invert-hover`.
- 비어 있고 포커스가 없을 때 placeholder 뒤 `_`를 `caret`처럼 `var(--mp-duration-caret) steps(1, end)`로 깜빡일 수 있다(화면에 깜빡이는 것이 이것 하나일 때만). 포커스되면 브라우저 커서만 남긴다.
- `prefers-reduced-motion: reduce`이면 깜빡임·transition 없음.

### 키보드·접근성
- 폼으로 감싸면 `<form role="search">`, 입력은 `type="search"` + `aria-label="검색"`(보이는 라벨이 없으므로).
- 걸러지는 목록은 `aria-controls`로 연결하고, 결과 수는 `aria-live="polite"`로 입력 멈춤 뒤 한 번 읽는다(`12개`).
- `Esc`: 값이 있으면 지우고, 비었으면 포커스를 푼다. `×`는 `aria-label="지우기"`, 누른 뒤 포커스를 입력으로 돌린다.
- `/` 또는 `⌘K`로 검색에 포커스하는 단축키를 둘 수 있다. 입력 칸 안에서는 가로채지 않는다.
- 아래 화살표로 결과 목록 첫 항목에 이동할 수 있게 하면 좋다(자동완성이면 `combobox` 패턴 필수).

### 반응형
- 480px 이하: 폭 100%, `font-size: var(--mp-size-subheading)`(24px, iOS 확대 방지 — 16px은 12px 격자에서 벗어난다).
- 상단 바에서 공간이 모자라면 `>` 버튼 하나로 접고, 누르면 바 전체를 검색 줄로 바꾼다(즉시 전환).

## 데모
```html demo
<div class="mp-search-field-demo">
  <label class="mp-search-field"><span class="mp-search-field-prompt" aria-hidden="true">&gt;</span><input class="mp-search-field-input" type="search" placeholder="검색_" aria-label="검색"></label>
  <label class="mp-search-field is-focus"><span class="mp-search-field-prompt" aria-hidden="true">&gt;</span><input class="mp-search-field-input" type="search" value="산" aria-label="검색"><span class="mp-search-field-count">12개</span><button class="mp-search-field-clear" type="button" aria-label="지우기">×</button></label>
</div>
```

## 코드
```css
.mp-search-field-demo { display: grid; gap: 1.6em; max-width: 20em; }
.mp-search-field {
  display: flex; align-items: baseline; gap: 0.6em; width: 100%; max-width: 26em;
  padding-bottom: 0.4em; border-bottom: var(--mp-border) solid var(--mp-line-button);
  transition: border-color var(--mp-duration-hover) ease;
}
.mp-search-field:hover { border-bottom-color: var(--mp-line-strong); }
.mp-search-field:focus-within, .mp-search-field.is-focus { border-bottom-color: var(--mp-line-strong); outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-search-field-prompt { opacity: var(--mp-opacity-kicker); }
.mp-search-field:focus-within .mp-search-field-prompt, .mp-search-field.is-focus .mp-search-field-prompt { opacity: 1; }
.mp-search-field-input {
  flex: 1; min-width: 0; margin: 0; padding: 0.3em 0; border: 0; border-radius: 0; outline: none;
  background: transparent; color: var(--mp-ink); caret-color: var(--mp-ink);
  font: 400 var(--mp-size-body) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-body);
  -webkit-appearance: none; appearance: none;
}
.mp-search-field-input::placeholder { color: var(--mp-ink); opacity: var(--mp-opacity-secondary); }
.mp-search-field-input::-webkit-search-cancel-button, .mp-search-field-input::-webkit-search-decoration { -webkit-appearance: none; display: none; }
.mp-search-field-count { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); white-space: nowrap; font-variant-numeric: tabular-nums; }
.mp-search-field-clear {
  align-self: center; width: 2em; height: 2em; padding: 0; border: 0; border-radius: 0;
  background: transparent; color: var(--mp-ink); font: 400 var(--mp-size-body) / 1 var(--mp-font);
  opacity: var(--mp-opacity-link); cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-search-field-clear:hover, .mp-search-field-clear:focus-visible { background: var(--mp-ink); color: var(--mp-bg); opacity: 1; }
.mp-search-field-clear:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@media (max-width: 480px) { .mp-search-field { max-width: none; } .mp-search-field-input { font-size: var(--mp-size-subheading); } }
@media (prefers-reduced-motion: reduce) { .mp-search-field, .mp-search-field-clear { transition: none; } }
```

## 앱
- SwiftUI: `.searchable`은 시스템 검색 막대(OS 예외, 둥근 회색 칸)라 브랜드 화면에서는 쓰지 않는다. `HStack { Text(">").opacity(0.7); TextField("검색_", text: $q); if !q.isEmpty { Text("\(n)개"); Button("×") { q = "" } } }` + 아래 `Rectangle().frame(height: 1)`.
- `.submitLabel(.search)`, `.autocorrectionDisabled()`, `.textInputAutocapitalization(.never)`.
- Compose: `BasicTextField` + `Modifier.drawBehind { drawLine(line, Offset(0f, size.height), Offset(size.width, size.height), 1.dp.toPx()) }`, `KeyboardOptions(imeAction = ImeAction.Search)`. Material 3 `SearchBar`(둥근 알약)는 쓰지 않는다.
- 시스템 설정·목록 화면에서 `.searchable`을 이미 쓰는 경우는 OS 모양을 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: `>` 프롬프트와 한 단어 placeholder로 짧게.
- 해야 할 것: 결과 수를 함께 보여 주고, 결과 없음은 `empty-state`로 검색어와 함께.
- 해야 할 것: `Esc`로 지우기, `×`는 입력이 있을 때만.
- 해야 할 것: 입력하는 대로 거르기(서버는 250ms 멈춤 뒤).
- 하지 말 것: 돋보기 이모지·아이콘 장식, 둥근 알약 검색창, 회색 채운 배경.
- 하지 말 것: 검색 버튼을 따로 눌러야만 결과가 나오게 하기(로컬 목록).
- 하지 말 것: 긴 문장 placeholder, 포커스 때 칸이 넓어지는 애니메이션.
- 하지 말 것: 짧은 목록에 검색 두기.
