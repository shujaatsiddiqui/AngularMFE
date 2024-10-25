import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from './auth.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {
    console.log('Actions observable initialized:', this.actions$);
  }


  login$ = createEffect(() => 
    this.actions$.pipe(
      tap(action => console.log('Action dispatched:', action)),
      ofType(AuthActions.login), // Listen for the login action
      switchMap(({ email, password }) =>
        
        this.authService.login(email, password).pipe(
          map((user: User) => {
            // Directly assuming login success returns a User object
            console.log('login success' + user);
            return AuthActions.loginSuccess({ user });
          }),
          catchError((error) => {
            console.error('Login error:', error); // Log the error for debugging
            return of(AuthActions.loginFailure({ error: error.message || 'Login failed' }));
          })
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
