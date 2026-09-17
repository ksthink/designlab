---
id: labels-numbers
name: 숫자와 단위
nameEn: Labels & Numbers
category: writing
summary: 숫자는 단위와 붙여 쓰고, 날짜는 2026-09-17, 시간은 24시간 15:13, 범위는 en dash(–), 값이 없으면 —.
aliases: [숫자, 단위, 날짜 표기, 시간 표기, 금액, 퍼센트, 용량, 범위 표기, 상대 시간, 라벨, 숫자 형식, number format, date format, time format, units, currency, labels, relative time]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-size-meta, --mp-tracking-meta, --mp-opacity-meta, --mp-opacity-body, --mp-opacity-muted, --mp-size-body, --mp-tracking-body, --mp-accent]
effects: []
related: [microcopy, stat, table, key-value, timeline, terminal-vocabulary]
---

## 용도
표·목록·메타 줄·상태 줄·확인 창·알림에 나오는 숫자·날짜·시간·단위 표기를 통일한다.
정보가 없는 표기는 쓰지 않는다(예: 시작일과 같은 날의 "다음 결제", 모든 행이 같은 단위일 때 행마다 반복되는 단위 → 열 제목에 한 번).
라벨 문구 자체의 말투는 `microcopy`, 숫자를 크게 보여 주는 요소는 `stat`.

## 생김새
**숫자**
- 천 단위 쉼표: `1,200`, `12,000`. 네 자리 연도·ID·우편번호에는 쉼표를 넣지 않는다.
- 소수는 필요한 자리만: `2.4`, `0.5`. 끝의 0은 지운다(`2.40` → `2.4`). 같은 열 안에서는 자릿수를 맞춘다.
- 음수는 ASCII 하이픈-마이너스 `-`: `-3`. 증감은 `+12`, `-3`. Mulmaru에는 U+2212 `−` 글리프가 없어 폴백 서체로 그려지므로 쓰지 않는다.
- 큰 수 줄임은 한국어 단위: `1.2만`, `3억`. `1.2K`·`3M`은 영문 화면에서만.

**단위** — 숫자에 붙여 쓴다
| 종류 | 표기 |
|---|---|
| 용량 | `120MB`, `1.4GB`, `980KB` (1000 기준, 소수 한 자리까지) |
| 길이·거리 | `2.4km`, `350m` |
| 시간 길이 | `3분`, `1시간 20분`, `45초` |
| 비율 | `45%` |
| 금액 | `12,000원`. 외화는 `$12`, `₩` 기호 대신 `원`. `€`는 Mulmaru에 없으므로 `9.5유로` 또는 `EUR 9.5` |
| 개수 | `3개`, `12건`, `2명` |
| 온도 | `18°` |

**날짜와 시간**
| 쓰임 | 표기 |
|---|---|
| 목록·표·기록 | `2026-09-17` |
| 같은 해 안 목록 | `09-17` |
| 문장 안 | `9월 17일`, 요일이 필요하면 `9월 17일(목)` |
| 시각 | 24시간 `15:13`, 초가 필요할 때만 `15:13:50` |
| 날짜 + 시각 | `2026-09-17 15:13` |
| 기간 | `09:00–18:00`, `2026-09-01–09-17` |
| 상대 시간 | `방금`(1분 미만), `5분 전`, `3시간 전`, 하루가 넘으면 날짜 |
| 시간대 | 한국 서비스는 KST를 기본으로 적지 않는다. 다를 때만 `15:13 UTC` |

**범위·없음**
- 범위는 en dash `–`, 앞뒤 공백 없음: `3–5`, `09:00–18:00`. 물결표를 쓰지 않는다.
- 값 없음: 줄표 `—` 한 글자, `--mp-opacity-muted`. "없음"이라고 쓰는 곳은 빈 상태 문구뿐.
- 끝이 없는 기간(만료일 없음): `계속` 또는 `2026-09-17–`.

**라벨과 값 배치**
- 라벨은 명사 하나(`다음`, `용량`, `기간`), `--mp-size-meta` · `--mp-tracking-meta` · `--mp-opacity-meta`.
- 값은 `--mp-size-body`, `--mp-opacity-body`. 값이 라벨보다 늘 진하다.
- 세로로 비교하는 숫자 열은 오른쪽 정렬 + `font-variant-numeric: tabular-nums`.
- 값이 크다고 크게·진하게·색으로 칠하지 않는다. 숫자가 이미 말한다. 강조는 화면당 한 곳 `■`(`--mp-accent`) + 글자("곧 만료").

**접근성**
- 날짜·시각은 `<time datetime="2026-09-17T15:13">`으로 기계가 읽을 값을 준다.
- 줄인 단위가 모호하면 `<abbr title="메가바이트">MB</abbr>`는 쓰지 않고 그대로 둔다(스크린리더가 읽는다). `—`는 `aria-label="없음"`.
- 상대 시간은 `title`이나 `datetime`에 절대 시간을 함께 둔다.
- 음수 `-3`은 스크린리더가 "마이너스 3"으로 읽는다. 표에서 오해가 생기면 `aria-label="마이너스 3"`을 준다.
- 표기에 쓰는 기호 `–`(U+2013), `—`(U+2014), `·`, `…`, `%`, `°`, `$`, `₩`는 Mulmaru에 있음을 확인했다(`public/v1/fonts/mulmaru.woff2` cmap). `−`(U+2212), `€`는 없다.

**반응형**
- 좁은 화면에서 긴 날짜는 연도를 먼저 뺀다(`2026-09-17` → `09-17`). 단위는 빼지 않는다.
- 숫자와 단위 사이에서 줄바꿈되지 않는다(붙여 쓰기가 막아 준다). `1시간 20분`은 `white-space: nowrap`.

## 상태
| 경우 | 표기 |
|---|---|
| 기본 | `120MB` |
| 값 없음 | `—` (옅게) |
| 끝 없음 | `계속` |
| 불러오는 중 | `…` |
| 곧 끝남(강조 한 곳) | 값 + `■ 곧 만료` (■만 `--mp-accent`) |
| 변화 | `+12` / `-3` (색 없음) |

## 데모
```html demo
<dl class="mp-labels-numbers">
  <dt>용량</dt><dd>120MB</dd>
  <dt>기간</dt><dd>09:00–18:00</dd>
  <dt>변화</dt><dd>-3</dd>
  <dt>만료</dt><dd class="is-empty" aria-label="없음">—</dd>
</dl>
```

## 코드
```css
.mp-labels-numbers { display: grid; grid-template-columns: auto auto; gap: 0.5em 2.5em; margin: 0; }
.mp-labels-numbers dt { align-self: center; font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-labels-numbers dd {
  margin: 0; text-align: right; white-space: nowrap;
  font-variant-numeric: tabular-nums;
  font-size: var(--mp-size-body); letter-spacing: var(--mp-tracking-body); opacity: var(--mp-opacity-body);
}
.mp-labels-numbers dd.is-empty { opacity: var(--mp-opacity-muted); }
```

```js
// 표기 도우미 — 한국어 화면 기준
const mpFormat = {
  number: (n) => (n < 0 ? '-' : '') + Math.abs(n).toLocaleString('ko-KR', { maximumFractionDigits: 1 }),
  bytes: (b) => { const u = ['B', 'KB', 'MB', 'GB', 'TB']; let i = 0; while (b >= 1000 && i < u.length - 1) { b /= 1000; i++; } return (i ? +b.toFixed(1) : b) + u[i]; },
  date: (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
  time: (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`,
  range: (a, b) => `${a}–${b}`,
  relative: (d, now = new Date()) => { const m = Math.floor((now - d) / 60000); return m < 1 ? '방금' : m < 60 ? `${m}분 전` : m < 1440 ? `${Math.floor(m / 60)}시간 전` : mpFormat.date(d); },
  empty: (v) => (v == null || v === '' ? '—' : v),
};
```

## 앱
- iOS: `Date.FormatStyle`의 로캘 기본값(오후 3:13)을 쓰지 않고 고정 형식 `.dateTime.year().month(.twoDigits).day(.twoDigits)` 조합 또는 `DateFormatter.dateFormat = "yyyy-MM-dd"`, `"HH:mm"`. `ByteCountFormatter` 결과(`120 MB`)는 공백을 지워 쓴다.
- Android: `DateTimeFormatter.ofPattern("yyyy-MM-dd")`, `"HH:mm"`. `Formatter.formatShortFileSize` 결과의 공백을 지운다.
- 숫자 열 정렬: SwiftUI `.monospacedDigit()`, Compose `TextStyle(fontFeatureSettings = "tnum")`.
- 접근성: 값 `Text`에 `accessibilityLabel("120메가바이트")`처럼 읽기 좋은 형태를 줄 수 있다. `—`는 "없음".
- 위젯·잠금 화면처럼 좁은 자리는 연도를 먼저 뺀다. OS 시계·시스템 날짜 표시는 예외.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 단위 붙여 쓰기, 천 단위 쉼표, ISO 날짜, 24시간, en dash 범위, 값 없음은 옅은 `—`, 숫자 열은 오른쪽 정렬·고정폭 숫자, `<time datetime>`.
- 하지 말 것: 물결표 범위, `오후 3:13`, `120 MB`처럼 띄우기, 음수에 U+2212 `−`, 큰 숫자를 굵게·색으로, 행마다 같은 단위 반복, 정보 없는 반복 표기, "N/A"·"null"·"0"으로 빈 값 표시.
