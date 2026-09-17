---
id: banner
name: 배너
nameEn: Banner
category: feedback
summary: 화면 위쪽 본문 폭에 붙는 1px 선 알림 줄. 사용자가 알아야 할 지속 상태를 ■ 표시와 한 문장으로 알린다.
aliases: [배너, 알림 줄, 공지, 경고 줄, 안내 바, 오프라인 알림, 점검 공지, banner, alert, notice, callout, warning bar, info bar, announcement]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, retro-color]
tokens: [--mp-ink, --mp-accent, --mp-line-strong, --mp-border, --mp-font, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-body, --mp-opacity-link, --mp-opacity-meta, --mp-duration-hover, --mp-width-list]
effects: [reduced-motion]
related: [toast, error-state, form-validation, text-action, header]
---

## 용도
**사라지지 않는 상태**를 알린다: 오프라인, 저장 실패가 이어짐, 점검 예정, 권한 꺼짐, 구독 만료 임박.
- 행동 직후 짧은 결과는 `toast`, 화면 내용 자체를 못 불러왔으면 `error-state`, 폼 입력 오류는 `form-validation`.
- 화면에 배너는 하나만 둔다. 여러 상태가 겹치면 더 급한 것 하나.
- 광고·홍보 띠로 쓰지 않는다.

## 생김새
- 위치: `header` 바로 아래, 본문 폭(`--mp-width-list` 안) 첫 요소. 페이지 맨 위 가로 전체 띠로 깔지 않는다
- 상자: `var(--mp-border) solid var(--mp-line-strong)`, `border-radius: 0`, 배경 투명, 여백 `0.9em 1.1em`
- 한 줄 구성(왼→오): `■` 표시 · 문구 · 행동 · 닫기
  - `■`: 주의 배너 = `--mp-accent`(화면의 강조 하나), 안내 배너 = `--mp-ink`. 크기 `0.8em`, 문구와 간격 `0.7em`
  - 문구: `--mp-size-small`, `--mp-tracking-small`, 행간 1.7, 글자 `--mp-ink`, `opacity: var(--mp-opacity-body)`. **orange 글자 금지**
  - 문구는 원인 + 해결 한 문장씩: `위치 권한이 꺼져 있습니다. 설정에서 허용해 주세요.`
  - 행동: 텍스트 버튼 하나 `[ 설정 ]`, `opacity: var(--mp-opacity-link)`, 호버·포커스 1
  - 닫기 `×`: 사용자가 무시해도 되는 안내만. 주의 배너는 해결될 때까지 닫기 없음. `opacity: var(--mp-opacity-meta)`
- 날짜·시간이 있으면 문구 안에: `9월 20일 02:00–04:00 점검합니다.`(`labels-numbers`)

## 상태
| 상태 | 표시 | 닫기 | 역할 |
|---|---|---|---|
| 안내 | 잉크 `■` | 있음 | `role="status"` |
| 주의 | 강조 `■`(`--mp-accent`) | 없음 | `role="alert"` |
| 행동 버튼 호버·포커스 | opacity 1 + 1px 잉크 윤곽선 offset 3px | — | — |
| 처리 중(다시 시도 누름) | 행동 자리에 `loading` 세 칸 | — | — |
| 해결됨 | 배너를 즉시 지우고 필요하면 `toast` `연결됐습니다` | — | — |
| 닫힘 | 즉시 제거, 같은 안내는 같은 세션에서 다시 띄우지 않음 | — | — |

- 화면에 이미 다른 강조(오류 ■, 기록 중 점)가 있으면 주의 배너의 ■도 잉크로 낮춘다.

## 동작
### 모션
- 나타남·사라짐은 즉시. 높이가 펼쳐지는 애니메이션·미끄러짐 없음. 행동 버튼 opacity 전환만 `--mp-duration-hover` ease.
- `prefers-reduced-motion: reduce`이면 전환 없음.
- 배너가 나타나도 아래 내용이 튀지 않게, 상태를 미리 아는 경우(서버 렌더링) 처음부터 렌더링한다.

### 키보드·접근성
- 주의: `role="alert"`(즉시 읽음). 안내: `role="status"`. 페이지를 열 때부터 있는 배너에는 live 역할을 빼도 된다(`<aside aria-label="공지">`).
- ■은 `aria-hidden="true"`. 뜻은 문구로.
- 포커스를 배너로 옮기지 않는다. 탭 순서: 헤더 다음 배너의 행동 → 닫기 → 본문.
- 닫기는 `<button type="button" aria-label="공지 닫기">×</button>`. 닫으면 포커스를 본문 첫 제목으로.

### 반응형
- 폭 480px 이하: 문구가 한 줄을 넘으면 행동·닫기를 다음 줄 오른쪽으로 내린다(`flex-wrap: wrap`, 문구 `min-width: 12em`).
- 앱·좁은 화면에서도 좌우 여백은 본문과 같다.

## 데모
```html demo
<div class="mp-banner-demo">
  <div class="mp-banner"><span class="mp-banner-mark is-accent" aria-hidden="true">■</span><span class="mp-banner-text">오프라인</span><button class="mp-banner-action" type="button">[ 재시도 ]</button></div>
  <div class="mp-banner"><span class="mp-banner-mark" aria-hidden="true">■</span><span class="mp-banner-text">점검</span><button class="mp-banner-close" type="button" aria-label="닫기">×</button></div>
</div>
```

## 코드
```css
.mp-banner-demo { display: grid; gap: 0.8em; max-width: 26em; }
.mp-banner {
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.7em;
  padding: 0.9em 1.1em; border: var(--mp-border) solid var(--mp-line-strong); border-radius: 0;
  color: var(--mp-ink); font: 400 var(--mp-size-small) / 1.7 var(--mp-font); letter-spacing: var(--mp-tracking-small);
}
.mp-banner-mark { flex: none; font-size: 0.8em; color: var(--mp-ink); }
.mp-banner-mark.is-accent { color: var(--mp-accent); } /* 강조 — 화면당 하나 */
.mp-banner-text { flex: 1; min-width: 12em; opacity: var(--mp-opacity-body); }
.mp-banner-action, .mp-banner-close {
  padding: 0; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink); font: inherit; cursor: pointer;
  transition: opacity var(--mp-duration-hover) ease;
}
.mp-banner-action { opacity: var(--mp-opacity-link); }
.mp-banner-close { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-banner-action:hover, .mp-banner-action:focus-visible,
.mp-banner-close:hover, .mp-banner-close:focus-visible { opacity: 1; }
.mp-banner-action:focus-visible, .mp-banner-close:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { .mp-banner-action, .mp-banner-close { transition: none; } }
```

## 앱
- SwiftUI: 목록·스크롤 뷰 맨 위 `HStack(alignment: .firstTextBaseline, spacing: 10)` + `.padding(14)` + `.overlay(Rectangle().stroke(lineStrong, lineWidth: 1))`. 강조 ■은 `Rectangle().fill(accent).frame(width: 8, height: 8)`. 주의 배너가 뜰 때 `AccessibilityNotification.Announcement`.
- Compose: `Row(Modifier.border(1.dp, lineStrong, RectangleShape).padding(14.dp))`, `Modifier.semantics { liveRegion = LiveRegionMode.Assertive }`(주의) / `Polite`(안내). Material 3 색 채운 배너는 쓰지 않는다.
- 스크롤하면 배너도 함께 올라간다(상단 고정 안 함). 오프라인처럼 모든 화면에 걸친 상태만 앱 바 아래 고정 허용.
- OS 예외: 시스템 권한 대화상자·설정 이동은 OS 모양 그대로.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 원인과 해결을 한 문장씩. 행동 하나. 해결되면 바로 지운다. 주의는 `role="alert"`, 안내는 `role="status"`. 화면에 배너는 하나.
- 하지 말 것: 노랑·빨강·orange 배경 띠, orange 글자, 배너 여러 개 쌓기, 경고 삼각형·이모지, 주의 배너에 닫기 버튼, 펼쳐지는 애니메이션, 페이지 맨 위 가로 전체 홍보 띠.
