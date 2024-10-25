import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';
import { AUTH_ACTION_NAMES } from './auth.enums';

export const login = createAction(
  AUTH_ACTION_NAMES.Login,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  AUTH_ACTION_NAMES.LoginSuccess,
  props<{ user: User }>()
);

export const loginFailure = createAction(
  AUTH_ACTION_NAMES.LoginFailure,
  props<{ error: string }>()
);

export const signup = createAction(
  AUTH_ACTION_NAMES.Signup,
  props<{ email: string; password: string }>()
);

export const signupSuccess = createAction(
  AUTH_ACTION_NAMES.SignupSuccess,
  props<{ user: User }>()
);

export const signupFailure = createAction(
  AUTH_ACTION_NAMES.SignupFailure,
  props<{ error: string }>()
);

export const logout = createAction(AUTH_ACTION_NAMES.Logout);

export const refreshAccessToken = createAction(
  AUTH_ACTION_NAMES.RefreshAccessToken,
  props<{ refresh_token: string }>()
);

export const refreshAccessTokenSuccess = createAction(
  AUTH_ACTION_NAMES.RefreshAccessTokenSuccess,
  props<{ access_token: string }>()
);

export const checkTokenValidity = createAction(
  AUTH_ACTION_NAMES.CheckTokenValidity,
  props<{ access_token: string }>()
);

export const tokenValidityChecked = createAction(
  AUTH_ACTION_NAMES.TokenValidityChecked,
  props<{ is_valid: boolean }>()
);
