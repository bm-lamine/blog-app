import { EMAIL_VERIFICATION_KEY } from "core/config/cache";
import { STATUS_CODE } from "core/lib/status-code";
import { zodValidator } from "core/middlewares/zod-validator";
import { redis } from "core/storage/redis";
import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { AuthDto } from "feat/auth/auth.dto";
import { UsersRepo } from "feat/users/users.repo";

const verifyEmail = createApp();

verifyEmail.post(
  "/",
  zodValidator("json", AuthDto.verifyEmail),
  async (ctx) => {
    const json = ctx.req.valid("json");
    const foundUser = await UsersRepo.findByEmail(json.email);

    if (!foundUser) {
      const errors = new ApiError();
      errors.addError({ message: "User Not Found" });
      return ctx.json(errors.toJSON(), STATUS_CODE.NOT_FOUND);
    }

    const stored = await redis.get(EMAIL_VERIFICATION_KEY(foundUser.email));
    const isValid = stored
      ? await Bun.password.verify(json.token, stored)
      : false;

    if (!isValid) {
      const errors = new ApiError();
      errors.addError({ path: ["token"], message: "Invalid Token" });
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
  }
);

export default verifyEmail;
