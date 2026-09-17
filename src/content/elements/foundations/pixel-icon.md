---
id: pixel-icon
name: 픽셀 아이콘
nameEn: Pixel Icon
category: foundations
summary: 40×40 1비트 PNG를 3배(120px)·5배(200px) 정수 배율로만 키운다. 다크에서는 mask로 잉크를 칠한다.
aliases: [픽셀 아이콘, 아이콘, 픽셀아트, 도트 그림, 1비트, 비트맵 아이콘, 일러스트, pixel icon, icon, sprite, 8bit, bitmap, pixel art]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev app.html .pixel · public/v1/icons/*.png
pillars: [pixel-art]
tokens: [--mp-pixel-card, --mp-pixel-detail, --mp-opacity-pixel, --mp-ink]
effects: []
related: [grid-thumbnail, icon-button, dark-images, app-icon, logo, tab-bar]
---

## 용도
앱·기능·분류를 나타내는 그림에 쓴다. 등록된 예시는 `/v1/icons/`(`/v1/logos.json`의 아이콘 목록)에 있다.
버튼·목록 안의 작은 기호는 아이콘보다 글자 기호(`>`, `■`, `+`, `<`)를 먼저 검토한다(`terminal-vocabulary`).
아이콘 라이브러리(벡터 아이콘 세트)로 대신하지 않는다. 새 아이콘은 40×40 격자에서 직접 그린다.

## 생김새
**원본 파일**
- 40×40px PNG, 1비트: 잉크 픽셀(불투명 한 색) + 투명. 중간 톤·안티에일리어싱·반투명 픽셀 없음.
- 선 굵기 1–2px 격자 단위, 대각선은 계단(1px씩). 바깥 여백 2–4px.
- 작은 자리용 20×20을 따로 그릴 수 있다(40을 반으로 줄이지 않고 다시 그린다).

**표시 크기** — 정수 배율만
| 배율 | 크기 | 자리 |
|---|---|---|
| 1× | 40px | 목록 행, 설정 항목 |
| 2× | 80px | 좁은 카드, 빈 상태 |
| 3× | `--mp-pixel-card` 120px | 카드 썸네일 |
| 5× | `--mp-pixel-detail` 200px | 상세 화면 |

**렌더링**
- `image-rendering: pixelated; image-rendering: crisp-edges;` 둘 다(브라우저마다 지원이 다르다).
- 투명도 `--mp-opacity-pixel` .72. 부모 호버에서 1로 올려도 된다.
- 색: 1비트 단색이므로 `mask` + `background: var(--mp-ink)`로 칠한다(공식 예외, 두 테마 공통). `--mp-ink` 외의 색으로 칠하지 않는다.
- `img`로 쓰면 라이트에서는 원본 잉크색 그대로지만 다크에서 보이지 않으므로, 두 테마를 지원하는 화면은 mask 방식을 기본으로 한다.
- 레이아웃이 흔들리지 않게 `width`·`height`를 늘 지정한다.

**반응형**
- 크기를 vw·%로 늘리지 않는다. 좁아지면 한 단계 낮은 정수 배율로 바꾼다(`@container` 또는 미디어 쿼리).
- 기기 픽셀 비율이 소수(1.5, 2.625)인 기기에서도 CSS px 기준 정수배면 된다.

**접근성**
- 장식(옆에 이름이 있음): `aria-hidden="true"`, `img`면 `alt=""`.
- 뜻을 혼자 전하는 아이콘(글자 없이 버튼 안): 버튼에 `aria-label`. 가능하면 글자를 함께 둔다.
- mask 방식 `span`은 스크린리더에 보이지 않으므로 뜻이 있으면 `role="img"` + `aria-label`.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 잉크 한 색, .72 |
| 부모 호버·포커스 | opacity 1 (선택) |
| 선택됨(탭 바 등) | opacity 1, 아래 teal 면 표시는 부모가 담당 |
| 비활성 | `--mp-opacity-muted` |
| 불러오기 실패 | 이름 첫 글자 글리프로 대체 (`grid-thumbnail`) |

## 데모
```html demo
<div class="mp-pixel-icon-row">
  <span class="mp-pixel-icon mp-pixel-icon-1x" style="--src: url(/v1/icons/inbox.png)" aria-hidden="true"></span>
  <span class="mp-pixel-icon mp-pixel-icon-2x" style="--src: url(/v1/icons/inbox.png)" aria-hidden="true"></span>
  <span class="mp-pixel-icon" style="--src: url(/v1/icons/inbox.png)" aria-hidden="true"></span>
  <span class="mp-pixel-icon mp-pixel-icon-off" style="--src: url(/v1/icons/inbox.png)" aria-hidden="true"></span>
</div>
```

## 코드
```css
.mp-pixel-icon-row { display: flex; align-items: flex-end; gap: 1.5em; }
.mp-pixel-icon {
  display: block; flex: none;
  width: var(--mp-pixel-card); height: var(--mp-pixel-card);   /* 3×. 상세: --mp-pixel-detail (5×) */
  background: var(--mp-ink);
  opacity: var(--mp-opacity-pixel);
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat;
  mask: var(--src) 0 0 / 100% 100% no-repeat;
  image-rendering: pixelated; image-rendering: crisp-edges;
}
.mp-pixel-icon-1x { width: 40px; height: 40px; }
.mp-pixel-icon-2x { width: 80px; height: 80px; }
.mp-pixel-icon-off { opacity: var(--mp-opacity-muted); }
a:hover .mp-pixel-icon, a:focus-visible .mp-pixel-icon { opacity: 1; }

/* img로 쓸 때 (라이트 전용 화면) */
img.mp-pixel-icon-img { width: var(--mp-pixel-card); height: var(--mp-pixel-card); image-rendering: pixelated; image-rendering: crisp-edges; opacity: var(--mp-opacity-pixel); }
```

## 앱
- iOS: PNG를 Asset Catalog에 넣고 Render As = Template, Scale = Single. `Image("inbox").renderingMode(.template).interpolation(.none).resizable().frame(width: 120, height: 120).foregroundStyle(ink).opacity(0.72)`.
- Android: `Image(painterResource(R.drawable.inbox), null, Modifier.size(120.dp), colorFilter = ColorFilter.tint(ink), alpha = 0.72f, filterQuality = FilterQuality.None)`. drawable은 `drawable-nodpi`에 둔다.
- 크기는 40의 정수배 pt/dp. SF Symbols·Material Icons로 대신하지 않는다.
- 스프라이트 애니메이션은 프레임마다 격자를 맞추고 타이머로 한 칸씩 넘긴다(보간 없음).
- OS 예외: 시스템 컨트롤(공유 버튼, 시스템 메뉴) 안 기호는 OS 아이콘 그대로.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 40×40 격자에서 그린다. 정수 배율, `pixelated`, 잉크 한 색, 크기 명시. 뜻이 있으면 라벨을 준다.
- 하지 말 것: 100px·150px·`width: 100%`, 벡터 일러스트, 이모지, teal·orange로 칠하기, 부드러운 보간, 2색 이상·중간 톤 픽셀, 아이콘에 그림자·외곽선.
