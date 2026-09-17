import type { APIRoute } from 'astro';
import { LIBRARY_KIND, libraryKindData, type LibraryKind } from '../../../lib/docs';

export const getStaticPaths = () => LIBRARY_KIND.map((k) => ({ params: { kind: k.id } }));

export const GET: APIRoute = ({ params }) => Response.json(libraryKindData(params.kind as LibraryKind));
