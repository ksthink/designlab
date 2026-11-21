---
id: breadcrumb
name: 경로 표시
nameEn: Breadcrumb
category: navigation
summary: 현재 위치까지의 경로를 `요소 / 이동 / 메뉴`처럼 슬래시로 잇는 옅은 글자 줄.
aliases: [브레드크럼, 빵부스러기, 경로, 경로 표시, breadcrumb, breadcrumbs, 위치 표시, 상위 경로, 현재 위치 경로]
platforms: [web]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-size-kicker, --mp-tracking-meta, --mp-opacity-kicker, --mp-opacity-meta, --mp-duration-hover, --mp-ink]
effects: [reduced-motion]
related: [back-link, header, menu, link]
---

## 용도
세 단계 이상 깊은 페이지(요소 → 분류 → 요소 상세)에서 현재 위치와 상위 경로를 함께 보여 주고 한 번에 올라가게 한다.
두 단계면 `back-link` 하나로 충분하다 — 둘을 함께 두지 않는다.
검색 결과처럼 경로가 사용자 행동 기록(방문 순서)이면 쓰지 않는다. 경로는 사이트 구조를 보여 준다.

**함께 쓰는 요소**
- `back-link`: 두 단계까지는 `back-link`만. 세 단계 이상에서 `breadcrumb`가 그 자리를 대신한다 — 둘을 함께 두지 않는다
- `header`: 머리 1줄 왼쪽(뒤로가기 자리)이나 제목 바로 위 한 줄
- `menu`: 메뉴의 현재 위치(teal ■)는 1단계, 경로는 그 아래 단계를 보여 준다. 경로 첫 항목 이름은 메뉴 항목 이름과 같게 쓴다
- `page-read`·`page-list`: 제목(`h1`) 위 `1.2em`에 둔다. 제목과 현재 항목 글자가 같으면 현재 항목을 생략해도 된다(`aria-current`는 마지막 링크 없는 항목에만)

## 생김새
- `header` 첫 줄(`back-link` 자리) 또는 제목 바로 위, 한 줄
- 글자 `--mp-size-kicker`, 자간 `--mp-tracking-meta`
- 구분자 `/` (design_lab 이름의 `/`와 같은 어휘), `--mp-opacity-kicker`, 양옆 `0.6em`
- 상위 링크 `--mp-opacity-meta`, 밑선 없음
- 현재 페이지: 링크가 아닌 글자, opacity 1, `aria-current="page"`
- 아이콘(집 모양)·`›`·`>` 화살표를 쓰지 않는다. `>`는 터미널 프롬프트 어휘라 경로 구분자로 쓰지 않는다

**크기·간격**
- 항목 사이 구분자 여백 `0 0.6em`
- 제목과 아래 간격 `1.2em`
- 터치 기기에서 링크 세로 여백 `0.4em`으로 누를 곳 확보(글자 크기는 그대로)

**반응형**
- 좁은 화면에서 넘치면 가운데 단계를 `…`로 줄인다: `요소 / … / 메뉴`. `…`는 누르면 전체를 펼치는 `button`
- 첫 항목과 현재 항목은 항상 남긴다
- 한 항목 이름이 길면 `max-width: 12em; overflow: hidden; text-overflow: ellipsis`, 현재 항목은 자르지 않는다

**앱에서는**
- 쓰지 않는다. iOS·Android는 내비게이션 스택의 뒤로(`back-link`)와 머리 제목으로 위치를 알린다
- 태블릿 3단 구조는 `NavigationSplitView`/리스트-상세 사이드바가 경로 역할을 한다

## 상태
| 상태 | 표현 |
|---|---|
| 상위 링크 기본 | `--mp-opacity-meta`(0.7) |
| 상위 링크 호버·포커스 | opacity 1, `--mp-duration-hover` ease |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 현재 | opacity 1, 누를 수 없음 |
| 줄임 `…` | 상위 링크와 같음, 누르면 펼침 |

## 동작
- 투명도만 `--mp-duration-hover` ease. 밑줄·색·크기 변화 없음
- `…` 펼침은 즉시
- `reduced-motion`: transition 없음

**접근성**
- `<nav aria-label="경로">` 안 `<ol>` — 순서가 의미를 가진다. 한 페이지에 `aria-label="경로"` nav는 하나
- 현재 항목 `<li aria-current="page">`(링크 없음, 포커스 받지 않음). 링크로 둬야 하면 `<a href="현재 주소" aria-current="page">` — 둘 중 하나만
- 구분자는 CSS `::before`로 넣어 읽히지 않게 한다(HTML 글자로 넣으면 `aria-hidden="true"`)
- `…` 버튼: `aria-label="경로 전체 보기"`, `aria-expanded`
- 키보드: `Tab`으로 링크 이동만. 추가 키 없음
- 구조화 데이터가 필요하면 `BreadcrumbList` JSON-LD를 따로 둔다(화면과 같은 경로)

## 데모
```html demo
<nav class="mp-breadcrumb" aria-label="경로">
  <ol>
    <li><a href="#">요소</a></li>
    <li><a href="#" class="is-hover">이동</a></li>
    <li aria-current="page">메뉴</li>
  </ol>
</nav>
```

## 코드
```css
.mp-breadcrumb ol {
  display: flex; flex-wrap: wrap; align-items: baseline;
  list-style: none; margin: 0; padding: 0;
  font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-meta);
}
.mp-breadcrumb li { min-width: 0; }
.mp-breadcrumb li + li::before { content: "/"; margin: 0 0.6em; opacity: var(--mp-opacity-kicker); }
.mp-breadcrumb a, .mp-breadcrumb button {
  display: inline-block; max-width: 12em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; vertical-align: bottom;
  padding: 0; border: 0; background: transparent; font: inherit; letter-spacing: inherit; cursor: pointer;
  color: var(--mp-ink); text-decoration: none; opacity: var(--mp-opacity-meta);
  transition: opacity var(--mp-duration-hover) ease;
}
.mp-breadcrumb a:hover, .mp-breadcrumb a:focus-visible, .mp-breadcrumb a.is-hover,
.mp-breadcrumb button:hover, .mp-breadcrumb button:focus-visible { opacity: 1; }
.mp-breadcrumb a:focus-visible, .mp-breadcrumb button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-breadcrumb [aria-current="page"] { opacity: 1; }
@media (pointer: coarse) { .mp-breadcrumb a, .mp-breadcrumb button { padding: 0.4em 0; } }
@media (prefers-reduced-motion: reduce) { .mp-breadcrumb a, .mp-breadcrumb button { transition: none; } }
```

```js
// 좁은 화면: 가운데 단계를 … 하나로 줄이고, 누르면 펼친다
(() => {
  const ol = document.querySelector('.mp-breadcrumb ol');
  if (!ol) return;
  const items = [...ol.children];
  if (ol.scrollWidth <= ol.clientWidth || items.length <= 3) return;
  const middle = items.slice(1, -1);
  middle.forEach((li) => (li.hidden = true));
  const li = document.createElement('li');
  const more = document.createElement('button');
  more.type = 'button';
  more.textContent = '…';
  more.setAttribute('aria-label', '경로 전체 보기');
  li.append(more);
  ol.insertBefore(li, items[items.length - 1]);
  more.addEventListener('click', () => { middle.forEach((m) => (m.hidden = false)); li.remove(); ol.querySelector('a')?.focus(); });
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 사이트 구조 순서, 짧은 이름, `/` 구분.
- 해야 할 것: 현재 항목은 링크 아님 + `aria-current="page"` + opacity 1.
- 해야 할 것: 구분자는 CSS로 넣어 스크린리더가 읽지 않게.
- 해야 할 것: 좁으면 가운데를 `…`로 줄이기, 첫·현재 항목은 유지.
- 하지 말 것: `›`·`>`·화살표·집 아이콘.
- 하지 말 것: 경로마다 상자·배경, 현재 항목 색 글자·굵게.
- 하지 말 것: 두 단계짜리 경로(→ `back-link`), `back-link`와 함께 두기.
- 하지 말 것: 방문 기록을 경로처럼 보여 주기, 투명도 `--mp-opacity-kicker` 이하 링크.

**자주 틀리는 것**
- `<div>`에 `<a>`와 `/` 글자를 늘어놓음 → `<nav aria-label="경로"><ol><li>`, 구분자는 `li + li::before`
- 현재 항목까지 링크로 두고 `aria-current` 없음 → 링크 없는 `<li aria-current="page">`
- `홈 > 요소 > 메뉴` → `>`는 터미널 프롬프트 어휘. `요소 / 이동 / 메뉴`
- 좁은 화면에서 두세 줄로 줄바꿈 → 가운데 단계를 `…` 버튼 하나로 줄인다(첫·현재 유지)
- 링크를 비활성 단계(0.5)로 흐리게 → 상위 링크는 `--mp-opacity-meta`(0.7)
