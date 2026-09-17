import type { APIRoute } from 'astro';
import { categoryMarkdown, elementCategories, elementMarkdown, elements } from '../../lib/docs';

/** /elements/<요소 id>.md 와 /elements/<분류 id>.md. id와 분류 id가 겹치면 elements.ts 검증에서 빌드가 멈춘다. */
export const getStaticPaths = () => [
  ...elements.map((e) => ({ params: { slug: e.id } })),
  ...elementCategories.map((c) => ({ params: { slug: c.id } })),
];

export const GET: APIRoute = ({ params }) => {
  const el = elements.find((e) => e.id === params.slug);
  return new Response(el ? elementMarkdown(el) : categoryMarkdown(params.slug!), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
