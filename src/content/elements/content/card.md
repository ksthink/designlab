---
id: card
name: 카드
nameEn: Card
category: content
summary: 모눈 썸네일·제목·옅은 설명·배지를 1px 선 사각형에 담은 목록 단위. 호버하면 선이 진해지고 3px 떠오른다.
aliases: [카드, card, 앱 카드, 목록 카드, 썸네일 카드, 타일, tile, 항목 카드, 프로젝트 카드]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .card
pillars: [minimalism, pixel-art]
tokens: [--mp-border, --mp-line, --mp-line-strong, --mp-size-subheading, --mp-tracking-subheading, --mp-size-body, --mp-leading-card, --mp-opacity-secondary, --mp-grid-bg, --mp-grid-line, --mp-grid-cell-card, --mp-glyph, --mp-pixel-card, --mp-opacity-pixel, --mp-ink, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-muted]
effects: [float, reveal]
related: [rail, badge, grid-thumbnail, pixel-icon, page-list]
---

## 용도
같은 종류의 항목(앱, 글, 도구, 요소)을 나란히 보여 주고 상세 화면으로 들어가게 할 때 쓴다. 카드 전체가 링크 하나다.
정보가 한 줄이면 `list`, 여러 속성을 열로 비교하면 `table`을 쓴다.
카드 안에 버튼·링크를 여러 개 넣지 않는다. 행동이 필요하면 상세 화면(`page-read`)에서 한다.
한 화면에 카드 모양을 한 종류만 쓴다(크기·구성을 섞지 않는다).

## 생김새
**구조** (위에서 아래로)
1. 썸네일 `thumb` — 모눈 판, 가운데 픽셀 아이콘 또는 첫 글자
2. 제목 `h3` — 항목 이름
3. 설명 `p` — 한두 문장, 남는 높이를 차지해 배지 줄을 바닥에 맞춘다
4. 메타 줄 `meta` — 플랫폼·상태 `badge`

**수치** (metaphr.dev 원값)
- 틀: `display: flex; flex-direction: column`, `border: var(--mp-border) solid var(--mp-line)`, 배경 투명, radius 0
- 안쪽 여백 `clamp(1.2rem, 3vw, 1.7rem)`
- 썸네일: `aspect-ratio: 4 / 3`, 배경 `--mp-grid-bg` + 1px 격자선 `--mp-grid-line`, 칸 `--mp-grid-cell-card`(12px), 아래 여백 `clamp(0.9rem, 2vw, 1.2rem)`
- 아이콘: 40×40 1비트를 3배 `--mp-pixel-card`(120px), `opacity: var(--mp-opacity-pixel)`, mask로 `--mp-ink`를 칠한다
- 아이콘이 없으면 이름 첫 글자, `clamp(2.9rem, 8.4vw, 4.1rem)`, 자간 .05em, 색 `--mp-glyph`
- 제목: `--mp-size-subheading`, `--mp-tracking-subheading`, 굵기 400, 아래 `0.55em`
- 설명: `--mp-size-body`, 행간 `--mp-leading-card`(1.85), `opacity: var(--mp-opacity-secondary)`, 아래 `1.2em`, `flex: 1`
- 메타: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, 간격 `0.5em`
- 배지: 1px `--mp-line`, 안쪽 `0.25em 0.6em`, 준비 중은 dashed

**반응형**
- 레일 안: 카드 층 폭 `clamp(288px, 84vw, 384px)`, 700px 이상에서 `360px` 고정
- 격자 배치: `grid-template-columns: repeat(auto-fill, minmax(288px, 1fr))`, 간격 `clamp(0.9rem, 2.2vw, 1.5rem)`
- 한 줄에 카드가 4개를 넘지 않게 부모 폭은 `--mp-width-list`(1180px)
- 설명은 줄 수를 자르지 않는다. 너무 길면 문구를 줄인다
- 390px: 레일 안 카드 층 `84vw`(약 328px), 격자는 1열. 썸네일 글자는 clamp 하한 2.9rem.
- 700px: 레일 카드 층 `360px` 고정. 격자는 2열(`minmax(288px, 1fr)`).
- 860px: 호버 가능 기기에서 레일 이동 버튼이 붙는다. 카드 자체 변화 없음.
- 1180px: 부모 폭 상한 `--mp-width-list`, 격자 최대 3열(288px + 간격 기준). 그 이상 넓어져도 열을 늘리지 않는다.

**접근성**
- 카드 전체를 `<a>` 하나로 감싼다. 안에 다른 링크·버튼을 넣지 않는다(중첩 인터랙티브 금지)
- 썸네일은 `aria-hidden="true"`(장식), 이름은 `h3` 글자로 읽힌다
- 목록이면 부모에 `role="list"`, 카드 층에 `role="listitem"`, 또는 `<ul>/<li>`
- 키보드: Tab으로 카드마다 한 번 멈춘다. 포커스 링 `outline: 1px solid var(--mp-ink); outline-offset: 3px`
- 설명·메타 모두 .7이라 읽을 수 있지만, 가격·출시 여부 같은 필수 정보는 메타 배지에만 두지 않는다
- 링크 이름: `<a>`의 접근 가능한 이름은 안쪽 글자 전체(제목 + 설명 + 배지)가 된다. 너무 길면 `aria-labelledby="<제목 id>"`로 제목만 이름으로, 설명은 `aria-describedby`로 잇는다.
- `준비 중` 카드도 링크면 이름에 상태가 들어가게 배지 글자를 남긴다(`aria-hidden` 금지).

**조합 규칙**
- 한 화면의 orange(`--mp-accent`)는 하나 — 카드 목록 안에 둔다면 카드 하나의 `■` 마크 하나까지. 카드 테두리·배경을 칠하지 않는다.
- 카드 사이 간격은 레일·격자 모두 `clamp(0.9rem, 2.2vw, 1.5rem)`. 위 `section-head`와 `clamp(1.5rem, 4vh, 2.5rem)`.
- 카드 안에 카드·레일·버튼 줄을 넣지 않는다(중첩 1단계). 배지 줄은 하나.
- 같은 목록에서 아이콘 카드와 글자 카드를 섞어도 되지만 썸네일 비율(4 / 3)은 같게.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line`, 위치 0 |
| 호버 | 테두리 `--mp-line-strong`, `translateY(-3px)`, 0.3s ease |
| 포커스(키보드) | 호버와 같은 모양 + 1px 잉크 포커스 링(3px 떨어짐) |
| 누름 | 호버 모양 유지. 추가 이동·그림자 없음 |
| 준비 중 | 모양 그대로, 메타 줄에 dashed `준비 중` 배지. 링크는 유지(상세에서 노트로 안내) |
| 비활성(링크 없음) | `<div>`로 바꾸고 호버 반응 없음, 제목·설명 `opacity: var(--mp-opacity-muted)` |
| 아이콘 불러오기 실패 | 첫 글자로 대체 |

## 동작
- 카드를 감싼 층 `card-float`에 `float`: 진폭 2.5–5.5px, 주기 3.4–5.8s, ease-in-out, 카드마다 위상 다르게. 호버 중에는 `animation-play-state: paused`.
- 카드 자신은 호버 반응(테두리·3px 이동)만 맡는다. 두 transform이 겹치지 않도록 층을 나눈다.
- 스크롤 진입 시 부모 섹션에 `reveal`(opacity + 14px, 0.9s).
- `prefers-reduced-motion: reduce`: float 정지, transition 없음, 호버 시 이동 없이 테두리만 바뀐다.

## 데모
```html demo
<div class="mp-card-row">
  <a class="mp-card" href="#">
    <span class="mp-card-thumb" aria-hidden="true"><span class="mp-card-pixel" style="--src:url(/v1/icons/rhythm.png)"></span></span>
    <span class="mp-card-title">리듬</span>
    <span class="mp-card-meta"><span class="mp-card-badge">web</span></span>
  </a>
  <a class="mp-card is-hover" href="#">
    <span class="mp-card-thumb" aria-hidden="true"><span class="mp-card-pixel" style="--src:url(/v1/icons/pantry.png)"></span></span>
    <span class="mp-card-title">팬트리</span>
    <span class="mp-card-meta"><span class="mp-card-badge">ios</span></span>
  </a>
</div>
```

## 코드
```css
.mp-card-row { display: grid; grid-template-columns: repeat(2, minmax(0, 180px)); justify-content: center; gap: clamp(0.9rem, 2.2vw, 1.5rem); padding-top: 3px; }
.mp-card-row .mp-card { padding: 1em; }
.mp-card-row .mp-card-pixel { width: 80px; height: 80px; }   /* 좁은 견본용 2× — 실제 카드는 3× --mp-pixel-card */
.mp-card {
  display: flex; flex-direction: column;
  padding: clamp(1.2rem, 3vw, 1.7rem);
  border: var(--mp-border) solid var(--mp-line); border-radius: 0;
  background: transparent; color: inherit; text-decoration: none;
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.mp-card:hover, .mp-card:focus-visible, .mp-card.is-hover { border-color: var(--mp-line-strong); transform: translateY(-3px); }
.mp-card:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-card-thumb {
  aspect-ratio: 4 / 3; display: flex; align-items: center; justify-content: center;
  margin-bottom: clamp(0.9rem, 2vw, 1.2rem);
  font-size: var(--mp-size-title); letter-spacing: 0.05em; color: var(--mp-glyph);
  background-color: var(--mp-grid-bg);
  background-image: linear-gradient(var(--mp-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: var(--mp-grid-cell-card) var(--mp-grid-cell-card);
}
.mp-card-pixel {
  width: var(--mp-pixel-card); height: var(--mp-pixel-card);
  background: var(--mp-ink); opacity: var(--mp-opacity-pixel);
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
.mp-card-title { display: block; margin: 0 0 0.55em; font-weight: 400; font-size: var(--mp-size-subheading); letter-spacing: var(--mp-tracking-subheading); }
.mp-card-desc { flex: 1; margin: 0 0 1.2em; font-size: var(--mp-size-body); line-height: var(--mp-leading-card); opacity: var(--mp-opacity-secondary); }
.mp-card-meta { display: flex; flex-wrap: wrap; gap: 0.5em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-card-badge { border: var(--mp-border) solid var(--mp-line); padding: 0.25em 0.6em; }
.mp-card-badge--soon { border-style: dashed; }
.mp-card--disabled .mp-card-title, .mp-card--disabled .mp-card-desc { opacity: var(--mp-opacity-muted); }
@media (prefers-reduced-motion: reduce) {
  .mp-card { transition: none; }
  .mp-card:hover, .mp-card:focus-visible { transform: none; }
}
```
실제 카드에는 제목 아래 `<p class="mp-card-desc">`를 넣는다(데모는 글자를 줄이려고 뺐다). 데모는 기본·호버 두 장을 180px 폭으로 줄인 견본이라 여백 `1em`, 아이콘 2×(80px)를 쓴다 — 실제 카드는 위 수치와 3×(`--mp-pixel-card`). 레일 안에서는 카드를 `float` 층으로 한 번 감싼다(`rail` 문서).

## 앱
- SwiftUI: `VStack(alignment: .leading, spacing: 0)` + `.padding(20)` + `.overlay(Rectangle().stroke(line, lineWidth: 1))`. `RoundedRectangle`, `.shadow`, `.background(.regularMaterial)` 없음. 썸네일 아이콘은 `Image(...).interpolation(.none).resizable().frame(width: 120, height: 120)`, `.renderingMode(.template)` + `.foregroundStyle(ink)`.
- Compose: `Column(Modifier.border(1.dp, line, RectangleShape).clickable { }.padding(20.dp))`. Material `Card`를 쓰면 `shape = RectangleShape`, `elevation = CardDefaults.cardElevation(0.dp)`, `colors` 배경 투명. 아이콘은 `FilterQuality.None`.
- 터치 기기: 호버가 없으므로 누르는 동안만 테두리를 `line-strong`으로 바꾼다. 떠오르는 3px 이동·float는 생략한다. 리플 효과(Material ripple)는 끄고 `indication = null`.
- 접근성: 카드 전체를 한 요소로 묶는다(`.accessibilityElement(children: .combine)`, `Modifier.semantics(mergeDescendants = true)`), 역할은 버튼/링크.
- 격자 열 수: 폰 1열(가로 폭이 넓은 기기 2열), 태블릿 2–3열.
```swift
struct MPCard: View {
  let title: String; let icon: String
  var body: some View {
    VStack(alignment: .leading, spacing: 0) {
      ZStack { GridBackground(cell: 12); Image(icon).renderingMode(.template).interpolation(.none).resizable().frame(width: 120, height: 120).opacity(0.72) }
        .aspectRatio(4/3, contentMode: .fit).padding(.bottom, 16)
      Text(title).font(.custom("Mulmaru", size: 24)).tracking(0.8)
    }
    .padding(20).overlay(Rectangle().stroke(Color("Line"), lineWidth: 1))
    .accessibilityElement(children: .combine).accessibilityAddTraits(.isLink)
  }
}
```
```kotlin
Column(Modifier.border(1.dp, line, RectangleShape)
  .clickable(interactionSource = source, indication = null) { open() }
  .semantics(mergeDescendants = true) {}
  .padding(20.dp)) { /* thumb(4f/3f) · Text(title, fontFamily = Mulmaru, fontWeight = FontWeight.Normal) */ }
```
- OS 예외: iOS 컨텍스트 메뉴 미리보기(길게 누르기)의 둥근 모서리·그림자는 OS가 그린다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 카드 하나에 링크 하나.
- 해야 할 것: 설명은 두 줄 안팎, 같은 목록의 카드는 같은 구성.
- 해야 할 것: 썸네일은 정수 배율 픽셀 아이콘, 없으면 첫 글자.
- 해야 할 것: 호버는 선이 진해지고 3px만 떠오른다. 라이트·다크 모두 변수로.
- 하지 말 것: 그림자로 띄우기, 둥근 모서리, 호버 시 확대(`scale`).
- 하지 말 것: 사진을 꽉 채운 썸네일, 카드마다 다른 배경색, orange 테두리·teal 배경 카드.
- 하지 말 것: 카드 안에 버튼 여러 개, 중첩 링크, 제목 굵게.
- 하지 말 것: 설명을 `-webkit-line-clamp`로 잘라 필수 정보를 숨기기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 그림자(shadow 4px 12px)로 띄움 | 테두리 `--mp-line-strong` + `translateY(-3px)` |
| 호버 `transform: scale(1.03)` | 크기 변화 없음, 3px 이동만 |
| 아이콘 `width: 100%`로 늘림 | `--mp-pixel-card` 120px(3×) 고정 |
| 카드 안 `<a>` 제목 + `<button>` 다운로드 | 카드 전체 `<a>` 하나, 행동은 상세 화면 |
| 메타 배지에만 가격·출시 여부 | 필수 정보는 설명(.7) 이상에 |
| float을 카드 자신에 걸어 호버 이동과 충돌 | float은 감싼 층, 호버는 카드 |
