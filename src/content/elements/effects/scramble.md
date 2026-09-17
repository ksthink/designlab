---
id: scramble
name: 글자 스크램블
nameEn: Scramble
category: effects
summary: 브랜드 글자를 가리키면 셀마다 글리프로 바뀌고 반전되며 물결처럼 흐르다가, 떠나면 잦아들며 원문으로 돌아온다.
aliases: [스크램블, 글자 섞기, 글자 뒤섞기, 해킹 효과, 디코드, 텍스트 효과, 브랜드 호버, 로고 호버, scramble, text scramble, glitch text, decode effect, brand hover, 이펙트, 효과, effect]
platforms: [web]
status: extracted
source: metaphr.dev index.html brandScramble() · .brand .ch.gx
pillars: [pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-tick, --mp-opacity-brand, --mp-size-heading]
effects: [invert-hover, reduced-motion]
related: [hero, glyph-field, header, terminal-vocabulary]
---

## 용도
히어로의 브랜드 표기(`metaphr`) 한 곳에만 쓴다. 링크가 아닌 장식 글자가 포인터에 반응하는 유일한 방법이다.
읽어야 하는 글자(메뉴, 버튼, 링크, 본문, 제목)에는 쓰지 않는다. 누를 수 있는 글자의 반응은 `fx-fill`·`invert-hover`다.

## 생김새
**구조**
- 글자를 한 글자씩 `<span class="ch">`로 나눈다. 부모에 `aria-label="metaphr"`, 각 셀은 `aria-hidden="true"`(스크린리더가 바뀐 글리프를 읽지 않게).
- 호버를 시작할 때 각 셀의 폭을 실측값(`getBoundingClientRect().width`)으로 고정하고 `text-align: center` — 글리프가 바뀌어도 줄 폭이 흔들리지 않는다.

**활성 셀**
- 글리프 `· : + x # 0 1` 중 하나(Mulmaru에 있는 것만), 선택 공식 `SCR[(tick × 3 + 5 × i) % 길이]`.
- 반전: 배경 `--mp-ink`, 글자 `--mp-bg`. 다른 색 없음.
- 기본 글자 투명도 `--mp-opacity-brand` .8, 자간 .12em.

**물결**
- 틱마다 셀 `i`의 위상 `d = (tick - i) mod 18`. `d < 8`이면 활성 → 18틱 주기 중 8틱 동안 켜지고, 열마다 한 틱씩 밀려 왼쪽에서 오른쪽으로 흐른다.
- 틱 간격 68ms(metaphr.dev 원값). 한 주기 약 1.2s.

**떠날 때**
- 포인터가 떠나면 42틱(약 2.9s)에 걸쳐 잦아든다: 남은 틱 비율만큼만 셀을 활성(`keep = ceil((stopAt - tick) / 42 × 12)`, `i % 12 < keep`).
- 42틱이 지나면 타이머를 멈추고 원문·클래스를 되돌린다.
- 다시 들어오면 잦아들기를 취소하고 계속 흐른다.

**접근성**
- 포인터 전용 장식. 키보드 포커스를 받지 않는다(링크가 아니므로 `tabindex` 없음).
- 원문은 `aria-label`로 늘 읽힌다.
- `prefers-reduced-motion: reduce`이면 이벤트를 걸지 않는다(원문 그대로).
- 터치 기기(`hover: none`)에서는 걸지 않는다. 탭하면 끝나지 않는 스크램블이 남는다.

**반응형**
- 셀 폭 고정은 호버 시작 때 잰다. 창 크기가 바뀌면 고정을 풀고 다음 호버에서 다시 잰다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 원문, opacity .8 |
| 호버 중 | 물결 스크램블 반복 (68ms 틱) |
| 떠남 | 42틱에 걸쳐 활성 셀이 줄며 원문으로 |
| 다시 들어옴 | 잦아들기 취소, 계속 흐름 |
| 터치·움직임 줄이기 | 효과 없음, 원문 |

## 동작
- `setInterval(apply, 68)` — 틱마다 글리프 교체. 보간·페이드 없음.
- 데모는 JS 없이도 보이도록 CSS `steps`로 반전 셀이 옮겨 가는 축소판을 둔다. 실제 화면에서는 브랜드 요소에 `data-scramble`을 붙이면 아래 JS가 실제 스크램블을 건다(포인터를 올리면 CSS 반복이 멈추고 JS가 이어받는다).

## 데모
```html demo
<p class="mp-scramble" aria-label="metaphr"><span aria-hidden="true">m</span><span aria-hidden="true">e</span><span aria-hidden="true">t</span><span aria-hidden="true">a</span><span aria-hidden="true">p</span><span aria-hidden="true">h</span><span aria-hidden="true">r</span></p>
```

## 코드
```css
.mp-scramble { margin: 0; text-align: center; font-size: var(--mp-size-heading); letter-spacing: 0.12em; opacity: var(--mp-opacity-brand); }
.mp-scramble span { display: inline-block; min-width: 0.9em; text-align: center; }
.mp-scramble .is-gx { background: var(--mp-ink); color: var(--mp-bg); } /* 활성 셀: 반전만 */
/* JS가 없을 때의 축소판: 셀마다 한 틱씩 밀린 steps 반전 */
.mp-scramble:not(.is-live) span { animation: mp-scramble calc(var(--mp-tick) * 18) steps(1, end) infinite; }
.mp-scramble span:nth-child(2) { animation-delay: var(--mp-tick); }
.mp-scramble span:nth-child(3) { animation-delay: calc(var(--mp-tick) * 2); }
.mp-scramble span:nth-child(4) { animation-delay: calc(var(--mp-tick) * 3); }
.mp-scramble span:nth-child(5) { animation-delay: calc(var(--mp-tick) * 4); }
.mp-scramble span:nth-child(6) { animation-delay: calc(var(--mp-tick) * 5); }
.mp-scramble span:nth-child(7) { animation-delay: calc(var(--mp-tick) * 6); }
@keyframes mp-scramble { 0% { background: var(--mp-ink); color: var(--mp-bg); } 44% { background: transparent; color: inherit; } }
@media (prefers-reduced-motion: reduce) { .mp-scramble span { animation: none; } }
```

```js
function scramble(el) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
  const chs = [...el.querySelectorAll('span')];
  if (!chs.length) return;
  const orig = chs.map((s) => s.textContent);
  const SCR = ['·', ':', '+', 'x', '#', '0', '1'];
  let tick = 0, timer = null, stopAt = -1, locked = false;
  const restore = () => {
    clearInterval(timer); timer = null; stopAt = -1;
    chs.forEach((s, i) => { s.textContent = orig[i]; s.classList.remove('is-gx'); });
  };
  const apply = () => {
    tick++;
    if (stopAt >= 0 && tick >= stopAt) return restore();
    const keep = stopAt < 0 ? 12 : Math.ceil((stopAt - tick) / 42 * 12);
    chs.forEach((s, i) => {
      const on = ((tick - i) % 18 + 18) % 18 < 8 && (i % 12) < keep;
      s.textContent = on ? SCR[(tick * 3 + 5 * i) % SCR.length] : orig[i];
      s.classList.toggle('is-gx', on);
    });
  };
  el.addEventListener('pointerenter', () => {
    el.classList.add('is-live');
    if (!locked) { chs.forEach((s) => { s.style.width = s.getBoundingClientRect().width.toFixed(2) + 'px'; }); locked = true; }
    stopAt = -1;
    if (!timer) timer = setInterval(apply, 68);
  });
  el.addEventListener('pointerleave', () => { if (timer) stopAt = tick + 42; });
  addEventListener('resize', () => { if (!timer) { chs.forEach((s) => { s.style.width = ''; }); locked = false; } });
}
document.querySelectorAll('.mp-scramble[data-scramble]').forEach(scramble);
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 셀 폭 고정, 반전만, 열마다 한 틱씩 밀린 물결, 떠나면 잦아들기, 원문은 `aria-label`로, 줄이기 설정·터치 기기에서 끄기.
- 하지 말 것: 링크·메뉴·본문·제목에 적용, 색 글리프, 글자 폭이 흔들리는 스크램블, 페이지 로드 때 자동 재생, 한 화면에 여러 곳, 바뀐 글리프를 스크린리더가 읽게 두기.
