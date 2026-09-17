---
id: tab-bar
name: 탭 바
nameEn: Tab Bar
category: navigation
summary: 앱 하단에 고정된 주 메뉴. 위 1px 헤어라인, 현재 탭은 teal ■ 면과 투명도 1, 누르면 칸이 반전된다.
aliases: [탭 바, 탭바, 하단 탭, 하단 메뉴, 하단 내비게이션, 하단 네비게이션, bottom navigation, bottom nav, bottom bar, tab bar, 앱 메뉴, 앱 주 메뉴, 메뉴, GNB]
platforms: [ios, android, web]
status: proposed
pillars: [minimalism, pixel-art, retro-color]
tokens: [--mp-bg, --mp-line, --mp-size-meta, --mp-tracking-meta, --mp-secondary, --mp-opacity-nav, --mp-ink, --mp-opacity-muted, --mp-border, --mp-font, --mp-gutter]
effects: [invert-hover, reduced-motion]
related: [menu, header, tabs, fab, pixel-icon, status-dot, drawer]
---

## 용도
앱의 주요 화면 3–5개를 한 번에 오갈 때 쓴다. 앱의 `menu`에 해당한다.
웹에서는 설치형 웹앱(PWA)이나 앱처럼 쓰는 좁은 화면(600px 미만)에서만 쓴다. 넓은 화면은 `header` 안 `menu`로 바꾼다.
한 화면 안의 패널 전환은 `tabs`, 5개를 넘는 목적지는 설정 목록이나 `drawer`로 뺀다.

**함께 쓰는 요소**
- 앱에서는 탭 바가 주 메뉴, 머리(`header`)에는 현재 화면 제목과 행동만. 같은 목적지를 탭 바와 `menu`에 동시에 두지 않는다
- `fab`은 탭 바 위로 `--mp-gutter`만큼 띄운다. 탭 바 가운데에 끼워 넣지 않는다
- 화면 안 전환은 탭 바 아래 본문의 `tabs`로. 탭 바 ■와 `tabs` ■는 묶음이 달라 둘 다 있어도 된다
- 현재 탭에 orange를 쓰지 않는다. 알림은 `status-dot` 하나

## 생김새
- 화면 아래에 고정된 한 줄 막대. 배경 `--mp-bg`, 위 경계 1px `--mp-line`, radius 0
- 그림자·흐림·반투명 유리·떠 있는 캡슐 없음 — 면 하나와 선 하나
- 칸은 같은 폭(`flex: 1 1 0`). 칸마다 세로로 [■ 표시 자리] → [아이콘(선택)] → [이름]
- 이름: `--mp-size-meta`, 자간 `--mp-tracking-meta`, 1–4글자 명사("오늘", "기록", "설정")
- 아이콘을 쓰면 `pixel-icon` 40×40 1비트를 정수 배율로(웹 1×=40px는 크므로 보통 아이콘 없이 이름만). 아이콘만 두고 이름을 빼지 않는다
- **현재 탭 표시**: 이름 위 `6px` 정사각 **teal ■ 면**(`background: var(--mp-secondary)`) + opacity 1. `menu`의 현재 위치 ■와 같은 어휘다
- 나머지 탭: `--mp-opacity-nav`(0.7), ■ 자리는 비워 둔다(높이는 유지해 글자가 흔들리지 않게)

**크기·간격**
- 막대 높이: 칸 위 여백 `0.7em` + ■ `6px` + 간격 `0.5em` + 이름 + 아래 여백 `0.9em` ≈ 56pt/56dp. 최소 터치 높이 44pt/48dp
- 아래 안전 영역: `padding-bottom: env(safe-area-inset-bottom)` 추가
- 알림 표시: 이름 오른쪽 위 `status-dot`(6px 사각) 하나. 숫자 배지는 쓰지 않는다

**반응형**
- 600px 미만: 탭 바 표시, 머리의 `menu` 숨김
- 600px 이상: 탭 바 숨김, `header` 안 가로 `menu`로 같은 목적지를 보여 준다
- 가로 모드 폰: 이름을 한 줄에 유지, 아이콘이 있으면 아이콘을 이름 왼쪽으로

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | `--mp-opacity-nav`, ■ 자리 비움 |
| 호버·포커스(웹) | opacity 1 |
| 현재 `aria-current="page"` | teal ■ 면 + opacity 1 |
| 누름 | 칸 배경 `--mp-ink`, 글자 `--mp-bg`, opacity 1 (누르는 동안만) |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: -3px`(칸 안쪽) |
| 비활성 | 쓰지 않는다. 갈 수 없는 탭은 뺀다. 남겨야 하면 `--mp-opacity-muted` + `aria-disabled="true"` |
| 알림 있음 | 이름 옆 `status-dot` |

## 동작
- 탭 전환은 즉시. 선택 표시가 미끄러지거나 커지는 움직임 없음
- 누름 반전은 `invert-hover`를 눌림에 적용, transition 없이 즉시(터치 반응은 늦으면 안 된다)
- 현재 탭을 다시 누르면 그 화면의 맨 위로 스크롤하거나 첫 단계로 돌아간다(OS 관습)
- 스크롤할 때 탭 바를 숨기지 않는다
- `reduced-motion`: 움직임이 없으므로 따로 할 일 없음. 화면 전환 애니메이션만 끈다

**접근성**
- 웹: `<nav aria-label="주 메뉴">` 안 `<a>` 목록, 현재 탭 `aria-current="page"`. `role="tablist"`를 붙이지 않는다 — 페이지 이동 링크다
- ■는 장식이므로 `::before`(읽히지 않음). 현재 여부는 `aria-current`가 전달한다
- 키보드: `Tab`으로 칸 이동, `Enter`로 이동. 방향키 이동은 요구하지 않는다(링크 목록)
- iOS VoiceOver는 "탭, 2개 중 1번째, 선택됨"을 읽도록 시스템 탭 또는 `.accessibilityAddTraits(.isSelected)`
- 아이콘만 쓰는 경우는 금지. 이름이 곧 접근성 라벨이다

## 데모
```html demo
<nav class="mp-tab-bar" aria-label="주 메뉴">
  <a href="#" aria-current="page">오늘</a>
  <a href="#" class="is-hover">기록</a>
  <a href="#">설정</a>
</nav>
```

## 코드
```css
.mp-tab-bar {
  display: flex; width: 100%;
  background: var(--mp-bg); border-top: var(--mp-border) solid var(--mp-line);
  padding-bottom: env(safe-area-inset-bottom);
}
.mp-tab-bar a {
  flex: 1 1 0; display: flex; flex-direction: column; align-items: center; gap: 0.5em;
  padding: 0.7em 0 0.9em; color: var(--mp-ink); text-decoration: none;
  font: 400 var(--mp-size-meta) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  opacity: var(--mp-opacity-nav);
}
.mp-tab-bar a::before { content: ""; width: 6px; height: 6px; }
.mp-tab-bar a:hover, .mp-tab-bar a:focus-visible, .mp-tab-bar a.is-hover { opacity: 1; }
.mp-tab-bar a[aria-current="page"] { opacity: 1; }
.mp-tab-bar a[aria-current="page"]::before { background: var(--mp-secondary); }
.mp-tab-bar a:active { background: var(--mp-ink); color: var(--mp-bg); opacity: 1; }
.mp-tab-bar a:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: -3px; }
.mp-tab-bar a[aria-disabled="true"] { opacity: var(--mp-opacity-muted); pointer-events: none; }
@media (min-width: 600px) { .mp-tab-bar--app-only { display: none; } }
```

## 앱
```swift
struct PixelTabBar: View {
  @Binding var current: Int; let names = ["오늘", "기록", "설정"]
  var body: some View {
    HStack(spacing: 0) { ForEach(names.indices, id: \.self) { i in
      Button { current = i } label: { VStack(spacing: 6) {
        Rectangle().fill(i == current ? Color.mpSecondary : .clear).frame(width: 6, height: 6)
        Text(names[i]).font(.custom("Mulmaru", size: 12))
      }.frame(maxWidth: .infinity, minHeight: 56).opacity(i == current ? 1 : 0.7) }
      .buttonStyle(.plain).accessibilityAddTraits(i == current ? .isSelected : []) } }
    .background(Color.mpBg).overlay(alignment: .top) { Rectangle().fill(Color.mpLine).frame(height: 1) }
  }
}
```
```kotlin
NavigationBar(containerColor = MpBg, tonalElevation = 0.dp, modifier = Modifier.drawBehind { drawLine(MpLine, Offset.Zero, Offset(size.width, 0f), 1.dp.toPx()) }) {
  names.forEachIndexed { i, name ->
    NavigationBarItem(selected = i == current, onClick = { current = i },
      icon = { Box(Modifier.size(6.dp).background(if (i == current) MpSecondary else Color.Transparent, RectangleShape)) },
      label = { Text(name, fontFamily = Mulmaru, fontWeight = FontWeight.Normal) },
      colors = NavigationBarItemDefaults.colors(indicatorColor = Color.Transparent, selectedTextColor = MpInk, unselectedTextColor = MpInk.copy(alpha = 0.7f)))
  }
}
```
- SwiftUI: 시스템 `TabView`의 탭 바는 OS가 모양을 정한다(iOS 26 이상 떠 있는 유리 캡슐) — **OS 예외**로 받아들이고 `.tint(ink)`, Mulmaru 글꼴만 맞춘다. 모양까지 맞춰야 하면 `TabView`를 `.toolbar(.hidden, for: .tabBar)`로 숨기고 `safeAreaInset(edge: .bottom) { PixelTabBar() }`로 직접 그린다.
- 눌림 반전: ripple을 끄고(`indication = null`) `collectIsPressedAsState()`로 배경 ink.
- OS 예외: iOS 26 이상 시스템 `TabView` 유리 바(쓰면 모양은 OS에 맡긴다), 안드로이드 제스처 내비게이션 막대·predictive back 애니메이션, iOS 홈 인디케이터 영역.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 탭 3–5개, 이름은 늘 보이게.
- 해야 할 것: 현재 탭은 teal ■ 면 + opacity 1, 나머지는 0.7.
- 해야 할 것: 위 1px `--mp-line` 하나로 경계, 배경은 `--mp-bg`.
- 해야 할 것: 누름은 즉시 반전, 넓은 화면에서는 `menu`로 바꾸기.
- 하지 말 것: 알약·원 모양 선택 인디케이터, 선택 탭 글자를 teal·orange로.
- 하지 말 것: 떠 있는 둥근 막대(직접 그릴 때), 위 그림자, 흐린 유리 배경.
- 하지 말 것: 가운데 튀어나온 큰 버튼, 탭마다 다른 색, 숫자 배지 남발.
- 하지 말 것: 스크롤하면 숨는 탭 바, 아이콘만 있는 탭.

**자주 틀리는 것**
- 웹 탭 바에 `role="tablist"`/`tab`을 붙인다 → 이동이면 `<nav>` + `aria-current="page"`
- 현재 탭 이름을 teal 글자로 칠한다 → 글자는 ink, 위에 6px teal ■ 면
- `position: fixed` 막대가 마지막 목록 항목을 가린다 → 본문 아래에 탭 바 높이 + 안전 영역만큼 여백
- Material `NavigationBar`의 알약 인디케이터를 그대로 둔다 → `indicatorColor = Color.Transparent`
- 탭 바 위에 그림자로 경계를 만든다 → 1px `--mp-line`
- 600px 이상에서도 탭 바를 남긴다 → `header` 안 `menu`로 바꾼다
