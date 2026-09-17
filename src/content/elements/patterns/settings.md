---
id: settings
name: 설정 화면
nameEn: Settings
category: patterns
summary: 분류 이름 아래 1px 선으로 나눈 행을 쌓는 앱 설정 화면. 행은 이름 왼쪽, 현재 값과 > 오른쪽.
aliases: [설정 화면, settings, 환경설정, preferences, 설정, 옵션 화면, 앱 설정, 계정 설정]
platforms: [ios, android, web]
status: proposed
pillars: [minimalism]
tokens: [--mp-border, --mp-line, --mp-size-kicker, --mp-tracking-kicker, --mp-opacity-kicker, --mp-size-body, --mp-tracking-body, --mp-size-small, --mp-opacity-secondary, --mp-opacity-muted, --mp-opacity-meta, --mp-size-meta, --mp-tracking-meta, --mp-ink, --mp-bg, --mp-accent, --mp-duration-hover, --mp-width-read, --mp-gutter, --mp-font]
effects: [invert-hover, press]
related: [list, key-value, switch, segmented-control, theme-switch, confirm-step, header, back-link]
---

## 용도
앱의 선택 사항(테마, 알림, 데이터 내보내기, 계정)을 한 화면에 모은다. 설정은 적을수록 좋다 — 행을 더하기 전에 좋은 기본값으로 해결할 수 있는지 먼저 본다.
한 대상의 읽기 전용 정보(버전, 용량)만 보이면 `key-value`를 쓴다. 한 번만 묻는 선택(첫 실행 권한)은 `onboarding`에서 한다.

## 생김새
**구조**
- 화면 = 상단 바(`header`, 제목 "설정", 왼쪽 `back-link` `<`) → 분류 묶음 반복 → 맨 아래 버전 한 줄
- 분류 묶음 = kicker 한 줄(분류 이름) + 행 목록(위아래 1px 선)
- 행 종류 네 가지
  1. **이동 행**: 이름 · 현재 값 · `>` — 누르면 다음 화면(선택 목록)
  2. **토글 행**: 이름 · `switch` — 행 어디를 눌러도 토글
  3. **선택 행**: 이름 아래 `segmented-control`(값 2–3개일 때만, 예: 시스템/라이트/다크)
  4. **행동 행**: 이름만 + 오른쪽 `>` 없이 — 내보내기, 로그아웃
- 분류 순서: 자주 바꾸는 것 → 드문 것 → 위험한 것. 권장 묶음: 화면 · 알림 · 데이터 · 계정 · 정보
- 되돌릴 수 없는 행(데이터 삭제, 탈퇴)은 맨 아래 별도 분류 "위험"에만 두고, 누르면 `confirm-step`
- 선택 목록 화면(이동 행의 다음 화면): 값마다 한 행, 현재 값 앞 `■`(ink), 누르면 즉시 저장하고 이전 화면으로

**수치**
- 화면 폭(웹): `--mp-width-read`, 좌우 `--mp-gutter`. 앱은 좌우 20pt/16dp
- 분류 이름: `--mp-size-kicker`, `--mp-tracking-kicker`, `opacity: var(--mp-opacity-kicker)`, 위 여백 `2em`(첫 분류 0), 아래 `0.6em`
- 행: 최소 높이 48px(iOS 44pt, Android 48dp), 좌우 안쪽 `0.4em`, 행 아래 1px `--mp-line`, 분류 첫 행 위 1px `--mp-line`
- 이름: `--mp-size-body`, `--mp-tracking-body`, 불투명
- 현재 값: `--mp-size-small`, `opacity: var(--mp-opacity-secondary)`, 이름과 간격 최소 `1em`, 넘치면 말줄임
- `>`: 값 뒤 `0.4em`, 값과 같은 투명도
- 행 설명(꼭 필요할 때만): 이름 아래 `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)` — 필수 정보는 넣지 않는다
- 버전 줄: 가운데, `--mp-size-meta`, `--mp-opacity-meta`, 위 `2.5em`
- 위험 분류: kicker 앞 `■` 하나 `--mp-accent` 허용(화면의 유일한 강조)

**반응형**
| 폭 | 배치 |
|---|---|
| 390px 이하(웹)·iPhone SE/표준·Android compact(600dp 미만) | 한 줄기 전체 폭, 좌우 `--mp-gutter`(앱 20pt/16dp). 값이 길면 이름 아래 줄로(`flex-wrap: wrap`), `>`는 오른쪽 유지 |
| 700px | 한 줄기, 값은 이름과 같은 줄 |
| 860px 이상·iPad·Android medium(600–840dp) | 가운데 `--mp-width-read`(760px) 한 줄기. 좌측 분류 + 우측 상세 2단은 쓰지 않는다 |
| 1180px 이상·Android expanded(840dp 이상) | 여전히 `--mp-width-read` 가운데. 남는 폭은 여백 |
- iPhone Pro Max·가로 모드: 폭 최대 600pt로 가운데. iPad 시트로 띄울 때는 OS 폼 시트 폭(예외)

**접근성**
- 웹: 분류는 `<section aria-labelledby>` + kicker를 `<h2>`로(크기는 kicker 유지). 행 목록 `<ul>`, 이동 행은 `<a>`, 행동 행은 `<button>`, 토글 행은 `role="switch"` + `aria-checked`
- 이동 행 이름은 "테마, 시스템"처럼 값까지 읽히게 `aria-label` 또는 값 `<span>`을 링크 안에 둔다. `>`는 `aria-hidden="true"`
- 키보드: Tab으로 행 이동, Enter로 이동·행동, Space로 토글. 포커스는 반전 + `outline: 1px solid var(--mp-bg); outline-offset: -3px`(반전된 행 안쪽)
- VoiceOver/TalkBack: 행 하나가 요소 하나로 묶이게(`.accessibilityElement(children: .combine)`, `Modifier.semantics(mergeDescendants = true)`), 토글 행은 스위치 역할로
- Dynamic Type / 글자 크기: 행 높이는 최소값만 두고 글자에 따라 늘어나게. 가장 큰 크기에서 값은 아래 줄로
- 대비: 값 .7 이상 유지(.55 이하 금지). 비활성 행(.5)은 이유 문장을 따로 읽히게 `aria-describedby`
- 이동 행 VoiceOver 읽기 예: "테마, 시스템, 버튼". iOS `.accessibilityValue("시스템")` + `.accessibilityAddTraits(.isButton)`, Compose `semantics { stateDescription = "시스템"; role = Role.Button }`
- 위험 행: `aria-haspopup="dialog"`(누르면 확인 창), 라벨은 "데이터 삭제"처럼 대상까지

**조합 규칙**
- 화면당 orange 하나: 위험 분류 kicker의 `■`가 유일한 강조다. 이 화면에 `status-dot`·강조 버튼을 더하지 않는다.
- 위험 행 → `confirm-step`(되돌릴 수 없음을 알리고 입력 확인) → 실행 → `toast` 한 줄. 되돌릴 수 있는 변경에는 확인을 넣지 않는다.
- 테마 행은 `theme-switch`의 세 값(시스템/라이트/다크)과 같은 이름·같은 저장 키(`mp-theme`)를 쓴다.
- 토글 행의 켜짐은 `switch` 문서와 같이 **ink 채움**(`--mp-ink` 면, 손잡이 `--mp-bg`)이다. teal은 스위치 켜짐 색으로 쓰지 않는다 — teal은 현재 위치·선택 표시에만 쓴다.
- 온보딩 다시 보기·문의·라이선스는 맨 아래 "정보" 분류의 이동 행으로(`onboarding`, `link`).

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px 선으로 나뉜 행 |
| 호버·포커스(웹) | 행 반전: 배경 `--mp-ink`, 글자 `--mp-bg`, `--mp-duration-hover` ease |
| 누름(앱) | 누르는 동안 반전(`press`), 손을 떼면 즉시 원래대로 |
| 토글 켜짐 | `switch` 켜짐 모양, 행 모양은 그대로 |
| 선택 목록의 현재 값 | 행 앞 `■`(ink) |
| 비활성 | 행 `opacity: var(--mp-opacity-muted)`, 반전 없음, 아래 meta 한 줄로 이유("로그인하면 쓸 수 있습니다") |
| 저장 중 | 값 자리에 `저장 중…` (`loading` 어휘), 행 누름 막음 |
| 오류 | 값 자리에 짧은 사유, 아래 meta 한 줄 해결법. 색 없음 |
| 위험 행 | 모양은 기본 행과 같다. 분류 kicker 앞 `■` accent 하나로만 구분 |

## 동작
- 호버·누름: `invert-hover`(`--mp-duration-hover`), 앱은 `press` 즉시 반전.
- 값 변경은 누르는 순간 저장한다. "저장" 버튼을 따로 두지 않는다.
- 화면 전환은 즉시(웹) 또는 OS 기본 푸시(앱, 예외). 전환 애니메이션을 새로 만들지 않는다.
- 위험 행: `confirm-step`을 거친 뒤 실행, 끝나면 `toast` 한 줄.
- `prefers-reduced-motion: reduce`이면 transition 없음.

## 데모
```html demo
<div class="mp-settings">
  <p class="mp-settings-group">화면</p>
  <a class="mp-settings-row" href="#"><span>테마</span><span class="mp-settings-value">시스템 &gt;</span></a>
  <a class="mp-settings-row is-hover" href="#"><span>글자</span><span class="mp-settings-value">보통 &gt;</span></a>
  <span class="mp-settings-row is-disabled" aria-disabled="true"><span>동기화</span><span class="mp-settings-value">끔</span></span>
  <p class="mp-settings-group"><span class="mp-settings-mark" aria-hidden="true">■</span>위험</p>
  <button class="mp-settings-row" type="button"><span>삭제</span></button>
</div>
```

## 코드
```css
.mp-settings { max-width: var(--mp-width-read); }
.mp-settings-group {
  margin: 2em 0 0.6em;
  font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-kicker); opacity: var(--mp-opacity-kicker);
}
.mp-settings-group:first-child { margin-top: 0; }
.mp-settings-mark { color: var(--mp-accent); margin-right: 0.4em; }   /* 화면당 하나 */
.mp-settings-row {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0 1em;
  box-sizing: border-box; width: 100%; min-height: 48px; padding: 0 0.4em;
  border: 0; border-bottom: var(--mp-border) solid var(--mp-line); border-radius: 0;
  background: transparent; color: var(--mp-ink); text-align: left; text-decoration: none; cursor: pointer;
  font: 400 var(--mp-size-body) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-body);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-settings-group + .mp-settings-row { border-top: var(--mp-border) solid var(--mp-line); }
.mp-settings-row:hover, .mp-settings-row:focus-visible, .mp-settings-row:active, .mp-settings-row.is-hover {
  background: var(--mp-ink); color: var(--mp-bg);
}
.mp-settings-row:focus-visible { outline: 1px solid var(--mp-bg); outline-offset: -3px; }
.mp-settings-row.is-disabled { opacity: var(--mp-opacity-muted); cursor: not-allowed; background: transparent; color: var(--mp-ink); }
.mp-settings-value { font-size: var(--mp-size-small); opacity: var(--mp-opacity-secondary); }
.mp-settings-note { flex-basis: 100%; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
@media (prefers-reduced-motion: reduce) { .mp-settings-row { transition: none; } }
```

## 앱
- SwiftUI: `.insetGrouped`의 둥근 묶음을 쓰지 않는다.
  ```swift
  List {
    Section {
      NavigationLink(value: Route.theme) {
        HStack { Text("테마"); Spacer(); Text("시스템 >").opacity(0.7) }
      }
      .accessibilityValue("시스템")
    } header: { Text("화면").textCase(nil).font(.custom("Mulmaru", size: 13)).opacity(0.45) }
  }
  .listStyle(.plain).scrollContentBackground(.hidden)
  .listRowSeparatorTint(Color("Line")).background(Color("Background"))
  ```
- 이동 행: `NavigationLink`의 기본 chevron 대신 `Text(">")`를 직접 그린다(`.navigationLinkIndicatorVisibility(.hidden)` 또는 `Button` + `path.append`).
- 토글 행: `Toggle`은 OS 스위치 모양(예외). 켜짐 색은 `.tint(Color("Ink"))`(ink 상수, 테마별 slate/paper), 둥근 모양은 OS 예외로 그대로 둔다.
- Compose: Material `ListItem`을 쓰면 `containerColor = bg`, `tonalElevation = 0.dp`.
  ```kotlin
  val pressed by src.collectIsPressedAsState()
  Row(
    Modifier.fillMaxWidth().heightIn(min = 48.dp)
      .background(if (pressed) Ink else Bg)
      .clickable(src, indication = null) { nav.navigate("theme") }
      .semantics(mergeDescendants = true) { role = Role.Button; stateDescription = "시스템" }
      .padding(horizontal = 16.dp),
    verticalAlignment = Alignment.CenterVertically
  ) { Text("테마", Modifier.weight(1f)); Text("시스템 >", Modifier.alpha(0.7f)) }
  HorizontalDivider(thickness = 1.dp, color = Line)
  ```
- Android 토글: `Switch`는 Material 모양 예외, `SwitchDefaults.colors(checkedTrackColor = Ink, checkedThumbColor = Bg, uncheckedTrackColor = Bg, uncheckedBorderColor = LineButton)` — 켜짐은 ink 채움.
- 알림·위치·사진 권한 행은 앱 안에서 바꿀 수 없다 → 현재 상태만 보여 주고 누르면 OS 설정 화면(`UIApplication.openSettingsURLString`, `Settings.ACTION_APPLICATION_DETAILS_SETTINGS`)으로 보낸다. 그 화면은 OS 모양 그대로(예외).
- 값 저장: iOS `@AppStorage`, Android DataStore. 저장 즉시 반영.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 행 이름은 명사 하나("테마", "알림").
- 해야 할 것: 현재 값을 오른쪽에 보여 준다. 누르지 않아도 상태를 알 수 있게.
- 해야 할 것: 위험 행은 맨 아래 분류에 모으고 반드시 `confirm-step`.
- 해야 할 것: 바꾸는 즉시 저장한다.
- 해야 할 것: 맨 아래 버전 한 줄, 문의 링크는 `link`로.
- 하지 말 것: 둥근 그룹 카드(`insetGrouped`), 그림자 있는 설정 카드.
- 하지 말 것: 행마다 색깔 아이콘 사각형(iOS 설정 앱 흉내).
- 하지 말 것: 설명 문단을 기본으로 펼쳐 두기, 필수 정보를 .55 이하 글자로.
- 하지 말 것: 삭제·탈퇴 행을 목록 중간에 두거나 빨간 글자로.
- 하지 말 것: 스위치 켜짐을 teal·orange·OS 기본 초록으로 칠하기(켜짐 = ink 채움).
- 하지 말 것: "저장" 버튼, 값 변경마다 뜨는 확인 창(되돌릴 수 있는 변경은 확인하지 않는다).

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `.insetGrouped` 둥근 흰 카드 묶음 | `.plain` + 1px `--mp-line` 행 구분 |
| 값 없이 `>`만 있는 이동 행 | 현재 값 + `>` (`시스템 >`) |
| 삭제 행을 빨간 글자로 목록 중간에 | 맨 아래 "위험" 분류 + kicker `■` 하나 + `confirm-step` |
| 토글 행의 스위치만 눌림 | 행 전체가 누름 영역(최소 44pt/48dp) |
| 호버 시 teal·orange 배경 | 잉크/배경 반전 |
| 토글 켜짐을 teal(`.tint(secondary)`)이나 OS 초록으로 | ink 채움(`.tint(Ink)`, `checkedTrackColor = Ink`) |
| 스크린리더가 이름과 값을 따로 읽음 | 행 하나로 묶고 값은 `accessibilityValue`/`stateDescription` |
