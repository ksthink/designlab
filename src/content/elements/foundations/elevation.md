---
id: elevation
name: 높이(그림자 없음)
nameEn: Elevation
category: foundations
summary: 그림자로 층을 만들지 않는다. 겹친 면은 --mp-bg로 가리고 1px 선으로 경계를 긋는다.
aliases: [그림자, 높이, 깊이, 층, 떠 있는 카드, 레이어, 겹침, 딤, 오버레이 배경, elevation, shadow, drop shadow, z-index, depth, layer, scrim]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev 전체(box-shadow 0건) · philosophy.md 1px 선, 직각, 장식 없음
pillars: [minimalism]
tokens: [--mp-bg, --mp-ink, --mp-line, --mp-line-strong, --mp-border]
effects: [float]
related: [card, modal, popover, bottom-sheet, fab, toast, dropdown-menu, color]
---

## 용도
카드·메뉴·팝오버·토스트·모달·시트처럼 다른 층에 놓인 요소를 구분할 때 쓴다.
층은 그림자가 아니라 **불투명한 면으로 아래를 가리는 것**과 **1px 선**으로 표시한다. 겹침 자체를 줄이는 것이 먼저다.

## 생김새
**층 단계**
| 단계 | 요소 | 면 | 경계 | z-index |
|---|---|---|---|---|
| 0 바닥 | 페이지, 섹션 | `--mp-bg` | 없음 | auto |
| 1 카드 | 카드, 표, 입력 칸 | 투명 또는 `--mp-bg` | `--mp-line` | auto |
| 2 붙은 층 | 고정 헤더, 탭 바 | `--mp-bg` | 한쪽 `--mp-line` | 10 |
| 3 떠 있는 층 | 드롭다운, 팝오버, 툴팁, 토스트 | `--mp-bg` | 네 면 `--mp-line-strong` | 20 |
| 4 모달 | 모달, 시트, 드로어 | `--mp-bg` | `--mp-line-strong` | 30 |

**규칙**
- 떠 있는 모든 층의 면은 불투명 `--mp-bg`. 반투명 면·흐림(`backdrop-filter`)으로 층을 표시하지 않는다.
- `border-radius: 0`, `box-shadow: none`, `filter: drop-shadow()` 없음, 오프셋 테두리로 만든 "하드 그림자" 없음.
- 모달 뒤: 기본은 딤 없이 모달 테두리만. 뒤 화면을 가려야 하면 `--mp-bg`를 불투명하게 덮는다(전체 화면 모달). 반투명 검정 딤을 쓰지 않는다.
- 떠 있다는 느낌이 필요하면 `float`(숨쉬기) 또는 카드 호버의 `translateY(-3px)` + `--mp-line-strong`.
- z-index는 위 표의 네 단계만. 999·9999 같은 값을 쓰지 않는다.
- 층이 두 겹 이상 쌓이지 않게 설계한다(모달 위 팝오버 위 토스트 금지).

**고정 헤더·탭 바 (단계 2)**
- 스크롤해도 붙어 있는 층은 면 `--mp-bg` + 내용과 닿는 쪽 한 줄(헤더는 아래, 탭 바는 위) `--mp-line`.
- 스크롤 위치에 따라 선이 생기게 하려면 맨 위에서는 선 없음, 내용이 밑으로 지나가기 시작하면 `--mp-line`(즉시, 전환 없음).
- 반투명 헤더 + 흐림(유리 효과) 대신 불투명 bg.

**검사**
- 코드 검색: `box-shadow`, `drop-shadow`, `backdrop-filter`, `rgba(0,0,0` 결과가 0건이어야 한다(`box-shadow: none` 제외).
- 라이트·다크 두 테마에서 떠 있는 층의 경계가 보이는지 확인한다.

**반응형**
- 좁은 화면에서 팝오버·드롭다운이 화면을 넘으면 아래에 붙은 시트(`bottom-sheet`)로 바꾼다. 경계 규칙은 같다.
- 모바일 전체 화면 모달은 테두리 대신 위쪽 1px `--mp-line-strong`만.

**접근성**
- 떠 있는 층이 열리면 포커스를 그 안으로 옮기고, 닫히면 연 요소로 돌려준다.
- 모달은 `role="dialog"` + `aria-modal="true"`, 뒤 내용은 `inert`. 그림자가 없어도 경계선이 시각 구분을 담당하므로 `--mp-line-strong`을 빼지 않는다.
- `forced-colors: active`에서도 `border`는 남는다. 경계를 `outline`·그림자에 의존하지 않는 이유다.

## 상태
| 상태 | 표현 |
|---|---|
| 카드 기본 | `--mp-line` |
| 카드 호버 | `--mp-line-strong` + `translateY(-3px)` (0.3s ease) |
| 떠 있는 층 열림 | 즉시 나타남, `--mp-line-strong` |
| 떠 있는 층 닫힘 | 즉시 사라짐 |
| 모달 열림 | 뒤 화면 `inert`, 스크롤 잠금 |

## 데모
```html demo
<div class="mp-elevation">
  <div class="mp-elevation-l1"></div>
  <div class="mp-elevation-l3"></div>
</div>
```

## 코드
```css
.mp-elevation { position: relative; width: 16em; height: 9em; }
.mp-elevation-l1, .mp-elevation-l3 { position: absolute; width: 10em; height: 6em; background: var(--mp-bg); border-radius: 0; box-shadow: none; }
.mp-elevation-l1 { left: 0; top: 0; border: var(--mp-border) solid var(--mp-line); }
.mp-elevation-l3 { right: 0; bottom: 0; border: var(--mp-border) solid var(--mp-line-strong); z-index: 20; }

/* 페이지에서 */
.layer-card { border: var(--mp-border) solid var(--mp-line); transition: border-color 0.3s ease, transform 0.3s ease; }
.layer-card:hover { border-color: var(--mp-line-strong); transform: translateY(-3px); }
.layer-float { position: absolute; z-index: 20; background: var(--mp-bg); border: var(--mp-border) solid var(--mp-line-strong); }
.layer-modal { position: fixed; z-index: 30; background: var(--mp-bg); border: var(--mp-border) solid var(--mp-line-strong); }
@media (prefers-reduced-motion: reduce) { .layer-card { transition: none; } .layer-card:hover { transform: none; } }
```

## 앱
- SwiftUI: `.shadow`를 쓰지 않는다. `.background(bg).overlay(Rectangle().strokeBorder(lineStrong, lineWidth: 1))`. 메뉴·팝오버를 직접 만들 때도 같은 틀.
- Compose: `Card(elevation = CardDefaults.cardElevation(0.dp), shape = RectangleShape, border = BorderStroke(1.dp, line))`, `Surface(tonalElevation = 0.dp, shadowElevation = 0.dp)`.
- 앱 커스텀 딤: 반투명 검정 대신 딤 없음 또는 bg 불투명.
- OS 예외: 시스템 시트(`.sheet`, `ModalBottomSheet`의 시스템 모양을 유지할 때)·알림창·컨텍스트 메뉴·키보드의 그림자·흐림·딤은 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 불투명 `--mp-bg` 면 + 1px 선. 위 층일수록 `--mp-line-strong`. z-index 네 단계. 열린 층에 포커스 이동.
- 하지 말 것: `box-shadow`, `text-shadow`, `drop-shadow`, 하드 그림자(오프셋 테두리), 유리 흐림, 반투명 딤·면, 층 세 겹 이상, z-index 9999.
