import z from "zod";

export const signUp = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});
