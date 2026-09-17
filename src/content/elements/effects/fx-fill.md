---
id: fx-fill
name: 계단 채움
nameEn: FX Fill
category: effects
summary: 가리키면 글자 뒤 8칸이 steps(4)로 서로 다른 지연을 두고 차올라 잉크/배경이 반전된다.
aliases: [채움, 채우기 효과, 계단 채움, 픽셀 채움, 블록 채움, 링크 효과, 링크 호버, 터미널 호버, fx-fill, fill hover, pixel fill, block reveal, link hover, 이펙트, 효과, effect]
platforms: [web]
status: extracted
source: "metaphr.dev index.html .fx-fill #footMail .nav-blog · applyFill()"
pillars: [pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-duration-fill, --mp-steps-fill, --mp-opacity-link, --mp-size-small, --mp-tracking-small]
effects: [invert-hover, reduced-motion]
related: [link, invert-hover, footer, header, hero]
---

## 용도
한 화면의 대표 글자 링크(푸터 메일 주소, 히어로 상단 `blog >` 링크)에 쓴다. 버튼보다 가볍고 반전보다 눈에 띈다.
화면당 1–2곳만. 목록·메뉴·본문 링크 전체에 쓰지 않는다(그곳은 `invert-hover` 또는 opacity → 1).
누를 수 있는 글자에만 쓴다. 장식 글자 반응은 `scramble`.

## 생김새
**구조**
- 링크(`a`) 안에 두 층: `.mp-fx-fill-label`(글자, z-index 1)과 `.mp-fx-fill-cells`(8칸 격자, z-index 0, `aria-hidden="true"`).
- 링크는 `position: relative; display: inline-block`. 줄바꿈되는 긴 링크에는 쓰지 않는다(`white-space: nowrap`).

**칸**
- `display: grid; grid-template-columns: repeat(8, 1fr)`, 칸마다 `--mp-ink` 면.
- 처음엔 `transform: scaleY(0)`. 홀수 칸은 아래에서(`transform-origin: bottom`), 짝수 칸은 위에서(`top`) 자란다.
- 칸별 지연 `0, 90, 30, 160, 60, 220, 120, 280ms`(metaphr.dev 원값) — 흩어진 순서로 차오른다. 마지막 칸까지 약 0.47s.
- 채움 영역: 글자에 붙지 않게 `inset: -0.1em -0.15em`. 링크에 padding이 있으면 `inset: 0`.

**글자**
- 기본 `--mp-ink`, 링크 투명도는 `--mp-opacity-link` 이상.
- 채워지면 `--mp-bg`. 색 전환은 `step-end`로 한 번에(중간 색 없음).
- 링크가 옅게(opacity < 1) 시작하면 호버 때 opacity를 0.12s 안에 1로 올린다. 채움보다 늦게 진해지면 반전된 글자가 흐려 보인다.

**접근성**
- 칸 층은 `aria-hidden`, 링크 이름은 label 글자 그대로 읽힌다.
- `:focus-visible`에서도 같은 채움 + `focus-ring`.
- 터치 기기(`hover: none`)에서는 채움을 걸지 않는다. 눌러서 바로 이동하므로 반쯤 찬 상태가 남기 쉽다.
- 대비: 채움 후 ink/bg 10.9:1.

**반응형**
- 칸은 링크 폭의 1/8이라 글자 길이에 따라 칸 폭이 달라진다. 링크 글자가 40자를 넘으면 칸이 너무 넓어지므로 쓰지 않는다.

## 상태
| 상태 | 칸 | 글자 |
|---|---|---|
| 기본 | 비어 있음 (scaleY 0) | `--mp-ink` |
| 호버·포커스 | 8칸 계단으로 차오름 | `--mp-bg` (0.19s 뒤 한 번에) |
| 떠남·포커스 해제 | 같은 계단으로 비워짐 | `--mp-ink` |
| 터치 기기 | 효과 없음 | `--mp-ink` |
| 움직임 줄이기 | 즉시 가득 | 즉시 `--mp-bg` |

## 동작
- 칸: `transition: transform var(--mp-duration-fill) var(--mp-steps-fill) var(--d)` — 0.19s, `steps(4, end)`, 칸마다 `--d` 지연.
- 글자: `transition: color var(--mp-duration-fill) step-end`.
- 데모는 JS 없이 완성된 마크업(label + 8칸)이다. 기본 · 반쯤 참 · 가득(`.is-hover`, 호버 모습 고정)을 나란히 보인다. 첫 링크는 실제로 호버된다.
- 마크업을 손으로 쓰기 번거로우면 아래 `applyFill()`로 주입한다. 이미 주입됐으면 다시 하지 않는다.
- `prefers-reduced-motion: reduce`이면 transition 없음.

## 데모
```html demo
<div class="mp-fx-fill-row">
  <a class="mp-fx-fill" href="#"><span class="mp-fx-fill-label">blog &gt;</span><span class="mp-fx-fill-cells" aria-hidden="true"><span style="--d:0ms"></span><span style="--d:90ms"></span><span style="--d:30ms"></span><span style="--d:160ms"></span><span style="--d:60ms"></span><span style="--d:220ms"></span><span style="--d:120ms"></span><span style="--d:280ms"></span></span></a>
  <span class="mp-fx-fill is-half"><span class="mp-fx-fill-label">blog &gt;</span><span class="mp-fx-fill-cells" aria-hidden="true"><span style="--d:0ms"></span><span style="--d:90ms"></span><span style="--d:30ms"></span><span style="--d:160ms"></span><span style="--d:60ms"></span><span style="--d:220ms"></span><span style="--d:120ms"></span><span style="--d:280ms"></span></span></span>
  <span class="mp-fx-fill is-hover"><span class="mp-fx-fill-label">blog &gt;</span><span class="mp-fx-fill-cells" aria-hidden="true"><span style="--d:0ms"></span><span style="--d:90ms"></span><span style="--d:30ms"></span><span style="--d:160ms"></span><span style="--d:60ms"></span><span style="--d:220ms"></span><span style="--d:120ms"></span><span style="--d:280ms"></span></span></span>
</div>
```

## 코드
```css
.mp-fx-fill-row { display: flex; gap: 2em; align-items: center; }
.mp-fx-fill {
  position: relative; display: inline-block; white-space: nowrap;
  color: var(--mp-ink); text-decoration: none;
  font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small);
}
.mp-fx-fill-label { position: relative; z-index: 1; transition: color var(--mp-duration-fill) step-end; }
.mp-fx-fill-cells {
  position: absolute; inset: -0.1em -0.15em; z-index: 0;
  display: grid; grid-template-columns: repeat(8, 1fr); pointer-events: none;
}
.mp-fx-fill-cells span {
  background: var(--mp-ink);
  transform: scaleY(0); transform-origin: bottom;
  transition: transform var(--mp-duration-fill) var(--mp-steps-fill) var(--d, 0ms);
}
.mp-fx-fill-cells span:nth-child(even) { transform-origin: top; }
@media (hover: hover) {
  .mp-fx-fill:hover .mp-fx-fill-cells span { transform: scaleY(1); }
  .mp-fx-fill:hover .mp-fx-fill-label { color: var(--mp-bg); }
}
.mp-fx-fill:focus-visible .mp-fx-fill-cells span, .mp-fx-fill.is-hover .mp-fx-fill-cells span { transform: scaleY(1); }
.mp-fx-fill:focus-visible .mp-fx-fill-label, .mp-fx-fill.is-hover .mp-fx-fill-label { color: var(--mp-bg); }
/* 데모용: 반쯤 찬 순간 */
.mp-fx-fill.is-half .mp-fx-fill-cells span:nth-child(3n+1) { transform: scaleY(0.5); }
.mp-fx-fill.is-half .mp-fx-fill-cells span:nth-child(4) { transform: scaleY(1); }
@media (prefers-reduced-motion: reduce) {
  .mp-fx-fill-cells span, .mp-fx-fill-label { transition: none; }
}
```

```js
// 링크 글자를 label로 감싸고 8칸을 붙인다. 대상: a[data-fx-fill]
(function () {
  const targets = document.querySelectorAll('a[data-fx-fill]');
  if (!targets.length) return;
  const DELAYS = [0, 90, 30, 160, 60, 220, 120, 280];
  targets.forEach((el) => {
    if (el.querySelector('.mp-fx-fill-label')) return;
    const label = document.createElement('span');
    label.className = 'mp-fx-fill-label';
    while (el.firstChild) label.appendChild(el.firstChild);
    const cells = document.createElement('span');
    cells.className = 'mp-fx-fill-cells';
    cells.setAttribute('aria-hidden', 'true');
    DELAYS.forEach((d) => {
      const s = document.createElement('span');
      s.style.setProperty('--d', d + 'ms');
      cells.appendChild(s);
    });
    el.classList.add('mp-fx-fill');
    el.append(label, cells);
  });
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 8칸, steps(4), 흩어진 지연, 잉크 한 색, 글자색은 step-end. 포커스에도 같은 채움. 화면당 1–2곳.
- 하지 말 것: 부드러운 `ease` 채움, 왼쪽에서 오른쪽으로 미끄러지는 밑줄, orange·teal 채움, 여러 줄 링크, 메뉴·목록 전체에 적용, 터치 기기에 적용, 칸 수를 바꾸기.
