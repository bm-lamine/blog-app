import z from "zod";

const userSchema = z.object({
  id: z.nanoid(),
  email: z.email(),
  emailVerified: z.coerce.boolean(),
});

type User = z.infer<typeof userSchema>;

export { userSchema };
export type { User };
