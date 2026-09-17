---
id: avatar
name: 아바타
nameEn: Avatar
category: content
summary: 사람·계정을 나타내는 정사각형. 1비트 픽셀 아이콘을 정수 배율로, 없으면 이름 첫 글자를 모눈 위에.
aliases: [아바타, avatar, 프로필 사진, 프로필, 사용자 이미지, user icon, 계정 아이콘, profile picture, 사용자 표시]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-border, --mp-line, --mp-line-strong, --mp-grid-bg, --mp-grid-line, --mp-glyph, --mp-ink, --mp-bg, --mp-opacity-pixel, --mp-size-small, --mp-size-meta, --mp-size-heading, --mp-accent, --mp-duration-hover]
effects: [invert-hover]
related: [image, pixel-icon, grid-thumbnail, status-dot, list]
---

## 용도
댓글 작성자, 계정 메뉴, 공유 대상처럼 사람·계정을 짧게 표시할 때 쓴다.
이름 글자가 바로 옆에 있으면 아바타 없이 이름만으로 충분한지 먼저 본다(빼기).
단일 사용자 앱에서는 계정 아바타를 두지 않는다. 계정 메뉴는 글자(`계정 >`)로.

## 생김새
**구조**
- 바깥 틀 `span`/`button` 하나, 안에 셋 중 하나: 픽셀 아이콘(mask) · 첫 글자 · 사진.
- 여러 명 묶음은 가로로 나란히, 간격 `0.25em`. 겹쳐 쌓지 않는다. 4명 넘으면 `+N` 칸.

**수치**
- **정사각형**, `border-radius: 0`. 원형 금지.
- 크기는 40의 정수 배율 단계만: 40px(1×, 목록·댓글), 80px(2×, 프로필 머리), 120px(3×, `--mp-pixel-card`, 계정 화면).
- 작은 자리(24px 줄 높이)가 필요하면 아바타를 빼고 이름만 쓴다. 40px 미만으로 픽셀 아이콘을 줄이지 않는다.
- 테두리 1px `--mp-line`, `box-sizing: content-box`(틀 안 크기를 정수 배율로 유지).
- 픽셀 아이콘: mask로 `--mp-ink`, `opacity: var(--mp-opacity-pixel)`, `image-rendering: pixelated`.
- 첫 글자: 모눈 면 `--mp-grid-bg` + `--mp-grid-line`, 칸 8px(40px 기준 5칸), 글자 `--mp-glyph`. 글자 크기 40px → `--mp-size-small`, 80px → `--mp-size-heading`.
- 첫 글자 규칙: 한국어 이름은 성 한 글자, 영문은 첫 글자 대문자 하나.
- 사진: `object-fit: cover`, 필터 없음. 사진은 받지 않는 것을 우선한다.

**반응형**
- 크기 단계는 화면 폭에 따라 바꾸지 않는다(정수 배율 유지).
- 390px: 묶음은 최대 3명 + `+N`. 프로필 머리는 80px(2×).
- 700px: 묶음 최대 4명 + `+N`.
- 860px: 계정 화면 머리에서 120px(3×, `--mp-pixel-card`) 허용.
- 1180px: 크기를 더 키우지 않는다. 200px(5×)는 아바타에 쓰지 않는다.

**접근성**
- 이름이 옆에 있으면 아바타는 장식: `aria-hidden="true"`(img면 `alt=""`).
- 아바타만 있으면 `role="img" aria-label="김민지"`(전체 이름).
- 누르는 아바타(계정 메뉴)는 `button`, `aria-label="계정 메뉴"`, `aria-haspopup="menu"`, `aria-expanded`.
- 온라인 표시 등 상태는 색 점만으로 말하지 않고 `aria-label`에 "접속 중"을 넣는다.
- 첫 글자 `--mp-glyph`(.55)는 장식적 대체라 괜찮지만, 이름이 필수면 이름 글자를 따로 둔다.
- 키보드: 누르는 아바타만 Tab 순서에 들어간다. Enter/Space로 메뉴 열기, Esc로 닫고 포커스를 아바타로 돌린다.
- `+N` 칸은 `button aria-label="2명 더 보기"`, 목록을 펼치면 `aria-expanded="true"`.

**조합 규칙**
- 이름 글자와 나란히 둘 때 간격 `0.6em`, 기준은 가운데 정렬.
- `status-dot`은 아바타 오른쪽 옆 `0.4em`. 접속 표시 orange는 화면에서 하나일 때만, 여럿이면 잉크 점.
- 아바타 안에 배지·숫자·다른 아바타를 겹치지 않는다. `card` 썸네일로 쓰지 않는다(그건 `grid-thumbnail`).

## 상태
| 상태 | 표현 |
|---|---|
| 아이콘 | mask 픽셀 아이콘 |
| 첫 글자 | 모눈 + 글자 |
| 불러오기 실패 | 사진 대신 첫 글자로 되돌린다 |
| 누르는 아바타 호버·포커스 | 테두리 `--mp-line-strong` + `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 누름·열림 | 틀 배경 `--mp-ink`, 아이콘 색 `--mp-bg`(반전) |
| 접속 중 등 | 오른쪽 옆에 `status-dot` 하나. 아바타 위에 겹치지 않는다. orange는 화면당 하나 |

## 동작
- 호버 테두리·반전은 `--mp-duration-hover` ease (`invert-hover`). reduced-motion이면 즉시.
- 이미지 교체·불러오기에 페이드 없음. reduced-motion에서는 테두리·반전 전환도 즉시.

## 데모
```html demo
<div class="mp-avatar-row">
  <span class="mp-avatar" role="img" aria-label="아이콘"><span class="mp-avatar-pixel" style="--src:url(/v1/icons/brand.png)"></span></span>
  <span class="mp-avatar mp-avatar--letter" role="img" aria-label="김">김</span>
  <button class="mp-avatar is-open" type="button" aria-label="계정"><span class="mp-avatar-pixel" style="--src:url(/v1/icons/rhythm.png)"></span></button>
  <span class="mp-avatar mp-avatar--letter" aria-label="2명 더">+2</span>
  <span class="mp-avatar mp-avatar--lg mp-avatar--letter" role="img" aria-label="이">이</span>
</div>
```

## 코드
```css
.mp-avatar-row { display: flex; flex-wrap: wrap; gap: 0.8em; align-items: center; }
.mp-avatar {
  width: 40px; height: 40px; padding: 0; box-sizing: content-box;
  display: inline-flex; align-items: center; justify-content: center;
  border: var(--mp-border) solid var(--mp-line); border-radius: 0; background: transparent; color: var(--mp-ink);
  transition: border-color var(--mp-duration-hover) ease, background var(--mp-duration-hover) ease;
}
button.mp-avatar { cursor: pointer; font: inherit; }
.mp-avatar-pixel {
  width: 40px; height: 40px; background: var(--mp-ink); opacity: var(--mp-opacity-pixel);
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
.mp-avatar--letter {
  color: var(--mp-glyph); font-size: var(--mp-size-small); background-color: var(--mp-grid-bg);
  background-image: linear-gradient(var(--mp-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: 8px 8px;
}
.mp-avatar--lg { width: 80px; height: 80px; font-size: var(--mp-size-heading); background-size: 16px 16px; }
button.mp-avatar:hover, button.mp-avatar:focus-visible { border-color: var(--mp-line-strong); }
button.mp-avatar:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-avatar.is-open, .mp-avatar[aria-expanded="true"] { background: var(--mp-ink); border-color: var(--mp-ink); }
.mp-avatar.is-open .mp-avatar-pixel, .mp-avatar[aria-expanded="true"] .mp-avatar-pixel { background: var(--mp-bg); }
.mp-avatar-status { width: 8px; height: 8px; background: var(--mp-accent); align-self: flex-start; }
@media (prefers-reduced-motion: reduce) { .mp-avatar { transition: none; } }
```

## 앱
- SwiftUI: `Image("avatar").renderingMode(.template).interpolation(.none).resizable().frame(width: 40, height: 40).foregroundStyle(ink)`, `.overlay(Rectangle().stroke(line, lineWidth: 1))`. `.clipShape(Circle())` 쓰지 않는다.
- 첫 글자: `Text("김").frame(width: 40, height: 40).background(gridBg)` + 격자는 `Canvas`로 8pt 간격 1px 선.
- Compose: `Image(painter, filterQuality = FilterQuality.None, colorFilter = ColorFilter.tint(ink))`, `Modifier.size(40.dp).border(1.dp, line, RectangleShape)`. `CircleShape` 금지.
- 연락처 선택기·공유 시트·시스템 계정 화면의 원형 아바타는 OS 예외.
- 사진을 받으면 정사각형으로 잘라 저장하고, 표시할 때 둥글리지 않는다.
```swift
Image("brand").renderingMode(.template).interpolation(.none).resizable()
  .frame(width: 40, height: 40).foregroundStyle(Color("Ink")).opacity(0.72)
  .overlay(Rectangle().stroke(Color("Line"), lineWidth: 1))
  .accessibilityLabel("김민지")
```
```kotlin
Image(painterResource(R.drawable.brand), contentDescription = "김민지",
  filterQuality = FilterQuality.None, colorFilter = ColorFilter.tint(Ink),
  modifier = Modifier.size(40.dp).border(1.dp, Line, RectangleShape).alpha(0.72f))
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 정사각형, 40의 정수 배율, 첫 글자 대체.
- 해야 할 것: 이름과 함께면 장식으로 숨기고, 혼자면 전체 이름을 `aria-label`로.
- 해야 할 것: 여러 명은 나란히, 넘치면 `+N`.
- 하지 말 것: 원형 자르기, 겹쳐 쌓은 아바타 묶음.
- 하지 말 것: 사람마다 색깔 배경 이니셜, 무작위 색.
- 하지 말 것: 40의 배수가 아닌 크기로 픽셀 아이콘 확대(32px, 48px 등).
- 하지 말 것: 그림자 테두리, 온라인 점을 아바타 모서리에 겹치기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 원형(반지름 50%) 자르기 | 정사각형, radius 0 |
| 48px·32px 아바타 | 40·80·120px만 |
| 이니셜마다 무작위 배경색 | 모눈 면 + `--mp-glyph` 글자 |
| 이름 옆 아바타에 `alt="김민지"` 중복 | 이름이 있으면 `alt=""`/`aria-hidden` |
| 아바타 겹쳐 쌓기(`margin-left: -8px`) | 나란히 `0.25em` 간격 + `+N` |
| 모서리에 초록 온라인 점 | 옆에 `status-dot` + 글자 뜻 |
