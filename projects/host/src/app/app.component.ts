import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, startWith, tap } from 'rxjs';
import { AuthState, User } from './store/auth/auth.model';
import * as AuthActions from './store/auth/auth.actions';
import * as fromAuth from './store/auth/auth.selectors';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

const defaultUser: User = {
  id: 'default-id',
  email: 'default@example.com',
  name: 'Guest User',
  accessToken: '', // or a default token
  refreshToken: '' // or a default token
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // State Observables to listen to the login, signup, and token validity status
  user$!: Observable<User | null>;
  loginError$: Observable<string | null>;
  signupError$: Observable<string | null>;
  isTokenValid$: Observable<boolean | null>;

  

  constructor(private store: Store<AuthState>) {
    // Select slices of state related to user authentication and errors
   
    this.loginError$ = this.store.select((state: AuthState) => state.loginError);
    this.signupError$ = this.store.select((state: AuthState) => state.signupError);
    this.isTokenValid$ = this.store.select((state: AuthState) => state.isTokenValid);
  }

  ngOnInit(): void {

    debugger;
    this.user$ = this.store.select((state: AuthState) => state.user);
    // this.user$.subscribe(user => {
    //   console.log('Current user:', user);
    // });
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
