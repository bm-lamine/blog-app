import { mailer } from "core/config/mailer";
import { nanoid } from "nanoid";

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export class MailService {
  static generateOtp = (length?: number) => nanoid(length ?? 6);

  static async send(options: SendMailOptions) {
    return mailer.sendMail({
      from: options.from ?? "no-reply@example.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}
