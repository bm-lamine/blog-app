import { createApp } from "core/utils/create-app";
import { posts } from "./posts/posts.api";

const app = createApp();

app.route("/posts", posts);

export { app as api };
