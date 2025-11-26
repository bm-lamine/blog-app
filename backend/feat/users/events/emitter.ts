import { createEmitter, defineHandlers } from "@hono/event-emitter";
import {
  EMAIL_VERIFICATION_KEY,
  EMAIL_VERIFICATION_TTL,
} from "core/config/auth";
import { redis } from "core/storage/redis";
import { MailService } from "core/utils/mail-service";
import type { UserEvents } from "./types";

export const users_ee = createEmitter(
  defineHandlers<UserEvents>({
    "user:verify-email": [
      async (_, payload) => {
        const otp = MailService.generateOtp();

        await redis.setex(
          EMAIL_VERIFICATION_KEY(payload.email),
          EMAIL_VERIFICATION_TTL,
          await Bun.password.hash(otp)
        );

        await MailService.send({
          to: payload.email,
          subject: "Welcome!",
          html: `<h1>your otp is ${otp}</h1>`,
        });
      },
    ],
  })
);
