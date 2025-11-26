import { createApp } from "core/utils/create-app";
import profile from "./routes/profile";
import signin from "./routes/sign-in";
import signup from "./routes/sign-up";

const app = createApp();

app.route("/sign-up", signup);
app.route("/sign-in", signin);
app.route("/profile", profile);

export { app as auth };
