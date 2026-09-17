---
id: empty-state
name: 빈 상태
nameEn: Empty state
category: feedback
summary: 목록이 비었을 때 모눈 위에 사실 한 줄과 할 수 있는 일 한 줄을 둔다. 일러스트 대신 픽셀 글리프 하나.
aliases: [빈 상태, 빈 화면, 결과 없음, 데이터 없음, 아직 없음, 목록 비어 있음, 검색 결과 없음, 첫 사용, empty state, no data, no results, zero state, blank slate, first run]
platforms: [web, ios, android]
status: extracted
source: "hihi \"아직 등반 기록이 없습니다\" · timeboard \"등록된 구독이 없습니다.\" · syn \"작성된 작품이 없습니다.\" · memo \"해시태그가 없습니다\" (portfolio-analysis 4절, 4/4 저장소 공통)"
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-line, --mp-border, --mp-grid-bg, --mp-grid-line, --mp-grid-cell-card, --mp-glyph, --mp-font, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-tracking-small, --mp-opacity-body, --mp-opacity-secondary, --mp-opacity-pixel, --mp-pixel-card, --mp-duration-hover]
effects: [invert-hover, reduced-motion]
related: [error-state, text-action, pixel-icon, grid-thumbnail, microcopy, search-field, list]
---

## 용도
목록·검색 결과·기록·폴더가 **하나도 없을 때** 그 자리에 둔다. 모든 목록에 빈 상태를 설계한다(4개 저장소 공통 규칙).
- 불러오기 실패는 `error-state`, 불러오는 중은 `loading`/`skeleton`. 셋을 섞지 않는다 — 실패를 "없습니다"로 보여 주지 않는다.
- 빈 상태도 레이아웃의 일부다: 목록이 있을 자리에 같은 폭으로, 목록 머리(제목·필터)는 그대로 둔다.

## 생김새
- 틀: `var(--mp-border) solid var(--mp-line)`, `border-radius: 0`, 여백 `2.4em 1.5em`, 가운데 정렬, 최소 높이 없음(내용만큼)
- 배경: 모눈 — `--mp-grid-bg` + 1px `--mp-grid-line` 격자, 칸 `--mp-grid-cell-card`(12px)
- 글리프(선택, 하나만)
  - 기본: `□` 글자, `font-size: 2em`, 색 `--mp-glyph`
  - 또는 40×40 1비트 `pixel-icon`을 3배(`--mp-pixel-card` 120px), `image-rendering: pixelated`, `opacity: var(--mp-opacity-pixel)`
- 첫 줄 = **사실**: `--mp-size-body`, `--mp-tracking-body`, `opacity: var(--mp-opacity-body)`
- 둘째 줄 = **할 수 있는 일**: `--mp-size-small`, `--mp-tracking-small`, `opacity: var(--mp-opacity-secondary)`, 최대 폭 24em
- 행동(선택, 하나만): `text-action` `[ 새 기록 ]`, 둘째 줄과 간격 `0.8em`, 호버·포커스 반전
- 줄 간격 `0.6em`, 글리프와 첫 줄 간격 `0.9em`

문구 규칙(합쇼체, 느낌표·이모지 없음):
- 처음: `아직 기록이 없습니다.` / `코스를 골라 첫 기록을 시작해 보세요.`
- 등록형: `등록된 구독이 없습니다.`
- 검색: `"한라" 검색 결과가 없습니다.` / `다른 이름으로 찾아보세요.` — 검색어를 되돌려 준다
- 필터: `조건에 맞는 항목이 없습니다.` + `[ 필터 지우기 ]`
- 다 처리함: `남은 일이 없습니다.` 한 줄만

## 상태
| 상태 | 글리프 | 사실 | 할 일 | 행동 |
|---|---|---|---|---|
| 처음(아직 없음) | 있음 | `아직 … 없습니다.` | 첫 행동 안내 | `[ 새 … ]` |
| 검색 결과 없음 | 없음 | 검색어 포함 | 다른 검색어 제안 | 없음(검색창에 포커스 유지) |
| 필터 결과 없음 | 없음 | 조건 없음 | — | `[ 필터 지우기 ]` |
| 모두 처리함 | 없음 | `남은 … 없습니다.` | — | 없음 |
| 권한 없음 | — | `error-state` 사용 | — | — |
| 행동 호버·포커스 | — | — | — | 반전 `--mp-ink`/`--mp-bg` |

## 동작
### 모션
- 빈 상태는 즉시 나타난다(등장 애니메이션 없음). 행동 버튼 반전만 `--mp-duration-hover` ease(`invert-hover`).
- 글리프를 숨쉬기(`float`)로 움직이지 않는다. reduced-motion이면 반전 전환도 없다.

### 키보드·접근성
- 컨테이너는 목록 자리를 대신하므로 `role`을 따로 주지 않는다. 검색·필터로 결과가 0이 되는 순간에는 결과 수를 알리는 `role="status"` 영역(예: 검색창 옆 `0개`)이 읽어 준다.
- 글리프 `aria-hidden="true"`, 픽셀 이미지는 `alt=""`.
- 행동은 `<button>` 또는 `<a>`, 괄호는 장식: `aria-label="새 기록"`.
- 빈 상태로 포커스를 옮기지 않는다. 마지막 항목을 지워 빈 상태가 되면 포커스를 행동 버튼(없으면 목록 제목)으로 옮긴다.

### 반응형
- 폭 480px 이하: 여백 `1.8em 1em`, 글리프 픽셀 아이콘은 3배 유지(더 줄이지 않는다), 문구 줄바꿈 허용.
- 넓은 화면에서도 틀은 목록 폭을 따르고, 글은 가운데 24em 안에.

## 데모
```html demo
<div class="mp-empty-state-demo">
  <div class="mp-empty-state">
    <span class="mp-empty-state-glyph" aria-hidden="true">□</span>
    <p class="mp-empty-state-fact">없음</p>
    <button class="mp-empty-state-action" type="button" aria-label="새 기록">[ 새 ]</button>
  </div>
  <div class="mp-empty-state">
    <p class="mp-empty-state-fact">0개</p>
    <p class="mp-empty-state-next">&gt; _</p>
  </div>
</div>
```

## 코드
```css
.mp-empty-state-demo { display: grid; grid-template-columns: repeat(auto-fit, minmax(10em, 1fr)); gap: 1em; }
.mp-empty-state {
  display: grid; justify-items: center; align-content: center; gap: 0.6em;
  padding: 2.4em 1.5em; text-align: center; color: var(--mp-ink);
  border: var(--mp-border) solid var(--mp-line); border-radius: 0;
  background-color: var(--mp-grid-bg);
  background-image:
    linear-gradient(var(--mp-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: var(--mp-grid-cell-card) var(--mp-grid-cell-card);
}
.mp-empty-state p { margin: 0; max-width: 24em; }
.mp-empty-state-glyph { margin-bottom: 0.3em; font-size: 2em; line-height: 1; color: var(--mp-glyph); }
.mp-empty-state-icon { width: var(--mp-pixel-card); height: var(--mp-pixel-card); image-rendering: pixelated; opacity: var(--mp-opacity-pixel); }
.mp-empty-state-fact { font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body); opacity: var(--mp-opacity-body); }
.mp-empty-state-next { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-empty-state-action {
  margin-top: 0.8em; padding: 0.2em 0.4em; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-small) / 1.5 var(--mp-font); letter-spacing: var(--mp-tracking-small); cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-empty-state-action:hover, .mp-empty-state-action:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-empty-state-action:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@media (max-width: 480px) { .mp-empty-state { padding: 1.8em 1em; } }
@media (prefers-reduced-motion: reduce) { .mp-empty-state-action { transition: none; } }
```
모눈의 `linear-gradient`는 격자선 용도로만 허용된다.

## 앱
- SwiftUI: `ContentUnavailableView`는 SF Symbol·굵은 제목이라 쓰지 않는다. `VStack(spacing: 8)` + `Text` 두 줄 + 텍스트 버튼, 배경은 `Canvas`로 12pt 모눈(`gridLine` 1pt). 픽셀 아이콘은 `Image(...).interpolation(.none).resizable().frame(width: 120, height: 120)`.
- Compose: `Column(horizontalAlignment = Alignment.CenterHorizontally, verticalArrangement = Arrangement.spacedBy(8.dp))` + `Modifier.drawBehind { /* 12dp 모눈 */ }`. 픽셀 아이콘 `FilterQuality.None`.
- 목록 화면의 빈 상태는 화면 정가운데가 아니라 목록 머리 바로 아래에 둔다(머리·필터가 계속 보이게).
- 당겨서 새로고침은 빈 상태에서도 동작하게 둔다(OS 표시 그대로).

## 해야 할 것 / 하지 말 것
- 해야 할 것: 사실 한 줄 + 할 수 있는 일 한 줄. 모든 목록에 둔다. 검색어를 되돌려 준다. 행동은 하나. 목록 머리는 그대로 두고 목록 자리에만.
- 하지 말 것: 큰 벡터 일러스트·캐릭터, 이모지, 느낌표(`아직 없어요!`), 사과문, orange 강조, 실패를 "없습니다"로 보여 주기, 행동 버튼 여러 개, 글리프 숨쉬기 애니메이션, 빈 화면을 그냥 비워 두기.
