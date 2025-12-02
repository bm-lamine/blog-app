import { schema } from "core/database";
import type { InferSelectModel } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";

export namespace UsersDto {
  export const select = createSelectSchema(schema.users, {
    id: z.nanoid(),
    email: z.email(),
  });

  export const create = createInsertSchema(schema.users, {
    email: z.email(),
  }).omit({ id: true });

  export const update = createUpdateSchema(schema.users, {
    email: z.email().optional(),
  }).omit({ id: true });
}

export type CreateUserDto = z.infer<typeof UsersDto.create>;
export type SelectUserDto = z.infer<typeof UsersDto.select>;
export type UpdateUserDto = z.infer<typeof UsersDto.update>;

export type User = InferSelectModel<typeof schema.users>;
