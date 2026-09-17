---
id: splash
name: 스플래시
nameEn: Splash Screen
category: patterns
summary: 앱이 뜨는 동안 --mp-bg 한 면 가운데 앱 픽셀 아이콘 하나만. 문구·로딩 애니메이션 없이 곧바로 첫 화면.
aliases: [스플래시, splash, 시작 화면, launch screen, 로딩 화면, 런치 스크린, 앱 시작]
platforms: [ios, android]
status: proposed
pillars: [minimalism, pixel-art, retro-color]
tokens: [--mp-bg, --mp-ink, --mp-pixel-card, --mp-pixel-detail, --mp-opacity-pixel, --mp-border, --mp-line, --mp-palette-paper, --mp-palette-slate, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta]
effects: []
related: [app-icon, onboarding, loading, hero, dark-images, theme]
---

## 용도
앱을 실행한 직후, OS가 첫 프레임을 그리기 전까지만 보인다. 앱이 준비되면 곧바로 첫 화면(또는 `onboarding`)으로 넘어간다.
브랜드를 보여 주려고 시간을 끌지 않는다. 데이터 로딩이 길면 스플래시를 늘리지 말고 첫 화면으로 넘어간 뒤 그 안에서 `loading`·`skeleton`을 보인다.
웹에는 스플래시를 두지 않는다(웹 첫 화면은 `hero`).

## 생김새
**구조**
- 한 면 배경 + 가운데 앱 아이콘 하나. 다른 요소 없음
- 배경: `--mp-bg` — 라이트 `--mp-palette-paper`, 다크 `--mp-palette-slate`. 시스템 테마를 따른다(앱 안 테마 설정은 OS 스플래시에 반영되지 않으므로 시스템 기준, 예외)
- 아이콘: 앱의 40×40 1비트 픽셀 아트, 색 `--mp-ink`(라이트 slate / 다크 paper), `opacity: var(--mp-opacity-pixel)` — 단, OS 스플래시 이미지에는 투명도를 줄 수 없으므로 앱에서는 불투명 ink 그대로 쓴다
- 앱 아이콘(`app-icon`)의 바탕 사각형은 넣지 않는다 — 그림만
- 글자·워드마크·버전·진행 표시·저작권 없음

**수치**
- 아이콘 크기: 정수 배율만. 폰 `--mp-pixel-card` 120pt/dp(3×), 태블릿 `--mp-pixel-detail` 200pt/dp(5×)
- 위치: 화면 정가운데(안전 영역 무시, 전체 화면 기준)
- 표시 시간: OS가 정한다. 앱이 붙잡는 최소 시간 0ms. 준비가 1초를 넘으면 첫 화면으로 넘기고 그 안에서 로딩
- 첫 화면 전환: 즉시 교체(페이드 없음). OS 기본 페이드가 강제되면 그대로 둔다(예외)
- 에셋: iOS는 PDF/벡터 또는 1×·2×·3× PNG를 nearest neighbor로 키워 넣는다(40칸 → 120/240/360px). Android 12+ 아이콘 캔버스 240×240dp 중 안쪽 160dp 원 안에 그림(40칸 × 3 = 120dp)

**반응형**
| 기기 | 아이콘 | 비고 |
|---|---|---|
| iPhone SE(375×667pt) | 120pt(3×) | 화면 짧은 변의 32% — 그대로 둔다 |
| iPhone 표준·Pro Max(390–440pt 폭) | 120pt(3×) | 더 키우지 않는다 |
| iPad(768pt 폭 이상) | 200pt(5×, `--mp-pixel-detail`) | 가로·세로 같은 크기 |
| Android compact(600dp 미만) | 아이콘 캔버스 240dp 안 120dp | OS 원형 마스크 안쪽 160dp |
| Android medium·expanded(600dp·840dp 이상), 폴더블 펼침 | 같은 에셋 — OS가 크기 고정 | 5× 별도 에셋을 만들지 않는다 |
- 가로 모드: 같은 크기, 정가운데.
- 분할 화면·작은 창·앱 전환 복귀: OS가 스플래시를 생략할 수 있다. 첫 화면이 스플래시 없이도 자연스러워야 한다.
- 웹·PWA: 스플래시를 만들지 않는다. PWA 설치 시 OS가 `manifest`의 `background_color`(`#F5F5F5`)와 192/512 아이콘으로 자동 생성하는 화면만 허용(예외).

**접근성**
- 스플래시는 읽을 내용이 없으므로 접근성 요소로 노출하지 않는다(OS 기본). 이미지에 라벨을 달지 않는다
- 첫 화면이 뜨면 VoiceOver/TalkBack 포커스가 첫 화면 제목으로 가게 한다(`UIAccessibility.post(.screenChanged)`, Compose는 기본 동작)
- 움직임 없음 — 동작 줄이기 설정과 무관하게 정지 화면
- 대비: slate/paper 10.9:1
- 스플래시가 길어져도 "불러오는 중" 같은 음성 안내를 넣지 않는다 — 1초를 넘기면 첫 화면으로 넘기고 거기서 `loading`이 `aria-busy`/`liveRegion`으로 알린다
- 큰 글자·확대 설정(Dynamic Type, 글꼴 크기)과 무관하다 — 글자가 없기 때문

**조합 규칙**
- 흐름: 스플래시 → (첫 실행) `onboarding` → 첫 화면 → 비었으면 `empty-state`, 실패면 `error-state`. 스플래시는 어느 상태도 대신 알리지 않는다.
- 그림은 `app-icon`과 같은 원본. 바탕 사각형은 빼고 그림만, 색은 테마의 ink.
- 강조 orange는 스플래시에 쓰지 않는다(첫 화면의 강조 하나를 위해 남겨 둔다). 아이콘에 orange 점이 있으면 스플래시용 에셋에서는 ink로 칠한다.
- 테마: 시스템 외형을 따른다. 앱 안에서 고른 테마(`theme-switch`)가 다르면 첫 화면에서 바뀐다 — 스플래시에서 맞추려고 지연하지 않는다(OS 예외).

## 상태
| 상태 | 표현 |
|---|---|
| 라이트 시스템 | paper 면 + slate 아이콘 |
| 다크 시스템 | slate 면 + paper 아이콘 |
| 준비 완료 | 즉시 첫 화면 |
| 준비 지연(1초 초과) | 스플래시를 끝내고 첫 화면 안에서 `loading` |
| 첫 실행 | 스플래시 → `onboarding` |
| 오류(데이터 없음·오프라인) | 스플래시에서 알리지 않는다. 첫 화면에서 `error-state` |

## 데모
```html demo
<div class="mp-splash-row">
  <div class="mp-splash"><span class="mp-splash-icon" style="--src:url(/v1/icons/rhythm.png)" aria-hidden="true"></span></div>
  <div class="mp-splash mp-splash--dark"><span class="mp-splash-icon" style="--src:url(/v1/icons/rhythm.png)" aria-hidden="true"></span></div>
</div>
```
데모의 바깥 1px 선은 화면 경계 표시용이다. 오른쪽은 다크 견본이다.

## 코드
```css
.mp-splash-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5em; }
.mp-splash {
  width: 160px; aspect-ratio: 9 / 16; display: flex; align-items: center; justify-content: center;
  background: var(--mp-bg); color: var(--mp-ink); outline: var(--mp-border) solid var(--mp-line);
}
.mp-splash-icon {
  width: var(--mp-pixel-card); height: var(--mp-pixel-card);
  background: currentColor; opacity: var(--mp-opacity-pixel);
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
/* 견본 표시: 테마와 무관하게 다크 화면을 나란히 보일 때만 */
.mp-splash--dark { background: var(--mp-palette-slate); color: var(--mp-palette-paper); }
```

## 앱
- iOS(Info.plist `UILaunchScreen`): `UIColorName` = Asset 색 `LaunchBackground`(Any `#F5F5F5` paper / Dark `#303841` slate, 토큰 값을 앱 상수로), `UIImageName` = Asset 이미지 `LaunchIcon`(Appearances Any·Dark 두 장. 스플래시 이미지는 틴트가 안 되므로 테마별 파일), `UIImageRespectsSafeAreaInsets` = false. Scale 설정은 `Preserve Vector Data` 끄고 1×·2×·3× 픽셀 PNG.
  ```xml
  <key>UILaunchScreen</key>
  <dict>
    <key>UIColorName</key><string>LaunchBackground</string>
    <key>UIImageName</key><string>LaunchIcon</string>
    <key>UIImageRespectsSafeAreaInsets</key><false/>
  </dict>
  ```
- iOS: 스토리보드 LaunchScreen을 쓰면 `UIImageView` 120×120 가운데 고정, `contentMode = .center`, 보간은 에셋을 미리 정수 배율로 만들어 피한다. 코드로 지연(`sleep`, 가짜 스플래시 뷰)을 넣지 않는다.
- Android 12+ 코드:
  ```kotlin
  override fun onCreate(savedInstanceState: Bundle?) {
    val splash = installSplashScreen()           // setContent보다 먼저
    splash.setKeepOnScreenCondition { !vm.ready && vm.elapsedMs < 1000 } // 1초 넘으면 놓아 준다
    super.onCreate(savedInstanceState)
    setContent { App() }                         // 퇴장 애니메이션 없음
  }
  ```
- Android 12+ 테마(`core-splashscreen`): 테마 `Theme.App.Starting` — `windowSplashScreenBackground` = `@color/bg`(values / values-night), `windowSplashScreenAnimatedIcon` = 픽셀 그림 벡터(각 픽셀을 사각 path로, 안쪽 160dp 원 안), `postSplashScreenTheme` = 앱 테마. `setKeepOnScreenCondition`은 1초 이내 필수 초기화에만.
- Android OS 예외: 아이콘에 원형 마스크가 씌워진다 — 그림을 가운데 원 안에 두면 잘리지 않는다. 아이콘 배경색(`windowSplashScreenIconBackgroundColor`)은 지정하지 않는다. 브랜드 이미지(`windowSplashScreenBrandingImage`)는 쓰지 않는다.
- `windowSplashScreenAnimationDuration`·애니메이션 벡터는 쓰지 않는다. 퇴장 애니메이션(`setOnExitAnimationListener`)도 두지 않는다.
- 모든 플랫폼: 앱 아이콘(`app-icon`)과 같은 픽셀 그림을 써서 이어지게 한다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 두 테마 배경(paper / slate)을 모두 준비한다.
- 해야 할 것: 아이콘 하나, 정수 배율, 정가운데.
- 해야 할 것: 준비되면 즉시 넘긴다. 느린 로딩은 첫 화면 안에서.
- 해야 할 것: `app-icon`과 같은 그림.
- 하지 말 것: 슬로건·앱 이름·버전·"로딩 중" 문구.
- 하지 말 것: 회전 스피너, 진행 막대, 아이콘 튕김·확대 애니메이션.
- 하지 말 것: 일부러 붙잡아 두는 최소 표시 시간, 가짜 스플래시 뷰.
- 하지 말 것: orange·teal 전체 면, 그라데이션·질감 배경.
- 하지 말 것: 흐릿하게 늘린 아이콘(보간), 앱 아이콘의 바탕 사각형까지 통째로 넣기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `DispatchQueue.main.asyncAfter(2)`로 최소 2초 표시 | 준비되면 즉시, 최대 1초 |
| 라이트 에셋 한 장만 → 다크 모드에서 흰 화면 번쩍 | Any/Dark(values/values-night) 두 벌 |
| 앱 아이콘 PNG를 통째로(바탕 사각형 포함) | 1비트 그림만, 바탕은 `LaunchBackground` 색 |
| 40칸 그림을 OS가 늘리게 두어 흐림 | 정수 배율로 미리 키운 에셋 |
| 스플래시에 슬로건·"로딩 중" | 글자 없음, 로딩은 첫 화면 안에서 |
| Android 12 이전 방식 `SplashActivity` 추가 | `core-splashscreen` 하나로 |
