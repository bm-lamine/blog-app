import { schema } from "core/database";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const createUser = createInsertSchema(schema.users, {
  email: z.email(),
}).omit({ id: true });

export type CreateUser = z.infer<typeof createUser>;
