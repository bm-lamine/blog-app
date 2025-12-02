import { env } from "core/config/env";
import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { STATUS_CODE } from "core/utils/status-code";
import { zodValidator } from "core/utils/zod-validator";
import { AuthDto } from "feat/auth/auth.dto";
import { UsersRepo } from "feat/users/users.repo";
import * as jwt from "hono/jwt";
import { nanoid } from "nanoid";

const signin = createApp();

signin.post("/", zodValidator("json", AuthDto.signin), async (ctx) => {
  const json = ctx.req.valid("json");
  const foundUser = await UsersRepo.findByEmail(json.email);

  if (
    !foundUser ||
    !(await Bun.password.verify(json.password, foundUser.password))
  ) {
    const errors = new ApiError();
    errors.addError({
      path: ["email", "password"],
      message: "Invalid Credentials",
    });
    return ctx.json(errors.toJSON(), STATUS_CODE.UNPROCESSABLE_ENTITY);
  }

  const payload = {
    jti: nanoid(),
    sub: foundUser.id,
    email: foundUser.email,
  };

  return ctx.json({
    message: "sign-in route",
    user: { ...foundUser, password: null },
    access_token: await jwt.sign(payload, env.JWT_SECRET),
  });
});

export default signin;
