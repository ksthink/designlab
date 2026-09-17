---
id: hero
name: 히어로
nameEn: Hero
category: patterns
summary: 첫 화면을 한 문장 슬로건으로 채운다. 가운데 큰 글자, 아래 옅은 브랜드, 뒤에 터미널 글리프, 바닥에 스크롤 힌트.
aliases: [히어로, hero, 첫 화면, 메인 비주얼, 랜딩 상단, 대문, 슬로건, above the fold, 인트로 화면]
platforms: [web]
status: extracted
source: metaphr.dev index.html .hero, .slogan, .brand, .nav-blog, .scroll-hint
pillars: [minimalism, pixel-art]
tokens: [--mp-size-hero, --mp-tracking-hero, --mp-size-lead, --mp-opacity-brand, --mp-duration-fade, --mp-glyph, --mp-ink, --mp-bg, --mp-opacity-link, --mp-opacity-muted, --mp-size-small, --mp-tracking-small, --mp-size-title, --mp-tracking-title, --mp-tick]
effects: [glyph-field, scramble, fx-fill, reveal]
related: [scroll-hint, header, section-head, logo, splash, page-list]
---

## 용도
사이트 첫 화면에서 정체성 한 문장만 보여 줄 때 쓴다. 홈(`/`)에 한 번만 둔다.
설명·버튼·카드를 첫 화면에 몰아넣지 않는다. 설명은 히어로 아래 `lead` 문단으로 내린다.
하위 페이지는 히어로 없이 `page-read`나 `page-list` 머리(상단 바 + 제목)로 시작한다.
앱에는 히어로를 두지 않는다. 앱 첫 화면은 `splash` 다음 곧바로 기능 화면이다.

## 생김새
**구조** (쌓임 순서, 아래에서 위로)
1. `<header class="hero">` — `position: relative; height: 100svh`(metaphr.dev `--hero-h`), `z-index: 1`
2. `<canvas class="glyphs" aria-hidden="true">` — `position: absolute; inset: 0; z-index: 0; pointer-events: none; image-rendering: pixelated`
3. 글자 층(`z-index: 1`): 왼쪽 위 링크 `blog >`, 가운데 슬로건 h1, 그 아래 브랜드 p, 바닥 스크롤 힌트 a
4. 히어로 바로 뒤 `<main>`은 `position: relative; z-index: 1; background: var(--mp-bg)` — 스크롤할 때 캔버스를 덮는다

**수치**
- 슬로건 h1: `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center`, `--mp-size-hero`(`clamp(1.95rem, 7.8vw, 5.2rem)`), `--mp-tracking-hero`(.05em), `white-space: nowrap`, 굵기 400, 여백 0
- 브랜드: `position: absolute; left: 0; right: 0; top: 50%`, `padding-top: calc(var(--mp-size-hero) * 0.85)`, 글자 `clamp(0.8rem, 2.4vw, 1.5rem)`(원값), 자간 `0.12em`, 가운데, 켜지면 `opacity: var(--mp-opacity-brand)`(.8)
- 링크 `blog >`: `position: absolute; top: 0; left: 0`(JS가 슬로건 왼쪽 위 칸에 맞춰 옮긴다), `fx-fill` 칠 영역 `inset: -0.1em -0.15em`
- 스크롤 힌트: `left: 50%; bottom: clamp(1.5rem, 4vh, 3rem); transform: translateX(-50%)`, 안쪽 여백 `0.4em 0.8em`, 이미지 `down.svg` 폭 `clamp(16px, 2.2vw, 22px)`, 켜지면 `opacity: .75`(`--mp-opacity-link`)
- 글리프 캔버스: 셀 한 칸 = Mulmaru 한 글자 폭·높이, 갱신 `--mp-tick`(83ms), 색 `--mp-glyph` 계열 알파 .2–.45
- 글자 둘레 knockout: `data-knockout` 요소의 글자 사각형 안에는 글리프를 그리지 않고, 가장자리 1칸은 옅게 페이드
- 히어로 아래 `lead`: 위 `clamp(4rem, 12vh, 9rem)`, 문단 `--mp-size-lead`, 끝 `■` caret

**반응형**
| 폭 | 동작 |
|---|---|
| 390px(기준 폰) | 슬로건 `clamp(1.68rem, 7.2vw, 2.34rem)` → 약 28px, 8글자 한 줄에 들어간다. 브랜드 `padding-top`도 같은 값 × 0.85. 글리프는 점 글리프만(궤도 장식 없음) |
| 480px 이하 | metaphr.dev 유일한 히어로 미디어 쿼리 `@media (max-width: 480px)` — 위 축소 크기 적용 |
| 481–859px | `--mp-size-hero`(7.8vw), `blog >`는 슬로건 왼쪽 위 칸에 붙는다 |
| 860px 이상 | 슬로건 `5.2rem` 상한에 가까워진다. 글리프 궤도 장식을 그린다 |
| 1180px 이상 | 글자 크기는 상한 고정, 캔버스만 넓어진다. 히어로 아래 `lead`는 1180px 틀 |
- 슬로건은 한 줄 유지(`nowrap`). 넘치면 문장을 줄인다 — 줄바꿈으로 해결하지 않는다
- 모바일 주소창 변화에 흔들리지 않게 `100vh`가 아니라 `100svh`
- 가로 모드(높이 480px 이하)에서도 `100svh` 그대로. 힌트 `bottom`은 `clamp(1.5rem, 4vh, 3rem)`라 겹치지 않는다
- 창 크기가 바뀌면 150ms 뒤 캔버스 칸 수·knockout 사각형·`blog >` 위치를 다시 계산한다

**접근성**
- 슬로건이 페이지의 유일한 `h1`. 브랜드는 `p`(제목 아님), 링크 아님 — 호버 스크램블만
- 캔버스·힌트 이미지는 `aria-hidden="true"`, 힌트 링크는 `aria-label="아래로 스크롤"`, `href="#apps"`(본문 id)
- 본문 건너뛰기 링크(`.skip`)를 히어로보다 먼저 둔다
- 글자 층 knockout으로 글리프가 글자와 겹치지 않게 해 대비를 지킨다(slate/paper 10.9:1)
- 서체가 늦으면 최대 2.5초 뒤 강제로 켠다 — 글자가 끝내 안 보이는 일이 없게
- 랜드마크: 히어로는 `<header>`(banner), 바로 뒤 `<main id="apps">`. `blog >`는 링크 하나라 `nav`로 감싸지 않는다
- Tab 순서: 건너뛰기 → `blog >` → 스크롤 힌트 → 본문. 브랜드는 포커스 대상이 아니다(호버 장식)
- 브랜드 스크램블 중에도 DOM 글자는 원문 그대로 두고 칸 span만 바꾼다 — 스크린리더가 뒤섞인 글자를 읽지 않게 `aria-label="metaphr.dev"`를 부모에

**움직임 줄이기**
- 캔버스: `matchMedia('(prefers-reduced-motion: reduce)')`이면 첫 프레임만 그리고 타이머를 시작하지 않는다
- 스크롤 힌트 왕복·슬로건 페이드·스크램블 없음. 서체 준비 즉시 최종 상태(`.on`)
- `html { scroll-behavior: auto }` — 힌트를 눌러도 즉시 이동

**조합 규칙**
- 순서는 고정: 히어로 → `lead` 문단(끝 ■ caret) → 분류(`section-head` + `rail`) × n → `footer`
- 히어로 안에 둘 수 있는 것: 슬로건 h1 1 · 브랜드 1 · 링크 1 · 스크롤 힌트 1 · 글리프 캔버스 1. 그 밖의 요소(버튼·배지·카드·입력)는 넣지 않는다
- 강조 orange는 히어로에 쓰지 않는다. 그 화면의 강조 한 곳은 아래 본문에 남겨 둔다
- 상단 바(`header` 요소)와 히어로를 함께 두지 않는다 — 홈은 히어로가 상단 바 역할
- 상시 모션은 캔버스·힌트뿐. 히어로 아래로 내려가면 lead 끝 ■ 하나만 깜빡인다

## 상태
| 상태 | 표현 |
|---|---|
| 서체 로딩 전 | 슬로건·브랜드·힌트 `opacity: 0` |
| 켜짐(`.on`) | 슬로건 1, 브랜드 `--mp-opacity-brand`, 힌트 .75 — `--mp-duration-fade` ease |
| 브랜드 호버 | `scramble`: 글자 칸이 잉크/배경 반전(`background: var(--mp-ink); color: var(--mp-bg)`)으로 섞이다 복원 |
| `blog >` 호버·포커스 | `fx-fill` 8칸 반전 |
| 힌트 호버 | `opacity: 1` |
| 탭 비활성·화면 밖 | 글리프 타이머 정지(`visibilitychange`, IntersectionObserver) |
| 움직임 줄이기 | 글리프 첫 프레임만, 힌트 정지, 스크램블 없음 |

## 동작
- 등장: `document.fonts.ready` 후 `.on` 부여, opacity `--mp-duration-fade` ease.
- 글리프: `glyph-field` — `--mp-tick` 셀 단위 갱신, 셀 사이 트윈 없음. 창 크기 바뀌면 150ms 뒤 다시 배치.
- 브랜드: `scramble` — 포인터 진입 시 83ms마다 칸 교체, 떠나면 복원.
- 링크: `fx-fill` — `--mp-duration-fill` `steps(4, end)`.
- 스크롤 힌트: 세로 5px 왕복 2.6s ease-in-out infinite(logos.json의 유일한 로고 애니메이션 예외).
- `prefers-reduced-motion: reduce`: 위 움직임 모두 끄고 최종 상태만.

## 데모
```html demo
<div class="mp-hero">
  <p class="mp-hero-glyphs" aria-hidden="true">.  +  .   .  ·  .  +   .  .  ·   .  +  .  ·  .   .  +  .  ·  .   .  +  .  .  ·  .   +  .  ·  .   .  .  +  ·  .   .  +  .  ·  .  .  +  .   ·  .  .  +  ·  .   .  +  .  ·  .   .  +</p>
  <a class="mp-hero-nav" href="#">blog &gt;</a>
  <h1 class="mp-hero-slogan">여백</h1>
  <p class="mp-hero-brand">metaphr</p>
  <span class="mp-hero-hint" aria-hidden="true"></span>
</div>
```

## 코드
```css
.mp-hero { position: relative; aspect-ratio: 16 / 9; overflow: hidden; }   /* 실제: height: 100svh */
.mp-hero-glyphs {
  position: absolute; inset: 0; margin: 0; padding: 0.6em; z-index: 0;
  color: var(--mp-glyph); opacity: var(--mp-opacity-muted); white-space: pre-wrap; word-break: break-all;
  line-height: 2.4; pointer-events: none;   /* 실제: <canvas> glyph-field */
}
.mp-hero-slogan {
  position: absolute; inset: 0; z-index: 1; margin: 0;
  display: flex; align-items: center; justify-content: center; white-space: nowrap; font-weight: 400;
  font-size: var(--mp-size-title); letter-spacing: var(--mp-tracking-title);   /* 실제: --mp-size-hero / --mp-tracking-hero */
  pointer-events: none;
}
.mp-hero-brand {
  position: absolute; left: 0; right: 0; top: 50%; z-index: 1; margin: 0; text-align: center;
  padding-top: calc(var(--mp-size-title) * 0.85);
  font-size: var(--mp-size-small); letter-spacing: 0.12em; opacity: var(--mp-opacity-brand);
}
.mp-hero-nav {
  position: absolute; top: 0.8em; left: 1em; z-index: 1; color: inherit; text-decoration: none;
  font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-link);
}
.mp-hero-nav:hover, .mp-hero-nav:focus-visible { opacity: 1; background: var(--mp-ink); color: var(--mp-bg); }
.mp-hero-hint {
  position: absolute; left: 50%; bottom: 1em; z-index: 1; width: 18px; height: 9px; transform: translateX(-50%);
  background: var(--mp-ink); opacity: var(--mp-opacity-link);
  -webkit-mask: url(/v1/logos/down.svg) 0 0 / 100% 100% no-repeat; mask: url(/v1/logos/down.svg) 0 0 / 100% 100% no-repeat;
  animation: mp-hero-hint 2.6s ease-in-out infinite;
}
@keyframes mp-hero-hint { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, 5px); } }
@media (prefers-reduced-motion: reduce) { .mp-hero-hint { animation: none; } }
```
데모는 축소판이다(높이 16:9, 슬로건 `--mp-size-title`, 글리프는 정적 글자). 실제 값은 `100svh`, `--mp-size-hero`, `<canvas>`.

```js
// 서체 준비 후 켜기 — 최대 2.5초 기다린다
const on = () => document.querySelectorAll('.slogan, .brand, .scroll-hint').forEach((n) => n.classList.add('on'));
Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]).then(on);
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 문장 하나, 브랜드 하나, 링크 하나만 둔다.
- 해야 할 것: 글자 둘레는 글리프를 비워(knockout) 읽히게 한다.
- 해야 할 것: 캔버스는 화면 밖·탭 숨김에서 멈춘다. 움직임 줄이기에서는 첫 프레임만.
- 해야 할 것: 슬로건은 한 줄, 좁은 화면에서는 크기 단계만 낮춘다.
- 하지 말 것: 배경 사진·영상, 그라데이션, 비네트.
- 하지 말 것: CTA 버튼 여러 개, 카드·기능 목록을 첫 화면에 넣기.
- 하지 말 것: 부드럽게 흐르는 파티클·패럴랙스, 60fps 보간 글리프.
- 하지 말 것: 슬로건에 orange 글자, 굵은 슬로건, 두 줄 슬로건.
- 하지 말 것: 하위 페이지마다 히어로 반복.
**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `height: 100vh` — 모바일 주소창이 접힐 때 흔들림 | `height: 100svh` |
| 좁은 화면에서 슬로건 두 줄 줄바꿈 | 480px 이하 크기 단계로 낮추고 `nowrap` 유지 |
| 캔버스에 `aria-hidden` 누락, 글리프를 텍스트 노드로 채움 | `<canvas aria-hidden="true">`, 글리프는 그림으로만 |
| 60fps `requestAnimationFrame` 보간으로 글리프가 흐름 | `--mp-tick` 83ms 셀 단위 갱신, 셀 사이 트윈 없음 |
| 움직임 줄이기에서도 캔버스 타이머가 돈다 | 첫 프레임만 그리고 타이머를 시작하지 않는다 |
| 슬로건 뒤 반투명 판·그림자로 가독성 확보 | knockout으로 글자 사각형 안 글리프를 비운다 |
