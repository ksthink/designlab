---
id: textarea
name: 여러 줄 입력
nameEn: Textarea
category: inputs
summary: 여러 줄 글을 받는 1px 테두리 사각 칸. 본문 행간 그대로 쓰고, 크기 조절은 세로로만.
aliases: [여러 줄 입력, 텍스트영역, 메모 입력, 본문 입력, 긴 글 입력, 댓글 입력, textarea, multiline, text area, 메모장, comment box]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism]
tokens: [--mp-ink, --mp-accent, --mp-line, --mp-line-strong, --mp-border, --mp-font, --mp-size-body, --mp-tracking-body, --mp-leading-body, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-muted, --mp-opacity-meta, --mp-duration-hover, --mp-width-para]
effects: [reduced-motion]
related: [text-field, form-validation, labels-numbers, page-read]
---

## 용도
메모·설명·피드백·댓글처럼 **여러 줄 글**을 받을 때 쓴다.
- 한 줄 값이면 `text-field`. 제목 + 본문 편집 화면이면 테두리 없는 전체 화면 편집(아래 "편집 화면")을 쓴다.
- 글자 수 제한이 있으면 칸 오른쪽 아래에 `12 / 200` 형태로 센다. 제한이 없으면 세지 않는다.

## 생김새
- 구조: `라벨` → `칸` → `아래 줄(도움말·오류 왼쪽 / 글자 수 오른쪽)`, 간격 `0.5em`
- 라벨: `text-field`와 같다(`--mp-size-small`, `opacity: var(--mp-opacity-secondary)`)
- 칸
  - 테두리 `var(--mp-border) solid var(--mp-line-button)`(조작 요소 경계 3:1), `border-radius: 0`, 배경 투명
  - 여백 `0.7em 0.9em`
  - 글자 `--mp-size-body`, 자간 `--mp-tracking-body`, 행간 `--mp-leading-body`(2.1) — 읽는 본문과 같은 리듬
  - 최소 높이 4줄(`rows="4"`, `min-height: 9em`), 최대 높이 `60vh` 뒤로는 칸 안 스크롤
  - 폭 `max-width: var(--mp-width-para)`(30em) — 한 줄이 너무 길어지지 않게
  - `resize: vertical`만 허용
- 글자 수: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, `font-variant-numeric: tabular-nums`, 오른쪽 정렬
- 편집 화면(메모 앱 본문): 테두리 없이 화면 폭 전체를 칸으로 쓰고, 읽기 폭 규칙(`page-read`)을 따른다. 포커스 윤곽선 대신 화면 위 제목 줄 아래 1px `--mp-line`으로 영역을 보인다

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line` |
| 호버 | 테두리 `--mp-line-strong` |
| 포커스 | 테두리 `--mp-line-strong` + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 제한의 90% 이상 | 글자 수 `opacity: 1` (옅은 단계에서 올라옴) |
| 제한 초과 | 칸 테두리 `--mp-ink`, 글자 수 앞 `■` `--mp-accent`(화면에 다른 강조가 없을 때만, 있으면 잉크 ■), `aria-invalid="true"` |
| 비활성 | `opacity: var(--mp-opacity-muted)`, `resize: none` |
| 읽기 전용 | 테두리 없음, 본문처럼 보인다 |

## 동작
### 모션
- 테두리 색만 `--mp-duration-hover` ease. 입력하며 칸이 부드럽게 늘어나는 애니메이션은 없다(자동 높이를 쓰면 즉시 늘어난다).
- `prefers-reduced-motion: reduce`이면 transition 없음.

### 키보드·접근성
- `<label>` 연결, 글자 수와 도움말은 `aria-describedby`.
- 글자 수는 입력마다 읽어 주지 않는다. 제한 초과로 바뀌는 순간만 `aria-live="polite"` 영역에 `200자를 넘었습니다` 한 번.
- `maxlength`로 입력을 막기보다 초과를 표시하고 제출 때 막는다(붙여넣은 글이 잘려 사라지지 않게).
- Enter는 줄바꿈이다. 제출은 버튼이나 `Ctrl/⌘ + Enter`(댓글 등)로, 단축키가 있으면 도움말 줄에 적는다.
- Tab은 다음 칸으로 이동한다(탭 문자 입력으로 가로채지 않는다).

### 반응형
- 480px 이하: `width: 100%`, `max-width` 해제, `font-size: var(--mp-size-subheading)`(24px, iOS 확대 방지 — 16px은 12px 격자에서 벗어난다).
- 가상 키보드가 열려도 커서 줄이 보이도록 칸 최대 높이를 `40vh`로 줄인다.

## 데모
```html demo
<div class="mp-textarea-demo">
  <label class="mp-textarea"><span class="mp-textarea-label">메모</span><textarea class="mp-textarea-input" rows="3"></textarea><span class="mp-textarea-count">0 / 200</span></label>
  <label class="mp-textarea"><span class="mp-textarea-label">포커스</span><textarea class="mp-textarea-input is-focus" rows="3">여백</textarea><span class="mp-textarea-count">2 / 200</span></label>
  <label class="mp-textarea"><span class="mp-textarea-label">초과</span><textarea class="mp-textarea-input" rows="3" aria-invalid="true">...</textarea><span class="mp-textarea-count is-over">201 / 200</span></label>
</div>
```

## 코드
```css
.mp-textarea-demo { display: flex; flex-wrap: wrap; gap: 1.2em; align-items: start; }
.mp-textarea-demo .mp-textarea { max-width: 11em; }
.mp-textarea { display: grid; gap: 0.5em; width: 100%; max-width: var(--mp-width-para); }
.mp-textarea-label { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-textarea-input {
  width: 100%; min-height: 7em; max-height: 60vh; margin: 0; padding: 0.7em 0.9em; resize: vertical;
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink); caret-color: var(--mp-ink);
  font: 400 var(--mp-size-body) / var(--mp-leading-body) var(--mp-font); letter-spacing: var(--mp-tracking-body);
  transition: border-color var(--mp-duration-hover) ease;
}
.mp-textarea-input::placeholder { color: var(--mp-ink); opacity: var(--mp-opacity-secondary); }
.mp-textarea-input:hover { border-color: var(--mp-line-strong); }
.mp-textarea-input:focus-visible, .mp-textarea-input.is-focus { border-color: var(--mp-line-strong); outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-textarea-input[aria-invalid="true"] { border-color: var(--mp-ink); }
.mp-textarea-input:disabled { opacity: var(--mp-opacity-muted); resize: none; cursor: not-allowed; }
.mp-textarea-count { justify-self: end; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); font-variant-numeric: tabular-nums; }
.mp-textarea-count.is-near, .mp-textarea-count.is-over { opacity: 1; }
.mp-textarea-count.is-over::before { content: "■"; margin-right: 0.4em; color: var(--mp-accent); } /* 화면당 하나 */
@media (max-width: 480px) { .mp-textarea-input { font-size: var(--mp-size-subheading); max-height: 40vh; } }
@media (prefers-reduced-motion: reduce) { .mp-textarea-input { transition: none; } }
```

## 앱
- SwiftUI: `TextEditor(text:)` + `.scrollContentBackground(.hidden)` + `.lineSpacing` (행간 2.1에 맞게 글자 크기 × 1.1) + `.padding(12)` + `.overlay(Rectangle().stroke(line, lineWidth: 1))`. placeholder는 비었을 때 위에 겹친 `Text`를 `opacity(0.5)`로.
- iOS 16+: `TextField(axis: .vertical).lineLimit(4...12)`로 자동 높이 칸을 만들 수 있다.
- Compose: `BasicTextField(minLines = 4, maxLines = 12, textStyle = TextStyle(lineHeight = ...))` + `Modifier.border(1.dp, line, RectangleShape).padding(12.dp)`.
- 편집 화면(메모 본문)은 테두리 없이 `fillMaxSize`, 키보드 위 도구 막대도 직각·1px 위 선.
- OS 예외: 텍스트 선택 메뉴, 받아쓰기, 키보드 도구 막대의 시스템 버튼.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 본문 행간(2.1)으로 편하게 읽히게 한다.
- 해야 할 것: 제한이 있으면 처음부터 `0 / 200`을 보여 준다.
- 해야 할 것: 초과는 표시하고 제출 때 막는다. 붙여넣은 글을 자르지 않는다.
- 해야 할 것: 긴 글 편집은 테두리를 빼고 읽기 폭으로.
- 하지 말 것: 가로 크기 조절, 둥근 모서리, 회색 채운 배경.
- 하지 말 것: 입력 중 칸이 부드럽게 늘어나는 애니메이션.
- 하지 말 것: 글자 수를 orange 글자로, 초과 전부터 경고색.
- 하지 말 것: Tab 키를 탭 문자 입력으로 가로채기.
