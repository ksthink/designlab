---
id: app-icon
name: 앱 아이콘
nameEn: App Icon
category: patterns
summary: paper 또는 slate 한 면 위에 40×40 1비트 픽셀 그림을 정수 배율로 얹는다. 모서리 둥글림은 OS 마스크 예외.
aliases: [앱 아이콘, app icon, 런처 아이콘, launcher icon, 홈 화면 아이콘, favicon, 파비콘, 아이콘 에셋, adaptive icon, apple-touch-icon]
platforms: [ios, android, web]
status: proposed
pillars: [pixel-art, retro-color]
tokens: [--mp-palette-paper, --mp-palette-slate, --mp-palette-orange, --mp-border, --mp-line, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta]
effects: []
related: [pixel-icon, splash, widget, logo, dark-images]
---

## 용도
홈 화면·앱 스토어·설정 목록·브라우저 탭에서 앱을 알아보게 하는 그림. 앱마다 하나만 만든다.
앱 안의 기능 아이콘은 `pixel-icon`, 회사 표시는 `logo`를 쓴다. 앱 아이콘을 앱 화면 안 장식으로 다시 쓰지 않는다(`splash`는 예외).

## 생김새
**구조**
- 층은 두 개뿐이다: 바탕 한 면 + 1비트 그림 한 장.
- 바탕: `--mp-palette-paper`(기본) 또는 `--mp-palette-slate`. 한 스튜디오의 앱들은 같은 바탕을 쓴다 — 정하지 않았으면 paper.
- 그림: 앱의 40×40 1비트 픽셀 아트(`pixel-icon`과 같은 원본). 색은 바탕의 반대(paper 위 slate, slate 위 paper).
- 강조: `--mp-palette-orange`는 그림 안 픽셀 몇 칸(4칸 이하의 점 하나)까지만. 바탕 전체·테두리·그림 전체를 orange로 칠하지 않는다. teal은 쓰지 않는다(orange와 1.24:1로 뭉개짐).
- 글자·앱 이름·버전·배지 숫자를 넣지 않는다.
- 원본은 **직각**으로 그린다. 둥근 모서리는 OS가 씌운다.
- **색 변수 예외(승인됨)**: 앱 아이콘은 테마를 따라 바뀌지 않는 고정 에셋이다. 그래서 이 문서의 데모·견본 CSS는 시맨틱 변수(`--mp-bg`, `--mp-ink`) 대신 팔레트 원색 변수(`--mp-palette-paper`, `--mp-palette-slate`)를 직접 쓴다. 아이콘을 보여 주는 제품 화면 CSS(설정의 앱 정보, 스토어 링크 카드 등)는 주변 배치에 시맨틱 변수를 쓰고, 아이콘 이미지 자체만 고정 색이다.

**수치**
| 대상 | 캔버스 | 픽셀 1칸 | 그림 영역 | 바깥 여백 |
|---|---|---|---|---|
| iOS 마스터 | 1024×1024 | 20px | 800×800 | 112px |
| Android foreground | 432×432(108dp @4×) | 7px | 280×280 | 76px |
| Android 안전 영역 | 가운데 지름 66dp 원 | — | 그림이 이 원 안에 | — |
| Play 스토어 | 512×512 | 10px | 400×400 | 56px |
| 웹 `apple-touch-icon` | 180×180 | 4px | 160×160 | 10px |
| PWA | 192×192 / 512×512 | 4px / 10px | 160 / 400 | 16 / 56px |
| 파비콘 | 32×32, 16×16 | 1px | 별도로 찍은 32칸·16칸 그림 | 0–2px |

- 픽셀 1칸은 항상 정수 px. 캔버스에서 그림이 정확히 나누어떨어지지 않으면 여백을 조정한다(그림을 늘리지 않는다).
- 40칸 그림을 16·32px로 줄이지 않는다. 파비콘은 16×16·32×32 격자에 새로 찍는다.

**반응형**
| 내보낼 파일 | 크기 | 비고 |
|---|---|---|
| iOS `AppIcon` | 1024×1024 한 장(Single Size) + Dark·Tinted 각 1024 | OS가 180·120·87·80·60·58·40pt 등으로 축소 |
| Android adaptive | foreground·background·monochrome 각 108dp = 432×432px(xxxhdpi) | 가운데 66dp 원이 안전 영역 |
| Android 레거시 | 48dp: 48·72·96·144·192px | API 25 이하만 |
| Play 스토어 | 512×512 | 알파 없음 |
| 웹 파비콘 | 16×16, 32×32(`favicon.ico`), `favicon.svg` | 16·32는 새로 찍은 그림 |
| 웹 `apple-touch-icon` | 180×180 | 알파 없음, paper 바탕 |
| PWA `manifest.icons` | 192×192, 512×512(`purpose: "any"`), 512 `maskable`(그림을 가운데 80% 안에) | `background_color` `#F5F5F5` |
- OS가 크기를 줄여 표시한다(iOS 60pt·Android 48dp 등). 원본은 가장 큰 크기 하나에서 nearest neighbor로 정수 배율 내보내기만 한다.
- iOS 18 외형: Default(paper 바탕), Dark(slate 바탕 + paper 그림), Tinted(투명 바탕 + 흑백 1비트 그림) 세 장.
- Android 13+ `monochrome` 레이어: 투명 바탕 + 1비트 그림 한 장(OS가 테마색으로 칠한다 — OS 예외).
- 웹: `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` + `favicon.ico`(16/32) + `apple-touch-icon.png`(180). `theme-color` 메타는 라이트 `#F5F5F5`, 다크 `#303841`.

**접근성**
- 아이콘은 그림일 뿐 이름을 대신하지 않는다. 앱 이름(`CFBundleDisplayName`, `android:label`, 웹 `name`)은 짧은 명사로 따로 준다.
- 16px 파비콘에서도 윤곽이 읽혀야 한다: 1칸짜리 가는 선보다 2칸 이상 덩어리로.
- 바탕과 그림 대비는 slate/paper 10.9:1 — 다른 색 조합을 만들지 않는다.
- 스크린리더는 아이콘이 아니라 앱 이름을 읽는다(VoiceOver "리듬, 앱", TalkBack "리듬"). 앱 안에서 아이콘 이미지를 보여 줄 때는 옆에 이름 글자가 있으므로 `aria-hidden="true"`/`.accessibilityHidden(true)`.
- 틴트·monochrome에서도 뜻이 남도록 orange 점에 의미를 싣지 않는다(OS가 한 색으로 칠한다).
- 고대비·색 반전(Smart Invert) 설정에서 OS가 아이콘을 뒤집지 않게 두지만, 뒤집혀도 1비트라 윤곽이 유지된다.

**조합 규칙**
- 같은 그림이 `app-icon` → `splash`(바탕 없이 그림만) → `onboarding` 첫 장 그림으로 이어진다. 원본 40×40 한 장에서 모두 나온다.
- 위젯(`widget`)·알림 small icon(`notification`)은 이 그림의 단색 실루엣을 쓴다 — 색·바탕을 새로 만들지 않는다.
- 스튜디오 앱 목록(`card`, `page-list`)의 썸네일은 앱 아이콘 파일이 아니라 `pixel-icon`(모눈 위 mask, 테마 ink)으로 그린다.
- orange 점은 아이콘 하나에 한 곳. 앱 화면의 강조 규칙(화면당 하나)과는 따로 센다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | paper 바탕 + slate 그림 |
| 다크 외형(iOS 18, 웹 다크) | slate 바탕 + paper 그림 |
| 틴트·monochrome | 투명 바탕 + 1비트 그림, 색은 OS가 칠함(예외) |
| 알림 배지 | OS가 그리는 빨간 숫자 원 — 앱이 바꿀 수 없음(예외). 필요한 경우만 켠다 |
| 설치 중·업데이트 | OS 진행 표시(예외) |
| 강조점 | 그림 안 orange 픽셀 한 곳(선택) |

## 데모
```html demo
<div class="mp-app-icon-row">
  <figure class="mp-app-icon-item">
    <span class="mp-app-icon mp-app-icon--paper"><span style="--src:url(/v1/icons/pantry.png)"></span></span>
    <figcaption>기본</figcaption>
  </figure>
  <figure class="mp-app-icon-item">
    <span class="mp-app-icon mp-app-icon--slate"><span style="--src:url(/v1/icons/pantry.png)"></span></span>
    <figcaption>다크</figcaption>
  </figure>
  <figure class="mp-app-icon-item">
    <span class="mp-app-icon mp-app-icon--paper mp-app-icon--small"><span style="--src:url(/v1/icons/pantry.png)"></span></span>
    <figcaption>1×</figcaption>
  </figure>
</div>
```

## 코드
```css
.mp-app-icon-row { display: flex; flex-wrap: wrap; align-items: flex-end; gap: 1.5em; }
.mp-app-icon-item { margin: 0; display: flex; flex-direction: column; align-items: center; gap: 0.6em; }
.mp-app-icon-item figcaption { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-app-icon {
  width: 160px; height: 160px; display: flex; align-items: center; justify-content: center;
  outline: var(--mp-border) solid var(--mp-line);   /* 견본 경계 표시용 */
}
.mp-app-icon span {
  width: 120px; height: 120px;   /* 40×40 → 3× */
  image-rendering: pixelated;
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
.mp-app-icon--paper { background: var(--mp-palette-paper); }
.mp-app-icon--paper span { background: var(--mp-palette-slate); }
.mp-app-icon--slate { background: var(--mp-palette-slate); }
.mp-app-icon--slate span { background: var(--mp-palette-paper); }
.mp-app-icon--small { width: 56px; height: 56px; }
.mp-app-icon--small span { width: 40px; height: 40px; }   /* 1× */
```
데모는 견본 표시라 페이지 테마와 무관하게 팔레트 원색을 직접 쓴다. 제품 화면 CSS에서는 시맨틱 변수를 쓴다.

## 앱
- **iOS(Xcode 15+)**: `AppIcon` 에셋에 Single Size 1024×1024 PNG, 알파 없음, 직각. iOS 18 Appearances `Any / Dark / Tinted` 세 장을 채운다. 둥근 사각형 마스크와 광택 없음은 OS가 처리(예외).
- **Android**: `res/mipmap-anydpi-v26/ic_launcher.xml`
  ```xml
  <adaptive-icon>
    <background android:drawable="@color/mp_paper"/>
    <foreground android:drawable="@drawable/ic_launcher_fg"/>
    <monochrome android:drawable="@drawable/ic_launcher_mono"/>
  </adaptive-icon>
  ```
  foreground는 108dp 캔버스의 가운데 66dp 원 안에 그림. 원형·스쿼클·물방울 마스크는 런처가 정한다(예외). 레거시 `ic_launcher.png`는 48dp 기준 mdpi–xxxhdpi 정수 배율.
- **내보내기**: Aseprite·Pixelorama 등에서 nearest neighbor로 정수 배율 확대. 벡터로 옮길 때는 픽셀마다 사각형 path(`shape-rendering: crispEdges`).
- 앱 아이콘 대체(Alternate Icons)를 제공하면 paper/slate 두 벌만. 색 변형을 늘리지 않는다.
  ```swift
  // Info.plist CFBundleAlternateIcons에 "AppIconSlate" 등록 후, 설정 화면 행에서
  try await UIApplication.shared.setAlternateIconName(useSlate ? "AppIconSlate" : nil)
  ```
  OS가 "아이콘을 변경했습니다" 알림을 띄운다(예외, 끌 수 없다).
- **웹**
  ```html
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/manifest.webmanifest">
  ```
  SVG 파비콘은 픽셀마다 `<rect>`에 `shape-rendering="crispEdges"`. 다크 탭용 변형이 필요하면 SVG 안 `@media (prefers-color-scheme: dark)`로 fill만 paper로 바꾼다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 한 면 + 1비트 그림 두 층. 정수 배율로만 내보낸다.
- 해야 할 것: 스튜디오 앱들이 같은 바탕·같은 여백 비율을 써서 한 계열로 보이게 한다.
- 해야 할 것: 파비콘은 작은 격자에 새로 찍는다. 다크·틴트 외형을 함께 준비한다.
- 해야 할 것: 안전 영역 안에 그림을 둬서 어떤 마스크에서도 잘리지 않게 한다.
- 하지 말 것: 원본에 둥근 모서리를 직접 그리기, 테두리 선 두르기.
- 하지 말 것: 그림자·광택·입체감·그라데이션·질감 바탕.
- 하지 말 것: 앱 이름 글자·로고 워드마크 넣기, 매끈한 벡터로 다시 그리기.
- 하지 말 것: orange 전체 바탕, teal 사용, 등록되지 않은 색.
- 하지 말 것: 40칸 그림을 비정수 배율(예: 64px, 100px)로 보간 확대.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 1024 원본에 둥근 모서리·그림자를 그려 넣음 | 직각 원본, 마스크는 OS |
| Android foreground 그림이 108dp를 꽉 채워 원형 마스크에서 잘림 | 가운데 66dp 원 안에 |
| 32px 파비콘을 1024 원본에서 축소해 뭉개짐 | 16·32 격자에 새로 찍는다 |
| 투명 PNG 1024 제출(iOS) → 검은 바탕 | 알파 없는 paper/slate 바탕 |
| 브랜드 색을 늘리려 teal 바탕 변형 추가 | paper/slate 두 벌만 |
| 앱 목록 썸네일에 아이콘 PNG를 그대로 다크 화면에 | `pixel-icon` mask로 테마 ink |
