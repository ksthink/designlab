---
id: fab
name: 플로팅 버튼
nameEn: Floating Action Button
category: actions
summary: 앱 화면 구석에 떠 있는 주 행동 하나. 잉크로 채운 정사각형, 그림자 없음.
aliases: [FAB, 플로팅 버튼, 떠 있는 버튼, 추가 버튼, 새로 만들기 버튼, floating action button, + 버튼]
platforms: [ios, android]
status: proposed
pillars: [minimalism, pixel-art, retro-color]
tokens: [--mp-ink, --mp-bg, --mp-size-subheading, --mp-font, --mp-gutter, --mp-accent, --mp-palette-slate, --mp-border, --mp-line]
effects: [press]
related: [icon-button, button, tab-bar, bottom-sheet]
---

## 용도
화면의 주 행동이 하나이고 목록을 스크롤하는 동안에도 늘 닿아야 할 때(기록 추가, 새 메모, 측정 시작) 쓴다.
한 화면에 하나만. 행동이 둘 이상이면 FAB을 쓰지 않고 머리의 `text-action`이나 목록 끝의 `button`으로 옮긴다.
웹에서는 쓰지 않는다 — 웹 화면은 머리·본문 안의 `button`으로 충분하다.

**함께 쓰는 요소**
- `fab` + `tab-bar`: FAB은 탭 바 위 오른쪽, 탭 바 선과 16pt 띄운다. 탭 바 안에 튀어나온 가운데 버튼으로 합치지 않는다
- `fab` → `bottom-sheet`: 누르면 입력 시트를 열고, 시트가 열린 동안 FAB은 숨긴다
- `fab` + `toast`: 저장 알림 토스트는 FAB 위로 띄워 가리지 않는다
- orange FAB은 화면의 강조 하나를 쓴다. 같은 화면의 `status-dot`·강조 `button`은 잉크로 둔다
- 목록이 비었을 때(`empty-state`)는 FAB 대신 가운데 `button` 하나로 첫 행동을 안내해도 된다. 둘을 함께 두지 않는다

## 생김새
**모양**
- 정사각, radius 0, 배경 `--mp-ink`, 글리프 `+` 또는 `pixel-icon`을 `--mp-bg`로
- 그림자·elevation 0. 아래 내용과 떨어져 보이도록 1px `--mp-bg` 테두리를 두른다
- 글리프 `--mp-size-subheading`, `--mp-font` 400, `line-height: 1`
- 글자형(확장 FAB)은 `+ 기록`처럼 글리프 + 1–3자, 높이 같고 좌우 여백 `1.2em`

**크기·간격**
- 56pt/56dp 정사각(웹 데모 `3.5rem`)
- 화면 가장자리에서 `--mp-gutter`(앱 상수 16–24pt), `tab-bar`가 있으면 탭 바 위 16pt
- 아이콘 원본 40×40 1비트는 1× 그대로(56 안에 여백 8)
- 목록 끝에 FAB 높이 + 16pt 만큼 여백을 두어 마지막 항목이 가려지지 않게 한다

**강조 변형 (화면당 하나)**
- 이 FAB이 화면의 유일한 강조일 때만 배경 `--mp-accent`, 글리프 `--mp-palette-slate`
- 글리프·아이콘만 허용. 글자형 FAB은 글자가 24px 이상일 때만 orange 면

**반응형**
- 태블릿·가로 화면에서도 크기 고정, 오른쪽 아래 고정
- 키보드가 올라오면 키보드 위로 따라 올라가거나 숨긴다(입력 중에는 숨기는 것을 우선)
- 한손 사용을 위해 기본 위치는 오른쪽 아래. 왼손잡이 설정이 있으면 좌우 반전

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 잉크 면, bg 글리프, 1px bg 테두리 |
| 누름 | 반전: 배경 `--mp-bg`, 1px `--mp-ink` 테두리, ink 글리프 + 1px 아래로 |
| 포커스(키보드·스위치 제어) | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 비활성 | 숨긴다. 흐린 FAB을 남기지 않는다 |
| 스크롤 중 | 그대로 둔다(줄어들기·숨기기 없음) |
| 진행 중 | 글리프를 `...`로, 누름 막기 |

## 동작
- `press`: 1px 아래 이동 + 반전, 즉시(transition 없음)
- 떠오르기·회전(+ → x)·확대·펼쳐지는 스피드 다이얼 없음
- 누른 결과가 입력이면 `bottom-sheet`를 연다

**접근성**
- 요소는 버튼(`<button>`, SwiftUI `Button`, Compose `FloatingActionButton`)
- 접근성 이름 필수: "새 기록 만들기". 글리프 `+`는 읽히지 않게 숨긴다
- 포커스 순서: 화면 내용 뒤, `tab-bar` 앞
- 스크린리더 사용자도 같은 행동을 찾을 수 있게 목록 머리 등에 같은 기능이 보이면 좋다
- 터치 영역은 56 그 자체로 충분(44pt/48dp 이상)
- iOS VoiceOver: `.accessibilityLabel("새 기록 만들기")` + `.accessibilitySortPriority`로 내용 뒤에 읽히게. Android TalkBack: `Modifier.semantics { contentDescription = "새 기록 만들기" }`, `traversalIndex`로 순서 지정
- 하드웨어 키보드(태블릿): `Tab`으로 도달, `Enter`·`Space` 실행. 포커스 링은 1px ink 사각

**reduced-motion**
- 움직임이 없으므로 달라지는 것이 없다. 1px 이동은 순간 이동이라 유지

## 데모
```html demo
<div class="mp-fab-stage">
  <button class="mp-fab" type="button" aria-label="새로 만들기">+</button>
  <button class="mp-fab is-press" type="button" aria-label="새로 만들기">+</button>
  <button class="mp-fab mp-fab--accent" type="button" aria-label="새로 만들기">+</button>
</div>
```

## 코드
```css
.mp-fab-stage { display: flex; justify-content: flex-end; align-items: flex-end; gap: 1rem; height: 8rem; padding: 1rem; border: var(--mp-border) solid var(--mp-line); }
.mp-fab {
  display: inline-flex; align-items: center; justify-content: center;
  width: 3.5rem; height: 3.5rem; padding: 0;
  border: var(--mp-border) solid var(--mp-bg); border-radius: 0;
  background: var(--mp-ink); color: var(--mp-bg);
  font: 400 var(--mp-size-subheading) / 1 var(--mp-font); cursor: pointer;
}
.mp-fab:active, .mp-fab.is-press { background: var(--mp-bg); color: var(--mp-ink); border-color: var(--mp-ink); transform: translateY(1px); }
.mp-fab:focus-visible { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; }
.mp-fab--accent { background: var(--mp-accent); color: var(--mp-palette-slate); } /* 화면의 유일한 강조일 때만 */
/* 실제 화면: position: fixed; right: var(--mp-gutter); bottom: calc(var(--mp-gutter) + env(safe-area-inset-bottom)); */
```

## 앱
- SwiftUI: `ZStack(alignment: .bottomTrailing) { content; Button { } label: { Text("+").font(mulmaru) }.frame(width: 56, height: 56).background(ink).foregroundStyle(bg).overlay(Rectangle().stroke(bg, lineWidth: 1)).padding(16) }`, `.shadow` 없음, `.accessibilityLabel("새 기록 만들기")`.
- Compose: `FloatingActionButton(onClick, shape = RectangleShape, containerColor = ink, contentColor = bg, elevation = FloatingActionButtonDefaults.elevation(0.dp, 0.dp, 0.dp, 0.dp))`, `Scaffold(floatingActionButton = …)`.
- `ExtendedFloatingActionButton`도 `RectangleShape`, 글자 Mulmaru 400, 확장·축소 애니메이션 끄기(`expanded = true` 고정).
- 눌림 반전은 `configuration.isPressed` / `collectIsPressedAsState()`. ripple 끄기.
- OS 예외 없음 — FAB은 앱이 그리는 요소다.

```swift
Button(action: add) {
  Text("+").font(.custom("Mulmaru", size: 24))
    .frame(width: 56, height: 56)
    .foregroundStyle(pressed ? MP.ink : MP.bg)
    .background(pressed ? MP.bg : MP.ink)
    .overlay(Rectangle().stroke(pressed ? MP.ink : MP.bg, lineWidth: 1))
    .offset(y: pressed ? 1 : 0)
}
.buttonStyle(.plain)  // 사용자 ButtonStyle에서 pressed = configuration.isPressed
.padding(16).accessibilityLabel("새 기록 만들기")
```

```kotlin
val pressed by source.collectIsPressedAsState()
FloatingActionButton(
  onClick = add, shape = RectangleShape, interactionSource = source,
  containerColor = if (pressed) MP.bg else MP.ink, contentColor = if (pressed) MP.ink else MP.bg,
  elevation = FloatingActionButtonDefaults.elevation(0.dp, 0.dp, 0.dp, 0.dp),
  modifier = Modifier.size(56.dp).offset(y = if (pressed) 1.dp else 0.dp)
    .border(1.dp, if (pressed) MP.ink else MP.bg).semantics { contentDescription = "새 기록 만들기" },
) { Text("+", fontFamily = Mulmaru) }
```
- OS 예외 목록: 없음. 단 시스템 키보드·홈 인디케이터 영역은 FAB이 피한다

## 해야 할 것 / 하지 말 것
- 해야 할 것: 한 화면에 하나, 정사각, 그림자 없음.
- 해야 할 것: 접근성 이름에 행동을 동사로.
- 해야 할 것: 목록 끝에 가려지지 않을 여백.
- 해야 할 것: 누름은 반전 + 1px 이동.
- 해야 할 것: 강조 orange FAB이면 그 화면에 다른 orange를 두지 않는다.
- 하지 말 것: 원형 FAB, elevation 그림자.
- 하지 말 것: 펼쳐지는 스피드 다이얼, + → x 회전.
- 하지 말 것: 스크롤에 따라 줄어들거나 사라지는 FAB.
- 하지 말 것: FAB 두 개, 웹 페이지에 FAB.
- 하지 말 것: orange 면 위 작은 글자.

**자주 틀리는 것**
- Compose FAB 기본 elevation(6dp) 남김 → `elevation(0.dp, 0.dp, 0.dp, 0.dp)` 네 값 모두
- 기본 `FloatingActionButtonDefaults.shape`(둥근 16dp) → `RectangleShape`
- SwiftUI `.clipShape(Circle())` 복사 → 지우고 `Rectangle` 테두리
- 누름에 ripple·확대 → ripple 끄고 반전 + 1px 이동
- 목록 마지막 항목이 FAB에 가려짐 → 목록 아래 여백 56 + 16
