import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './auth.model';

export interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  user: User | null;
  is_logged_in: boolean;
}

export const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  user: null,
  is_logged_in: false
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginSuccess, (state, { access_token, refresh_token, user }) => ({
    ...state,
    access_token,
    refresh_token,
    user,
    is_logged_in: true
  })),

  on(AuthActions.logout, state => ({
    ...state,
    access_token: null,
    refresh_token: null,
    user: null,
    is_logged_in: false
  })),

  on(AuthActions.refreshAccessTokenSuccess, (state, { access_token }) => ({
    ...state,
    access_token
  })),

  on(AuthActions.tokenValidityChecked, (state, { is_valid }) => ({
    ...state,
    is_logged_in: is_valid
  }))
);
