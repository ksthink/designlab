import type { APIRoute } from 'astro';
import { librarySchema } from '../../lib/docs';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(librarySchema, null, 2), { headers: { 'Content-Type': 'application/schema+json' } });
