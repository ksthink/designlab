---
id: widget
name: 위젯
nameEn: Widget
category: patterns
summary: 홈 화면 위젯은 --mp-bg 한 면에 kicker 한 줄과 숫자·문장 하나. 선·그림자·배경 사진 없음.
aliases: [위젯, widget, 홈 화면 위젯, 잠금 화면 위젯, 컴플리케이션, complication, glance, 앱 위젯, WidgetKit, Live Activity]
platforms: [ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-bg, --mp-ink, --mp-size-kicker, --mp-tracking-kicker, --mp-opacity-kicker, --mp-size-title, --mp-tracking-title, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-accent, --mp-border, --mp-line, --mp-opacity-muted]
effects: []
related: [stat, app-icon, status-dot, notification, empty-state]
---

## 용도
앱을 열지 않고 확인할 **한 가지**(오늘 남은 일, 다음 일정, 기록 중 여부)를 보여 줄 때 쓴다.
위젯에서 여러 기능을 조작하게 하지 않는다. 버튼은 최대 하나(iOS 17+ interactive, Android Glance action). 알려야 할 일이 시각에 묶여 있으면 `notification`을 함께 검토한다.

## 생김새
**구조**
- 세 칸 세로 흐름: 위 kicker 한 줄 → 가운데 핵심 하나 → 아래 메타 한 줄.
- 바탕 `--mp-bg` 한 면(라이트 paper / 다크 slate, 시스템 외형을 따른다). 글자 `--mp-ink`.
- 핵심은 둘 중 하나: 숫자(`stat` 규칙) 또는 짧은 문장 한 줄(두 줄 넘으면 자른다, `…`).
- 주의 상태일 때만 메타 줄 앞 `■` 하나를 `--mp-accent`로(`status-dot`). 위젯 하나에 강조는 하나.
- 테두리를 그리지 않는다. 둥근 틀·바깥 여백·그림자 유무는 OS가 정한다(예외).
- 픽셀 아이콘이 필요하면 kicker 옆 16px(40칸 그림이 아니라 16칸 전용 그림) 하나까지.

**수치**
| 줄 | 크기 | 자간 | 투명도 |
|---|---|---|---|
| kicker | `--mp-size-kicker`(앱 13pt) | `--mp-tracking-kicker` | `--mp-opacity-kicker` |
| 핵심 숫자 | `--mp-size-title`(앱 32–40pt) | `--mp-tracking-title` | 1 |
| 단위 | `--mp-size-meta`, 숫자 뒤 0.4em | — | 1 |
| 메타 | `--mp-size-meta`(앱 11pt) | `--mp-tracking-meta` | `--mp-opacity-meta` |

- 안쪽 여백: iOS는 `contentMarginsDisabled` 쓰지 않고 시스템 여백(16pt 안팎), Android Glance는 16dp.
- 숫자는 `tabular-nums`. 행간 1.

**반응형**
| 크기 | iOS family | Android(셀) | 내용 |
|---|---|---|---|
| 작은 | `systemSmall` 170×170pt 안팎 | 2×2 | kicker + 숫자 + 메타 |
| 중간 | `systemMedium` | 4×2 | 왼쪽 숫자, 오른쪽 목록 최대 3줄(1px `--mp-line` 구분) |
| 큰 | `systemLarge` | 4×4 | kicker + 목록 최대 6줄 |
| 잠금 화면 | `accessoryRectangular` / `accessoryInline` / `accessoryCircular` | — | 글자만, 강조색 없음 |
| 크기 조절 | — | resizable(`resizeMode="horizontal\|vertical"`, `SizeMode.Responsive`) | 폭 기준으로 위 세 배치 중 하나를 고른다 |
- 대략 크기: iOS `systemSmall` 158pt(SE)·170pt(표준)·184pt(Pro Max) 정사각, `systemMedium` 폭 338–364pt, iPad는 기기별(OS). Android 셀은 런처마다 다르므로 dp로 판단: 폭 110dp 미만 = 숫자만, 110–250dp = 작은 배치, 250dp 이상 = 중간 배치, 높이 250dp 이상 = 큰 배치.
- 더 커져도 정보 수를 늘리지 않고 여백을 늘린다. `systemExtraLarge`(iPad)는 지원하지 않아도 된다.
- `accessoryCircular`: 숫자 하나만(kicker·메타 생략). `accessoryInline`: "오늘 3개" 한 줄, 기호 없음.

**접근성**
- 위젯 전체에 읽을 문장 하나: `.accessibilityLabel("오늘 3개 남음, 마감 1개")`, Compose Glance는 `contentDescription`.
- `■` 강조는 장식으로 숨기고 뜻은 글자("마감 1개")로 말한다.
- Dynamic Type·글자 크기 확대에서 핵심 숫자가 잘리면 메타 줄을 먼저 숨긴다(`ViewThatFits`).
- 대비는 slate/paper 10.9:1, 메타 줄(.7)은 보조 정보 자리다.
- 역할: iOS 위젯 전체가 하나의 버튼(딥링크)으로 읽힌다 — `.accessibilityElement(children: .combine)` + `.accessibilityAddTraits(.isButton)`. Android는 루트에 `contentDescription` 한 문장 + `clickable`.
- 비트맵 텍스트(Android Glance 예외 방법)를 쓰면 반드시 `contentDescription`에 같은 글자를 넣는다.
- 글자 크기 한계: iOS `.dynamicTypeSize(...DynamicTypeSize.xxLarge)`로 상한을 두고, 넘치면 `ViewThatFits`로 숫자만 남긴다. Android는 sp가 시스템 배율을 따르므로 가장 큰 배율(200%)에서 잘리는지 확인한다.
- 움직임: 위젯에는 애니메이션이 없으므로 동작 줄이기 대응이 따로 필요 없다. `.contentTransition(.identity)`로 OS 숫자 전환 효과도 끈다.

**조합 규칙**
- 위젯 하나에 강조 하나: 주의 상태의 `■` orange(`status-dot`)만. 같은 홈 화면에 여러 위젯을 둘 수 있으므로 기본 상태에서는 orange를 쓰지 않는다.
- 숫자 배치는 `stat` 규칙, 빈 상태 문구는 `empty-state` 규칙(사실 + 할 일, 위젯에서는 명사 하나로 줄인다).
- 시각이 중요한 일은 위젯 갱신에 기대지 말고 `notification`으로 알린다. 위젯은 확인용, 알림은 알림용.
- kicker 옆 아이콘을 쓰면 `app-icon`과 같은 그림의 단색 실루엣. 앱 아이콘 이미지를 그대로 붙이지 않는다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | kicker + 핵심 + 메타 |
| 주의(조건이 참) | 메타 앞 orange `■` + 뜻을 말하는 글자 |
| 비어 있음 | 핵심 자리에 `-`, 메타 "없음" |
| 불러오기 전(placeholder) | 같은 배치, 글자 대신 `redacted` — OS 기본 회색 막대(예외) |
| 로그인 필요·오류 | 핵심 자리에 짧은 명사("열기"), 누르면 앱으로 |
| 오래된 데이터 | 메타에 마지막 갱신 시각 `HH:mm`, `--mp-opacity-secondary` |
| 누름 | OS 눌림 효과(예외). 앱의 해당 화면으로 딥링크 |

## 동작
- 갱신: 필요한 시점에만(Timeline 정책 `.atEnd`/`.after(date)`, Android `updatePeriodMillis` 최소 30분 또는 WorkManager). 초 단위 갱신 금지.
- 시간 흐름 표시는 `Text(date, style: .timer)` 같은 OS 제공 글자만 허용하고 애니메이션은 넣지 않는다.
- 값이 바뀔 때 전환 애니메이션 없음(`.contentTransition(.identity)`).

## 데모
```html demo
<div class="mp-widget-row">
  <div class="mp-widget">
    <p class="mp-widget-kicker">오늘</p>
    <p class="mp-widget-value">3<span>개</span></p>
    <p class="mp-widget-meta">09:00</p>
  </div>
  <div class="mp-widget">
    <p class="mp-widget-kicker">마감</p>
    <p class="mp-widget-value">1<span>일</span></p>
    <p class="mp-widget-meta"><span class="mp-widget-mark" aria-hidden="true">■</span>주의</p>
  </div>
  <div class="mp-widget is-empty">
    <p class="mp-widget-kicker">오늘</p>
    <p class="mp-widget-value">-</p>
    <p class="mp-widget-meta">없음</p>
  </div>
</div>
```

## 코드
```css
.mp-widget-row { display: flex; flex-wrap: wrap; gap: 1.2em; }
.mp-widget {
  width: 150px; aspect-ratio: 1; padding: 16px; box-sizing: border-box;
  display: flex; flex-direction: column; justify-content: space-between;
  background: var(--mp-bg); color: var(--mp-ink);
  outline: var(--mp-border) solid var(--mp-line);   /* 데모용 경계. 실제는 OS 틀 */
}
.mp-widget p { margin: 0; }
.mp-widget-kicker { font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-kicker); opacity: var(--mp-opacity-kicker); }
.mp-widget-value { font-size: var(--mp-size-title); letter-spacing: var(--mp-tracking-title); line-height: 1; font-variant-numeric: tabular-nums; }
.mp-widget-value span { font-size: var(--mp-size-meta); margin-left: 0.4em; letter-spacing: 0; }
.mp-widget-meta { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-widget-mark { color: var(--mp-accent); margin-right: 0.4em; }
.mp-widget.is-empty .mp-widget-value { opacity: var(--mp-opacity-muted); }
```

## 앱
- **iOS WidgetKit**
  ```swift
  VStack(alignment: .leading) {
    Text("오늘").font(.custom("Mulmaru", size: 12)).opacity(0.7)
    Spacer()
    Text("\(count)").font(.custom("Mulmaru", size: 36)).monospacedDigit()
    Spacer()
    Text(updated, style: .time).font(.custom("Mulmaru", size: 12)).opacity(0.7)
  }
  .containerBackground(Color("Background"), for: .widget)
  ```
  WidgetKit은 번들한 커스텀 서체를 쓸 수 있다 — Mulmaru woff2가 아닌 ttf/otf를 위젯 확장 타깃에도 넣고 `UIAppFonts`에 등록한다(앱 타깃만 넣으면 위젯에서 폴백된다). `Color("Background")`는 Any paper / Dark slate 에셋.
- 잠금 화면·StandBy·틴트 홈 화면: OS가 단색·투명으로 렌더링한다(`widgetRenderingMode` 예외). 강조색에 의존하지 말고 `■`와 글자로 말한다.
- Live Activity·Dynamic Island를 쓰면 같은 세 줄 구조, 모양·모서리는 OS(예외).
- **Android Glance**: `GlanceTheme` 동적 색(Material You)을 끄고 `ColorProvider(day = paper, night = slate)`. `cornerRadius`는 Android 12+ 시스템 값(예외), 그림자 없음. **서체 OS 예외**: Glance `Text`는 일반 `FontFamily`(SansSerif·Serif·Monospace·Cursive)만 지원하고 커스텀 서체(Mulmaru)를 쓸 수 없다. 기본은 `FontFamily.SansSerif` 400으로 두고 이 제약을 예외로 기록한다. Mulmaru 모양이 꼭 필요한 짧은 라벨·숫자는 앱에서 Mulmaru로 미리 그린 픽셀 텍스트 비트맵(정수 배율, 보간 없음, 테마별 ink 색 두 장)을 `Image(ImageProvider(bitmap), contentDescription = "3개 남음")`으로 넣는다. 긴 문장은 비트맵으로 만들지 않는다.
  ```kotlin
  class TodayWidget : GlanceAppWidget() {
    override val sizeMode = SizeMode.Responsive(setOf(DpSize(110.dp, 110.dp), DpSize(250.dp, 110.dp)))
    override suspend fun provideGlance(context: Context, id: GlanceId) = provideContent {
      val ink = ColorProvider(day = Slate, night = Paper)
      Column(GlanceModifier.fillMaxSize().background(ColorProvider(day = Paper, night = Slate))
        .padding(16.dp).clickable(actionStartActivity<MainActivity>())) {
        Text("오늘", style = TextStyle(color = ink, fontSize = 12.sp, fontFamily = FontFamily.SansSerif)) // 서체 예외
        Spacer(GlanceModifier.defaultWeight())
        Text("3", style = TextStyle(color = ink, fontSize = 36.sp, fontWeight = FontWeight.Normal))
      }
    }
  }
  ```
- 클릭: iOS `widgetURL`, Android `actionStartActivity` — 위젯 하나에 목적지 하나.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 한 위젯에 한 가지 정보. 누르면 그 정보가 있는 화면으로 바로.
- 해야 할 것: 라이트·다크·틴트(단색) 렌더링을 모두 확인한다.
- 해야 할 것: 빈 상태와 오래된 데이터 상태를 글자로 말한다.
- 해야 할 것: 갱신은 필요할 때만 해서 배터리를 아낀다.
- 하지 말 것: 배경 사진·그라데이션·패턴, 위젯에 1px 이상 테두리 직접 그리기.
- 하지 말 것: 버튼 여러 개, 작은 글자 표, 스크롤처럼 보이는 긴 목록.
- 하지 말 것: orange 바탕 면, 강조 두 곳 이상, 굵은 숫자.
- 하지 말 것: Material You 동적 색으로 팔레트 바꾸기, 초 단위 카운트다운 애니메이션.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| Mulmaru를 앱 타깃에만 넣어 위젯에서 시스템 서체로 폴백 | 위젯 확장 타깃에도 ttf 포함 + `UIAppFonts` |
| Glance에서 커스텀 `FontFamily`를 지정하려다 무시됨 | `FontFamily.SansSerif`(OS 예외) 또는 짧은 라벨만 비트맵 |
| `GlanceTheme.colors` 기본 → 배경화면 색으로 바뀜 | `ColorProvider(day = Paper, night = Slate)` 고정 |
| 위젯 안에 1px 테두리 박스를 또 그림 | 테두리 없음, OS 틀만 |
| 잠금 화면 위젯에서 orange로만 주의 표시 | 글자로 말한다("마감 1개") |
| 매 분 Timeline 갱신 | 값이 바뀌는 시점에만 |
