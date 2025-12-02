import { schema } from "core/database";
import type { InferSelectModel } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export namespace PostsDto {
  export const select = createSelectSchema(schema.posts, {
    id: z.nanoid(),
    published_at: z.coerce.date(),
    cover: z.url(),
  });

  export const create = createInsertSchema(schema.posts, {
    cover: z.url(),
  }).omit({ id: true, author_id: true, published_at: true });

  export const update = createUpdateSchema(schema.posts, {
    cover: z.url(),
  }).omit({ id: true });
}

export type SelectPostDto = z.infer<typeof PostDto.select>;
export type CreatePostDto = z.infer<typeof PostDto.create>;
export type UpdatePostDto = z.infer<typeof PostDto.update>;

export type Post = InferSelectModel<typeof schema.posts>;
