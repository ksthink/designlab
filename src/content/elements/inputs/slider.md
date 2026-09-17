---
id: slider
name: 슬라이더
nameEn: Slider
category: inputs
summary: 1px 선 위를 잉크 사각 손잡이가 움직이며 범위 안의 값을 고른다. 현재 값은 숫자와 단위로 옆에 둔다.
aliases: [슬라이더, 범위 선택, 음량 조절, 밝기 조절, 값 조절, 타이머 길이, range, slider, range input, volume, seek bar]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-line, --mp-line-strong, --mp-border, --mp-font, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-muted]
effects: []
related: [stepper, progress-bar, labels-numbers, text-field]
---

## 용도
대략의 값을 끌어서 고를 때 쓴다: 음량, 밝기, 집중 시간 5–60분, 지도 확대 단계.
- 정확한 숫자가 중요하면(금액, 나이) 숫자 `text-field`, 작은 정수를 한 칸씩이면 `stepper`.
- 진행 상태를 보여 주기만 하면 `progress-bar`(누를 수 없음).
- 범위의 양 끝(최소·최대)이 사용자에게 의미가 있을 때만 쓴다.

## 생김새
- 한 줄 구조: 라벨(왼쪽) · 트랙(가운데, 남은 폭 전부) · 현재 값(오른쪽)
- 트랙
  - 높이 1px, 색 `--mp-line-strong`, `border-radius: 0`
  - 누르는 영역은 높이 `0.9em`(손잡이 높이)로 투명하게 확보, 앱·터치는 44px
  - 채워진 구간을 따로 칠하지 않는다 — 선 하나 + 손잡이로 충분하다
- 손잡이
  - `0.9em × 0.9em` 정사각형, 채움 `--mp-ink`, 테두리·그림자 없음, radius 0
  - 트랙 선의 세로 가운데에 놓는다(`margin-top: calc(-0.45em + 0.5px)`, WebKit)
- 눈금(선택): `step`이 5개 이하 구간이면 트랙 아래 1px × 4px 눈금, `--mp-line`
- 현재 값
  - `--mp-size-small`, `--mp-tracking-small`, `font-variant-numeric: tabular-nums`, 최소 폭 `3em` 오른쪽 정렬(숫자가 바뀌어도 트랙 폭이 흔들리지 않게)
  - 단위를 붙인다: `25분`, `70%` (`labels-numbers`)
- 라벨: `--mp-size-small`, `opacity: var(--mp-opacity-secondary)`
- 최소·최대 표기(선택): 트랙 아래 양 끝 `5` `60`, `--mp-size-meta`, `opacity: var(--mp-opacity-meta)`

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line-strong` 선 + 잉크 사각 손잡이 |
| 호버 | 변화 없음(손잡이 커서 `grab`) |
| 끄는 중 | 커서 `grabbing`, 값 숫자 즉시 갱신 |
| 포커스 | 손잡이 `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 최솟값·최댓값 | 손잡이가 트랙 끝에 붙음, 다른 표시 없음 |
| 비활성 | 전체 `opacity: var(--mp-opacity-muted)`, `cursor: not-allowed` |

## 동작
### 모션
- 손잡이는 포인터를 그대로 따라간다. 놓았을 때 눈금으로 부드럽게 미끄러지지 않고 `step` 값에 즉시 붙는다.
- 값 숫자는 굴러가는 애니메이션 없이 바로 바뀐다. 모션이 없으므로 reduced-motion 처리도 필요 없다.

### 키보드·접근성
- 네이티브 `<input type="range">` + `<label>`을 쓴다. 역할은 `slider`로 자동 노출된다.
- 키보드(기본): ←↓ 한 `step` 감소, →↑ 증가, PageUp/PageDown 큰 단위, Home/End 최소·최대.
- 현재 값 글자를 스크린리더가 읽게 `aria-valuetext="25분"`을 `input` 이벤트마다 갱신한다(숫자만 읽히면 단위를 잃는다).
- 옆의 값 표시는 `<output for>`로 연결한다.
- 값을 바꾸는 즉시 결과가 반영되는 곳(음량)은 `input`, 무거운 작업(검색·계산)은 `change`(손을 뗄 때)에서 실행한다.

### 반응형
- 폭 480px 이하: 라벨을 트랙 위 줄로 올리고, 트랙 + 값만 한 줄에 둔다.
- 터치 기기: 누르는 영역 높이 44px 이상(투명 여백), 손잡이 모양은 그대로 `0.9em`.
- 트랙이 `8em`보다 짧아지면 `stepper`로 바꾼다.

## 데모
```html demo
<div class="mp-slider-demo">
  <label class="mp-slider"><span>집중</span><input type="range" min="5" max="60" step="5" value="25"><output>25분</output></label>
  <label class="mp-slider"><span>포커스</span><input class="is-focus" type="range" min="0" max="100" value="70"><output>70%</output></label>
  <label class="mp-slider"><span>비활성</span><input type="range" min="0" max="100" value="40" disabled><output>40%</output></label>
</div>
```

## 코드
```css
.mp-slider-demo { display: grid; gap: 1.2em; max-width: 24em; }
.mp-slider { display: flex; align-items: center; gap: 1em; max-width: 24em; font: 400 var(--mp-size-small) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-small); }
.mp-slider > span { min-width: 3.5em; opacity: var(--mp-opacity-secondary); }
.mp-slider output { min-width: 3em; text-align: right; font-variant-numeric: tabular-nums; }
.mp-slider-range { display: flex; justify-content: space-between; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-slider input { flex: 1; min-width: 0; height: 0.9em; margin: 0; appearance: none; -webkit-appearance: none; background: transparent; cursor: grab; }
.mp-slider input:active { cursor: grabbing; }
.mp-slider input::-webkit-slider-runnable-track { height: 1px; background: var(--mp-line-strong); border-radius: 0; }
.mp-slider input::-webkit-slider-thumb { -webkit-appearance: none; width: 0.9em; height: 0.9em; margin-top: calc(-0.45em + 0.5px); border: 0; border-radius: 0; background: var(--mp-ink); }
.mp-slider input::-moz-range-track { height: 1px; background: var(--mp-line-strong); border-radius: 0; }
.mp-slider input::-moz-range-thumb { width: 0.9em; height: 0.9em; border: 0; border-radius: 0; background: var(--mp-ink); }
.mp-slider input:focus-visible { outline: none; }
.mp-slider input:focus-visible::-webkit-slider-thumb, .mp-slider input.is-focus::-webkit-slider-thumb { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-slider input:focus-visible::-moz-range-thumb, .mp-slider input.is-focus::-moz-range-thumb { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-slider:has(input:disabled) { opacity: var(--mp-opacity-muted); }
.mp-slider input:disabled { cursor: not-allowed; }
.mp-slider-ticks { height: 4px; border-inline: var(--mp-border) solid var(--mp-line); }
@media (max-width: 480px) { .mp-slider { flex-wrap: wrap; } .mp-slider > span { flex-basis: 100%; } }
```
`.is-focus`는 데모에서 포커스를 고정해 보여 주는 클래스다.

```js
// 값 글자와 스크린리더 문구를 함께 갱신한다 (단위는 data-unit, 예: data-unit="분")
(() => {
  document.querySelectorAll('.mp-slider').forEach((root) => {
    const input = root.querySelector('input[type="range"]');
    const output = root.querySelector('output');
    if (!input || !output) return;
    const unit = input.dataset.unit || '';
    const update = () => {
      const text = `${input.value}${unit}`;
      output.value = text;
      input.setAttribute('aria-valuetext', text);
    };
    input.addEventListener('input', update);
    if (unit) update();
  });
})();
```

## 앱
- SwiftUI: 시스템 `Slider`는 OS 컨트롤(예외). 시스템을 쓰면 `.tint(ink)`만 준다. 브랜드 화면은 직접 그린다.
  - `GeometryReader` 안에 `Rectangle().frame(height: 1)`(lineStrong) + `Rectangle().fill(ink).frame(width: 14, height: 14)`를 `DragGesture`로 이동, `step`에 맞춰 반올림.
  - `.accessibilityValue("25분")` + `.accessibilityAdjustableAction { }`로 VoiceOver 위아래 쓸기를 지원한다.
- Compose: Material3 `Slider`의 `thumb`·`track` 슬롯을 바꾼다.
  - `thumb = { Box(Modifier.size(14.dp).background(ink)) }`, `track = { Box(Modifier.fillMaxWidth().height(1.dp).background(lineStrong)) }`, `steps`로 단계.
  - `Modifier.semantics { stateDescription = "25분" }`.
- 끄는 동안 햅틱은 `step`을 넘을 때만 가볍게(선택).

## 해야 할 것 / 하지 말 것
- 해야 할 것
  - 현재 값을 숫자와 단위로 함께 보여 준다.
  - `step`으로 의미 있는 간격을 준다(분은 5, 퍼센트는 10).
  - 키보드 화살표로 조절되게 네이티브 range를 쓴다.
  - 값 숫자 폭을 고정해 트랙이 흔들리지 않게 한다.
- 하지 말 것
  - 둥근 손잡이, 굵은(2px 이상) 트랙, 채워진 구간을 teal·orange로 칠하기.
  - 손잡이 위 말풍선 값 표시, 끌 때 커지는 손잡이, 그림자.
  - 놓을 때 부드럽게 미끄러지는 스냅 애니메이션.
  - 정확한 값이 필요한 곳(금액)에 슬라이더만 주기.
