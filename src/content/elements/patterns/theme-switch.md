---
id: theme-switch
name: 테마 전환
nameEn: Theme Switch
category: patterns
summary: "[ 시스템 ] → [ 라이트 ] → [ 다크 ]를 도는 터미널형 글자 버튼. 기본은 시스템 설정, 고른 값은 저장한다."
aliases: [테마 전환, theme switch, 다크 모드 토글, dark mode toggle, 라이트 다크, 화면 모드, color scheme, 테마 버튼]
platforms: [web, ios, android]
status: extracted
source: design_lab src/layouts/Base.astro .theme-toggle
pillars: [minimalism, retro-color]
tokens: [--mp-size-kicker, --mp-tracking-meta, --mp-opacity-meta, --mp-duration-hover, --mp-ink, --mp-font, --mp-secondary]
effects: []
related: [theme, header, text-action, dark-images, settings, segmented-control]
---

## 용도
사용자가 OS 설정과 다른 테마를 고를 수 있게 할 때 쓴다. 사이트에서는 상단 바(`header`) 오른쪽 한 곳에만 둔다.
앱은 상단 바에 두지 않고 설정 화면(`settings`)의 한 행으로 둔다.
테마를 하나만 지원하는 화면은 없다 — 모든 metaphr 화면은 라이트·다크 둘 다 되므로 전환을 숨기지 않는다.

## 생김새
**구조**
- `<button type="button" class="theme-toggle" data-theme-toggle>` 하나
- 글자만: `[ 시스템 ]` / `[ 라이트 ]` / `[ 다크 ]` — 대괄호 안쪽 공백 한 칸씩(`text-action` 어휘)
- 상단 바 한 줄: 왼쪽 `< metaphr`(`back-link`), 오른쪽 테마 전환. `justify-content: space-between`

**수치**
- `padding: 0.2em 0`, 테두리·배경 없음, `color: inherit`, `font: inherit`
- `--mp-size-kicker`, 자간 `--mp-tracking-meta`(.08em), `white-space: nowrap`
- `opacity: var(--mp-opacity-meta)`(.7), 호버·포커스 1, 전환 `--mp-duration-hover` ease(투명도만)
- 해 ☀·달 ☾ 아이콘이나 스위치 모양을 쓰지 않는다

**반응형**
| 폭 | 동작 |
|---|---|
| 390px | 상단 바 한 줄: 왼쪽 `< metaphr`, 오른쪽 `[ 시스템 ]`(약 6em). 두 글자가 겹치면 뒤로가기를 `<`만 남기지 않고 브랜드 줄을 아래로 내린다 |
| 700px | 상단 바 첫 줄 오른쪽 끝 고정 |
| 860px 이상 | 변화 없음 — 메뉴가 늘어도 가장 오른쪽 |
| 1180px 이상 | 목록형 1180px 틀(읽기형 760px 틀)의 오른쪽 끝에 맞춘다. 화면 오른쪽 끝에 붙이지 않는다 |
- 좁은 화면에서도 글자 그대로 한 줄(`nowrap`). 아이콘으로 바꾸지 않는다
- 터치 영역은 여백으로 44×44px 이상 확보(`min-height: 44px` 또는 상단 바 행 높이)

**접근성**
- `button` 요소라 Enter·Space로 누른다. Tab 순서는 상단 바 안에서 뒤로가기 다음
- `aria-label`에 현재 값과 행동: `화면 테마: 시스템 — 눌러서 바꾸기`. 누를 때마다 갱신
- `aria-pressed`는 쓰지 않는다(세 값 순환이라 참/거짓이 아니다)
- 포커스 링 `outline: 1px solid var(--mp-ink); outline-offset: 3px`
- 버튼 글자 .7은 보조 단계지만 현재 값이 `aria-label`로도 전달되고 호버·포커스에서 1이 된다
- 두 테마 모두 모든 글자 대비가 유지되도록 색은 시맨틱 변수만 쓴다
- 바뀐 값 알림: 버튼 글자 자체가 바뀌므로 별도 `aria-live`는 두지 않는다. 포커스가 버튼에 남아 있어 스크린리더가 새 `aria-label`을 읽는다
- `role="switch"`·체크박스로 만들지 않는다(두 값이 아니다)

**움직임 줄이기**
- 투명도 트랜지션 제거. 색 전환은 원래 즉시라 바뀌는 것이 없다

**조합 규칙**
- 한 사이트에 전환 버튼 하나, 상단 바 오른쪽. 푸터·설정 페이지에 반복하지 않는다
- 같은 줄 왼쪽에는 `back-link` 하나만. 다른 `text-action`을 옆에 늘어놓지 않는다
- 강조 orange·teal로 현재 테마를 표시하지 않는다 — 글자가 말한다
- 테마별 이미지는 `dark-images` 규칙으로 함께 바뀌어야 한다(로고 누락 주의)

## 상태
| 상태 | 표현 |
|---|---|
| 시스템(기본) | `[ 시스템 ]`, `<html>`에 `data-theme` 없음 → `prefers-color-scheme` 따름, 저장값 삭제 |
| 라이트 | `[ 라이트 ]`, `<html data-theme="light">`, `localStorage` `mp-theme=light` |
| 다크 | `[ 다크 ]`, `<html data-theme="dark">`, `localStorage` `mp-theme=dark` |
| 호버·포커스 | `opacity: 1` |
| 저장 불가(사생활 모드 등) | 이번 화면만 바뀌고 오류를 보이지 않는다 |
| 스크립트 없음 | 버튼은 `[ 시스템 ]`로 남고 OS 설정을 따른다 |

## 동작
- 누를 때마다 시스템 → 라이트 → 다크 → 시스템.
- 색 전환은 즉시. 페이드·원형 퍼짐 같은 트윈을 넣지 않는다.
- 첫 페인트 전 `<head>` 인라인 스크립트가 저장값을 읽어 `data-theme`를 붙인다 — 깜빡임 방지.
- `<meta name="theme-color">` 두 개(라이트 `#F5F5F5`, 다크 `#303841`)의 `media`를 같이 바꾼다: 수동이면 고른 쪽 `all`, 다른 쪽 `not all`, 시스템이면 원래 `media`로 복원.
- `color-scheme`도 테마를 따라 `dark`/`light`로(폼 컨트롤·스크롤바 색).

## 데모
```html demo
<div class="mp-theme-switch-row">
  <button class="mp-theme-switch is-current" type="button" aria-label="화면 테마: 시스템">[ 시스템 ]</button>
  <button class="mp-theme-switch" type="button" aria-label="화면 테마: 라이트">[ 라이트 ]</button>
  <button class="mp-theme-switch" type="button" aria-label="화면 테마: 다크">[ 다크 ]</button>
</div>
```

## 코드
```css
.mp-theme-switch-row { display: flex; flex-wrap: wrap; gap: 1.2em; }
.mp-theme-switch {
  padding: 0.2em 0; border: 0; background: transparent; color: var(--mp-ink); cursor: pointer; white-space: nowrap;
  font: 400 var(--mp-size-kicker) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  opacity: var(--mp-opacity-meta); transition: opacity var(--mp-duration-hover) ease;
}
.mp-theme-switch:hover, .mp-theme-switch:focus-visible { opacity: 1; }
.mp-theme-switch.is-current { opacity: 1; }
.mp-theme-switch.is-current::before { content: "■"; margin-right: 0.4em; color: var(--mp-secondary); }   /* 견본용 현재 값 표시 — 실제 버튼은 하나이고 글자가 현재 값 */
.mp-theme-switch:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .mp-theme-switch { transition: none; } }
```
데모는 세 값을 나란히 보이고 현재 값(`[ 시스템 ]`)만 `.is-current`로 불투명 + teal ■ 표시한다(데모 패널은 문서 JS를 실행하지 않는다). 실제는 버튼 하나가 순환하고 글자가 곧 현재 값이다.

```js
// <head> 인라인: 첫 페인트 전에 저장값 적용
try { const t = localStorage.getItem('mp-theme'); if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; } catch (e) {}

// 버튼 — <button class="mp-theme-switch" data-theme-toggle>
(() => {
const btn = document.querySelector('[data-theme-toggle]');
if (!btn) return;
const LABEL = { system: '[ 시스템 ]', light: '[ 라이트 ]', dark: '[ 다크 ]' };
const NEXT = { system: 'light', light: 'dark', dark: 'system' };
const root = document.documentElement;
const paint = () => { const c = root.dataset.theme || 'system'; btn.textContent = LABEL[c]; btn.setAttribute('aria-label', `화면 테마: ${LABEL[c].replace(/[\[\] ]/g, '')} — 눌러서 바꾸기`); };
btn.addEventListener('click', () => {
  const n = NEXT[root.dataset.theme || 'system'];
  if (n === 'system') delete root.dataset.theme; else root.dataset.theme = n;
  try { n === 'system' ? localStorage.removeItem('mp-theme') : localStorage.setItem('mp-theme', n); } catch (e) {}
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    m.dataset.media ??= m.getAttribute('media') || '';
    m.setAttribute('media', n === 'system' ? m.dataset.media : (m.dataset.media.includes(n) ? 'all' : 'not all'));
  });
  paint();
});
paint();
})();
```

## 앱
- 기본은 OS 설정을 따른다. 설정 화면에 `테마` 행 → `시스템 / 라이트 / 다크` 선택(`segmented-control` 또는 다음 화면 선택 목록).
```swift
@AppStorage("mp-theme") private var theme = "system"
var body: some Scene {
  WindowGroup { RootView()
    .preferredColorScheme(theme == "light" ? .light : theme == "dark" ? .dark : nil) }
}
```
```kotlin
val theme by store.data.map { it[THEME] ?: "system" }.collectAsState("system")
val dark = when (theme) { "light" -> false; "dark" -> true; else -> isSystemInDarkTheme() }
MetaphrTheme(colors = if (dark) DarkColors else LightColors) { App() } // dynamicColor 끔
```
- 상태 표시줄·내비게이션 바 아이콘 색도 테마에 맞춘다(iOS 자동, Android `enableEdgeToEdge` + `SystemBarStyle.auto`).
- 시스템 설정 앱으로 보내는 링크로 대신하지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 시스템을 기본값으로 두고, 세 값을 글자로 말한다.
- 해야 할 것: 첫 페인트 전에 저장값을 적용한다.
- 해야 할 것: 모든 색이 변수라 `data-theme` 하나로 화면 전체가 바뀌게 한다.
- 해야 할 것: `theme-color` meta와 `color-scheme`도 함께 바꾼다.
- 하지 말 것: 해·달 아이콘, 둥근 토글 스위치.
- 하지 말 것: 전환 시 페이드·원형 퍼짐 애니메이션.
- 하지 말 것: 라이트/다크 두 값만 두고 시스템 복귀를 없애기.
- 하지 말 것: 화면마다 따로 전환 버튼 두기.
- 하지 말 것: 테마별로 하드코딩한 색을 JS로 바꿔 칠하기.
**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `DOMContentLoaded`에서 저장값 적용 → 다크 사용자에게 흰 화면 깜빡임 | `<head>` 인라인 스크립트로 첫 페인트 전에 |
| `localStorage` 접근을 `try` 없이 → 사생활 모드에서 오류 | `try { … } catch (e) {}` |
| `prefers-color-scheme`만 쓰고 `[data-theme]` 선택자 없음 | 자동·수동 두 경로 모두 토큰에 |
| `theme-color` meta 하나 고정 | 라이트·다크 두 개, 수동 선택 시 `media` 교체 |
| ☀/☾ 아이콘 버튼에 `aria-pressed` | `[ 시스템 ]` 글자 순환 + 현재 값 `aria-label` |
