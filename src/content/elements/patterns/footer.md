---
id: footer
name: 푸터
nameEn: Footer
category: patterns
summary: 윗선 1px 아래 넓은 여백, 연락 링크(fx-fill), 가운데 워드마크, 가장 옅은 © 한 줄.
aliases: [푸터, footer, 바닥글, 하단 영역, 페이지 하단, 연락처 영역, copyright, 저작권 표시]
platforms: [web]
status: extracted
source: metaphr.dev index.html .foot, .foot-links, .foot-logo, .foot small
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-line, --mp-section-lg, --mp-section, --mp-size-small, --mp-tracking-small, --mp-opacity-link, --mp-size-fine, --mp-tracking-fine, --mp-opacity-fine, --mp-ink, --mp-bg, --mp-duration-fill, --mp-steps-fill]
effects: [fx-fill, reveal]
related: [logo, divider, link, dark-images, page-list, page-read]
---

## 용도
모든 페이지 맨 아래에 한 번 둔다. 연락 수단, 로고, 저작권만 담는다.
사이트맵·뉴스레터 가입·소셜 아이콘 줄·언어 선택은 넣지 않는다.
목록형(`page-list`)은 1180px 틀, 읽기형(`page-read`)은 760px 틀 안에 같은 푸터를 둔다.
앱에는 푸터가 없다. 버전·연락은 `settings` 맨 아래 한 줄로 옮긴다.

## 생김새
**구조**
- `<footer class="foot">` (페이지에 하나, `contentinfo` 랜드마크)
  1. `<div class="foot-links">` — 링크 1–3개. 첫 링크(대표 연락)만 `fx-fill`
  2. `<img class="foot-logo">` — 워드마크(라이트 `metaphr.svg`, 다크 `metaphr-dark.svg`)
  3. `<small>© metaphr</small>`

**수치**
- 바깥 위 여백 `clamp(3rem, 8vh, 5rem)`(가까운 토큰 `--mp-section`), 윗선 `var(--mp-border) solid var(--mp-line)`
- 안쪽 위 `clamp(4rem, 12vh, 8rem)`(가까운 토큰 `--mp-section-lg`), 아래 `clamp(3rem, 8vh, 5rem)`
- 링크 줄: `display: flex; flex-wrap: wrap; gap: 1.6em`, `--mp-size-small`, `--mp-tracking-small`
- 링크: `opacity: var(--mp-opacity-link)`(.75), 밑줄 `border-bottom: 1px solid var(--mp-line)`, `padding-bottom: 0.15em`, `text-decoration: none`
- 워드마크: 원본 350×200, 표시 폭 `clamp(120px, 20vw, 168px)`, `height: auto`, 가운데(`margin: clamp(2.5rem, 7vh, 4rem) auto 0`), `image-rendering: pixelated`, `user-select: none`, `loading="lazy" decoding="async"`
- `© metaphr`: `display: block; margin-top: 1.4rem; text-align: center`, `--mp-size-fine`(.72rem), `--mp-tracking-fine`(.1em), `opacity: var(--mp-opacity-fine)`(.35)

**반응형**
| 폭 | 동작 |
|---|---|
| 390px | 워드마크 120px(`20vw`=78px → 하한), 링크가 두 개 넘으면 줄바꿈. 좌우 `--mp-gutter` 하한 1.25rem |
| 700px | 워드마크 140px, 링크 한 줄 |
| 860px 이상 | 워드마크 168px 상한 도달(840px부터) |
| 1180px 이상 | 목록형은 1180px 틀, 읽기형은 760px 틀 안. 워드마크는 168px 고정 |
- 링크 줄은 좁으면 줄바꿈(`flex-wrap`), 정렬은 왼쪽 그대로. 가운데 정렬로 바꾸지 않는다
- 워드마크 폭은 clamp로 120–168px 사이에서만 변한다. 더 키우지 않는다
- 메일 주소가 390px에서 넘치면 `overflow-wrap: anywhere`

**접근성**
- `<footer>`는 body 직계(또는 main 뒤)에 하나 — 스크린리더가 `contentinfo`로 인식
- 메일 링크 글자는 주소 자체(`ksthink@metaphr.dev`)로 — "연락하기"처럼 모호하게 쓰지 않는다
- fx-fill 칠 층은 `aria-hidden="true"`, 글자는 `.label` span에 남긴다
- 워드마크 `alt="metaphr"`. 라이트·다크 두 img 중 숨긴 쪽은 `display: none`이라 읽히지 않는다
- `©` 줄은 .35라 보조 정보 전용. 연락처를 여기에 두지 않는다
- 링크 포커스: fx-fill과 같은 반전 + `outline: 1px solid var(--mp-ink); outline-offset: 3px`
- Tab 순서: 본문 마지막 요소 → 메일 링크 → 나머지 링크. 워드마크·©는 포커스 대상이 아니다
- 외부 링크(`blog`)는 같은 탭에서 연다. 새 탭이 필요하면 링크 글자에 알린다

**움직임 줄이기**
- fx-fill 칸 트랜지션·`reveal` 없이 호버하면 즉시 반전, 푸터는 처음부터 보임

**조합 규칙**
- 페이지 마지막 요소는 항상 푸터. 뒤에 아무것도 두지 않는다(고정 바·쿠키 배너 포함)
- 푸터 윗선이 그 페이지의 유일한 가로 구분선이 되도록 본문 섹션 사이에는 선을 긋지 않는다
- fx-fill은 한 화면에서 히어로 `blog >`와 푸터 메일 링크, 이 두 곳까지
- 강조 orange를 푸터에 쓰지 않는다. 워드마크는 `--mp-bg` 위에 바로
- 테마 전환 버튼은 상단 바에 두고 푸터에 반복하지 않는다

## 상태
| 상태 | 표현 |
|---|---|
| 링크 기본 | .75, 1px 밑줄 |
| 링크 호버 | `opacity: 1` |
| 대표 링크 호버·포커스 | `fx-fill` 8칸이 차오르며 배경 `--mp-ink`, 글자 `--mp-bg` |
| 스크롤 진입 전 | `reveal` 대기 |
| 다크 테마 | 워드마크를 `metaphr-dark.svg`로 교체 |

## 동작
- 대표 링크 `fx-fill`: 칸마다 지연 `--d` 0–280ms, `--mp-duration-fill` `--mp-steps-fill`, 짝수 칸은 위에서, 홀수 칸은 아래에서.
- 푸터 전체 `reveal`(0.9s, 14px).
- `prefers-reduced-motion: reduce`: 채움·등장 트랜지션 없이 최종 상태만.

## 데모
```html demo
<footer class="mp-footer">
  <div class="mp-footer-links"><a class="mp-footer-fill" href="#">mail</a><a href="#">blog</a></div>
  <img class="mp-footer-logo mp-footer-logo--light" src="/v1/logos/metaphr.svg" alt="metaphr" width="350" height="200">
  <img class="mp-footer-logo mp-footer-logo--dark" src="/v1/logos/metaphr-dark.svg" alt="metaphr" width="350" height="200">
  <small>© metaphr</small>
</footer>
```

## 코드
```css
.mp-footer { border-top: var(--mp-border) solid var(--mp-line); padding: var(--mp-section-lg) 0 var(--mp-section); }
.mp-footer-links { display: flex; flex-wrap: wrap; gap: 1.6em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-footer-links a {
  color: inherit; text-decoration: none; opacity: var(--mp-opacity-link);
  border-bottom: var(--mp-border) solid var(--mp-line); padding-bottom: 0.15em;
  transition: background var(--mp-duration-fill) var(--mp-steps-fill), color var(--mp-duration-fill) step-end;
}
.mp-footer-links a:hover, .mp-footer-links a:focus-visible { opacity: 1; }
.mp-footer-links a.mp-footer-fill:hover, .mp-footer-links a.mp-footer-fill:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-footer-links a:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-footer-logo { display: block; width: clamp(120px, 20vw, 168px); height: auto; margin: clamp(2.5rem, 7vh, 4rem) auto 0; image-rendering: pixelated; user-select: none; }
.mp-footer-logo--dark { display: none; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .mp-footer-logo--light { display: none; }
  :root:not([data-theme="light"]) .mp-footer-logo--dark { display: block; }
}
:root[data-theme="dark"] .mp-footer-logo--light { display: none; }
:root[data-theme="dark"] .mp-footer-logo--dark { display: block; }
.mp-footer small {
  display: block; margin-top: 1.4rem; text-align: center;
  font-size: var(--mp-size-fine); letter-spacing: var(--mp-tracking-fine); opacity: var(--mp-opacity-fine);
}
@media (prefers-reduced-motion: reduce) { .mp-footer-links a { transition: none; } }
```
데모의 대표 링크는 단순 반전으로 줄였다. 실제 8칸 채움 마크업은 `fx-fill` 문서를 따른다.

```html
<a class="fx-fill" href="mailto:ksthink@metaphr.dev">
  <span class="label">ksthink@metaphr.dev</span>
  <span class="fill" aria-hidden="true"><span style="--d:0ms"></span><span style="--d:90ms"></span><span style="--d:30ms"></span><span style="--d:160ms"></span><span style="--d:60ms"></span><span style="--d:220ms"></span><span style="--d:120ms"></span><span style="--d:280ms"></span></span>
</a>
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 링크 1–3개, fx-fill은 대표 링크 하나에만.
- 해야 할 것: 로고는 등록 파일 그대로, 테마별 파일 전환(수동·자동 두 경로 모두).
- 해야 할 것: 윗선 1px 하나와 넓은 여백으로 본문과 나눈다.
- 해야 할 것: 모든 페이지에 같은 푸터.
- 하지 말 것: 어두운 배경 푸터 띠, 다른 배경색 면.
- 하지 말 것: 소셜 아이콘 줄, 다단 사이트맵, 뉴스레터 입력.
- 하지 말 것: 로고에 filter·mask·mix-blend-mode로 색 입히기, 로고를 판 위에 올리기.
- 하지 말 것: © 줄을 진하게, 연락처를 © 줄에 섞기.
- 하지 말 것: 링크 호버를 teal·orange로.
**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 다크 테마에서 `metaphr.svg`에 `filter: invert(1)` | `metaphr-dark.svg`로 교체(수동·자동 두 경로) |
| 워드마크 `width: 100%`나 240px로 확대 | `clamp(120px, 20vw, 168px)`, `height: auto` |
| 메일 링크 글자가 "Contact" | 주소 자체 `ksthink@metaphr.dev`, `href="mailto:…"` |
| `© 2026 metaphr. All rights reserved.`를 .7로 | `© metaphr`, `--mp-opacity-fine` |
| 푸터 배경 `--mp-ink` 반전 띠 | 배경 없음, 윗선 1px `--mp-line` |
