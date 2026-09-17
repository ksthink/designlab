import type { APIRoute } from 'astro';
import { logosData } from '../../lib/docs';

export const GET: APIRoute = () => Response.json(logosData());
