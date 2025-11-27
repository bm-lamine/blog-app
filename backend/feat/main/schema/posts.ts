import { schema } from "core/database";
import type { InferSelectModel } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const createPostDto = createInsertSchema(schema.posts, {
  cover: z.url(),
}).omit({
  id: true,
  author_id: true,
  slug: true,
  published_at: true,
});

export type CreatePostDto = z.infer<typeof createPostDto>;
export type Post = InferSelectModel<typeof schema.posts>;
