import { createApp } from "core/utils/create-app";
import profile from "./routes/profile";
import signin from "./routes/sign-in";
import signup from "./routes/sign-up";
import verifyEmail from "./routes/verify-email";

const app = createApp();

app.route("/sign-up", signup);
app.route("/sign-in", signin);
app.route("/profile", profile);
app.route("/verify-email", verifyEmail);

export { app as auth };
