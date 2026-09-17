---
id: scroll-hint
name: 스크롤 힌트
nameEn: Scroll Hint
category: navigation
summary: 첫 화면 아래 가운데의 12×6 픽셀 삼각형. 5px 위아래로 느리게 오가며 아래 내용을 알린다.
aliases: [스크롤 힌트, 아래로, 스크롤 유도, 아래 화살표, scroll down, scroll indicator, down arrow, down.svg]
platforms: [web]
status: extracted
source: metaphr.dev index.html .scroll-hint + down.svg
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-opacity-link, --mp-duration-fade, --mp-ease-float, --mp-duration-hover, --mp-glyph]
effects: [float, reduced-motion]
related: [hero, pixel-icon, logo]
---

## 용도
첫 화면(`hero`)이 뷰포트를 꽉 채워 아래에 내용이 있다는 것이 보이지 않을 때만 쓴다. 한 페이지에 하나.
첫 화면 아래로 내용이 살짝 보이면 두지 않는다(빼기 원칙).
누르면 다음 섹션으로 이동하는 링크이기도 하다.

**함께 쓰는 요소**
- `hero`: 이 힌트가 놓이는 유일한 자리. `hero` 컨테이너(`position: relative; min-height: 100svh`) 안 가운데 아래
- `float`·`scramble`: 첫 화면 연출(슬로건 숨쉬기·브랜드 등장)이 끝난 뒤 `.on`으로 나타난다 — 동시에 나타나지 않는다
- `glyph-field`: 글리프 배경 위라면 힌트 뒤를 비우지 않는다. mask 잉크 한 색이 배경 글리프(`--mp-glyph`)보다 진해 구분된다
- `section-head`: 링크 대상은 다음 분류 섹션. 대상 제목에 `id`·`scroll-margin-top: 2rem`
- `logo`: `down.svg`는 로고 목록의 공식 파일이라 로고 규칙(칠하기·애니메이션 예외)을 따른다

## 생김새
**모양**
- 공식 파일 `/v1/logos/down.svg`(12×6 1비트 삼각형). 새로 그리지 않는다
- 색을 입힐 때는 CSS mask로 `--mp-ink`만(로고 규칙의 공식 예외). teal·orange로 칠하지 않는다
- `image-rendering: pixelated` — 계단 모양이 뭉개지지 않게
- 테두리·배경·글자 없음

**크기·간격**
- 폭 `clamp(16px, 2.2vw, 22px)`, `height: auto`(가로:세로 2:1)
- 위치: 첫 화면 가운데 아래 `position: absolute; left: 50%; bottom: clamp(1.5rem, 4vh, 3rem); transform: translateX(-50%)`
- 누를 곳 `padding: 0.4em 0.8em`
- 첫 화면 컨테이너는 `position: relative; min-height: 100svh`

**반응형**
- 모바일 주소창 높이 변화에 흔들리지 않게 첫 화면 높이는 `100svh`
- 가로 모드 등 첫 화면 높이가 내용보다 작아 아래 내용이 보이면 숨긴다(`@media (max-height: 480px) { display: none }`)
- 터치 기기에서도 보인다. 누를 곳은 여백으로 44px 이상

**앱에서는**
- 쓰지 않는다. 앱 첫 화면은 스크롤 여부를 내용이 살짝 걸쳐 보이게(다음 줄이 화면 끝에 반쯤) 해서 알린다
- 온보딩처럼 넘기는 화면은 `page-indicator`

## 상태
| 상태 | 표현 |
|---|---|
| 등장 전 | opacity 0 |
| 보임 `.on` | `--mp-opacity-link`(0.75), 5px 왕복 |
| 호버·포커스 | opacity 1, 왕복은 계속 |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 스크롤 후 | 첫 화면과 함께 화면 밖으로 지나간다(고정하지 않는다) |
| reduced-motion | 멈춘 채 0.75로 보임 |

## 동작
- 등장: 첫 화면 연출(슬로건 등)이 끝난 뒤 opacity 0 → 0.75, `--mp-duration-fade`(0.6s) ease
- 왕복: 세로 0 → 5px → 0, 2.6s `--mp-ease-float` infinite — 로고 규칙이 허용한 유일한 이미지 애니메이션
- 누르면 `#다음-섹션`으로 이동, `html { scroll-behavior: smooth }`
- 튕김(bounce)·크기 변화·깜빡임 없음

**접근성**
- 요소는 `<a class="scroll-hint" href="#apps" aria-label="아래로 스크롤">`, 안의 이미지는 `alt=""`(장식)
- 이동 대상 섹션에 `id`와 제목이 있어야 스크린리더가 이동을 알아챈다. 대상 제목에 `scroll-margin-top`
- 키보드: 첫 화면에서 `Tab`으로 도달, `Enter`로 이동. 포커스 받으면 opacity 1
- 스크롤 힌트가 없어도 내용에 닿을 수 있어야 한다 — 유일한 길로 쓰지 않는다. 스크린리더·키보드 사용자는 페이지 맨 앞 건너뛰기 링크(`본문으로 건너뛰기`)와 제목 탐색으로 간다. 힌트는 그 길을 대신하지 않는다
- 대상 제목은 `<h2 id="apps" tabindex="-1">` — 이동 후 포커스가 제목으로 옮겨져 다음 `Tab`이 섹션 안에서 시작한다
- 포커스 순서: 건너뛰기 링크 → 머리 → 첫 화면 링크 → 힌트. 힌트가 첫 화면 맨 뒤
- 누를 곳: 22px 삼각형 + `padding: 0.4em 0.8em`이 44px에 못 미치면 `min-width: 44px; min-height: 44px`

**reduced-motion**
- `animation: none`, 등장 페이드도 없이 바로 0.75, `scroll-behavior: auto`

## 데모
```html demo
<div class="mp-scroll-hint-stage">
  <a class="mp-scroll-hint" href="#" aria-label="아래로 스크롤"><span></span></a>
  <a class="mp-scroll-hint is-hover" href="#" aria-label="아래로 스크롤"><span></span></a>
</div>
```

## 코드
```css
.mp-scroll-hint-stage { display: flex; justify-content: center; align-items: flex-end; gap: 3rem; height: 6rem; padding-bottom: 1rem; }
.mp-scroll-hint {
  display: flex; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; padding: 0.4em 0.8em;
  opacity: var(--mp-opacity-link); animation: mp-scroll-hint 2.6s var(--mp-ease-float) infinite;
  transition: opacity var(--mp-duration-hover) ease;
}
.mp-scroll-hint span {
  display: block; width: clamp(16px, 2.2vw, 22px); aspect-ratio: 2 / 1;
  background: var(--mp-ink); image-rendering: pixelated;
  -webkit-mask: url("/v1/logos/down.svg") center / 100% 100% no-repeat;
  mask: url("/v1/logos/down.svg") center / 100% 100% no-repeat;
}
.mp-scroll-hint:hover, .mp-scroll-hint:focus-visible, .mp-scroll-hint.is-hover { opacity: 1; }
.mp-scroll-hint:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@keyframes mp-scroll-hint { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }
@media (prefers-reduced-motion: reduce) { .mp-scroll-hint { animation: none; transition: none; } }
/* 실제 첫 화면: .hero { position: relative; min-height: 100svh; }
   .scroll-hint { position: absolute; left: 50%; bottom: clamp(1.5rem, 4vh, 3rem); }
   keyframes는 translate(-50%, 0) ↔ translate(-50%, 5px) — 가운데 정렬 transform을 함께 쓴다.
   외부 사이트는 절대 주소 https://design.metaphr.dev/v1/logos/down.svg 를 쓴다. */
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 공식 `down.svg`, 잉크 한 색 mask, `pixelated`.
- 해야 할 것: 느린 5px 왕복(2.6s), reduced-motion에서 정지.
- 해야 할 것: 다음 섹션으로 가는 링크 + `aria-label`.
- 하지 말 것: 새 화살표 그리기, `↓`·`v` 글자로 대신하기.
- 하지 말 것: 튕기는(bounce) 움직임, 빠른 깜빡임, teal·orange로 칠하기.
- 하지 말 것: 첫 화면이 아닌 곳에 두기, 화면에 고정해 따라다니게 하기.

**자주 틀리는 것**
- `<img src="down.svg" style="filter: invert(1)">`로 다크 대응 → `filter` 금지, mask + `background: var(--mp-ink)`
- `@keyframes`에서 `translateY`만 써서 가운데 정렬(`translateX(-50%)`)이 풀림 → `translate(-50%, 0)` ↔ `translate(-50%, 5px)`
- `position: fixed`로 화면에 붙여 스크롤 내내 따라옴 → 첫 화면 안 `absolute`
- `href` 없는 `<div>` 장식 → 다음 섹션으로 가는 `<a href="#id" aria-label="아래로 스크롤">`
- reduced-motion에서 opacity 0으로 숨김 → 멈춘 채 0.75로 보여야 한다
