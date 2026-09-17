# ksthink 저장소 가치관 분석 (portfolio-analysis)

- 작성: 분석 에이전트 · 2026-09-17
- 대상: `ksthink/timeboard`, `ksthink/syn`, `ksthink/memo_markdown`, `ksthink/hihi` (+ 비교: metaphr.dev, `reference/`)
- 방법: `git clone --depth 50` (4개 모두 공개, 클론 성공) → README·설계 문서·CSS/JS/TSX/Swift 정독, 색상값 빈도 집계(벤더 번들·node_modules·venv 제외), 커밋 메시지 50개씩 검토, 라이브 URL 스크린샷.
- 클론 위치: `/tmp/claude-1000/-home-ubuntu-designlab/24b503c9-4ecb-4227-a44b-bcf9ecc9e3f2/scratchpad/repos/<repo>/` (아래 경로는 이 기준 상대경로)
- 스크린샷: `scratchpad/shot/ana-hihi-1280.png`, `ana-hihi-390.png`, `ana-timeboard-1280.png`, `ana-timeboard-390.png`
- 한계: 커밋은 최근 50개만 봤다(timeboard는 50개가 2026-09-10~12에 몰려 있음). syn·memo_markdown은 라이브 URL을 찾지 못해 스크린샷이 없다. timeboard는 로그인 화면까지만 볼 수 있었다.

강도 표기: **●●● 3개 이상 저장소** · **●● 2개** · **● 1개** (metaphr.dev는 별도 표기 "+m")

---

## 1. 저장소별 요약

| | timeboard | syn (SYNOP) | memo_markdown (memyo) | hihi (하이하잇) | metaphr.dev (비교) |
|---|---|---|---|---|---|
| 목적 | 운영자 1인용 통합 대시보드(시계·일정·메모·E2EE 볼트·PDF/이미지 도구·구독 관리) | 한국 시나리오 작가용 집필 도구(집필·끄적·구상 3모드, AI 강평) | 마크다운 WYSIWYG 노트 | 오프라인 우선 대한민국 등산 앱(iOS가 본체, 웹은 관리·레퍼런스) | 스튜디오 소개 |
| 스택 | Flask 1개 + 페이지별 단일 HTML, 바닐라 JS (`README.md:576-577`) | Next.js 16 + Tailwind v4 + Supabase + Gemini | 단일 `index.html`(~2,100줄) + Milkdown 번들 + Supabase (`README.md:227-229`) | 빌드 없는 정적 ES 모듈 웹 + SwiftUI/MapLibre Native (`README.md:59`) | 빌드 없는 정적 사이트 |
| 라이브 URL | https://ksthink.com (로그인 필요) | 없음(발견 못함) | 없음(발견 못함) | https://hihi.ksthink.com | https://metaphr.dev |
| 서체 | **Mulmaru** 단일 (`DESIGN.md:9,26`), `static/Mulmaru.woff2` 자기 호스팅 | **Mulmaru**(UI, `app/globals.css:3-6,53,59`) + 본문 선택용 KoPub바탕 등 | **MonaS12**(픽셀), 이후 폰트 선택 메뉴 추가 | **MonaS12** Regular/Bold 서브셋 (`style.css:1-14`) | Mulmaru (+ Moneygraphy-Pixel 파일 존재) |
| 색 | 흑백 회색조 + 라이트/다크, 일부 의미색 | neutral 회색 + 다크, Tailwind red/green/blue | 흰/검 + 파랑 `#005FB8`·노랑 `#f0c040` 강조, 다크 | 흑백(라이트 `#fff`/다크 `#000`) | 크림 `#F7F2E9` + 차콜 `#3A3A38` |
| 모서리 | 직각 원칙(`DESIGN.md:11`), 예외 15곳(점·차트 막대) | `rounded-lg/xl` 85곳 | 81곳 | 192곳(iOS `cornerRadius` 90) | 직각 |
| 다크 모드 | 있음(LIGHT/DARK 토글) | 있음("다크모드 우선", `README.md:529`) | 있음(D/W 토글) | 있음(OLED 순수 검정) | **없음** |
| 픽셀 요소 | `image-rendering: pixelated`(`daerim.html:16`), 모눈 배경 `--bg-grid`(`daerim.html:96`), `> ` 프롬프트 라벨·`[ 로그인 ]` | Mulmaru | 타자기 태그라인 + `_` 깜빡 커서(`index.html:1216-1225`) | 18×31 1비트 걷는 등산가 8프레임(`ios/HiHeight/HikerSprite.swift`), 픽셀 앱 아이콘(커밋 "앱 아이콘을 픽셀 등산가로") | 40×40 1비트 아이콘, 모눈, ■ 커서 |
| 데이터 | 서버 DB + 클라이언트 E2EE, 도구는 브라우저 처리 | Supabase 로그인 필수 | Supabase 로그인 필수 | **로컬 우선**, 서버는 로그인·동기화만 | — |

스크린샷 관찰:
- `ana-hihi-1280/390.png`: 흰 바탕 회색조 지도, 검정 등산로, MonaS12 굵은 제목, 둥근 카드·둥근 원형 버튼, 하단 시트. 색은 트래픽 라이트(시뮬레이터 크롬)뿐.
- `ana-timeboard-1280/390.png`: 옅은 회색 비네트(radial-gradient), 직각 1px 박스, `KSTHINK TIMEBOARD` 대문자, `> 2026-09-17 15:13:50` 터미널 프롬프트 라벨, `[ 로그인 ]` 괄호 버튼, 하단 metaphr 픽셀 로고.

---

## 2. 반복되는 가치관

### V1. 픽셀·비트맵 서체 하나 ●●●(4/4) +m
- 정의: 화면 전체를 한 가지 픽셀 서체로 통일한다.
- 근거: timeboard `DESIGN.md:9` "전 페이지가 단일 폰트(`Mulmaru`)"; syn `app/globals.css:53,59` body·`--font-sans`가 Mulmaru; hihi `WORD.md:385` "지도 라벨과 앱 UI에 **공통으로** 쓰는 폰트"(MonaS12), 커밋 "앱 지도 한글도 MonaS12 — 시스템 고딕으로 그리고 있었다"; memo `README.md:282` MonaS12, 커밋 "코드 블록 폰트를 본문과 동일한 MonaS12로 통일".
- 흐름: MonaS12(memo 4월, hihi 8월) → Mulmaru(syn 5월, timeboard·metaphr.dev 9월). 최근작일수록 Mulmaru로 수렴.
- 기둥: **픽셀아트** + **미니멀리즘**(서체 하나).

### V2. 무채색 기본, 색은 의미가 있을 때만 ●●●(3/4: timeboard·hihi·syn) +m
- 정의: 바탕 화면은 흑백(명도)만으로 위계를 만들고, 색은 기능 신호로만 쓴다.
- 근거: hihi `WORD.md:399-402` "색을 쓰지 않는다. ① 다크모드 절전 ② 정보 위계(색이 없으면 핵심에 시선이 간다) ③ 가독성"; hihi `style.css:18-19` "등산 앱: 색상 배제"; timeboard `DESIGN.md:11` "1px 단색 보더와 명도 차로만 위계", `DESIGN.md:176` "사이트가 흑백 고정이므로 **색으로 계열을 구분하지 않는다**", `DESIGN.md:192` 파이는 "투명도 램프(1 → 0.3)"; syn은 Tailwind `neutral-*` 위주(`app/globals.css:34`).
- 예외: memo는 파랑·노랑 강조색(`index.html:48,574`) — 가장 초기작.
- 기둥: **레트로 컬러**(2색 체계의 뿌리). metaphr의 "투명도 위계"와 timeboard의 "opacity 램프"가 같은 생각이다.

### V3. 장식 없음 — 그라데이션·그림자·라운드 금지 ●●(timeboard·metaphr 명문화) / 실제 준수는 ●
- 정의: 1px 선과 명도 차 외의 장식을 쓰지 않는다.
- 근거: timeboard `DESIGN.md:11`, `README.md:644`. 단 timeboard 안에서도 로그인 비네트 `login.html:68` radial-gradient, 점/차트 막대 radius(`budget.html:442,470`)가 있다. hihi·syn·memo는 둥근 모서리·그림자를 적극 사용 → **충돌 C1**.
- 기둥: **미니멀리즘**.

### V4. 빼고 덜어내기(커밋에 남은 뺄셈) ●●●(4/4) +m
- 정의: 기능·라벨·선을 추가하기보다 지운다. 제거 이유를 기록한다.
- 근거(커밋): timeboard "BUDGET 목록 위 검색창 제거", "'사용 중' 체크박스 제거", "꺾은선의 이달 경계선 제거", "'다음 결제' 라벨을 '다음'으로 축약", "시작일과 같은 날짜의 '다음 결제' 표기 생략", "만료일 없는 구독 표기를 '계속'에서 '~'로 교체", "모바일 목록 간소화"(50개 중 뺄셈 13개); hihi "미세먼지를 날씨 캐러셀 안으로 — 별도 줄 폐기", "GPX 업로드 원본 좌표 그대로 — 매칭·리샘플·스무딩 제거", "큐레이션 비움"; syn "나눔명조·노토 세리프 폰트 옵션 제거", `README.md:535-553` "비활성화된 기능" 절(PDF 생성 제거 → `window.print`로 대체); metaphr.dev "소개 문구에서 '저는' 제거".
- hihi `WORD.md:407-408` "탭을 잠그고 아이콘을 남기는 방식도 시도했으나, 그냥 없애는 쪽이 명확했다"; `WORD.md:423` "버튼 하나에 '현위치로'와 '나침반'을 합쳐 지도 위 버튼 수를 줄였다".
- 기둥: **미니멀리즘**(metaphr 소개문 "빼고 덜어내는 미학"과 일치).

### V5. 가벼움·자기 호스팅·빌드 없음 ●●●(timeboard·memo·hihi, syn은 자기 호스팅만) +m → **새 기둥 후보 "가벼움"**
- 정의: 프레임워크·CDN·빌드 단계를 최소화하고, 서체·자원을 스스로 호스팅하며, 필요할 때만 불러온다.
- 근거: timeboard `README.md:576-577` "구조는 의도적으로 단순합니다… 프레임워크를 쓰지 않고"; `DESIGN.md:13` "외부 라이브러리는 필요한 시점에 lazy load", CSP `font-src 'self'`(`DESIGN.md:288`); memo `README.md:227-228` "제로 프레임워크 / 싱글 파일"; hihi `README.md:59` "빌드 없는 정적 파일", `style.css:2-3` "로컬 번들 — CDN 미의존… woff2 서브셋(각 ~140KB) — 저데이터", `WORD.md:75-78` 외부 글리프 서버가 파일을 지워 라벨이 사라진 뒤 직접 호스팅; syn 커밋 "KoPubBatang 폰트 자체 호스팅 — CDN 링크 제거", `README.md:530` "폰트 self-hosting"; metaphr.dev `README.md` "빌드 단계가 없는 정적 사이트", 히어로용 1.5KB 서브셋.
- 기둥: 현재 세 기둥 밖. design_lab 명세의 `/v1/fonts/mulmaru.woff2` 자기 호스팅과 이미 맞닿아 있다.

### V6. 로컬 우선·클라이언트 처리·프라이버시 ●●(hihi·timeboard) → **새 기둥 후보 "기기가 먼저"**
- 정의: 핵심 기능은 네트워크·서버 없이 돌고, 민감한 데이터는 기기 안에서 처리한다.
- 근거: hihi `README.md:33-35,61-62` "서버가 죽어도 산행은 계속됩니다", `WORD.md:143-145` 국가지점번호를 직접 구현한 이유 "조난 상황은 정확히 통신이 안 될 때 온다"; timeboard `DESIGN.md:13` "클라이언트 처리 우선", `README.md:619-621` 브라우저에서 AES-GCM 암호화, 평문 미저장.
- 반례: syn·memo는 **로그인 필수 클라우드 저장**(syn `README.md:362`, memo `README.md:265-268`) → "로그인 없음"은 가치관으로 볼 근거가 없다(**열린 질문 Q4**).

### V7. 한 사람을 위한 좁은 범위 ●●●(timeboard·syn·hihi) → 후보 "한 가지 일"
- 정의: 넓은 사용자층보다 한 사람·한 상황에 딱 맞춘다.
- 근거: timeboard `README.md:571` "한 명의 운영자를 위한 단일 사용자 웹 애플리케이션"; syn `README.md:360,393` "한국 시나리오 작가를 위한", "단일 사용자 SaaS"; hihi `README.md:37` "대한민국 특화", `CLAUDE.md` "관리자 콘솔 = 운영자 1인용 도구"; 한국 맥락 고정(timeboard KST·24절기 `README.md:646-648`, memo KST 표시 `README.md:258`, syn 한국어기초사전 서울 리전).
- metaphr 소개문 "오직 '하나'에만 온전히 집중" 과 연결. 기둥: **미니멀리즘**의 제품판.

### V8. 되돌릴 수 없는 일 앞에서 한 번 멈춘다 ●●●(timeboard·hihi·syn) +memo(삭제 확인 존재)
- 정의: 삭제·다운로드·종료처럼 되돌릴 수 없는 행동에는 확인 단계와 정보(용량 등)를 둔다.
- 근거: timeboard `DESIGN.md:218` "**다운로드 액션은 반드시 이 모달로 확인 단계를 거친다** (사용자 정책)", 커밋 "메모 삭제에 확인 창 추가"; hihi `WORD.md:410-412` 등반 종료 시 무작위 2자리 숫자 입력, 커밋 "지도 다운로드 확인 창에 용량", "지도 다운 버튼에도 확인 창 — 웹에는 있고 앱만 없었다"; hihi 문구 "이 기록을 삭제할까요? 되돌릴 수 없습니다."; timeboard "삭제하면 되돌릴 수 없습니다."; syn 삭제 hover 빨강(`ProjectList.tsx:137`).
- 기둥: 새 후보 "조용하지만 안전한 인터페이스". **토마토 색의 역할 근거**(5절).

### V9. 읽는 순서대로, 요청하지 않으면 열지 않는다 ●(hihi 강함) + timeboard 부분
- 정의: 정보는 사용자가 읽는 순서로 배치하고, 요청 전엔 펼치지 않는다.
- 근거: hihi 커밋 "다운로드 확인 창을 읽는 순서대로 (사용자 지정)", "관리자 등반기록 탭 — 읽는 순서대로 다시 짰다", "측정소 시트 재구성 — 읽는 순서대로", "기록 목록 — 요청하지 않으면 열지 않는다", "측정소 시트 — 내용만큼만 높이"; timeboard `DESIGN.md:165` form-status `min-height` "메시지가 떠도 레이아웃이 흔들리지 않게", 커밋 "목록 머리를 건수 대신 보고 있는 달로".
- 기둥: 미니멀리즘(조용한 인터페이스).

### V10. 즉시·절제된 움직임 ●●(timeboard·metaphr) / 반대 사례 ●(hihi)
- 근거: timeboard `DESIGN.md:305` "**상태 전환은 즉시**: 모달·zone 전환에 트랜지션 애니메이션 없음"; memo 깜빡 커서 `step-end`(`index.html:580,1216`)·syn `steps(1)` → 계단식 모션 선호 ●●●(memo·syn·metaphr); hihi는 SwiftUI `.spring`·`.easeOut` 19회(부드러운 트윈) → **충돌 C5**.
- 기둥: **픽셀아트**(셀 단위·계단식 모션).

### V11. "왜"를 문서로 남긴다 ●●●(4/4) +m
- 근거: hihi `WORD.md:3-5` "'왜 이렇게 해뒀지?'에 답하는 것이 이 문서의 목적", `HikerSprite.swift:4-15` 왜 시트를 안 쓰는지; timeboard `DESIGN.md:70-72` 다크 보조색 명도 이유, `budget.html:308-309` 색 예외 이유; syn `README.md:535` 비활성화 기능 기록, `ISSUE.md`; metaphr.dev `README.md` "왜 낱개 파일과 합친 파일이 따로 있나".
- design_lab 자체의 존재 이유(사람·AI가 읽는 철학 문서)와 정확히 맞는다.

### V12. 터미널·레트로 컴퓨팅 어휘 ●●●(timeboard·memo·metaphr) + syn(steps 커서)
- 근거: timeboard 로그인 `login.html:168-169` 라벨 앞 `'> '`, `[ 로그인 ]`(`login.html:247`), 영문 대문자 라벨 `DESIGN.md:28`, 액션 `EDT`/`DEL`(`DESIGN.md:172`); memo `_` 커서와 오타-수정 타자기(`index.html:1216-1225`); metaphr ■ 커서·셀 단위 83ms.
- 기둥: **픽셀아트** / **레트로 컬러**의 정서.

### V13. 이모지 대신 기호 ●●(timeboard·metaphr) / 반대 ●(memo)
- 근거: timeboard `DESIGN.md:12` "이모지 미사용: ASCII 화살표와 가운뎃점"; metaphr `‹ ›`·■; hihi 커밋 "목록 꼬리표를 ... 와 - 로". 반례 memo `'가입 완료! 로그인해 주세요 🎉'`, README 🐱.

---

## 3. 디자인 규칙 후보 (철학 문서에 붙여 넣기용)

미니멀리즘
- [ ] 서체는 하나만 쓴다. UI·지도 라벨·코드 블록까지 같은 서체다. (V1)
- [ ] 위계는 크기·자간·투명도로 만든다. 색으로 계열을 나누지 않는다. (V2, timeboard `DESIGN.md:176`)
- [ ] 무언가를 더하기 전에 뺄 것을 먼저 찾는다. 라벨은 가장 짧은 형태로 줄인다("다음 결제" → "다음"). (V4)
- [ ] 같은 날짜·당연한 값처럼 정보가 없는 표기는 생략한다. (timeboard 커밋)
- [ ] 버튼 두 개가 한 가지 목적이면 하나로 합친다. (hihi `WORD.md:423`)
- [ ] 목록·시트는 내용만큼만 높이를 갖고, 요청하기 전에는 펼치지 않는다. (V9)
- [ ] 정보는 사용자가 읽는 순서로 배치한다. (V9)
- [ ] 상태 메시지 자리는 미리 확보해 레이아웃이 흔들리지 않게 한다. (`DESIGN.md:165`)
- [ ] 빈 상태와 오류 상태는 모든 목록에 둔다. (syn `README.md:528`)
- [ ] 그림자·그라데이션·둥근 모서리를 쓰지 않는다. 구분은 1px 선. (V3 — 단 C1 확인 필요)

픽셀아트
- [ ] 픽셀 그림은 1비트, 정수 배율, `image-rendering: pixelated`. (timeboard `daerim.html:16`, metaphr)
- [ ] 스프라이트 애니메이션은 프레임 간 격자를 맞춘다. 흔들림(지글거림)이 생기면 고정 부분과 움직이는 부분을 나눈다. (`HikerSprite.swift:4-12`)
- [ ] 커서·깜빡임은 `steps()`로 끊어서 움직인다. 부드러운 트윈 금지. (V10)
- [ ] 상태 전환(모달·화면 전환)은 즉시 일어난다. (`DESIGN.md:305`)
- [ ] 라벨·프롬프트에 터미널 어휘(`>`·`[ ]`·`■`·`_`)를 쓸 수 있다. 이모지는 쓰지 않는다. (V12, V13)

레트로 컬러
- [ ] 기본 화면은 두 색(배경·잉크)과 잉크의 투명도 단계뿐이다.
- [ ] 강조색 토마토 `#FF6347`은 한 화면에 한 곳, 상태를 알릴 때만 작게(점·배지·기호·선) 쓴다. 본문 크기 토마토 글자는 쓰지 않는다. (5.4절 규칙 1–9, `budget.html:308-309`)
- [ ] 강조색을 장식·브랜드 포인트·호버 색으로 쓰지 않는다.
- [ ] 값이 크다고 더 진하게 칠하지 않는다(길이·숫자가 이미 말한다). (`DESIGN.md:201`)
- [ ] raw hex 대신 토큰만 참조한다. (`DESIGN.md:34`)

제품·UX (새 기둥 후보)
- [ ] 되돌릴 수 없는 행동(삭제·종료·대용량 다운로드)에는 확인 단계를 두고, 결과 정보(용량·파일명)를 함께 보여준다. (V8)
- [ ] 핵심 기능은 네트워크 없이 동작하게 설계한다. 서버가 멈춰도 사용자의 일이 멈추지 않는다. (V6)
- [ ] 서체·글리프·라이브러리는 자기 호스팅하고, 서브셋으로 줄이고, 필요할 때 불러온다. (V5)
- [ ] 조용한 실패를 만들지 않는다. 실패 원인의 종류를 알린다. (hihi `WORD.md:460-461`, timeboard 커밋 "자료실 다운로드 실패 시 원인 종류를 함께 알린다")
- [ ] 결정의 "왜"를 코드 옆 문서나 주석에 남긴다. (V11)

---

## 4. 문체·마이크로카피 원칙

관찰된 공통 패턴
1. **합쇼체 평서·명령, 짧게**: "코스를 골라 산행을 시작하세요"(hihi), "PDF를 드래그하거나 클릭하세요"(timeboard), "노트를 선택하거나 새 노트를 만들어 시작하세요"(memo). `~하세요` timeboard 38회. 해요체는 드물다("지도 용량이 클 수 있어요." hihi 1회).
2. **빈 상태 = "아직/등록된 ~이 없습니다" + (가능하면) 다음 행동**: "아직 등반 기록이 없습니다. 코스를 선택해 등반을 시작해 보세요."(hihi), "등록된 구독이 없습니다."(timeboard), "작성된 작품이 없습니다."(syn), "해시태그가 없습니다"(memo). 4/4 저장소 공통 ●●●.
3. **진행 중 = 명사 + "중…"**: "저장 중…", "기저 지도 내려받는 중…"(hihi), "계산 중..."(timeboard, `중...` 31·`중…` 17회), "불러오는 중..."(syn). 말줄임표 표기가 `…`/`...`로 섞여 있다 → 통일 필요.
4. **되돌릴 수 없음을 직접 말한다**: "이 기록을 삭제할까요? 되돌릴 수 없습니다."(hihi), "삭제하면 되돌릴 수 없습니다."(timeboard).
5. **실패 문구는 원인 + 해결**: "위치 권한이 꺼져 있습니다. 설정에서 허용해 주세요."(hihi), "삭제하지 못했습니다 — 로그인 상태를 확인해 주세요."(hihi), "팝업이 차단되었습니다. 팝업을 허용한 뒤 다시 시도해 주세요."(syn).
6. **가운뎃점·줄표로 묶기**: "등산로·시설·등고선", "15시 기준 · 가장 가까운 관측지 기준"(스크린샷), 커밋 제목 "A — B" 형식이 hihi·timeboard 전반.
7. **커밋·문서 문체는 한다체 서술**: "이식은 끝났다, 앱이 본체다", "격자를 눈대중으로 옮겨 인물이 눌렸다", "기록 목록 — 요청하지 않으면 열지 않는다". 무엇을 했는지보다 **무엇이 문제였는지**를 쓴다("웹에는 있고 앱만 없었다").
8. **자기 지칭을 뺀다**: metaphr.dev "소개 문구에서 '저는' 제거".
9. **감탄·이모지 없음**이 최근 경향(timeboard `DESIGN.md:12`). 반례: memo "가입 완료! 로그인해 주세요 🎉"(초기작).
10. 레이블은 명사로 짧게: "코스 없음", "위치 없음", "씬 없음", 배지 "신규예정"·"해지예정", "1회성" → "1회".

원칙 문안(제안)
- 존댓말 합쇼체로 짧게 쓴다. 한 문장에 한 가지만 말한다.
- 빈 화면은 사실 한 줄 + 할 수 있는 일 한 줄.
- 진행은 "~ 중…"(말줄임표 `…` 한 글자로 통일).
- 되돌릴 수 없는 일은 "되돌릴 수 없습니다"라고 그대로 쓴다.
- 실패는 "무엇이 안 됐는지 — 무엇을 하면 되는지".
- 느낌표·이모지·자기 지칭("저는")을 쓰지 않는다.
- 라벨은 가장 짧은 명사로 줄인다.

---

## 5. 강조색 사용 실태 → 토마토 사용 규칙의 근거

> **확정(2026-09-17, 사용자)**: 토마토 `#FF6347`, 역할 = **강조**. 이 절은 값을 고르는 대신, 기존 저장소들이 강조색을 **어디에 · 얼마나 · 어떤 방식(글자/면/점/선/상태)** 으로 썼는지 정리해 토마토 규칙의 근거로 삼는다.

### 5.1 강조색 사용 목록 (위치 · 빈도 · 방식)

빈도는 벤더 코드를 뺀 소스의 값 등장 횟수(`grep` 집계). "방식": **글자**=color, **면**=background, **점**=작은 원/사각, **선**=border/caret, **상태**=조건에 따라 켜지는 표시.

| 저장소 | 색 | 빈도 | 어디에 | 방식 | 근거 |
|---|---|---|---|---|---|
| timeboard | `tomato` (#FF6347) | 1 | 자료실 항목 "공유중" 배지 | **면**(토마토) + 흰 글자, 10px, padding 1px 6px, 직각 | `static/resources.html:852` |
| timeboard | `#e74c3c` | 23 | 울린 알람 문구, 세션 타이머 임박, VAULT 옆 `*` 알림, 검색어 하이라이트 | **글자·상태** (알람/타이머/`*`), **면**(하이라이트) | `daerim.html:260,1148,1516,372` |
| timeboard | `#f2c744` on `#111` | 1 | 이달 만료 구독 D-day 배지 — "흑백 화면에서 유일하게 튀는 조합" | **면(검정)+글자(노랑)·상태**, 두 테마 같은 색 | `budget.html:308-311` |
| timeboard | `#b44` | 8 | 일요일·공휴일 날짜 숫자 | **글자** (관습 표기) | `daerim.html:812-838,952-970` |
| timeboard | `--del-*` (`#a44`/`#c44`, 다크 `#844`/`#c66`) | ~17 | 목록 행 `DEL` 버튼만 | **글자+옅은 면+선** | `knowledge.html:21-31`, `DESIGN.md:172` |
| timeboard | `#f1c40f` | 8 | 즐겨찾기한 메모 ★ | **글자(기호)·상태** | `daerim.html:585,3763` |
| timeboard | 분류 7색 / 일정 분류 5색 | 다수 | 구독 분류 글자, 캘린더 점·배지 | **글자·점·면** (범주 구분) | `budget.html:25-43,320-326`, `daerim.html:865-896` |
| hihi (iOS) | `Color.red` | 5곳 | 등반 중 HUD의 9px 점(기록 중) | **점·상태** — 흑백 HUD 안 유일한 색 | `ExploreView.swift:538` |
| hihi (iOS) | `Color.red` | | 종료 코드 불일치 시 칸 테두리 2px + 안내 글자 | **선·글자·상태** | `ClimbEndConfirmView.swift:44,50` |
| hihi (iOS) | `Color.red` | | 스와이프해야 드러나는 삭제 버튼 | **면**(숨겨져 있다 드러남) | `SwipeToDeleteRow.swift:67` |
| hihi (iOS) | `.red` + `red.opacity(0.4)` | | 이어하기 경고 글자·테두리 | **글자·선** | `ClimbResumeView.swift:49,52` |
| hihi admin | `#b00020` | 10 | danger 버튼, 경고, 미발행 항목, 로그인 오류 | **글자·선** (면 없음) | `admin/admin.css:80,184,221,335,426` |
| hihi web | 없음 | 0 | 사용자 화면은 강조색 0 (스크린샷 확인) | — | `style.css:18-19`, `ana-hihi-*.png` |
| memo | `#005FB8`(라이트)/`#f0c040`(다크) | 19/4 | 커서, 링크, 활성 태그, 체크박스, 가입 버튼 | **선(커서)·글자·면(활성)** — 테마마다 다른 강조 | `index.html:48,98,136,240,574-586` |
| memo | `--danger #e06060/#CC3333` | 2 | 오류 | **글자** | `index.html:35,52` |
| syn | `red-500/400` | ~12 | 오류 문구, 필수 `*`, 삭제 hover, 저장 실패 점, 미저장 경고 `animate-pulse` 점 | **글자·점·상태**, 삭제는 **hover에서만** | `login/page.tsx:95`, `write/new/page.tsx:57`, `ProjectList.tsx:137`, `ScenarioEditor.tsx:457,483` |
| syn | `green-500` / `#3b82f6` | | 저장됨 점, 포커스 outline·링크 | **점·상태 / 선** | `ScenarioEditor.tsx:455-461`, `globals.css:109,138` |

### 5.2 사용 방식 패턴

1. **강조 = 상태 신호** ●●●(timeboard·hihi·syn): 거의 모든 강조가 "지금 무엇이 켜져 있다/잘못됐다/곧 끝난다"를 뜻한다(공유중, 알람 울림, 기록 중, 미저장, 만료 임박, 코드 불일치). 장식·브랜드 포인트로 쓴 사례는 memo(초기작)의 커서·링크 색뿐.
2. **작게, 한 점으로** ●●●: 9px 점(hihi), 8px 점(syn), 10px 배지(timeboard), `*` 한 글자(timeboard VAULT, syn 필수). 넓은 면을 칠한 사례는 없다.
3. **흑백 속 유일한 색** ●●(timeboard·hihi): `budget.html:308-309` 주석이 원칙을 직접 말한다 — "흑백 화면에서 유일하게 튀는 조합이라 … 훑다가 바로 걸린다". hihi 사용자 화면은 강조색 0이고, 등반 HUD의 빨간 점 하나만 예외다.
4. **조건부로만 나타난다** ●●●: 평소엔 없고 조건이 참일 때 켜진다(`display:none` → 표시, `.starred`, `.warn`, `wrong ? .red : t.line`, hover에서만 빨강, 스와이프해야 보이는 삭제 버튼).
5. **파괴적 행동은 강조색을 늦게 드러낸다** ●●●: timeboard `DEL`만 전용 토큰, syn 삭제는 기본 회색 → hover 시 빨강, hihi 삭제는 스와이프 후 등장.
6. **면일 때는 글자를 반전** ●●: timeboard `tomato` 면 + 흰 글자, `#111` 면 + 노랑 글자. metaphr 방식으로는 토마토 면 + 크림 글자.
7. **양 테마 같은 색** ●: `budget.html:309` "두 테마 모두 같은 색을 쓴다" — 강조는 테마를 타지 않는다.
8. **반례 — 범주 구분에 여러 색** ●(timeboard 분류 7색, 일정 5색): 같은 저장소의 `DESIGN.md:176` "색으로 계열을 구분하지 않는다"와 충돌. 강조와 범주 색은 분리해서 다뤄야 한다.

### 5.3 대비 사실 (규칙에 반영할 제약)
| 조합 | WCAG 대비 |
|---|---|
| 차콜 `#3A3A38` / 크림 `#F7F2E9` | 10.22 |
| 토마토 `#FF6347` 글자 / 크림 바탕 | 2.64 (AA 미달, 대형 글자 3.0도 미달) |
| 크림 글자 / 토마토 면 | 2.64 |
| 토마토 / 차콜 | 3.87 (UI 요소 3:1 통과) |
| 차콜 글자 / 토마토 면 | 3.87 (대형 글자 AA 통과) |

→ 토마토만으로 작은 글자를 쓰면 읽기 어렵다. 기존 사례도 대부분 **점·배지·선·기호**였다(패턴 2).

### 5.4 토마토 사용 규칙 (근거 연결)
1. **한 화면에 토마토 한 곳.** 흑백 속 유일한 색이어야 눈에 걸린다. (패턴 3, `budget.html:308`)
2. **강조는 상태를 말한다**: 지금 켜져 있음(기록 중·공유 중), 곧 끝남, 잘못됨, 되돌릴 수 없음. 장식·로고·호버 색으로 쓰지 않는다. (패턴 1)
3. **작게 쓴다**: 8px 정사각 점(metaphr 점 크기와 같음), 배지, 한 글자 기호(`*`, `■`), 1px 선. 넓은 면·배경 전체를 칠하지 않는다. (패턴 2)
4. **글자로 쓸 때는 크게 또는 기호로**: 본문 크기 토마토 글자는 대비 2.64라 금지. 토마토 면 위 글자는 차콜(3.87)을 기본으로 하고, 크림 글자는 큰 글자에서만. (5.3)
5. **조건이 참일 때만 나타난다.** 평소 화면에는 없다. (패턴 4)
6. **파괴적 행동은 누르기 직전에만 토마토**: 삭제 버튼은 평소 잉크색, 확인 단계·hover·포커스에서 토마토. (패턴 5)
7. **색에만 의미를 맡기지 않는다**: 토마토 점 옆에 글자("기록 중", "공유중")나 기호를 함께 둔다. (hihi HUD 점 + 제목, timeboard 배지 글자)
8. **범주 구분에 토마토를 쓰지 않는다.** 범주는 투명도 램프·직접 라벨로 나눈다. (패턴 8, `DESIGN.md:192`)
9. **토마토는 투명도 위계를 갖지 않는다**(연하게 깔지 않는다) — 강조는 켜짐/꺼짐 둘뿐. (hihi `red.opacity(0.4)` 테두리 1건 외 반투명 강조 사례 없음 — 제안 규칙, 사용자 확인 권장)

---

## 6. 현재 명세와의 충돌 · 열린 질문

### 충돌
- **C1 둥근 모서리·그림자**: hihi(radius 192곳, 스크린샷의 둥근 카드·원형 버튼·하단 시트), syn(`rounded-lg/xl`, 85곳), memo(81곳). 명세는 radius 0·그림자 없음. timeboard·metaphr만 직각. → 네이티브 iOS 관습 수용인지, 이전 단계의 흔적인지?
- **C2 다크 모드**: 4/4 저장소 모두 다크 모드가 있다(hihi는 OLED 절전이라는 기능적 이유 `WORD.md:399-402`, syn "다크모드 우선" `README.md:529`). 명세는 "다크 모드 없음". 가장 강한 충돌.
- **C3 굵기**: 명세는 400 하나. hihi MonaS12 Bold(스크린샷 제목·HUD `weight: .bold`), syn 인물명 bold 700·지문 light 300(커밋 "stage-direction bold(700), parenthetical light(300)"), memo 태그라인 700, timeboard bold 31곳.
- **C4 순백·순흑**: hihi `#ffffff`/`#000000`, timeboard `#e8e8e8`/`#111`. 따뜻한 크림·차콜은 metaphr.dev에만 있다. hihi 등고선의 따뜻한 회색이 유일한 예외.
- **C5 부드러운 모션**: hihi SwiftUI `.spring(response: 0.55, dampingFraction: 0.82)`, `.easeOut` 19회, 웹 `cubic-bezier(.2,.8,.2,1)` 검색창 확장(`style.css`). 명세는 steps()/즉시 전환.
- **C6 추가 색**: timeboard의 분류 7색·일정 분류 색, memo 파랑/노랑, syn green/blue. 명세는 확장 팔레트 미정.
- **C7 서체**: hihi·memo는 MonaS12. metaphr.dev 저장소에 `Moneygraphy-Pixel.ttf`도 있음(index.html에서 1회 언급). 명세는 Mulmaru 하나.
- **C8 접근성 공백**: 4개 저장소 모두 `prefers-reduced-motion` 0건, `focus-visible`은 memo 3건뿐, `aria-*` 1~11건. metaphr.dev(3건)와 명세는 reduced-motion을 요구한다. 대비는 신경 씀(timeboard `DESIGN.md:60,65,70-72` 대비 수치 명시).
- **C9 비네트**: timeboard 로그인 `radial-gradient` 비네트(`login.html:68`, 스크린샷) — "그라데이션 장식 없음"과 충돌.

### 열린 질문 (사용자에게)
- **Q1 토마토 세부 규칙** (값 `#FF6347`·역할 '강조'는 확정): ① 크림 위 대비 2.64라 작은 글자에 쓸 수 없음 — 글자 강조가 필요하면 기호/점으로 대신할지, 글자용 보조 톤을 따로 둘지? ② 오류·삭제 같은 '위험'도 강조(토마토)로 표현할지, 잉크색+문구로만 할지? ③ 5.4절 규칙 9(토마토 반투명 금지)를 채택할지?
- **Q2 다크 모드**: metaphr 공통 규칙은 "없음"으로 확정하되, 기능적 이유가 있는 앱(야외·OLED 절전, 예: 하이하잇)은 예외로 허용할지? 허용한다면 다크 = 차콜 바탕 + 크림 글자인지, 순흑인지?
- **Q3 둥근 모서리·굵기**: iOS 네이티브 앱에도 직각·400 규칙을 강제할지, 웹 전용 규칙으로 둘지?
- **Q4 로그인·클라우드**: "로컬 우선"을 스튜디오 원칙으로 올릴지? (syn·memo는 로그인 필수 — 원칙으로 쓰면 기존 앱과 어긋남)
- **Q5 MonaS12**: 하이하잇·memyo를 Mulmaru로 옮길 계획인지, 앱별 픽셀 서체를 허용할지?
- **Q6 분류 색**: timeboard처럼 데이터 분류에 색이 필요할 때 "색 금지 + 투명도 램프"(`DESIGN.md:192`)를 따를지, 확장 팔레트로 풀지?
- **Q7 노랑**: "흑백 속 유일하게 튀는 조합"에 노랑(`#f2c744`)을 쓴 사례가 있다. 토마토 다음 색 후보로 볼지?
- **Q8 제품 가치 섹션**: 철학 문서에 세 기둥(시각) 외에 제품·UX 가치(가벼움, 기기가 먼저, 되돌릴 수 없는 일 앞에서 멈춤, 왜를 남김)를 넣을지?

---

## 7. 철학 문서 반영 제안 (philosophy.md 목차 + 문안)

```
# metaphr 디자인 철학 — 여백을 담습니다

0. 한 문장
1. 미니멀리즘 — 빼고 덜어낸다
2. 픽셀아트 — 격자 위에서 움직인다
3. 레트로 컬러 — 바랜 종이와 먹, 그리고 토마토 한 점
4. (제안) 만드는 태도 — 가볍게, 기기 먼저, 멈출 곳에서 멈추고, 이유를 남긴다
5. 말투
6. 아직 정하지 않은 것 (확장 팔레트 · 다크 모드 · 네이티브 앱 예외)
```

### 0. 한 문장
> metaphr는 기능을 더하는 대신 뺀다. 한 가지 서체, 두 가지 색, 한 점의 강조색으로, 사용자가 오직 하나에 집중하게 한다.

### 1. 미니멀리즘 — 빼고 덜어낸다
> 무언가를 더하기 전에 뺄 것을 먼저 찾는다. 서체는 하나, 굵기는 하나다. 위계는 크기·자간·투명도로 만들고, 구분은 1px 선으로 한다. 그림자·그라데이션·둥근 모서리는 쓰지 않는다. 라벨은 가장 짧은 말로 줄이고, 정보가 없는 표기는 지운다. 목록과 창은 내용만큼만 크고, 사용자가 부르기 전엔 펼치지 않는다. 정보는 읽는 순서대로 놓는다.

근거 한 줄: 모든 metaphr 프로젝트의 변경 이력은 "제거·생략·축약"으로 채워져 있다(timeboard 50개 중 13개).

### 2. 픽셀아트 — 격자 위에서 움직인다
> 글자는 비트맵 서체 Mulmaru로 쓴다. 그림은 1비트, 정수 배율로만 키운다. 움직임도 격자를 따른다: 커서는 끊어서 깜빡이고, 화면 전환은 즉시 일어난다. 부드럽게 미끄러지는 트윈은 쓰지 않는다. `>`, `[ ]`, `■`, `_` 같은 터미널의 기호가 이모지를 대신한다. 움직임을 줄이도록 설정한 사람에게는 최종 상태만 보여준다.

### 3. 레트로 컬러 — 바랜 종이와 먹, 그리고 토마토 한 점
> 바탕은 바랜 종이 크림 `#F7F2E9`, 글자는 먹빛 차콜 `#3A3A38`. 순백·순흑을 쓰지 않는다. 위계는 새 색이 아니라 잉크의 투명도로 만든다. 강조색은 토마토 `#FF6347` 하나다. 한 화면에 한 곳, 무언가가 지금 켜져 있거나 곧 끝나거나 잘못됐을 때만 작게 — 점 하나, 배지 하나, 기호 한 글자로 — 칠한다. 평소 화면에는 없다. 장식·로고·호버 색으로 쓰지 않고, 색에만 뜻을 맡기지 않도록 옆에 글자를 둔다. 작은 글자를 토마토로 쓰지 않는다. 값이 크다고 더 진하게 칠하지 않는다.

(토마토 `#FF6347` 확정 — 세부 규칙은 5.4절. 확장 팔레트: 미정.)

### 4. (제안) 만드는 태도
> **가볍게** — 빌드 단계와 프레임워크를 줄이고, 서체와 자원은 직접 호스팅하고, 필요할 때 불러온다.
> **기기 먼저** — 핵심 기능은 네트워크 없이 돌게 한다. 서버가 멈춰도 사용자의 일은 멈추지 않는다. 민감한 데이터는 기기 안에서 처리한다.
> **멈출 곳에서 멈춘다** — 되돌릴 수 없는 일 앞에서는 한 번 묻고, 용량·파일명 같은 결과를 보여준다. 조용히 실패하지 않는다.
> **이유를 남긴다** — 왜 이렇게 했는지를 코드 옆에 적는다. 사람과 AI가 같은 결정을 다시 내릴 수 있게.
> **한 사람에게 맞춘다** — 모두를 위한 기능 대신, 한 상황의 한 사람에게 딱 맞는 범위를 고른다.

(근거 강도: 가볍게 ●●●, 이유를 남긴다 ●●●, 한 사람 ●●●, 멈출 곳 ●●●, 기기 먼저 ●● — 4번 섹션 채택 여부는 Q8)

### 5. 말투
4절의 원칙 문안을 그대로 사용: 합쇼체로 짧게 · 빈 화면은 사실 + 할 일 · "~ 중…" · "되돌릴 수 없습니다" · 실패는 원인 — 해결 · 느낌표·이모지·"저는" 없음 · 라벨은 가장 짧은 명사.

### 6. 아직 정하지 않은 것
- 확장 팔레트(토마토 외): 미정. 과거 사례로 노랑(`#f2c744`, 만료 임박)이 있음.
- 다크 모드: metaphr 웹은 없음. 야외·절전이 필요한 네이티브 앱의 예외는 미정.
- 네이티브 앱의 둥근 모서리·굵기 예외: 미정.

---

## 8. 사용 라이브러리 목록 (참고 라이브러리 아카이브 초기 데이터)

- 근거 표기: `pkg`=package.json, `req`=requirements.txt, `cdn`=HTML `<script src>`/ESM URL, `spm`=XcodeGen `ios/project.yml` packages, `vend`=저장소에 복사된 파일, `api`=코드 속 호출 URL, `doc`=README 명시.
- 저장소 약칭: **TB** timeboard · **SY** syn · **MM** memo_markdown · **HH** hihi · **MP** metaphr.dev
- 상태 정의(제안): **adopted** metaphr 계열에서 이미 쓰고 원칙과 맞음 · **recommended** 원칙과 잘 맞아 새 작업에 권장 · **candidate** 쓸 수 있으나 기본 스타일을 덮어써야 하거나 조건부 · **avoid** 원칙(가벼움·빌드 없음·직각/무그림자)과 크게 어긋남
- 공식 URL은 알려진 프로젝트 주소를 적었다. 이 세션에서 접속 확인은 하지 않았다.

### 8.1 사이트용 (웹 프런트엔드 · 브라우저에서 도는 것)

| 이름 | 공식 URL | 카테고리 | 저장소 (근거) | 용도 | metaphr 원칙과 맞는 점 / 충돌 | 상태 제안 |
|---|---|---|---|---|---|---|
| Mulmaru (서체) | https://github.com/mushsooni/mulmaru | 서체 | MP, TB (`vend` static/Mulmaru.woff2), SY (`vend` public/fonts, `globals.css:3-6`) | 전 UI 단일 서체 | 맞음: 픽셀 서체·자기 호스팅·서브셋(MP 1.5KB) / 충돌 없음 | **adopted** |
| MonaS12 (서체) | (공식 URL 미확인) | 서체 | HH (`vend` fonts/, `style.css:5-13`), MM (`doc` README:282) | UI·지도 라벨 픽셀 서체 | 맞음: 픽셀 서체·서브셋 / 충돌: Bold 웨이트 사용, "재배포 라이선스 확인 필요"(HH `README.md:337`), Mulmaru 단일 원칙과 겹침 | **candidate** (라이선스 확인 전) |
| KoPub World 바탕 | https://www.kopus.org (KoPub 서체) | 서체 | SY (`vend` KoPubBatang*.woff2), MM (`cdn` jsdelivr font-kopubworld) | 원고 본문 선택 서체 | 맞음: SY는 자기 호스팅 / 충돌: 서체 둘째·Light/Bold 다중 굵기 | **candidate** (긴 글 읽기 전용) |
| 강원교육모두체 | (fonts-archive 경유, 공식 URL 미확인) | 서체 | MM (`cdn` jsdelivr fonts-archive) | 본문 선택 서체 | 충돌: CDN 의존, 서체 다중화 | **avoid** |
| MapLibre GL JS | https://maplibre.org | 지도 렌더링 | HH (`cdn` jsdelivr maplibre-gl@4.7.1 +esm/css) | 벡터 지도 | 맞음: 키·사용량 제한 없음, 스타일 JSON으로 흑백/2색 테마 가능(`WORD.md:53-56`) / 충돌: 기본 컨트롤 CSS가 둥근 모서리·그림자 → 덮어쓰기 필요(HH `style.css:221-223`에서 컨트롤 재배치) | **recommended** (지도 필요 시) |
| PMTiles (JS) | https://docs.protomaps.com/pmtiles/ | 지도 데이터 포맷 | HH (`cdn` pmtiles@3.2.1) | 단일 파일 타일, Range 요청 | 맞음: 타일 서버 없음·정적 호스팅·오프라인 복사 가능(`WORD.md:38-40`) → 가벼움·로컬 우선 | **recommended** |
| Protomaps basemap | https://protomaps.com | 지도 데이터/스타일 | HH (`doc` README 출처, 저작 표시) | 기저 지도 | 맞음: 자기 호스팅 / 주의: 외부 데모 버킷 의존으로 라벨 소실 경험(`WORD.md:75-78`) → 반드시 자기 호스팅 | **candidate** |
| supabase-js | https://supabase.com/docs/reference/javascript | 백엔드 SDK | HH (`cdn` @supabase/supabase-js@2 +esm), SY (`pkg` ^2.104.0), MM (REST 직접 호출, `doc`) | 인증·DB | 맞음: 서버 없이 DB·RLS / 충돌: 로그인 필수 구조가 로컬 우선과 긴장(Q4). UI 없음 → 스타일 충돌 없음 | **candidate** |
| @supabase/ssr | https://supabase.com/docs/guides/auth/server-side | 인증 | SY (`pkg` ^0.10.2) | Next.js 서버 세션 | Next.js 전제 | **candidate** (Next.js 쓸 때만) |
| Milkdown Crepe | https://milkdown.dev | 에디터 | MM (`pkg` @milkdown/crepe ^7.20.0, `vend` milkdown-crepe.bundle.js) | 마크다운 WYSIWYG | 충돌: 큰 번들(벤더 파일 수만 줄), 기본 테마의 radius·shadow·파랑 강조를 `!important`로 대량 덮어씀(MM `index.html:763-826`) | **avoid** (가벼움 원칙) |
| KaTeX | https://katex.org | 수식 렌더링 | MM (Milkdown Crepe 내장, `font-family:KaTeX_*`) | 수식 | 충돌: 추가 서체 다수 | **avoid** (필요 시에만) |
| Tiptap | https://tiptap.dev | 에디터 (ProseMirror) | SY (`pkg` @tiptap/* 3.22.4, import 22곳) | 시나리오 전용 노드 에디터 | 맞음: 헤드리스(기본 스타일 없음) → 직각·무그림자 유지 쉬움 / 충돌: React·빌드 필요 | **candidate** (에디터 필요 시 Milkdown 대신) |
| Next.js | https://nextjs.org | 프레임워크 | SY (`pkg` next 16.2.4) | 앱 라우팅·API | 충돌: 빌드 필수, 가벼움·빌드 없음 원칙과 반대. 4개 중 유일 | **avoid** (기본) / 서버 기능이 큰 제품만 예외 |
| React / React DOM | https://react.dev | UI 라이브러리 | SY (`pkg` 19.2.4) | 컴포넌트 | 충돌: 빌드 필수. TB `README.md:577` "React/Vue 등을 쓰지 않고" | **avoid** (기본) |
| Tailwind CSS | https://tailwindcss.com | CSS 프레임워크 | SY (`pkg` tailwindcss ^4) | 스타일 | 충돌: `rounded-lg/xl`·`shadow` 유틸이 손쉬워 85곳 둥근 모서리로 이어짐, 팔레트 기본값(red-500 등)이 토큰 체계 우회 | **avoid** |
| TypeScript | https://www.typescriptlang.org | 언어/도구 | SY (`pkg` ^5, "any 금지" `README.md:526`) | 타입 | 빌드 필요 / UI 충돌 없음 | **candidate** |
| esbuild | https://esbuild.github.io | 번들러 | MM (`pkg` ^0.28.0, `build-entry.js`) | Milkdown 한 번 묶기 | 맞음: 한 번 구워 정적 파일로 커밋 → 배포는 빌드 없음 | **candidate** |
| pdf-lib | https://pdf-lib.js.org | PDF | TB (`cdn` unpkg pdf-lib@1.17.1, 5페이지) | PDF 병합·서명·암호 | 맞음: 브라우저 처리(클라이언트 우선), lazy load / UI 없음 | **recommended** (PDF 기능 필요 시) |
| PDF.js | https://mozilla.github.io/pdf.js/ | PDF 렌더링 | TB (`cdn` cdnjs pdf.js 3.11.174 ×4, `vend` pdf.worker.min.js) | PDF 미리보기·변환 | 맞음: 클라이언트 처리 / 주의: 워커 파일 용량 큼 | **recommended** (필요 시 lazy) |
| JSZip | https://stuk.github.io/jszip/ | 압축 | TB (`cdn` cdnjs jszip 3.10.1) | 결과 묶어 내려받기 | 맞음: 클라이언트 처리 | **recommended** |
| SheetJS (xlsx) | https://sheetjs.com | 스프레드시트 | TB (`vend` static/xlsx.mini.min.js v0.18.5) | xlsx 미리보기 | 맞음: 자기 호스팅 mini 빌드 / 주의: npm 레지스트리 버전은 구버전 | **candidate** |
| crypto-js | https://github.com/brix/crypto-js | 해시 | TB (`cdn` cdnjs 4.2.0) | MD5·SHA-3 (Web Crypto 미지원 알고리즘) | 맞음: 필요할 때만, 나머지는 네이티브 `crypto.subtle`(`DESIGN.md:263-264`) / 주의: 프로젝트 유지보수 중단 | **candidate** |
| SparkMD5 | https://github.com/satazor/js-spark-md5 | 해시 | TB (`cdn` cdnjs 3.0.2) | 대용량 파일 MD5 | 맞음: 작음 | **candidate** |
| QRCode.js | https://github.com/davidshimjs/qrcodejs | QR | TB (`cdn` cdnjs 1.0.0) | 2FA 등록 QR | 맞음: 작음, 흑백 출력 | **candidate** |
| gif.js | https://github.com/jnordberg/gif.js | 이미지 인코딩 | TB (`cdn` unpkg 0.2.0 + 워커 blob 변환 `DESIGN.md:296-297`) | GIF 출력 | 맞음: lazy load / 주의: 오래된 프로젝트 | **candidate** |
| heic2any | https://github.com/alexcorvi/heic2any | 이미지 변환 | TB (`cdn` unpkg 0.0.4) | HEIC 입력 | lazy load | **candidate** |
| UTIF.js | https://github.com/photopea/UTIF.js | 이미지 변환 | TB (`cdn` unpkg 3.1.0) | TIFF 입출력 | lazy load | **candidate** |
| Pages CMS | https://pagescms.org | CMS (Git 기반) | MP (`doc` README:6) | 앱 목록 편집 → Git 커밋 | 맞음: 서버·DB 없음, 정적 사이트 유지 | **adopted** |

### 8.2 앱용 (네이티브 iOS)

| 이름 | 공식 URL | 카테고리 | 저장소 (근거) | 용도 | metaphr 원칙과 맞는 점 / 충돌 | 상태 제안 |
|---|---|---|---|---|---|---|
| SwiftUI | https://developer.apple.com/xcode/swiftui/ | UI 프레임워크 | HH (`ios/HiHeight/*.swift` 전부) | 앱 화면 | 맞음: 토큰을 `Theme.swift`로 옮기기 쉬움 / 충돌: `RoundedRectangle`·`.shadow`·`.spring` 기본 관습(HH `cornerRadius` 90곳, spring 2·easeOut 19), `.fontWeight`가 커스텀 서체에 안 먹음(`WORD.md:395-397`) | **adopted** (스타일은 규칙으로 덮어쓰기) |
| MapLibre Native (iOS) | https://github.com/maplibre/maplibre-native | 지도 렌더링 | HH (`spm` maplibre-gl-native-distribution exactVersion 6.27.0) | 오프라인 지도 | 맞음: 웹과 스타일 JSON 공유, `pmtiles://file://` 오프라인(`WORD.md:169-171`) / 충돌: `localIdeographFontFamily` 없음 → 한글 글리프 번들 44MB(`WORD.md:84-86`) | **recommended** (지도 필요 시) |
| supabase-swift | https://github.com/supabase/supabase-swift | 백엔드 SDK | HH (`spm` minVersion 2.51.0) | 인증·기록 동기화 | 맞음: 서버는 동기화만, 런타임은 로컬 / UI 없음 | **candidate** |
| XcodeGen | https://github.com/yonaskolb/XcodeGen | 빌드 도구 | HH (`ios/project.yml`, `CLAUDE.md` "XcodeGen 생성") | 프로젝트 파일 생성 | 맞음: 텍스트 설정으로 재현 가능, AI 에이전트가 다루기 쉬움 | **recommended** |
| 스프라이트 생성기 (자체) | — (`ios/HikerSprite-gen.py`) | 픽셀아트 도구 | HH | 1비트 스프라이트 → Swift 배열 | 맞음: 픽셀아트·손으로 고치지 않고 생성(`HikerSprite.swift:14-15`) | **adopted** (패턴으로) |

### 8.3 백엔드·서비스·데이터 (사이트·앱 공통)

| 이름 | 공식 URL | 카테고리 | 사이트/앱 | 저장소 (근거) | 용도 | 맞는 점 / 충돌 | 상태 제안 |
|---|---|---|---|---|---|---|---|
| Vercel | https://vercel.com | 호스팅 | 사이트 | TB (`vercel.json`), SY (`doc`), HH (`vercel.json`, `/api/*`), MP (`doc`) | 정적 배포·서버리스 함수 | 맞음: 빌드 없는 정적 사이트 그대로 배포 | **adopted** |
| Supabase | https://supabase.com | DB·인증 | 둘 다 | SY, MM, HH (`supabase/schema.sql`), TB(DB로 언급 `README.md:667`) | Postgres + Auth + RLS | 맞음: 서버 코드 최소 / 충돌: 로그인 필수 흐름 유도(Q4) | **candidate** |
| Cloudflare R2 | https://developers.cloudflare.com/r2/ | 파일 저장소 | 둘 다 | HH (`api` r2.dev, `scripts/r2_lib.py`, `CLOUDFLARE.md`) | 타일·팩·이미지 | 맞음: egress 무료, 정적 파일 | **recommended** |
| Flask | https://flask.palletsprojects.com | 웹 서버 | 사이트 | TB (`req`, `server.py`) | 단일 백엔드 | 맞음: "Flask 1개 + 페이지별 HTML" 단순 구조 | **candidate** |
| psycopg2 | https://www.psycopg.org | DB 드라이버 | 사이트 | TB (`req` psycopg2-binary) | Postgres 접속 | UI 무관 | **candidate** |
| holidays | https://github.com/vacanza/holidays | 날짜 데이터 | 사이트 | TB (`req`, `README.md:648`) | 한국 공휴일 | 맞음: 한국 맥락 | **recommended** |
| pypdf | https://pypdf.readthedocs.io | PDF (서버) | 사이트 | TB (`req`) | PDF 처리 | 클라이언트 처리 우선 원칙상 보조 | **candidate** |
| pyotp · qrcode | https://github.com/pyauth/pyotp · https://github.com/lincolnloop/python-qrcode | 2FA | 사이트 | TB (`req`) | TOTP | UI 무관 | **candidate** |
| google-api-python-client · google-auth | https://github.com/googleapis/google-api-python-client | 외부 API SDK | 사이트 | TB (`req`, `api` googleapis Drive·Calendar·Translation) | 자료실·캘린더 동기화·번역 | 충돌: 외부 의존·토큰 재발급 부담(`README.md:672-676`) | **candidate** |
| Google Gemini API | https://ai.google.dev | AI | 사이트 | SY (`api` generativelanguage.googleapis.com, `README.md:410`) | 시나리오 강평 | 맞음: "텍스트 근거 없이 생성 금지" 무결성 규칙 / UI 무관 | **candidate** |
| OpenWeatherMap | https://openweathermap.org/api | 날씨 API | 사이트 | TB (`api`, CSP `DESIGN.md:289-290`) | 대시보드 날씨 | 충돌: 아이콘 이미지 외부 로드(`img-src openweathermap.org`) — 픽셀 아이콘 체계와 불일치 | **candidate** |
| 공공데이터포털 (기상청·에어코리아·한국등산트레킹지원센터) | https://www.data.go.kr | 공공 API | 둘 다 | HH (`api` apis.data.go.kr ×7, `scripts/admin_server.py:689,843`, `fetch_peak_poi.py:18`) | 날씨·미세먼지·산 POI | 맞음: 한국 특화 / 주의: 출처 표기 의무 미이행(`CLAUDE.md`) | **recommended** (출처 표기 조건) |
| 한국어기초사전 API | https://krdict.korean.go.kr/openApi/openApiInfo | 공공 API | 사이트 | SY (`api`, 서울 리전 고정 커밋) | 사전 검색 | 한국 맥락 | **candidate** |
| 알라딘 API | https://www.aladin.co.kr/ttb/wblog_manage.aspx | 도서 API | 사이트 | SY (`api`) | 도서 검색 | — | **candidate** |
| OpenStreetMap / Overpass | https://www.openstreetmap.org · https://overpass-api.de | 지도 데이터 | 둘 다 | HH (`scripts/osm_*.py`, `WORD.md:99-107`) | 등산로 원본 | 주의: ODbL 출처 표시·share-alike | **recommended** (라이선스 조건) |
| Copernicus DEM | https://dataspace.copernicus.eu | 고도 데이터 | 둘 다 | HH (`scripts/add_elevation_copernicus.py`, 스크린샷 저작 표시) | 등고선·고도 | — | **candidate** |
| rasterio · numpy | https://rasterio.readthedocs.io · https://numpy.org | 데이터 파이프라인 | 도구 | HH (`scripts/build_terrain.py:24`, `add_elevation_copernicus.py:15`) | DEM 처리 | UI 무관 | **candidate** |
| go-pmtiles | https://github.com/protomaps/go-pmtiles | CLI | 도구 | HH (`scripts/build_bus_tiles.py:57`, `README.md` P1 extract) | 산별 타일 추출 | 맞음: 정적 파일 산출 | **recommended** |
| GitHub Actions | https://github.com/features/actions | CI | 사이트 | MP (`.github/workflows/content.yml`, `README.md`) | 콘텐츠 합치기 | 맞음: 실패해도 배포 사이트는 직전 상태 유지 | **adopted** |

### 8.4 관찰 — 라이브러리 선택에 드러난 원칙
1. **CDN도 출처를 좁힌다**: TB는 `unpkg.com`·`cdnjs.cloudflare.com`만 허용(`DESIGN.md:296`), HH는 `cdn.jsdelivr.net`만. 서체는 CDN을 걷어내고 자기 호스팅으로 옮겼다(SY 커밋, HH `style.css:2`). ●●●
2. **필요할 때만 불러온다**: TB 이미지·PDF 도구의 lazy load(`DESIGN.md:13,271-274`). ●
3. **브라우저 네이티브를 먼저**: SHA-1/256/512는 `crypto.subtle`, 없는 것만 crypto-js(`DESIGN.md:263-264`); AVIF는 `canvas.toBlob`; BMP는 직접 인코딩(`DESIGN.md:275-276`); SY는 PDF 라이브러리 3종을 지우고 `window.print`(`README.md:541-544`). ●●
4. **UI 킷(컴포넌트 라이브러리)을 쓴 저장소는 없다.** 스타일 충돌의 원인은 Tailwind 유틸(SY)과 Milkdown 기본 테마(MM), SwiftUI 관습(HH)이다. → 아카이브에는 "헤드리스/무스타일" 여부를 필드로 두면 좋다.
5. **최근 활동일수록 빌드 없는 쪽**: SY(최근 커밋 2026-05, Next.js) → HH(2026-08~09, 빌드 없는 ES 모듈 웹) → TB·MP(2026-09, 바닐라·정적). 단 커밋 50개만 봤으므로 TB의 시작 시점은 확인하지 못했다.
