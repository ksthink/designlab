---
id: grid-thumbnail
name: 모눈 썸네일
nameEn: Grid Thumbnail
category: foundations
summary: 옅은 면 위 1px 모눈. 가운데에 정수 배율 픽셀 아이콘이나 대체 글리프 한 글자를 둔다.
aliases: [모눈, 썸네일, 격자 배경, 그리드 배경, 미리보기 이미지, 플레이스홀더, 대표 이미지, 커버, thumbnail, grid background, placeholder, graph paper, cover image]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .thumb · app.html .hero-thumb
pillars: [pixel-art, minimalism]
tokens: [--mp-grid-bg, --mp-grid-line, --mp-grid-cell-card, --mp-grid-cell-detail, --mp-glyph, --mp-pixel-card, --mp-pixel-detail, --mp-opacity-pixel, --mp-ink]
effects: []
related: [pixel-icon, card, image, dark-images, rail]
---

## 용도
카드·상세 화면의 그림 자리에 쓴다. 사진이나 일러스트 대신 모눈과 1비트 아이콘으로 "화면은 격자"라는 느낌을 준다.
아이콘이 없거나 불러오지 못하면 이름 첫 글자를 `--mp-glyph` 색으로 크게 둔다.
실제 사진·스크린샷이 꼭 필요한 곳(작업 사례, 앱 화면)은 `image`를 쓰고, 그때도 틀과 비율은 이 문서를 따른다.

## 생김새
**틀**
- 면 `background-color: var(--mp-grid-bg)`.
- 격자선 1px `--mp-grid-line`, 가로·세로 두 겹의 `linear-gradient`로 그린다. 격자선을 그리는 이 용도가 **유일하게 허용된 그라데이션**이다.
- 칸 크기: 카드 `--mp-grid-cell-card` 12px, 상세 `--mp-grid-cell-detail` 16px.
- 비율: 카드 `aspect-ratio: 4 / 3`, 상세 `16 / 9`.
- 테두리·그림자·모서리 둥글림 없음. 카드 안에 들어가면 카드의 1px 테두리가 경계다.
- 카드 안 위치: 카드 맨 위, 카드 padding 안쪽에 꽉 차게. 아래 제목과 간격 `1.2em`.

**가운데 내용**
- 아이콘: `pixel-icon` 규칙. 카드 `--mp-pixel-card` 120px(3×), 상세 `--mp-pixel-detail` 200px(5×). 투명도 `--mp-opacity-pixel`.
- 대체 글리프: 이름 첫 글자(한글이면 첫 음절), `--mp-glyph`. 카드 `clamp(2.9rem, 8.4vw, 4.1rem)`, 상세 `clamp(4rem, 16vw, 8rem)`(metaphr.dev 원값).
- 한 썸네일에 내용은 하나. 아이콘과 글리프를 함께 두지 않는다.

**반응형**
- 너비는 부모에 맞추고 비율로 높이를 정한다. 아이콘 크기는 고정(정수 배율)이라 좁은 카드에서도 흐리게 줄이지 않는다.
- 카드 폭이 아이콘 120px + 여백보다 좁아지면(약 160px 미만) 2×(80px)로 내린다.

**접근성**
- 장식이면 틀에 `aria-hidden="true"`, 안의 `img`는 `alt=""`. 카드 제목이 이미 이름을 말한다.
- 썸네일만 있고 제목이 없는 자리(갤러리)는 `role="img"`와 `aria-label="앱 이름"`.
- 대체 글리프는 읽히지 않게 `aria-hidden`.

## 상태
| 상태 | 표현 |
|---|---|
| 아이콘 있음 | 40×40 PNG를 정수 배율로, `--mp-opacity-pixel` |
| 아이콘 없음·불러오기 실패 | 첫 글자 글리프 (`img.onerror`에서 교체) |
| 불러오는 중 | 모눈만 (스켈레톤·스피너 없음) |
| 부모 카드 호버 | 썸네일 변화 없음 (카드 선만 진해진다) |
| 다크 테마 | 변수로 자동. 아이콘은 mask + `--mp-ink` (`dark-images`) |

## 데모
```html demo
<div class="mp-grid-thumbnail-row">
  <div class="mp-grid-thumbnail" aria-hidden="true">리</div>
  <div class="mp-grid-thumbnail" aria-hidden="true"><span class="mp-grid-thumbnail-icon" style="--src: url(/v1/icons/rhythm.png)"></span></div>
  <div class="mp-grid-thumbnail mp-grid-thumbnail-detail" aria-hidden="true"></div>
</div>
```

## 코드
```css
.mp-grid-thumbnail-row { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.8em; align-items: start; width: 26rem; max-width: 100%; }
.mp-grid-thumbnail {
  aspect-ratio: 4 / 3;
  display: flex; align-items: center; justify-content: center;
  font-size: clamp(2.9rem, 8.4vw, 4.1rem);
  color: var(--mp-glyph);
  background-color: var(--mp-grid-bg);
  background-image:
    linear-gradient(var(--mp-grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: var(--mp-grid-cell-card) var(--mp-grid-cell-card);
  overflow: hidden;
}
.mp-grid-thumbnail-detail { aspect-ratio: 16 / 9; background-size: var(--mp-grid-cell-detail) var(--mp-grid-cell-detail); }
.mp-grid-thumbnail-icon {
  width: 40px; height: 40px;  /* 좁은 틀: 1×, 2×는 80px. 카드: --mp-pixel-card, 상세: --mp-pixel-detail */
  background: var(--mp-ink); opacity: var(--mp-opacity-pixel);
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
```

```js
// 아이콘을 불러오지 못하면 첫 글자로 바꾼다
document.querySelectorAll('.mp-grid-thumbnail img').forEach((img) => {
  img.addEventListener('error', () => img.replaceWith(document.createTextNode(img.dataset.glyph || '')));
});
```

## 앱
- SwiftUI: `Canvas { ctx, size in … }`에서 칸 간격마다 `Path` 1px 선(`1 / displayScale`)을 `ink.opacity(0.07)`로, 배경 `ink.opacity(0.035)`. 틀은 `.aspectRatio(4/3, contentMode: .fit)`.
- Compose: `Modifier.drawBehind { drawRect(gridBg); for (x in …) drawLine(gridLine, …, strokeWidth = 1f) }`, `Modifier.aspectRatio(4f / 3f)`.
- 칸 크기 12pt/dp(목록), 16pt/dp(상세). 아이콘 확대는 `.interpolation(.none)` / `FilterQuality.None`.
- 앱 목록 행처럼 작은 자리는 1:1 정사각 틀에 1×(40pt) 아이콘.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 격자선은 1px, 칸 12px·16px 두 가지. 아이콘은 정수 배율로 가운데. 불러오기 실패를 첫 글자로 대체. 장식이면 스크린리더에서 숨긴다.
- 하지 말 것: 사진·그라데이션·패턴 배경, 진한 격자선, 둥근 썸네일, 아이콘을 틀에 맞춰 늘리기, 로딩 스피너, 썸네일에 호버 확대.
