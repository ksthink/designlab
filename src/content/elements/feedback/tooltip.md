---
id: tooltip
name: 툴팁
nameEn: Tooltip
category: feedback
summary: 아이콘 버튼 등에 호버·포커스하면 붙어 나오는 반전 사각 말풍선. 꼬리 없이 짧은 명사 하나.
aliases: [툴팁, 도움말 풍선, 힌트, 설명 풍선, 마우스 오버 설명, 단축키 표시, tooltip, hint, title, hover label, keyboard shortcut hint]
platforms: [web]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-border, --mp-line-button, --mp-font, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-duration-hover]
effects: [invert-hover]
related: [icon-button, popover, focus-ring, labels-numbers]
---

## 용도
글자 없는 `icon-button`의 **이름**, 줄임 표기의 원래 뜻, 단축키를 보조로 알려 준다.
- 필수 정보·행동을 툴팁에만 두지 않는다 — 터치 기기와 스크린 리더 일부는 볼 수 없다.
- 내용이 한 줄을 넘거나, 링크·버튼이 들어가야 하면 `popover`를 쓴다.
- 글자 라벨이 이미 보이는 버튼에는 같은 말을 툴팁으로 반복하지 않는다.
- 앱(iOS/Android)에서는 쓰지 않는다. 앱 아이콘 버튼은 접근성 라벨과, 필요하면 글자 라벨을 함께 보인다.

## 생김새
- 반전 상자: 배경 `--mp-ink`, 글자 `--mp-bg`, `border-radius: 0`, 테두리·그림자·꼬리 삼각형 없음
- 글자 `--mp-size-meta`, `--mp-tracking-meta`, 행간 1.4, 한 줄(`white-space: nowrap`), 최대 폭 `20em`(넘치면 `popover` 검토)
- 여백 `0.35em 0.6em`
- 단축키가 있으면 이름 뒤 간격 `0.8em`에 `⌘K` 대신 `Ctrl K`처럼 글자로, `opacity: var(--mp-opacity-meta)`
- 위치: 대상 아래 가운데, 대상과 간격 `6px`. 아래 공간이 없으면 위, 좌우로 화면을 넘으면 화면 안쪽 `8px`에 맞춘다
- 겹침 순서: 거의 맨 위(모달 안에서도 보이게), 대상을 가리지 않는다
- 내용은 명사·명사구 하나: `다운로드`, `삭제`, `테마 바꾸기`. 마침표 없음

## 상태
| 상태 | 표현 | 시간 |
|---|---|---|
| 숨김 | `display: none` | — |
| 마우스 호버 | 표시 | 머문 뒤 500ms 지연, 표시는 즉시 |
| 다른 툴팁이 막 닫힌 직후 호버 | 지연 없이 표시 | 300ms 안에 옮겨 갈 때 |
| 키보드 포커스 | 즉시 표시 | 지연 0 |
| 포인터가 툴팁 위로 이동 | 유지(툴팁 위에 올려도 사라지지 않음) | — |
| 벗어남·포커스 잃음 | 숨김 | 100ms 유예 뒤 즉시 |
| `Esc` | 숨김(포커스는 대상에 그대로) | 즉시 |
| 대상 누름 | 숨김 | 즉시 |

## 동작
### 모션
- 나타남·사라짐은 즉시. 페이드·확대·미끄러짐 없음. 대상 버튼의 반전(`invert-hover`, `--mp-duration-hover`)만 움직인다.
- reduced-motion 분기가 필요 없도록 처음부터 전환을 두지 않는다.

### 키보드·접근성
- 툴팁 요소 `role="tooltip"` + 고유 `id`, 대상에 `aria-describedby="그 id"`.
- 아이콘만 있는 버튼은 툴팁과 별개로 `aria-label`로 이름을 준다. 툴팁 문구와 같아도 된다(툴팁은 시각 보조).
- 포커스는 대상에만. 툴팁은 포커스를 받지 않고 내부에 누를 것이 없다.
- `Esc`로 닫되 포커스를 옮기지 않는다(WCAG 1.4.13: 닫을 수 있음·호버 가능·유지).
- 브라우저 기본 `title` 속성은 쓰지 않는다(지연·모양 통제 불가, 키보드 불가).

### 반응형
- `(hover: none)` 기기에서는 툴팁을 띄우지 않는다. 대신 아이콘 옆 글자 라벨을 보이거나 길게 누르기 없이 이해되게 설계한다.
- 폭이 좁아 좌우가 잘리면 화면 안쪽으로 밀어 넣는다(가운데 정렬 포기).

## 데모
```html demo
<div class="mp-tooltip-demo">
  <span class="mp-tooltip"><button class="mp-tooltip-target" type="button" aria-label="열기" aria-describedby="mp-tooltip-a">&gt;_</button><span class="mp-tooltip-bubble" role="tooltip" id="mp-tooltip-a">열기</span></span>
  <span class="mp-tooltip"><button class="mp-tooltip-target is-active" type="button" aria-label="삭제" aria-describedby="mp-tooltip-b">×</button><span class="mp-tooltip-bubble is-open" role="tooltip" id="mp-tooltip-b">삭제<span class="mp-tooltip-key">Del</span></span></span>
</div>
```

## 코드
```css
.mp-tooltip-demo { display: flex; gap: 2.4em; padding-bottom: 2.8em; }
.mp-tooltip { position: relative; display: inline-block; }
.mp-tooltip-target {
  width: 2.4em; height: 2.4em; padding: 0; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0;
  background: transparent; color: var(--mp-ink); font: 400 var(--mp-size-meta) / 1 var(--mp-font); cursor: pointer;
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-tooltip-target:hover, .mp-tooltip-target:focus-visible, .mp-tooltip-target.is-active { background: var(--mp-ink); color: var(--mp-bg); }
.mp-tooltip-target:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-tooltip-bubble {
  position: absolute; top: calc(100% + 6px); left: 50%; transform: translateX(-50%); z-index: 60;
  display: none; max-width: 20em; white-space: nowrap; padding: 0.35em 0.6em; border-radius: 0;
  background: var(--mp-ink); color: var(--mp-bg);
  font: 400 var(--mp-size-meta) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-meta);
}
.mp-tooltip-bubble.is-open,
.mp-tooltip-target:focus-visible + .mp-tooltip-bubble { display: block; }
@media (hover: hover) { .mp-tooltip:hover .mp-tooltip-bubble { display: block; } }
.mp-tooltip-key { margin-left: 0.8em; opacity: var(--mp-opacity-meta); }
@media (prefers-reduced-motion: reduce) { .mp-tooltip-target { transition: none; } }
```
CSS만으로는 500ms 호버 지연과 `Esc` 닫기가 없다. 실제 화면에서는 아래 JS로 `.is-open`을 켜고 끈다.

```js
// 호버 500ms 뒤 표시, 포커스는 즉시, 벗어나면 100ms 뒤 숨김, Esc로 닫기
(() => {
  document.querySelectorAll('.mp-tooltip').forEach((wrap) => {
    const target = wrap.querySelector('.mp-tooltip-target');
    const bubble = wrap.querySelector('.mp-tooltip-bubble');
    if (!target || !bubble) return;
    let t;
    const open = () => bubble.classList.add('is-open');
    const close = () => { clearTimeout(t); bubble.classList.remove('is-open'); };
    target.addEventListener('pointerenter', () => { clearTimeout(t); t = setTimeout(open, 500); });
    wrap.addEventListener('pointerleave', () => { clearTimeout(t); t = setTimeout(close, 100); });
    target.addEventListener('focus', open);
    target.addEventListener('focusout', close);
    target.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  });
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 짧은 이름 하나. 키보드 포커스에서 즉시 보이게. `role="tooltip"` + `aria-describedby`. `Esc`로 닫기. 툴팁 위에 포인터를 올려도 유지. 터치 기기에서는 띄우지 않는다.
- 하지 말 것: 둥근 말풍선·꼬리 삼각형, 그림자, 페이드·확대 등장, 툴팁 안의 링크·버튼, 문장형 긴 설명, `title` 속성, 필수 정보를 툴팁에만 두기, 글자 라벨과 같은 말 반복, orange·teal 배경.
