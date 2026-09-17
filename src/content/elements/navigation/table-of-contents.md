---
id: table-of-contents
name: 목차
nameEn: Table of Contents
category: navigation
summary: 긴 읽기 문서의 제목 목록. 좁은 화면은 본문 위 헤어라인 상자, 넓은 화면은 왼쪽에 붙어 따라온다.
aliases: [목차, TOC, table of contents, 문서 목차, 사이드 목차, 앵커 링크, on this page, 이 페이지]
platforms: [web]
status: extracted
source: design_lab philosophy.astro .toc
pillars: [minimalism]
tokens: [--mp-size-kicker, --mp-tracking-kicker, --mp-opacity-kicker, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-nav, --mp-line, --mp-section, --mp-width-read, --mp-duration-hover, --mp-ink, --mp-border, --mp-secondary, --mp-size-fine]
effects: []
related: [page-read, menu, link]
---

## 용도
`h2`가 두 개를 넘는 읽기형 문서(`page-read`)에 붙인다. 짧은 문서에는 붙이지 않는다.
페이지 사이 이동은 `menu`, 목차는 한 문서 안의 절 이동만 한다.

**함께 쓰는 요소**
- `page-read`: 760px 읽기 폭 문서에만. 넓은 화면에서 목차 칸 220px이 읽기 폭 왼쪽에 붙고 본문 폭은 그대로
- `header`: 머리의 `menu`는 페이지 사이, 목차는 문서 안 — 목차에 메뉴 항목을 섞지 않는다. 따라오는 목차 `top: 2rem`은 머리가 고정이 아닐 때 값이다(고정 머리면 머리 높이 + `2rem`)
- `section-head`·`typography`: 목차 글자는 본문 `h2`·`h3` 글자와 한 글자도 다르지 않게 제목에서 생성한다
- `back-link`·`breadcrumb`: 머리 쪽, 목차는 본문 격자 안 — 한 줄에 합치지 않는다

## 생김새
**구조**
- `<nav aria-label="목차">` + 머리 글자 "목차"(`--mp-size-kicker`, 자간 `--mp-tracking-kicker`, `--mp-opacity-kicker`)
- 목록 `<ol>`, 번호·점 없음(`list-style: none`). 제목 글자를 그대로 쓴다
- `h2` 항목: `--mp-size-small`, 자간 `--mp-tracking-small`
- `h3` 하위 항목: `--mp-size-meta`, 자간 `--mp-tracking-meta`, 행간 1.8
- 링크는 밑선 없이 `--mp-opacity-nav`

**크기·간격**
- 상자: `padding: 1.1em 0 0.4em`, 위아래 1px `--mp-line`
- 머리 글자 아래 `0.8em`, `h2` 항목 사이 `0.7em`
- 하위 목록 위 `0.35em`, 들여쓰기 `1em`, 하위 항목 사이 `0.25em`
- 좁은 화면 아래 여백 `--mp-section`
- 넓은 화면 격자 `minmax(0, 220px) minmax(0, var(--mp-width-read))`, 칸 사이 `clamp(2rem, 5vw, 4.5rem)`
- 본문 제목 `scroll-margin-top: 2rem`

**반응형**
- **좁은 화면(1100px 미만)**: 본문 위에 상자, 하위 항목 숨김(`display: none`)
- **넓은 화면(1100px 이상)**: 왼쪽 칸 `position: sticky; top: 2rem; align-self: start`, `max-height: calc(100vh - 4rem); overflow-y: auto`, 아래 선 없음, 하위 항목 보임
- 터치 기기(`pointer: coarse`): 항목 사이를 `0.9em`으로 늘려 누를 곳 확보, 링크 `display: inline-block; padding: 0.3em 0` — 줄 높이 포함 44px에 가깝게

**앱에서는**
- 쓰지 않는다. 긴 설명 화면은 절마다 화면을 나누거나 `List`의 섹션 머리로 대신한다
- 태블릿 읽기 화면에서 필요하면 `dropdown-menu` `[ 목차 ]` 하나로 절 이동

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | `--mp-opacity-nav`(0.7) |
| 호버·포커스 | opacity 1, `--mp-duration-hover` ease |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 현재 읽는 절(선택 기능) | `aria-current="true"` + `menu`와 같은 teal ■ 면 + opacity 1 |
| 하위 항목 숨김(좁은 화면) | `display: none` |

## 동작
- opacity만 `--mp-duration-hover`(0.25s) ease
- 누르면 해당 제목으로 이동, `html { scroll-behavior: smooth }`
- 현재 절 표시를 쓰면 `IntersectionObserver`로 화면 위쪽에 가장 가까운 제목을 고른다. ■는 새 항목에 바로 나타난다(미끄러지지 않는다)
- 진행 막대·퍼센트 표시 없음

**접근성**
- 요소는 `<nav aria-label="목차">`, 목록은 `<ol>`(순서가 의미 있음)
- 링크 `href="#제목-slug"`, 대상 제목에 같은 `id`
- 현재 절에 `aria-current="true"`(페이지가 아니라 절이므로 `"page"`가 아니다). 한 번에 한 항목만. ■는 `::before` 장식이라 읽히지 않는다
- 머리 글자 "목차"는 `<p>`. `nav aria-label="목차"`가 이미 이름을 주므로 `h2`로 올리지 않는다(문서 제목 구조에 끼지 않게)
- 키보드: `Tab`으로 항목 순서대로, `Enter`로 이동하면 포커스도 해당 제목으로 옮겨진다(제목에 `tabindex="-1"`)
- 넓은 화면의 따라오는 목차가 스크롤 상자일 때도 `Tab` 순서는 본문보다 앞

**reduced-motion**
- `scroll-behavior: auto`, transition 없음

## 데모
```html demo
<nav class="mp-table-of-contents" aria-label="목차">
  <p class="mp-table-of-contents-title">목차</p>
  <ol>
    <li><a href="#">기본</a>
      <ol><li><a href="#" class="is-hover">호버</a></li><li><a href="#" aria-current="true">현재</a></li></ol>
    </li>
    <li><a href="#">기본</a></li>
  </ol>
</nav>
```

## 코드
```css
.mp-table-of-contents { padding: 1.1em 0 0.4em; border-top: var(--mp-border) solid var(--mp-line); border-bottom: var(--mp-border) solid var(--mp-line); font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-table-of-contents-title { margin: 0 0 0.8em; font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-kicker); opacity: var(--mp-opacity-kicker); }
.mp-table-of-contents ol { list-style: none; margin: 0; padding: 0; }
.mp-table-of-contents > ol > li { margin-bottom: 0.7em; }
.mp-table-of-contents ol ol { margin-top: 0.35em; padding-left: 1em; }
.mp-table-of-contents ol ol li { margin-bottom: 0.25em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); line-height: 1.8; }
.mp-table-of-contents a { color: var(--mp-ink); text-decoration: none; opacity: var(--mp-opacity-nav); transition: opacity var(--mp-duration-hover) ease; }
.mp-table-of-contents a:hover, .mp-table-of-contents a:focus-visible, .mp-table-of-contents a.is-hover, .mp-table-of-contents a[aria-current="true"] { opacity: 1; }
.mp-table-of-contents a:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-table-of-contents a[aria-current="true"]::before { content: ""; display: inline-block; width: 0.5em; height: 0.5em; margin-right: 0.45em; vertical-align: 0.12em; background: var(--mp-secondary); }
@media (prefers-reduced-motion: reduce) { .mp-table-of-contents a { transition: none; } }
/* 문서 격자(실제 페이지):
   .doc { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0 clamp(2rem, 5vw, 4.5rem); }
   .toc { margin-bottom: var(--mp-section); } .toc ol ol { display: none; }
   @media (min-width: 1100px) {
     .doc { grid-template-columns: minmax(0, 220px) minmax(0, var(--mp-width-read)); justify-content: center; }
     .toc { position: sticky; top: 2rem; align-self: start; max-height: calc(100vh - 4rem); overflow-y: auto; margin-bottom: 0; border-bottom: 0; }
     .toc ol ol { display: block; }
   } */
```

```js
// 선택 기능: 현재 읽는 절 표시
(() => {
  const toc = document.querySelector('.mp-table-of-contents');
  if (!toc || !('IntersectionObserver' in window)) return;
  const links = new Map([...toc.querySelectorAll('a[href^="#"]')].map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  if (!links.size) return;
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e) => {
      const a = links.get(e.target.id);
      if (!a) return;
      links.forEach((x) => x.removeAttribute('aria-current'));
      a.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '0px 0px -70% 0px' });
  links.forEach((_, id) => { const h = document.getElementById(id); if (h) io.observe(h); }); // observe는 요소 하나씩
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 제목 글자 그대로, 헤어라인 상자, 좁은 화면은 `h2`만.
- 해야 할 것: 넓은 화면에서만 왼쪽에 따라오기, 본문 폭은 `--mp-width-read` 그대로.
- 해야 할 것: `nav aria-label="목차"`, 제목에 `scroll-margin-top`.
- 하지 말 것: 번호·점 장식, 배경 카드, 진행 막대.
- 하지 말 것: 현재 절을 색 글자로 표시, 목차 항목 굵게.
- 하지 말 것: `h2` 두 개 이하 짧은 문서에 목차, 오른쪽 좁은 띠에 작은 글자로 욱여넣기.

**자주 틀리는 것**
- 목차를 오른쪽 좁은 띠에 `--mp-size-fine`으로 → 왼쪽 220px, 글자 `--mp-size-small`/`--mp-size-meta`
- 좁은 화면에서도 `position: sticky` → 본문을 가린다. 1100px 이상에서만
- `aria-current="page"` → 절 표시는 `"true"`
- `observe(...nodeList)`로 첫 제목만 관찰 → `forEach`로 제목마다 `observe`
- 현재 절을 굵게·teal 글자로 → teal ■ 면 + opacity 1
- 제목 글자를 줄여 쓴 별도 목록을 손으로 관리 → 문서 제목에서 자동 생성
