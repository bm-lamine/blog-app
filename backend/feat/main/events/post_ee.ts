import { createEmitter, defineHandlers } from "@hono/event-emitter";
import { POST_KEY, POST_TTL } from "core/config/cache";
import { redis } from "core/storage/redis";
import { postCollection } from "feat/main/collections/post";
import type { Post } from "feat/main/schema/posts";

export const posts_ee = createEmitter(
  defineHandlers<PostsEvents>({
    "post:created": [
      async (ctx, payload) => {
        await postCollection.documents.create({
          id: payload.id,
          title: payload.title,
          published_at: payload.published_at.getTime(),
        });
      },
      async (ctx, payload) => {
        await redis.setex(
          POST_KEY(payload.id),
          POST_TTL,
          JSON.stringify(payload)
        );
      },
    ],
  })
);

export type PostsEvents = {
  "post:created": Post;
};
