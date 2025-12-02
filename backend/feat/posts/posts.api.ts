import { POST_KEY, POSTS_KEY, POSTS_TTL } from "core/config/cache";
import { STATUS_CODE } from "core/lib/status-code";
import jwt from "core/middlewares/jwt";
import { zodValidator } from "core/middlewares/zod-validator";
import { redis } from "core/storage/redis";
import { createApp } from "core/utils/create-app";
import { PostsDto } from "feat/posts/posts.dto";
import { posts_ee } from "feat/posts/posts.ee";
import { PostsRepo } from "feat/posts/posts.repo";
import { HTTPException } from "hono/http-exception";
import z from "zod";

const app = createApp();

app.get("/", async (c) => {
  const cached = await redis.get(POSTS_KEY);
  const valid = cached
    ? z.array(PostsDto.select).safeParse(JSON.parse(cached))
    : null;

  const data = valid && valid.success ? valid.data : await PostsRepo.getMany();
  await redis.setex(POSTS_KEY, POSTS_TTL, JSON.stringify(data));

  return c.json({
    posts: data,
    message: "Posts Fetched Successfully",
  });
});

app.get(
  "/:id",
  zodValidator("param", z.object({ id: z.nanoid() })),
  async (c) => {
    const params = c.req.valid("param");

    const cached = await redis.get(POST_KEY(params.id));
    const valid = cached ? PostsDto.select.safeParse(JSON.parse(cached)) : null;

    const data =
      valid && valid.success ? valid.data : await PostsRepo.getOne(params.id);

    if (!data) {
      throw new HTTPException(STATUS_CODE.NOT_FOUND, {
        message: "Post Not Found",
      });
    }

    await posts_ee.emitAsync(c, "post:cache", data);

    return c.json({
      post: data,
      message: "Post Fetch Successfully",
    });
  }
);

app.post("/", jwt, zodValidator("json", PostsDto.create), async (c) => {
  const payload = c.get("jwtPayload");
  const json = c.req.valid("json");
  const post = await PostsRepo.createOne(payload.sub, json);

  if (!post) {
    throw new HTTPException(STATUS_CODE.INTERNAL_SERVER_ERROR, {
      message: "Internal Server Error",
    });
  }

  await posts_ee.emitAsync(c, "post:cache", post);

  return c.json({
    post,
    message: "Post Created Successfully",
  });
});

app.patch(
  "/:id",
  zodValidator("param", z.object({ id: z.nanoid() })),
  zodValidator("json", PostsDto.update),
  jwt,
  async (c) => {
    const params = c.req.valid("param");
    const json = c.req.valid("json");

    const found = await PostsRepo.getOne(params.id);
    if (!found) {
      throw new HTTPException(STATUS_CODE.NOT_FOUND, {
        message: "Post Not Found",
      });
    }

    const updated = await PostsRepo.updateOne(found.id, json);
    if (!updated) {
      throw new HTTPException(STATUS_CODE.INTERNAL_SERVER_ERROR, {
        message: "Internal Server Error",
      });
    }

    await posts_ee.emitAsync(c, "post:cache", updated);

    return c.json({
      post: updated,
      message: "Post Updated Successfully",
    });
  }
);

app.delete(
  "/:id",
  zodValidator("param", z.object({ id: z.nanoid() })),
  jwt,
  async (c) => {
    const params = c.req.valid("param");
    const post = await PostsRepo.deleteOne(params.id);

    if (!post) {
      throw new HTTPException(STATUS_CODE.NOT_FOUND, {
        message: "Post Not Found",
      });
    }

    await posts_ee.emitAsync(c, "post:delete", post);

    return c.json({
      post,
      message: "Post Deleted Successfully",
    });
  }
);

export { app as posts };
