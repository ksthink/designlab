---
id: onboarding
name: 온보딩
nameEn: Onboarding
category: patterns
summary: 첫 실행에 꼭 필요한 한두 화면만. 모눈 위 픽셀 그림, 한 문장, [ 시작 ] 버튼 하나, 건너뛰기.
aliases: [온보딩, onboarding, 첫 실행, 튜토리얼, 시작 안내, welcome, 인트로, 가이드 화면, walkthrough]
platforms: [ios, android, web]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-grid-bg, --mp-grid-line, --mp-grid-cell-detail, --mp-pixel-card, --mp-ink, --mp-bg, --mp-opacity-pixel, --mp-size-heading, --mp-tracking-heading, --mp-size-body, --mp-opacity-secondary, --mp-opacity-meta, --mp-size-kicker, --mp-tracking-meta, --mp-border, --mp-line, --mp-line-button, --mp-size-small, --mp-tracking-small, --mp-font, --mp-duration-hover, --mp-duration-caret, --mp-opacity-kicker, --mp-width-para]
effects: [caret, invert-hover, press]
related: [splash, button, text-action, page-indicator, empty-state, microcopy, settings]
---

## 용도
앱을 처음 열었을 때, 쓰기 전에 꼭 알아야 할 것(권한이 필요한 이유, 한 가지 핵심 동작)만 알린다.
기능 소개 여러 장은 만들지 않는다. 가능하면 온보딩 없이 첫 화면의 `empty-state`가 할 일을 안내하게 한다. 업데이트 소식은 온보딩이 아니라 `banner` 한 줄로.

## 생김새
**구조**
- 장(page) 1–3개. 한 장 = 세로 한 줄기, 가운데 정렬
  1. 모눈 판 위 40×40 1비트 픽셀 그림(3×)
  2. 제목 한 문장(끝에 `■` `caret` 허용, 마지막 장만)
  3. 설명 한 줄(선택)
  4. 버튼 하나: 중간 장 `다음`, 마지막 장 `[ 시작 ]`
- 오른쪽 위 `건너뛰기` 글자 버튼(마지막 장에서는 숨김)
- 장이 2개 이상이면 버튼 위에 `page-indicator`(8px 사각 점)
- 권한이 필요한 장: 설명 장 → `[ 허용 ]` 버튼 → OS 권한 대화상자. 옆에 `나중에` 글자 버튼
- 끝나면 완료 값을 저장하고 첫 화면으로. 다시 보기는 `settings` "정보" 분류에 한 행

**수치**
- 화면 안쪽: 좌우 `--mp-gutter`(앱 24pt/dp), 위아래 안전 영역 + 24pt/dp
- 그림 판: 폭 100%, `aspect-ratio: 16 / 9`(앱 세로 화면은 `1 / 1`), 모눈 칸 `--mp-grid-cell-detail`, 판 아래 `1.6em`
- 그림: `--mp-pixel-card`(120px, 3×), 태블릿·데스크톱에서 `--mp-pixel-detail`(200px, 5×) — 정수 배율만
- 제목: `--mp-size-heading`, `--mp-tracking-heading`, 최대 폭 `--mp-width-para`, 두 줄 이내
- 설명: `--mp-size-body`, `opacity: var(--mp-opacity-secondary)`, 한 줄(최대 두 줄), 제목 아래 `0.6em`
- 점: 버튼 위 `1.6em`, 점 사이 `0.55rem`
- 버튼: `button` 규칙(padding `0.75em 1.5em`, 1px `--mp-line-button`), 설명 아래 `1.6em`, 앱 하단 고정 시 폭 100%
- 건너뛰기: `--mp-size-kicker`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, 터치 영역 44pt/48dp
- 캐럿 `■`: `0.85em`, `opacity: var(--mp-opacity-kicker)`, `--mp-duration-caret` steps(1, end)

**반응형**
| 폭 | 배치 |
|---|---|
| 390px 이하·iPhone SE/표준·Android compact(600dp 미만) | 그림 판 `1 / 1`, 그림 3×, 버튼 폭 100% 하단 고정(안전 영역 위) |
| 700px | 그림 판 `16 / 9`, 버튼 내용 폭 가운데 |
| 860px 이상·iPad·Android medium(600–840dp) | 가운데 `--mp-width-para` 한 줄기, 그림 5×(`--mp-pixel-detail`) |
| 1180px 이상·Android expanded(840dp 이상) | 같은 한 줄기, 남는 폭은 여백. 2단·여러 장 동시 표시 없음 |
- 세로 높이 600px 미만(가로 모드·iPhone Pro Max 가로): 그림 판 왼쪽 40% + 글자·버튼 오른쪽 2단

**접근성**
- 웹: 장 묶음 `<section aria-roledescription="carousel" aria-label="시작 안내">`, 장마다 `role="group" aria-roledescription="slide" aria-label="1 / 3"`
- 제목은 `<h1>`(장마다 하나), 그림은 장식이면 `aria-hidden="true"`, 뜻이 있으면 `role="img" aria-label`
- 장이 바뀌면 새 제목으로 포커스를 옮긴다(`tabindex="-1"` + `focus()`)
- 키보드: Tab 순서 = 건너뛰기 → 버튼. ←/→로 장 이동, Esc = 건너뛰기
- VoiceOver/TalkBack: 점은 "3장 중 1장" 한 요소로 읽히게, 자동 넘김 없음. 스와이프 대신 버튼으로도 모든 장 이동 가능
- Dynamic Type: 가장 큰 크기에서 그림 판을 숨기고 글자·버튼 우선
- 캐럿·스와이프 애니메이션은 reduced-motion에서 정지
- 장 전환 알림: 웹은 제목 포커스로 읽히게 하고, 앱은 iOS `UIAccessibility.post(notification: .screenChanged, argument: title)`, Android `Modifier.semantics { liveRegion = LiveRegionMode.Polite }` 또는 `announceForAccessibility("2 / 3, 기록")`
- 대비: 글자·버튼 slate/paper 10.9:1, 건너뛰기(.7)는 보조 — 장을 넘기는 유일한 수단으로 두지 않는다

**조합 규칙**
- 흐름: `splash` → 온보딩(첫 실행만) → 첫 화면. 첫 화면이 비어 있으면 `empty-state`가 다음 할 일을 말한다 — 온보딩에서 같은 말을 반복하지 않는다.
- 캐럿 `■`는 마지막 장 하나에만. orange는 온보딩에서 쓰지 않는 것을 기본으로 하고, 쓰면 그림 안 픽셀 점 하나.
- 권한 장 뒤 OS 대화상자(예외) → 거부해도 다음 장. 나중에 필요할 때 `settings`의 권한 행이 OS 설정으로 보낸다.
- 버튼은 `button`, 건너뛰기는 `text-action` 규칙, 점은 `page-indicator` 규칙을 그대로 쓴다.

## 상태
| 상태 | 표현 |
|---|---|
| 첫 장 | 건너뛰기 보임, 점 첫 칸 채움, 버튼 `다음` |
| 중간 장 | 점 해당 칸 채움 |
| 마지막 장 | 건너뛰기 숨김, 버튼 `[ 시작 ]`, 제목 끝 `■` 캐럿 |
| 버튼 호버·포커스 | 잉크/배경 반전(`invert-hover`) |
| 버튼 누름 | 1px 아래 이동(`press`), 앱은 반전 |
| 권한 요청 중 | 버튼 비활성(`opacity: var(--mp-opacity-muted)`), OS 대화상자 표시 |
| 권한 거부 | 다음 장으로 그대로 진행. 막지 않는다. 필요한 순간에 다시 설명 |
| 완료 | 저장 후 첫 화면, 다시 표시하지 않음 |

## 동작
- 장 넘김: 웹은 즉시 교체, 앱은 스와이프 스냅(OS 페이저 기본, 튕김 없음). 자동 넘김 없음.
- 마지막 장 제목 끝 `caret`(`--mp-duration-caret`, steps(1, end)). 한 화면에 캐럿 하나.
- 버튼: `invert-hover` `--mp-duration-hover`, `press`.
- reduced-motion: 캐럿 켜진 채 정지, 장 전환 즉시.

## 데모
```html demo
<div class="mp-onboarding">
  <span class="mp-onboarding-skip">건너뛰기</span>
  <div class="mp-onboarding-art"><span style="--src:url(/v1/icons/minute.png)" aria-hidden="true"></span></div>
  <p class="mp-onboarding-title">기록</p>
  <div class="mp-onboarding-dots" aria-hidden="true"><i class="is-on"></i><i></i><i></i></div>
  <div class="mp-onboarding-actions">
    <button class="mp-onboarding-btn" type="button">다음</button>
    <button class="mp-onboarding-btn is-hover" type="button">[ 시작 ]</button>
  </div>
</div>
```

## 코드
```css
.mp-onboarding { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; }
.mp-onboarding-skip {
  align-self: flex-end; margin-bottom: 0.8em;
  font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta);
}
.mp-onboarding-art {
  width: 100%; aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; margin-bottom: 1.6em;
  background-color: var(--mp-grid-bg);
  background-image: linear-gradient(var(--mp-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: var(--mp-grid-cell-detail) var(--mp-grid-cell-detail);
}
.mp-onboarding-art span {
  width: var(--mp-pixel-card); height: var(--mp-pixel-card); background: var(--mp-ink); opacity: var(--mp-opacity-pixel);
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
.mp-onboarding-title { max-width: var(--mp-width-para); margin: 0; font-size: var(--mp-size-heading); letter-spacing: var(--mp-tracking-heading); }
.mp-onboarding-title::after {
  content: "■"; margin-left: 0.35em; opacity: var(--mp-opacity-kicker);
  animation: mp-onboarding-caret var(--mp-duration-caret) steps(1, end) infinite;
}
@keyframes mp-onboarding-caret { 50% { opacity: 0; } }
.mp-onboarding-desc { margin: 0.6em 0 0; font-size: var(--mp-size-body); opacity: var(--mp-opacity-secondary); }
.mp-onboarding-dots { display: flex; gap: 0.55rem; margin-top: 1.6em; }
.mp-onboarding-dots i { width: 8px; height: 8px; box-sizing: border-box; border: var(--mp-border) solid var(--mp-line); }
.mp-onboarding-dots i.is-on { background: var(--mp-ink); border-color: var(--mp-ink); opacity: var(--mp-opacity-meta); }
.mp-onboarding-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.8em; margin-top: 1.6em; }
.mp-onboarding-btn {
  padding: 0.75em 1.5em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink); cursor: pointer;
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-onboarding-btn:hover, .mp-onboarding-btn:focus-visible, .mp-onboarding-btn.is-hover { background: var(--mp-ink); color: var(--mp-bg); }
.mp-onboarding-btn:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-onboarding-btn:active { transform: translateY(1px); }
@media (max-width: 480px) { .mp-onboarding-art { aspect-ratio: 1 / 1; } .mp-onboarding-btn { width: 100%; } }
@media (prefers-reduced-motion: reduce) {
  .mp-onboarding-title::after { animation: none; }
  .mp-onboarding-btn { transition: none; }
}
```
캐럿은 마지막 장 제목에만 붙인다(데모는 한 장만 보인다).

## 앱
- SwiftUI: 기본 원형 점은 끄고 사각 점을 직접 그린다.
  ```swift
  TabView(selection: $page) { ForEach(0..<3) { OnboardingPage(i: $0).tag($0) } }
    .tabViewStyle(.page(indexDisplayMode: .never))
  HStack(spacing: 9) { ForEach(0..<3) { i in
    Rectangle().fill(i == page ? ink.opacity(0.7) : .clear)
      .frame(width: 8, height: 8).overlay(Rectangle().stroke(line, lineWidth: 1)) } }
    .accessibilityElement().accessibilityLabel("3장 중 \(page + 1)장")
  // 완료: @AppStorage("onboarded") var onboarded = false → .fullScreenCover(isPresented: !onboarded)
  ```
- Compose: reduced-motion(`ANIMATOR_DURATION_SCALE == 0`)이면 `scrollToPage`로 즉시.
  ```kotlin
  val state = rememberPagerState { 3 }
  HorizontalPager(state) { OnboardingPage(it) }
  Row(Modifier.semantics(mergeDescendants = true) { contentDescription = "3장 중 ${state.currentPage + 1}장" }) {
    repeat(3) { i -> Box(Modifier.size(8.dp).border(1.dp, Line, RectangleShape)
      .background(if (i == state.currentPage) Ink.copy(alpha = 0.7f) else Color.Transparent)) }
  }
  ```
- 그림: `Image.interpolation(.none)` / `FilterQuality.None`, 정수 배율 120·200.
- 버튼은 `button` 문서의 직각 스타일. 하단 고정 버튼 폭 100%, 안전 영역 위.
- OS 예외: 알림·위치·추적(App Tracking Transparency)·사진 권한 대화상자는 OS 모양 그대로. 권한 요청 전 설명 장을 반드시 먼저 보인다. Android 13 알림 권한도 같다.
- 스플래시(`splash`) → 온보딩 → 첫 화면 순서. 로그인이 필요하면 온보딩 마지막 장 다음에.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 장은 3개 이하, 장마다 한 문장.
- 해야 할 것: 언제든 건너뛸 수 있게, 건너뛰어도 앱이 정상 동작하게.
- 해야 할 것: 권한은 이유를 먼저 말하고, 거부해도 진행한다.
- 해야 할 것: 완료를 저장해 다시 보이지 않게, 설정에서 다시 볼 수 있게.
- 해야 할 것: 문구는 `microcopy` 규칙(합쇼체, 짧게, 느낌표 없음).
- 하지 말 것: 5장 넘는 기능 투어, 자동 넘김, 무한 반복.
- 하지 말 것: 사진·3D·벡터 일러스트, 픽셀 그림을 정수배가 아닌 크기로.
- 하지 말 것: 장마다 다른 배경색, orange 면 전체 화면.
- 하지 말 것: 원형 점 인디케이터, 튕기는 스프링 전환.
- 하지 말 것: 느낌표·이모지 문구, 첫 실행에 회원가입 강제.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 기능 소개 5장 + 자동 넘김 | 1–3장, 사용자가 넘긴다 |
| 첫 실행 즉시 OS 권한 대화상자 | 이유 장 → `[ 허용 ]` → OS 대화상자, 거부해도 진행 |
| 원형 점 인디케이터 | 8px 사각 점(`page-indicator`) |
| 건너뛰기 없음, 스와이프로만 이동 | 건너뛰기 + 버튼으로도 모든 장 이동 |
| 매 실행마다 다시 표시 | 완료 저장, 설정 "정보"에서 다시 보기 |
