---
id: typography
name: 글자
nameEn: Typography
category: foundations
summary: Mulmaru 한 서체, 굵기 400 하나. 위계는 크기 10단계와 짝이 되는 자간, 그리고 투명도로 만든다.
aliases: [글자, 서체, 폰트, 타이포그래피, 글자 크기, 제목, 본문, 자간, 행간, 굵기, font, typography, heading, body text, font size, Mulmaru]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html·app.html 글자 규칙 · src/data/fonts.json
pillars: [minimalism, pixel-art]
tokens: [--mp-font, --mp-size-hero, --mp-size-title, --mp-size-heading, --mp-size-subheading, --mp-size-lead, --mp-size-body, --mp-size-small, --mp-size-kicker, --mp-size-meta, --mp-size-fine, --mp-tracking-hero, --mp-tracking-title, --mp-tracking-heading, --mp-tracking-subheading, --mp-tracking-lead, --mp-tracking-body, --mp-tracking-small, --mp-tracking-kicker, --mp-tracking-meta, --mp-tracking-fine, --mp-leading-title, --mp-leading-card, --mp-leading-body, --mp-opacity-body, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-kicker, --mp-opacity-fine, --mp-width-para]
effects: []
related: [color, spacing-layout, microcopy, labels-numbers, section-head, hero]
---

## 용도
모든 글자에 적용한다. 제목·본문·버튼·표·입력·코드 블록까지 서체는 `--mp-font`(Mulmaru) 하나, 굵기는 400 하나다.
서체 파일·라이선스·서브셋 기법은 `/v1/fonts.json`, 크기 값은 `/v1/tokens.json`이 원본이다.
글자를 강조하고 싶을 때 굵기·색·밑줄을 먼저 떠올리지 않는다. 크기 단계, 자간, 투명도, 여백 순으로 푼다.

## 생김새
**기반**
- `font-family: var(--mp-font)`, `font-weight: 400`, `font-style: normal`.
- `h1`–`h6`, `strong`, `b`, `th`, `em`, `i`, `code`, `pre`, `kbd`, `button`, `input`의 기본 굵기·기울임·서체를 되돌린다.
- 서체 로드: `/v1/fonts.css`(woff2, `font-display: swap`). 히어로처럼 첫 화면 글자가 크면 필요한 글자만 담은 서브셋을 먼저 불러온다.

**크기 10단계** (크기와 자간은 항상 같은 이름으로 짝). Mulmaru는 12px 격자 서체라 모든 값이 12px의 정수배다(1×·2×·3×·4×·6×). 좁은 화면(≤480px)은 tokens.css가 hero·title을 한 단계 내린다.
| 단계 | 값 | 자간 | 쓰는 곳 |
|---|---|---|---|
| hero | 72px (좁은 화면 48px) | .05em | 히어로 슬로건 한 줄 |
| title | 48px (좁은 화면 36px) | .04em | 페이지 제목 h1, 행간 `--mp-leading-title` 1.35 |
| heading | 36px | .06em | 분류 제목 h2 |
| subheading | 24px | .04em | 카드 제목 h3 |
| lead | 24px | .02em | 소개 문단 |
| body | 12px | .01em | 본문 |
| small | 12px | .06em | 링크·버튼·입력 |
| kicker | 12px | .14em | 머리 표지 |
| meta | 12px | .08em | 배지·날짜·메타 |
| fine | 12px | .1em | 저작권 |

**행간과 폭**
- 본문·리드 `--mp-leading-body` 2.1, 카드 설명 `--mp-leading-card` 1.85, 제목 `--mp-leading-title` 1.35. UI 한 줄 요소(버튼, 배지)는 1.
- 문단 폭 `--mp-width-para` 30em 이하. 한국어 줄바꿈은 `word-break: keep-all`, 긴 URL은 `overflow-wrap: anywhere`.

**투명도 위계** — 본문 .85 · 브랜드 .8 · 푸터 링크 .75 · 보조·노트·메타·kicker·저작권 .7 · 비활성 .5. 같은 .7끼리는 자간이 위계를 맡는다. 호버하면 1.

**반응형**
- 모든 단계가 clamp라 따로 미디어 쿼리를 두지 않는다. 480px 이하에서 히어로 한 줄이 넘치면 hero 대신 title 단계로 내린다.
- `-webkit-text-size-adjust: 100%`로 모바일 자동 확대를 막는다.

**접근성**
- 제목 단계는 문서 구조(h1 하나, h2·h3 순서)와 맞춘다. 크기 때문에 제목 레벨을 건너뛰지 않는다.
- 사용자가 브라우저 글자 크기를 키우면 rem 기반이라 함께 커진다. px 고정 크기를 쓰지 않는다.
- 글자는 .7 아래로 옅게 하지 않는다(.5는 비활성 요소 전용).
- 글자 크기는 `--mp-size-*`만 — 모두 Mulmaru 12px 격자의 정수배(12·24·36·48·72px). `clamp()`·`vw`·`0.85em`처럼 격자를 벗어난 크기는 픽셀을 뭉갠다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 단계별 크기·자간·투명도 |
| 링크 호버·포커스 | opacity → 1 (색·굵기 변화 없음) |
| 선택(드래그) | `::selection` 배경 `--mp-ink`, 글자 `--mp-bg` |
| 서체 로딩 전 | `sans-serif` 폴백, 레이아웃이 크게 흔들리지 않게 `font-display: swap` |

## 데모
```html demo
<div class="mp-typography">
  <span class="mp-typography-title">가</span>
  <span class="mp-typography-heading">가</span>
  <span class="mp-typography-body">가</span>
  <span class="mp-typography-meta">가</span>
  <span class="mp-typography-fine">가</span>
</div>
```

## 코드
```css
.mp-typography { display: flex; align-items: baseline; gap: 1.2em; font-family: var(--mp-font); }
.mp-typography-title { font-size: var(--mp-size-title); letter-spacing: var(--mp-tracking-title); line-height: var(--mp-leading-title); }
.mp-typography-heading { font-size: var(--mp-size-heading); letter-spacing: var(--mp-tracking-heading); }
.mp-typography-body { font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body); opacity: var(--mp-opacity-body); }
.mp-typography-meta { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-typography-fine { font-size: var(--mp-size-fine); letter-spacing: var(--mp-tracking-fine); opacity: var(--mp-opacity-fine); }

/* 페이지 기반 */
body { font-family: var(--mp-font); font-weight: 400; font-size: var(--mp-size-body); line-height: var(--mp-leading-body); letter-spacing: var(--mp-tracking-body); -webkit-text-size-adjust: 100%; }
h1, h2, h3, h4, h5, h6, strong, b, th { font-weight: 400; }
em, i { font-style: normal; }
code, pre, kbd, button, input, select, textarea { font: inherit; }
p { max-width: var(--mp-width-para); word-break: keep-all; }
::selection { background: var(--mp-ink); color: var(--mp-bg); }
```

## 앱
- Mulmaru 폰트 파일을 번들하고 SwiftUI `Font.custom("Mulmaru", size: s, relativeTo: .body)`, Compose `FontFamily(Font(R.font.mulmaru, FontWeight.Normal))`로 한 곳에서 정의한다.
- 크기 10단계를 앱 상수로 옮긴다(예: title 28, heading 22, subheading 20, lead 17, body 16, small 14, kicker 13, meta 12, fine 12 pt/sp). 자간은 em 값에 크기를 곱해 `tracking`/`letterSpacing`으로.
- `.bold()`, `.fontWeight(.semibold)`, `FontWeight.Bold`, `.italic()`을 쓰지 않는다. 내비게이션 제목·탭 라벨처럼 시스템 서체로 떨어지는 곳도 Mulmaru로 바꾼다.
- Dynamic Type·글꼴 크기 설정은 따른다(`relativeTo:`, sp 단위).
- OS 예외: 시스템 알림·공유 시트·키보드·시스템 알림창 글자는 OS 서체 그대로.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 크기와 자간을 같은 이름으로 짝지어 쓴다. 위계는 크기 단계와 opacity로 만든다. 본문 행간 2.1, 문단 30em 이하. 모든 폼 요소에 `font: inherit`.
- 하지 말 것: 굵게·기울임, 두 번째 서체(코드용 monospace 포함), `14px`·`2rem` 같은 임의 크기, 회색 글자색, 행간 1.5 이하 본문, 대문자 변환으로 강조, 밑줄로 강조.
