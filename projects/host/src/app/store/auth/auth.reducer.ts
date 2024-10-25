import { createReducer, on } from '@ngrx/store';
import { initialAuthState, AuthState} from './auth.model'
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, state => {
    return { ...state, loginError: null }; // Reset login error
  }),
  // Handle login success
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,                // User now contains access and refresh tokens
    loginError: null,   // Clear login error on success
  })),

  // Handle login failure
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loginError: error,
    user: null, // Clear user data on login failure
  })),

  // Handle signup success
  on(AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    signupError: null // Clear signup error on success
  })),

  // Handle signup failure
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    signupError: error
  })),

  // Handle token validity check
  on(AuthActions.tokenValidityChecked, (state, { is_valid }) => ({
    ...state,
    isTokenValid: is_valid
  })),

  // Handle logout
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null, // Clear user on logout
  }))
);

