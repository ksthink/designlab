---
id: stepper
name: 스테퍼
nameEn: Stepper
category: inputs
summary: 빼기·숫자·더하기 세 칸이 1px 선으로 붙은 수량 조절기. 버튼은 호버하면 잉크와 배경이 반전된다.
aliases: [스테퍼, 수량 조절, 플러스 마이너스, 증감 버튼, 개수, 인원 선택, 수량 선택, stepper, quantity, number input, increment, decrement, plus minus, counter]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-line-button, --mp-border, --mp-font, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-muted, --mp-duration-hover]
effects: [invert-hover, press, reduced-motion]
related: [slider, button, text-field, labels-numbers, form-validation]
---

## 용도
작은 정수를 한 칸씩 올리고 내릴 때 쓴다: 인원 1–10, 반복 횟수, 세트 수, 장바구니 수량.
- 범위가 넓거나(0–1000) 대략이면 `slider`, 정확한 큰 숫자는 숫자 `text-field`(`inputmode="numeric"`).
- 한 번 누를 때 바뀌는 양이 1이 아니면(5분 단위) 단위를 숫자 옆에 적는다.

## 생김새
- 한 줄 세 칸: `[ - ][ 3 ][ + ]`
  - 바깥 테두리 `var(--mp-border) solid var(--mp-line-button)`, `border-radius: 0`
  - 가운데 칸 좌우에 1px `--mp-line-button` 구분선(칸 사이 선도 1px, 겹쳐 2px이 되지 않게)
- 버튼 칸
  - `2.4em × 2.4em` 정사각형, 글자 ASCII `-` `+`(Mulmaru에 `−` 없음), 가운데 정렬
  - 배경 투명, 글자 `--mp-ink`, `--mp-size-small`
- 숫자 칸
  - 최소 폭 `3em`, 가운데 정렬, `font-variant-numeric: tabular-nums`
  - 기본은 읽기 전용 `<output>`. 직접 입력을 허용하면 `<input inputmode="numeric">`로 바꾸고 테두리 없이 칸을 채운다
- 단위: 스테퍼 오른쪽 바깥 `명`, `회` — `--mp-size-small`, `opacity: var(--mp-opacity-secondary)`, 간격 `0.6em`
- 라벨: 위 또는 같은 줄 왼쪽(`settings` 행), `--mp-size-small`, `opacity: var(--mp-opacity-secondary)`
- 범위 안내(선택): 아래 `1–10`, `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 세 칸 1px `--mp-line-button` |
| 버튼 호버·포커스 | 배경 `--mp-ink`, 글자 `--mp-bg` (`--mp-duration-hover` ease) |
| 버튼 포커스 링 | `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 버튼 누름 | `translateY(1px)` |
| 최솟값(`-` 끝) | `-` 버튼 `disabled`, `opacity: var(--mp-opacity-muted)`, 반전 없음 |
| 최댓값(`+` 끝) | `+` 버튼 `disabled`, 같은 표현 |
| 전체 비활성 | 그룹 `opacity: var(--mp-opacity-muted)`, 두 버튼 `disabled` |
| 입력 값 범위 밖 | 가까운 끝값으로 되돌리고 `form-validation` 문구 `1–10 사이로 입력해 주세요.` |

## 동작
### 모션
- 반전: `invert-hover`(배경·글자 `--mp-duration-hover` ease). 누름: `press`(1px, 즉시).
- 숫자는 굴러가거나 튀지 않고 즉시 바뀐다.
- 길게 누르면 400ms 뒤부터 100ms마다 반복한다(가속 없음). 끝값에 닿으면 멈춘다.
- `prefers-reduced-motion: reduce`이면 전환 없음.

### 키보드·접근성
- 권장 구조: `role="group"` + `aria-label="인원"`, 버튼 두 개는 `aria-label="줄이기"`/`"늘리기"`, 숫자는 `<output aria-live="polite">`.
- 직접 입력형이면 전체를 `role="spinbutton"` 하나로: `aria-valuenow` `aria-valuemin` `aria-valuemax` `aria-valuetext="3명"`, ↑↓ 1씩, PageUp/PageDown 5씩, Home/End 끝값. 이때 `-` `+` 버튼은 `tabindex="-1"`(포인터 전용).
- 끝값 버튼은 `disabled`로 두되, 포커스가 그 버튼에 있었다면 숫자 칸(또는 반대 버튼)으로 옮긴다.
- 버튼 글자 `-` `+`는 읽기 애매하므로 반드시 `aria-label`.

### 반응형
- 터치 기기: 버튼 칸을 44px(앱 48dp) 이상으로 키운다(`2.4em`이 44px보다 작으면 `min-width/min-height: 44px`).
- 폭 480px 이하에서도 한 줄 유지. 라벨이 길면 라벨만 위 줄로.
- 목록 행 안에서는 행 오른쪽 끝에 붙인다.

## 데모
```html demo
<div class="mp-stepper-demo">
  <div class="mp-stepper" role="group" aria-label="기본">
    <button type="button" aria-label="줄이기">-</button><output>3</output><button type="button" aria-label="늘리기">+</button>
  </div>
  <div class="mp-stepper" role="group" aria-label="호버">
    <button type="button" aria-label="줄이기">-</button><output>4</output><button type="button" class="is-hover" aria-label="늘리기">+</button>
  </div>
  <div class="mp-stepper" role="group" aria-label="최소">
    <button type="button" aria-label="줄이기" disabled>-</button><output>1</output><button type="button" aria-label="늘리기">+</button>
  </div>
</div>
```

## 코드
```css
.mp-stepper-demo { display: flex; flex-wrap: wrap; gap: 1.2em; align-items: center; }
.mp-stepper {
  display: inline-flex; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small); color: var(--mp-ink);
}
.mp-stepper button {
  width: 2.4em; height: 2.4em; min-width: 44px; min-height: 44px; padding: 0; border: 0; border-radius: 0;
  background: transparent; color: var(--mp-ink); font: inherit; cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-stepper output, .mp-stepper input {
  display: grid; place-items: center; min-width: 3em; margin: 0; padding: 0;
  border: 0; border-inline: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink); font: inherit; text-align: center; font-variant-numeric: tabular-nums;
}
.mp-stepper input { width: 3em; }
.mp-stepper button:hover, .mp-stepper button:focus-visible, .mp-stepper button.is-hover { background: var(--mp-ink); color: var(--mp-bg); }
.mp-stepper button:focus-visible, .mp-stepper input:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-stepper button:active:not(:disabled) { transform: translateY(1px); }
.mp-stepper button:disabled { opacity: var(--mp-opacity-muted); background: transparent; color: var(--mp-ink); cursor: not-allowed; }
.mp-stepper-unit { margin-left: 0.6em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-secondary); }
.mp-stepper-range { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
@media (prefers-reduced-motion: reduce) { .mp-stepper button { transition: none; } }
```
`.is-hover`는 데모에서 반전 상태를 고정해 보여 주는 클래스다.

```js
// 끝값에서 버튼을 끄고, 길게 누르면 400ms 뒤 100ms마다 반복 (범위는 data-min, data-max)
(() => {
  document.querySelectorAll('.mp-stepper').forEach((root) => {
    const [dec, inc] = root.querySelectorAll('button');
    const output = root.querySelector('output');
    if (!dec || !inc || !output) return;
    const min = Number(root.dataset.min ?? 1), max = Number(root.dataset.max ?? 10);
    let value = Number(output.value || output.textContent) || min;
    let delay, repeat;
    const set = (v) => {
      value = Math.min(max, Math.max(min, v));
      output.value = String(value);
      dec.disabled = value <= min; inc.disabled = value >= max;
      if (value <= min || value >= max) stop();
    };
    const stop = () => { clearTimeout(delay); clearInterval(repeat); };
    [[dec, -1], [inc, 1]].forEach(([btn, step]) => {
      btn.addEventListener('click', (e) => { if (e.detail === 0) set(value + step); }); // 키보드 Enter·Space
      btn.addEventListener('pointerdown', () => {
        set(value + step);
        delay = setTimeout(() => { repeat = setInterval(() => set(value + step), 100); }, 400);
      });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => btn.addEventListener(ev, stop));
    });
    set(value);
  });
})();
```

## 앱
- SwiftUI: 시스템 `Stepper`는 둥근 캡슐 모양(OS 예외, 시스템 `Form`에서만 허용). 브랜드 화면은 직접 그린다.
  - `HStack(spacing: 0)` + `Button("-")` · `Text("\(n)").monospacedDigit()` · `Button("+")`, 각 칸 `.frame(width: 44, height: 44)` + `Rectangle().stroke(lineButton)`.
  - 눌림 반전은 `ButtonStyle`에서 `configuration.isPressed ? ink : .clear`.
  - `.accessibilityElement(children: .ignore)` + `.accessibilityValue("\(n)명")` + `.accessibilityAdjustableAction`.
- Compose: `Row(Modifier.border(1.dp, lineButton, RectangleShape))` + `Box(Modifier.size(48.dp).clickable(enabled = n > min) { })`.
  - 눌림 반전은 `interactionSource.collectIsPressedAsState()`.
  - `Modifier.semantics { stateDescription = "${n}명"; setProgress { } }`.
- 터치 기기에는 호버가 없으므로 눌림 = 반전이다.

## 해야 할 것 / 하지 말 것
- 해야 할 것
  - 끝값에서 해당 버튼을 비활성으로 만든다.
  - 숫자 폭을 고정폭 숫자로 흔들리지 않게 한다.
  - 버튼에 `aria-label`, 단위를 숫자 옆에 적는다.
  - 터치 영역 44pt/48dp를 지킨다.
- 하지 말 것
  - 둥근 원형 +/- 버튼, 캡슐 모양 틀, 그림자.
  - 숫자가 굴러가거나 튀는 애니메이션.
  - 길게 누를 때 점점 빨라지는 가속.
  - `+`를 orange 면으로 강조하기, 0 이하·최대 초과를 허용하기.
