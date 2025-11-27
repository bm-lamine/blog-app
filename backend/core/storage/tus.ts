import { S3Store } from "@tus/s3-store";
import { Server } from "@tus/server";
import { env } from "core/config/env";

const server = new Server({
  path: "/files",
  datastore: new S3Store({
    s3ClientConfig: {
      bucket: env.S3_BUCKET,
      endpoint: env.S3_ENDPOINT,
      region: env.S3_REGION,
      credentials: {
        accessKeyId: env.S3_ACCESS_KEY_ID,
        secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: env.TUS_FORCE_PATH_STYLE,
    },
    useTags: true,
  }),
});

export { server as tus };
