import { db, schema } from "core/database";
import { eq } from "drizzle-orm";
import type { CreatePostDto, UpdatePostDto } from "feat/posts/posts.dto";

export namespace PostsRepo {
  export async function getMany() {
    const posts = await db.select().from(schema.posts);
    return posts;
  }

  export async function getOne(id: string) {
    const [post] = await db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.id, id))
      .limit(1);
    return post ?? null;
  }

  export async function createOne(userId: string, data: CreatePostDto) {
    const [post] = await db
      .insert(schema.posts)
      .values({ uid: userId, ...data })
      .returning();
    return post ?? null;
  }

  export async function updateOne(id: string, data: UpdatePostDto) {
    const [post] = await db
      .update(schema.posts)
      .set({ ...data })
      .where(eq(schema.posts.id, id))
      .returning();
    return post ?? null;
  }

  export async function deleteOne(id: string) {
    const [deleted] = await db
      .delete(schema.posts)
      .where(eq(schema.posts.id, id))
      .returning();
    return deleted ?? null;
  }
}
