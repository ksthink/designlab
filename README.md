# metaphr/design_lab

metaphr 디자인의 기준. 철학·토큰·서체·로고·디자인 요소를 사람과 AI가 함께 봅니다.

**https://design.metaphr.dev** · 미니멀리즘 · 픽셀아트 · 레트로 컬러

## 쓰기

```html
<link rel="stylesheet" href="https://design.metaphr.dev/v1/fonts.css">
<link rel="stylesheet" href="https://design.metaphr.dev/v1/tokens.css">
```

AI 도구에는 [`/llms.txt`](https://design.metaphr.dev/llms.txt)를 읽게 합니다.

## 고치기

```bash
npm install
npm run dev
ELEMENTS_STRICT=1 npm run build   # 요소 검증까지
```

원본 파일과 작성 규칙은 [`CLAUDE.md`](CLAUDE.md)에 있습니다.

Mulmaru 서체: SIL OFL 1.1, © 2025 Mushsooni
