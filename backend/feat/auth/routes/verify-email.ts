import { EMAIL_VERIFICATION_KEY } from "core/config/auth";
import { redis } from "core/storage/redis";
import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { STATUS_CODE } from "core/utils/status-code";
import { zodValidator } from "core/utils/zod-validator";
import { verifyEmailDto } from "feat/auth/schema/verify-email";
import { UsersRepo } from "feat/users/repository";

const verifyEmail = createApp();

verifyEmail.post("/", zodValidator("json", verifyEmailDto), async (ctx) => {
  const json = ctx.req.valid("json");
  const foundUser = await UsersRepo.findByEmail(json.email);

  if (!foundUser) {
    const errors = new ApiError();
    errors.addError({ message: "User Not Found" });
    return ctx.json(errors.toJSON(), STATUS_CODE.NOT_FOUND);
  }

  const stored = await redis.get(EMAIL_VERIFICATION_KEY(foundUser.email));
  const isValid = stored ? await Bun.password.verify(json.otp, stored) : false;

  if (!isValid) {
    const errors = new ApiError();
    errors.addError({ path: ["otp"], message: "Invalid Otp" });
    return ctx.json(errors.toJSON(), STATUS_CODE.UNPROCESSABLE_ENTITY);
  }

  const updatedUser = await UsersRepo.update(foundUser.id, {
    emailVerified: true,
  });

  if (!updatedUser) {
    const errors = new ApiError();
    errors.addError({ message: "Internal Server Error" });
    return ctx.json(errors.toJSON(), STATUS_CODE.INTERNAL_SERVER_ERROR);
  }

  return ctx.json({
    user: { ...updatedUser, password: null },
    message: "Verification Email Sent",
    next: "/sign-in",
  });
});

export default verifyEmail;
