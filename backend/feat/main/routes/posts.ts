import jwt from "core/middlewares/jwt";
import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { STATUS_CODE } from "core/utils/status-code";
import { zodValidator } from "core/utils/zod-validator";
import { posts_ee } from "feat/main/events/post_ee";
import { PostsRepo } from "feat/main/repository/posts";
import { createPostDto } from "feat/main/schema/posts";

const app = createApp();

app.post("/", jwt, zodValidator("json", createPostDto), async (ctx) => {
  const payload = ctx.get("jwtPayload");
  const json = ctx.req.valid("json");
  const post = await PostsRepo.create(payload.sub, json);

  if (!post) {
    const errors = new ApiError();
    errors.addError({ message: "Internal Server Error" });
    return ctx.json(errors.toJSON(), STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  await posts_ee.emitAsync(ctx, "post:created", post);

  return ctx.json({
    message: "Post Created Successfully",
    post: { ...post, author_id: null },
  });
});

export { app as posts };
