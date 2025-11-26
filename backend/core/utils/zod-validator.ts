import { zValidator } from "@hono/zod-validator";
import type { ValidationTargets } from "hono";
import type { ZodType } from "zod";
import ApiError from "./api-response";
import { STATUS_CODE } from "./status-code";

export function zodValidator<
  T extends ZodType,
  Target extends keyof ValidationTargets
>(target: Target, schema: T) {
  return zValidator(target, schema, async (res, ctx) => {
    if (!res.success) {
      const errors = new ApiError(
        res.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        }))
      );

      return ctx.json(errors.toJSON(), STATUS_CODE.UNPROCESSABLE_ENTITY);
    }
  });
}
