---
id: caret
name: 깜빡이는 커서
nameEn: Caret
category: effects
summary: 문단 끝의 ■가 steps(1, end) 1.2초로 켜졌다 꺼진다. 옅게(.45), 화면에 하나.
aliases: [커서, 깜빡임, 블링크, 네모 커서, 터미널 커서, 프롬프트 커서, 밑줄 커서, caret, cursor, blink, blinking cursor, terminal cursor, block cursor, 이펙트, 효과, effect]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .lead p:last-of-type::after
pillars: [pixel-art]
tokens: [--mp-duration-caret, --mp-opacity-kicker, --mp-ink, --mp-size-lead, --mp-tracking-lead]
effects: [reduced-motion]
related: [terminal-vocabulary, hero, loading, text-field, empty-state, microcopy]
---

## 용도
"이어서 쓸 수 있다", "기다리고 있다"는 느낌을 줄 곳에 하나만 둔다.
- 소개 문단(리드)의 마지막 문단 끝 — metaphr.dev 히어로 아래의 유일한 상시 움직임.
- 빈 상태 문구 끝(`empty-state`), 터미널형 입력 프롬프트 끝.
진행 상태("저장 중…")는 `loading`을 쓴다. 실제 입력 칸의 텍스트 커서는 브라우저·OS 기본 캐럿을 그대로 둔다(`caret-color: var(--mp-ink)`만 지정).

## 생김새
**블록 커서 ■** (기본)
- 글리프 `■`(Mulmaru), `::after` 가상 요소로 붙인다(내용이 아니라 장식).
- 크기 `0.85em`(부모 글자 기준), 앞 간격 `margin-left: 0.35em`, 줄 기준선에 맞춘다.
- 투명도 `--mp-opacity-kicker` .45, 색 `--mp-ink`. 강조 ■(`--mp-accent`)와 다른 것이다 — 커서는 늘 잉크.
- 붙는 위치: 블록의 **마지막** 문단 끝 하나(`p:last-of-type::after`).

**밑줄 커서 _** (입력 대기형)
- 글리프 `_`, 앞 간격 0.1em, 같은 투명도·주기. 타자기 태그라인, 프롬프트 라벨 `> 이름_`에.

**화면당 하나**
- 상시 깜빡이는 것은 한 화면에 이 커서 하나. 히어로 글리프 필드가 있는 화면에서는 히어로 아래 한 곳만.

**접근성**
- 가상 요소 `content: "■"`는 스크린리더가 읽을 수 있으므로 `content: "■" / ""`(대체 텍스트 빈 값)를 함께 쓴다. 미지원 브라우저를 위해 앞줄에 `content: "■"`를 둔다.
- 초당 1회 미만의 깜빡임(1.2s 주기)이라 광과민 기준(초당 3회) 안.
- 움직임 줄이기에서는 켜진 채 멈춘다(꺼진 채 멈추면 뜻이 사라진다).

**반응형**
- em 단위라 부모 글자 크기를 따라간다. 줄 끝에서 커서만 다음 줄로 넘어가지 않게 마지막 단어와 커서 사이에 줄바꿈이 생기면 `white-space: nowrap`인 마지막 단어 span으로 묶는다(선택).

## 상태
| 상태 | 표현 |
|---|---|
| 켜짐 (주기의 앞 절반) | opacity .45 |
| 꺼짐 (뒤 절반) | opacity 0 |
| 움직임 줄이기 | 켜진 채 정지 (.45) |
| 인쇄 | 숨김 |

## 동작
- `animation: mp-caret var(--mp-duration-caret) steps(1, end) infinite`, 키프레임 `50% { opacity: 0; }`.
- 페이드 없이 끊는다(`steps(1, end)`). `ease`·`linear` 깜빡임 금지.
- `prefers-reduced-motion: reduce`이면 `animation: none`.

## 데모
```html demo
<div class="mp-caret-row">
  <span class="mp-caret">가</span>
  <span class="mp-caret mp-caret-under">가</span>
  <span class="mp-caret mp-caret-still">가</span>
</div>
```

## 코드
```css
.mp-caret-row { display: flex; gap: 2.5em; font-size: var(--mp-size-lead); letter-spacing: var(--mp-tracking-lead); }
.mp-caret::after {
  content: "■"; content: "■" / "";
  margin-left: 0.35em; font-size: 0.85em;
  color: var(--mp-ink); opacity: var(--mp-opacity-kicker);
  animation: mp-caret var(--mp-duration-caret) steps(1, end) infinite;
}
.mp-caret-under::after { content: "_"; content: "_" / ""; margin-left: 0.1em; font-size: 1em; }
.mp-caret-still::after { animation: none; } /* 움직임 줄이기 모습 */
@keyframes mp-caret { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .mp-caret::after { animation: none; } }
@media print { .mp-caret::after { content: none; } }

/* 페이지에서: 리드 마지막 문단 끝 */
.lead p:last-of-type::after { content: "■"; content: "■" / ""; margin-left: 0.35em; font-size: 0.85em; opacity: var(--mp-opacity-kicker); animation: mp-caret var(--mp-duration-caret) steps(1, end) infinite; }
input, textarea { caret-color: var(--mp-ink); }
```

## 앱
- SwiftUI: `TimelineView(.periodic(from: .now, by: 0.6)) { ctx in Text("■").opacity(Int(ctx.date.timeIntervalSinceReferenceDate / 0.6) % 2 == 0 ? 0.45 : 0) }`. `withAnimation`으로 감싸지 않는다.
- Compose: `var on by remember { mutableStateOf(true) }; LaunchedEffect(Unit) { while (true) { delay(600); on = !on } }`, `Text("■", Modifier.alpha(if (on) 0.45f else 0f))`. `animateFloatAsState` 금지.
- 접근성: `accessibilityHidden(true)` / `Modifier.clearAndSetSemantics {}`.
- 줄이기 설정이면 켜진 채 고정. 실제 텍스트 입력 커서는 OS 캐럿(색만 ink, `tint`/`cursorBrush`).

## 해야 할 것 / 하지 말 것
- 해야 할 것: steps로 끊기, 옅게(.45), 잉크 색, 한 화면에 하나, 스크린리더에서 숨기기, 줄이기 설정에서 켜진 채 정지.
- 하지 말 것: opacity 페이드 깜빡임, orange ■ 커서, 문단마다 커서, 1초보다 빠른 깜빡임, 실제 입력 칸 캐럿을 가짜 커서로 바꾸기, 꺼진 상태로 정지.
