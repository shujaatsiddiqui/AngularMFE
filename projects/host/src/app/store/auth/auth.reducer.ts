// src/app/store/auth/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.model';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loginError: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loginError: error,
  }))
);
