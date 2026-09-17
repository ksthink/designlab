---
id: loading
name: 불러오는 중
nameEn: Loading
category: feedback
summary: 끝을 모르는 기다림을 짧은 문구와 ■ 세 칸이 차례로 켜지는 터미널 표시로 알린다. 회전 스피너는 쓰지 않는다.
aliases: [불러오는 중, 로딩, 로딩 표시, 스피너, 대기, 처리 중, 저장 중, 점 세 개, loading, spinner, loader, busy, please wait, activity indicator, throbber]
platforms: [web, ios, android]
status: proposed
pillars: [pixel-art, minimalism]
tokens: [--mp-ink, --mp-font, --mp-size-small, --mp-tracking-small, --mp-opacity-secondary, --mp-opacity-kicker, --mp-opacity-muted, --mp-duration-caret, --mp-line-button, --mp-border]
effects: [caret, reduced-motion]
related: [progress-bar, skeleton, status-dot, microcopy, button, terminal-vocabulary]
---

## 용도
**끝을 알 수 없는** 기다림(서버 응답, 계산, 로그인 확인)을 알린다.
- 진행률을 셀 수 있으면 `progress-bar`, 목록·카드 모양을 미리 알면 `skeleton`.
- 0.4초 안에 끝나는 작업에는 표시하지 않는다(번쩍임 방지): 요청 시작 후 400ms 지나도 끝나지 않을 때 보이기 시작한다.
- 한번 보이면 최소 600ms는 유지한다(켜졌다 바로 꺼지는 깜빡임 방지).

## 생김새
세 가지 크기로만 쓴다.
- **줄 안(inline)**: 문구 + `■■■`. 목록 끝 더 불러오기, 영역 안 대기
- **버튼 안**: 버튼 글자를 `저장하는 중`으로 바꾸고 뒤에 `■■■`, 버튼 폭은 원래 폭 유지(`min-width` 고정), `disabled`
- **화면 가운데**: 첫 화면 전체 대기. 가운데 정렬 inline 표시 하나. 화면을 덮는 반투명 막은 쓰지 않는다
구성 수치:
- 문구: `불러오는 중` / `저장하는 중` / `확인하는 중`(`… 중`), `--mp-size-small`, `--mp-tracking-small`, `opacity: var(--mp-opacity-secondary)`
- 칸: `■` 글자 세 개, `font-size: 0.8em`, 칸 간격 `0.2em`, 문구와 간격 `0.6em`
- 꺼진 칸 `opacity: var(--mp-opacity-kicker)`(.45), 켜진 칸 opacity 1
- 대안 표기: 글자 `...` 세 개를 같은 방식으로(코드·터미널 느낌이 강한 화면)
- 문구 없이 칸만 쓰는 곳(아주 좁은 칸)은 `aria-label` 필수

## 상태
| 상태 | 표현 | 시간 |
|---|---|---|
| 숨김 | 표시 없음 | 시작 후 400ms까지 |
| 대기 | 문구 + 칸이 한 칸씩 차례로 켜짐 | 한 칸 400ms, 한 바퀴 `--mp-duration-caret`(1.2s) |
| 오래 걸림 | 문구를 `조금 더 걸립니다`로 교체 | 10초 경과 |
| 실패 | `error-state` 또는 `banner`로 교체 | 즉시 |
| 완료 | 표시 제거, 내용으로 교체 | 최소 표시 600ms 뒤 |
| 버튼 안 | 버튼 `disabled`, `opacity: var(--mp-opacity-muted)` 적용하지 않음(글자는 읽혀야 함) | — |

## 동작
### 모션
- 각 칸 `animation: mp-loading-step var(--mp-duration-caret) steps(1, end) infinite`, 지연 0 / 0.4s / 0.8s. 한 칸이 1/3 주기 동안만 켜진다.
- 회전·확대·튀는 점·부드러운 페이드 금지. 칸은 켜짐/꺼짐 두 값만.
- `prefers-reduced-motion: reduce`이면 세 칸 모두 켜진 정지 상태 + 문구.

### 키보드·접근성
- 표시 요소에 `role="status"`(polite). 문구가 읽히게 하고 칸은 `aria-hidden="true"`.
- 대기 중인 영역에 `aria-busy="true"`, 끝나면 `false`.
- 버튼 안 로딩: `disabled` 대신 `aria-disabled="true"`를 쓰면 포커스가 버튼에 남는다(포커스를 잃지 않게 권장). 클릭 처리는 막는다.
- 포커스를 로딩 표시로 옮기지 않는다. 끝나면 새 내용의 첫 제목이나 원래 버튼에 포커스를 둔다.

### 반응형
- 화면 크기와 무관하게 같은 크기. 좁은 버튼에서 문구가 넘치면 문구를 지우고 칸만 남긴다(`aria-label="저장하는 중"`).

## 데모
```html demo
<div class="mp-loading-demo">
  <p class="mp-loading" role="status"><span class="mp-loading-text">로딩</span><span class="mp-loading-cells" aria-hidden="true"><span>■</span><span>■</span><span>■</span></span></p>
  <p class="mp-loading" role="status" aria-label="로딩"><span class="mp-loading-cells is-dots" aria-hidden="true"><span>.</span><span>.</span><span>.</span></span></p>
  <button class="mp-loading-button" type="button" aria-disabled="true"><span>저장</span><span class="mp-loading-cells" aria-hidden="true"><span>■</span><span>■</span><span>■</span></span></button>
</div>
```

## 코드
```css
.mp-loading-demo { display: flex; flex-wrap: wrap; align-items: center; gap: 1.6em; }
.mp-loading { display: inline-flex; align-items: baseline; gap: 0.6em; margin: 0; color: var(--mp-ink); font: 400 var(--mp-size-small) / 1.5 var(--mp-font); letter-spacing: var(--mp-tracking-small); }
.mp-loading-text { opacity: var(--mp-opacity-secondary); }
.mp-loading-cells { display: inline-flex; gap: 0.2em; font-size: 0.8em; }
.mp-loading-cells.is-dots { font-size: 1em; gap: 0.1em; }
.mp-loading-cells span { opacity: var(--mp-opacity-kicker); animation: mp-loading-step var(--mp-duration-caret) steps(1, end) infinite; }
.mp-loading-cells span:nth-child(2) { animation-delay: 0.4s; }
.mp-loading-cells span:nth-child(3) { animation-delay: 0.8s; }
@keyframes mp-loading-step { 0% { opacity: 1; } 33.34% { opacity: var(--mp-opacity-kicker); } }
.mp-loading-button {
  display: inline-flex; align-items: baseline; gap: 0.6em; padding: 0.75em 1.5em;
  border: var(--mp-border) solid var(--mp-line-button); border-radius: 0; background: transparent; color: var(--mp-ink);
  font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small); cursor: progress;
}
@media (prefers-reduced-motion: reduce) { .mp-loading-cells span { animation: none; opacity: 1; } }
```

```js
// 400ms 뒤에 보이고, 한번 보이면 최소 600ms 유지
// 쓰기: el.dispatchEvent(new CustomEvent('mp:loading', { detail: { task: () => fetch(url) } }))
(() => {
  document.querySelectorAll('.mp-loading[data-loading]').forEach((el) => {
    el.hidden = true;
    el.addEventListener('mp:loading', async (e) => {
      const task = e.detail && e.detail.task;
      if (typeof task !== 'function') return;
      let shownAt = 0;
      const t = setTimeout(() => { el.hidden = false; shownAt = Date.now(); }, 400);
      try { await task(); }
      finally {
        clearTimeout(t);
        if (shownAt) await new Promise((r) => setTimeout(r, Math.max(0, 600 - (Date.now() - shownAt))));
        el.hidden = true;
      }
    });
  });
})();
```
마크업: 스크립트로 제어할 표시에 `data-loading`을 단다(`<p class="mp-loading" role="status" data-loading hidden>`).

## 앱
- SwiftUI: `ProgressView()` 회전 스피너 대신 `TimelineView(.periodic(from: .now, by: 0.4))`로 켜진 칸 인덱스(`Int(date.timeIntervalSince1970 / 0.4) % 3`)를 계산해 `Text("■")` 세 개의 opacity를 1 / 0.45로. `accessibilityReduceMotion`이면 모두 1.
- Compose: `CircularProgressIndicator` 대신 `LaunchedEffect(Unit) { while (true) { delay(400); i = (i + 1) % 3 } }` + `Text("■")` 세 개. `Modifier.semantics { contentDescription = "불러오는 중" }`.
- OS 예외: 당겨서 새로고침(`refreshable`, `PullToRefreshBox`)의 시스템 표시, 웹뷰·시스템 시트 안의 스피너는 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 무엇을 기다리는지 문구로(`… 중`). 칸은 끊어서 켠다. 400ms 뒤에 보이고 최소 600ms 유지. 버튼 폭 고정. reduced-motion이면 정지.
- 하지 말 것: 부드럽게 도는 원형 스피너, 튀는 점, 화면 전체를 덮는 반투명 막, 짧은 작업에 번쩍이는 로딩, orange·teal 칸, 문구 없는 무한 대기, 진행률을 아는데 로딩 표시.
