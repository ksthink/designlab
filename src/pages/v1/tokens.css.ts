import type { APIRoute } from 'astro';
import { tokensCss } from '../../lib/tokens';

export const GET: APIRoute = () => new Response(tokensCss(), { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
