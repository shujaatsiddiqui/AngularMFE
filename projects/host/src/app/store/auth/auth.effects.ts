// src/app/store/auth/auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { User } from './auth.model';

// Mock service to simulate login
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) => {
        // Simulating static user data for successful login
        const mockUser: User = {
          id: '1',
          email: 'user@example.com',
          name: 'John Doe',
          accessToken: 'dummy-access-token',
          refreshToken: 'dummy-refresh-token',
        };
        return of(AuthActions.loginSuccess({ user: mockUser }));
      })
    )
  );
}
