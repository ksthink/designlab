---
id: quote
name: 인용
nameEn: Quote
category: content
summary: 인용문은 왼쪽 1px 진한 선과 옅은 글자로 본문과 구분한다. 따옴표 장식·기울임·배경 면 없음.
aliases: [인용, quote, blockquote, 인용문, 발췌, 콜아웃, callout, 한마디, 슬로건 인용, 후기, testimonial, pull quote]
platforms: [web]
status: proposed
pillars: [minimalism]
tokens: [--mp-border, --mp-line-strong, --mp-line, --mp-opacity-secondary, --mp-opacity-body, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-leading-body, --mp-size-lead, --mp-tracking-lead, --mp-size-body, --mp-width-para, --mp-opacity-link, --mp-ink, --mp-bg]
effects: []
related: [page-read, divider, banner, code-block, microcopy]
---

## 용도
다른 사람의 말, 원문 발췌, 문서 첫머리 요약(한 문단)을 본문과 구분할 때 쓴다.
알림·경고·팁은 `banner`, 코드·명령 발췌는 `code-block`을 쓴다. 강조하려고 인용 모양을 빌리지 않는다.
사용자 후기(testimonial)는 실제 출처가 있을 때만, 한 화면에 하나.

## 생김새
**구조**
- `figure` > `blockquote`(`cite` 속성에 원문 URL) > `p` 한두 개, 그 아래 `figcaption`에 출처.
- 짧은 문장 속 인용은 `q` 요소 + 한국어 따옴표 `“ ”`를 글자로(장식 크기 아님).

**수치 — 블록 인용**
- 왼쪽 선 `var(--mp-border) solid var(--mp-line-strong)`, 안쪽 여백 `0.2em 0 0.2em 1.2em`, 바깥 아래 `1.8em`.
- 글자 크기는 둘러싼 본문과 같게(`--mp-size-body`), 행간 `--mp-leading-body`.
- 글자 `opacity: var(--mp-opacity-secondary)`(.7, 필수 정보 하한).
- 문단 사이 `0.8em`. 폭은 `--mp-width-para` 이하.
- 출처: 위 `0.4em`, `— 이름, 출처`, `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, `font-style: normal`.
- 출처가 링크면 1px `--mp-line` 밑줄, `opacity: var(--mp-opacity-link)`, 호버 반전.

**수치 — 크게 뽑은 인용(pull quote)**
- 선 없이 위아래 1px `--mp-line`, 여백 `1.2em 0`.
- 글자 `--mp-size-lead`, `--mp-tracking-lead`, `opacity: var(--mp-opacity-body)`.
- 한 문서에 하나까지.

**반응형**
- 390px: 왼쪽 여백 `0.9em`, 선 두께 1px 그대로. 긴 URL 출처는 `overflow-wrap: anywhere`.
- 700px: 여백 `1.2em`, 폭 `--mp-width-para`.
- 860px: 읽기 화면(`--mp-width-read`) 안에서 본문과 같은 왼쪽 시작선. 밖으로 내어 쓰지 않는다.
- 1180px: 목록 화면에 크게 뽑은 인용을 두면 가운데 한 단, 폭 `--mp-width-para`.

**접근성**
- `blockquote`의 의미를 유지한다(스크린리더가 인용 구역을 알린다). 들여쓰기 목적으로 `blockquote`를 쓰지 않는다.
- 출처는 `figcaption` 안 텍스트로. `cite` 속성은 보이지 않으므로 사람용 출처를 따로 적는다.
- `cite` 요소의 기본 기울임을 `font-style: normal`로 끈다.
- 인용 글자 .7 투명도는 본문 대비 하한이다. 더 옅게 하지 않는다.
- `blockquote cite="https://…"`에 원문 주소를 넣고, 보이는 출처 링크도 `figcaption`에 둔다.
- 키보드: 인용 자체는 포커스를 받지 않는다. 출처 링크만 Tab.
- 짧은 인라인 인용은 `q`를 쓰되 브라우저 자동 따옴표와 글자 따옴표가 겹치지 않게 `q { quotes: none; }`.

**조합 규칙**
- 인용에는 orange·teal을 쓰지 않는다.
- 인용 위아래 본문과 `1.8em`. `divider` 바로 옆에 붙이지 않는다(선이 겹쳐 보인다).
- 인용 안에 인용·목록·코드 블록을 넣지 않는다. 한 문서에 크게 뽑은 인용은 하나.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 왼쪽 1px 진한 선, .7 글자 |
| 크게 뽑음 | 위아래 선, lead 크기, .85 글자 |
| 출처 링크 호버·포커스 | 배경 `--mp-ink`, 글자 `--mp-bg`, `opacity: 1` |
| 출처 없음 | 출처 줄 생략(지어내지 않는다) |

## 데모
```html demo
<figure class="mp-quote">
  <blockquote><p>빼고 덜어낸다.</p></blockquote>
  <figcaption>— <a href="#">metaphr</a></figcaption>
</figure>
<figure class="mp-quote mp-quote--pull">
  <blockquote><p>여백을 담습니다.</p></blockquote>
</figure>
```

## 코드
```css
.mp-quote { margin: 0 0 1.8em; }
.mp-quote blockquote {
  margin: 0; padding: 0.2em 0 0.2em 1.2em; max-width: var(--mp-width-para);
  border-left: var(--mp-border) solid var(--mp-line-strong);
}
.mp-quote blockquote p { margin: 0 0 0.8em; font-size: var(--mp-size-body); line-height: var(--mp-leading-body); opacity: var(--mp-opacity-secondary); }
.mp-quote blockquote p:last-child { margin-bottom: 0; }
.mp-quote figcaption {
  margin-top: 0.4em; padding-left: 1.2em; font-style: normal;
  font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta);
}
.mp-quote figcaption a { color: inherit; text-decoration: none; border-bottom: var(--mp-border) solid var(--mp-line); overflow-wrap: anywhere; }
.mp-quote figcaption a:hover, .mp-quote figcaption a:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-quote cite { font-style: normal; }
.mp-quote--pull blockquote { padding: 1.2em 0; border-left: 0; border-top: var(--mp-border) solid var(--mp-line); border-bottom: var(--mp-border) solid var(--mp-line); }
.mp-quote--pull blockquote p { font-size: var(--mp-size-lead); letter-spacing: var(--mp-tracking-lead); opacity: var(--mp-opacity-body); }
@media (max-width: 390px) {
  .mp-quote blockquote, .mp-quote figcaption { padding-left: 0.9em; }
  .mp-quote--pull blockquote { padding-left: 0; }
}
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 짧게 인용하고 실제 출처를 남긴다.
- 해야 할 것: `cite`·`em`의 기본 기울임을 끈다.
- 해야 할 것: 원문을 그대로 옮기고, 줄인 곳은 `…`로 표시한다.
- 하지 말 것: 큰 따옴표 글리프 장식(❝ ❞, 거대한 “).
- 하지 말 것: 기울임, 색 배경 콜아웃 박스, 둥근 박스.
- 하지 말 것: orange·teal 왼쪽 선, 2px 이상 선.
- 하지 말 것: 한 화면에 크게 뽑은 인용 여러 개, 지어낸 후기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `border-left: 4px solid orange` | 1px `--mp-line-strong` |
| `font-style: italic` | `normal` |
| 큰 `“` 장식 글리프 | 없음 |
| 회색 배경 콜아웃 박스 | 배경 없음 |
| 들여쓰기용 `blockquote` | `padding`/`margin`으로 |
