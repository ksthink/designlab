export const VERSION = 'v1';

const trim = (s: string) => s.replace(/\/+$/, '');
const site = () => trim(import.meta.env.SITE as string);
const base = () => trim(import.meta.env.BASE_URL ?? '/');

/** base를 반영한 내부 경로. url('/fonts') → '/design_lab/fonts' (base가 /design_lab일 때), '/fonts' (base가 /일 때). */
export const url = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p === '/' ? `${base()}/` : `${base()}${p}`;
};

/** site + base + path 절대 URL. */
export const abs = (path = '/') => `${site()}${url(path)}`;

/** /v1/ 아래 파일의 절대 URL. data JSON의 file 필드(/v1/ 기준 상대 경로)에 쓴다. */
export const asset = (file: string) => abs(`/${VERSION}/${file}`);
