import type { APIRoute } from 'astro';
import { fontsCss } from '../../lib/docs';

export const GET: APIRoute = () => new Response(fontsCss(), { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
