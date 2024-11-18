import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './store/auth/auth.model';
import { login } from './store/auth/auth.actions';
import { selectLoginError,selectUser } from './store/auth/auth.selectors';
import { AppState } from './store/auth/app.state';
import { MsalService } from '@azure/msal-angular';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  email = '';
  password = '';
  user$: Observable<User | null>;
  loginError$: Observable<string | null>;

  constructor(private msalService: MsalService,private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
    this.loginError$ = this.store.select(selectLoginError);
  }

  ngOnInit() {
    // Check for an existing account to see if the user is already logged in
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  login() {
    this.msalService.loginRedirect();
  }
  
  onLogin() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
