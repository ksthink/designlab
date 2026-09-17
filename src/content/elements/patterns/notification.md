---
id: notification
name: 알림 문구
nameEn: Notification
category: patterns
summary: 푸시 알림은 OS가 그리므로 모양이 아니라 문구로 metaphr답게. 제목은 명사 하나, 본문은 사실 한 문장.
aliases: [알림 문구, notification, 푸시 알림, push, 알림, 리마인더, reminder, 로컬 알림, 알림 메시지, 알림 채널]
platforms: [ios, android]
status: proposed
pillars: [minimalism]
tokens: [--mp-border, --mp-line, --mp-size-small, --mp-tracking-small, --mp-size-kicker, --mp-tracking-meta, --mp-size-meta, --mp-opacity-meta, --mp-opacity-body, --mp-grid-bg, --mp-ink]
effects: []
related: [microcopy, toast, banner, labels-numbers, app-icon, widget]
---

## 용도
앱 밖에서 사용자가 알아야 할 일(예약한 시각, 끝난 작업, 곧 만료, 되돌릴 수 없는 변화)을 알릴 때만 쓴다.
광고·재방문 유도·"오랜만이에요" 알림은 보내지 않는다. 앱 안에서 알리는 것은 `toast`·`banner`, 늘 보여야 하는 값은 `widget`.

## 생김새
**구조**
- 모양은 OS가 정한다(예외): 둥근 카드, 시스템 서체, 앱 아이콘, 시각 표시 — 바꿀 수 없다. 대신 **문구·묶음·빈도 규칙**을 지킨다.
- 구성: 제목(title) · 본문(body) · 선택 행동(action) 0–2개 · 묶음 키(thread/group).
- 부제(iOS subtitle)는 쓰지 않는다. 이미지 첨부는 넣지 않는다(필요하면 앱의 1비트 그림 하나).

**문구 규칙**
- 제목: 가장 짧은 명사 또는 대상 이름. 앱 이름을 반복하지 않는다(OS가 이미 표시).
- 본문: 사실 한 문장, 합쇼체, 느낌표·이모지·"저는" 없음. 원인 + 필요한 행동 순서.
- 숫자·시각·날짜는 `labels-numbers` 형식(`3일`, `21:00`, `09.17`).
- 진행 중 알림은 "명사 + 중…"(`…` 한 글자).
- 문구 예:
  | 종류 | 제목 | 본문 |
  |---|---|---|
  | 예약 | 저녁 기록 | 오늘 한 줄을 적을 시간입니다. |
  | 완료 | 내보내기 | 12개 항목을 저장했습니다. |
  | 만료 | 구독 | 3일 뒤 끝납니다. |
  | 실패 | 동기화 | 연결이 끊겼습니다 — 앱을 열면 다시 시도합니다. |
  | 진행 | 지도 | 내려받는 중… 42% |
  | 묶음 요약 | 리듬 | 새 기록 3개 |

**수치**
- 제목 10자 이내, 본문 40자 이내(잠금 화면에서 두 줄 안에 끝나게).
- 행동 버튼 1–2개, 각 2–4자 동사("기록", "미루기", "열기").
- 같은 종류 알림 하루 1회 기본, 사용자가 정한 빈도만 늘린다.

**반응형**
| 표시 위치 | 보이는 양 | 문구 기준 |
|---|---|---|
| iPhone SE 잠금 화면·배너 | 제목 1줄 + 본문 약 2줄(한글 20자 안팎 × 2) | 본문 40자 이내 |
| iPhone 표준·Pro Max, iPad | 본문 2–4줄 | 늘어나도 한 문장 |
| Apple Watch short-look | 앱 아이콘 + 제목만 | 제목만으로 뜻이 통하게 |
| Android compact(600dp 미만) 접힘 | 제목 1줄 + 본문 1줄 말줄임 | 첫 20자에 핵심 |
| Android 펼침·medium/expanded(600·840dp 이상) | `BigTextStyle` 전체 | 둘째 문장은 여기만 |
| Wear OS | 제목 + 본문 앞부분 | 제목 10자 이내 |
- 긴 내용은 펼침(iOS long-look, Android `BigTextStyle`)에만 두고 첫 줄에 핵심을 둔다.
- 웹 푸시는 만들지 않는 것이 기본이다. 만들면 같은 문구 규칙, 아이콘은 192px 앱 아이콘(OS·브라우저 모양 예외).

**접근성**
- VoiceOver·TalkBack은 제목 → 본문 순으로 읽는다. 기호(`■`, `>`)를 문구에 넣지 않는다.
- 소리·진동은 OS 기본, 긴급하지 않으면 `passive`/`IMPORTANCE_LOW`.
- 행동 버튼 이름은 동사만으로 뜻이 통하게("확인" 대신 "기록").
- **아이콘 없이도 읽혀야 한다**: 워치·음성 읽기·일부 런처는 아이콘을 생략한다. 뜻을 아이콘·색(Android `setColor`)에 싣지 않고 제목·본문 글자로 말한다.
- 제목과 본문이 같은 말을 반복하지 않게 — 스크린리더가 두 번 읽는다.
- 시각은 읽히는 형식으로: `21:00`(TalkBack "21시"), 상대 시각이 필요하면 "3일 뒤". `D-3`처럼 읽기 어려운 표기 금지.
- 큰 글자 설정: 알림 글자 크기는 OS가 키운다(예외). 글자가 커져 잘려도 첫 문장 앞부분에 핵심이 남게 쓴다.
- 행동 버튼은 잠금 상태에서 실행 전에 인증을 요구하도록(`.authenticationRequired`, `setAuthenticationRequired(true)`) — 데이터를 바꾸는 행동에만.

**조합 규칙**
- 알림 → 탭 → 해당 화면으로 바로 이동(딥링크). 그 화면에서 강조가 필요하면 `status-dot` 하나.
- 되돌릴 수 없는 일(삭제·결제)은 알림에서 실행하지 않는다 → 앱을 열어 `confirm-step`.
- 앱이 앞에 떠 있을 때 도착한 알림은 OS 배너 대신 `toast`로 한 번만(iOS `willPresent`에서 `[]` 반환, Android 포그라운드 처리).
- 같은 정보를 늘 봐야 하면 알림을 반복하지 말고 `widget`.
- 권한 요청 흐름: `onboarding` 설명 장 또는 알림이 필요한 순간의 설명 → OS 권한 대화상자(예외) → 거부 시 `settings` 알림 행이 "꺼짐"과 OS 설정 이동을 보여 준다.

## 상태
| 상태 | 표현 |
|---|---|
| 새 알림 | OS 배너·소리(채널 설정 따름) |
| 묶음 | 같은 `threadIdentifier`/`setGroup`, 요약 "새 기록 3개" |
| 진행 중 | Android `setProgress` + `setOngoing(true)`, iOS는 Live Activity 또는 완료 시 한 번 |
| 갱신 | 같은 식별자로 덮어쓰기(새 알림을 쌓지 않는다) |
| 끝남·무효 | 조건이 사라지면 `removeDeliveredNotifications`/`cancel`로 지운다 |
| 권한 없음 | 앱 안 설정 행에 "꺼짐" 표시 + OS 설정으로 가는 행 |
| 앱 아이콘 배지 | 읽지 않은 수가 의미 있을 때만. OS 모양 그대로(예외) |

## 데모
```html demo
<div class="mp-notification-row">
  <div class="mp-notification">
    <p class="mp-notification-app">리듬</p>
    <p class="mp-notification-title">기록</p>
  </div>
  <div class="mp-notification">
    <p class="mp-notification-app">리듬</p>
    <p class="mp-notification-title">완료</p>
    <p class="mp-notification-actions"><span>열기</span></p>
  </div>
  <div class="mp-notification">
    <p class="mp-notification-app">리듬</p>
    <p class="mp-notification-title">3개</p>
  </div>
</div>
```
데모는 문구 구조 견본이다. 실제 모양은 OS가 그린다.

## 코드
```css
.mp-notification-row { display: flex; flex-wrap: wrap; gap: 1em; }
.mp-notification {
  min-width: 8em; padding: 0.9em 1.1em;
  border: var(--mp-border) solid var(--mp-line); background: var(--mp-grid-bg); color: var(--mp-ink);
}
.mp-notification p { margin: 0; }
.mp-notification-app { font-size: var(--mp-size-kicker); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-notification-title { margin-top: 0.3em; font-size: var(--mp-size-small); letter-spacing: var(--mp-tracking-small); opacity: var(--mp-opacity-body); }
.mp-notification-actions { margin-top: 0.6em; padding-top: 0.5em; border-top: var(--mp-border) solid var(--mp-line); font-size: var(--mp-size-meta); }
```

## 앱
- **iOS**
  ```swift
  let c = UNMutableNotificationContent()
  c.title = "저녁 기록"
  c.body = "오늘 한 줄을 적을 시간입니다."
  c.threadIdentifier = "record"
  c.interruptionLevel = .active   // 시간 민감(.timeSensitive)은 사용자가 켠 경우만
  c.categoryIdentifier = "RECORD" // UNNotificationAction 제목 "기록", "미루기"
  ```
  권한은 `requestAuthorization`을 첫 실행이 아니라 알림이 필요한 순간에, 이유 화면(`onboarding`) 다음에 요청한다. provisional 권한을 먼저 검토한다.
- **Android**
  ```kotlin
  NotificationCompat.Builder(ctx, "record")
    .setSmallIcon(R.drawable.ic_stat_record) // 1비트 단색 실루엣, 24dp, 정수 배율
    .setContentTitle("저녁 기록")
    .setContentText("오늘 한 줄을 적을 시간입니다.")
    .setGroup("record")
    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
  ```
  채널 이름은 명사 하나("기록 알림"), 채널 설명 한 문장. `setColor`는 쓰지 않는다(OS 강조색 예외). Android 13+ `POST_NOTIFICATIONS` 권한도 필요한 순간에.
- 알림 모양(둥근 카드, 시스템 서체, 확장 애니메이션)은 OS 예외다. 커스텀 `RemoteViews`로 앱 모양을 흉내 내지 않는다.

## 해야 할 것 / 하지 말 것
- 해야 할 것: 사실 + 필요한 행동을 한 문장으로.
- 해야 할 것: 사용자가 켠 종류만 보내고, 앱 안 설정에서 종류별로 끌 수 있게 한다.
- 해야 할 것: 같은 대상은 묶고, 조건이 사라지면 지운다.
- 해야 할 것: 권한은 필요한 순간에 이유를 먼저 말하고 요청한다.
- 하지 말 것: "놓치지 마세요!" 같은 재촉, 느낌표, 이모지, 앱 이름을 제목에 반복.
- 하지 말 것: 하루 여러 번 같은 알림, 광고·재방문 유도.
- 하지 말 것: 되돌릴 수 없는 행동(삭제·결제)을 알림 버튼 한 번으로 실행 — 앱을 열어 `confirm-step`을 거친다.
- 하지 말 것: 컬러 small icon, 사진 첨부, 커스텀 레이아웃으로 OS 모양 바꾸기.

**자주 틀리는 것**
| 틀린 예 | 맞는 방법 |
|---|---|
| 제목 "리듬", 본문 "리듬에서 알려드립니다!" | 제목 "저녁 기록", 본문 사실 한 문장 |
| 진행률 알림을 1%마다 새로 쌓음 | 같은 id로 갱신, 끝나면 완료 한 번 |
| 앱 설치 직후 알림 권한 요청 | 필요한 순간, 이유를 먼저 |
| Android small icon에 컬러 앱 아이콘 PNG | 1비트 단색 실루엣 벡터 |
| 알림 버튼 "삭제"로 바로 삭제 | 앱을 열어 `confirm-step` |
| 조건이 끝났는데 알림 센터에 남음 | `removeDeliveredNotifications` / `cancel` |
