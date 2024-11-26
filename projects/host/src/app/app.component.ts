import { Component, ComponentRef, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './store/auth/auth.model';
import { login } from './store/auth/auth.actions';
import { selectLoginError, selectUser } from './store/auth/auth.selectors';
import { AppState } from './store/auth/app.state';
import { MsalService } from '@azure/msal-angular';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isSidebarCollapsed = false;

  // email = '';
  // password = '';
  // user$: Observable<User | null>;
  // loginError$: Observable<string | null>;

  // constructor(private msalService: MsalService, private store: Store<AppState>, private remoteLoaderService: RemoteLoaderService,
  //   private viewContainerRef: ViewContainerRef,
  //   private injector: Injector) {
  //   this.user$ = this.store.select(selectUser);
  //   this.loginError$ = this.store.select(selectLoginError);
  // }

  // async ngOnInit(): Promise<void> {
  //   const remoteComponent = await this.remoteLoaderService.loadRemoteModule(
  //     'http://localhost:4300/remoteEntry.js', // URL of the remote's entry point
  //     'remote', // Scope name defined in the remote's ModuleFederationPlugin
  //     './ApplicationInfoComponent' // Module path exposed by the remote
  //   );

  // }

  // login() {
  //   this.msalService.loginRedirect();
  // }

  // onLogin() {
  //   this.store.dispatch(login({ email: this.email, password: this.password }));
  // }

  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
