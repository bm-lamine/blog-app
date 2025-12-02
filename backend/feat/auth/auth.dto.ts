import z from "zod";

export namespace AuthDto {
  export const signin = z.object({
    email: z.email(),
    password: z.string(),
  });

  export const signup = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
  });

  export const verifyEmail = z.object({
    email: z.email(),
    token: z.string().length(6),
  });
}
