import { schema } from "core/database";
import { createUpdateSchema } from "drizzle-zod";
import z from "zod";

export const updateUserDto = createUpdateSchema(schema.users, {
  email: z.email().optional(),
}).omit({ id: true });

export type UpdateUserDto = z.infer<typeof updateUserDto>;
