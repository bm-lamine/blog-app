import { createApp } from "core/utils/create-app";
import { posts } from "./routes/posts";

const app = createApp();

app.route("/posts", posts);

export { app as main };
