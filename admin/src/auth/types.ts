import { User } from "@auth0/auth0-react";

export type UserType = Record<string, any> | null;

export type AuthState = {
  user: User | null;
  loading: boolean;
};

export type AuthContextValue = {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
