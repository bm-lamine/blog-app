import { nanoid } from "nanoid";

export const generateOtp = (length?: number) => nanoid(length ?? 6);
