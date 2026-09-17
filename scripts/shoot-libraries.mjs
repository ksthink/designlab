#!/usr/bin/env node
// 참고 라이브러리 썸네일: 각 항목 url의 메인 화면을 찍어 public/v1/libraries/shots/<kind>-<id>.webp 로 저장한다.
// 사용: npm run shots            (썸네일이 없는 항목만)
//       npm run shots -- --all   (전부 다시 찍기)
//       npm run shots -- pixelarticons piskel   (지정한 id만)
// 필요: playwright (npx playwright install chromium). 다른 chromium을 쓰려면 CHROMIUM_PATH 환경변수.
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const OUT = 'public/v1/libraries/shots';
const VIEWPORT = { width: 1280, height: 800 };
const args = process.argv.slice(2);
const all = args.includes('--all');
const only = args.filter((a) => !a.startsWith('--'));

mkdirSync(OUT, { recursive: true });
const jobs = ['sites', 'apps'].flatMap((kind) =>
  JSON.parse(readFileSync(`src/data/libraries/${kind}.json`, 'utf8')).items.map((l) => ({ kind, ...l })),
).filter((l) => (only.length ? only.includes(l.id) : all || !existsSync(`${OUT}/${l.kind}-${l.id}.webp`)));

if (!jobs.length) { console.log('찍을 항목이 없습니다.'); process.exit(0); }

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
let failed = 0;
for (const l of jobs) {
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1, colorScheme: 'light' });
  try {
    await page.goto(l.url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => page.waitForLoadState('load'));
    await page.waitForTimeout(1500);
    const png = await page.screenshot({ type: 'png' });
    // webp 변환은 브라우저 캔버스로 (추가 의존성 없이)
    const webp = await page.evaluate(async (b64) => {
      const img = new Image(); img.src = `data:image/png;base64,${b64}`; await img.decode();
      const c = document.createElement('canvas'); c.width = 960; c.height = 600;
      c.getContext('2d').drawImage(img, 0, 0, 960, 600);
      return c.toDataURL('image/webp', 0.82).split(',')[1];
    }, png.toString('base64'));
    const { writeFileSync } = await import('node:fs');
    writeFileSync(`${OUT}/${l.kind}-${l.id}.webp`, Buffer.from(webp, 'base64'));
    console.log(`✓ ${l.kind}/${l.id}  ${l.url}`);
  } catch (e) {
    failed++; console.error(`✗ ${l.kind}/${l.id}  ${l.url}  ${e.message.split('\n')[0]}`);
  } finally { await page.close(); }
}
await browser.close();
process.exit(failed ? 1 : 0);
