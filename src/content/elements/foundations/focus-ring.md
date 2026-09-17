---
id: focus-ring
name: 포커스 링
nameEn: Focus Ring
category: foundations
summary: 키보드 포커스는 1px 잉크 외곽선을 3px 띄워 그린다. 모든 누를 수 있는 요소에 같은 모양.
aliases: [포커스, 포커스 링, 키보드 포커스, 외곽선, 초점 표시, 탭 이동, 접근성, focus, focus ring, focus-visible, outline, keyboard navigation, a11y]
platforms: [web]
status: extracted
source: design_lab src/layouts/Base.astro :focus-visible · button.md 포커스 링
pillars: [minimalism]
tokens: [--mp-ink, --mp-bg, --mp-border, --mp-line]
effects: [invert-hover]
related: [button, link, text-field, invert-hover, menu, modal]
---

## 용도
키보드(Tab, 방향키)로 이동할 때 현재 위치를 보여준다. 링크·버튼·입력·선택·카드 링크·탭·메뉴 항목 등 포커스를 받는 모든 요소에 적용한다.
마우스·터치로 누를 때는 보이지 않게 `:focus-visible`만 쓴다.
사이트 전체에 한 번 정의하고, 요소마다 바꾸는 것은 `outline-offset`뿐이다.

## 생김새
**기본 링**
- `outline: var(--mp-border) solid var(--mp-ink)` — 1px, 잉크 색(두 테마 자동).
- `outline-offset: 3px` — 요소 테두리와 겹치지 않게 띄운다.
- 모서리 직각(outline은 radius 0이라 자동). 그림자 링·glow·teal/orange 링 없음.

**요소별 변형**
| 요소 | offset | 함께 바뀌는 것 |
|---|---|---|
| 버튼·텍스트 버튼 | 3px | 반전(배경 `--mp-ink`, 글자 `--mp-bg`) |
| 글자 링크 | 3px | opacity → 1 |
| 입력 칸·선택 | -1px (테두리 위에 겹침) | 테두리 `--mp-ink` |
| 카드 전체 링크 | 3px | 테두리 `--mp-line-strong` |
| 체크박스·라디오 | 3px | 없음 |
| 목록·메뉴 항목(가득 찬 행) | -1px | 반전 |
| 가로 스크롤 영역(레일) | -1px | 없음 |

- 부모가 `overflow: hidden`이라 링이 잘리면 offset을 음수로 바꾼다. 링을 지우지 않는다.

**키보드 순서**
- 탭 순서는 DOM 순서 = 읽는 순서. 양수 `tabindex`를 쓰지 않는다.
- 페이지 맨 앞에 "본문으로 건너뛰기" 링크(`.skip`, 포커스될 때만 보임).
- 모달·메뉴가 열리면 포커스를 안으로 옮기고 가둔다(Tab 순환), `Esc`로 닫고 연 요소로 돌아간다.
- 가로 목록·탭·메뉴 안 이동은 방향키(roving `tabindex`: 현재 항목 0, 나머지 -1).

**접근성 기준**
- 링과 배경 대비: 잉크 vs bg 10.9:1(WCAG 2.2 2.4.13 포커스 표시 3:1 이상 충족).
- 포커스된 요소가 고정 헤더·쿠키 바에 가리지 않게 `scroll-margin-top`을 헤더 높이만큼.
- `forced-colors: active`에서는 `outline-color: Highlight`가 OS에 의해 적용된다. `outline: none`을 두지 않는다.

**반응형**
- 터치 기기에서도 외장 키보드가 있으면 같은 링이 보인다. 크기 변화 없음.

## 상태
| 상태 | 표현 |
|---|---|
| 마우스·터치 포커스 | 링 없음 |
| 키보드 포커스 | 1px 잉크 외곽선, 3px 띄움 |
| 포커스 + 반전 요소 | 링 + 잉크 면·배경색 글자 |
| 입력 칸 포커스 | 테두리 `--mp-ink` + offset -1px |
| 비활성 요소 | 포커스 받지 않음 (`disabled`) 또는 `aria-disabled` + 링 유지 |

## 데모
```html demo
<div class="mp-focus-ring">
  <span class="mp-focus-ring-btn">가</span>
  <span class="mp-focus-ring-btn is-focus">가</span>
  <span class="mp-focus-ring-field"></span>
  <span class="mp-focus-ring-field is-focus"></span>
</div>
```

## 코드
```css
:focus-visible { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; }
[id] { scroll-margin-top: 5rem; }
.skip { position: absolute; left: -9999px; }
.skip:focus-visible { left: var(--mp-gutter); top: 1rem; z-index: 30; background: var(--mp-bg); padding: 0.5em 1em; }

.mp-focus-ring { display: flex; gap: 1.6em; align-items: center; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-focus-ring-btn { padding: 0.75em 1.5em; border: var(--mp-border) solid var(--mp-line-button); line-height: 1; }
.mp-focus-ring-field { width: 7em; height: 2.6em; border: var(--mp-border) solid var(--mp-line); }
/* 데모용 .is-focus = 키보드 포커스 모습 고정 */
.mp-focus-ring-btn.is-focus { outline: var(--mp-border) solid var(--mp-ink); outline-offset: 3px; background: var(--mp-ink); color: var(--mp-bg); }
.mp-focus-ring-field.is-focus { border-color: var(--mp-ink); outline: var(--mp-border) solid var(--mp-ink); outline-offset: -1px; }
```

```js
// 가로 목록 안 방향키 이동 (roving tabindex)
document.querySelectorAll('[data-roving]').forEach((list) => {
  const items = [...list.querySelectorAll('[data-roving-item]')];
  items.forEach((it, i) => it.setAttribute('tabindex', i === 0 ? '0' : '-1'));
  list.addEventListener('keydown', (e) => {
    const i = items.indexOf(document.activeElement);
    if (i < 0 || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    items[i].setAttribute('tabindex', '-1'); items[n].setAttribute('tabindex', '0'); items[n].focus();
  });
});
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 전역 `:focus-visible` 한 번 정의. 모든 포커스 가능한 요소에 같은 링. 탭 순서는 읽는 순서. 잘리면 offset을 음수로. 열린 층에 포커스 이동·복귀.
- 하지 말 것: `outline: none`만 두고 대체 표시 없음, 둥근·두꺼운·색 링, `box-shadow`로 만든 링, 양수 tabindex, 마우스 클릭에도 링 표시, 포커스 표시를 호버와 다르게 만들기.
