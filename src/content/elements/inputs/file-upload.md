---
id: file-upload
name: 파일 올리기
nameEn: File upload
category: inputs
summary: 1px 선 사각 영역에 파일을 끌어다 놓거나 [ 선택 ]으로 고른다. 올린 파일은 이름·용량 한 줄로 보인다.
aliases: [파일 업로드, 파일 올리기, 첨부, 첨부 파일, 드래그 앤 드롭, 파일 선택, 사진 올리기, 이미지 업로드, file upload, dropzone, attachment, drag and drop, file picker, image upload]
platforms: [web, ios, android]
status: proposed
pillars: [minimalism, pixel-art]
tokens: [--mp-ink, --mp-bg, --mp-line, --mp-line-strong, --mp-border, --mp-grid-bg, --mp-font, --mp-size-small, --mp-tracking-small, --mp-size-meta, --mp-tracking-meta, --mp-opacity-secondary, --mp-opacity-meta, --mp-opacity-muted, --mp-opacity-link, --mp-duration-hover]
effects: [invert-hover, reduced-motion]
related: [text-action, progress-bar, labels-numbers, form-validation, confirm-step, list]
---

## 용도
사진·문서·데이터 파일을 받을 때 쓴다(프로필 사진, 첨부, 가져오기).
- 허용 형식과 최대 용량을 영역 안에 **미리** 적는다. 올린 뒤에 거절하지 않는다.
- 파일 하나만 받으면 영역 대신 `[ 선택 ]` 버튼 + 파일 이름 한 줄로 줄여도 된다.
- 올리는 중 진행은 `progress-bar`, 큰 파일·데이터 사용이 걱정되면 올리기 전에 `confirm-step`(용량 표시).

## 생김새
- 영역(드롭존)
  - 테두리 `var(--mp-border) solid var(--mp-line-button)`(조작 요소 경계 3:1), `border-radius: 0`, 배경 투명 — 점선 쓰지 않는다(점선은 "준비 중" 배지 전용)
  - 여백 `1.6em`, 최소 높이 `8em`, 내용 가운데 정렬, 줄 간격 `0.7em`
  - 1행 안내 `> 끌어다 놓기` — `>` 프롬프트 + 짧은 말, `opacity: var(--mp-opacity-secondary)`
  - 2행 `[ 선택 ]` 터미널 버튼(`text-action`), 호버 시 반전
  - 3행 조건 `PNG, JPG · 최대 10MB` — `--mp-size-meta`, `--mp-tracking-meta`, `opacity: var(--mp-opacity-meta)`
- 파일 목록(영역 아래, 간격 `0.8em`)
  - 행: 이름 왼쪽(길면 가운데 말줄임 `hiker-…-01.png`), 용량 오른쪽 `1.2MB`(`labels-numbers`, `tabular-nums`), 끝에 삭제 `×`
  - 행 높이 최소 `2.4em`, 행 사이 1px `--mp-line`
  - 올리는 중: 이름 아래 `progress-bar`(높이 `0.5em` 축소형) + `45%`
  - 완료: 진행 막대 제거, 용량만
  - 실패: 행 아래 원인·해결 문구(`form-validation` 규칙, 잉크 ■) + `[ 다시 ]`
- 이미지 파일 미리보기(선택): 행 왼쪽 `40px` 정사각 썸네일, `object-fit: cover`, 1px `--mp-line`

## 상태
| 상태 | 표현 |
|---|---|
| 기본 | 영역 1px `--mp-line` |
| 호버(영역) | 테두리 `--mp-line-strong`, `[ 선택 ]` 반전 (`--mp-duration-hover` ease) |
| 포커스 | 영역 `outline: 1px solid var(--mp-ink); outline-offset: 3px` |
| 끌어오는 중(`is-dragover`) | 테두리 `--mp-line-strong`, 배경 `--mp-grid-bg`, 안내 글자 opacity 1 |
| 허용되지 않는 파일 끌어옴 | 배경 변화 없음, 커서 `no-drop` |
| 올리는 중 | 행에 축소 `progress-bar`, 삭제 `×`는 취소 역할(`aria-label="취소"`) |
| 완료 | 이름 + 용량 |
| 실패 | 행 아래 `■`(잉크) + 문구 `10MB를 넘습니다. 더 작은 파일을 골라 주세요.` |
| 개수 가득 참 | 영역 `opacity: var(--mp-opacity-muted)`, 안내 `최대 5개` |
| 비활성 | 영역 `opacity: var(--mp-opacity-muted)`, `cursor: not-allowed` |

## 동작
### 모션
- `[ 선택 ]` 반전은 `invert-hover`(`--mp-duration-hover` ease). 끌어오기 표시는 즉시 켜고 끈다.
- 파일 행은 즉시 추가·제거한다(미끄러져 들어오지 않음). 진행 막대는 `progress-bar`의 계단 채움.
- `prefers-reduced-motion: reduce`이면 전환 없음.

### 키보드·접근성
- 진짜 `<input type="file">`을 영역 `<label>` 안에 두고 시각적으로만 숨긴다(`display: none`·`hidden` 금지 — 키보드로 닿지 않는다).
- Tab으로 입력에 포커스 → 영역에 윤곽선(`:focus-within`), Enter·Space로 파일 선택기 열기.
- `accept=".png,.jpg"`로 형식을 거르고, 조건 문구를 `aria-describedby`로 연결한다.
- 끌어다 놓기는 보조 수단이다. 모든 기능은 `[ 선택 ]`만으로 가능해야 한다.
- 파일 목록은 `<ul>`, 추가·완료·실패를 `aria-live="polite"` 영역에 한 줄로 알린다(`hiker.png 올림`).
- 삭제 `×` 버튼 `aria-label="hiker.png 삭제"`. 삭제 후 포커스는 다음 행 삭제 버튼, 없으면 영역.

### 반응형
- 터치 기기(`pointer: coarse`): 끌어다 놓기 안내를 숨기고 `[ 선택 ]`만 둔다. 영역 최소 높이 `5em`.
- 폭 480px 이하: 파일 이름 말줄임, 용량은 이름 아래 줄로 내린다.
- `[ 선택 ]` 누르는 영역 44px 이상.

## 데모
```html demo
<div class="mp-file-upload">
  <label class="mp-file-upload-zone">
    <input class="mp-file-upload-input" type="file">
    <span class="mp-file-upload-hint">&gt; 놓기</span>
    <span class="mp-file-upload-pick">[ 선택 ]</span>
    <span class="mp-file-upload-rule">10MB</span>
  </label>
  <label class="mp-file-upload-zone is-dragover">
    <input class="mp-file-upload-input" type="file">
    <span class="mp-file-upload-hint">&gt; 놓기</span>
    <span class="mp-file-upload-pick">[ 선택 ]</span>
    <span class="mp-file-upload-rule">10MB</span>
  </label>
  <ul class="mp-file-upload-list">
    <li class="mp-file-upload-row"><span>a.png</span><span>1.2MB</span><button type="button" aria-label="a.png 삭제">×</button></li>
    <li class="mp-file-upload-row"><span>b.jpg</span><span>45%</span><button type="button" aria-label="취소">×</button></li>
  </ul>
</div>
```

## 코드
```css
.mp-file-upload { display: grid; grid-template-columns: repeat(auto-fit, minmax(10em, 1fr)); gap: 0.8em; max-width: 30em; font: 400 var(--mp-size-small) / 1.4 var(--mp-font); letter-spacing: var(--mp-tracking-small); color: var(--mp-ink); }
.mp-file-upload-input { position: absolute; width: 1px; height: 1px; opacity: 0; overflow: hidden; }
.mp-file-upload-zone {
  position: relative; display: grid; justify-items: center; align-content: center; gap: 0.7em;
  min-height: 8em; padding: 1.6em; border: var(--mp-border) solid var(--mp-line-button); border-radius: 0; cursor: pointer;
  transition: border-color var(--mp-duration-hover) ease;
}
.mp-file-upload-hint { opacity: var(--mp-opacity-secondary); }
.mp-file-upload-zone:hover { border-color: var(--mp-line-strong); }
.mp-file-upload-zone:focus-within { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
.mp-file-upload-zone.is-dragover { border-color: var(--mp-line-strong); background: var(--mp-grid-bg); }
.mp-file-upload-zone.is-dragover .mp-file-upload-hint { opacity: 1; }
.mp-file-upload-zone.is-disabled { opacity: var(--mp-opacity-muted); cursor: not-allowed; }
.mp-file-upload-pick { padding: 0.2em 0.4em; transition: background var(--mp-duration-hover) ease, color var(--mp-duration-hover) ease; }
.mp-file-upload-zone:hover .mp-file-upload-pick, .mp-file-upload-zone:focus-within .mp-file-upload-pick { background: var(--mp-ink); color: var(--mp-bg); }
.mp-file-upload-rule { font-size: var(--mp-size-meta); letter-spacing: var(--mp-tracking-meta); opacity: var(--mp-opacity-meta); }
.mp-file-upload-list { grid-column: 1 / -1; margin: 0; padding: 0; list-style: none; }
.mp-file-upload-row { display: flex; align-items: center; gap: 1em; min-height: 2.4em; border-bottom: var(--mp-border) solid var(--mp-line); font-variant-numeric: tabular-nums; }
.mp-file-upload-row > span:first-child { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mp-file-upload-row button { min-width: 2.4em; min-height: 2.4em; padding: 0; border: 0; border-radius: 0; background: transparent; color: var(--mp-ink); font: inherit; opacity: var(--mp-opacity-link); cursor: pointer; }
.mp-file-upload-row button:hover, .mp-file-upload-row button:focus-visible { opacity: 1; }
.mp-file-upload-row button:focus-visible { outline: 1px solid var(--mp-ink); outline-offset: 3px; }
@media (pointer: coarse) { .mp-file-upload-hint { display: none; } .mp-file-upload-zone { min-height: 5em; } }
@media (prefers-reduced-motion: reduce) { .mp-file-upload-zone, .mp-file-upload-pick { transition: none; } }
```
데모의 두 번째 영역은 `.is-dragover`를 고정해 끌어오는 중 상태를 보여 준다.

```js
// 끌어오기 표시 + 놓은 파일을 입력과 같은 경로로 처리
(() => {
  document.querySelectorAll('.mp-file-upload-zone').forEach((zone) => {
    const input = zone.querySelector('.mp-file-upload-input');
    if (!input) return;
    const handle = (files) => {
      if (!files || !files.length) return;
      zone.dispatchEvent(new CustomEvent('mp:files', { bubbles: true, detail: { files } }));
    };
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('is-dragover'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('is-dragover'));
    zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('is-dragover'); handle(e.dataTransfer && e.dataTransfer.files); });
    input.addEventListener('change', () => handle(input.files));
  });
})();
```

## 앱
- 앱은 끌어다 놓기 대신 `[ 선택 ]` 버튼 하나(iPad 끌어다 놓기는 `.dropDestination`으로 추가 가능).
- 선택기는 OS 예외로 시스템 모양 그대로 둔다: SwiftUI `PhotosPicker`·`.fileImporter`, Compose `rememberLauncherForActivityResult(ActivityResultContracts.PickVisualMedia())`·`GetContent()`.
- 선택 후 목록은 웹과 같은 이름·용량 한 줄 행: SwiftUI `HStack { Text(name).lineLimit(1).truncationMode(.middle); Spacer(); Text(size).monospacedDigit() }` + 아래 1pt `Rectangle`.
- 모바일 데이터에서 큰 파일(예: 20MB 이상)은 올리기 전에 `confirm-step`으로 용량을 보여 준다.
- 권한(사진 접근) 거절 시 `banner`: `사진 접근이 꺼져 있습니다. 설정에서 허용해 주세요.`

## 해야 할 것 / 하지 말 것
- 해야 할 것
  - 형식·용량·개수 제한을 먼저 보여 준다.
  - 파일마다 이름·용량·진행을 한 줄로 보여 준다.
  - 실패는 파일 단위로, 원인과 해결을 한 문장씩.
  - 키보드만으로 선택·삭제가 가능하게 진짜 file input을 쓴다.
- 하지 말 것
  - 구름·화살표 일러스트, 점선 둥근 상자, 끌어올 때 확대·흔들림.
  - 끌어오기 상태를 teal·orange 면으로 칠하기.
  - `display: none`으로 file input을 숨겨 키보드 접근을 막기.
  - 올린 뒤에야 용량 초과를 알리기, 실패한 파일을 말없이 목록에서 지우기.
