import { STATUS_CODE } from "core/lib/status-code";
import jwt from "core/middlewares/jwt";
import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { UsersRepo } from "feat/users/users.repo";

const profile = createApp();

profile.get("/", jwt, async (ctx) => {
  const payload = ctx.get("jwtPayload");
  const foundUser = await UsersRepo.findByEmail(payload.email);

  if (!foundUser) {
    const errors = new ApiError();
    errors.addError({ message: "User Not Found" });
    return ctx.json(errors.toJSON(), STATUS_CODE.NOT_FOUND);
  }

  return ctx.json({
    user: { ...foundUser, password: null },
    payload,
  });
});

export default profile;
