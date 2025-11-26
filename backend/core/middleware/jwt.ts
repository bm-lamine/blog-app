import { env } from "core/config/env";
import { jwt } from "hono/jwt";

export default jwt({ secret: env.JWT_SECRET });
