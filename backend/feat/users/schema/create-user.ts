import { schema } from "core/database";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const createUserDto = createInsertSchema(schema.users, {
  email: z.email(),
}).omit({ id: true });

export type CreateUserDto = z.infer<typeof createUserDto>;
