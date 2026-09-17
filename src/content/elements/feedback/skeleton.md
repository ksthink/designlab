---
id: skeleton
name: 자리 표시
nameEn: Skeleton
category: feedback
summary: 내용이 올 자리에 모눈 배경색 사각형을 미리 깔아 둔다. 빛이 흐르는 shimmer는 쓰지 않는다.
aliases: [자리 표시, 스켈레톤, 로딩 자리, 플레이스홀더 블록, 뼈대 화면, 콘텐츠 로딩, skeleton, placeholder, shimmer, loading placeholder, ghost, content loader]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-grid-bg, --mp-grid-line, --mp-grid-cell-card, --mp-line, --mp-border, --mp-pixel-card, --mp-opacity-muted, --mp-duration-caret]
effects: [reduced-motion]
related: [loading, card, list, grid-thumbnail, table]
---

## 용도
카드·목록·표처럼 **모양이 정해진** 내용이 올 때 레이아웃을 미리 잡아 준다.
- 쓴다: 첫 화면 목록, 카드 격자, 상세 화면의 본문 자리 — 400ms 이상 걸리는 곳.
- 쓰지 않는다: 모양을 모르는 대기(`loading`), 버튼 누른 뒤 처리(`loading`), 400ms 안에 끝나는 곳, 이미 내용이 있는 목록의 새로고침(기존 내용 유지).
- 스켈레톤은 실제 레이아웃의 **축소 복제**다. 모양이 다르면 내용이 왔을 때 자리가 튄다.

## 생김새
- 블록 기본: 배경 `--mp-grid-bg`, `border-radius: 0`, 테두리 없음, 글자 없음
- 썸네일 자리: 실제 `grid-thumbnail`과 같은 크기·비율, `var(--mp-border) solid var(--mp-line)` 틀 + 모눈(`--mp-grid-line`, 칸 `--mp-grid-cell-card`). 아이콘 자리 정사각형은 `--mp-pixel-card`(120px)
- 글자 줄 자리
  - 높이: 해당 글자 크기의 `0.8em`(줄 높이가 아니라 글자 몸통), 줄 사이는 실제 행간만큼
  - 폭: 제목 60%, 본문 첫 줄 90%, 둘째 줄 70%, 메타 30%. 모든 줄을 100%로 두지 않는다
- 카드 스켈레톤: 실제 카드와 같은 테두리(`--mp-line`)·여백
- 목록 스켈레톤: 실제 행 높이로 3–5행. 화면을 넘치게 채우지 않는다
- 원형 아바타 자리 대신 정사각형(`avatar`도 직각)

## 상태
| 상태 | 표현 | 시간 |
|---|---|---|
| 숨김 | 표시 없음 | 요청 후 400ms까지 |
| 대기(기본) | 정지한 블록 | 400ms 이후 |
| 대기(움직임 선택) | 블록 전체 opacity 1 ↔ `--mp-opacity-muted` 두 단계 깜빡임 | 한 주기 `--mp-duration-caret`의 2배(2.4s) |
| 일부 도착 | 온 부분만 즉시 교체, 나머지 스켈레톤 유지 | — |
| 완료 | 스켈레톤 즉시 제거, 내용 표시 | — |
| 실패 | `error-state`로 교체(같은 자리·폭) | — |
| 10초 경과 | 스켈레톤 위에 `loading` 문구 추가 | — |

## 동작
### 모션
- 기본은 정지. 멈춘 것 같아 보일 때만 두 단계 깜빡임: `animation: mp-skeleton-blink calc(var(--mp-duration-caret) * 2) steps(1, end) infinite`.
- 흐르는 그라데이션(shimmer), 파도, 부드러운 페이드 금지.
- 내용 교체는 즉시(페이드 인 없음). reduced-motion이면 깜빡임도 없다.

### 키보드·접근성
- 스켈레톤을 감싼 영역에 `aria-busy="true"`, 블록들은 `aria-hidden="true"`.
- 영역 밖에 숨김 문구 `<span role="status" class="sr-only">불러오는 중</span>`를 하나만 둔다(블록마다 두지 않는다).
- 스켈레톤은 포커스·클릭을 받지 않는다(`pointer-events: none`). 내용이 오면 `aria-busy="false"`.

### 반응형
- 실제 레이아웃과 같은 미디어 쿼리를 쓴다(카드 3열 → 1열이면 스켈레톤도).
- 좁은 화면에서는 카드 스켈레톤 2개, 목록 행 3개로 줄인다.

## 데모
```html demo
<div class="mp-skeleton-demo" aria-busy="true">
  <div class="mp-skeleton-card" aria-hidden="true">
    <div class="mp-skeleton-thumb"></div>
    <div class="mp-skeleton-line" style="width: 60%"></div>
    <div class="mp-skeleton-line" style="width: 90%"></div>
    <div class="mp-skeleton-line" style="width: 30%"></div>
  </div>
  <div class="mp-skeleton-list" aria-hidden="true">
    <div class="mp-skeleton-row"><span class="mp-skeleton-square"></span><span class="mp-skeleton-line" style="width: 70%"></span></div>
    <div class="mp-skeleton-row"><span class="mp-skeleton-square"></span><span class="mp-skeleton-line" style="width: 50%"></span></div>
    <div class="mp-skeleton-row is-blink"><span class="mp-skeleton-square"></span><span class="mp-skeleton-line" style="width: 60%"></span></div>
  </div>
</div>
```

## 코드
```css
.mp-skeleton-demo { display: flex; flex-wrap: wrap; gap: 1.6em; align-items: flex-start; }
.mp-skeleton-card { display: grid; gap: 0.7em; width: 12em; padding: 1em; border: var(--mp-border) solid var(--mp-line); pointer-events: none; }
.mp-skeleton-thumb {
  aspect-ratio: 4 / 3; margin-bottom: 0.3em; border: var(--mp-border) solid var(--mp-line);
  background-color: var(--mp-grid-bg);
  background-image:
    linear-gradient(var(--mp-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: var(--mp-grid-cell-card) var(--mp-grid-cell-card);
}
.mp-skeleton-line { display: block; height: 0.8em; border-radius: 0; background: var(--mp-grid-bg); }
.mp-skeleton-list { display: grid; width: 12em; pointer-events: none; }
.mp-skeleton-row { display: flex; align-items: center; gap: 0.7em; padding: 0.7em 0; border-bottom: var(--mp-border) solid var(--mp-line); }
.mp-skeleton-row .mp-skeleton-line { flex: none; }
.mp-skeleton-square { flex: none; width: 1.6em; height: 1.6em; background: var(--mp-grid-bg); }
.mp-skeleton-icon { width: var(--mp-pixel-card); height: var(--mp-pixel-card); background: var(--mp-grid-bg); }
.is-blink { animation: mp-skeleton-blink calc(var(--mp-duration-caret) * 2) steps(1, end) infinite; }
@keyframes mp-skeleton-blink { 50% { opacity: var(--mp-opacity-muted); } }
@media (prefers-reduced-motion: reduce) { .is-blink { animation: none; } }
```
`--mp-grid-bg`는 매우 옅다(잉크 3.5%). 두 테마 모두 자동으로 맞는다. 더 진하게 하려고 새 회색을 만들지 않는다.

## 앱
- SwiftUI: `.redacted(reason: .placeholder)`는 둥근 회색 막대라 쓰지 않는다. 실제 뷰와 같은 `VStack` 안에 `Rectangle().fill(gridBg).frame(height: 12)`, 폭은 `.frame(maxWidth: .infinity)` + `.padding(.trailing, w * 0.4)` 식으로 비율. `.accessibilityHidden(true)` + 상위 `.accessibilityLabel("불러오는 중")`.
- Compose: `Box(Modifier.fillMaxWidth(0.6f).height(12.dp).background(gridBg))`. accompanist placeholder·shimmer 라이브러리를 쓰지 않는다. 상위 `Modifier.semantics { contentDescription = "불러오는 중" }` + 자식 `clearAndSetSemantics { }`.
- `LazyColumn`에서는 실제 행 컴포저블에 `isPlaceholder` 매개변수를 두어 같은 레이아웃을 재사용한다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 실제 레이아웃과 같은 크기·여백·열 수. 400ms 뒤에 보인다. 줄 폭은 다르게(60/90/70%). 내용이 오면 즉시 교체. `aria-busy`와 숨김 문구 하나.
- 하지 말 것: shimmer 그라데이션·파도, 둥근 막대·원형 아바타 자리, 새 회색 색상, 400ms 안에 끝나는 곳의 스켈레톤, 기존 내용을 지우고 스켈레톤으로 바꾸는 새로고침, 화면을 넘치게 채운 스켈레톤 행.
