---
id: terminal-vocabulary
name: 터미널 어휘
nameEn: Terminal Vocabulary
category: writing
summary: "이모지 대신 터미널 기호를 쓴다. > 프롬프트, [ ] 괄호 버튼, ■ 커서·강조 마크, _ 입력 커서, < > 화살표."
aliases: [터미널 어휘, 기호, 특수문자, 프롬프트, 괄호 버튼, 네모 기호, 커서 기호, 아이콘 대신 글자, 화살표, 이모지 대체, terminal vocabulary, symbols, prompt, ascii, glyphs, arrows]
platforms: [web, ios, android]
status: extracted
source: "timeboard login.html `> `·`[ 로그인 ]`·EDT/DEL · memo_markdown `_` 커서 · metaphr.dev ■·‹ ›(Mulmaru에 없어 < >로 대체)"
pillars: [pixel-art, minimalism]
tokens: [--mp-accent, --mp-ink, --mp-opacity-kicker, --mp-opacity-meta, --mp-font, --mp-size-small, --mp-size-meta, --mp-tracking-meta]
effects: [caret]
related: [microcopy, text-action, caret, back-link, carousel-nav, status-dot, accordion, stepper]
---

## 용도
라벨·버튼·목록 표시에 이모지나 아이콘 세트 대신 Mulmaru 기호를 쓴다. 화면이 터미널 격자라는 픽셀아트 기둥을 글자 차원에서 잇는다.
요소에 맞을 때만 쓴다. 한 화면에서 같은 뜻에는 같은 기호 하나. 기호는 뜻을 대신하지 않고 짧은 글자와 함께 둔다.

## 생김새
**기호 사전**
| 기호 | 뜻 | 쓰는 곳 | 투명도 |
|---|---|---|---|
| `>` | 프롬프트, 다음으로 | 입력 라벨 앞 `> 이메일`, 링크 꼬리 `blog >`, 시각 표시 `> 15:13` | 라벨 앞 `--mp-opacity-kicker`, 링크 꼬리는 링크와 같게 |
| `[ ]` | 누를 수 있음 | `[ 저장 ]`, `[ 시스템 ]` — 괄호 안 앞뒤 한 칸 (`text-action`) | 라벨과 같게 |
| `■` | 커서, 켜짐, 강조 | 깜빡 커서(잉크 .45, `caret`), 강조 마크(`--mp-accent`, 화면당 하나), 켜짐 표시 | 커서 .45 / 강조 1 |
| `□` | 꺼짐 | `□ 다크`처럼 선택 안 됨 | `--mp-opacity-meta` |
| `_` | 입력 대기 | 빈 입력 끝, 타자기 태그라인 | .45 |
| `<` `>` (뒤로가기) | 뒤로·앞으로 | `< metaphr`(`back-link`). metaphr.dev의 `‹ ›`는 Mulmaru에 글리프가 없어 폴백 서체로 그려지므로 ASCII로 쓴다 | 링크와 같게 |
| `<` `>` | 이전·다음 버튼 | 캐러셀·페이지(`carousel-nav`, `pagination`) | 버튼 라벨 |
| `+` `-` | 펼침·접힘, 증감 | `accordion`, `stepper` (ASCII 하이픈. U+2212 `−`는 Mulmaru에 없다) | 라벨과 같게 |
| `·` | 묶기 | `등산로·시설`, 메타 줄 `2026-09-17 · 120MB` | 앞뒤 글자와 같게 |
| `—` | 원인·해결 잇기, 값 없음 | `실패 — 해결`, 빈 칸 `—` | 값 없음은 `--mp-opacity-muted` |
| `…` | 진행 중 | `저장 중…` | 문구와 같게 |
| 영문 대문자 3자 | 짧은 행 액션 | `EDT` `DEL` (`--mp-size-meta`, 자간 `--mp-tracking-meta`) | `--mp-opacity-meta`, 호버 1 |

**형태 규칙**
- Mulmaru cmap 확인(`public/v1/fonts/mulmaru.woff2`): 있음 `> < [ ] ■ □ _ + - · — – … # : ★ ☆ → ← ↗`, **없음 `‹ › − ▪ ▫ €`**. 없는 기호는 쓰지 않는다.
- 모두 `--mp-font` 글리프. Mulmaru에 없는 기호(폴백 서체로 그려지는 것)는 쓰지 않는다. 새 기호는 실제 렌더링을 확인한 뒤 이 표에 추가한다.
- `[ ]` 버튼: 괄호와 라벨 사이 한 칸씩, 공백이 접히지 않게 `white-space: pre`. 버튼 폭이 진행 문구로 바뀌지 않게 `min-width`를 가장 긴 문구 기준으로.
- `>` 프롬프트: 기호와 라벨 사이 한 칸. 라벨 앞 기호는 옅게, 라벨은 진하게.
- 방향 화살표 `→ ← ↗`는 글리프 필드 장식에만. UI 버튼에는 `< >`.
- 강조 `■`(orange)는 화면당 하나, 조건이 참일 때만(기록 중, 곧 만료, 되돌릴 수 없음). 나머지 `■`는 잉크.

**접근성**
- 장식 기호(프롬프트 `>`, 커서 `■` `_`, 묶음 `·`)는 `aria-hidden="true"` span으로 감싸거나 CSS `::before`/`::after`에 `content: "…" / ""`로 넣어 읽히지 않게 한다.
- 뜻을 가진 기호 버튼(`<`, `+`, `-`)은 `aria-label`("이전", "펼치기", "줄이기").
- `[ 저장 ]` 버튼은 괄호가 읽히지 않게 `aria-label="저장"` 또는 괄호를 `aria-hidden` span으로.
- `EDT`/`DEL`처럼 줄인 영문은 `aria-label="편집"`, `aria-label="삭제"`(행 이름 포함: "메모 3 삭제").
- 강조 `■` 옆에는 뜻을 말하는 글자를 둔다(색만으로 전하지 않는다).

**반응형**
- 기호는 글자라 크기를 따라간다. 좁은 화면에서 `[ 저장 ]`이 줄바꿈되지 않게 `white-space: nowrap`.

## 상태
| 상태 | 표기 |
|---|---|
| 기본 버튼 | `[ 저장 ]` |
| 버튼 진행 | `[ 저장 중… ]` (폭 고정) |
| 선택됨 / 아님 | `■ 라이트` / `□ 다크` |
| 기록 중(강조) | `■ 기록 중` — ■만 `--mp-accent` |
| 펼침 / 접힘 | `-` / `+` |
| 행 액션 기본 / 호버 | `DEL` .55 / 1 |
| 값 없음 | `—` |

## 데모
```html demo
<div class="mp-terminal-vocabulary">
  <span><i aria-hidden="true">&gt;</i> 이름<b aria-hidden="true">_</b></span>
  <span class="mp-terminal-vocabulary-btn">[ 저장 ]</span>
  <span class="mp-terminal-vocabulary-act">DEL</span>
  <span><em class="mp-terminal-vocabulary-accent" aria-hidden="true">■</em> REC</span>
</div>
```

## 코드
```css
.mp-terminal-vocabulary { display: flex; flex-wrap: wrap; align-items: center; gap: 1.6em; font-family: var(--mp-font); font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-terminal-vocabulary i, .mp-terminal-vocabulary b, .mp-terminal-vocabulary em { font-style: normal; font-weight: 400; }
.mp-terminal-vocabulary i, .mp-terminal-vocabulary b { opacity: var(--mp-opacity-kicker); }
.mp-terminal-vocabulary b { margin-left: 0.1em; animation: mp-terminal-vocabulary var(--mp-duration-caret) steps(1, end) infinite; }
@keyframes mp-terminal-vocabulary { 50% { opacity: 0; } }
.mp-terminal-vocabulary-btn { white-space: pre; }
.mp-terminal-vocabulary-act { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-terminal-vocabulary-act:hover { opacity: 1; }
.mp-terminal-vocabulary-accent { color: var(--mp-accent); } /* 화면당 하나 */
@media (prefers-reduced-motion: reduce) { .mp-terminal-vocabulary b { animation: none; } }

/* 페이지에서: 기호를 CSS로 붙이면 스크린리더가 읽지 않는다 */
.prompt::before { content: "> "; content: "> " / ""; opacity: var(--mp-opacity-kicker); }
.text-action::before { content: "[ "; content: "[ " / ""; }
.text-action::after { content: " ]"; content: " ]" / ""; }
```

## 앱
- 같은 기호를 앱 문자열에 그대로 쓴다. SF Symbols·Material Icons로 바꾸지 않는다. 탭 바처럼 OS가 아이콘 자리를 요구하면 `pixel-icon`을 쓴다.
- 기호가 Mulmaru에 있는지 앱 번들 폰트로 확인한다. 없으면 시스템 폰트로 대체돼 격자가 깨진다.
- VoiceOver·TalkBack: `accessibilityLabel`/`contentDescription`에는 뜻만("저장", "기록 중"). 장식 기호 `Text`는 `.accessibilityHidden(true)` / `Modifier.clearAndSetSemantics {}`.
- 괄호 버튼은 `Text("[ 저장 ]")` 한 덩어리 + `accessibilityLabel("저장")`.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 기호 옆에 글자를 둔다. 괄호 안 앞뒤 한 칸. 장식 기호는 옅게, 스크린리더에서 숨긴다. 같은 뜻에는 같은 기호. Mulmaru 글리프 확인.
- 하지 말 것: 이모지, 기호만 있는 버튼(라벨 없음), 한 화면에 `[ ]`·`>`·`■` 남발, orange ■를 여러 곳에, `→`를 UI 버튼에, 폴백 서체로 그려지는 기호, 괄호·기호를 스크린리더가 읽게 두기.
