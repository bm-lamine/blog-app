export const EMAIL_VERIFICATION_TTL = 5 * 60;
export const EMAIL_VERIFICATION_KEY = (email: string) =>
  `email-verification:${email}`;
