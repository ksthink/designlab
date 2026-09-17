import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import categories from './data/element-categories.json';

const CATEGORY_IDS = categories.categories.map((c) => c.id) as [string, ...string[]];
const kebab = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, '영문 kebab-case여야 한다');
const nonEmpty = z.string().trim().min(1);

/**
 * 디자인 요소. 파일 하나 = 요소 하나: src/content/elements/<category>/<id>.md
 * 필드 간 검증(id=파일명, related·effects·tokens 존재, 본문 섹션)은 src/lib/elements.ts에서 한다.
 */
const elements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/elements' }),
  schema: z
    .object({
      id: kebab,
      name: nonEmpty,
      nameEn: nonEmpty,
      category: z.enum(CATEGORY_IDS),
      summary: nonEmpty,
      aliases: z.array(z.union([nonEmpty, z.number().transform(String)])).nonempty(), // YAML이 숫자로 읽는 검색어(1180 등)도 문자열로
      platforms: z.array(z.enum(['web', 'ios', 'android'])).nonempty(),
      status: z.enum(['extracted', 'proposed']),
      source: nonEmpty.nullish().transform((v) => v ?? undefined), // proposed는 생략(또는 null)
      pillars: z.array(z.enum(['minimalism', 'pixel-art', 'retro-color'])).default([]),
      tokens: z.array(z.string().regex(/^--mp-[a-z0-9-]+$/, '--mp-* 변수 이름이어야 한다')).default([]),
      effects: z.array(kebab).default([]),
      related: z.array(kebab).default([]),
    })
    .strict()
    .refine((d) => d.status !== 'extracted' || !!d.source, { message: 'status가 extracted면 source가 필요하다', path: ['source'] }),
});

export const collections = { elements };
