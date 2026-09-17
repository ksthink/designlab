import type { APIRoute } from 'astro';
import { librariesData } from '../../lib/docs';

export const GET: APIRoute = () => Response.json(librariesData());
