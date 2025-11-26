import { schema } from "core/database";
import { createSelectSchema } from "drizzle-zod";
import type z from "zod";

export const selectUser = createSelectSchema(schema.users);

export type SelectUser = z.infer<typeof selectUser>;
