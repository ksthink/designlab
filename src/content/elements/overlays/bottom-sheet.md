---
id: bottom-sheet
name: 바텀 시트
nameEn: Bottom Sheet
category: overlays
summary: 앱 화면 아래에서 올라오는 직각 패널. 위 1px 진한 선과 픽셀 손잡이, 내용만큼만 높다.
aliases: [바텀 시트, 하단 시트, 시트, bottom sheet, sheet, 하단 패널, 올라오는 창, 서랍 시트]
platforms: [ios, android, web]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-bg, --mp-border, --mp-line-strong, --mp-ink, --mp-opacity-muted, --mp-size-subheading, --mp-tracking-subheading, --mp-size-body, --mp-opacity-body, --mp-line, --mp-gutter, --mp-width-read, --mp-duration-fill, --mp-steps-fill, --mp-size-kicker, --mp-font, --mp-tracking-meta, --mp-opacity-meta]
effects: [reduced-motion]
related: [modal, action-sheet, drawer, list]
---

## 용도
지금 화면(지도, 목록)을 유지한 채 딸린 내용을 보여 줄 때 쓴다: 측정소 정보, 항목 상세, 필터 설정.
답을 강제해야 하면 `modal`, 행동 몇 개 중 고르기면 `action-sheet`, 사이트 메뉴는 `drawer`.
사용자가 열기 전에는 펼치지 않고, **내용만큼만 높이**를 갖는다(hihi "측정소 시트 — 내용만큼만 높이", "요청하지 않으면 열지 않는다").

**함께 쓰는 요소**
- `bottom-sheet` + `list`·`key-value`: 측정소·항목 상세. 시트 제목 아래 키-값 목록, 항목 사이 1px 선
- `fab` → `bottom-sheet`: 새 기록 입력 시트. 시트가 열리면 FAB을 숨긴다
- 시트 안 `button` 주 행동은 맨 아래, 강조 orange는 화면 전체에서 하나(뒤 지도에 이미 있으면 시트에는 두지 않는다)
- 시트 위에 시트를 겹치지 않는다. 확인이 필요하면 시트를 닫고 `modal`(`confirm-step`)
- 넓은 화면으로 바뀌면 `drawer`·`modal`로 바꾼다

## 생김새
**구조**
- 화면 아래에 붙은 폭 전체 패널: 손잡이 → 제목 줄(제목 + 오른쪽 `[ 닫기 ]`) → 내용
- 배경 `--mp-bg`, 위 테두리 `var(--mp-border) solid var(--mp-line-strong)`, **위 모서리도 직각**, 그림자 없음
- 손잡이: 가운데 `2rem × 3px` 사각 면, `--mp-ink`, `opacity: var(--mp-opacity-muted)`. 둥근 알약이 아니다
- 제목 `--mp-size-subheading`, 자간 `--mp-tracking-subheading`
- 내용 `--mp-size-body`, `--mp-opacity-body`, 목록이면 항목 사이 1px `--mp-line`
- 모달형이면 뒤 가림막 `--mp-bg` 면 `--mp-opacity-body`. 비모달형(지도 위 요약)은 가림막 없음

**크기·간격**
- 좌우 여백 `--mp-gutter`, 위 `0.6em`(손잡이까지), 손잡이 아래 `1em`, 아래 `1.6em` + 안전 영역(`env(safe-area-inset-bottom)`)
- 높이: 내용 높이. 최대 화면의 90%(`90dvh`), 넘치면 내용 영역만 스크롤
- 높이 단계(detent)는 최대 두 개: 내용 높이, 최대 높이

**반응형**
- 폭 600px 이상(태블릿·데스크톱 웹): 폭 전체 대신 `min(var(--mp-width-read), 100%)` 가운데, 좌우에도 1px `--mp-line-strong`
- 1100px 이상 데스크톱 웹: 바텀 시트 대신 옆 패널(`drawer` 모양)이나 `modal`을 쓴다
- 가로 모드 폰: 최대 높이 `90dvh` 그대로, 내용 스크롤

## 상태
| 상태 | 표현 |
|---|---|
| 닫힘 | 없음(DOM에서 숨김, `hidden`) |
| 열림(내용 높이) | 패널 + (모달형) 가림막 |
| 열림(최대) | 위로 끌면 `90dvh`, 내용 스크롤 |
| 끄는 중 | 손가락을 그대로 따라 이동, 계단 없음 |
| 닫기 | 아래로 끌어 높이 절반 이상 내림 · 가림막 누름 · `[ 닫기 ]` · `Esc` |
| 손잡이 포커스 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |

## 동작
**시간**
- 올라올 때 `translateY(100%)`→0을 `--mp-duration-fill`(0.19s) `--mp-steps-fill`(4계단) — 터미널 계단
- 내려갈 때 같은 계단, 끝나면 `hidden`
- 끌기는 손가락 위치 그대로(트윈·탄성 없음), 놓으면 가까운 단계로 계단 이동
- 가림막은 투명도 전환 없이 패널과 동시에 나타난다

**접근성**
- 모달형: `<dialog>` + `showModal()` 또는 `role="dialog"` `aria-modal="true"` `aria-labelledby`(제목)
- 비모달형: `role="region"` `aria-label`, 포커스를 가두지 않는다
- 열면 포커스는 제목 또는 첫 조작 요소로, 닫으면 연 요소로 돌려준다
- 모달형은 Tab 순환을 패널 안에 가두고 뒤 화면 `inert` + 스크롤 잠금
- `Esc`로 닫기. 끌기만으로 닫게 하지 않고 `[ 닫기 ]` 버튼을 함께 둔다
- 손잡이는 `button aria-label="시트 높이 바꾸기"` — Enter로 내용 높이/최대 전환
- 끌기 대체 수단: 손잡이 버튼 `Enter`/`Space`로 높이 단계 전환, `aria-expanded`로 최대 높이 여부를 알린다
- VoiceOver·TalkBack 사용자를 위해 시스템 "닫기" 동작(두 손가락 문지르기, 뒤로)을 막지 않는다

**reduced-motion**
- 계단 이동 없이 바로 나타나고 사라진다. 끌기는 그대로 동작

## 데모
```html demo
<div class="mp-bottom-sheet-stage">
  <div class="mp-bottom-sheet-scrim" aria-hidden="true"></div>
  <section class="mp-bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="mp-bottom-sheet-t">
    <button class="mp-bottom-sheet-grip" type="button" aria-label="시트 높이"></button>
    <div class="mp-bottom-sheet-head">
      <h2 id="mp-bottom-sheet-t">측정소</h2>
      <button class="mp-bottom-sheet-close" type="button">[ 닫기 ]</button>
    </div>
    <p>3</p>
  </section>
</div>
```

## 코드
```css
.mp-bottom-sheet-stage { position: relative; height: 16rem; overflow: hidden; border: var(--mp-border) solid var(--mp-line); }
.mp-bottom-sheet-scrim { position: absolute; inset: 0; background: var(--mp-bg); opacity: var(--mp-opacity-body); }
.mp-bottom-sheet {
  position: absolute; left: 0; right: 0; bottom: 0; max-height: 90%; overflow: auto;
  padding: 0.6em var(--mp-gutter) 1.6em;
  background: var(--mp-bg); color: var(--mp-ink);
  border-top: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  animation: mp-bottom-sheet-in var(--mp-duration-fill) var(--mp-steps-fill);
}
.mp-bottom-sheet-grip { display: block; width: 2rem; height: 3px; margin: 0 auto 1em; padding: 0; border: 0; border-radius: 0; background: var(--mp-ink); opacity: var(--mp-opacity-muted); cursor: grab; }
.mp-bottom-sheet-head { display: flex; align-items: baseline; justify-content: space-between; gap: 1em; margin-bottom: 0.4em; }
.mp-bottom-sheet h2 { margin: 0; font-size: var(--mp-size-subheading); letter-spacing: var(--mp-tracking-subheading); font-weight: 400; }
.mp-bottom-sheet p { margin: 0; font-size: var(--mp-size-body); opacity: var(--mp-opacity-body); }
.mp-bottom-sheet-close {
  padding: 0.2em 0.35em; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink); cursor: pointer;
  font: 400 var(--mp-size-kicker) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta);
}
.mp-bottom-sheet-close:hover, .mp-bottom-sheet-close:focus-visible { opacity: 1; background: var(--mp-ink); color: var(--mp-bg); }
.mp-bottom-sheet button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@keyframes mp-bottom-sheet-in { from { transform: translateY(100%); } }
@media (min-width: 600px) {
  .mp-bottom-sheet { left: 50%; right: auto; width: min(var(--mp-width-read), 100%); transform: translateX(-50%); animation: none; border: var(--mp-border) solid var(--mp-line-strong); border-bottom: 0; }
}
@media (prefers-reduced-motion: reduce) { .mp-bottom-sheet { animation: none; } }
/* 실제 화면: .mp-bottom-sheet-stage 대신 position: fixed; inset: 0, 아래 여백에 env(safe-area-inset-bottom) 더하기 */
```

```js
// 끌어서 닫기 — 높이 절반 이상 내리면 닫는다. 손가락을 그대로 따른다(트윈 없음)
// 마크업: <dialog class="mp-bottom-sheet"> 안에 .mp-bottom-sheet-grip, .mp-bottom-sheet-close
(() => {
  const sheet = document.querySelector('dialog.mp-bottom-sheet');
  const grip = sheet?.querySelector('.mp-bottom-sheet-grip');
  if (!sheet || !grip) return;
  const close = () => { sheet.style.transform = ''; sheet.close(); }; // dialog가 연 요소로 포커스를 돌려준다
  sheet.querySelector('.mp-bottom-sheet-close')?.addEventListener('click', close);
  let startY = null;
  grip.addEventListener('pointerdown', (e) => { startY = e.clientY; grip.setPointerCapture(e.pointerId); });
  grip.addEventListener('pointermove', (e) => {
    if (startY === null) return;
    sheet.style.transform = `translateY(${Math.max(0, e.clientY - startY)}px)`;
  });
  const end = (e) => {
    if (startY === null) return;
    const moved = e.clientY - startY;
    startY = null;
    sheet.style.transform = '';
    if (moved > sheet.offsetHeight / 2) close();
  };
  grip.addEventListener('pointerup', end);
  grip.addEventListener('pointercancel', end);
})();
```

## 앱
- SwiftUI: `.sheet(isPresented:)` + `.presentationDetents([.height(contentHeight), .large])`, `.presentationCornerRadius(0)`, `.presentationBackground(bg)`, `.presentationDragIndicator(.hidden)` 후 픽셀 손잡이를 직접 그린다.
- SwiftUI 비모달(지도 위): `.presentationBackgroundInteraction(.enabled(upThrough: .height(contentHeight)))`, `.interactiveDismissDisabled(false)`.
- Compose: `ModalBottomSheet(shape = RectangleShape, containerColor = bg, tonalElevation = 0.dp, scrimColor = bg.copy(alpha = 0.85f), dragHandle = { PixelGrip() })`, `skipPartiallyExpanded`는 내용이 짧을 때 `true`.
- Compose 비모달: `BottomSheetScaffold(sheetShape = RectangleShape, sheetShadowElevation = 0.dp, sheetTonalElevation = 0.dp)`.
- **OS 예외**: iOS 26 이상에서 중간 높이 시트의 떠 있는 유리 모양·둥근 모서리가 `presentationCornerRadius`로 바뀌지 않으면 OS 모양을 받아들인다. 시스템 공유 시트·사진 선택기·문서 선택기는 OS 모양 그대로.
- 안드로이드 뒤로 제스처로 닫히는 동작은 막지 않는다.

```swift
.sheet(isPresented: $open) {
  VStack(alignment: .leading, spacing: 12) {
    Rectangle().fill(MP.ink.opacity(0.5)).frame(width: 32, height: 3).frame(maxWidth: .infinity)
    Text("측정소").font(.custom("Mulmaru", size: 24))
  }
  .padding(.horizontal, 20).padding(.top, 10)
  .presentationDetents([.height(contentHeight), .large])
  .presentationCornerRadius(0).presentationBackground(MP.bg).presentationDragIndicator(.hidden)
}
```

```kotlin
ModalBottomSheet(
  onDismissRequest = close, shape = RectangleShape, containerColor = MP.bg,
  tonalElevation = 0.dp, scrimColor = MP.bg.copy(alpha = 0.85f),
  dragHandle = { Box(Modifier.padding(top = 10.dp).size(32.dp, 3.dp).background(MP.ink.copy(alpha = 0.5f))) },
  sheetState = rememberModalBottomSheetState(skipPartiallyExpanded = true),
) {
  HorizontalDivider(color = MP.lineStrong, thickness = 1.dp)  // 위 1px 선
  Text("측정소", fontFamily = Mulmaru, modifier = Modifier.padding(20.dp))
}
```
- OS 예외 목록: iOS 26 이상 중간 높이 유리 시트 모양, 공유 시트, 사진·문서 선택기, 안드로이드 뒤로 제스처 닫기

## 해야 할 것 / 하지 말 것
- 해야 할 것: 내용만큼만 높이, 사용자가 열 때만 연다.
- 해야 할 것: 직각, 위 1px `--mp-line-strong`, 픽셀 사각 손잡이.
- 해야 할 것: 끌기 외에 `[ 닫기 ]`·`Esc` 닫기, 닫은 뒤 포커스 돌려주기.
- 해야 할 것: 올라오기는 4계단, reduced-motion이면 즉시.
- 하지 말 것: 둥근 위 모서리(직접 그릴 때), 위 그림자, 둥근 알약 손잡이.
- 하지 말 것: 열자마자 전체 높이, 화면 진입 시 자동으로 열기.
- 하지 말 것: 시트 위에 시트, 시트 안에 모달.
- 하지 말 것: 탄성(스프링) 움직임, 검은 반투명 가림막.

**자주 틀리는 것**
- 열자마자 `.large`·전체 높이 → 내용 높이 단계부터
- 시스템 둥근 알약 손잡이 남김 → `presentationDragIndicator(.hidden)` + 사각 손잡이
- Compose 기본 `BottomSheetDefaults.ExpandedShape`(위 28dp 둥근) → `RectangleShape`
- 어두운 scrim 기본값 → `MP.bg` 0.85
- 끌기로만 닫힘 → `[ 닫기 ]` 버튼과 `Esc`
