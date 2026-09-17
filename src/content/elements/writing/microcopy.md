---
id: microcopy
name: 짧은 말투
nameEn: Microcopy
category: writing
summary: 합쇼체로 짧게, 한 문장에 한 가지. 빈 상태·진행·실패·되돌릴 수 없음을 정해진 틀로 말한다. 이모지·느낌표 없음.
aliases: [문구, 마이크로카피, 말투, 안내 문구, 오류 메시지, 빈 상태 문구, 버튼 문구, 라벨, 톤앤매너, 문체, microcopy, ux writing, tone of voice, copy, error message, empty state text]
platforms: [web, ios, android]
status: extracted
source: portfolio-analysis 4절(timeboard·hihi·syn·memo_markdown 문구) · metaphr.dev 소개문
pillars: [minimalism]
tokens: [--mp-opacity-body, --mp-opacity-secondary, --mp-opacity-muted, --mp-size-body, --mp-tracking-body, --mp-leading-body, --mp-width-para]
effects: []
related: [terminal-vocabulary, labels-numbers, empty-state, error-state, confirm-step, toast, button, form-validation, notification]
---

## 용도
화면 안의 모든 짧은 글(버튼, 라벨, 입력 안내, 빈 상태, 진행, 성공·실패, 확인 창, 알림, 툴팁)에 적용한다.
문구를 더하기 전에 뺄 수 있는지 먼저 본다. 기호 쓰임은 `terminal-vocabulary`, 숫자·날짜 표기는 `labels-numbers`를 따른다.
긴 설명문(철학·도움말 본문)은 이 문서가 아니라 일반 문장 규칙을 따르되, 같은 말투(합쇼체, 자기 지칭 없음)를 유지한다.

## 생김새
**문체**
- 합쇼체 평서·권유: "…합니다", "…하세요". 해요체("…해요")는 쓰지 않는다.
- 한 문장에 한 가지. 두 가지면 문장을 나누거나 하나를 뺀다.
- 주어·자기 지칭("저는", "저희가", "metaphr가")을 쓰지 않는다. 사용자를 "당신"으로 부르지 않는다.
- 느낌표·이모지·감탄("앗", "짜잔")·사과("죄송합니다")를 쓰지 않는다. 실패는 사과 대신 원인과 해결을 말한다.
- 줄임표는 `…` 한 글자. `...` 마침표 세 개를 쓰지 않는다.
- 묶을 때는 가운뎃점(·), 원인과 해결을 이을 때는 줄표(—, 앞뒤 한 칸).

**요소별 길이**
| 자리 | 형태 | 길이 | 예 |
|---|---|---|---|
| 버튼 | 동사 하나 | 2–4자 | 저장, 열기, 삭제, 내려받기 |
| 괄호 버튼 | `[ 동사 ]` | 2–4자 | `[ 확인 ]` |
| 라벨 | 가장 짧은 명사 | 1–4자 | 다음, 용량, 기간 |
| 입력 안내(placeholder) | 예시 값 | 짧게 | name@metaphr.dev |
| 빈 상태 | 사실 + 행동 | 두 문장 | 아래 표 |
| 진행 | 동작 + 중… | 한 구 | 저장 중… |
| 토스트 | 결과 | 한 문장 | 저장했습니다. |
| 오류 | 무엇 — 해결 | 한 문장 | 아래 표 |
| 확인 창 제목 | 질문 | 한 문장 | 이 기록을 삭제할까요? |

**틀**
| 상황 | 틀 | 예 |
|---|---|---|
| 빈 상태 | 아직 [무엇]이 없습니다. [행동]하세요. | 아직 메모가 없습니다. 새 메모를 만드세요. |
| 검색 결과 없음 | "[검색어]"와 맞는 [무엇]이 없습니다. | "등산"과 맞는 기록이 없습니다. |
| 진행 | [동작] 중… | 내려받는 중… |
| 성공 | [결과]했습니다. (필요할 때만) | 저장했습니다. |
| 실패 | [무엇]하지 못했습니다 — [해결]. | 저장하지 못했습니다 — 연결을 확인하세요. |
| 권한 | [권한]이 꺼져 있습니다. [어디]에서 허용하세요. | 위치 권한이 꺼져 있습니다. 설정에서 허용하세요. |
| 입력 오류 | [무엇]을 [어떻게] 입력하세요. | 이메일 주소를 입력하세요. |
| 확인 | [행동]할까요? 되돌릴 수 없습니다. | 파일 3개(120MB)를 삭제할까요? 되돌릴 수 없습니다. |
| 확인 버튼 | 행동 동사 그대로 | 삭제 / 취소 |

**정보 원칙**
- 되돌릴 수 없는 일은 "되돌릴 수 없습니다"라고 그대로 쓰고, 결과 정보(파일명·용량·개수)를 함께 보인다.
- 확인 창 버튼은 "예/아니요" 대신 행동 이름("삭제", "취소").
- 성공은 화면 변화로 이미 보이면 알리지 않는다. 조용히 실패하지 않는다.
- 정보가 없는 표기는 지운다(같은 날짜 반복, 당연한 단위).
- 같은 대상은 화면 어디서나 같은 단어로 부른다(기록/로그/히스토리를 섞지 않는다).

**배치·접근성**
- 상태 메시지 자리는 미리 비워 둔다(`min-height`): 메시지가 떠도 레이아웃이 흔들리지 않게.
- 진행·성공·실패 문구 영역은 `role="status"`(`aria-live="polite"`), 막는 오류는 `role="alert"`.
- 입력 오류는 입력 칸 아래에 두고 `aria-describedby`로 칸과 연결한다.
- 버튼 글자가 기호뿐이면 `aria-label`에 동사를 넣는다.
- 필수 문구는 opacity `--mp-opacity-secondary`(.7) 이상.

## 상태
| 상태 | 글자 | 투명도 |
|---|---|---|
| 기본 안내 | 사실 한 줄 | `--mp-opacity-body` |
| 보조 안내(행동 제안) | 한 줄 | `--mp-opacity-secondary` |
| 진행 | "… 중…" | `--mp-opacity-secondary` |
| 실패 | 원인 — 해결 | `--mp-opacity-body` (색 없음, 필요하면 ■ 강조 하나) |
| 비어 있는 상태 칸 | 없음(자리만) | — |

## 데모
```html demo
<div class="mp-microcopy">
  <span class="mp-microcopy-btn">[ 저장 ]</span>
  <span class="mp-microcopy-line">저장 중…</span>
  <span class="mp-microcopy-line mp-microcopy-muted">없음</span>
</div>
```

## 코드
```css
.mp-microcopy { display: flex; align-items: center; gap: 1.6em; font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body); }
.mp-microcopy-btn { white-space: pre; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); }
.mp-microcopy-line { opacity: var(--mp-opacity-secondary); }
.mp-microcopy-muted { opacity: var(--mp-opacity-muted); }

/* 페이지에서: 상태 메시지 자리는 미리 비워 둔다 */
.status-line { min-height: calc(1em * var(--mp-leading-body)); max-width: var(--mp-width-para); opacity: var(--mp-opacity-secondary); }
```

```js
// 상태 문구 갱신: 자리는 고정, 글자만 바꾼다 (<p class="status-line" role="status"></p>)
function setStatus(el, text) { el.textContent = text || ''; }
```

## 앱
- 문자열은 `Localizable.xcstrings` / `strings.xml` 한 곳에 두고 위 틀을 키 이름에 반영한다(`empty.memo`, `error.save`).
- 시스템 권한 설명(`NSLocationWhenInUseUsageDescription` 등)도 같은 말투: "산행 기록에 위치를 씁니다."
- 알림창: SwiftUI `.alert("이 기록을 삭제할까요?", …) { Button("삭제", role: .destructive) {}; Button("취소", role: .cancel) {} } message: { Text("되돌릴 수 없습니다.") }`.
- 접근성: 진행·결과는 `AccessibilityNotification.Announcement` / `View.announceForAccessibility`로 읽어 준다.
- 푸시 알림 문구는 `notification` 패턴. OS가 정한 버튼 문구("허용", "허용 안 함")는 예외.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 합쇼체로 짧게, 한 가지씩. 버튼은 동사, 라벨은 명사. 실패는 해결과 함께. 되돌릴 수 없음은 그대로 쓰고 결과 정보를 붙인다. 상태 자리는 미리 비운다. 같은 대상은 같은 단어로.
- 하지 말 것: 이모지, 느낌표, 자기 지칭, 감탄·사과, 해요체, "예/아니요" 확인 버튼, 같은 뜻의 긴 라벨, `...`, 조용한 실패, 원인만 있고 해결이 없는 오류.
