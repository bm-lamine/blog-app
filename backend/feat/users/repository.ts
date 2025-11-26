import { db, schema } from "core/database";
import { eq } from "drizzle-orm";
import type { CreateUser } from "feat/users/schema/create-user";

export namespace UsersRepo {
  export async function findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    return user ?? null;
  }

  export async function create(data: CreateUser) {
    const [user] = await db.insert(schema.users).values(data).returning();
    return user ?? null;
  }
}
