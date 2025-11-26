import { Hono } from "hono";
import type { JwtVariables } from "hono/jwt";

export const createApp = () => {
  return new Hono<Env>();
};

type Env = {
  Variables: JwtVariables<{
    jti: string;
    sub: string;
    email: string;
  }>;
};
