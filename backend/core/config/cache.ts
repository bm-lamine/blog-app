export const EMAIL_VERIFICATION_TTL = 5 * 60;
export const EMAIL_VERIFICATION_KEY = (email: string) =>
  `email-verification:${email}`;

export const POSTS_KEY = `posts`;
export const POSTS_TTL = 7 * 24 * 60 * 60;

export const POST_KEY = (id: string) => `post:${id}`;
export const POST_TTL = 2 * 60 * 60;
