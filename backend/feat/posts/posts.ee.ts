import { createEmitter, defineHandlers } from "@hono/event-emitter";
import { POST_KEY, POST_TTL, POSTS_KEY } from "core/config/cache";
import { redis } from "core/storage/redis";
import type { Post } from "feat/posts/posts.dto";

export const posts_ee = createEmitter(
  defineHandlers<PostsEvents>({
    "post:cache": [
      async (c, payload) => {
        await redis.del(POSTS_KEY);
        await redis.setex(
          POST_KEY(payload.id),
          POST_TTL,
          JSON.stringify(payload)
        );
      },
    ],

    "post:delete": [
      async (c, payload) => {
        await redis.del(POSTS_KEY); // remove list cache
        await redis.del(POST_KEY(payload.id)); // remove single-post cache
      },
    ],
  })
);

export type PostsEvents = {
  "post:cache": Post;
  "post:delete": Post;
};
