import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { STATUS_CODE } from "core/utils/status-code";
import { zodValidator } from "core/utils/zod-validator";
import { signUp } from "feat/auth/schema/sign-up";
import { UsersRepo } from "feat/users/repository";

const signup = createApp();

signup.post("/", zodValidator("json", signUp), async (ctx) => {
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

  return ctx.json({
    user: { ...newUser, password: null },
    message: "Signed Up Successfully",
    next: "/verify-email",
  });
});

export default signup;
