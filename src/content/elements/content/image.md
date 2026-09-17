---
id: image
name: 이미지
nameEn: Image
category: content
summary: 그림은 1비트 픽셀 아트를 정수 배율로 모눈 위에 둔다. 사진은 필요할 때만 1px 선 틀에 비율을 지켜 넣는다.
aliases: [이미지, image, 그림, 사진, photo, 일러스트, illustration, 썸네일 이미지, figure, 캡션, 스크린샷, screenshot]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-pixel-detail, --mp-pixel-card, --mp-opacity-pixel, --mp-ink, --mp-grid-bg, --mp-grid-line, --mp-grid-cell-detail, --mp-grid-cell-card, --mp-glyph, --mp-border, --mp-line, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-size-title]
effects: []
related: [pixel-icon, grid-thumbnail, dark-images, avatar, card, skeleton]
---

## 용도
설명을 돕는 그림(픽셀 아트), 앱 화면 스크린샷, 꼭 필요한 사진을 본문·카드·상세에 넣을 때 쓴다.
장식만을 위한 이미지, 분위기용 배경 사진은 넣지 않는다. 그림이 없어도 이해되면 넣지 않는다.

## 생김새
**구조**
- `figure` > 판(`div`) > 이미지 + 선택적으로 `figcaption`.
- 종류 셋: ① 1비트 픽셀 아트(기본) ② 스크린샷 ③ 사진.

**수치 — 픽셀 아트**
- 원본 40×40 1비트 PNG(잉크 + 투명). 중간 톤·안티에일리어싱 없음.
- 정수 배율만: 카드 3× `--mp-pixel-card`(120px), 상세 5× `--mp-pixel-detail`(200px). 1×(40px)는 목록·아바타.
- `image-rendering: pixelated; image-rendering: crisp-edges;` 둘 다.
- `opacity: var(--mp-opacity-pixel)`.
- 두 테마 대응: mask + `background: var(--mp-ink)`(`dark-images`). `<img>`로 그대로 두면 다크에서 보이지 않는다.
- 판: 모눈 `--mp-grid-bg` + 1px `--mp-grid-line`. 칸은 카드 `--mp-grid-cell-card`(12px, 비율 4 / 3), 상세 `--mp-grid-cell-detail`(16px, 비율 16 / 9). 가운데 정렬.

**수치 — 스크린샷·사진**
- `display: block; width: 100%; height: auto;` 원본 비율 유지. `width`·`height` 속성을 넣어 레이아웃 흔들림을 막는다.
- 틀 1px `--mp-line`, radius 0, 필터·그림자·오버레이 없음.
- 강제 비율이 필요하면(카드 썸네일) `aspect-ratio` + `object-fit: cover`, 잘리는 쪽은 가운데.
- 기기 프레임 목업(둥근 폰 테두리)은 쓰지 않는다. 화면 캡처 그대로.

**캡션**
- 판 아래 `0.6em`, `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`. 한 줄, 명사구.

**반응형**
- 390px: 데모 같은 여러 판 격자는 1열. 상세 판의 5×(200px)는 그대로 두고, 판 폭이 200px 미만이 되는 좁은 자리(360px 미만)에서만 3×(120px)로 내린다. 소수 배율로 줄이지 않는다.
- 700px: 판은 부모 폭 100%, 2열 격자 허용.
- 860px: 읽기 화면에서 판은 `--mp-width-read` 안 100%.
- 1180px: 목록 화면 카드 썸네일은 3×(120px) 고정. 넓다고 5×로 키우지 않는다.
- 사진은 `srcset`/`sizes`로 폭별 파일, `loading="lazy"`, `decoding="async"`(첫 화면 이미지만 eager).

**접근성**
- 뜻이 있는 그림은 `alt`를 한 문장 미만 명사구로("리듬 앱 아이콘"). 장식이면 `alt=""`.
- mask로 그린 `span`은 `role="img"` + `aria-label`, 장식이면 `aria-hidden="true"`.
- 캡션이 alt와 같으면 alt를 비워 중복 낭독을 막는다.
- 이미지 안 글자에 정보를 담지 않는다. 필요하면 본문에 같은 내용.
- alt 규칙: ① 뜻이 있는 그림 → 명사구 ② 옆 글자와 같은 뜻 → `alt=""` ③ 스크린샷 → 무엇을 보여 주는지("설정 화면의 테마 행") ④ 글자가 든 이미지 → 그 글자를 그대로.
- `figure`의 `figcaption`은 보이는 설명이다. 캡션이 있으면 `figure`에 따로 `aria-label`을 주지 않는다.
- 이미지는 포커스를 받지 않는다. 확대 가능하면 `a`로 감싸고 `aria-label="원본 이미지 열기"`.

**조합 규칙**
- 판 위에 orange를 쓰려면 픽셀 아트 안 몇 칸(점 하나)만. 판 테두리·배경을 강조색으로 칠하지 않는다.
- 판과 캡션 `0.6em`, 판과 아래 본문 `1.6em`, 판 위 제목과 `1.2em`.
- 판 안에 이미지는 하나. 판 안에 배지·버튼을 얹지 않는다.

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 판 위 이미지 |
| 불러오는 중 | 빈 모눈 판(크기 확보). 반짝임 없음 |
| 불러오기 실패 | 판에 대체 글자(이름 첫 글자, `--mp-glyph`, `--mp-size-title`) |
| 확대 가능 | 커서 `zoom-in`, 누르면 새 화면에서 원본. 모달 확대 애니메이션 없음 |
- 움직임 없음. 불러오기 페이드·줌·패럴랙스를 넣지 않는다. reduced-motion에서도 같다.

## 데모
```html demo
<div class="mp-image-row">
  <figure class="mp-image"><div class="mp-image-board"><span class="mp-image-pixel" style="--src:url(/v1/icons/pantry.png)" role="img" aria-label="팬트리"></span></div><figcaption class="mp-image-caption">5×</figcaption></figure>
  <figure class="mp-image mp-image--card"><div class="mp-image-board"><span class="mp-image-pixel" style="--src:url(/v1/icons/mvp.png)" aria-hidden="true"></span></div><figcaption class="mp-image-caption">3×</figcaption></figure>
  <figure class="mp-image mp-image--card"><div class="mp-image-board" aria-hidden="true"><span class="mp-image-fallback">팬</span></div><figcaption class="mp-image-caption">실패</figcaption></figure>
</div>
```

## 코드
```css
.mp-image-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1em; align-items: start; }
.mp-image { margin: 0; }
.mp-image-board {
  aspect-ratio: 16 / 9; display: flex; align-items: center; justify-content: center; overflow: hidden;
  background-color: var(--mp-grid-bg);
  background-image: linear-gradient(var(--mp-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--mp-grid-line) 1px, transparent 1px);
  background-size: var(--mp-grid-cell-detail) var(--mp-grid-cell-detail);
}
.mp-image--card .mp-image-board { aspect-ratio: 4 / 3; background-size: var(--mp-grid-cell-card) var(--mp-grid-cell-card); }
.mp-image-pixel {
  flex: none; width: var(--mp-pixel-detail); height: var(--mp-pixel-detail);
  background: var(--mp-ink); opacity: var(--mp-opacity-pixel); image-rendering: pixelated;
  -webkit-mask: var(--src) 0 0 / 100% 100% no-repeat; mask: var(--src) 0 0 / 100% 100% no-repeat;
}
.mp-image--card .mp-image-pixel { width: var(--mp-pixel-card); height: var(--mp-pixel-card); }
.mp-image-fallback { font-size: var(--mp-size-title); color: var(--mp-glyph); }
.mp-image .photo { display: block; width: 100%; height: auto; border: var(--mp-border) solid var(--mp-line); }
.mp-image-caption { margin-top: 0.6em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
@media (max-width: 699px) { .mp-image-row { grid-template-columns: 1fr; } }
@media (max-width: 360px) { .mp-image-pixel { width: var(--mp-pixel-card); height: var(--mp-pixel-card); } }
```

## 앱
- SwiftUI: 픽셀 아트 `Image("pantry").renderingMode(.template).interpolation(.none).resizable().frame(width: 200, height: 200).foregroundStyle(ink).opacity(0.72)`. Asset은 1×(40px) 한 장, `Preserve Vector Data` 끔.
- 사진: `AsyncImage` + `.aspectRatio(contentMode: .fit)`, `.overlay(Rectangle().stroke(line, lineWidth: 1))`, `.clipShape` 둥글림 없음.
- Compose: `Image(painterResource(R.drawable.pantry), filterQuality = FilterQuality.None, colorFilter = ColorFilter.tint(ink))`, `Modifier.size(200.dp)`. 밀도별 리소스 대신 `drawable-nodpi` 원본 + 정수 dp 크기.
- 사진 뷰어·카메라·사진 선택기(PhotosPicker, Photo Picker)는 OS 화면 예외.
- 모눈 판은 `Canvas`로 16pt 간격 1px 선.
```swift
Image("pantry").renderingMode(.template).interpolation(.none).resizable()
  .frame(width: 200, height: 200).foregroundStyle(Color("Ink")).opacity(0.72)
  .accessibilityLabel("팬트리 아이콘")
```
```kotlin
Image(painterResource(R.drawable.pantry), contentDescription = "팬트리 아이콘",
  filterQuality = FilterQuality.None, colorFilter = ColorFilter.tint(Ink),
  modifier = Modifier.size(200.dp).alpha(0.72f))
```

## 해야 할 것 / 하지 말 것
- 해야 할 것: 정수 배율, `pixelated`, mask로 두 테마 대응.
- 해야 할 것: `width`·`height` 속성으로 자리 확보, 대체 텍스트.
- 해야 할 것: 실패 시 첫 글자 대체.
- 하지 말 것: 정수배가 아닌 확대(100px, 150px, `width: 100%` 픽셀 아트).
- 하지 말 것: 둥근 모서리, 그림자, 기기 목업 프레임.
- 하지 말 것: 사진 위 그라데이션 오버레이, 흐림 배경, 컬러 필터·듀오톤.
- 하지 말 것: 벡터 일러스트·3D·이모지로 픽셀 그림 대신하기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 픽셀 아트 `width: 100%` | 120px(3×)·200px(5×) 고정 |
| `image-rendering` 누락 | `pixelated` + `crisp-edges` |
| 어두운 PNG를 다크에 `<img>`로 | mask + `--mp-ink` |
| 스크린샷에 둥근 폰 목업·그림자 | 캡처 그대로 + 1px 선 |
| 장식 그림에 긴 alt | `alt=""` |
| 사진 위 그라데이션 글자 오버레이 | 글자는 판 밖 캡션·본문에 |
