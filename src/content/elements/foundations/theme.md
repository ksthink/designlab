---
id: theme
name: 테마
nameEn: Theme
category: foundations
summary: 라이트(paper 바탕·slate 글자)와 다크(slate 바탕·paper 글자) 두 테마. OS 설정을 따르고 수동 지정도 된다.
aliases: [테마, 다크 모드, 라이트 모드, 야간 모드, 색 모드, 어두운 화면, 밝은 화면, theme, dark mode, light mode, color scheme, prefers-color-scheme, data-theme]
platforms: [web, ios, android]
status: extracted
source: design_lab 결정 로그 2 · /v1/tokens.css 테마 구조 · src/layouts/Base.astro 테마 전환
pillars: [retro-color]
tokens: [--mp-bg, --mp-ink, --mp-line, --mp-line-strong, --mp-line-button, --mp-grid-bg, --mp-grid-line, --mp-glyph, --mp-secondary, --mp-accent, --mp-palette-paper, --mp-palette-slate]
effects: []
related: [color, theme-switch, dark-images, logo]
---

## 용도
모든 화면은 라이트·다크 두 테마를 지원한다. 화면 코드는 역할 변수만 쓰므로 테마마다 따로 칠하지 않는다.
전환 버튼은 `theme-switch`, 테마별 이미지는 `dark-images`, 색 규칙은 `color`를 본다.

## 생김새
**값**
| 변수 | 라이트 | 다크 |
|---|---|---|
| `--mp-bg` | paper #F5F5F5 | slate #303841 |
| `--mp-ink` | slate #303841 | paper #F5F5F5 |
| `--mp-line` / `-strong` / `-button` | slate 알파 .16 / .45 / .4 | paper 알파 .16 / .45 / .4 |
| `--mp-grid-bg` / `--mp-grid-line` / `--mp-glyph` | slate .035 / .07 / .55 | paper .035 / .07 / .55 |
| `--mp-secondary` / `--mp-accent` | teal / orange | teal / orange (같은 값) |

**테마에 따라 달라지는 글자 규칙**
- 라이트: teal·orange 글자 금지.
- 다크: teal 글자 허용(4.64:1). orange 글자는 `--mp-size-title` 이상(최소 24px)만.
- 두 테마 모두 강조·보조 면 위 글자는 `--mp-palette-slate`.

**적용 순서** (`/v1/tokens.css`가 이미 이 구조다)
1. `:root { 라이트 }`
2. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { 다크 } }`
3. `:root[data-theme="dark"] { 다크 }`, `:root[data-theme="light"] { 라이트 }`

**문서 머리**
- `<meta name="color-scheme" content="light dark">` — 스크롤바·폼 기본 컨트롤이 테마를 따른다.
- `<meta name="theme-color" content="#F5F5F5" media="(prefers-color-scheme: light)">`, 다크 `#303841` 한 줄 더.
- 수동 지정 값은 `localStorage`에 저장하고, 첫 페인트 전에 `<head>` 인라인 스크립트로 `data-theme`을 붙인다(깜빡임 방지).
- 수동 지정 시 `color-scheme`도 함께 바꾼다: `:root[data-theme="dark"] { color-scheme: dark; }`.

**접근성**
- 기본값은 시스템 설정. 사용자가 고른 값은 기기에 기억한다.
- 두 테마 모두에서 포커스 링(`--mp-ink`)과 대비가 유지되는지 확인한다.
- `forced-colors: active`에서는 OS 색이 우선한다. 선택·강조 표시에 글자나 테두리를 함께 두어 면 색이 사라져도 뜻이 남게 한다.

## 상태
| 상태 | 조건 | 결과 |
|---|---|---|
| 시스템 | `data-theme` 없음 | OS 설정을 따름 |
| 라이트 고정 | `<html data-theme="light">` | OS가 다크여도 라이트 |
| 다크 고정 | `<html data-theme="dark">` | OS가 라이트여도 다크 |
| 인쇄 | `@media print` | 라이트 값 권장 |

## 데모
```html demo
<div class="mp-theme">
  <div class="mp-theme-panel mp-theme-light"><span class="mp-theme-mark">가</span><span class="mp-theme-line"></span></div>
  <div class="mp-theme-panel mp-theme-dark"><span class="mp-theme-mark">가</span><span class="mp-theme-line"></span></div>
</div>
```

## 코드
```css
/* 견본 전용: 두 테마를 한 화면에 나란히 보이려고 팔레트를 직접 참조한다. 제품 화면은 --mp-bg/--mp-ink만. */
.mp-theme { display: grid; grid-template-columns: 8em 8em; }
.mp-theme-panel { display: flex; flex-direction: column; gap: 0.8em; padding: 1.5em; font-size: var(--mp-size-heading); }
.mp-theme-light { background: var(--mp-palette-paper); color: var(--mp-palette-slate); }
.mp-theme-dark { background: var(--mp-palette-slate); color: var(--mp-palette-paper); }
.mp-theme-line { display: block; height: 1px; background: currentColor; opacity: 0.16; }

/* 실제 페이지 */
:root { color-scheme: light; }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { color-scheme: dark; } }
:root[data-theme="dark"] { color-scheme: dark; }
html, body { background: var(--mp-bg); color: var(--mp-ink); }
```

```js
// <head> 안 인라인, 첫 페인트 전: 저장된 수동 테마를 붙인다 (이미 지정돼 있으면 그대로)
try {
  const root = document.documentElement;
  const t = localStorage.getItem('mp-theme');
  if (!root.hasAttribute('data-theme') && (t === 'light' || t === 'dark')) root.setAttribute('data-theme', t);
} catch (e) {}
```

## 앱
- iOS: Asset Catalog 색마다 Any/Dark 두 값. 설정 값(system/light/dark)을 `@AppStorage`로 저장하고 루트에 `.preferredColorScheme(nil | .light | .dark)`.
- Android: `values/colors.xml`·`values-night/colors.xml` 또는 Compose `if (dark) DarkColors else LightColors`. 수동 값은 `AppCompatDelegate.setDefaultNightMode()`.
- 상태 바·내비게이션 바 색도 bg에 맞춘다(`enableEdgeToEdge`, `SystemBarStyle.auto(paper, slate)`).
- OLED 순수 검정(`#000000`)으로 바꾸지 않는다. 다크 배경은 slate.
- OS 예외: 시스템 시트·알림창은 OS 테마 색 그대로.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 역할 변수만 쓴다. 시스템 설정을 기본값으로, 수동 값은 기억한다. `color-scheme`·`theme-color`를 테마별로. 두 테마에서 대비 확인.
- 하지 말 것: 테마별 하드코딩 색, `filter: invert()`로 다크 만들기, 다크에서 작은 orange 글자, 순백·순흑, 테마 전환 애니메이션, 첫 페인트 뒤에 테마를 바꿔 깜빡이게 하기.
