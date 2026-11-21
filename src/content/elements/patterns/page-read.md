---
id: page-read
name: 읽기형 페이지
nameEn: Reading Page
category: patterns
summary: 폭 760px 한 줄기 화면. 뒤로가기, kicker, 제목, tagline, 모눈 대표 그림, 본문, 배지, 버튼, 노트 순서.
aliases: [읽기형 페이지, reading page, 상세 페이지, detail page, 글 페이지, 문서 페이지, 앱 상세, article, "760"]
platforms: [web]
status: extracted
source: metaphr.dev app.html .wrap, .back, .kicker, h1, .tagline, .hero-thumb, .body, .meta, .actions, .note
pillars: [minimalism, pixel-art]
tokens: [--mp-width-read, --mp-gutter, --mp-opacity-kicker, --mp-size-title, --mp-opacity-secondary, --mp-grid-bg, --mp-grid-line, --mp-grid-cell-detail, --mp-opacity-body, --mp-opacity-muted, --mp-opacity-meta, --mp-ink, --mp-border, --mp-line, --mp-line-button, --mp-glyph]
effects: [reveal]
related: [page-list, back-link, badge, button, image, grid-thumbnail, footer, table-of-contents]
---

## 용도
한 대상(앱 하나, 요소 하나, 글 하나)을 위에서 아래로 읽는 화면에 쓴다.
여러 대상을 훑는 화면은 `page-list`(1180px)를 쓴다.
표·코드가 많은 긴 문서도 같은 760px 틀에 두고, 넓은 표만 `table-wrap` 안에서 가로 스크롤한다.

## 생김새
**구조** (한 줄기, 이 순서)
1. `back-link` `< metaphr` — 목록으로
2. kicker — 분류 이름
3. `h1` — 대상 이름
4. tagline — 한 문장 요약
5. 대표 그림 — 모눈 판 + 40×40 아이콘 5× 또는 첫 글자
6. 본문 — 문단 여러 개
7. 배지 줄(`badge`) — 플랫폼, `준비 중`
8. 버튼 줄(`button`) — 웹 열기·App Store·Google Play 또는 `제작 문의하기`
9. 버튼이 하나도 없으면 노트 — 출시 전 안내
10. `footer`

**수치** (metaphr.dev app.html 원값)
- 틀: `max-width: var(--mp-width-read)`(760px), `margin: 0 auto`, 여백 `clamp(1.5rem, 5vw, 3rem) clamp(1.25rem, 5vw, 3rem) clamp(4rem, 12vh, 8rem)`
- 뒤로가기: `clamp(0.75rem, 2vw, 0.95rem)`, 자간 .08em, `opacity: var(--mp-opacity-meta)`, 아래 `clamp(3rem, 10vh, 6rem)`
- kicker: `--mp-size-kicker`, `--mp-tracking-kicker`(.14em), `opacity: var(--mp-opacity-kicker)`, 아래 `0.9em`
- h1: `--mp-size-title`, `--mp-tracking-title`(.04em), 행간 `--mp-leading-title`(1.35), 아래 `0.5em`, 굵기 400
- tagline: `clamp(0.95rem, 2.4vw, 1.15rem)`, 행간 1.9, `opacity: var(--mp-opacity-secondary)`, 아래 `clamp(2rem, 6vh, 3rem)`
- 대표 그림: `aspect-ratio: 16 / 9`, 모눈 `--mp-grid-bg` + `--mp-grid-line`, 칸 `--mp-grid-cell-detail`(16px), 아래 `clamp(2.5rem, 7vh, 4rem)`. 아이콘 `--mp-pixel-detail`(200px), 대체 글자 `clamp(4rem, 16vw, 8rem)` 색 `--mp-glyph`
- 본문 문단: `--mp-size-body`, 행간 `--mp-leading-body`(2.1), 자간 `--mp-tracking-body`, `opacity: var(--mp-opacity-body)`, 문단 사이 `1.6em`
- 배지 줄: 위 `clamp(2.5rem, 7vh, 4rem)`, 아래 `clamp(2rem, 6vh, 3rem)`, 글자 `clamp(0.7rem, 1.8vw, 0.78rem)`, 배지 여백 `0.3em 0.7em`
- 버튼 줄: `display: flex; flex-wrap: wrap; gap: 0.8em`
- 노트: 위 `clamp(2rem, 6vh, 3rem)`, `clamp(0.78rem, 2vw, 0.88rem)`, 행간 1.9, `opacity: var(--mp-opacity-secondary)`

**반응형**
| 폭 | 동작 |
|---|---|
| 390px | 좌우 여백 `clamp(1.25rem, 5vw, 3rem)` 하한 20px → 본문 폭 350px. 대표 그림 350×197px, 아이콘 200px 유지(들어간다). 버튼 두 개 넘으면 줄바꿈 |
| 480px | h1 `6vw` ≈ 28.8px(하한 1.8rem), 뒤로가기 아래 여백 `10vh` |
| 700px | 버튼 세 개가 한 줄. 본문 행 길이 30–35자 |
| 860px 이상 | 틀 760px에 도달, 좌우는 배경만 넓어진다 |
| 1180px 이상 | 변화 없음 — 읽기 폭은 넓히지 않는다. 사이드 목차를 붙이지 않는다 |
- 모든 값이 clamp — 미디어 쿼리 없음
- 한국어 본문은 `word-break: keep-all`, 긴 URL은 `overflow-wrap: anywhere`
- 넓은 표·코드는 틀을 넘기지 말고 `table-wrap`(가로 스크롤) · `pre`(`pre-wrap` 접기)

**접근성**
- `main` 안에 `article` 하나. h1은 대상 이름 하나뿐, 본문 소제목은 h2부터
- 대표 그림은 장식이므로 `aria-hidden="true"`(이름이 h1에 이미 있다)
- 뒤로가기 링크 글자 `< metaphr` — 기호만 두지 않고 목적지 이름을 같이
- 외부 스토어 링크는 `rel="noopener"`. 새 창을 열면 글자로 알린다
- `document.title` = `이름 — metaphr`. 없는 대상이면 `찾을 수 없는 페이지 — metaphr`
- 필수 정보(본문·버튼 라벨)는 .7 이상. 노트(.5)에는 안내만
- 랜드마크: 상단 `header`(뒤로가기·테마 전환) → `main#main > article` → `footer`. 첫 요소로 건너뛰기 링크
- Tab 순서 = 읽는 순서: 뒤로가기 → 본문 안 링크 → 버튼 줄 → 푸터
- 배지 줄은 목록이다: `<ul aria-label="플랫폼">` 또는 글자 그대로 읽혀도 뜻이 통하게
- 대상 없음·실패 화면도 h1을 둔다(스크린리더가 상태를 제목으로 듣는다)

**움직임 줄이기**
- 읽기형에는 상시 모션이 없다. `reveal`을 썼다면 끄고, 버튼 반전 트랜지션도 즉시

**조합 규칙**
- 한 페이지에 대상 하나. 다른 대상 카드 목록(`rail`)을 본문 아래 붙이지 않는다
- 버튼 줄은 1–3개, 모두 기본 `button`. 강조 orange가 필요하면 가장 중요한 버튼 옆 ■ 하나뿐
- 버튼과 노트는 둘 중 하나만(버튼이 있으면 노트 없음)
- 긴 문서면 h2 아래 `table-of-contents`를 본문 앞에 접힌 상태로(`accordion`) 둘 수 있다
- 대표 그림은 하나. 스크린샷이 필요하면 본문 안 `image`로

## 상태
| 상태 | 표현 |
|---|---|
| 정상 | 위 순서 전체 |
| 출시 전(버튼 없음) | 배지 줄에 dashed `준비 중`, 버튼 대신 노트 "아직 출시 전입니다. 소식은 … 에서 전해 드립니다." |
| 주문 제작 | 스토어 버튼 대신 `제작 문의하기` 버튼 하나(mailto, 제목 `[제작 문의] 이름`) |
| 대상 없음 | 뒤로가기 + h1 "없는 페이지입니다" + tagline "주소를 다시 확인해 주세요." |
| 불러오기 실패 | 뒤로가기 + h1 "불러오지 못했습니다" + tagline "잠시 후 다시 시도해 주세요." |
| 아이콘 실패 | 대표 그림을 첫 글자(`glyph`)로 되돌린다 |

## 동작
- 페이지 자체에는 상시 모션이 없다. 필요하면 본문 블록에 `reveal`만.
- 버튼 호버는 `button` 문서(잉크/배경 반전).
- `prefers-reduced-motion: reduce`: reveal 없이 바로 보임.

## 데모
```html demo
<article class="mp-page-read">
  <span class="mp-page-read-back">&lt;</span>
  <i class="mp-page-read-kicker"></i>
  <b class="mp-page-read-title"></b>
  <i class="mp-page-read-tagline"></i>
  <div class="mp-page-read-thumb" aria-hidden="true">R</div>
  <i class="mp-page-read-line"></i><i class="mp-page-read-line"></i><i class="mp-page-read-line mp-page-read-line--short"></i>
  <div class="mp-page-read-actions"><span></span><span></span></div>
</article>
```

## 코드
```css
.mp-page-read { max-width: var(--mp-width-read); margin: 0 auto; padding: 1.2em var(--mp-gutter); }
.mp-page-read i, .mp-page-read b { display: block; height: 0.5em; background: var(--mp-ink); }
.mp-page-read-back { display: block; margin-bottom: 1.6em; opacity: var(--mp-opacity-meta); }
.mp-page-read-kicker { width: 3em; margin-bottom: 0.8em; opacity: var(--mp-opacity-kicker); }
.mp-page-read b.mp-page-read-title { width: 6em; height: calc(var(--mp-size-title) * 0.5); margin-bottom: 0.8em; }
.mp-page-read-tagline { width: 12em; margin-bottom: 1.4em; opacity: var(--mp-opacity-secondary); }
.mp-page-read-thumb {
  aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; margin-bottom: 1.4em;
  font-size: var(--mp-size-title); color: var(--mp-glyph); background-color: var(--mp-grid-bg);
  background-image: linear-gradient(var(--mp-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: var(--mp-grid-cell-detail) var(--mp-grid-cell-detail);
}
.mp-page-read-line { margin-bottom: 0.9em; opacity: var(--mp-opacity-body); }
.mp-page-read-line--short { width: 55%; }
.mp-page-read-actions { display: flex; gap: 0.8em; margin-top: 1.4em; }
.mp-page-read-actions span { width: 5em; height: 2.2em; border: var(--mp-border) solid var(--mp-line-button); }
.mp-page-read-actions span + span { border-color: var(--mp-line); opacity: var(--mp-opacity-muted); }
```
데모는 글자 대신 막대로 뼈대만 보인다. 실제 값은 `생김새`의 수치를 따른다.

```js
// 대상 없음·아이콘 실패 처리 — <article class="mp-page-read" data-name="리듬"> 기준
(() => {
  const page = document.querySelector('.mp-page-read');
  if (!page) return;
  const name = page.dataset.name;
  if (!name) {
    document.title = '찾을 수 없는 페이지 — metaphr';
    const h1 = page.querySelector('h1');
    const tagline = page.querySelector('.mp-page-read-tagline');
    if (h1) h1.textContent = '없는 페이지입니다';
    if (tagline) tagline.textContent = '주소를 다시 확인해 주세요.';
    return;
  }
  const thumb = page.querySelector('.mp-page-read-thumb');
  const img = thumb && thumb.querySelector('img');
  if (img) img.addEventListener('error', () => { thumb.textContent = page.dataset.glyph || name.charAt(0); });
})();
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 위 순서 그대로, 한 줄기로 읽히게.
- 해야 할 것: 대표 그림은 정수 배율(5×), 실패하면 첫 글자.
- 해야 할 것: 행동이 없으면 노트로 사실을 말한다.
- 해야 할 것: 버튼 라벨은 목적지 이름(`App Store`, `웹에서 열기`).
- 하지 말 것: 760px을 넘는 본문 폭, 옆 사이드바.
- 하지 말 것: 제목 위 큰 배너 사진, 스크린샷 슬라이드쇼.
- 하지 말 것: 버튼 여러 개를 orange로, 버튼을 본문 위로 올리기.
- 하지 말 것: 목차를 본문보다 먼저 크게 펼치기.
- 하지 말 것: 비어 있는 배지 줄·버튼 줄을 남기기.
**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 넓은 화면이라 `max-width: 1180px` 본문 | `--mp-width-read` 760px |
| 대표 아이콘을 `width: 100%`로 늘림 | `--mp-pixel-detail` 200px(5×) 고정 |
| 버튼 없음을 빈 `div.actions`로 남김 | 노트 문단으로 사실을 말한다 |
| 뒤로가기 글자가 `<`만 | `< metaphr` — 목적지 이름 포함 |
| 대상 없음 화면에 h1 없이 문단만 | h1 "없는 페이지입니다" + tagline |
