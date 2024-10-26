import { Observable } from 'rxjs';
declare module 'host/AuthService' {
  export class AuthService {
    login(email: string, password: string): void;
    signup(email: string, password: string): void;
    checkTokenValidity(): boolean;
    logout(): void;
    refreshAccessToken(): void;
  }
}


declare module 'auth-lib' {
  export class AuthService {
    login(email?: string, password?: string): Observable<any>;
  }
}
