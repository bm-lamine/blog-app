import { auth } from "core/middlewares/jwt";
import ApiError from "core/utils/api-response";
import { createApp } from "core/utils/create-app";
import { STATUS_CODE } from "core/utils/status-code";
import { UsersRepo } from "feat/users/repository";

const profile = createApp();

profile.get("/", auth, async (ctx) => {
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
