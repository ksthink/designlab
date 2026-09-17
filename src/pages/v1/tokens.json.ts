import type { APIRoute } from 'astro';
import { tokens } from '../../lib/tokens';

export const GET: APIRoute = () => Response.json(tokens);
