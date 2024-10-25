// src/app/store/auth/auth.selectors.ts
import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.model';
import { AppState } from './app.state'; // Import the AppState interface

export const selectAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectLoginError = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginError
);
