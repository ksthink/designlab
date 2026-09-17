---
id: back-link
name: 뒤로가기 링크
nameEn: Back Link
category: navigation
summary: 상위로 돌아가는 옅은 `< metaphr` 글자 링크. 호버하면 투명도가 1이 된다.
aliases: [뒤로가기, 뒤로 가기, 돌아가기, back, back link, 상위로, 이전 페이지, "< metaphr"]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev app.html .back, design_lab Base.astro .back
pillars: [minimalism, pixel-art]
tokens: [--mp-size-kicker, --mp-tracking-meta, --mp-opacity-meta, --mp-font, --mp-ink, --mp-duration-hover, --mp-opacity-nav, --mp-opacity-muted]
effects: []
related: [header, breadcrumb, link, terminal-vocabulary]
---

## 용도
상세 페이지에서 상위(홈, 목록)로 돌아가는 길 하나. 페이지 맨 위 왼쪽에 둔다.
단계가 셋 이상이면 `breadcrumb`. 브라우저 방문 기록(`history.back()`)이 아니라 **정해진 상위 주소**로 가는 링크다.
design_lab은 외부 사이트 metaphr.dev로 나가는 링크로 같은 모양을 쓴다.

**함께 쓰는 요소**
- `header`: 머리 1줄 왼쪽이 자리다. 오른쪽에는 테마 토글(`text-action`)이 온다
- `breadcrumb`: 두 단계면 `back-link`, 세 단계 이상이면 `breadcrumb` — 한 화면에 둘을 함께 두지 않는다
- `menu`: 메뉴가 있는 머리에서도 뒤로가기는 메뉴 밖, 1줄에 따로 둔다(메뉴 항목으로 넣지 않는다)
- `page-read`: 상세 읽기 페이지에서는 제목 위 `clamp(3rem, 10vh, 6rem)` 떨어진 자리

## 생김새
**모양**
- 글자 `< ` + 가는 곳 이름: `< metaphr`, `< 목록`. 화살표 아이콘·`‹`·`←` 대신 `<` 글자와 공백 한 칸
- `--mp-size-kicker`, 자간 `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`
- 밑선·테두리·배경 없음, `var(--mp-font)` 400, 색 `--mp-ink`
- `display: inline-block` — 줄 전체가 링크가 되지 않게

**크기·간격**
- metaphr.dev 상세(app.html): 링크 아래 여백 `clamp(3rem, 10vh, 6rem)`으로 제목과 크게 떨어뜨린다
- design_lab 머리: `header` 1줄 왼쪽, 오른쪽 테마 토글과 `baseline` 정렬
- 목적지 이름은 1–2단어. 길면 상위 이름을 줄여 쓴다("< 요소")

**반응형**
- 크기는 `--mp-size-kicker`의 `clamp`로 자동 조절, 줄바꿈하지 않는다(`white-space: nowrap`)
- 터치 기기: 글자가 작으므로 `padding: 0.7em 0.5em; margin: -0.7em -0.5em`으로 누를 곳을 44px 이상 확보하고 배치는 그대로 둔다
- `(hover: none)`에서는 옅은 상태 그대로 둔다(눌림 동안 opacity 1)

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | `--mp-opacity-meta`(0.55) |
| 호버·포커스 | opacity 1, `--mp-duration-hover` ease |
| 누름 | opacity 1 |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 방문함 | 기본과 같다 |
| 상위 없음(홈) | 두지 않는다. 흐리게 비활성으로 남기지 않는다 |

## 동작
- opacity만 `--mp-duration-hover`(0.25s) ease. 왼쪽으로 밀리는 움직임·화살표 이동 없음
- 누르면 상위 주소로 일반 이동. 스크롤 위치 복원은 브라우저에 맡긴다

**접근성**
- 요소는 `<a href="상위 주소">`. 버튼(`<button onclick="history.back()">`)으로 만들지 않는다
- 스크린리더가 `<`를 "보다 작음"으로 읽으므로 `<` 는 `<span aria-hidden="true">&lt;</span>`로 감싸거나 `aria-label="metaphr로 돌아가기"`를 준다
- 포커스 순서: 건너뛰기 링크 다음, 머리에서 첫 번째
- 키보드: `Tab`으로 도달, `Enter`로 이동. 따로 단축키를 두지 않는다
- 필수 정보가 아니라 보조 길이라 0.55를 허용한다. 유일한 이동 수단이면 `--mp-opacity-nav`(0.7)로 올린다

**reduced-motion**
- transition 없이 즉시 opacity 1

## 데모
```html demo
<div class="mp-back-link-row">
  <a class="mp-back-link" href="#"><span aria-hidden="true">&lt;</span> mp</a>
  <a class="mp-back-link is-hover" href="#"><span aria-hidden="true">&lt;</span> mp</a>
</div>
```

## 코드
```css
.mp-back-link-row { display: flex; flex-wrap: wrap; gap: 1em 2.4em; }
.mp-back-link {
  display: inline-block; white-space: nowrap; color: var(--mp-ink); text-decoration: none;
  font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-meta);
  opacity: var(--mp-opacity-meta); transition: opacity var(--mp-duration-hover) ease;
}
.mp-back-link:hover, .mp-back-link:focus-visible, .mp-back-link:active, .mp-back-link.is-hover { opacity: 1; }
.mp-back-link:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@media (hover: none) { .mp-back-link { padding: 0.7em 0.5em; margin: -0.7em -0.5em; } }
@media (prefers-reduced-motion: reduce) { .mp-back-link { transition: none; } }
/* metaphr.dev 상세 페이지: .mp-back-link { margin-bottom: clamp(3rem, 10vh, 6rem); } */
```

## 앱
- 앱은 시스템 뒤로 동작(iOS 가장자리 스와이프, 안드로이드 뒤로 제스처·버튼)을 막지 않는다.
- SwiftUI: 시스템 `NavigationStack` 뒤로 버튼을 쓰면 OS 모양 그대로(예외). 직접 그린 머리에서만 `Button { dismiss() } label: { Text("< 목록") }.opacity(0.55)`, `.navigationBarBackButtonHidden(true)`로 둘이 겹치지 않게.
- Compose: `TopAppBar(navigationIcon = { TextButton(onClick = onBack, shape = RectangleShape) { Text("< 목록") } })`, 기본 `ArrowBack` 아이콘 대신 글자. `BackHandler`는 시스템 뒤로와 같은 동작으로.
- 터치 영역 44pt/48dp, `accessibilityLabel("목록으로 돌아가기")`.

```swift
// 직접 그린 머리에서만. 시스템 뒤로 버튼과 겹치지 않게 숨긴다
Button { dismiss() } label: {
  Text("< 목록").font(.custom("Mulmaru", size: 14)).tracking(1.1)
}
.buttonStyle(.plain)
.opacity(isPressed ? 1 : 0.55)
.frame(minWidth: 44, minHeight: 44, alignment: .leading)
.accessibilityLabel("목록으로 돌아가기")
// 화면: .navigationBarBackButtonHidden(true)
```

```kotlin
TextButton(
  onClick = onBack,
  shape = RectangleShape,
  contentPadding = PaddingValues(horizontal = 4.dp),
  modifier = Modifier.heightIn(min = 48.dp).semantics { contentDescription = "목록으로 돌아가기" },
) { Text("< 목록", color = ink.copy(alpha = 0.55f), fontFamily = Mulmaru) }
BackHandler(onBack = onBack) // 시스템 뒤로와 같은 목적지
```
- OS 예외: iOS 가장자리 스와이프 뒤로·안드로이드 예측 뒤로(predictive back) 애니메이션은 OS가 그린다. 끄지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: `< ` + 목적지 이름, 옅게(0.55), 호버 opacity 1.
- 해야 할 것: 정해진 상위 주소로 가는 `<a>`, `<`는 스크린리더에서 숨긴다.
- 해야 할 것: 상세 페이지에서는 제목과 넉넉히 띄운다.
- 하지 말 것: 둥근 화살표 아이콘, `←`·`‹` 글리프, 버튼 테두리.
- 하지 말 것: "뒤로" 같은 목적지 없는 말, 투명도 `--mp-opacity-muted` 이하.
- 하지 말 것: 호버 시 왼쪽으로 움직이기, 색 바꾸기, 밑줄.

**자주 틀리는 것**
- `<a href="#" onclick="history.back()">` — 외부에서 바로 들어온 사람은 사이트 밖으로 튕긴다 → 정해진 상위 주소 `href`
- `‹ metaphr`, `← 목록` — metaphr.dev 옛 글리프·화살표 → `< metaphr`(ASCII `<` + 공백)
- 스크린리더가 "보다 작음 metaphr"로 읽음 → `<`를 `aria-hidden` span으로
- 호버에서 밑줄·반전 면을 넣음 → opacity 0.55 → 1만
- 앱에서 시스템 뒤로 버튼과 직접 그린 `< 목록`이 둘 다 보임 → `.navigationBarBackButtonHidden(true)` 또는 직접 그린 것을 뺀다
