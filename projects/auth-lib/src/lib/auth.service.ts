import { Injectable } from '@angular/core';
import { User } from './auth.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  login(email?: string, password?: string): Observable<User> {
    const user: User = {
      id: '1',
      email: 'shujaat@example.com',
      name: 'Shujaat',
      accessToken: 'dummyAccessToken',
      refreshToken: 'dummyRefreshToken',
    };
    return of(user); // Returning hardcoded user data with tokens included
  }
}
