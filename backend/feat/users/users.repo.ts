import { db, schema } from "core/database";
import { eq } from "drizzle-orm";
import type { CreateUserDto, UpdateUserDto } from "./users.dto";

export namespace UsersRepo {
  export async function findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email))
      .limit(1);
    return user ?? null;
  }

  export async function create(data: CreateUserDto) {
    const [user] = await db.insert(schema.users).values(data).returning();
    return user ?? null;
  }

  export async function update(id: string, data: UpdateUserDto) {
    const [user] = await db
      .update(schema.users)
      .set(data)
      .where(eq(schema.users.id, id))
      .returning();
    return user ?? null;
  }
}
