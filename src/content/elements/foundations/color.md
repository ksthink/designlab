---
id: color
name: 색
nameEn: Color
category: foundations
summary: 등록된 4색(paper·slate·teal·orange)과 테마별 시맨틱 변수만 쓴다. 강조 orange는 한 화면에 하나.
aliases: [색, 색상, 컬러, 팔레트, 강조색, 보조색, 배경색, 글자색, 상태색, color, palette, accent, secondary, 레트로 컬러, color scheme]
platforms: [web, ios, android]
status: extracted
source: design_lab 결정 로그 1 · src/data/tokens.json color.palette, theme.*
pillars: [retro-color, minimalism]
tokens: [--mp-palette-paper, --mp-palette-slate, --mp-palette-teal, --mp-palette-orange, --mp-bg, --mp-ink, --mp-secondary, --mp-accent, --mp-line, --mp-line-strong, --mp-line-button, --mp-grid-bg, --mp-grid-line, --mp-glyph, --mp-opacity-body, --mp-opacity-secondary, --mp-opacity-meta, --mp-size-title]
effects: []
related: [theme, typography, status-dot, badge, elevation, invert-hover]
---

## 용도
모든 화면의 색을 정한다. 색은 네 개뿐이고, 화면 코드는 원시 팔레트가 아니라 **역할 변수**(`--mp-bg`, `--mp-ink`, `--mp-secondary`, `--mp-accent`, `--mp-line*`)를 참조한다.
전체 값과 대비표의 원본은 `/v1/tokens.json`이다. 이 문서는 어떤 색을 어디에 쓰는지 판단하는 규칙을 정리한다.
새 색이 필요해 보이면 만들지 않고 사용자에게 묻는다. 팔레트 추가는 `tokens.json`의 `color.palette`에 `candidate`로 등록하는 방식뿐이다.

## 생김새
**원시 팔레트** (역할 변수를 통해서만 쓴다)
- `--mp-palette-paper` #F5F5F5 — 라이트 배경, 다크 글자
- `--mp-palette-slate` #303841 — 라이트 글자·선, 다크 배경, 강조·보조 면 위 글자
- `--mp-palette-teal` #76ABAE — 보조(secondary)
- `--mp-palette-orange` #FF5722 — 강조(accent)

**역할 변수** (테마마다 값이 바뀐다, `theme` 참고)
- `--mp-bg` 배경 · `--mp-ink` 글자·선 기본 · `--mp-secondary` teal · `--mp-accent` orange
- 파생: `--mp-line`(ink 알파 .16, 기본 헤어라인), `--mp-line-strong`(.45, 호버·떠 있는 층), `--mp-line-button`(.55, 버튼·입력 칸 테두리, 3:1), `--mp-grid-bg`(.035), `--mp-grid-line`(.07), `--mp-glyph`(.55)

**대비 실측**
| 조합 | 대비 | 판정 |
|---|---|---|
| slate / paper | 10.9:1 | 모든 글자 |
| teal / slate | 4.64:1 | 다크에서 teal 글자, teal 면 위 slate 글자 |
| orange / slate | 3.76:1 | 큰 글자(`--mp-size-title` 이상, 최소 24px)만 |
| orange / paper | 2.9:1 | 글자 금지 |
| teal / paper | 2.35:1 | 글자 금지 |
| teal / orange | 1.24:1 | 맞붙이지 않는다 |

**글자 위계는 색이 아니라 투명도**
- 글자색은 `--mp-ink` 하나. 옅게 할 때는 `--mp-opacity-*` 단계(본문 .85 · 보조·노트·메타·kicker·저작권 .7 · 비활성 .5).
- 글자는 모두 .7 이상(라이트 4.53:1, 다크 6.24:1). .5는 비활성 요소 전용.

**강조 orange 규칙**
- 한 화면에 한 곳. 지금 가장 중요한 상태 하나(기록 중, 곧 만료, 되돌릴 수 없음)에만.
- 형태: `■` 마크, 8px 점, 작은 면, 픽셀 포인트. 1px 선·글자·호버 색으로 쓰지 않는다.
- orange 면 위 글자는 `--mp-palette-slate`, `--mp-size-title` 이상.
- 조건이 참일 때만 나타나고, 옆에 뜻을 말하는 글자를 둔다(색만으로 뜻을 전하지 않는다).

**보조 teal 규칙**
- 선택된 항목, 현재 위치 같은 조용한 표시에 면·블록으로.
- 라이트에서 글자 금지. 다크에서는 글자 허용. teal 면 위 글자는 `--mp-palette-slate`.
- 넓은 배경을 teal로 칠하지 않는다. orange와 붙이지 않는다(사이에 `--mp-bg`를 둔다).

**접근성**
- 색만으로 상태를 구분하지 않는다. 선택은 teal 면 + `aria-selected`/`aria-current`, 강조는 ■ + 글자.
- `forced-colors: active`(Windows 고대비)에서는 면 표시가 사라지므로 선택 상태에 1px `outline`이나 `■` 글자를 함께 둔다.
- 두 테마 모두에서 대비표를 다시 확인한다.

## 상태
| 역할 | 쓰는 곳 | 금지 |
|---|---|---|
| ink / bg | 글자·선·배경, 호버 반전 | 회색 hex, `#FFFFFF`·`#000000`, `white`·`black` |
| line 계열 | 헤어라인, 테두리, 모눈 | 2px 이상, ink 100% 테두리를 기본으로 |
| secondary (teal) | 선택·현재 위치의 면, 다크 글자 | 라이트 글자, 넓은 배경, 호버 색 |
| accent (orange) | 화면당 한 곳 ■·점·작은 면 | 라이트 글자, 1px 선, 호버 색, 반투명 |
| 강조·보조 면 위 글자 | `--mp-palette-slate` | paper 글자, orange 면 위 작은 글자 |
| candidate 색 | 시안에서만 | 제품 UI |

## 데모
```html demo
<div class="mp-color">
  <span class="mp-color-chip mp-color-bg">bg</span>
  <span class="mp-color-chip mp-color-ink">ink</span>
  <span class="mp-color-chip mp-color-secondary">2</span>
  <span class="mp-color-chip mp-color-accent" aria-label="accent"></span>
</div>
```

## 코드
```css
.mp-color { display: grid; grid-template-columns: repeat(4, minmax(0, 5em)); gap: 0.8em; }
.mp-color-chip {
  aspect-ratio: 1; display: flex; align-items: flex-end; padding: 0.5em;
  border: var(--mp-border) solid var(--mp-line);
  font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta);
}
.mp-color-bg { background: var(--mp-bg); color: var(--mp-ink); }
.mp-color-ink { background: var(--mp-ink); color: var(--mp-bg); }
.mp-color-secondary { background: var(--mp-secondary); color: var(--mp-palette-slate); }
.mp-color-accent { background: var(--mp-accent); } /* orange 면 위 작은 글자는 두지 않는다 */

/* 제품 화면에서 쓰는 형태 */
.accent-mark::before { content: "■"; color: var(--mp-accent); margin-right: 0.4em; }
.is-selected { background: var(--mp-secondary); color: var(--mp-palette-slate); }
@media (forced-colors: active) { .is-selected { outline: 1px solid CanvasText; } }
```

## 앱
- iOS: Asset Catalog에 `bg`, `ink`, `secondary`, `accent`, `line`, `lineStrong`을 Any/Dark 두 값으로 등록하고 `Color("ink")`로만 참조한다. 파생 선은 `ink.opacity(0.16)`처럼 만든다.
- Android: `lightColorScheme`/`darkColorScheme`에서 `background`·`surface` = bg, `onBackground`·`onSurface` = ink, `primary` = ink, `secondary` = teal로 덮어쓰고 `surfaceTint`는 투명으로(tonal elevation 색 제거).
- Material·UIKit 기본 상태색(빨강 오류, 초록 성공, 파랑 링크)을 쓰지 않는다. 상태는 글자와 ■·점 하나로 말한다.
- OS 예외: 시스템 알림창·공유 시트·키보드의 색은 OS 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 역할 변수만 참조한다. 위계는 opacity 단계로 만든다. 강조는 가장 중요한 한 가지에만 쓴다. 라이트·다크 두 테마에서 대비를 확인한다. 색 옆에 뜻을 말하는 글자를 둔다.
- 하지 말 것: 등록되지 않은 색, `candidate` 색을 제품 UI에, raw hex 하드코딩, teal과 orange 맞붙이기, 반투명 강조색, 호버 시 teal·orange로 바뀌기, 여러 곳의 orange.
