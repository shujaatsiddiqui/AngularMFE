import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              access_token: response.access_token,
              refresh_token: response.refresh_token,
              user: response.user
            })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  refreshAccessToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshAccessToken),
      mergeMap(action =>
        this.authService.refreshToken(action.refresh_token).pipe(
          map((response) =>
            AuthActions.refreshAccessTokenSuccess({ access_token: response.access_token })
          ),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  checkTokenValidity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkTokenValidity),
      mergeMap(action =>
        this.authService.isTokenValid(action.access_token).pipe(
          map(is_valid => AuthActions.tokenValidityChecked({ is_valid }))
        )
      )
    )
  );
}
