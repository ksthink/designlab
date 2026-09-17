---
id: code-block
name: 코드 블록
nameEn: Code Block
category: content
summary: 코드·명령을 1px 선과 모눈 틴트 면에 담는다. 코드도 Mulmaru 한 서체로 쓴다.
aliases: [코드 블록, code block, pre, 코드, 인라인 코드, inline code, 스니펫, snippet, 명령어, 복사 버튼, kbd]
platforms: [web]
status: extracted
source: design_lab src/layouts/Base.astro pre, :not(pre) > code
pillars: [minimalism, pixel-art]
tokens: [--mp-font, --mp-border, --mp-line, --mp-grid-bg, --mp-size-kicker, --mp-tracking-body, --mp-ink, --mp-bg, --mp-opacity-meta, --mp-size-meta, --mp-tracking-meta, --mp-duration-hover]
effects: [invert-hover]
related: [table, text-action, terminal-vocabulary, toast]
---

## 용도
복사해서 쓸 코드, 터미널 명령, 설정 조각, 파일 경로를 보여 줄 때 쓴다.
문장 속 짧은 이름(변수, 파일명, 키)은 인라인 `code`, 키보드 키는 `kbd`.
설명 문장을 강조하려고 코드 모양을 빌리지 않는다. 긴 로그 전체를 붙이지 않고 필요한 줄만 보인다.

## 생김새
**구조**
- 블록: `div.code-block > button.copy + pre > code`. 언어 이름이 필요하면 블록 위 kicker 한 줄(`css`), 블록 안에 탭·헤더 바를 만들지 않는다.
- 인라인: `<code>` 하나. 키: `<kbd>` 하나.

**수치** (design_lab 원값)
- `pre`: `border: var(--mp-border) solid var(--mp-line)`, 배경 `--mp-grid-bg`, 여백 `1.1em 1.3em`, 아래 `1.6em`
- 글자: `font-family: var(--mp-font)`(monospace 금지), `--mp-size-kicker`, 자간 `--mp-tracking-body`, 행간 1.9
- 줄바꿈: `white-space: pre-wrap; overflow-wrap: anywhere` — 가로 스크롤 대신 접는다. 들여쓰기는 공백 2칸(`tab-size: 2`)
- 구문 강조 색 없음. 주석만 `opacity: var(--mp-opacity-meta)`
- 인라인 `code`: 여백 `0.05em 0.35em`, 같은 선·면, 글자 `0.9em`, `overflow-wrap: anywhere`
- `kbd`: 인라인 코드와 같은 모양, 여백 `0 0.35em`
- 복사 버튼: 블록 오른쪽 위 `top/right 0.5em`, 글자 `[ 복사 ]`, `--mp-size-meta`·`--mp-tracking-meta`, 여백 `0.2em 0.5em`, 테두리 없음, 블록 오른쪽 여백을 `5.5em`으로 늘려 첫 줄과 겹치지 않게

**반응형**
- 접기(`pre-wrap`)라 좁은 화면에서 가로 스크롤이 생기지 않는다. 들여쓰기가 중요한 코드(YAML 등)는 예외로 `white-space: pre; overflow-x: auto`.
- 480px 이하에서 블록 여백을 `0.9em 1em`으로 줄인다. 글자 크기는 그대로.
- 390px: 480px 이하 여백 `0.9em 5em 0.9em 1em`. 복사 버튼은 오른쪽 위 그대로(첫 줄 오른쪽 5em 비움).
- 700px: 기본 여백 `1.1em 5.5em 1.1em 1.3em`.
- 860px / 1180px: 변화 없음 — 블록 폭은 부모(읽기 760px, 목록 1180px) 100%, 한 줄 글자 수가 너무 길어지면 부모를 `--mp-width-read`로 둔다.

**접근성**
- 복사 버튼은 실제 `<button type="button">`, `aria-label="코드 복사"`. 결과는 `aria-live="polite"` 영역(버튼 글자 교체로 충분)으로 알린다.
- 키보드: Tab으로 복사 버튼에 닿고 Enter/Space로 복사. `pre`는 스크롤이 생길 때만 `tabindex="0"`.
- 글자 색은 `--mp-ink` 그대로(모눈 틴트 .035 위 대비 유지). 주석(.55)에 필수 정보를 두지 않는다.
- 결과 알림 마크업: `<button type="button" class="mp-code-block-copy" aria-label="코드 복사">[ 복사 ]</button><span class="sr-status" role="status" aria-live="polite"></span>` — 복사 후 `status`에 "복사했습니다"를 넣고 1.5초 뒤 비운다. 버튼 글자만 바꾸면 일부 스크린리더가 읽지 않으므로 status를 함께 쓴다.
- 코드 블록에 `aria-label`을 붙이지 않는다(내용이 곧 이름). 언어 표시는 위 kicker 글자로.
- `kbd` 조합은 `<kbd>Ctrl</kbd>+<kbd>C</kbd>`, 기호 `⌘`만 쓰지 않고 `Cmd`를 글자로.

**조합 규칙**
- 복사 버튼은 블록마다 하나, 한 화면에 블록이 많아도 버튼 모양은 같다. orange `■`를 복사 버튼에 쓰지 않는다.
- 코드 블록 안에 표·아코디언을 넣지 않는다. 긴 코드는 블록을 `accordion`(`코드 보기`)으로 감싸는 것은 허용.
- 블록 앞 문단과 간격은 문단 margin(`1.6em`), 블록끼리 연속이면 사이에 한 줄 설명을 둔다.
- 인라인 `code`를 링크 안에 넣으면 링크 밑줄 대신 코드 틀이 보이므로 링크 스타일(`link`)을 코드 바깥에 준다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 선 + 모눈 틴트 면 |
| 복사 버튼 기본 | `[ 복사 ]`, 투명 배경 |
| 복사 버튼 호버·포커스 | 잉크/배경 반전(`--mp-duration-hover`) + 포커스 링 |
| 복사 완료 | 글자를 `[ 복사됨 ]`으로 1.5초 바꾼 뒤 되돌린다. 색·아이콘 변화 없음 |
| 복사 실패 | `[ 실패 ]` 글자. 코드 선택은 사용자가 직접 할 수 있게 `user-select` 유지 |
| 텍스트 선택 | `::selection` 배경 `--mp-ink`, 글자 `--mp-bg` |

## 동작
- 복사 버튼만 `invert-hover`: 배경·글자색 `--mp-duration-hover` ease. 블록 자체는 움직이지 않는다.
- 복사: `navigator.clipboard.writeText(code.textContent)`. 클립보드가 없으면 버튼을 숨긴다.
- reduced-motion: transition 없이 최종 상태만.

## 데모
```html demo
<div class="mp-code-block">
  <button class="mp-code-block-copy" type="button">[ 복사 ]</button>
  <pre class="mp-code-block-pre"><code>--mp-ink
<span class="mp-code-block-note">/* a */</span>
--mp-bg</code></pre>
</div>
<div class="mp-code-block">
  <button class="mp-code-block-copy is-hover" type="button">[ 복사됨 ]</button>
  <pre class="mp-code-block-pre"><code>npm i</code></pre>
</div>
<p><code class="mp-code-inline">ink</code> <kbd class="mp-code-inline">Tab</kbd></p>
```

## 코드
```css
.mp-code-block { position: relative; }
.mp-code-block-pre {
  margin: 0 0 1.6em; padding: 1.1em 5.5em 1.1em 1.3em;
  border: var(--mp-border) solid var(--mp-line); background: var(--mp-grid-bg);
  font-family: var(--mp-font); font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-body);
  line-height: 1.9; white-space: pre-wrap; overflow-wrap: anywhere; tab-size: 2;
}
.mp-code-block-pre code { font: inherit; }
.mp-code-block-pre ::selection { background: var(--mp-ink); color: var(--mp-bg); }
.mp-code-block-note { opacity: var(--mp-opacity-meta); }
.mp-code-block-copy {
  position: absolute; top: 0.5em; right: 0.5em; padding: 0.2em 0.5em;
  border: 0; border-radius: 0; background: transparent; color: var(--mp-ink); cursor: pointer;
  font: 400 var(--mp-size-meta) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-code-block-copy:hover, .mp-code-block-copy:focus-visible, .mp-code-block-copy.is-hover { background: var(--mp-ink); color: var(--mp-bg); }
.mp-code-block-copy:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-code-inline {
  padding: 0.05em 0.35em; font-family: var(--mp-font); font-size: 0.9em;
  border: var(--mp-border) solid var(--mp-line); background: var(--mp-grid-bg); overflow-wrap: anywhere;
}
@media (max-width: 480px) { .mp-code-block-pre { padding: 0.9em 5em 0.9em 1em; } }
@media (prefers-reduced-motion: reduce) { .mp-code-block-copy { transition: none; } }
```

```js
document.querySelectorAll('.mp-code-block').forEach((box) => {
  const btn = box.querySelector('.mp-code-block-copy');
  const code = box.querySelector('code');
  if (!navigator.clipboard) { btn.hidden = true; return; }
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(code.textContent); btn.textContent = '[ 복사됨 ]'; }
    catch (e) { btn.textContent = '[ 실패 ]'; }
    setTimeout(() => { btn.textContent = '[ 복사 ]'; }, 1500);
  });
});
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 코드·명령·경로도 `--mp-font` 하나.
- 해야 할 것: 긴 줄은 접고, 들여쓰기가 뜻인 코드만 가로 스크롤.
- 해야 할 것: 복사 버튼은 `[ 복사 ]` 글자 버튼, 결과도 글자로.
- 해야 할 것: 붙여넣어 바로 동작하는 완전한 조각만 싣는다.
- 하지 말 것: monospace·코딩 서체(Fira Code, JetBrains Mono 등).
- 하지 말 것: 구문 강조 색(파랑 키워드, 초록 문자열), 어두운 에디터 테마 박스.
- 하지 말 것: 둥근 모서리, 창 모양 빨강·노랑·초록 점 장식, 줄 번호.
- 하지 말 것: 복사 완료를 초록 체크 아이콘·토스트 팝업으로.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `font-family: "Fira Code", monospace` | `var(--mp-font)` |
| Prism·Shiki 기본 색 테마 | 색 없음, 주석만 `--mp-opacity-meta` |
| `background: #1e1e1e` 어두운 박스 | `--mp-grid-bg` 틴트 + 1px 선 |
| 복사 아이콘(📋)만 있는 버튼 | `[ 복사 ]` 글자 + `aria-label` |
| 복사 완료 초록 체크·토스트 | 버튼 글자 `[ 복사됨 ]` + `role="status"` |
| `white-space: pre` 로 모바일 가로 스크롤 | `pre-wrap`, 들여쓰기 뜻일 때만 예외 |
