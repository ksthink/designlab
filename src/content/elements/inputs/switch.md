---
id: switch
name: 스위치
nameEn: Switch
category: inputs
summary: 누르는 즉시 켜고 끄는 직사각 스위치. 두 칸 틀 안에서 사각 손잡이가 한 칸 옮겨 가며, 켜지면 잉크로 채운다.
aliases: [스위치, 토글, 켜기 끄기, 온오프, 설정 토글, switch, toggle, on off, toggle switch, setting toggle]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-line, --mp-line-strong, --mp-border, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-muted, --mp-opacity-meta, --mp-steps-fill, --mp-duration-fill]
effects: [fx-fill, reduced-motion]
related: [checkbox, settings, segmented-control, theme-switch]
---

## 용도
- 누르는 **즉시 반영**되는 켜기/끄기 설정(알림, 소리, 자동 저장, 위치 사용).
- 저장 버튼을 눌러야 반영되는 폼 안의 선택이면 `checkbox`를 쓴다.
- 셋 이상의 상태(자동·라이트·다크)면 `segmented-control`이나 `radio`, 테마 전환은 `theme-switch`를 쓴다.
- 반영에 시간이 걸리거나 실패할 수 있으면(서버 설정) 켠 직후 결과를 기다리는 상태를 보여 준다.

## 생김새
- 한 줄: 라벨 왼쪽, 스위치 줄 오른쪽 끝(`justify-content: space-between`). 줄 최소 높이 `2.4em`, 설정 목록에서는 줄 사이 1px `--mp-line`
- 틀(track): `2em × 1em` 직사각형, 테두리 `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`, 배경 투명
- 손잡이(thumb): 틀 안쪽 2px 떨어진 사각형, 폭 = 틀 절반 - 2px, 높이 = 틀 - 4px
  - 꺼짐: 왼쪽, 테두리만 `--mp-line-strong`(빈 사각)
  - 켜짐: 오른쪽, `--mp-ink` 채움, 틀 테두리 `--mp-ink`
- 상태 글자(선택): 스위치 왼쪽에 `켬`/`끔` — `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`. 모양만으로 알기 어려운 곳(첫 설정 화면)에서만
- 라벨: `--mp-size-small` / `--mp-tracking-small`, 글자 `--mp-ink` 불투명. 보조 설명은 라벨 아래 `--mp-size-meta` `opacity: var(--mp-opacity-meta)`
- 라벨은 기능 이름(`알림`)으로 쓴다. `알림 켜기`처럼 동사를 붙이지 않는다(상태와 헷갈림)

## 상태
| 상태 | 표현 |
|---|---|
| 꺼짐 | 틀 `--mp-line-strong`, 손잡이 왼쪽 빈 사각 |
| 켜짐 | 틀 `--mp-ink`, 손잡이 오른쪽 잉크 채움 |
| 호버 | 꺼짐 틀·손잡이 테두리 `--mp-ink` |
| 포커스 | 틀에 `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 반영 중 | 손잡이는 새 위치, 틀 테두리 `--mp-line`(옅게) + `aria-busy="true"` |
| 반영 실패 | 손잡이를 원래 위치로 되돌리고 `toast`로 원인 |
| 비활성 | 줄 전체 `opacity: var(--mp-opacity-muted)`, `cursor: not-allowed` |

## 동작
### 모션
- 손잡이 이동: `transform`을 `var(--mp-duration-fill) var(--mp-steps-fill)`(0.19s, `steps(4, end)`)로 끊어 옮긴다. `fx-fill`과 같은 터미널 계단이다. 부드럽게 미끄러지거나 튕기지 않는다.
- 채움 색은 이동이 끝난 칸에서 바로 바뀐다(색 트윈 없음).
- `prefers-reduced-motion: reduce`이면 즉시 이동.

### 키보드·접근성
- 네이티브 `<input type="checkbox" role="switch">`를 시각적으로 숨기고(`opacity: 0`, 1px) 바로 뒤 `<span>`으로 틀을 그린다. `appearance: none` input의 `::after`는 브라우저마다 달라 쓰지 않는다.
- `role="switch"`는 `aria-checked`를 켜짐/꺼짐으로 읽는다(네이티브 `checked`와 동기). `Space`로 토글한다.
- 라벨은 `<label>`로 감싸 줄 전체가 누르는 영역이 된다. 보조 설명은 `aria-describedby`.
- 반영 실패로 되돌렸다면 포커스는 스위치에 그대로 두고 `toast`(`role="status"`)로 알린다.
- 켜짐/꺼짐을 색으로만 구분하지 않는다: 손잡이 위치 + 채움 두 가지로 구분된다.

### 반응형
- 스위치 크기는 화면 폭에 따라 줄이지 않는다. 좁은 화면에서 라벨이 길면 라벨이 줄바꿈되고 스위치는 오른쪽 위에 고정한다(`align-items: start`).
- 터치 기기에서 틀 자체가 작아도 줄 전체(`min-height: 2.4em`, 폭 100%)가 누르는 영역이다.

## 데모
```html demo
<div class="mp-switch-demo">
  <label class="mp-switch">끔<input type="checkbox" role="switch"><span class="mp-switch-track" aria-hidden="true"></span></label>
  <label class="mp-switch">켬<input type="checkbox" role="switch" checked><span class="mp-switch-track" aria-hidden="true"></span></label>
  <label class="mp-switch">포커스<input type="checkbox" role="switch" checked><span class="mp-switch-track is-focus" aria-hidden="true"></span></label>
  <label class="mp-switch">잠김<input type="checkbox" role="switch" disabled><span class="mp-switch-track" aria-hidden="true"></span></label>
</div>
```

## 코드
```css
.mp-switch-demo { display: grid; max-width: 14em; }
.mp-switch {
  position: relative; display: flex; justify-content: space-between; align-items: center; gap: 1em;
  min-height: 2.4em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); color: var(--mp-ink); cursor: pointer;
}
.mp-switch + .mp-switch { border-top: var(--mp-border) solid var(--mp-line); }
.mp-switch input { position: absolute; opacity: 0; width: 1px; height: 1px; margin: 0; }
.mp-switch-track { position: relative; flex: none; box-sizing: border-box; width: 2em; height: 1em; border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0; }
.mp-switch-track::after {
  content: ""; position: absolute; top: 2px; left: 2px; box-sizing: border-box;
  width: calc(50% - 2px); height: calc(100% - 4px);
  border: var(--mp-border) solid var(--mp-line-strong);
  transition: transform var(--mp-duration-fill) var(--mp-steps-fill);
}
.mp-switch:hover input:not(:disabled) + .mp-switch-track, .mp-switch:hover input:not(:disabled) + .mp-switch-track::after { border-color: var(--mp-ink); }
.mp-switch input:checked + .mp-switch-track { border-color: var(--mp-ink); }
.mp-switch input:checked + .mp-switch-track::after { transform: translateX(calc(100% - 2px)); background: var(--mp-ink); border-color: var(--mp-ink); }
.mp-switch input:focus-visible + .mp-switch-track, .mp-switch-track.is-focus { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-switch input[aria-busy="true"] + .mp-switch-track { border-color: var(--mp-line); }
.mp-switch:has(input:disabled) { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-switch-state { margin-left: auto; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
@media (prefers-reduced-motion: reduce) { .mp-switch-track::after { transition: none; } }
```

## 앱
- SwiftUI: 브랜드 화면은 사용자 `ToggleStyle` — `HStack { configuration.label; Spacer(); ZStack(alignment: isOn ? .trailing : .leading) { Rectangle().stroke(isOn ? ink : lineStrong, lineWidth: 1).frame(width: 32, height: 16); Rectangle().fill(isOn ? ink : .clear).overlay(Rectangle().stroke(isOn ? ink : lineStrong, lineWidth: 1)).frame(width: 14, height: 12).padding(2) } }`. 애니메이션은 `.animation(nil)` 또는 `.transaction { $0.animation = nil }`. `.accessibilityValue(isOn ? "켬" : "끔")`.
- Compose: `Row(Modifier.toggleable(value = on, role = Role.Switch, onValueChange = { }).heightIn(min = 48.dp))` + 직각 `Box` 두 개(틀 32×16dp, 손잡이 14×12dp). Material `Switch`의 둥근 트랙은 쓰지 않는다.
- **OS 예외**: iOS 시스템 `Form`/`List` 설정 화면, 설정 번들(Settings.bundle), Android `PreferenceScreen`에서 시스템 `Toggle`(`UISwitch`)·Material `Switch`를 쓰는 경우 둥근 모양을 억지로 바꾸지 않는다. 이때 `.tint`/`SwitchDefaults.colors(checkedTrackColor)`는 잉크 값으로 두고 초록 기본색·teal·orange는 쓰지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 누르는 즉시 반영한다. 실패하면 되돌리고 알린다.
- 해야 할 것: 켜짐은 손잡이 위치 + 잉크 채움, 두 가지로 분명하게.
- 해야 할 것: 라벨은 기능 이름, 줄 전체가 누르는 영역.
- 해야 할 것: 손잡이는 `steps()`로 끊어서 이동.
- 하지 말 것: 둥근 알약 스위치(OS 시스템 컨트롤 예외 외), 원형 손잡이.
- 하지 말 것: 초록·teal·orange 켜짐 색, 스프링처럼 튕기는 손잡이.
- 하지 말 것: 저장 버튼이 있는 폼 안에 스위치(→ `checkbox`).
- 하지 말 것: `알림 끄기`처럼 뜻이 뒤집히는 라벨.
