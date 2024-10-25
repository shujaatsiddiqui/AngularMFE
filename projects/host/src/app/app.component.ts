import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState, User } from './store/auth/auth.model';
import * as AuthActions from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // State Observables to listen to the login, signup, and token validity status
  public user$: Observable<User | null>;
  loginError$: Observable<string | null>;
  signupError$: Observable<string | null>;
  isTokenValid$: Observable<boolean | null>;

  constructor(private store: Store<AuthState>) {
    // Select slices of state related to user authentication and errors
    this.user$ = this.store.select((state: AuthState) => state.user);
    this.loginError$ = this.store.select((state: AuthState) => state.loginError);
    this.signupError$ = this.store.select((state: AuthState) => state.signupError);
    this.isTokenValid$ = this.store.select((state: AuthState) => state.isTokenValid);
  }

  // Dispatch the login action with email and password
  login(email: string, password: string) {
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  // Dispatch the signup action
  signup(email: string, password: string) {
    this.store.dispatch(AuthActions.signup({ email, password }));
  }

  // Dispatch the logout action
  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  // Dispatch the refresh token action
  refreshAccessToken(refresh_token: string) {
    this.store.dispatch(AuthActions.refreshAccessToken({ refresh_token }));
  }

  // Dispatch the check token validity action
  checkTokenValidity(access_token: string) {
    this.store.dispatch(AuthActions.checkTokenValidity({ access_token }));
  }

   // Method for login action
   loginUser() {
    debugger;
    this.store.dispatch(AuthActions.login({ email: 'test@example.com', password: 'password123' }));
  }

  // Method for signup action
  signupUser() {
    this.store.dispatch(AuthActions.signup({ email: 'newuser@example.com', password: 'password456' }));
  }

  // Method for checking token validity
  checkTokenValidityUser() {
    this.store.dispatch(AuthActions.checkTokenValidity({ access_token: 'dummyAccessToken' }));
  }
}
