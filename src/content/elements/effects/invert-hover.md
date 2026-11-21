---
id: invert-hover
name: 반전 호버
nameEn: Invert Hover
category: effects
summary: 가리키면 잉크와 배경이 뒤바뀐다. 배경 --mp-ink, 글자 --mp-bg, 0.25s ease. 다른 색으로 바뀌지 않는다.
aliases: [반전, 호버, 마우스 오버, 색 반전, 뒤집기, 인버트, 호버 효과, 선택 반전, hover, invert, hover effect, rollover, inverse video, 이펙트, 효과, effect]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev app.html .btn:hover · index.html .brand .ch.gx
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-duration-hover, --mp-opacity-link, --mp-opacity-muted, --mp-line-button, --mp-border]
effects: [reduced-motion]
related: [button, fx-fill, text-action, menu, focus-ring, press, dropdown-menu, list]
---

## 용도
누를 수 있는 것(버튼, 텍스트 버튼, 메뉴·드롭다운 항목, 목록 행, 칩)의 호버·포커스 표시에 쓴다. metaphr 상호작용의 기본값이다.
초기 흑백 화면의 "반전 비디오"에서 온 표현이라, 색을 더하지 않고 두 색의 자리만 바꾼다.
적용 강도 세 가지 중 요소에 맞는 하나만 고른다.

| 강도 | 효과 | 쓰는 곳 |
|---|---|---|
| 가벼움 | opacity → 1 | 글자 링크, 푸터 링크, 뒤로가기, 메타 링크 |
| 기본 | 잉크/배경 반전 (이 문서) | 버튼, 메뉴 항목, 목록 행, 칩 |
| 대표 | 8칸 계단 채움 반전 (`fx-fill`) | 화면의 대표 링크 1–2곳 |

## 생김새
- 기본: 배경 투명(또는 `--mp-bg`), 글자 `--mp-ink`, 테두리가 있으면 `--mp-line-button`.
- 호버·포커스: 배경 `--mp-ink`, 글자 `--mp-bg`, 테두리 `--mp-ink`.
- 요소 크기·위치·padding·글자 크기는 바뀌지 않는다(레이아웃 이동 없음).
- 반전 면은 요소의 padding 상자 전체. 글자만 감싸는 좁은 반전은 `fx-fill`의 영역이다.
- 안의 아이콘(mask 방식)은 `background: currentColor`로 두면 함께 뒤집힌다.
- 안의 옅은 글자(opacity .7 메타)는 반전 중에 1로 올린다. 뒤집힌 면 위 옅은 글자는 읽기 어렵다.
- 두 테마 모두 변수로 자동: 라이트는 slate 면·paper 글자, 다크는 paper 면·slate 글자.
- 선택된 상태의 **지속** 표시는 반전이 아니라 teal 면(`--mp-secondary` + `--mp-palette-slate` 글자)이다. 반전은 "지금 가리키는 것", teal은 "골라 둔 것".

**반응형·입력 방식**
- `@media (hover: hover)`에서만 `:hover` 반전. 터치 기기에서 `:hover`가 눌린 뒤 남는 문제를 막는다.
- 터치(`hover: none`)에서는 `:active`(누르는 동안) 반전.
- 키보드는 `:focus-visible`에 같은 반전 + `focus-ring`.

**접근성**
- 반전만으로 포커스를 표시하지 않고 포커스 링을 함께 둔다(반전 면이 주변과 붙어 경계가 흐려질 수 있다).
- 대비: 반전 후에도 ink/bg 10.9:1 그대로.
- 비활성(`disabled`, `aria-disabled="true"`)은 반전하지 않는다.

## 상태
| 상태 | 배경 | 글자 | 테두리 |
|---|---|---|---|
| 기본 | 투명 | `--mp-ink` | `--mp-line-button` |
| 호버 (hover 기기) | `--mp-ink` | `--mp-bg` | `--mp-ink` |
| 키보드 포커스 | `--mp-ink` | `--mp-bg` | `--mp-ink` + 링 |
| 누름 | 반전 유지 | | + `press` 1px |
| 선택됨(지속) | `--mp-secondary` | `--mp-palette-slate` | 없음 |
| 선택됨 + 호버 | 반전이 우선 | | |
| 비활성 | 투명, opacity `--mp-opacity-muted` | `--mp-ink` | `--mp-line-button` |

## 동작
- `transition: background-color var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, border-color var(--mp-duration-hover) ease`.
- 메뉴·목록처럼 포인터가 여러 항목을 빠르게 지나가는 곳은 transition 없이 즉시 반전해도 된다(잔상 방지).
- `prefers-reduced-motion: reduce`이면 transition 없이 즉시 반전(`reduced-motion`).

## 데모
```html demo
<div class="mp-invert-hover">
  <span class="mp-invert-hover-item">가</span>
  <span class="mp-invert-hover-item is-hover">가</span>
  <span class="mp-invert-hover-item is-selected">가</span>
  <span class="mp-invert-hover-item is-disabled">가</span>
</div>
```

## 코드
```css
.mp-invert-hover { display: flex; gap: 0.8em; }
.mp-invert-hover-item {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.75em 1.5em; line-height: 1;
  border: var(--mp-border) solid var(--mp-line-button);
  background: transparent; color: var(--mp-ink);
  font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small);
  cursor: pointer;
  transition: background-color var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease, border-color var(--mp-duration-hover) ease;
}
@media (hover: hover) {
  .mp-invert-hover-item:hover { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
}
@media (hover: none) {
  .mp-invert-hover-item:active { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
}
.mp-invert-hover-item:focus-visible, .mp-invert-hover-item.is-hover { background: var(--mp-ink); color: var(--mp-bg); border-color: var(--mp-ink); }
.mp-invert-hover-item.is-selected, .mp-invert-hover-item[aria-selected="true"] { background: var(--mp-secondary); color: var(--mp-palette-slate); border-color: var(--mp-secondary); }
.mp-invert-hover-item.is-disabled, .mp-invert-hover-item:disabled, .mp-invert-hover-item[aria-disabled="true"] {
  opacity: var(--mp-opacity-muted); cursor: not-allowed; background: transparent; color: var(--mp-ink); border-color: var(--mp-line-button);
}
@media (prefers-reduced-motion: reduce) { .mp-invert-hover-item { transition: none; } }
```

## 앱
- 터치에는 호버가 없으므로 **누르는 동안 반전**한다. SwiftUI `ButtonStyle`: `configuration.label.foregroundStyle(pressed ? bg : ink).background(pressed ? ink : .clear)`.
- Compose: `val pressed by interactionSource.collectIsPressedAsState()`로 배경·글자 교체, `indication = null`로 리플을 끈다.
- iPadOS 포인터·Android 마우스: `.onHover` / `Modifier.hoverable`로 같은 반전. iPad 포인터 기본 효과(`.hoverEffect(.lift)`)는 끈다.
- 선택 지속 표시는 teal 면. OS 예외: 시스템 목록의 스와이프 액션·컨텍스트 메뉴 강조는 OS 모양.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 잉크/배경 두 색만 바꾼다. 포커스에도 같은 반전 + 링. hover 기기에서만 `:hover`. 반전 중 옅은 글자는 1로. 선택 지속은 teal 면.
- 하지 말 것: teal·orange로 바뀌는 호버, 커지거나 그림자가 생기는 호버, Material 리플, 밑줄만 생기는 버튼 호버, 비활성 요소 반전, 반전 면 위에 옅은 글자 남기기.
