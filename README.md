# metaphr/design_lab

metaphr의 디자인 철학·토큰·폰트·로고·디자인 요소·참고 라이브러리를 사람과 AI가 함께 참조하는 정적 사이트입니다.

**https://design.metaphr.dev**

디자인의 원본은 [metaphr.dev](https://metaphr.dev)이고, design_lab은 그 디자인을 문서화해 배포합니다.

## 디자인의 세 기둥

**미니멀리즘 · 픽셀아트 · 레트로 컬러.**

- 서체: Mulmaru 하나 (굵기 400)
- 팔레트: paper `#F5F5F5` · slate `#303841` · teal `#76ABAE`(보조) · orange `#FF5722`(강조, 한 화면에 하나)
- 라이트/다크 두 테마, 1px 헤어라인, 직각 모서리, 그림자·그라데이션 없음

## 쓰는 법

### 사람

| 페이지 | 내용 |
| --- | --- |
| [/philosophy](https://design.metaphr.dev/philosophy) | 디자인 철학 |
| [/tokens](https://design.metaphr.dev/tokens) | 색·간격 등 디자인 토큰 |
| [/fonts](https://design.metaphr.dev/fonts) | 서체 |
| [/logos](https://design.metaphr.dev/logos) | 로고 |
| [/elements](https://design.metaphr.dev/elements) | 디자인 요소 (데모·코드 포함) |
| [/libraries](https://design.metaphr.dev/libraries) | 참고 사이트·앱 |
| [/ai](https://design.metaphr.dev/ai) | AI에게 넘기는 법 |

### AI

- [`/llms.txt`](https://design.metaphr.dev/llms.txt), [`/llms-full.txt`](https://design.metaphr.dev/llms-full.txt): 전체 색인
- 문서마다 마크다운 버전: `/philosophy.md`, `/elements/<id>.md`, `/libraries/sites.md` …
- [`/v1/elements.json`](https://design.metaphr.dev/v1/elements.json): 요소 색인
- [`/v1/manifest.json`](https://design.metaphr.dev/v1/manifest.json): 공개 자원 목록

### 코드에서 바로 쓰기

```html
<link rel="stylesheet" href="https://design.metaphr.dev/v1/fonts.css">
<link rel="stylesheet" href="https://design.metaphr.dev/v1/tokens.css">
```

`/v1/` 아래 자원(`tokens.css`, `tokens.json`, `fonts.css`, `fonts.json`, `logos.json`, `libraries.json` …)은 CORS가 열려 있습니다. 파일 경로와 `--mp-*` 변수 이름은 한 번 공개하면 바꾸지 않으며, 호환되지 않는 변경은 `/v2/`로 냅니다.

## 개발

```bash
npm install
npm run dev       # 개발 서버
npm run build     # dist/ 빌드
npm run preview   # 빌드 결과 미리보기
npm run shots     # 참고 라이브러리 썸네일 촬영 (-- --all, -- <id>)
```

디자인 요소를 고친 뒤에는 `ELEMENTS_STRICT=1 npm run build`로 경고까지 확인합니다.

## 원본 파일

모든 HTML 페이지, `*.md`, `llms*.txt`, `/v1/*`는 아래 원본에서 생성됩니다. 내용은 여기서만 고칩니다.

| 파일 | 내용 |
| --- | --- |
| `src/data/tokens.json` | 디자인 토큰 (W3C DTCG) |
| `src/data/fonts.json` | 서체 |
| `src/data/logos.json`, `public/v1/logos/` | 로고 |
| `src/data/icons.json`, `public/v1/icons/` | 픽셀 아이콘 |
| `src/content/philosophy.md` | 디자인 철학 |
| `src/content/elements/<category>/<id>.md` | 디자인 요소 (요소 하나 = 파일 하나) |
| `src/data/libraries/{sites,apps}.json` | 참고 라이브러리 |

자세한 작성 규칙은 [`CLAUDE.md`](CLAUDE.md)를 봅니다.

## 배포

Vercel 정적 배포. 기본값은 `SITE_URL=https://design.metaphr.dev`, `BASE_PATH=/`입니다.

## 라이선스

Mulmaru 서체: SIL OFL 1.1, © 2025 Mushsooni
