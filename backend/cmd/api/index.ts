import { env } from "core/config/env";
import { tus } from "core/storage/tus";
import { createApp } from "core/utils/create-app";
import { auth } from "feat/auth";
import { cors } from "hono/cors";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";

const app = createApp();

app.use(logger(), requestId(), cors());
app.all("/files/*", (ctx) => tus.handleWeb(ctx.req.raw));
app.route("/auth", auth);
showRoutes(app);

export default {
  fetch: app.fetch,
  port: env.API_PORT,
};
