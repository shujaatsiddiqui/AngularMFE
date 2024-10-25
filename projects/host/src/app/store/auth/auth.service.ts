import { Observable, of } from 'rxjs';
import { User } from './auth.model';
import { HttpClient } from '@angular/common/http';

export class AuthService {
  constructor(private http: HttpClient) { }

  // Hardcoded login method using the updated User model
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

  // Hardcoded signup method using the updated User model
  signup(email: string, password: string): Observable<User> {
    const newUser: User = {
      id: '2',
      email: 'newuser@example.com',
      name: 'NewUser',
      accessToken: 'newUserAccessToken',
      refreshToken: 'newUserRefreshToken'
    };

    return of(newUser); // Returning hardcoded new user with tokens included
  }

  // Hardcoded refresh token method returning only new access token
  refreshToken(refresh_token: string): Observable<{ accessToken: string }> {
    const hardcodedAccessToken = {
      accessToken: 'newDummyAccessToken'
    };

    return of(hardcodedAccessToken); // Returning hardcoded access token
  }

  // Hardcoded token validation method
  isTokenValid(accessToken: string): Observable<boolean> {
    const isValid = accessToken === 'dummyAccessToken'; // Simulate token validation
    return of(isValid); // Returning token validity
  }

  // Hardcoded logout method
  logout(): void {
    console.log("Logout successful (hardcoded)");
    // No observable needed, just a console message
  }
}
