import type { APIRoute } from 'astro';
import { manifest } from '../../lib/docs';

export const GET: APIRoute = () => Response.json(manifest());
