import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';

// Assuming you have a root state that includes AuthState
export interface AppState {
  auth: AuthState;
}

// Select the entire auth state
export const selectAuthState = (state: AppState) => state.auth;

// Selector to get the user
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// Selector to check login error
export const selectLoginError = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginError
);

// Selector to check signup error
export const selectSignupError = createSelector(
  selectAuthState,
  (state: AuthState) => state.signupError
);

// Selector to check if token is valid
export const selectIsTokenValid = createSelector(
  selectAuthState,
  (state: AuthState) => state.isTokenValid
);
