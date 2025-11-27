import { db, schema } from "core/database";
import { slugify } from "core/utils/slugify-string";
import type { CreatePostDto } from "feat/main/schema/posts";

export namespace PostsRepo {
  export const create = async (userId: string, data: CreatePostDto) => {
    const [post] = await db
      .insert(schema.posts)
      .values({ author_id: userId, slug: slugify(data.title), ...data })
      .returning();
    return post ?? null;
  };
}
