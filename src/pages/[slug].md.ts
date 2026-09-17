import type { APIRoute } from 'astro';
import { pageMarkdown, pages, type Slug } from '../lib/docs';

export const getStaticPaths = () => pages.map((p) => ({ params: { slug: p.slug } }));

export const GET: APIRoute = ({ params }) =>
  new Response(pageMarkdown(params.slug as Slug), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
