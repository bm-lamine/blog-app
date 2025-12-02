import { mailer } from "core/config/mailer";

export class MailService {
  static async send(options: SendMailOptions) {
    return mailer.sendMail({
      from: options.from ?? "no-reply@example.com",
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }
}

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};
