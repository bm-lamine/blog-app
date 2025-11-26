import type { User } from "feat/users/schema/select-user";

export type UserEvents = {
  "user:verify-email": User;
};
