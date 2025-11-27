import { createEnv } from "@t3-oss/env-core";
import z, { xid } from "zod";

export const env = createEnv({
  server: {
    API_PORT: z.coerce.number(),
    NODE_ENV: z
      .enum(["development", "production", "testing"])
      .default("development"),
    DATABASE_URL: z.url(),
    REDIS_URL: z.url(),
    // AUTH
    JWT_SECRET: z.string(),
    // SMTP
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    // S3
    S3_BUCKET: z.string().default("uploads"),
    S3_ENDPOINT: z.url().default("http://localhost:9000"),
    S3_REGION: z.string().default("us-east-1"),
    S3_ACCESS_KEY_ID: z.string().default("minio_admin"),
    S3_SECRET_ACCESS_KEY: z.string().default("minio_admin"),
    TUS_FORCE_PATH_STYLE: z.coerce.boolean().default(true),
    // TYPESENSE
    TYPESENSE_API_KEY: z.string(),
    TYPESENSE_HOST: z.string(),
    TYPESENSE_PORT: z.coerce.number(),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});
