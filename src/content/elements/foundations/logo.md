---
id: logo
name: 로고
nameEn: Logo
category: foundations
summary: 등록된 워드마크 파일만 쓴다. 라이트 metaphr.svg, 다크 metaphr-dark.svg. 칠하지도 늘리지도 않는다.
aliases: [로고, 워드마크, 브랜드 로고, 심볼, 브랜드, metaphr 로고, 푸터 로고, logo, wordmark, brand mark, brand]
platforms: [web, ios, android]
status: extracted
source: src/data/logos.json · metaphr.dev index.html .foot-logo
pillars: [pixel-art, minimalism]
tokens: [--mp-bg, --mp-size-fine, --mp-tracking-fine, --mp-opacity-fine, --mp-opacity-brand]
effects: []
related: [footer, dark-images, theme, app-icon, splash, header]
---

## 용도
페이지 맨 아래 푸터에 워드마크 하나를 둔다. 파일과 규칙의 원본은 `/v1/logos.json`이다.
헤더·히어로의 브랜드 표기는 로고 이미지 대신 글자 `metaphr`(`--mp-opacity-brand`)로 쓴다.
로고는 한 화면에 한 번. 등록되지 않은 로고를 새로 그리거나 추측하지 않는다.

## 생김새
**파일**
- 라이트: `/v1/logos/metaphr.svg` (비트맵 PNG를 담은 SVG, viewBox 1024×585, 고유 크기 350×200).
- 다크: `/v1/logos/metaphr-dark.svg` (글자 #F5F5F5, 그림자 어두운 톤).
- 워드마크는 명암(글자·그림자)이 있어 CSS로 칠하지 않는다. 테마마다 파일을 바꾼다.

**배치**
- 폭 `clamp(120px, 20vw, 168px)`, `height: auto` — 비율은 파일이 정한다.
- 가로 가운데, 위 여백 `clamp(2.5rem, 7vh, 4rem)`.
- `image-rendering: pixelated` (정수 배율이 아닌 크기에서도 흐리지 않게), `user-select: none`.
- 바로 아래 `© metaphr`: `--mp-size-fine`, `--mp-tracking-fine`, `--mp-opacity-fine`, 위 여백 1.4rem, 가운데.
- 배경은 `--mp-bg` 위에만. 다른 색 판·박스·사진·강조 면 위에 올리지 않는다. 예외는 디자인 문서의 견본 표시뿐.
- 로고 주변 최소 여백은 로고 높이의 절반. 다른 요소를 붙이지 않는다.

**HTML**
- `width="350" height="200"`을 적어 레이아웃 이동을 막는다. `loading="lazy" decoding="async"`(푸터라서).
- 두 `img`를 두고 CSS로 토글한다. `<picture>`는 OS 설정만 따르고 `data-theme` 수동 지정을 못 따르므로 수동 전환이 있는 사이트에서는 쓰지 않는다.

**다른 자리의 브랜드 표기**
- 헤더·히어로: 글자 `metaphr`(Mulmaru, `--mp-opacity-brand` .8). 로고 이미지를 헤더에 넣지 않는다.
- 파비콘·앱 아이콘·OG 이미지: 등록된 파일이 생기기 전에는 만들지 않고 사용자에게 묻는다.
- 공유 문서·README: 파일 URL `https://design.metaphr.dev/v1/logos/metaphr.svg`를 그대로 링크한다.

**검사**
- 코드 검색: 로고 `img`에 `filter`, `mix-blend-mode`, `mask`, `border-radius`, `box-shadow`가 걸려 있지 않아야 한다.
- 다크 테마에서 `metaphr-dark.svg`가 보이고 `metaphr.svg`는 `display: none`인지 확인한다.

**반응형**
- clamp가 120–168px 사이에서 폭을 정한다. 더 줄이지 않는다(120px 미만이면 글자가 뭉개진다).

**접근성**
- 보이는 로고 하나에만 `alt="metaphr"`. 숨겨진 쪽은 `display: none`이라 읽히지 않는다.
- 로고를 링크로 만들지 않는다(푸터 로고는 장식이자 서명). 홈 링크는 헤더 글자 브랜드가 맡는다.

## 상태
| 상태 | 표현 |
|---|---|
| 라이트 | `metaphr.svg` 보임 |
| 다크(시스템) | `prefers-color-scheme: dark`이고 `data-theme="light"`가 아니면 `metaphr-dark.svg` |
| 다크(수동) | `:root[data-theme="dark"]`이면 `metaphr-dark.svg` |
| 호버 | 변화 없음 |
| 움직임 | 없음 (애니메이션 금지) |

## 데모
```html demo
<div class="mp-logo">
  <img class="mp-logo-img mp-logo-light" src="/v1/logos/metaphr.svg" alt="metaphr" width="350" height="200">
  <img class="mp-logo-img mp-logo-dark" src="/v1/logos/metaphr-dark.svg" alt="metaphr" width="350" height="200">
  <small class="mp-logo-copy">© metaphr</small>
</div>
```

## 코드
```css
.mp-logo { text-align: center; }
.mp-logo-img {
  display: block; width: clamp(120px, 20vw, 168px); height: auto;
  margin: clamp(2.5rem, 7vh, 4rem) auto 0;
  user-select: none; image-rendering: pixelated;
}
.mp-logo-copy { display: block; margin-top: 1.4rem; font-size: var(--mp-size-fine); letter-spacing: var(--mp-tracking-fine); opacity: var(--mp-opacity-fine); }
.mp-logo-dark { display: none; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .mp-logo-light { display: none; }
  :root:not([data-theme="light"]) .mp-logo-dark { display: block; }
}
:root[data-theme="dark"] .mp-logo-light { display: none; }
:root[data-theme="dark"] .mp-logo-dark { display: block; }
```

## 앱
- iOS: 두 파일을 PNG로 내보내 Asset Catalog 이미지 하나의 Any/Dark Appearance로 넣는다. `Image("metaphr").interpolation(.none).resizable().scaledToFit().frame(width: 144)`.
- Android: `drawable-nodpi/metaphr.png`, `drawable-night-nodpi/metaphr.png`. `Image(…, contentScale = ContentScale.Fit, filterQuality = FilterQuality.None, modifier = Modifier.width(144.dp))`.
- 설정 화면 맨 아래 "정보" 영역에 푸터처럼 한 번. 내비게이션 바에 로고 이미지를 넣지 않는다.
- 스플래시는 `splash`, 앱 아이콘은 `app-icon` 규칙이다. OS 아이콘 마스크·런치 스크린 제약은 예외.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 등록된 파일 그대로, 테마별 파일, 폭만 지정, `--mp-bg` 위에 바로, `pixelated`.
- 하지 말 것: 텍스트·SVG로 다시 그리기, `filter`·`mask`·`mix-blend-mode`·`invert()`로 칠하기, 그림자·외곽선·회전·기울임·애니메이션, 판·사진·강조 면 위에 올리기, 비율 바꾸기, 한 화면에 로고 여러 번.
