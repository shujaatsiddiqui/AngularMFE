// src/app/store/auth/auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './auth.model';

// Define the login action
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

// Define the login success action
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

// Define the login failure action
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
