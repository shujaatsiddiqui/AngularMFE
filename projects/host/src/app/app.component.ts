import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './store/auth/auth.model';
import { login } from './store/auth/auth.actions';
import { selectLoginError,selectUser } from './store/auth/auth.selectors';
import { AppState } from './store/auth/app.state';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  email = '';
  password = '';
  user$: Observable<User | null>;
  loginError$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
    this.loginError$ = this.store.select(selectLoginError);
  }

  onLogin() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
