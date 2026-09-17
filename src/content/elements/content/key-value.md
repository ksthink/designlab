---
id: key-value
name: 이름–값 목록
nameEn: Key-Value
category: content
summary: 이름을 옅게 왼쪽에, 값을 진하게 오른쪽에 두는 두 열 목록. 행 사이는 1px 선, 좁으면 위아래로 쌓는다.
aliases: [이름 값, key value, 키 값, 속성 목록, 상세 정보, description list, dl, 스펙, 정보 목록, 메타데이터, 속성 표]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism]
tokens: [--mp-font, --mp-border, --mp-line, --mp-size-small, --mp-tracking-small, --mp-opacity-secondary, --mp-opacity-muted, --mp-size-body, --mp-tracking-body, --mp-ink, --mp-bg, --mp-duration-hover, --mp-size-meta, --mp-tracking-meta]
effects: [invert-hover]
related: [table, list, stat, settings, code-block]
---

## 용도
한 대상의 속성(버전, 용량, 만든 날, 라이선스)을 나열할 때 쓴다. HTML은 `<dl>`.
여러 대상을 같은 속성으로 비교하면 `table`, 핵심 수치 2–4개를 크게 보이려면 `stat`, 바꿀 수 있는 값이면 `settings` 행을 쓴다.

## 생김새
**구조**
- `dl` 하나에 `dt`(이름) + `dd`(값) 쌍. 쌍을 `div`로 감싸 행 단위 스타일을 준다(`dl > div > dt + dd`, HTML 표준 허용).
- 값 하나에 여러 항목이면 `·`로 잇는다(`ios · android`).
- 복사할 값(ID, 해시)은 값 뒤 `[ 복사 ]` 글자 버튼.

**수치**
- 행: `display: grid; grid-template-columns: minmax(6em, 30%) 1fr; gap: 1em`.
- 목록 윗선 + 행마다 아랫선 1px `--mp-line`, 행 여백 `0.7em 0`.
- 이름: `--mp-size-small`, `--mp-tracking-small`, `opacity: var(--mp-opacity-secondary)`. 명사 하나, 콜론 없음.
- 값: `--mp-size-body`, `--mp-tracking-body`, 불투명, 숫자는 `tabular-nums`, 긴 값은 `overflow-wrap: anywhere`.
- 이름·값 모두 왼쪽 정렬(값을 오른쪽 끝에 붙이지 않는다 — 읽는 거리가 멀어진다). 앱 한 줄 행은 예외로 값 오른쪽 정렬.
- 단위는 값에 붙여 쓴다(`12 MB`, `1,240 m`) — `labels-numbers`.
- 복사 버튼: `--mp-size-meta`, `--mp-tracking-meta`, 호버 반전.

**반응형**
- 390px: 한 열로 쌓는다. 이름 위(아랫선 없음), 값 아래(아랫선 있음), 이름–값 간격 `0.1em`.
- 700px: 두 열, 이름 열 `minmax(6em, 30%)`.
- 860px: 상세 화면 옆 칸(사이드 정보)이면 두 열 유지, 칸 폭 `clamp(240px, 28vw, 320px)`.
- 1180px: 두 열 그대로, 전체 폭 `--mp-width-read` 이하. 넓다고 4열로 늘리지 않는다.

**접근성**
- `dl`/`dt`/`dd`를 유지해 스크린리더가 "버전, 1.4.0"으로 읽게 한다. `div`+`span` 흉내 금지.
- 값이 없으면 행을 지운다. `-`를 남겨야 하면 `aria-label="없음"`.
- 복사 버튼 `aria-label="해시 복사"`, 완료 시 버튼 글자 `[ 복사됨 ]` + `aria-live="polite"` 영역에 "복사했습니다".
- 이름 .7 투명도는 필수 정보 하한. 더 옅게 하지 않는다.
- `dl > div > dt + dd` 구조. `dt`는 한 개, `dd`는 여러 개 허용(값 여러 줄).
- 키보드: 복사 버튼만 Tab. Enter/Space로 복사, 결과는 `aria-live="polite"`.
- 값 전체를 선택·복사할 수 있게 `user-select: text`를 막지 않는다.

**조합 규칙**
- key-value에는 orange를 쓰지 않는다. 주의가 필요한 값은 `stat`이나 `banner`로 올린다.
- 목록 위 kicker와 `0.6em`, 아래 `button` 줄과 `1.6em`.
- 값 안에 표·목록·카드를 넣지 않는다. 한 화면에 key-value 묶음은 분류별로 나누고 사이 `--mp-section`.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 옅은 이름, 진한 값 |
| 값 없음 | 행 생략(또는 `-`, `opacity: var(--mp-opacity-muted)`) |
| 복사 버튼 호버·포커스 | 배경 `--mp-ink`, 글자 `--mp-bg` |
| 복사 완료 | `[ 복사됨 ]` 1.5초 뒤 원래 글자. 색 변화 없음 |
| 좁은 화면 | 위아래로 쌓임 |

## 동작
- 복사 버튼 반전은 `invert-hover`(`--mp-duration-hover` ease). reduced-motion이면 즉시.
- 복사는 `navigator.clipboard.writeText(값)`, 실패하면 버튼 글자 `[ 실패 ]`.
- 그 밖의 움직임 없음. reduced-motion에서는 복사 버튼 반전도 즉시.

## 데모
```html demo
<dl class="mp-key-value">
  <div><dt>버전</dt><dd>1.4.0</dd></div>
  <div><dt>용량</dt><dd>12 MB</dd></div>
  <div><dt>해시</dt><dd>a1f9c3 <button class="mp-key-value-copy is-hover" type="button" aria-label="해시 복사">[ 복사 ]</button></dd></div>
  <div><dt>만료</dt><dd class="is-empty" aria-label="없음">-</dd></div>
</dl>
```

## 코드
```css
.mp-key-value { margin: 0; border-top: var(--mp-border) solid var(--mp-line); }
.mp-key-value > div {
  display: grid; grid-template-columns: minmax(6em, 30%) 1fr; gap: 1em; align-items: baseline;
  padding: 0.7em 0; border-bottom: var(--mp-border) solid var(--mp-line);
}
.mp-key-value dt { font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-key-value dd { margin: 0; font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body); font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.mp-key-value dd.is-empty { opacity: var(--mp-opacity-muted); }
.mp-key-value-copy {
  margin-left: 0.6em; padding: 0.1em 0.3em; border: 0; background: transparent; color: var(--mp-ink); cursor: pointer;
  font: 400 var(--mp-size-meta) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-key-value-copy:hover, .mp-key-value-copy:focus-visible, .mp-key-value-copy.is-hover { background: var(--mp-ink); color: var(--mp-bg); }
.mp-key-value-copy:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 2px; }
@media (max-width: 390px) { .mp-key-value > div { grid-template-columns: 1fr; gap: 0.1em; } }
@media (prefers-reduced-motion: reduce) { .mp-key-value-copy { transition: none; } }
```

```js
document.querySelectorAll('.mp-key-value-copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.parentElement.firstChild.textContent.trim();
    try { await navigator.clipboard.writeText(text); btn.textContent = '[ 복사됨 ]'; }
    catch (e) { btn.textContent = '[ 실패 ]'; }
    setTimeout(() => { btn.textContent = '[ 복사 ]'; }, 1500);
  });
});
```

## 앱
- SwiftUI: `LabeledContent("버전") { Text("1.4.0").monospacedDigit() }`를 `.labeledContentStyle` 커스텀으로 이름 `.opacity(0.7)`, 행 아래 1pt 선. `Form` 둥근 그룹 안에 넣지 않는다.
- Compose: `Row(Modifier.fillMaxWidth().heightIn(min = 48.dp), horizontalArrangement = Arrangement.SpaceBetween)` + 행 아래 `HorizontalDivider(1.dp, line)`. 앱 한 줄 행은 값 오른쪽 정렬 허용.
- 긴 값은 `Text(maxLines = 2, overflow = TextOverflow.Ellipsis)`, 길게 누르면 전체 복사(`.textSelection(.enabled)`, `SelectionContainer`).
- 복사 알림은 OS 클립보드 알림(Android 13+)이 뜨면 앱 쪽 알림을 생략한다.
```swift
LabeledContent { Text("1.4.0").monospacedDigit() } label: { Text("버전").opacity(0.7) }
  .font(.custom("Mulmaru", size: 15)).padding(.vertical, 10)
  .overlay(alignment: .bottom) { Rectangle().fill(Color("Line")).frame(height: 1) }
```
```kotlin
Row(Modifier.fillMaxWidth().heightIn(min = 48.dp).semantics(mergeDescendants = true) {},
    horizontalArrangement = Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
  Text("버전", Modifier.alpha(0.7f)); Text("1.4.0")
}
HorizontalDivider(thickness = 1.dp, color = Line)
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 이름은 가장 짧은 명사, 값은 단위와 함께.
- 해야 할 것: `dl` 구조 유지, 좁으면 위아래로.
- 해야 할 것: 정보 없는 행(빈 값, 당연한 기본값)은 지운다.
- 하지 말 것: 굵은 이름, 이름 뒤 콜론 `:`.
- 하지 말 것: 줄무늬 색, 세로 칸막이, 카드 안에 또 카드.
- 하지 말 것: 값을 화면 오른쪽 끝에 멀리 붙이기(웹).
- 하지 말 것: 복사 완료를 초록 체크·토스트 여러 개로.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `버전:` 콜론 | `버전` |
| `<div><span>` 흉내 | `dl`/`dt`/`dd` |
| 이름 굵게 | 400, `--mp-opacity-secondary` |
| 값을 화면 오른쪽 끝에(웹) | 이름 열 바로 옆 |
| 빈 값 행 남김 | 행 삭제 |
