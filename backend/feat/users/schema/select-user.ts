import { schema } from "core/database";
import { createSelectSchema } from "drizzle-zod";
import type z from "zod";

export const userSchema = createSelectSchema(schema.users);

export type User = z.infer<typeof userSchema>;
