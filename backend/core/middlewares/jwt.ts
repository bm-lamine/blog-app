import { env } from "core/config/env";
import { jwt } from "hono/jwt";

export const auth = jwt({ secret: env.JWT_SECRET });
