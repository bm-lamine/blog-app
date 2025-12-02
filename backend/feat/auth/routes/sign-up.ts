import { STATUS_CODE } from "core/lib/status-code";
import { zodValidator } from "core/middlewares/zod-validator";
import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { AuthDto } from "feat/auth/auth.dto";
import { users_ee } from "feat/users/users.ee";
import { UsersRepo } from "feat/users/users.repo";

const signup = createApp();

signup.post("/", zodValidator("json", AuthDto.signup), async (ctx) => {
  const json = ctx.req.valid("json");

  const foundUser = await UsersRepo.findByEmail(json.email);

  if (foundUser) {
    const errors = new ApiError();
    errors.addError({ path: ["email"], message: "Email Already Used" });
    return ctx.json(errors.toJSON(), STATUS_CODE.UNPROCESSABLE_ENTITY);
  }

  const data = {
    ...json,
    password: await Bun.password.hash(json.password),
  };

  const newUser = await UsersRepo.create(data);

  if (!newUser) {
    const errors = new ApiError();
    errors.addError({ message: "Internal Server Error" });
    return ctx.json(errors.toJSON(), STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  await users_ee.emitAsync(ctx, "user:verify-email", newUser);

  return ctx.json({
    user: { ...newUser, password: null },
    message: "Signed Up Successfully",
    next: "/verify-email",
  });
});

export default signup;
