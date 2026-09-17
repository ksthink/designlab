import type { APIRoute } from 'astro';
import { fontsData } from '../../lib/docs';

export const GET: APIRoute = () => Response.json(fontsData());
