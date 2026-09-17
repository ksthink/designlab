---
id: pagination
name: 페이지 번호
nameEn: Pagination
category: navigation
summary: 긴 목록을 페이지로 나눠 오가는 `< 이전` · 번호 칸 · `다음 >` 줄. 호버는 반전, 현재 번호는 teal 면.
aliases: [페이지네이션, 페이지 번호, 페이징, pagination, pager, 이전 다음, 쪽 번호, 목록 페이지, page numbers]
platforms: [web]
status: proposed
pillars: [minimalism, pixel-art, retro-color]
tokens: [--mp-line, --mp-size-small, --mp-tracking-small, --mp-opacity-nav, --mp-secondary, --mp-palette-slate, --mp-opacity-muted, --mp-section, --mp-ink, --mp-bg, --mp-duration-hover, --mp-font, --mp-border, --mp-opacity-meta]
effects: [invert-hover, reduced-motion]
related: [page-indicator, list, table, text-action, link]
---

## 용도
검색 결과·기록·표처럼 수십 개를 넘어 한 화면에 두면 느리거나 길어지는 목록에 쓴다.
한 화면에 다 보여도 되면 나누지 않는다(빼기 원칙). 카드 몇 장을 넘기는 가로 목록은 `page-indicator`.
끝없이 이어지는 피드는 무한 스크롤 대신 목록 끝의 `[ 더 보기 ]`(`text-action`)를 먼저 검토한다 — 끝이 보여야 한다.

**함께 쓰는 요소**
- `list`·`table`: 목록 바로 아래 가운데, 목록 끝 선과 `2em` 간격. 표 위에는 두지 않는다(위아래 둘 다 필요하면 위는 `3 / 20` 요약만)
- `empty-state`: 결과가 0개면 페이지 번호 줄을 통째로 빼고 `empty-state`만. 1쪽뿐이면 줄을 두지 않는다
- `search-field`·`chip`(필터): 검색어·필터가 바뀌면 1쪽으로 돌아가고 주소 `?page`를 지운다
- `text-action`: 피드형 목록은 번호 대신 `[ 더 보기 ]` 하나. 둘을 함께 두지 않는다
- `page-indicator`: 가로 카드 몇 장은 점, 세로 긴 목록은 번호 — 섞지 않는다

## 생김새
- 한 줄 가운데 정렬: `< 이전` · 번호 칸들 · `다음 >`
- 번호 칸: 최소 `2.4rem` 정사각, 1px `--mp-line`, radius 0, 배경 투명
- 글자 `--mp-size-small`, 자간 `--mp-tracking-small`, 기본 `--mp-opacity-nav`
- `이전`/`다음`: 테두리 없는 글자, `<` `>` 글자를 붙인다(화살표 아이콘 아님)
- **현재 번호**: 배경·테두리 `--mp-secondary`(teal 면), 글자 `--mp-palette-slate`, opacity 1 — 두 테마 모두 slate 글자
- 생략 `…`: 누를 수 없는 글자, `--mp-opacity-muted`, 테두리 없음

**번호 나열 규칙**
- 전체 7쪽 이하: 모두 보인다
- 8쪽 이상: 처음 · 현재 앞뒤 1개 · 끝 + `…` → `1 … 4 5 6 … 20`
- 처음·끝 근처: `1 2 3 4 5 … 20`, `1 … 16 17 18 19 20`
- 숫자는 아라비아 숫자, 앞에 0을 채우지 않는다

**크기·간격**
- 칸 `2.4rem`(약 38px) 정사각, 칸 사이 `0.5em`, 칸 안 좌우 `0.6em`(두 자리 이상 번호가 들어가면 폭이 늘어난다)
- `< 이전`·`다음 >`은 번호 칸과 같은 높이 `2.4rem`, 테두리 없음, `<`와 글자 사이 공백 한 칸
- 목록과 위 간격 `--mp-section`의 절반 정도 `2em`
- 터치 기기 최소 누를 곳 44px: 칸 `min-height: 2.75rem`

**반응형**
- 560px 미만: 번호 칸을 줄여 `< 이전` `3 / 20` `다음 >` 한 줄로. `3 / 20`은 글자(누를 수 없음)
- 줄바꿈으로 두 줄이 되지 않게 한다

**앱에서는**
- 번호 줄을 쓰지 않는다. `List`/`LazyColumn` 끝에 닿으면 다음 묶음을 불러오고, 끝이 있으면 목록 끝에 `[ 더 보기 ]` 또는 "끝" 한 줄(`--mp-opacity-meta`)
- 불러오는 동안은 목록 끝에 `loading`(터미널형 `...`) 한 줄

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | `--mp-opacity-nav`, 번호는 1px `--mp-line` 칸 |
| 호버·포커스 | 배경 `--mp-ink`, 글자 `--mp-bg`, opacity 1 |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 현재 `aria-current="page"` | teal 면 + slate 글자, 호버해도 반전하지 않는다 |
| 비활성(처음의 이전, 끝의 다음) | 숨기지 않고 `--mp-opacity-muted`, `aria-disabled="true"`, 링크 제거 |
| 생략 `…` | `--mp-opacity-muted`, 누를 수 없음 |

## 동작
- 반전은 `invert-hover`, `--mp-duration-hover` ease
- 페이지를 바꾸면 목록 머리로 스크롤하고 포커스를 목록 제목(`tabindex="-1"`)으로 옮긴다
- 주소에 쪽 번호를 남긴다(`?page=3`) — 뒤로가기·공유가 된다
- `reduced-motion`: transition 없음, 스크롤은 즉시

**접근성**
- `<nav aria-label="페이지">` 안 링크 목록(`<a href="?page=3">`). 버튼보다 링크를 쓴다
- 번호 링크 `aria-label="3페이지"`, 현재 `<a href="?page=2" aria-current="page" aria-label="2페이지, 현재">`(현재도 링크로 남겨 포커스 순서를 유지)
- 이전·다음 링크 `aria-label="이전 페이지"` / `"다음 페이지"`, 보이는 `<` `>`는 라벨이 대신한다
- 비활성 이전·다음은 `href`를 뺀 `<a role="link" aria-disabled="true">` — 포커스를 받지 않고 눌러도 아무 일이 없다. 자리는 그대로 남겨 줄이 흔들리지 않게
- `…`는 `aria-hidden="true"`
- 키보드: `Tab`으로 이전 → 번호 → 다음 순서, `Enter`로 이동. 화살표 키·단축키를 따로 두지 않는다
- 이동 후 포커스는 목록 제목(`<h2 tabindex="-1">`)으로 — 페이지 번호 줄에 남겨 두면 새 내용을 놓친다

## 데모
```html demo
<nav class="mp-pagination" aria-label="페이지">
  <a role="link" aria-disabled="true" aria-label="이전 페이지">&lt;</a>
  <a class="num" href="#" aria-current="page" aria-label="1페이지, 현재">1</a>
  <a class="num is-hover" href="#">2</a>
  <a class="num" href="#">3</a>
  <span class="gap" aria-hidden="true">…</span>
  <a class="num" href="#">9</a>
  <a href="#">&gt;</a>
</nav>
```

## 코드
```css
.mp-pagination {
  display: flex; flex-wrap: nowrap; align-items: center; justify-content: center; gap: 0.5em;
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
}
.mp-pagination a, .mp-pagination span {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 2.4rem; padding: 0 0.6em;
  color: var(--mp-ink); text-decoration: none; opacity: var(--mp-opacity-nav);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, opacity var(--mp-duration-hover) ease;
}
.mp-pagination .num { min-width: 2.4rem; border: var(--mp-border) solid var(--mp-line); border-radius: 0; }
.mp-pagination a[href]:hover, .mp-pagination a[href]:focus-visible, .mp-pagination a.is-hover { background: var(--mp-ink); color: var(--mp-bg); opacity: 1; }
.mp-pagination a:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-pagination a[aria-current="page"],
.mp-pagination a[aria-current="page"]:hover { background: var(--mp-secondary); border-color: var(--mp-secondary); color: var(--mp-palette-slate); opacity: 1; }
.mp-pagination [aria-disabled="true"], .mp-pagination .gap { opacity: var(--mp-opacity-muted); cursor: default; }
@media (pointer: coarse) { .mp-pagination a, .mp-pagination span { min-height: 2.75rem; } }
@media (prefers-reduced-motion: reduce) { .mp-pagination a { transition: none; } }
```

```js
// 표시할 번호 목록 — 7쪽 이하는 전부, 넘으면 처음·현재±1·끝 + …
function pages(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 4) return [1, 2, 3, 4, 5, '…', total];
  if (cur >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '…', cur - 1, cur, cur + 1, '…', total];
}
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: `<` `>` 글자, 정사각 1px 번호 칸, 현재는 teal 면 + slate 글자.
- 해야 할 것: 호버는 잉크/배경 반전, 현재 번호는 반전하지 않기.
- 해야 할 것: 쪽 번호를 주소에 남기고, 바꾼 뒤 포커스를 목록 머리로.
- 해야 할 것: 좁은 화면은 `3 / 20` 요약 한 줄.
- 하지 말 것: 원형 번호, 현재 번호 orange 면, teal 위 paper 글자.
- 하지 말 것: 모든 번호 나열, 번호 줄 두 줄 줄바꿈.
- 하지 말 것: 끝을 숨기는 무한 스크롤, 처음·끝에서 이전·다음 버튼을 없애 줄이 흔들리게 하기.
- 하지 말 것: `«` `»` 처음·끝 버튼 추가(1과 마지막 번호가 대신한다).

**자주 틀리는 것**
- `<button onclick="load(3)">` 번호 → 주소가 남지 않아 뒤로가기·공유가 깨진다 → `<a href="?page=3">`
- 처음 쪽에서 `< 이전`을 없앰 → 줄이 좌우로 흔들린다 → `href` 없는 `aria-disabled="true"` 링크로 자리 유지
- 현재 번호에 호버 반전까지 걸림 → 현재 칸은 teal 면 고정, `a[href]:not([aria-current])`만 반전
- teal 면 위 글자를 `--mp-bg`로 → 다크에서 paper 글자가 2.35:1 → 두 테마 모두 `--mp-palette-slate`
- `aria-label="3"` 숫자만 → "3페이지"
- 번호를 바꾼 뒤 스크롤 위치가 페이지 아래에 남음 → 목록 머리로 스크롤 + 제목에 포커스
