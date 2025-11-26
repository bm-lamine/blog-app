import z from "zod";

export const verifyEmailDto = z.object({
  email: z.email(),
  otp: z.string().length(6),
});
