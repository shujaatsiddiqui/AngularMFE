import { Component, ComponentRef, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from './store/auth/auth.model';
import { login } from './store/auth/auth.actions';
import { selectLoginError,selectUser } from './store/auth/auth.selectors';
import { AppState } from './store/auth/app.state';
import { MsalService } from '@azure/msal-angular';
import { RemoteLoaderService } from './remoteupload';



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

  constructor(private msalService: MsalService,private store: Store<AppState>, private remoteLoaderService: RemoteLoaderService,
    private viewContainerRef: ViewContainerRef ,
    private injector: Injector  ) {
    this.user$ = this.store.select(selectUser);
    this.loginError$ = this.store.select(selectLoginError);
  }

  async ngOnInit(): Promise<void> {
    try {
      const remoteComponent = await this.remoteLoaderService.loadRemoteModule(
        'http://localhost:4300/remoteEntry.js', // URL of the remote's entry point
        'remote', // Scope name defined in the remote's ModuleFederationPlugin
        './ApplicationInfoComponent' // Module path exposed by the remote
      );

    //   // Resolve the component factory for ApplicationInfoComponent
    //   const ApplicationInfoComponent = remoteComponent.ApplicationInfoComponent;
    //   if (!ApplicationInfoComponent) {
    //     throw new Error('ApplicationInfoComponent not found in the remote module.');
    //   }

    //   // Dynamically create and render the component
    //   const componentRef: ComponentRef<any> = this.viewContainerRef.createComponent(
    //     ApplicationInfoComponent,
    //     { injector: this.injector }
    //   );
    //   console.log('Remote Component Loaded:', componentRef);
    // } catch (error) {
    //   console.error('Error loading remote module:', error);
    // }
  }
  
  // ngOnInit() {
  //   // Check for an existing account to see if the user is already logged in
  //   const accounts = this.msalService.instance.getAllAccounts();
  //   if (accounts.length > 0) {
  //     this.msalService.instance.setActiveAccount(accounts[0]);
  //   }
  // }

  login() {
    this.msalService.loginRedirect();
  }
  
  onLogin() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}
