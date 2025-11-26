import { env } from "core/config/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
  schema: "./core/database/schema.ts",
  out: "./out/migrations",
  tablesFilter: ["*_tbl"],
});
