---
id: divider
name: 구분선
nameEn: Divider
category: content
summary: 영역을 나누는 1px 헤어라인. 선보다 여백으로 먼저 나누고, 선은 마지막에 쓴다.
aliases: [구분선, divider, hr, 선, 헤어라인, hairline, separator, 가로선, 세로선, 가운뎃점]
platforms: [web, ios, android]
status: extracted
source: metaphr.dev index.html .foot border-top
pillars: [minimalism]
tokens: [--mp-border, --mp-line, --mp-section, --mp-section-lg, --mp-opacity-meta, --mp-size-meta]
effects: []
related: [footer, list, spacing-layout, key-value]
---

## 용도
성격이 다른 두 영역을 나눌 때 쓴다: 본문과 푸터, 목록 행 사이, 표의 행, 설정 분류 사이.
같은 성격의 영역끼리(분류 섹션과 분류 섹션)는 선 없이 `--mp-section` 여백으로 나눈다.
나누는 순서는 **여백 → 1px 선 → (없음)**. 배경색 띠·굵은 선·장식 구분자로 나누지 않는다.
글자 사이의 구분(메타 정보 나열)은 선 대신 가운뎃점 `·`을 쓴다.

## 생김새
**종류**
1. 가로 구분선 — `<hr>` 또는 영역의 `border-top`
2. 목록 행 구분 — 행마다 `border-bottom`, 첫 행 위는 목록 `border-top`
3. 세로 구분선 — 가로로 나열한 칸 사이 `border-left` (첫 칸은 없음)
4. 글자 구분 — `·`, 앞뒤 `0.4em`, `opacity: var(--mp-opacity-meta)`

**수치**
- 두께 `--mp-border`(1px) 고정. 색 `--mp-line`(ink .16) 하나
- `<hr>`: `border: 0; border-top: var(--mp-border) solid var(--mp-line); margin: 0` 후 위아래 여백을 따로 준다
- 페이지 구획(푸터 위): 선 위 바깥 `--mp-section`, 선 아래 안쪽 `--mp-section-lg` (metaphr.dev `.foot`)
- 본문 안 구획: 위아래 `--mp-section`
- 목록 행: 행 여백 `0.7em–0.9em` 안에서 선만 긋는다(추가 margin 없음)
- 세로선: 칸 좌우 여백 `1.6em`, 높이는 칸 높이 그대로
- 선 끝까지 폭 100%. 가운데 짧은 선(장식)은 만들지 않는다

**반응형**
- 가로로 나열한 칸이 좁은 화면에서 세로로 쌓이면 세로선을 가로선(`border-top`)으로 바꾼다.
- 여백 토큰이 clamp라 화면 크기별 값을 따로 두지 않는다.
- 390px: 가로 나열 칸(`.mp-divider-row`)이 480px 이하 규칙으로 세로로 쌓이고 세로선이 윗선으로 바뀐다.
- 700px / 860px: 변화 없음 — 선 두께·색은 고정, 여백만 clamp로 자란다.
- 1180px: 가로선 길이는 부모 틀(`--mp-width-list` 또는 `--mp-width-read`) 끝까지. 화면 전체 폭 선(`100vw`)을 긋지 않는다. 예외: 푸터 윗선도 `.wrap` 안.

**접근성**
- 내용 구획이 바뀌는 곳이면 `<hr>`(역할 separator)을 쓴다. 순수 시각 선이면 CSS border로만 긋고 요소를 추가하지 않는다.
- 선만으로 그룹을 구분하지 않는다 — 제목(`section-head`, kicker)이나 목록 구조(`<ul>`)로도 구분한다.
- 1px .16 선은 장식 대비라 WCAG 비텍스트 대비(3:1) 대상이 아니다. 입력 칸 경계처럼 인식이 필요한 선은 `--mp-line-button`이나 `--mp-line-strong`을 쓴다(해당 요소 문서).

**조합 규칙**
- 선 바로 위아래에 또 선을 두지 않는다(카드 테두리 + hr 겹침 금지). 표·목록의 바깥 선이 있으면 그 옆 hr은 뺀다.
- `section-head` 바로 아래에는 선을 긋지 않는다(제목이 이미 구획을 만든다).
- 푸터 윗선은 페이지에 하나. 본문 안 hr은 한 페이지 3개 이하를 기준으로 한다.
- 가운뎃점 `·` 구분은 `tag`·메타 줄에서 쓰고, 배지 사이에는 쓰지 않는다(배지는 틀이 이미 구분).

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 1px `--mp-line` |
| 호버·포커스 | 없음. 선은 반응하지 않는다(행 반응은 `list`가 맡는다) |

## 데모
```html demo
<div class="mp-divider-demo">
  <span class="mp-divider-block"></span>
  <hr class="mp-divider">
  <span class="mp-divider-block"></span>
  <div class="mp-divider-row"><span>A</span><span>B</span><span>C</span></div>
  <p class="mp-divider-dots"><span>web</span><span>ios</span></p>
</div>
```

## 코드
```css
.mp-divider { border: 0; border-top: var(--mp-border) solid var(--mp-line); margin: var(--mp-section) 0; }
.mp-divider--page { margin: var(--mp-section) 0 0; }            /* 푸터 위: 아래 안쪽 여백은 푸터가 --mp-section-lg로 */
.mp-divider-row { display: flex; }
.mp-divider-row > * { padding: 0 1.6em; }
.mp-divider-row > * + * { border-left: var(--mp-border) solid var(--mp-line); }
.mp-divider-row > :first-child { padding-left: 0; }
@media (max-width: 480px) {
  .mp-divider-row { flex-direction: column; }
  .mp-divider-row > * { padding: 0.7em 0; }
  .mp-divider-row > * + * { border-left: 0; border-top: var(--mp-border) solid var(--mp-line); }
}
.mp-divider-dots { margin: 1em 0 0; font-size: var(--mp-size-meta); }
.mp-divider-dots > * + *::before { content: "·"; margin: 0 0.4em; opacity: var(--mp-opacity-meta); }
.mp-divider-block { display: block; height: 2em; }
.mp-divider-demo .mp-divider { margin: 1em 0; }
.mp-divider-demo .mp-divider-row { margin-top: 1.5em; }
.mp-divider-foot { padding-top: var(--mp-section-lg); }
```
데모는 여백을 `1em`으로 줄였다. 실제는 `--mp-section`.

## 앱
- SwiftUI: `Rectangle().fill(line).frame(height: 1)` (세로는 `width: 1`). 기본 `Divider()`는 두께·색이 OS 값이라 쓰지 않는다.
- `List` 행 구분: `.listRowSeparatorTint(line)` 또는 `.listRowSeparator(.hidden)` 후 직접 1pt 선. 들여쓴 구분선(inset)은 쓰지 않고 가장자리까지 긋는다.
- Compose: `HorizontalDivider(thickness = 1.dp, color = line)`, `VerticalDivider(thickness = 1.dp, color = line)`. Material 기본 `outlineVariant` 색을 쓰지 않는다.
- 픽셀 밀도가 높아도 1pt/1dp 하나(2–3 물리 픽셀). 0.5pt 헤어라인을 따로 만들지 않는다.
- 설정 화면 분류 사이는 선 대신 여백 + kicker 제목(`settings`).
```swift
struct Hairline: View { var vertical = false
  var body: some View { Rectangle().fill(Color("Line")).frame(width: vertical ? 1 : nil, height: vertical ? nil : 1).accessibilityHidden(true) } }
```
```kotlin
HorizontalDivider(thickness = 1.dp, color = MPColors.line)          // 목록 행 사이
Row(Modifier.height(IntrinsicSize.Min)) { A(); VerticalDivider(thickness = 1.dp, color = MPColors.line); B() }
```
- OS 예외: 시스템 `List`/`Form`의 inset 구분선을 끌 수 없는 화면(설정 앱 연동 등)은 그대로 둔다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 여백으로 먼저 나누고, 그래도 부족할 때만 1px 선.
- 해야 할 것: 선 색은 `--mp-line` 하나, 폭은 끝까지.
- 해야 할 것: 글자 나열은 `·`로.
- 하지 말 것: 2px 이상 선, 진한 `--mp-ink` 선, 이중선.
- 하지 말 것: 점선·물결·`* * *` 같은 장식 구분자.
- 하지 말 것: 양끝이 흐려지는 그라데이션 선, 그림자 선.
- 하지 말 것: 섹션마다 습관적으로 선 긋기, 배경색 띠로 영역 나누기.
- 하지 말 것: orange·teal 색 선.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| `border-top: 2px solid var(--mp-ink)` | `var(--mp-border) solid var(--mp-line)` |
| `hr` 기본 스타일(음각 회색 두 줄) | `border: 0; border-top: …` |
| 섹션마다 hr | 같은 성격 섹션은 `--mp-section` 여백 |
| `linear-gradient` 페이드 선 | 단색 1px |
| 메타 사이 `|` 세로 막대 글자 | 가운뎃점 `·` |
