import { foreignKey, pgTableCreator } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const createTable = pgTableCreator((name) => `${name}_tbl`);

export const users = createTable("users", (c) => ({
  id: c.text().primaryKey().$defaultFn(nanoid),
  name: c.text().notNull(),
  email: c.text().notNull().unique(),
  password: c.text().notNull(),
  emailVerified: c.boolean().notNull().default(false),
}));

export const posts = createTable(
  "posts",
  (c) => ({
    id: c.text().primaryKey().$defaultFn(nanoid),
    title: c.text().notNull(),
    content: c.text().notNull(),
    cover: c.text().notNull(),
    uid: c.text().notNull(),
    published_at: c
      .timestamp({ mode: "date", withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
  }),
  (t) => [foreignKey({ columns: [t.uid], foreignColumns: [users.id] })]
);
