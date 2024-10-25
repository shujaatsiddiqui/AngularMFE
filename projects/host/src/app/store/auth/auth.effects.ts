import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(({ accessToken, refreshToken, ...user }) => {
            // Assuming login success returns tokens and user
            return AuthActions.loginSuccess({ user: { ...user, accessToken: accessToken, refreshToken: refreshToken } });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      switchMap(({ email, password }) =>
        this.authService.signup(email, password).pipe(
          map((user) => AuthActions.signupSuccess({ user })),
          catchError((error) => of(AuthActions.signupFailure({ error: error.message })))
        )
      )
    )
  );

  refreshAccessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshAccessToken),
      switchMap(({ refresh_token }) =>
        this.authService.refreshToken(refresh_token).pipe(
          map(({ accessToken }) => AuthActions.refreshAccessTokenSuccess({ access_token : accessToken })),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  checkTokenValidity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkTokenValidity),
      switchMap(({ access_token }) =>
        this.authService.isTokenValid(access_token).pipe(
          map((is_valid) => AuthActions.tokenValidityChecked({ is_valid })),
          catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );
}
