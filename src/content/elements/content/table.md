---
id: table
name: 표
nameEn: Table
category: content
summary: 1px 선으로 행을 나누고 머리 행만 모눈 틴트를 깐 표. 서체·굵기는 본문과 같다.
aliases: [표, table, 데이터 표, 목록 표, 그리드, data grid, 스펙 표, 비교표, 테이블, 표 목록, data table]
platforms: [web]
status: extracted
source: design_lab src/layouts/Base.astro table, .table-wrap
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-line, --mp-grid-bg, --mp-glyph, --mp-size-kicker, --mp-size-meta, --mp-tracking-body, --mp-tracking-meta, --mp-secondary, --mp-palette-slate, --mp-ink, --mp-duration-hover]
effects: []
related: [key-value, list, code-block, divider, labels-numbers]
---

## 용도
여러 항목을 같은 열(속성)로 비교할 때 쓴다: 토큰 값, 대비 표, 스펙, 가격, 기록.
열이 두 개뿐인 이름–값이면 `key-value`, 열이 없으면 `list`, 한 항목의 긴 설명이면 본문 문단을 쓴다.
레이아웃(좌우 배치)을 만들려고 표를 쓰지 않는다.

## 생김새
**구조**
- `div.table-wrap > table > thead + tbody`. 머리 칸은 `<th scope="col">`, 행 이름 칸이 있으면 `<th scope="row">`.
- 설명이 필요하면 `<caption>`(시각적으로 숨기지 않고 표 위 kicker 크기로 둔다).

**수치** (design_lab 원값)
- `table-wrap`: `border: var(--mp-border) solid var(--mp-line)`, `overflow-x: auto`, 아래 `1.8em`
- `table`: `width: 100%`, `border-collapse: collapse`, 글자 `--mp-size-kicker`, 자간 `--mp-tracking-body`, 행간 1.8
- 칸 `th, td`: 여백 `0.7em 0.9em`, `text-align: left`, `vertical-align: top`, 아래 선 1px `--mp-line`, 마지막 행 선 없음
- 세로 칸막이 선 없음(바깥 틀만)
- 머리 `th`: 배경 `--mp-grid-bg`, 글자 `--mp-size-meta`·`--mp-tracking-meta`, 색 `--mp-glyph`, **굵기 400**, `opacity: 1`
- 숫자 열: `text-align: right; font-variant-numeric: tabular-nums`, 단위는 머리 칸에 한 번(`용량 (MB)`)
- 칸 안 `code`: `white-space: nowrap`
- 빈 값: `-` 한 글자(비워 두지 않는다)

**반응형**
- 좁은 화면에서는 `table-wrap`이 가로 스크롤한다. 표를 카드로 쪼개지 않는다.
- 스크롤 영역이 키보드로 닿게 `tabindex="0"`과 `role="region"`, `aria-label`을 `table-wrap`에 준다.
- 열이 5개를 넘으면 덜 중요한 열을 빼거나 `key-value` 여러 개로 바꾼다.
- 긴 글 칸은 `min-width: 12em`으로 너무 좁아지지 않게 한다.
- 390px: `table-wrap` 가로 스크롤. 첫 열이 이름이면 `position: sticky; left: 0; background: var(--mp-bg)`로 고정해도 된다(세로 칸막이는 여전히 없음).
- 700px: 열 4개까지 스크롤 없이 들어가는 폭. 긴 글 칸 `min-width: 12em` 유지.
- 860px: 변화 없음 — 표 자체는 중단점을 두지 않고 틀이 넓어질 뿐이다.
- 1180px: 목록형 틀 안에서도 표 폭은 부모 100%. 읽기형(760px) 안이면 그 폭.

**접근성**
- `<th scope>`로 머리와 칸을 연결한다. `<div>` 격자로 표를 흉내 내지 않는다.
- 머리 색 `--mp-glyph`(ink .55)는 대비가 낮으므로 머리 글자는 짧은 명사, 뜻은 칸 값으로도 알 수 있게.
- 정렬 가능한 표: 머리 칸 안에 `<button>`을 두고 `aria-sort="ascending|descending|none"`을 `th`에. 방향 표시는 글자 `↑`/`↓`.
- 행 전체가 링크면 첫 칸에 실제 `<a>`를 두고 행 클릭은 보조로만.
- 마크업 예: `<div class="mp-table-wrap" role="region" aria-labelledby="t1-cap" tabindex="0"><table><caption id="t1-cap">팔레트 대비</caption>…`
- `caption`이 없을 때만 `aria-label`을 wrap에 준다. 두 곳에 같은 이름을 중복하지 않는다.
- 행 머리 `<th scope="row">`에도 머리 스타일(`--mp-glyph`, meta 크기)을 주지 않는다 — 행 이름은 본문 크기·잉크 그대로, 굵기 400.
- 선택 가능한 행: 행 첫 칸에 `checkbox`(`inputs/checkbox`)를 두고 `aria-selected`는 `role="grid"`일 때만. 일반 표에 grid 역할을 붙이지 않는다.

**조합 규칙**
- 표 위 제목은 `section-head`나 h2/h3, 바로 아래 `caption`은 kicker 크기(`--mp-size-kicker`, `--mp-opacity-kicker`)로 한 줄.
- 표 안에 표·카드·아코디언을 넣지 않는다. 칸 안에는 글자·`code`·`badge` 하나까지.
- 선택 행 teal과 orange `■`를 같은 행에 붙이지 않는다(1.24:1).
- 표 앞뒤 간격: 위 문단과 `1.6em`, 아래 `1.8em`(wrap margin).

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 행 구분 1px `--mp-line`, 마지막 행 선 없음 |
| 행 호버(누를 수 있는 행만) | 배경 `--mp-grid-bg` |
| 행 포커스(안의 링크) | 링크에 1px 잉크 포커스 링 |
| 선택 행 | 배경 `--mp-secondary` + 글자 `--mp-palette-slate`(두 테마 공통) 또는 첫 칸 앞 `■` |
| 정렬 중인 열 | 머리 글자 뒤 `↑`/`↓`, 색 변화 없음 |
| 빈 표 | 표 대신 `empty-state` 한 줄 |

## 데모
```html demo
<div class="mp-table-wrap" role="region" aria-label="표" tabindex="0">
  <table class="mp-table">
    <thead><tr><th scope="col">이름</th><th scope="col" class="num">대비</th></tr></thead>
    <tbody>
      <tr><td>slate</td><td class="num">10.9</td></tr>
      <tr class="is-hover"><td>teal</td><td class="num">4.64</td></tr>
      <tr class="is-selected"><td>orange</td><td class="num">3.76</td></tr>
    </tbody>
  </table>
</div>
```

## 코드
```css
.mp-table-wrap { overflow-x: auto; margin: 0 0 1.8em; border: var(--mp-border) solid var(--mp-line); }
.mp-table-wrap:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-table {
  width: 100%; border-collapse: collapse;
  font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-body); line-height: 1.8;
}
.mp-table th, .mp-table td {
  padding: 0.7em 0.9em; text-align: left; vertical-align: top;
  border-bottom: var(--mp-border) solid var(--mp-line);
}
.mp-table tbody tr:last-child td { border-bottom: 0; }
.mp-table th {
  background: var(--mp-grid-bg); color: var(--mp-glyph); font-weight: 400;
  font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta);
}
.mp-table .num { text-align: right; font-variant-numeric: tabular-nums; }
.mp-table td code { white-space: nowrap; }
.mp-table tbody tr { transition: background var(--mp-duration-hover) ease; }
.mp-table tbody tr[data-href]:hover, .mp-table tbody tr.is-hover { background: var(--mp-grid-bg); }
.mp-table tbody tr.is-selected { background: var(--mp-secondary); color: var(--mp-palette-slate); }
.mp-table th button { all: unset; cursor: pointer; }
.mp-table th button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .mp-table tbody tr { transition: none; } }
```
선택 행 글자는 테마와 무관하게 `--mp-palette-slate`로 고정한다(teal 위 4.64:1). `--mp-bg`는 쓰지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 머리 행 글자를 짧은 명사로, `<th>` 굵기를 400으로 되돌린다.
- 해야 할 것: 숫자는 오른쪽 정렬 + `tabular-nums`, 단위는 머리에 한 번.
- 해야 할 것: 좁은 화면은 가로 스크롤, 스크롤 영역에 키보드 포커스.
- 해야 할 것: 빈 값은 `-`.
- 하지 말 것: 줄무늬(zebra) 배경, 세로 칸막이 선, 두꺼운 머리 아래선.
- 하지 말 것: 굵은 머리 행, 값이 크다고 진하게·색칠하기(히트맵).
- 하지 말 것: 코드 칸에 monospace 두 번째 서체.
- 하지 말 것: 증감을 초록/빨강으로, 정렬 아이콘을 SVG 화살표 장식으로.
- 하지 말 것: 모바일에서 표를 카드로 변환해 열 머리를 반복하기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `<th>` 기본 굵게 그대로 | `font-weight: 400` |
| `tr:nth-child(even)` 줄무늬 | 행 구분은 1px 선만 |
| `font-family: monospace` 숫자 열 | `--mp-font` + `tabular-nums` |
| `div` 격자로 표 흉내 | `<table>` + `<th scope>` |
| 스크롤 wrap에 포커스 불가 | `tabindex="0"` + `role="region"` + 이름 |
| 모바일에서 표를 카드로 변환 | 가로 스크롤 유지 |
