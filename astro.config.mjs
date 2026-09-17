import { defineConfig } from 'astro/config';

// 배포 위치가 정해지면 환경변수로 지정한다.
// - SITE_URL: 도메인 (예: https://design.metaphr.dev 또는 https://metaphr.dev)
// - BASE_PATH: 경로 (예: / 또는 /design_lab)
// 내부 링크는 src/lib/docs.ts의 url(), 절대 URL은 abs()를 쓴다.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://design.metaphr.dev',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'never',
  build: { format: 'file' },
});
