// src/app/store/auth/auth.model.ts
export interface User {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;          // Store the authenticated user
  loginError: string | null;  // Store error message for login
}

export const initialAuthState: AuthState = {
  user: null,
  loginError: null,
};
