---
id: dark-images
name: 테마별 이미지
nameEn: Theme Images
category: patterns
summary: 1비트 단색 그림은 mask로 --mp-ink를 칠해 두 테마에 맞추고, 명암이 있는 워드마크는 테마별 파일로 바꿔 끼운다.
aliases: [테마별 이미지, dark images, 다크 모드 이미지, 다크 로고, 이미지 반전, mask 아이콘, theme image, picture prefers-color-scheme]
platforms: [web, ios, android]
status: extracted
source: design_lab src/data/logos.json rules, src/data/icons.json spec
pillars: [pixel-art, retro-color]
tokens: [--mp-ink, --mp-opacity-pixel, --mp-pixel-card]
effects: []
related: [logo, pixel-icon, image, footer, theme, theme-switch, app-icon]
---

## 용도
이미지가 라이트·다크 두 테마에서 모두 보여야 할 때 쓴다. 이미지 종류에 따라 규칙이 둘로 나뉜다.
- 1비트 단색(잉크 픽셀 + 투명): **mask로 `--mp-ink`를 칠한다**(공식 예외).
- 명암이 있는 비트맵(워드마크, 스크린샷): **칠하지 않고 테마별 파일**을 둔다.
사진처럼 테마와 무관한 이미지는 그대로 두고 1px `--mp-line` 틀만 준다(`image`).

## 생김새
**구분 기준**
| 이미지 | 예 | 방법 |
|---|---|---|
| 1비트 단색 PNG/SVG | `/v1/icons/*.png`(40×40), `/v1/logos/down.svg`(12×6) | mask + `background: var(--mp-ink)` |
| 명암 있는 비트맵 | `/v1/logos/metaphr.svg` | 라이트 `metaphr.svg` / 다크 `metaphr-dark.svg` 교체 |
| 사진·스크린샷 | 앱 화면 캡처 | 테마별 캡처 두 장(가능하면) 또는 그대로 |

**수치 — mask**
- 요소는 빈 `span`(또는 `div`), 크기는 원본의 정수 배율: 40×40 → `--mp-pixel-card`(120px, 3×) · `--mp-pixel-detail`(200px, 5×) · 40px(1×)
- `background: var(--mp-ink); opacity: var(--mp-opacity-pixel)`(.72)
- `-webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: …` — 두 접두사 모두
- 파일 경로는 인라인 변수 `style="--src:url(/v1/icons/rhythm.png)"`
- mask는 보간 영향을 받으므로 크기가 정수 배율일 때만 칸이 선명하다

**수치 — 테마별 파일**
- 두 `img`를 모두 두고 `display`로 하나만 보인다. 두 파일은 같은 `width`/`height` 속성(350×200)
- 워드마크 표시 폭 `clamp(120px, 20vw, 168px)`, `height: auto`, `image-rendering: pixelated`
- 선택자 세 줄: 기본(라이트 보임) · `@media (prefers-color-scheme: dark)` + `:root:not([data-theme="light"])` · `:root[data-theme="dark"]`

**반응형**
| 폭 | 1비트 아이콘 | 워드마크 |
|---|---|---|
| 390px | 카드 3×(120px), 상세 5×(200px) 그대로 — 350px 폭에 들어간다 | 120px(하한) |
| 700px | 같음 | 140px |
| 860px 이상 | 같음 | 168px(상한) |
| 1180px 이상 | 같음 — 화면이 넓다고 6×·8×로 키우지 않는다 | 168px |
- 크기는 정수 배율 단계로만 바꾼다. 중간 값이 필요하면 한 단계 작은 정수 배율(5× → 3×)
- `<picture><source media="(prefers-color-scheme: dark)">`는 수동 `data-theme` 선택을 따르지 못하므로 쓰지 않는다
- 고밀도 화면(DPR 2–3)에서도 CSS 크기는 같다. mask·`pixelated`가 칸을 선명하게 유지한다

**접근성**
- mask span은 그림 자체라 대체 텍스트가 없다. 뜻이 있으면 `role="img" aria-label="이름"`, 장식이면 `aria-hidden="true"`
- 테마별 두 img는 같은 `alt`. 숨긴 쪽은 `display: none`이라 한 번만 읽힌다
- 윈도우 고대비 모드(`forced-colors: active`)에서는 mask 배경이 사라질 수 있다 — `@media (forced-colors: active) { background: CanvasText; }`
- `visibility: hidden`·`opacity: 0`으로 숨기지 않는다 — 스크린리더가 로고를 두 번 읽는다. 반드시 `display: none`
- 두 img 모두 `loading="lazy"`면 숨긴 쪽은 내려받지 않는다(표시될 때 받음)
- 대비: mask 아이콘은 `--mp-ink` × .72라 두 테마 모두 그림 대비 3:1 이상을 지킨다. 투명도를 더 낮추지 않는다

**움직임 줄이기**
- 테마가 바뀔 때 이미지를 페이드로 바꾸지 않는다(원래 즉시). 예외 애니메이션은 `down.svg` 힌트 왕복 하나이며 줄이기에서 정지

**조합 규칙**
- `theme-switch`가 있는 화면은 모든 테마별 이미지가 `[data-theme]` 경로를 가져야 한다
- 한 화면에서 같은 아이콘을 mask와 원본 img로 섞어 쓰지 않는다
- 로고(워드마크)는 푸터 한 곳. mask 아이콘은 카드·상세 그림에
- 아이콘을 강조하고 싶어도 orange로 칠하지 않는다. 강조는 옆에 ■ 하나

## 상태
| 상태 | 표현 |
|---|---|
| 라이트(기본·수동) | mask는 slate, 워드마크 `metaphr.svg` |
| 다크(자동·수동) | mask는 paper, 워드마크 `metaphr-dark.svg` |
| 수동 라이트 + OS 다크 | `:root:not([data-theme="light"])` 조건으로 라이트 유지 |
| 파일 실패 | mask는 빈 칸(대체 글자가 필요하면 부모 모눈 판에 첫 글자), img는 `alt` |
| 문서 견본 | 각 변형을 자기 테마 배경 위에 나란히 보이는 것만 예외로 허용 |

## 데모
```html demo
<div class="mp-dark-images">
  <span class="mp-dark-images-mask" style="--src:url(/v1/icons/inbox.png)" role="img" aria-label="inbox"></span>
  <img class="mp-dark-images-logo mp-dark-images-logo--light" src="/v1/logos/metaphr.svg" alt="metaphr" width="350" height="200">
  <img class="mp-dark-images-logo mp-dark-images-logo--dark" src="/v1/logos/metaphr-dark.svg" alt="metaphr" width="350" height="200">
</div>
```

## 코드
```css
.mp-dark-images { display: flex; align-items: center; gap: 2em; flex-wrap: wrap; }
.mp-dark-images-mask {
  width: var(--mp-pixel-card); height: var(--mp-pixel-card);
  background: var(--mp-ink); opacity: var(--mp-opacity-pixel);
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
@media (forced-colors: active) { .mp-dark-images-mask { background: CanvasText; } }
.mp-dark-images-logo { width: clamp(120px, 20vw, 168px); height: auto; image-rendering: pixelated; }
.mp-dark-images-logo--dark { display: none; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .mp-dark-images-logo--light { display: none; }
  :root:not([data-theme="light"]) .mp-dark-images-logo--dark { display: block; }
}
:root[data-theme="dark"] .mp-dark-images-logo--light { display: none; }
:root[data-theme="dark"] .mp-dark-images-logo--dark { display: block; }
```

## 앱
- iOS: 1비트 아이콘은 Asset Catalog에서 Render As `Template Image`, 워드마크는 Appearances `Any, Dark`로 두 장.
```swift
Image("rhythm").renderingMode(.template).interpolation(.none)
  .resizable().frame(width: 120, height: 120)          // 40 × 3
  .foregroundStyle(Color("Ink")).opacity(0.72)
Image("metaphr").interpolation(.none).resizable().scaledToFit().frame(width: 168) // Any/Dark 자동
```
- Android: 워드마크는 `res/drawable/`과 `res/drawable-night/`에 같은 이름 파일.
```kotlin
Image(painterResource(R.drawable.rhythm), contentDescription = null,
  colorFilter = ColorFilter.tint(ink), filterQuality = FilterQuality.None,
  modifier = Modifier.size(120.dp).alpha(0.72f))
```
- 앱 안 수동 테마(`theme-switch`)를 쓰면 Android는 `AppCompatDelegate.setDefaultNightMode`로 `-night` 리소스가 따라오게 한다.
- 앱 아이콘·스플래시는 OS 규칙을 따른다(`app-icon`, `splash`).

## 해야 할 것 / 하지 말 것
- 해야 할 것: 1비트면 mask, 명암이 있으면 테마별 파일.
- 해야 할 것: 수동(`data-theme`)과 자동(`prefers-color-scheme`) 두 경로를 모두 건다.
- 해야 할 것: 정수 배율 크기를 지킨다.
- 해야 할 것: 두 테마에서 눈으로 확인한다.
- 하지 말 것: `filter: invert()`, `mix-blend-mode`, `mask`로 워드마크 색 바꾸기.
- 하지 말 것: 어두운 잉크 PNG를 다크 배경에 `img`로 그대로.
- 하지 말 것: 로고 뒤에 밝은 판·박스 깔기.
- 하지 말 것: 아이콘을 `--mp-ink` 외의 색(teal·orange)으로 칠하기.
- 하지 말 것: `<picture>` media만으로 테마 대응(수동 선택 무시).
**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 다크에서 `img { filter: invert(1) }` 일괄 적용 | 1비트는 mask, 워드마크는 `metaphr-dark.svg` |
| 숨긴 로고를 `opacity: 0` | `display: none`(읽기·클릭 대상에서 빠짐) |
| mask span 크기 `100px` | 40의 정수배(40/120/200px) |
| `-webkit-mask` 누락으로 Safari에서 빈 칸 | `-webkit-mask`와 `mask` 둘 다 |
| iOS 아이콘을 Original로 두고 다크 PNG 따로 | Template Image + `foregroundStyle(ink)` |
