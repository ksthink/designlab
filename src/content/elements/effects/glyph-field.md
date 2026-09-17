---
id: glyph-field
name: 글리프 필드
nameEn: Glyph Field
category: effects
summary: "히어로 배경을 Mulmaru 글리프(· : + x # ■) 격자로 채우고 83ms 셀 단위로 갱신한다. 글자 자리는 비워 둔다."
aliases: [글리프, 글리프 배경, 터미널 배경, 문자 배경, 아스키 아트, 매트릭스, 캔버스 배경, 히어로 배경, glyph field, ascii background, terminal background, character grid, canvas, hero background, 이펙트, 효과, effect]
platforms: [web]
status: extracted
source: "metaphr.dev index.html canvas.glyphs · TICK 83 · [data-knockout]"
pillars: [pixel-art]
tokens: [--mp-glyph, --mp-tick, --mp-ink, --mp-bg, --mp-font, --mp-duration-caret]
effects: [reduced-motion]
related: [hero, scramble, caret, terminal-vocabulary]
---

## 용도
사이트 첫 화면(히어로) 배경 한 곳에만 쓴다. 본문·카드·모달·앱 화면에는 쓰지 않는다.
화면이 터미널 격자라는 느낌을 주는 장식이다. 정보를 담지 않는다.

## 생김새
**캔버스**
- `<canvas aria-hidden="true">`를 히어로 전체에 `position: absolute; inset: 0; z-index: 0; pointer-events: none`으로 깐다. 히어로 글자 층은 `z-index: 1`.
- 해상도: `canvas.width = 폭 × min(devicePixelRatio, 2)`. DPR 3 기기에서 부하를 줄이려고 2로 제한한다.
- `image-rendering: pixelated`.

**격자와 글리프**
- 글자 크기 16px Mulmaru. 셀 폭 = `■` 실측 폭(약 13px), 셀 높이 = 글꼴 ascent + descent(약 20px).
- 후보: `· : + x # 0 1 ■ □ ↗ → ← ★ ☆`(모두 Mulmaru에 있음을 확인했다. `▪` `▫`는 없어서 뺐다). 그래도 실행 때 Mulmaru와 폴백 monospace의 폭을 비교해, 폭이 같으면 폴백으로 그려진 것으로 보고 뺀다(격자가 깨지지 않게).
- 역할별 글리프: 점(`·`/`:`), 반짝임(`+`/`x`), 채움(`#`/`■`), 별(`★`/`☆`).
- 색: `--mp-ink` 한 색, 캔버스 전체 알파 상한 .5 — `--mp-glyph`(.55)보다 약간 옅게.
- 색·굵기·크기가 다른 글리프를 섞지 않는다.

**비워 두는 자리 (knockout)**
- 슬로건·브랜드·링크·스크롤 힌트처럼 `[data-knockout]`이 붙은 요소의 사각형 안 셀은 그리지 않는다. 250ms마다 위치를 다시 잰다.
- 결과적으로 글자 뒤는 `--mp-bg` 그대로다. 글리프 위에 글자를 얹지 않는다.

**구동**
- `requestAnimationFrame` 안에서 마지막으로 그린 뒤 `--mp-tick`(83ms)이 지났을 때만 한 프레임을 그린다(약 12fps).
- 셀 값은 `(열, 행, 시간 단계)` 해시로 결정한다. 세션마다 `crypto.getRandomValues`로 시드를 한 번 정한다.
- 서체가 준비된 뒤(`document.fonts.ready`) 셀 크기를 다시 잰다. 2.5초 안에 준비되지 않으면 그대로 시작.

**반응형**
- 창 크기 변경은 150ms 디바운스 후 캔버스 크기·knockout을 다시 계산한다.
- 좁은 화면에서도 셀 크기는 고정(16px 기준). 셀 수만 줄어든다.

**접근성·성능**
- `aria-hidden`, 포커스·포인터 없음.
- 히어로가 화면 밖이면(IntersectionObserver) 멈추고, 탭이 숨겨지면(`visibilitychange`) 멈춘다.
- `prefers-reduced-motion: reduce`이면 정지 프레임 한 장만 그리고 타이머를 시작하지 않는다.
- 저사양을 고려해 셀이 5,000개를 넘으면 셀 크기를 두 배로 한다(선택).

## 상태
| 상태 | 표현 |
|---|---|
| 서체 준비 전 | 캔버스 비어 있음 (히어로 글자만) |
| 히어로가 보임 | 83ms마다 한 프레임 |
| 히어로가 안 보임·탭 숨김 | 정지 |
| 창 크기 변경 | 150ms 뒤 다시 배치 |
| 움직임 줄이기 | 정지 프레임 1장 |

## 동작
- 셀 사이 보간·페이드·60fps 트윈 금지. 한 틱에 바뀌는 셀은 전체의 일부(반짝임)만.
- 흘러내리는 "매트릭스 비"처럼 방향성 있는 흐름을 만들지 않는다. 제자리 반짝임과 느린 무늬 이동만.
- 데모는 CSS만으로 몇 칸이 `steps(1)`로 바뀌는 축소판이다. 실제 구현은 아래 JS 골격을 채운다.

## 데모
```html demo
<div class="mp-glyph-field" aria-hidden="true">
  <span>·:+·x·:·+··:·</span>
  <span>:·<b>#</b>·:<i>    </i>:·<b>1</b>·</span>
  <span>·+·:·x·:·+<b>■</b>·</span>
</div>
```

## 코드
```css
.mp-glyph-field {
  display: flex; flex-direction: column; align-items: center;
  padding: 1.2em 0; font-family: var(--mp-font);
  font-size: var(--mp-size-heading); line-height: 1.25; letter-spacing: var(--mp-tracking-fine);
  color: var(--mp-glyph); white-space: pre;
}
.mp-glyph-field b, .mp-glyph-field i { font-weight: 400; font-style: normal; }
.mp-glyph-field b { animation: mp-glyph-field var(--mp-duration-caret) steps(1, end) infinite; }
.mp-glyph-field b:nth-of-type(2) { animation-delay: calc(var(--mp-tick) * 5); }
.mp-glyph-field b:nth-of-type(3) { animation-delay: calc(var(--mp-tick) * 9); }
.mp-glyph-field i { background: var(--mp-bg); } /* knockout 자리 */
@keyframes mp-glyph-field { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .mp-glyph-field b { animation: none; } }

/* 페이지에서 */
.hero { position: relative; }
.hero-glyphs { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; image-rendering: pixelated; }
.hero [data-knockout] { position: relative; z-index: 1; }
```

```js
// 골격: 83ms 셀 단위, 보일 때만, 줄이기 설정이면 한 장만. .hero-glyphs 캔버스가 있을 때만 동작한다.
(function () {
  const canvas = document.querySelector('.hero-glyphs');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const hero = canvas.parentElement;
  const css = getComputedStyle(document.documentElement);
  const INK = css.getPropertyValue('--mp-ink').trim();
  const TICK = parseFloat(css.getPropertyValue('--mp-tick')) || 83;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = ['·', ':', '+', 'x', '#', '■'];
  const seed = crypto.getRandomValues(new Uint32Array(1))[0] & 0x3fff;
  const hash = (c, r, k) => { let h = Math.imul(c + 17 + 11 * (k + seed), 0x165667b1) ^ Math.imul(r + 31, 0x27d4eb2f); h = Math.imul(h ^ (h >>> 13), 0x4bf19f61); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
  let cw = 13, ch = 20, dpr = 1, running = false, last = -1e9, t0 = 0;
  function layout() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = hero.clientWidth * dpr; canvas.height = hero.clientHeight * dpr;
    ctx.font = '16px "Mulmaru", monospace'; cw = Math.round(ctx.measureText('■').width) || 13;
  }
  function knockouts() { const hr = hero.getBoundingClientRect(); return [...hero.querySelectorAll('[data-knockout]')].map((n) => { const r = n.getBoundingClientRect(); return [r.left - hr.left, r.top - hr.top, r.right - hr.left, r.bottom - hr.top]; }); }
  function draw(step) {
    const ko = knockouts();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5; ctx.fillStyle = INK; ctx.font = '16px "Mulmaru", monospace'; ctx.textBaseline = 'top';
    for (let r = 0; r * ch < hero.clientHeight; r++) for (let c = 0; c * cw < hero.clientWidth; c++) {
      const x = c * cw, y = r * ch;
      if (ko.some(([l, t, rt, b]) => x + cw > l && x < rt && y + ch > t && y < b)) continue;
      const v = hash(c, r, Math.floor(step / 6) + (hash(c, r, 0) < 0.08 ? step : 0));
      if (v < 0.35) ctx.fillText(GLYPHS[Math.floor(v / 0.35 * GLYPHS.length)], x, y);
    }
  }
  function frame(ts) { if (!running) return; requestAnimationFrame(frame); if (ts - last < TICK) return; last = ts; t0 ||= ts; draw(Math.floor((ts - t0) / TICK)); }
  const resume = () => { if (REDUCE || running || document.hidden) return; running = true; requestAnimationFrame(frame); };
  const pause = () => { running = false; };
  layout();
  if (REDUCE) draw(0); else resume();
  new IntersectionObserver(([en]) => (en.isIntersecting ? resume() : pause())).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? pause() : resume()));
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { layout(); if (REDUCE) draw(0); }, 150); });
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: Mulmaru에 실제로 있는 글리프만, 잉크 한 색·알파 .5 이하, 83ms 계단, 보일 때만 구동, 글자 자리 비우기, DPR 2 제한, 줄이기 설정이면 한 장.
- 하지 말 것: 흘러내리는 매트릭스 비, 부드러운 페이드·보간, 색 글리프(teal·orange 포함), 본문·카드 뒤 배경, 글자 위로 글리프 겹치기, 화면 밖에서도 계속 그리기, 히어로 외 여러 곳에 사용.
