import type { APIRoute } from 'astro';
import { elementsIndex } from '../../lib/docs';

export const GET: APIRoute = () => Response.json(elementsIndex());
