import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<{ access_token: string, refresh_token: string, user: User }> {
    return this.http.post<{ access_token: string, refresh_token: string, user: User }>('/api/login', { email, password });
  }

  signup(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/signup', { email, password });
  }

  refreshToken(refresh_token: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>('/api/refresh-token', { refresh_token });
  }

  isTokenValid(access_token: string): Observable<boolean> {
    return this.http.post<boolean>('/api/check-token', { access_token });
  }

  logout(): void {
    // Handle logout logic, e.g., clear local storage
    // throw new Error("not implemented")
    console.log("not implemented")
  }
}
