---
id: header
name: 머리
nameEn: Header
category: navigation
summary: 페이지 맨 위의 글자뿐인 머리. 뒤로가기·테마 토글 한 줄, 브랜드·메뉴 한 줄, 막대·배경·그림자가 없다.
aliases: [헤더, 머리, 상단 바, 상단바, 앱 바, 앱바, app bar, top bar, navbar, 네비게이션 바, GNB, 툴바, toolbar, 타이틀 바]
platforms: [web, ios, android]
status: extracted
source: design_lab Base.astro .top (.top-row · .top-main · .brand), metaphr.dev app.html .back
pillars: [minimalism]
tokens: [--mp-duration-fade, --mp-size-kicker, --mp-tracking-meta, --mp-opacity-meta, --mp-size-subheading, --mp-tracking-subheading, --mp-opacity-brand, --mp-line, --mp-size-meta, --mp-opacity-muted, --mp-width-list, --mp-width-read, --mp-gutter, --mp-section-lg, --mp-bg, --mp-opacity-nav, --mp-line-strong, --mp-duration-hover, --mp-ink, --mp-border, --mp-font, --mp-size-small, --mp-tracking-small, --mp-secondary]
effects: [invert-hover]
related: [menu, back-link, text-action, theme-switch, drawer, tab-bar]
---

## 용도
모든 페이지 맨 위에 하나. 어디에 있는지(브랜드), 어디로 갈 수 있는지(`menu`), 밖으로 나가는 길(`back-link`)을 준다.
홈의 첫 화면(`hero`)처럼 머리를 숨기는 화면은 브랜드·링크를 늦게 드러내는 것도 허용한다(metaphr.dev는 `--mp-duration-fade`로 나타난다).
페이지 제목(h1)은 머리에 넣지 않고 본문 맨 위에 둔다.

**함께 쓰는 요소**
- 2줄 오른쪽에 `menu`. 560px 미만에서 메뉴가 두 줄을 넘으면 `[ 메뉴 ]` 버튼 + `drawer`로 접는다
- 1줄 왼쪽 `back-link`, 오른쪽 `theme-switch`(`text-action` 모양). 행동 버튼은 최대 2개
- 앱에서 주 화면 전환은 머리가 아니라 `tab-bar`가 맡는다. 머리에는 제목과 행동만
- teal ■ 현재 표시는 머리 메뉴 안에서 하나. orange 강조는 머리에 두지 않는다

## 생김새
**구조**
- `<header>` 안에 두 줄. 막대·배경색·아래 그림자 없음 — 글자만
- 1줄(`top-row`): 왼쪽 `back-link`(`< metaphr`), 오른쪽 테마 토글 `[ 시스템 ]`(`text-action`). 둘 다 `--mp-size-kicker`, 자간 `--mp-tracking-meta`, `--mp-opacity-meta`
- 2줄(`top-main`): 왼쪽 브랜드(`--mp-size-subheading`, 자간 `--mp-tracking-subheading`, `--mp-opacity-brand`), 오른쪽 `menu`
- 필요하면 아래에 1px `--mp-line` 구분선 하나(design_lab의 AI 안내 줄, `--mp-size-meta` `--mp-opacity-muted`)

**크기·간격**
- 폭은 본문과 같다: `max-width: var(--mp-width-list)`(목록형) 또는 `--mp-width-read`(읽기형), 좌우 `--mp-gutter`
- 위 여백 `clamp(1.5rem, 5vw, 3rem)`
- 1줄: `align-items: baseline; justify-content: space-between; gap: 1em`
- 2줄: 1줄과 간격 `clamp(1.6rem, 5vh, 2.6rem)`, `gap: 0.9em 2em`, `flex-wrap: wrap`
- 구분선 줄: 위 간격 `clamp(1.1rem, 3vh, 1.6rem)`, `padding-top: 0.8em`
- 본문과의 간격은 본문 쪽 `padding-top: var(--mp-section-lg)`

**반응형**
- 560px 이상: 2줄이 브랜드와 메뉴를 한 줄에, 넘치면 `flex-wrap`으로 메뉴가 브랜드 아래로
- 560px 미만: 메뉴가 두 줄을 넘으면 `menu`의 `[ 메뉴 ]` 버튼으로 접고 `drawer`로 연다. 버튼은 브랜드 오른쪽, 같은 기준선
- 고정(sticky) 머리는 기본으로 쓰지 않는다. 긴 앱 화면처럼 꼭 필요하면 배경 `--mp-bg` + 아래 1px `--mp-line`만, 높이는 1줄로 줄인 형태
- 터치 기기: 뒤로가기·토글의 누를 곳을 `padding`으로 44px 이상 확보
- iOS 노치: `padding-top: max(clamp(1.5rem, 5vw, 3rem), env(safe-area-inset-top))`

## 상태
| 대상 | 기본 | 호버·포커스 | 현재 |
|---|---|---|---|
| 뒤로가기 | `--mp-opacity-meta`(0.55) | opacity 1 | — |
| 테마 토글 | `--mp-opacity-meta` | opacity 1 | 글자가 상태를 말한다 `[ 다크 ]` |
| 브랜드 | `--mp-opacity-brand`(0.8) | opacity 1 | 홈이면 `aria-current="page"`, 모양 그대로 |
| 메뉴 링크 | `--mp-opacity-nav`(0.7) | opacity 1 | teal ■ + opacity 1 + `--mp-line-strong` 밑선 |
| 고정 머리 스크롤 중 | 모양 그대로 | — | — |

## 동작
- 투명도만 `--mp-duration-hover`(0.25s) ease
- 스크롤에 따라 줄어들거나 숨거나 색이 바뀌지 않는다
- 홈 첫 화면에서 늦게 드러낼 때는 opacity 0 → 값, `--mp-duration-fade`(0.6s) ease

**접근성**
- 요소는 `<header>`(랜드마크 banner), 메뉴는 `<nav aria-label="주 메뉴">`
- 맨 앞에 `<a class="skip" href="#main">본문으로 건너뛰기</a>` — 평소 화면 밖, 포커스 받으면 보인다(배경 `--mp-ink`, 글자 `--mp-bg`)
- 포커스 순서: 건너뛰기 → 뒤로가기 → 테마 토글 → 브랜드 → 메뉴 링크 → 본문. DOM 순서와 보이는 순서를 같게 한다
- 테마 토글은 `<button>`, `aria-label="화면 테마: 다크 — 눌러서 바꾸기"`
- 브랜드 링크 글자가 곧 이름이다. 로고 이미지를 쓰면 `alt="metaphr"`
- 포커스 링 `outline: 1px solid var(--mp-ink); outline-offset: 3px`

**reduced-motion**
- transition·등장 페이드를 끄고 최종 상태만

## 데모
```html demo
<header class="mp-header">
  <div class="mp-header-row">
    <a class="mp-header-quiet" href="#">&lt; mp</a>
    <button class="mp-header-quiet is-hover" type="button">[ 다크 ]</button>
  </div>
  <div class="mp-header-main">
    <a class="mp-header-brand" href="#">brand</a>
    <nav class="mp-header-nav" aria-label="주 메뉴">
      <a href="#" aria-current="page">현재</a><a href="#" class="is-hover">호버</a><a href="#">기본</a>
    </nav>
  </div>
</header>
```

## 코드
```css
.mp-header { padding-top: clamp(1.5rem, 5vw, 3rem); padding-bottom: 1em; border-bottom: var(--mp-border) solid var(--mp-line); }
.mp-header a { color: var(--mp-ink); text-decoration: none; }
.mp-header-row { display: flex; align-items: baseline; justify-content: space-between; gap: 1em; }
.mp-header-quiet {
  padding: 0.2em 0; border: 0; background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-kicker) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  cursor: pointer; opacity: var(--mp-opacity-meta); transition: opacity var(--mp-duration-hover) ease;
}
.mp-header-main { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.9em 2em; margin-top: clamp(1.6rem, 5vh, 2.6rem); }
.mp-header-brand { font-size: var(--mp-size-subheading); letter-spacing: var(--mp-tracking-subheading); opacity: var(--mp-opacity-brand); transition: opacity var(--mp-duration-hover) ease; }
.mp-header-nav { display: flex; flex-wrap: wrap; gap: 0.4em 1.4em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-header-nav a { padding-bottom: 0.15em; border-bottom: var(--mp-border) solid transparent; opacity: var(--mp-opacity-nav); transition: opacity var(--mp-duration-hover) ease; }
.mp-header-nav a[aria-current="page"] { opacity: 1; border-bottom-color: var(--mp-line-strong); }
.mp-header-nav a[aria-current="page"]::before { content: ""; display: inline-block; width: 0.5em; height: 0.5em; margin-right: 0.45em; vertical-align: 0.12em; background: var(--mp-secondary); }
.mp-header-quiet:hover, .mp-header-brand:hover, .mp-header-nav a:hover,
.mp-header-quiet:focus-visible, .mp-header-brand:focus-visible, .mp-header-nav a:focus-visible,
.mp-header-quiet.is-hover, .mp-header-nav a.is-hover { opacity: 1; }
.mp-header a:focus-visible, .mp-header-quiet:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .mp-header-quiet, .mp-header-brand, .mp-header-nav a { transition: none; } }
```

## 앱
- SwiftUI: `.toolbarBackground(bg)`, `.toolbarBackgroundVisibility(.visible)`, 제목은 `ToolbarItem(placement: .principal) { Text(title).font(mulmaru) }`. 큰 제목(`.large`)은 쓰지 않는다(`.navigationBarTitleDisplayMode(.inline)`).
- Compose: `TopAppBar(colors = TopAppBarDefaults.topAppBarColors(containerColor = bg, scrolledContainerColor = bg))`, 스크롤 시 elevation·색 변화 끄기, 아래 1px `line`은 `HorizontalDivider(thickness = 1.dp)`.
- 오른쪽 행동은 `text-action` `[ 편집 ]` 또는 `icon-button`, 최대 2개.
```swift
NavigationStack {
  Content()
    .navigationBarTitleDisplayMode(.inline)
    .toolbarBackground(Color.mpBg, for: .navigationBar)
    .toolbarBackgroundVisibility(.visible, for: .navigationBar)
    .toolbar {
      ToolbarItem(placement: .principal) { Text("기록").font(.custom("Mulmaru", size: 17)) }
      ToolbarItem(placement: .topBarTrailing) { Button("[ 편집 ]") { }.buttonStyle(.plain) }
    }
}
```
```kotlin
Column {
  TopAppBar(
    title = { Text("기록", fontFamily = Mulmaru, fontWeight = FontWeight.Normal) },
    actions = { TextButton(onClick = {}, shape = RectangleShape) { Text("[ 편집 ]", fontFamily = Mulmaru) } },
    colors = TopAppBarDefaults.topAppBarColors(containerColor = MpBg, scrolledContainerColor = MpBg),
  )
  HorizontalDivider(thickness = 1.dp, color = MpLine)
}
```
- OS 예외(모양을 바꾸지 않는다): 상태 표시줄·다이내믹 아일랜드 영역, iOS 26 이상 시스템 내비게이션 바의 유리 뒤로 버튼, `NavigationSplitView` 사이드바 토글, 안드로이드 predictive back 미리보기.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 글자만, 본문과 같은 폭과 좌우 여백.
- 해야 할 것: 브랜드 0.8 · 메뉴 0.7 · 뒤로가기 0.55의 투명도 위계를 지킨다.
- 해야 할 것: 건너뛰기 링크, `<header>`·`<nav>` 랜드마크, 라이트·다크 모두 변수로.
- 하지 말 것: 색 막대 머리, 아래 그림자, 흐림 유리 배경.
- 하지 말 것: 스크롤하면 줄어들거나 숨는 머리, 머리에 orange 강조.
- 하지 말 것: 머리에 검색창·버튼을 여러 개 늘어놓기, 브랜드 로고를 상자 위에 올리기.

**자주 틀리는 것**
- `position: sticky` 머리에 아래 그림자를 준다 → 그림자 대신 1px `--mp-line` 하나
- 스크롤하면 머리 배경을 반투명 흐림으로 바꾼다 → 배경 `--mp-bg` 그대로, 변화 없음
- 브랜드를 `<h1>`로 만든다 → 브랜드는 링크, `<h1>`은 본문 페이지 제목
- 건너뛰기 링크를 `display: none`으로 숨긴다 → 화면 밖으로 옮기고 포커스 때 보이게
- 머리 폭을 화면 전체로 늘린다 → 본문과 같은 `--mp-width-list`/`--mp-width-read`
- 안드로이드 `TopAppBar` 스크롤 시 색이 바뀐다 → `scrolledContainerColor`도 bg
