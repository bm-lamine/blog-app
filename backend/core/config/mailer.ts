import { env } from "core/config/env";
import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
});
