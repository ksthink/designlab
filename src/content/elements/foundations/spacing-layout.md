---
id: spacing-layout
name: 여백과 배치
nameEn: Spacing & Layout
category: foundations
summary: 목록 1180px·읽기 760px 두 폭, 넓은 섹션 여백, 좌우 gutter. 화면을 채우지 않고 비워 둔다.
aliases: [여백, 간격, 레이아웃, 배치, 폭, 컨테이너, 그리드, 섹션 간격, 반응형, spacing, layout, container, gutter, max-width, responsive, padding, margin]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .wrap .lead .cat · app.html .wrap
pillars: [minimalism]
tokens: [--mp-width-list, --mp-width-read, --mp-width-para, --mp-gutter, --mp-section, --mp-section-lg, --mp-line, --mp-border]
effects: []
related: [page-list, page-read, section-head, card, divider, rail]
---

## 용도
페이지 폭, 좌우 여백, 섹션 간격, 문단 폭, 요소 사이 간격을 정한다. 여백은 남는 공간이 아니라 쉬는 자리다.
화면마다 폭 두 가지 중 하나를 고른다: 여러 항목을 훑는 화면은 목록 폭(`page-list`), 한 가지를 읽는 화면은 읽기 폭(`page-read`).
빈 곳이 보이면 채우지 말고 그대로 둔다. 내용이 적으면 화면도 짧다.

## 생김새
**폭**
- 목록 폭 `--mp-width-list` 1180px, 읽기 폭 `--mp-width-read` 760px. `margin-inline: auto`로 가운데.
- 좌우 여백 `--mp-gutter` `clamp(1.25rem, 5vw, 4rem)` — 컨테이너 padding으로 준다.
- 문단 최대 폭 `--mp-width-para` 30em. 목록 폭 화면에서도 문단은 30em을 넘기지 않는다.

**세로 리듬**
- 섹션 세로 여백 `--mp-section` `clamp(2.5rem, 8vh, 5rem)` (위·아래 각각).
- 큰 전환(히어로 뒤 첫 섹션 위, 푸터 위) `--mp-section-lg` `clamp(4rem, 12vh, 9rem)`.
- 분류 제목과 내용 사이 `clamp(1.5rem, 4vh, 2.5rem)`(metaphr.dev 원값).
- 문단 사이 `1.1em`, 상세 본문 문단 사이 `1.6em`.

**요소 사이 간격** (토큰에 없는 값은 em의 절제된 단계만)
| 간격 | 값 | 예 |
|---|---|---|
| 아주 가까움 | 0.25em–0.5em | 아이콘과 글자, 배지 사이 |
| 가까움 | 0.8em | 버튼 사이, 칩 사이 |
| 묶음 | 1.2em | 제목과 옆 설명, 카드 안 제목과 설명 |
| 카드 사이 | `clamp(1rem, 2.5vw, 1.6rem)` | 레일·격자 카드 |
| 섹션 | `--mp-section` | 분류 사이 |

**구분**
- 간격만으로 부족하면 1px `--mp-line` 한 줄(`divider`). 박스를 겹겹이 두르지 않는다.
- 카드 격자는 열 2–3개 이하, 넓은 화면이면 가로 레일(`rail`)을 검토한다.

**반응형**
- 브레이크포인트를 늘리지 않는다. clamp 토큰이 여백을 줄인다.
- 카드 격자: `grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr))`.
- 480px 이하: 섹션 여백은 토큰 하한값(2.5rem), gutter 1.25rem. 가로 스크롤이 생기지 않게 `min-width: 0`을 flex·grid 자식에 준다.
- 가로 모드 폰·태블릿도 폭 토큰으로 가운데 정렬한다.

**접근성**
- 확대 200%에서 가로 스크롤 없이 한 열로 흐른다(WCAG 1.4.10 리플로).
- 시각 순서와 DOM 순서를 같게 둔다. `order`·`flex-direction: row-reverse`로 읽는 순서를 바꾸지 않는다.
- 터치 대상 사이 최소 8px 간격, 대상 크기 44×44px 이상은 padding으로 확보한다.

## 상태
| 화면 | 폭 | 세로 여백 |
|---|---|---|
| 홈·목록 | `--mp-width-list` | 섹션마다 `--mp-section` |
| 상세·문서 | `--mp-width-read` | 위 `--mp-section`, 푸터 전 `--mp-section-lg` |
| 히어로 | 전체 폭(100svh) | 다음 섹션 위 `--mp-section-lg` |
| 좁은 화면 | 100% - gutter 양쪽 | 토큰 하한값 |

## 데모
```html demo
<div class="mp-spacing-layout">
  <div class="mp-spacing-layout-list"><span></span><span></span><span></span></div>
  <div class="mp-spacing-layout-read"><span></span><span></span></div>
</div>
```

## 코드
```css
.mp-spacing-layout { display: grid; gap: 1.5em; }
.mp-spacing-layout-list, .mp-spacing-layout-read {
  display: grid; gap: 0.8em; padding: 1em var(--mp-gutter);
  border: var(--mp-border) dashed var(--mp-line);
}
.mp-spacing-layout-list { grid-template-columns: repeat(3, 1fr); }
.mp-spacing-layout-read { width: 64%; margin-inline: auto; } /* 760 / 1180 */
.mp-spacing-layout span { height: 2.5em; border: var(--mp-border) solid var(--mp-line); }
.mp-spacing-layout-read span { height: 0.8em; }

/* 페이지에서 */
.wrap { max-width: var(--mp-width-list); margin-inline: auto; padding-inline: var(--mp-gutter); }
.wrap.read { max-width: var(--mp-width-read); }
section { padding-block: var(--mp-section); }
.grid-cards { display: grid; gap: clamp(1rem, 2.5vw, 1.6rem); grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr)); }
.grid-cards > * { min-width: 0; }
```

## 앱
- 화면 좌우 여백 20pt/dp(폰), 32pt/dp(태블릿) 한 값씩. 섹션 사이 40–56pt/dp, 요소 사이 8·12·16 세 단계만.
- 태블릿·가로 모드: 본문은 최대 폭 760pt/dp로 묶어 가운데 둔다(`.frame(maxWidth: 760)`, `Modifier.widthIn(max = 760.dp)`).
- 목록·시트는 내용만큼만 높이를 갖는다. 빈 공간을 채우려고 늘리지 않는다.
- Safe Area·제스처 영역·상태 바 여백은 OS 규칙을 따른다(예외).

## 해야 할 것 / 하지 말 것
- 해야 할 것: 두 폭 중 하나를 고른다. 섹션 사이를 넓게, 문단은 30em 안에. 간격은 정해진 단계만. 좁은 화면에서 한 열로 흐르게.
- 하지 말 것: 16px 섹션 패딩, 전체 폭 문단, 빈 곳을 채우려고 요소 추가, 박스를 겹겹이 두르기, 카드 4열 이상 빽빽한 격자, 브레이크포인트마다 다른 여백 값.
