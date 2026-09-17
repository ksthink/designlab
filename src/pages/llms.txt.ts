import type { APIRoute } from 'astro';
import { llmsTxt } from '../lib/docs';

export const GET: APIRoute = () => new Response(llmsTxt(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
