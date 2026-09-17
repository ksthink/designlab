import type { APIRoute } from 'astro';
import { LIBRARY_KIND, libraryMarkdown, type LibraryKind } from '../../lib/docs';

export const getStaticPaths = () => LIBRARY_KIND.map((k) => ({ params: { kind: k.id } }));

export const GET: APIRoute = ({ params }) =>
  new Response(libraryMarkdown(params.kind as LibraryKind), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
