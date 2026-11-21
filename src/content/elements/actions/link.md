---
id: link
name: 링크
nameEn: Link
category: actions
summary: 다른 곳으로 이동하는 글자. 1px 밑줄 헤어라인, 호버하면 투명도 1 또는 잉크/배경 반전.
aliases: [링크, 하이퍼링크, 텍스트 링크, a 태그, anchor, hyperlink, 밑줄 링크, 푸터 링크, 이메일 링크]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .foot-links a · .nav-blog.fx-fill, design_lab Base.astro .prose a
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-ink, --mp-font, --mp-size-body, --mp-leading-body, --mp-opacity-body, --mp-line-strong, --mp-size-small, --mp-tracking-small, --mp-opacity-link, --mp-line, --mp-bg, --mp-duration-hover, --mp-duration-fill, --mp-steps-fill]
effects: [invert-hover, fx-fill]
related: [button, back-link, menu, text-action]
---

## 용도
페이지나 외부 주소로 **이동**할 때 쓴다. 무언가를 실행하면(저장, 삭제, 열기·닫기) `button`을 쓴다.
세 종류가 있다: 본문 속 링크, 목록형 링크(푸터·연락처·자원 목록), 한 화면에 하나뿐인 강조 링크(`fx-fill`).
상위로 돌아가는 링크는 `back-link`, 주요 페이지 목록은 `menu`를 쓴다.

**함께 쓰는 요소**
- 본문 링크 + `page-read`: 읽기 폭 760px 안의 문단 링크는 모두 본문 링크 모양
- 목록형 링크 + `footer`: 푸터 링크 줄, 이메일은 그 줄에서 유일한 `fx-fill` 강조 링크
- `link`(`fx-fill`) + orange 강조: `fx-fill`은 잉크 반전이라 강조색을 쓰지 않는다. 화면의 orange 하나와 별개로 `fx-fill` 링크도 화면당 하나
- 카드 전체가 링크인 `card`는 카드 안 글자에 밑선을 긋지 않는다(링크 안에 링크 금지)
- `menu`·`back-link`·`breadcrumb`은 링크의 특수형. 같은 줄에 일반 목록형 링크를 섞지 않는다

## 생김새
**공통**
- 기본 밑줄(`text-decoration`)을 끄고 `border-bottom: var(--mp-border) solid …`로 1px 선을 긋는다
- 글자색은 `inherit`(= `--mp-ink`). 링크만 다른 색을 쓰지 않는다
- 서체 `--mp-font` 400, 굵게·기울임 없음

**본문 링크**
- 글자 크기·행간·투명도는 둘러싼 문단을 따른다(`--mp-size-body`, `--mp-leading-body`, `--mp-opacity-body`)
- 밑선 `--mp-line-strong`, 글자와 밑선 사이 여백 없음(행간 안에서 그어진다)
- 긴 주소는 `overflow-wrap: anywhere`로 줄을 넘긴다

**목록형 링크**
- `--mp-size-small`, 자간 `--mp-tracking-small`, `opacity: var(--mp-opacity-link)`
- 밑선 `--mp-line`, `padding-bottom: 0.15em`

**강조 링크 (화면당 하나)**
- 밑선 없이 `fx-fill` 구조: `.label` + 8칸 `.fill`
- 채움 면이 글자에 딱 붙지 않게 `.fill`의 `inset: -0.1em -0.15em`

**크기·간격**
- 목록형 링크 사이 `gap: 0.8em 1.6em`(세로·가로)
- 외부 링크 표시는 글자 뒤 ` >` 한 글자. 화살표 아이콘을 따로 그리지 않는다
- 포커스 링 `outline-offset: 3px`

**반응형**
- 좁은 화면에서 목록형 링크는 `flex-wrap: wrap`으로 줄바꿈한다. 가로 스크롤을 만들지 않는다
- 터치 기기(`hover: none`)에서는 누르는 동안(`:active`) 호버와 같은 표현을 준다
- 목록형 링크의 터치 영역은 세로 여백으로 44px 이상 확보한다(글자 크기는 키우지 않는다)

## 상태
| 상태 | 본문 링크 | 목록형 링크 | 강조 링크 |
|---|---|---|---|
| 기본 | 1px `--mp-line-strong` 밑선 | `--mp-opacity-link`, 1px `--mp-line` 밑선 | 글자만 |
| 호버 | 배경 `--mp-ink`, 글자 `--mp-bg` | opacity 1 | 8칸이 계단으로 차오르며 반전 |
| 포커스 | 호버와 같음 + `outline: 1px solid var(--mp-ink)` | 같음 | 같음 |
| 누름 | 호버와 같음 | 호버와 같음 | 호버와 같음 |
| 방문함 | 기본과 같다 | 같음 | 같음 |
| 현재 페이지 | 링크로 두지 않거나 `aria-current="page"` + opacity 1 | 같음 | 쓰지 않음 |

## 동작
- 본문 링크: `invert-hover` — 배경·글자색 `--mp-duration-hover` ease
- 목록형 링크: opacity만 `--mp-duration-hover` ease
- 강조 링크: `fx-fill` — 칸마다 지연 0·90·30·160·60·220·120·280ms, `--mp-duration-fill` `--mp-steps-fill`. 글자색은 `step-end`로 한 번에 바뀐다
- 크기·위치·굵기는 바뀌지 않는다

**접근성**
- 요소는 `<a href>`. 버튼 역할을 하는 링크(`href="#"` + 클릭 처리)를 만들지 않는다
- 링크 글자만 읽어도 목적지를 알 수 있게 쓴다("철학 문서"). "여기", "더 보기" 단독 금지
- 새 창으로 열면 글자 뒤 ` >`와 함께 `aria-label`에 "새 창"을 넣는다
- `fx-fill`의 `.fill`은 `aria-hidden="true"`
- 키보드: `Tab`으로 문서 순서대로 이동, `Enter`로 연다. 포커스 링을 지우지 않는다
- 색이 아니라 밑선으로 링크임을 알린다(대비와 무관하게 구분)
- 현재 페이지를 가리키는 링크는 `aria-current="page"`. 스크린리더가 "현재 페이지"로 읽는다
- 파일 링크(`.json`, `.css`)는 글자에 형식을 드러낸다(`tokens.css`). 다운로드면 `download` 속성

**reduced-motion**
- `prefers-reduced-motion: reduce`이면 모든 transition을 끄고 최종 상태만 보인다

## 데모
```html demo
<div class="mp-link-demo">
  <a class="mp-link" href="#">링크</a>
  <a class="mp-link is-hover" href="#">링크</a>
  <a class="mp-link-quiet" href="#">목록</a>
  <a class="mp-link-quiet is-hover" href="#">목록</a>
  <a class="mp-link-fx is-hover" href="#">
    <span class="label">강조</span>
    <span class="fill" aria-hidden="true"><span style="--d:0ms"></span><span style="--d:90ms"></span><span style="--d:30ms"></span><span style="--d:160ms"></span><span style="--d:60ms"></span><span style="--d:220ms"></span><span style="--d:120ms"></span><span style="--d:280ms"></span></span>
  </a>
</div>
```

## 코드
```css
.mp-link-demo { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.8em 1.6em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }

/* 본문 링크 */
.mp-link { color: inherit; text-decoration: none; overflow-wrap: anywhere; border-bottom: var(--mp-border) solid var(--mp-line-strong); transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease; }
.mp-link:hover, .mp-link:focus-visible, .mp-link:active, .mp-link.is-hover { background: var(--mp-ink); color: var(--mp-bg); }

/* 목록형 링크 */
.mp-link-quiet { color: inherit; text-decoration: none; padding-bottom: 0.15em; border-bottom: var(--mp-border) solid var(--mp-line); opacity: var(--mp-opacity-link); transition: opacity var(--mp-duration-hover) ease; }
.mp-link-quiet:hover, .mp-link-quiet:focus-visible, .mp-link-quiet:active, .mp-link-quiet.is-hover { opacity: 1; }

/* 강조 링크 — 화면당 하나 */
.mp-link-fx { position: relative; color: inherit; text-decoration: none; }
.mp-link-fx .label { position: relative; z-index: 1; transition: color var(--mp-duration-fill) step-end; }
.mp-link-fx .fill { position: absolute; inset: -0.1em -0.15em; z-index: 0; display: grid; grid-template-columns: repeat(8, 1fr); pointer-events: none; }
.mp-link-fx .fill span { background: var(--mp-ink); transform: scaleY(0); transform-origin: bottom; transition: transform var(--mp-duration-fill) var(--mp-steps-fill) var(--d, 0ms); }
.mp-link-fx .fill span:nth-child(even) { transform-origin: top; }
.mp-link-fx:hover .fill span, .mp-link-fx:focus-visible .fill span, .mp-link-fx.is-hover .fill span { transform: scaleY(1); }
.mp-link-fx:hover .label, .mp-link-fx:focus-visible .label, .mp-link-fx.is-hover .label { color: var(--mp-bg); }

.mp-link:focus-visible, .mp-link-quiet:focus-visible, .mp-link-fx:focus-visible { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .mp-link, .mp-link-quiet, .mp-link-fx .label, .mp-link-fx .fill span { transition: none; }
}
```

## 앱
- SwiftUI: `Link` 또는 `Button`에 `.buttonStyle(.plain)`, 밑선은 `.overlay(alignment: .bottom) { Rectangle().frame(height: 1).foregroundStyle(line) }`. `.tint`로 파란색이 번지지 않게 ink를 지정한다.
- Compose: `Text` + `Modifier.clickable` + `drawBehind`로 1px 밑선. `AnnotatedString`의 `LinkAnnotation`은 `TextLinkStyles(style = SpanStyle(color = ink, textDecoration = None))`.
- 터치 기기는 누르는 동안 반전(본문)·opacity 1(목록형)로 대체한다. ripple을 끈다(`indication = null`).
- 앱 안의 이동은 링크 모양, 외부 브라우저로 나가는 것은 글자 뒤 ` >`.
- OS 예외: 시스템 브라우저(SFSafariViewController, Custom Tabs)·공유 시트는 OS 모양 그대로.

```swift
Link(destination: url) {
  Text("철학 문서").font(.custom("Mulmaru", size: 12))
    .foregroundStyle(MP.ink)
    .overlay(alignment: .bottom) { Rectangle().fill(MP.lineStrong).frame(height: 1).offset(y: 2) }
}
.buttonStyle(.plain)
.environment(\.openURL, OpenURLAction { _ in .systemAction })
```

```kotlin
Text(
  "철학 문서", color = MP.ink, fontFamily = Mulmaru,
  modifier = Modifier
    .clickable(interactionSource = source, indication = null) { open(url) }
    .drawBehind { drawLine(MP.lineStrong, Offset(0f, size.height), Offset(size.width, size.height), 1.dp.toPx()) }
    .semantics { role = Role.Button; contentDescription = "철학 문서 열기" },
)
```
- OS 예외 목록: SFSafariViewController·Custom Tabs 화면, 시스템 공유 시트, 메일·전화 앱 전환 확인창

## 해야 할 것 / 하지 말 것
- 해야 할 것: 1px 밑선으로 링크를 알린다.
- 해야 할 것: 호버·포커스는 opacity 1 또는 잉크/배경 반전 둘 중 하나.
- 해야 할 것: 링크 글자는 가는 곳을 말한다("철학 문서", "llms.txt").
- 해야 할 것: `fx-fill` 강조 링크는 화면에 하나만.
- 해야 할 것: 라이트·다크 모두 변수로 자동 대응.
- 하지 말 것: 파란 링크색, teal·orange 글자 링크.
- 하지 말 것: 굵게, 기울임, 방문 후 색 바꾸기.
- 하지 말 것: 호버 시 글자 크기·위치 바꾸기, 밑선 두껍게(2px 이상).
- 하지 말 것: "여기를 누르세요" 같은 목적지 없는 글자.
- 하지 말 것: 실행 동작을 링크로 만들기(→ `button`).

**자주 틀리는 것**
- `text-decoration: underline` 그대로 → 끄고 1px `border-bottom`
- `a:visited` 보라색 남음 → `color: inherit`
- `fx-fill` 링크를 메뉴 전체에 적용 → 화면당 하나
- 호버 시 글자를 orange 강조색으로 → 반전 또는 opacity 1
- SwiftUI `Link` 기본 tint 파랑 → `.foregroundStyle(MP.ink)` 또는 `.tint(MP.ink)`
