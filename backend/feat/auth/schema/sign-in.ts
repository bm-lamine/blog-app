import z from "zod";

export const signIn = z.object({
  email: z.email(),
  password: z.string(),
});
