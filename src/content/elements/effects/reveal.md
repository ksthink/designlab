---
id: reveal
name: 등장
nameEn: Reveal
category: effects
summary: 섹션이 화면에 들어오면 14px 아래에서 0.9초에 걸쳐 제자리로 떠오르며 나타난다. 한 번만.
aliases: [등장, 나타나기, 페이드 인, 스크롤 등장, 스크롤 애니메이션, 떠오르기, reveal, fade in, scroll reveal, appear, entrance, on scroll, 이펙트, 효과, effect]
platforms: [web]
status: extracted
source: metaphr.dev index.html .reveal · IntersectionObserver reveal()
pillars: [minimalism]
tokens: [--mp-duration-reveal, --mp-duration-fade, --mp-line, --mp-border]
effects: [reduced-motion]
related: [section-head, page-list, footer, hero, motion]
---

## 용도
긴 목록형 페이지에서 **섹션 단위**(분류 섹션, 소개 문단 블록, 푸터)가 처음 보일 때 한 번 쓴다.
카드 하나하나, 표 행, 목록 항목, 모달, 앱 화면 전환에는 쓰지 않는다(화면·상태 전환은 즉시).
첫 화면(히어로)의 글자는 떠오르지 않고 제자리에서 페이드만 한다(`--mp-duration-fade` 0.6s).

## 생김새
**값**
- 시작: `opacity: 0; transform: translateY(14px)`.
- 끝: `opacity: 1; transform: none`.
- 두 속성 모두 `--mp-duration-reveal` 0.9s `ease`.
- 이동 거리 14px 고정. 방향은 아래 → 위 하나.

**트리거**
- `IntersectionObserver`, `rootMargin: '0px 0px -12% 0px'` — 섹션 윗부분이 화면 아래 12% 선을 넘을 때.
- 들어오면 `.is-in`을 붙이고 즉시 `unobserve`. 스크롤을 올려도 다시 숨기지 않는다.
- 처음 로드 때 이미 화면 안에 있는 섹션도 같은 방식으로 한 번 나타난다.
- 섹션끼리 지연을 두지 않는다(각자 들어올 때 나타남). 섹션 안 요소를 순차로 띄우지 않는다.

**안전장치**
- JS가 없거나 `IntersectionObserver`가 없으면 처음부터 보인다. 이를 위해 숨김 스타일을 `html.js` 같은 JS 준비 클래스 아래에 두거나, 스크립트가 즉시 `.is-in`을 붙인다.
- 인쇄(`@media print`)에서는 모두 보인다.
- 앵커 링크(`#section`)로 바로 이동하면 대상 섹션은 즉시 보여야 한다. `hashchange`·로드 시 해당 섹션에 `.is-in`을 먼저 붙인다.

**접근성**
- `opacity: 0`인 동안에도 스크린리더는 내용을 읽는다(숨김이 아니라 시각 효과). `visibility: hidden`·`display: none`을 쓰지 않는다.
- 키보드 포커스가 아직 나타나지 않은 섹션 안으로 들어가면 `:focus-within`에서 즉시 보이게 한다.
- `prefers-reduced-motion: reduce`이면 처음부터 보인다.

**성능**
- `transform`·`opacity`만. 섹션 수만큼 관찰자 하나를 공유한다.

## 상태
| 상태 | 표현 |
|---|---|
| 들어오기 전 | 투명, 14px 아래 |
| 들어옴 (`.is-in`) | 0.9s에 걸쳐 제자리, 불투명 — 다시 숨지 않음 |
| 안에 포커스 | 즉시 보임 |
| JS 없음·관찰자 없음·인쇄 | 처음부터 보임 |
| 움직임 줄이기 | 처음부터 보임, 전환 없음 |

## 동작
- JS는 `.is-in`만 붙인다. 스크롤 위치에 따라 되감거나 진행률로 움직이지 않는다(스크롤 연동 애니메이션 금지).
- 데모의 `.mp-reveal-loop`는 갤러리에서 효과가 보이게 하려는 반복용이다. 실제 화면에는 넣지 않는다.

## 데모
```html demo
<div class="mp-reveal-row">
  <div class="mp-reveal-block is-before"></div>
  <div class="mp-reveal-block mp-reveal-loop"></div>
  <div class="mp-reveal-block"></div>
</div>
```

## 코드
```css
.mp-reveal {
  opacity: 0; transform: translateY(14px);
  transition: opacity var(--mp-duration-reveal) ease, transform var(--mp-duration-reveal) ease;
}
.mp-reveal.is-in, .mp-reveal:focus-within { opacity: 1; transform: none; }
@media print { .mp-reveal { opacity: 1; transform: none; } }

/* 데모 */
.mp-reveal-row { display: flex; gap: 1.2em; align-items: flex-start; padding-top: 14px; }
.mp-reveal-block { width: 5em; height: 5em; border: var(--mp-border) solid var(--mp-line); }
.mp-reveal-block.is-before { opacity: var(--mp-opacity-fine); transform: translateY(14px); border-style: dashed; }
.mp-reveal-loop { animation: mp-reveal-loop 4s ease infinite; }
@keyframes mp-reveal-loop {
  0%, 10% { opacity: 0; transform: translateY(14px); }
  32%, 100% { opacity: 1; transform: none; }
}
@media (prefers-reduced-motion: reduce) {
  .mp-reveal { opacity: 1; transform: none; transition: none; }
  .mp-reveal-loop { animation: none; }
}
```

```js
(function () {
const targets = document.querySelectorAll('.mp-reveal');
if (!targets.length) return;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const io = !reduce && 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -12% 0px' })
  : null;
targets.forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')));
// 앵커로 바로 온 섹션은 즉시 보이게
const hashTarget = location.hash && document.getElementById(location.hash.slice(1));
if (hashTarget) hashTarget.closest('.mp-reveal')?.classList.add('is-in');
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 섹션 단위로 한 번, 14px·0.9s·ease. JS 없음·인쇄·줄이기 설정·포커스에서 보이게. 스크린리더가 읽을 수 있게 opacity로만 숨긴다.
- 하지 말 것: 옆에서 미끄러져 들어오기, 확대·회전·흐림, 카드·행마다 순차 지연, 스크롤을 올리면 다시 숨기기, 스크롤 진행률 연동, `visibility: hidden`으로 숨기기, 앱 화면 전환에 사용.
