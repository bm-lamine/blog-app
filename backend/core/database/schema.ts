import { pgTableCreator } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const createTable = pgTableCreator((name) => `${name}_tbl`);

export const users = createTable("users", (c) => ({
  id: c.text().primaryKey().$defaultFn(nanoid),
  name: c.text().notNull(),
  email: c.text().notNull().unique(),
  password: c.text().notNull(),
  emailVerified: c.boolean().notNull().default(false),
}));
