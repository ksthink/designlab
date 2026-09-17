---
id: menu
name: 메뉴
nameEn: Menu
category: navigation
summary: 페이지로 가는 링크를 한 줄로 늘어놓은 목록. 현재 위치는 teal ■ 면과 1px 밑선, 호버하면 투명도가 1이 된다.
aliases: [메뉴, 메뉴 버튼, 내비게이션, 네비게이션, 네비, nav, navigation, navbar, GNB, LNB, 주 메뉴, 상단 메뉴, 글로벌 메뉴, 햄버거, 햄버거 메뉴, 햄버거 버튼, 메뉴 열기, 링크 목록, 현재 페이지 표시, active menu]
platforms: [web, ios, android]
status: extracted
source: design_lab Base.astro .top nav (aria-current ■), metaphr.dev index.html .nav-blog.fx-fill
pillars: [minimalism, pixel-art, retro-color]
tokens: [--mp-size-small, --mp-tracking-small, --mp-opacity-nav, --mp-font, --mp-secondary, --mp-line-strong, --mp-size-kicker, --mp-tracking-meta, --mp-opacity-meta, --mp-line-button, --mp-ink, --mp-bg, --mp-opacity-muted, --mp-duration-hover, --mp-steps-fill, --mp-duration-fill, --mp-border, --mp-accent]
effects: [invert-hover, fx-fill, reduced-motion]
related: [header, drawer, dropdown-menu, tabs, tab-bar, link, text-action, button, icon-button]
---

## 용도
사이트·앱의 주요 페이지 사이를 오갈 때 쓴다. `header` 안에 둔다. 한 화면 안의 패널 전환은 `tabs`, 앱 하단 주 메뉴는 `tab-bar`.
항목은 3–7개. 좁은 화면에서 한 줄에 다 들어가지 않으면 줄바꿈하고, 두 줄을 넘으면 **메뉴 버튼**으로 접어 `drawer`나 `dropdown-menu`로 연다.
행동(저장, 삭제)은 메뉴에 넣지 않는다 — 메뉴는 이동만 한다.

**함께 쓰는 요소**
- `header` 안, 브랜드 오른쪽에 둔다. 머리 밖(본문 옆 사이드 목록)은 `menu--vertical`
- 접힐 때: 항목 5개 이상 → 메뉴 버튼 + `drawer`(560px 미만), 4개 이하 짧은 목록 → 메뉴 버튼 + `dropdown-menu`
- 앱: 주요 화면 3–5개는 `tab-bar`, 그 밖의 페이지 목록(설정, 도움말)만 세로 `menu`
- teal ■ 현재 표시는 **한 내비게이션 묶음에 하나**. `header` 메뉴와 `table-of-contents`가 같이 있으면 각 묶음에 하나씩만
- orange(`--mp-accent`)는 현재 위치에 쓰지 않는다. 화면의 강조 하나(예: `fx-fill` 옆 ■)를 위해 남긴다

## 생김새
**링크 목록 (기본)**
- `<nav aria-label="…">` 안의 `<a>`들, 가로 `display: flex; flex-wrap: wrap`
- 글자 `--mp-size-small`, 자간 `--mp-tracking-small`, `opacity: var(--mp-opacity-nav)`, `var(--mp-font)` 400
- 막대·배경·테두리 상자 없음 — 글자만. 밑줄 대신 `padding-bottom: 0.15em` + 투명한 1px 밑선 자리를 미리 잡아 둔다(현재 위치에서 글자가 흔들리지 않게)
- 현재 위치 `aria-current="page"`: 글자 앞 **teal ■ 면**(`::before`, `background: var(--mp-secondary)`) + opacity 1 + 밑선 `--mp-line-strong`
- 세로 메뉴(`drawer` 안, 사이드 목록): 같은 규칙을 세로로

**메뉴 버튼 (접힌 메뉴)**
- 기본형은 글자 `[ 메뉴 ]` — `text-action` 모양, `--mp-size-kicker`, 자간 `--mp-tracking-meta`, `--mp-opacity-meta`
- 햄버거가 필요하면 **픽셀 막대 세 줄**: 끝이 각진 사각 막대. 둥근 선·SF Symbols·Material 아이콘을 쓰지 않는다. 버튼 틀은 정사각 1px `--mp-line-button`(`icon-button`)
- 열리면 글자는 `[ 닫기 ]`, 막대 버튼은 반전된 채 유지하고 `aria-label`을 "메뉴 닫기"로 바꾼다

**강조 링크 (선택, 화면당 하나)**
- 메뉴 밖에 떨어진 링크 하나(metaphr.dev 우상단 "블로그")만 `fx-fill`로 둔다. 메뉴 안 링크에는 쓰지 않는다

**크기·간격**
- 가로 링크 사이 `gap: 0.4em 1.4em`(세로 0.4em, 가로 1.4em), 세로 메뉴 항목 사이 `0.9em`
- teal ■: `0.5em × 0.5em`, 오른쪽 간격 `0.45em`, `vertical-align: 0.12em`
- `[ 메뉴 ]` 안쪽 여백 `0.2em 0.35em`, 행간 1.4
- 픽셀 막대: 막대 폭 `14px`, 높이 `2px`, 막대 사이 `3px`, 버튼 `2.4rem` 정사각
- 강조 링크 채움 영역 `inset: -0.1em -0.15em`

**반응형**
- 넓은 화면: `header`의 브랜드 오른쪽에 한 줄. 줄이 넘치면 `flex-wrap`으로 브랜드 아래 줄로 내려간다
- `max-width: 559px`에서 링크가 두 줄을 넘으면(보통 5개 이상) 링크 목록을 숨기고 메뉴 버튼만 둔다. 4개 이하면 줄바꿈으로 충분하다. 560px 이상에서는 메뉴 버튼을 쓰지 않는다
- 터치 기기: 링크 높이가 작으므로 `padding-block`을 늘려 누를 곳을 44px 이상으로 잡는다(글자 크기는 그대로)
- `(hover: none)`에서는 호버 상태가 없으므로 현재 위치 표시만으로 위치를 알린다

## 상태
| 상태 | 링크 | `[ 메뉴 ]` 버튼 | 픽셀 막대 버튼 |
|---|---|---|---|
| 기본 | `--mp-opacity-nav`(0.7), 투명 밑선 | `--mp-opacity-meta` | 1px `--mp-line-button`, 막대 `--mp-ink` |
| 호버(`hover: hover` 기기)·키보드 포커스 | opacity 1 | 배경 `--mp-ink`, 글자 `--mp-bg`, opacity 1 | 배경·테두리 `--mp-ink`, 막대 `--mp-bg` |
| 터치 누름(`hover: none`) | `:active` 동안 opacity 1 | `:active` 동안 반전 | `:active` 동안 반전 + 1px 아래로 |
| 현재 위치 | teal ■ + opacity 1 + 1px `--mp-line-strong` 밑선 | — | — |
| 열림 `aria-expanded="true"` | — | 반전 유지, `[ 닫기 ]` | 반전 유지 |
| 누름 | opacity 1 | 반전 | 반전 + `translateY(1px)` |
| 비활성(준비 중 페이지) | 링크 대신 `<span>`, `--mp-opacity-muted`, 호버 없음 | — | — |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` | 같음 | 같음 |

현재 위치 ■는 teal **면**이다. orange로 바꾸지 않는다(orange는 화면의 강조 하나를 위해 남긴다). 라이트에서 teal 글자도 쓰지 않는다.

## 동작
- 링크 호버: opacity만 `--mp-duration-hover`(0.25s) ease. 색·크기·위치·굵기가 바뀌지 않는다
- 메뉴 버튼 호버·열림: `invert-hover` — 배경·글자·테두리색 `--mp-duration-hover` ease. `:hover`는 `@media (hover: hover)` 안에만 두고, 터치(`hover: none`)는 `:active` 반전으로 대신한다(눌린 뒤 호버가 남는 문제 방지)
- 강조 링크: `fx-fill` 8칸이 `--mp-steps-fill`(4계단), `--mp-duration-fill`(0.19s), 칸마다 지연 0–280ms
- 열리는 패널의 움직임은 `drawer`·`dropdown-menu`를 따른다. 메뉴 버튼 자체는 움직이지 않는다
- 현재 위치가 바뀔 때 ■가 미끄러지지 않는다 — 새 페이지에서 바로 그 자리에 있다

**접근성**
- 링크 목록은 `<nav aria-label="주 메뉴">`. 한 페이지에 `nav`가 여러 개면 이름을 다르게(`주 메뉴`, `목차`)
- 현재 페이지 링크에 `aria-current="page"`. ■는 `::before` 장식이라 읽히지 않는다
- 메뉴 버튼은 `<button type="button" aria-expanded="false" aria-controls="패널 id">`. 픽셀 막대 버튼은 글자가 없으므로 `aria-label="메뉴 열기"`/`"메뉴 닫기"`
- 스크린리더가 괄호를 읽지 않게 `[ 메뉴 ]` 버튼에도 `aria-label="메뉴"`를 준다
- 키보드: `Tab`으로 링크 순서대로 이동(가로 목록에 화살표 키 탐색을 넣지 않는다 — 메뉴는 `role="menu"`가 아니다). 메뉴 버튼은 `Enter`/`Space`로 열고, 열리면 포커스를 패널 첫 링크로, `Esc`로 닫고 포커스를 버튼으로 돌린다
- 포커스 순서: 뒤로가기 → 브랜드 → 메뉴 링크(또는 메뉴 버튼) → 본문. 건너뛰기 링크 `본문으로 건너뛰기`를 맨 앞에 둔다

**reduced-motion**
- `prefers-reduced-motion: reduce`이면 모든 transition을 끄고 최종 상태만 보여 준다. `fx-fill`은 즉시 반전

## 데모
```html demo
<div class="mp-menu-demo">
  <nav class="mp-menu" aria-label="주 메뉴">
    <a href="#">기본</a>
    <a href="#" class="is-hover">호버</a>
    <a href="#" aria-current="page">현재</a>
    <span class="mp-menu-off">준비</span>
  </nav>
  <div class="mp-menu-buttons">
    <button class="mp-menu-button" type="button" aria-expanded="false" aria-label="메뉴">[ 메뉴 ]</button>
    <button class="mp-menu-button" type="button" aria-expanded="true" aria-label="메뉴 닫기">[ 닫기 ]</button>
    <button class="mp-menu-bars" type="button" aria-expanded="false" aria-label="메뉴 열기"><span></span><span></span><span></span></button>
    <button class="mp-menu-bars" type="button" aria-expanded="true" aria-label="메뉴 닫기"><span></span><span></span><span></span></button>
  </div>
</div>
```

## 코드
```css
.mp-menu-demo { display: grid; gap: 1.6em; }

/* 링크 목록 */
.mp-menu { display: flex; flex-wrap: wrap; gap: 0.4em 1.4em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-menu a, .mp-menu-off {
  color: var(--mp-ink); text-decoration: none;
  padding-bottom: 0.15em; border-bottom: var(--mp-border) solid transparent;
  opacity: var(--mp-opacity-nav);
  transition: opacity var(--mp-duration-hover) ease;
}
.mp-menu a:focus-visible, .mp-menu a.is-hover { opacity: 1; }
@media (hover: hover) { .mp-menu a:hover { opacity: 1; } }
@media (hover: none) { .mp-menu a:active { opacity: 1; } }
.mp-menu a:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-menu a[aria-current="page"] { opacity: 1; border-bottom-color: var(--mp-line-strong); }
.mp-menu a[aria-current="page"]::before {
  content: ""; display: inline-block; width: 0.5em; height: 0.5em;
  margin-right: 0.45em; vertical-align: 0.12em; background: var(--mp-secondary);
}
.mp-menu-off { opacity: var(--mp-opacity-muted); cursor: default; }
.mp-menu--vertical { flex-direction: column; align-items: flex-start; gap: 0.9em; }

/* 메뉴 버튼 — 글자형 */
.mp-menu-buttons { display: flex; flex-wrap: wrap; align-items: center; gap: 1.2em; }
.mp-menu-button {
  padding: 0.2em 0.35em; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-kicker) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
  cursor: pointer; opacity: var(--mp-opacity-meta);
  transition: opacity var(--mp-duration-hover) ease, background-color var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-menu-button:focus-visible, .mp-menu-button.is-hover, .mp-menu-button[aria-expanded="true"] { opacity: 1; background: var(--mp-ink); color: var(--mp-bg); }
@media (hover: hover) { .mp-menu-button:hover { opacity: 1; background: var(--mp-ink); color: var(--mp-bg); } }
@media (hover: none) { .mp-menu-button:active { opacity: 1; background: var(--mp-ink); color: var(--mp-bg); } }

/* 메뉴 버튼 — 픽셀 막대 세 줄 */
.mp-menu-bars {
  display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px;
  width: 2.4rem; height: 2.4rem; padding: 0; cursor: pointer;
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0; background: transparent; color: var(--mp-ink);
  transition: background-color var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, border-color var(--mp-duration-hover) ease;
}
.mp-menu-bars span { display: block; width: 14px; height: 2px; background: currentColor; }
.mp-menu-bars:focus-visible, .mp-menu-bars.is-hover, .mp-menu-bars[aria-expanded="true"] { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
@media (hover: hover) { .mp-menu-bars:hover { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); } }
@media (hover: none) { .mp-menu-bars:active { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); } }
.mp-menu-bars:active { transform: translateY(1px); }
.mp-menu-button:focus-visible, .mp-menu-bars:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }

@media (hover: none) { .mp-menu a { padding-block: 0.8em 0.15em; } }
@media (prefers-reduced-motion: reduce) { .mp-menu a, .mp-menu-button, .mp-menu-bars { transition: none; } }
/* 강조 링크 하나는 link 문서의 .mp-link-fx(fx-fill) 코드를 그대로 쓴다 */
```

```js
// 메뉴 버튼 — 열림 상태·글자만 바꾼다. 패널 모양은 drawer / dropdown-menu
// 마크업: <button class="mp-menu-button" aria-expanded="false" aria-controls="site-menu">[ 메뉴 ]</button> … <nav id="site-menu" hidden>
(() => {
  const btn = document.querySelector('.mp-menu-button[aria-controls]');
  const panel = btn && document.getElementById(btn.getAttribute('aria-controls'));
  if (!btn || !panel) return;
  const set = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? '[ 닫기 ]' : '[ 메뉴 ]';
    btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴');
    panel.hidden = !open;
  };
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    set(open);
    if (open) panel.querySelector('a')?.focus();
  });
  panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn.focus(); } });
})();
```

## 앱
- 앱의 주 메뉴는 보통 `tab-bar`다. 이 문서는 태블릿·데스크톱 사이드 목록과 설정 화면 링크 목록에 적용한다.
```swift
struct MenuRow: View {
  let title: String; let current: Bool
  var body: some View {
    HStack(spacing: 6) {
      Rectangle().fill(current ? Color.mpSecondary : .clear).frame(width: 8, height: 8)
      Text(title).font(.custom("Mulmaru", size: 15)).foregroundStyle(Color.mpInk)
    }
    .opacity(current ? 1 : 0.7)
    .accessibilityAddTraits(current ? .isSelected : [])
  }
}
```
```kotlin
@Composable fun MenuRow(title: String, current: Boolean, onClick: () -> Unit) =
  Row(Modifier.clickable(onClick = onClick).heightIn(min = 48.dp).alpha(if (current) 1f else 0.7f),
      verticalAlignment = Alignment.CenterVertically) {
    Box(Modifier.size(8.dp).background(if (current) MpSecondary else Color.Transparent, RectangleShape))
    Spacer(Modifier.width(6.dp))
    Text(title, fontFamily = Mulmaru, fontWeight = FontWeight.Normal, color = MpInk)
  }
```
- 메뉴 버튼 아이콘은 픽셀 막대 세 줄(14×2, 간격 3을 pt/dp로) 또는 `[ 메뉴 ]`. 눌림 = 반전, 터치 영역 44pt/48dp.
- OS 예외(모양을 바꾸지 않는다): `NavigationSplitView` 시스템 사이드바 토글, iOS 26 이상 시스템 내비게이션 바·`TabView` 유리 바, 안드로이드 predictive back 미리보기 애니메이션.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 글자만 있는 링크 목록, 현재 위치는 teal ■ + 밑선 + opacity 1.
- 해야 할 것: 호버는 opacity 1, 메뉴 버튼은 `[ 메뉴 ]` 또는 각진 픽셀 막대, 호버·열림은 반전.
- 해야 할 것: `aria-current`·`aria-expanded`·`aria-label`, `Esc`로 닫고 포커스 돌려주기.
- 해야 할 것: 링크 이름은 페이지 제목과 같은 짧은 명사("철학", "토큰").
- 하지 말 것: 메뉴 막대 배경·그림자·흐림, 둥근 알약 모양 현재 표시.
- 하지 말 것: 현재 위치를 orange나 teal 글자색으로, 호버 시 색 바꾸기·굵게·커지기.
- 하지 말 것: 둥근 선 햄버거 아이콘, 햄버거가 X로 회전하는 애니메이션.
- 하지 말 것: 모든 메뉴 링크에 `fx-fill`, 메뉴 안에 행동 버튼 섞기, 넓은 화면에서 메뉴를 버튼 뒤로 숨기기.

**자주 틀리는 것**
- `<div onclick>`로 메뉴를 만든다 → `<nav>` + `<a href>`로 바꾼다
- 가로 메뉴에 `role="menu"`·`menuitem`을 붙인다 → 이동 링크 목록이므로 역할을 붙이지 않는다(`role="menu"`는 `dropdown-menu` 행동 목록용)
- 현재 페이지를 `class="active"`로만 표시한다 → `aria-current="page"`를 달고 CSS도 그 속성으로 건다
- 현재 위치를 굵은 글씨나 orange 밑줄로 표시 → teal ■ + opacity 1 + `--mp-line-strong` 밑선
- 햄버거를 둥근 `border-radius` 선 세 줄로 그린다 → 14×2px 각진 막대 또는 `[ 메뉴 ]`
- 메뉴 버튼을 닫아도 포커스가 패널 안에 남는다 → 닫을 때 `btn.focus()`
