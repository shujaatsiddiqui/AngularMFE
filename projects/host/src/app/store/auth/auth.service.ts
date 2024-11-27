import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from './auth.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store) { }

  login(email: string, password: string): Observable<User> {
    const user: User = {
      id: '1',
      email: 'shujaat@example.com',
      name: 'Shujaat',
      accessToken: 'dummyAccessToken',
      refreshToken: 'dummyRefreshToken'
    };

    return of(user); // Returning hardcoded user data with tokens included
  }
}
