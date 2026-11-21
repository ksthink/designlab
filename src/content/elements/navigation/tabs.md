---
id: tabs
name: 탭
nameEn: Tabs
category: navigation
summary: 같은 화면 안에서 패널을 바꾸는 글자 탭 줄. 아래 1px 헤어라인, 선택 탭은 teal ■ 면과 진한 밑선.
aliases: [탭, tabs, 탭 메뉴, 탭 전환, 패널 전환, tab list, tablist, 상단 탭, 하위 메뉴, 보기 전환 탭]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-line, --mp-size-small, --mp-tracking-small, --mp-opacity-nav, --mp-line-strong, --mp-duration-hover, --mp-ink, --mp-opacity-muted, --mp-border, --mp-font, --mp-secondary]
effects: [reduced-motion]
related: [menu, segmented-control, tab-bar, accordion, code-block]
---

## 용도
한 주제의 다른 면(코드 CSS / JS / 앱, 라이트 / 다크, 요약 / 상세)을 같은 자리에서 바꿔 볼 때 쓴다.
주소가 바뀌는 페이지 이동이면 `menu`, 2–4개 값을 고르는 설정이면 `segmented-control`, 모든 내용을 한 번에 훑어야 하면 `accordion`이나 그냥 나열한다.
탭은 2–6개. 탭 이름이 길어 한 줄을 넘으면 탭 대신 절 제목으로 나눈다.

**함께 쓰는 요소**
- `tabs` vs `segmented-control`: 패널 내용이 통째로 바뀌면 탭(teal ■ + 밑선), 같은 내용의 보기·단위만 바뀌면 세그먼트(teal 면 칸)
- `code-block` 위에 두어 CSS / JS / 앱 코드를 바꾼다. 탭 줄과 코드 상자 사이 `1.6em`
- 페이지의 `menu`·앱의 `tab-bar` 아래 한 단계 낮은 전환으로 쓴다. 탭 안에 또 탭을 넣지 않는다
- teal ■는 탭 줄 하나에 하나. 선택 탭에 orange를 쓰지 않는다

## 생김새
- 탭 줄 아래 1px `--mp-line`. 탭은 글자만 — 상자·배경·폴더 모양 없음, radius 0
- 글자 `--mp-size-small`, 자간 `--mp-tracking-small`, 기본 `--mp-opacity-nav`
- 탭 아래 1px 밑선 자리를 미리 잡고(`border-bottom: 1px solid transparent`), 줄 선과 겹치게 `margin-bottom: -1px`
- **선택 탭**: 글자 앞 `0.5em` 정사각 **teal ■ 면**(오른쪽 간격 `0.45em`) + opacity 1 + 밑선 `--mp-line-strong`. `menu`의 현재 위치와 같은 표시
- 패널은 탭 줄 아래 `1.6em` 떨어져 시작, 패널 자체에는 테두리를 두지 않는다

**크기·간격**
- 탭 `padding: 0.6em 0`, 탭 사이 `1.4em`
- 터치 기기에서 탭 높이 최소 44px: `padding: 0.9em 0`
- ■ 표시가 들어가도 다른 탭이 밀리지 않게 탭 사이 간격은 고정, 글자 줄만 늘어난다

**반응형**
- 탭 줄이 폭을 넘으면 `overflow-x: auto`로 가로 스크롤(스크롤바 숨김 금지), 선택 탭은 `scrollIntoView({ inline: 'nearest' })`
- 줄바꿈해서 두 줄로 만들지 않는다
- 폭 560px 미만에서 탭이 5개를 넘으면 `select`로 바꾼다
- 터치(`pointer: coarse`)에서는 탭 높이 44px 이상

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | `--mp-opacity-nav`, 밑선 투명 |
| 호버·포커스 | opacity 1 (`--mp-duration-hover` ease) |
| 선택 `aria-selected="true"` | teal ■ + opacity 1 + 밑선 `--mp-line-strong` |
| 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 비활성 | `--mp-opacity-muted`, `aria-disabled="true"`, 선택 불가 |

## 동작
- 선택 즉시 패널 교체. 밑선이 미끄러지는 인디케이터·패널 슬라이드·페이드 없음
- 투명도 변화만 `--mp-duration-hover` ease
- 선택 탭은 `?tab=css`처럼 주소에 남겨 새로고침·공유해도 유지할 수 있다(선택)
- `reduced-motion`: transition 없이 최종 상태만

**접근성**
- 구조: 컨테이너 `role="tablist"` + `aria-label`, 탭 `<button role="tab" aria-selected aria-controls="panel-id" id="tab-id">`, 패널 `role="tabpanel" aria-labelledby="tab-id" tabindex="0"`
- 로빙 탭인덱스: 선택 탭만 `tabindex="0"`, 나머지 `tabindex="-1"`
- 키보드: `←` `→` 이전·다음 탭(끝에서 처음으로 순환), `Home` `End` 처음·끝, `Tab`은 탭 줄에서 패널로 이동
- 자동 활성화(화살표로 이동하면 바로 선택)를 기본으로 한다. 패널 로딩이 느리면 수동 활성화: 화살표는 포커스만 옮기고 `Enter`/`Space`로 선택
- 숨긴 패널은 `hidden`(보조기기에서도 숨김). 비활성 탭은 `aria-disabled="true"`, 화살표 이동에서 건너뛴다
- ■는 `::before` 장식이라 읽히지 않는다

## 데모
```html demo
<div class="mp-tabs" role="tablist" aria-label="코드">
  <button role="tab" type="button" aria-selected="true">CSS</button>
  <button role="tab" type="button" aria-selected="false" class="is-hover">JS</button>
  <button role="tab" type="button" aria-selected="false">앱</button>
  <button role="tab" type="button" aria-selected="false" aria-disabled="true">MD</button>
</div>
```

## 코드
```css
.mp-tabs { display: flex; gap: 1.4em; overflow-x: auto; border-bottom: var(--mp-border) solid var(--mp-line); }
.mp-tabs [role="tab"] {
  flex: none; margin-bottom: -1px; padding: 0.6em 0; cursor: pointer;
  border: 0; border-bottom: var(--mp-border) solid transparent; border-radius: 0; background: transparent;
  color: var(--mp-ink); font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  opacity: var(--mp-opacity-nav); transition: opacity var(--mp-duration-hover) ease;
}
.mp-tabs [role="tab"]:hover, .mp-tabs [role="tab"]:focus-visible, .mp-tabs [role="tab"].is-hover { opacity: 1; }
.mp-tabs [role="tab"]:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-tabs [aria-selected="true"] { opacity: 1; border-bottom-color: var(--mp-line-strong); }
.mp-tabs [aria-selected="true"]::before {
  content: ""; display: inline-block; width: 0.5em; height: 0.5em;
  margin-right: 0.45em; vertical-align: 0.12em; background: var(--mp-secondary);
}
.mp-tabs [aria-disabled="true"] { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
@media (pointer: coarse) { .mp-tabs [role="tab"] { padding: 0.9em 0; } }
@media (prefers-reduced-motion: reduce) { .mp-tabs [role="tab"] { transition: none; } }
```

```js
// 화살표·Home·End 이동 + 자동 활성화. 탭마다 aria-controls="패널 id"
(() => {
  const list = document.querySelector('.mp-tabs[role="tablist"]');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"]:not([aria-disabled="true"])')];
  if (!tabs.length) return;
  function select(t) {
    tabs.forEach((x) => {
      const on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(x.getAttribute('aria-controls') || '');
      if (panel) panel.hidden = !on;
    });
    t.focus();
  }
  list.addEventListener('keydown', (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (k === undefined) return;
    e.preventDefault();
    select(tabs[(k + tabs.length) % tabs.length]);
  });
  tabs.forEach((t) => t.addEventListener('click', () => select(t)));
})();
```

## 앱
- SwiftUI: 시스템 `Picker(.segmented)`는 캡슐 모양이라 쓰지 않는다. 글자 버튼 줄로 직접 그린다.
```swift
HStack(spacing: 22) { ForEach(tabs.indices, id: \.self) { i in
  Button { selected = i } label: { HStack(spacing: 6) {
    if i == selected { Rectangle().fill(Color.mpSecondary).frame(width: 8, height: 8) }
    Text(tabs[i]).font(.custom("Mulmaru", size: 12))
  }.padding(.vertical, 10)
   .overlay(alignment: .bottom) { Rectangle().fill(i == selected ? Color.mpLineStrong : .clear).frame(height: 1) } }
  .buttonStyle(.plain).opacity(i == selected ? 1 : 0.7)
  .accessibilityAddTraits(i == selected ? .isSelected : []) } }
.overlay(alignment: .bottom) { Rectangle().fill(Color.mpLine).frame(height: 1) }
```
```kotlin
ScrollableTabRow(selectedTabIndex = selected, containerColor = MpBg, edgePadding = 0.dp,
  indicator = { TabRowDefaults.SecondaryIndicator(Modifier.tabIndicatorOffset(it[selected]), height = 1.dp, color = MpLineStrong) },
  divider = { HorizontalDivider(thickness = 1.dp, color = MpLine) }) {
  tabs.forEachIndexed { i, t -> Tab(selected = i == selected, onClick = { selected = i },
    text = { Row(verticalAlignment = Alignment.CenterVertically) {
      if (i == selected) { Box(Modifier.size(8.dp).background(MpSecondary, RectangleShape)); Spacer(Modifier.width(6.dp)) }
      Text(t, fontFamily = Mulmaru, fontWeight = FontWeight.Normal) } },
    selectedContentColor = MpInk, unselectedContentColor = MpInk.copy(alpha = 0.7f)) }
}
```
- 선택 탭: `.accessibilityAddTraits(.isSelected)`, 그 외 `.opacity(0.7)`.
- OS 예외 없음 — 탭 줄은 앱이 그린다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 글자 탭, 선택은 teal ■ + 진한 밑선 + opacity 1.
- 해야 할 것: `role="tablist"`/`tab`/`tabpanel`과 화살표·Home·End 키.
- 해야 할 것: 넘치면 가로 스크롤, 선택 탭은 보이게.
- 해야 할 것: 탭 이름은 짧은 명사 1–2단어.
- 하지 말 것: 상자·폴더 모양 탭, 선택 탭 배경 채우기.
- 하지 말 것: 미끄러지는 굵은 인디케이터, 패널 슬라이드 전환.
- 하지 말 것: 선택 탭 글자색을 teal·orange로 바꾸기, 굵게.
- 하지 말 것: 페이지 이동에 탭 쓰기(→ `menu`), 탭 줄 두 줄로 줄바꿈.

**자주 틀리는 것**
- 모든 탭에 `tabindex="0"`을 줘 `Tab` 키가 탭마다 멈춘다 → 로빙 탭인덱스(선택 탭만 0)
- 패널을 `opacity: 0`으로만 숨긴다 → `hidden`으로 숨겨 읽기·포커스에서도 빠지게
- `aria-controls` 없이 탭과 패널을 연결하지 않는다 → 탭 `aria-controls`, 패널 `aria-labelledby`
- Compose 인디케이터가 미끄러진다 → 1dp 선만 두고 이동 애니메이션은 쓰지 않는다
- 페이지 주소가 바뀌는 링크 목록에 탭 역할을 붙인다 → `menu` + `aria-current="page"`
