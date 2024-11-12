import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { MsalBroadcastService, MsalGuard, MsalModule, MsalService } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AppConstants } from './app.constants';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


const msalConfig = {
  auth: {
    clientId: "ebf0cedf-7a07-4a69-9de6-a8172cbf3fd1", // Replace with your Application ID from Azure AD
    authority: "https://login.microsoftonline.com/45be41fb-94b4-4b51-85aa-2644f4f4ac68", // Replace with your Azure AD tenant ID
    redirectUri: "http://localhost:4200/", // Redirect URI after login
    postLogoutRedirectUri: "http://localhost:4200", // Where users land after logout
  },
};

const loginRequest = {
  scopes: [AppConstants.API_SCOPE], // Replace with your Web API's scope
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, // Add HttpClientModule here
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        interactionType: InteractionType.Redirect, // Use redirect for login
        authRequest: loginRequest,
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [AppConstants.API_SCOPE, [AppConstants.API_SCOPE]], // Map API to the scope
        ]),
      }
    ),
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    HttpClientModule,
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
