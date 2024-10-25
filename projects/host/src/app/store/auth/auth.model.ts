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
  signupError: string | null; // Store error message for signup
  isTokenValid: boolean | null; // Token validity check
}

export const initialAuthState: AuthState = {
  user: null,
  loginError: null,
  signupError: null,
  isTokenValid: null,
};