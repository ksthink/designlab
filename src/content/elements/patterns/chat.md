---
id: chat
name: 채팅
nameEn: Chat
category: patterns
summary: 메시지를 꼬리 없는 1px 선 사각 블록으로 쌓는다. 내 메시지는 오른쪽 모눈 틴트 면, 상대는 왼쪽 투명 면, 입력 중은 ■ 계단.
aliases: [채팅, 대화, 메시지, 메신저, chat, messages, message bubble, 말풍선, 챗봇, AI 채팅, 대화창]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-border, --mp-line, --mp-line-button, --mp-grid-bg, --mp-size-body, --mp-tracking-body, --mp-leading-card, --mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-kicker, --mp-size-small, --mp-tracking-small, --mp-duration-caret, --mp-duration-hover, --mp-accent, --mp-font, --mp-width-read]
effects: [caret]
related: [text-field, textarea, text-action, status-dot, loading, caret, avatar, list, microcopy]
---

## 용도
사람과 사람, 또는 사용자와 AI 도우미가 차례로 짧은 글을 주고받는 화면에 쓴다.
한 방향 공지·기록은 `list`나 `timeline`, 한 번 묻고 끝나는 입력은 `text-field` + `button`을 쓴다.
채팅 목록(대화방 목록)은 `list` 행 + 안 읽음 `status-dot`으로 만든다.

## 생김새
**구조**
- 화면 = 상단 바(`header`: `<` + 상대 이름) → 메시지 기록 영역(세로 스크롤) → 입력 줄(composer).
- 메시지 블록 = 본문 + 메타 줄(시각·읽음). 꼬리·둥근 말풍선 없이 직각 사각형.
- **내 메시지**: 오른쪽 정렬, 면 `--mp-grid-bg` + 1px `--mp-line`. **상대 메시지**: 왼쪽 정렬, 투명 면 + 1px `--mp-line`.
  - 잉크 반전 면을 내 메시지에 쓰지 않는 이유: 반전은 metaphr에서 "누를 수 있음·호버"의 신호(`invert-hover`)라, 기본 상태 블록에 쓰면 상호작용과 헷갈린다. 틴트 면 + 정렬로 구분하고 반전은 누른 상태에만 남긴다.
- 같은 사람이 연달아 보낸 메시지는 묶는다: 블록 사이 `0.3em`, 메타 줄은 묶음 마지막에만. 사람이 바뀌면 `1.2em`.
- 날짜가 바뀌면 가운데 구분 줄: 가는 1px 선 + `09.17` 메타 글자.
- 입력 중 표시: 상대 쪽 빈 블록 안에 `■■■`가 한 칸씩 켜지는 터미널 계단(`loading`과 같은 어휘).
- AI 도우미의 스트리밍 답: 글자가 들어오는 동안 끝에 `■` 커서(`caret`), 끝나면 커서를 지운다.
- 입력 줄 = `textarea`(한 줄에서 최대 5줄까지 늘어남) + `text-action` `[ 보내기 ]`. 위에 1px `--mp-line`.
- 아바타는 기본으로 쓰지 않는다. 여럿이 대화할 때만 상대 블록 첫 줄 위에 이름 글자(meta), 필요하면 40px 사각 `avatar`.

**수치**
- 기록 영역 폭: `--mp-width-read`(760px) 이하, 가운데.
- 블록 최대 폭: 기록 영역의 75%(390px 화면은 85%). 안쪽 여백 `0.6em 0.9em`.
- 본문: `--mp-size-body`, `--mp-tracking-body`, 행간 `--mp-leading-card`(1.85), `overflow-wrap: anywhere`, `white-space: pre-wrap`.
- 메타: `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`, 블록 아래 `0.3em`, 정렬은 블록과 같은 쪽. 시각은 24시간 `14:05`(`labels-numbers`), 읽음은 글자 `읽음`.
- 입력 중 ■: 크기 `0.7em`, 칸 간격 `0.2em`, 켜진 칸 불투명, 꺼진 칸 `--mp-opacity-kicker`, 한 칸 이동 `--mp-duration-caret`/3.
- 입력 줄: 위아래 여백 `0.8em`, 입력칸 테두리 1px `--mp-line-button`, 보내기 `--mp-size-small`·`--mp-tracking-small`.
- 새 메시지 알림 점: 8px 사각 `--mp-accent`(화면당 하나).

**반응형**
- 390px: 블록 최대 85%, 기록 영역 좌우 여백 `1em`, 입력 줄은 화면 하단에 붙이고 키보드 위로 올라간다(`env(safe-area-inset-bottom)` 포함). `[ 보내기 ]`는 `[ > ]`로 줄여도 된다(aria-label "보내기").
- 700px: 블록 최대 75%, 기록 영역 좌우 `--mp-gutter`.
- 860px: 대화방 목록(`list`)을 왼쪽 280px, 대화를 오른쪽에 나란히 둘 수 있다. 사이 1px `--mp-line`.
- 1180px: 대화 영역은 760px을 넘기지 않는다. 긴 코드·주소는 블록 안에서 줄바꿈하고 가로 스크롤을 만들지 않는다.

**접근성**
- 기록 영역: `role="log"` + `aria-live="polite"` + `aria-label="대화 기록"`. 새 메시지만 읽힌다(스트리밍 중에는 `aria-busy="true"`로 두고 끝나면 `false` — 글자마다 읽히지 않게).
- 메시지마다 `<article>` 또는 `<li>`, 보이지 않는 머리말로 보낸 사람·시각: `<span class="mp-chat-sr">나, 14:05</span>`.
- 입력 중 `■■■`는 `aria-hidden="true"`, 대신 상태 문구 "리듬이 입력 중" 을 `role="status"`로 한 번.
- 입력칸: `<textarea aria-label="메시지">`. **Enter = 보내기, Shift+Enter = 줄바꿈**. 한글 조합 중(`isComposing`)에는 Enter로 보내지 않는다.
- 보낸 뒤 포커스는 입력칸에 남고, 새 메시지가 와도 옮기지 않는다. 과거를 읽는 중이면 자동으로 맨 아래로 내리지 않고 "새 메시지 ■" `text-action`을 보인다.
- 대비: 본문은 불투명 잉크(내 블록 틴트 면 위에서도 10:1 이상). 메타(.7) 줄에만 필수 정보를 두지 않는다 — 전송 실패는 본문 크기 글자로.

**움직임 줄이기**
- 새 메시지는 즉시 나타난다(미끄러짐·튕김 없음), 스크롤은 `behavior: 'auto'`. 입력 중 ■ 계단과 스트리밍 커서는 `prefers-reduced-motion: reduce`이면 멈춘다: `■■■` 정지 표시, 커서는 켜진 채.

**조합 규칙**
- orange는 화면당 하나: 안 읽은 새 메시지 점 또는 전송 실패 ■ 중 더 급한 하나만.
- 입력 줄의 보내기는 `text-action` 하나. 첨부 등은 `[ + ]` 하나로 묶어 `action-sheet`로.
- 메시지 삭제·대화 나가기는 `confirm-step`. 복사됨·전송됨 확인은 `toast` 대신 메타 줄 글자로. 링크·코드·이미지는 블록 안에서 `link`·`code-block`·`image` 규칙을 따른다.

## 상태
| 상태 | 표현 |
|---|---|
| 보내는 중 / 보냄 / 읽음 | 메타 `...` / `14:05` / `14:05 · 읽음` |
| 전송 실패 | 블록 옆 `■`(`--mp-accent`) + 본문 크기 글자 `보내지 못했습니다` + `[ 다시 ]` |
| 입력 중(상대) | 빈 블록 안 `■■■` 계단 |
| AI 답 스트리밍 | 글자 끝 `■` 커서 깜빡임, 끝나면 제거 |
| 블록 누름·길게 누름 | 잉크/배경 반전(복사·삭제 메뉴 `context-menu`) |
| 입력칸 포커스 | 테두리 `--mp-ink`, 보내기 활성 |
| 빈 입력 | `[ 보내기 ]` `opacity: var(--mp-opacity-kicker)`, 비활성 |
| 대화 없음 | `empty-state` 한 줄 |

## 동작
- 입력 중 계단: 세 칸이 차례로 켜진다 `steps(1, end)`, 주기 `--mp-duration-caret`(`loading`·`caret`과 같은 박자).
- 스트리밍 커서: `caret`(`■`, `--mp-duration-caret` `steps(1, end)`).
- 블록 누름 반전은 `--mp-duration-hover` ease. reduced-motion: 계단·커서 정지, 반전 즉시.

## 데모
```html demo
<div class="mp-chat">
  <div class="mp-chat-log" role="log" aria-label="대화 기록">
    <p class="mp-chat-msg">안녕</p>
    <p class="mp-chat-msg is-mine">응</p>
    <p class="mp-chat-meta is-mine">14:05 · 읽음</p>
    <p class="mp-chat-msg is-streaming">좋아</p>
    <p class="mp-chat-msg mp-chat-typing" aria-hidden="true"><i></i><i></i><i></i></p>
  </div>
  <div class="mp-chat-composer"><span class="mp-chat-input"></span><button class="mp-chat-send" type="button">[ 보내기 ]</button></div>
</div>
```

## 코드
```css
.mp-chat { max-width: var(--mp-width-read); display: flex; flex-direction: column; }
.mp-chat-log { display: flex; flex-direction: column; align-items: flex-start; gap: 0.3em; padding: 0.8em 0; }
.mp-chat-msg { max-width: 75%; margin: 0; padding: 0.6em 0.9em;
  border: var(--mp-border) solid var(--mp-line); border-radius: 0; background: transparent; color: var(--mp-ink);
  font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body); line-height: var(--mp-leading-card);
  white-space: pre-wrap; overflow-wrap: anywhere;
}
.mp-chat-msg.is-mine { align-self: flex-end; background: var(--mp-grid-bg); }
.mp-chat-meta { margin: 0 0 0.9em; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-chat-meta.is-mine { align-self: flex-end; }
.mp-chat-msg.is-streaming::after { content: "■"; margin-left: 0.3em; opacity: var(--mp-opacity-kicker); animation: mp-chat-caret var(--mp-duration-caret) steps(1, end) infinite; }
.mp-chat-msg.is-failed::before { content: "■"; margin-right: 0.4em; color: var(--mp-accent); }
.mp-chat-typing { display: flex; gap: 0.2em; }
.mp-chat-typing i { display: block; width: 0.7em; height: 0.7em; background: var(--mp-ink); opacity: var(--mp-opacity-kicker); animation: mp-chat-dot var(--mp-duration-caret) steps(1, end) infinite; }
.mp-chat-typing i:nth-child(2) { animation-delay: calc(var(--mp-duration-caret) / 3); }
.mp-chat-typing i:nth-child(3) { animation-delay: calc(var(--mp-duration-caret) / 3 * 2); }
@keyframes mp-chat-dot { 0% { opacity: 1; } 33% { opacity: var(--mp-opacity-kicker); } }
@keyframes mp-chat-caret { 50% { opacity: 0; } }
.mp-chat-composer { display: flex; align-items: flex-end; gap: 0.8em; padding: 0.8em 0; border-top: var(--mp-border) solid var(--mp-line); }
.mp-chat-input { flex: 1; min-height: 2.4em; border: var(--mp-border) solid var(--mp-line-button); background: transparent; color: var(--mp-ink); font: 400 var(--mp-size-body) / 1.85 var(--mp-font); padding: 0.3em 0.6em; resize: none; }
.mp-chat-input:focus { outline: none; border-color: var(--mp-ink); }
.mp-chat-send { padding: 0.5em 0.4em; border: 0; background: transparent; color: var(--mp-ink); cursor: pointer; font: 400 var(--mp-size-small) / 1 var(--mp-font); letter-spacing: var(--mp-tracking-small);
  transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease;
}
.mp-chat-send:hover, .mp-chat-send:focus-visible { background: var(--mp-ink); color: var(--mp-bg); }
.mp-chat-send:disabled { opacity: var(--mp-opacity-kicker); cursor: not-allowed; background: transparent; color: var(--mp-ink); }
.mp-chat-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (max-width: 699px) { .mp-chat-msg { max-width: 85%; } }
@media (prefers-reduced-motion: reduce) { .mp-chat-typing i, .mp-chat-msg.is-streaming::after { animation: none; } .mp-chat-typing i { opacity: 1; } .mp-chat-send { transition: none; } }
```
데모의 입력칸은 빈 사각형 견본이다. 실제는 `<textarea class="mp-chat-input" rows="1" aria-label="메시지">`.

```js
// Enter 보내기 · Shift+Enter 줄바꿈 · 한글 조합 중 무시 · 아래에 있을 때만 자동 스크롤
(() => {
  const log = document.querySelector('.mp-chat-log');
  const input = document.querySelector('textarea.mp-chat-input');
  const send = document.querySelector('.mp-chat-send');
  if (!log || !input || !send) return;
  const nearBottom = () => log.scrollHeight - log.scrollTop - log.clientHeight < 48;
  const sync = () => {
    send.disabled = !input.value.trim();
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, parseFloat(getComputedStyle(input).lineHeight) * 5) + 'px';
  };
  const submit = () => {
    const text = input.value.trim();
    if (!text) return;
    const stick = nearBottom();
    const p = Object.assign(document.createElement('p'), { className: 'mp-chat-msg is-mine', textContent: text });
    log.appendChild(p);
    input.value = ''; sync(); input.focus();
    if (stick) log.scrollTop = log.scrollHeight;
  };
  input.addEventListener('input', sync);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); submit(); } });
  send.addEventListener('click', submit); sync();
})();
```

## 앱
- SwiftUI:
  ```swift
  ScrollViewReader { proxy in
    ScrollView { LazyVStack(spacing: 4) { ForEach(messages) { MessageBlock($0) } } }
      .defaultScrollAnchor(.bottom)
      .onChange(of: messages.count) { if atBottom { proxy.scrollTo(messages.last?.id) } }   // 애니메이션 없이
  }
  .safeAreaInset(edge: .bottom) { Composer() }   // 키보드 위로 따라 올라감
  ```
  블록은 `Text(...).padding(.horizontal, 12).padding(.vertical, 8).background(isMine ? gridBg : .clear).overlay(Rectangle().stroke(line, lineWidth: 1))` — `RoundedRectangle`·꼬리 모양 금지. 메시지마다 `.accessibilityElement(children: .combine)` + `.accessibilityLabel("나, 14:05, 응")`.
- Compose:
  ```kotlin
  LazyColumn(state = listState, reverseLayout = true, modifier = Modifier.weight(1f).semantics { liveRegion = LiveRegionMode.Polite }) {
    items(messages.asReversed(), key = { it.id }) { MessageBlock(it) }
  }
  Composer(Modifier.imePadding().navigationBarsPadding())
  ```
  블록은 `Modifier.border(1.dp, Line, RectangleShape).background(if (mine) GridBg else Color.Transparent)`, `animateItem()` 쓰지 않음.
- 보내기: 하드웨어 키보드 Enter 보내기·Shift+Enter 줄바꿈(`onPreviewKeyEvent`), 화면 키보드는 줄바꿈 키 그대로 두고 `[ 보내기 ]`로 보낸다.
- OS 예외: 시스템 키보드 모양·예측 입력 막대, 공유 시트, 사진 선택기, 알림(`notification`)은 OS 모양 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 직각 1px 블록, 내 메시지는 오른쪽 틴트 면, 24시간 시각, `role="log"`, Enter/Shift+Enter와 한글 조합 처리, 읽는 중에는 자동 스크롤하지 않기.
- 하지 말 것: 둥근 말풍선·꼬리, 파란색·orange 내 메시지 면, 그림자, 튀어오르는 새 메시지, 원형 점 세 개, 이모지 반응 줄, 메시지마다 아바타 원, 전송 확인 `toast`.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 둥근 말풍선과 꼬리 | 직각 블록 + 1px `--mp-line` |
| 내 메시지를 잉크 반전 면으로 | 오른쪽 정렬 + `--mp-grid-bg` 면(반전은 누름 상태 전용) |
| 원형 점 세 개가 통통 튀는 입력 중 | `■■■` `steps(1, end)` 계단 |
| 한글 입력 중 Enter로 반쯤 조합된 글자 전송 | `isComposing`이면 무시 |
| 스트리밍 글자마다 스크린리더가 읽음 | `aria-busy="true"` 후 완료 시 한 번 |
| 과거를 읽는데 새 메시지로 맨 아래 강제 이동 | 아래에 있을 때만 이동, 아니면 "새 메시지 ■" |
