import { S3Client } from "bun";
import { env } from "core/config/env";

export const s3Client = new S3Client({
  bucket: env.S3_BUCKET,
  endpoint: env.S3_ENDPOINT,
  region: env.S3_REGION,
  accessKeyId: env.S3_ACCESS_KEY_ID,
  secretAccessKey: env.S3_SECRET_ACCESS_KEY,
});
