import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MsalModule, MsalRedirectComponent, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { AppConstants } from './app.constants';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth-interceptor.service';
import { FormsModule } from '@angular/forms';


const msalConfig = {
  auth: {
    clientId: "e6ff8e2c-4373-4f55-a652-9ab6eb88b80a", // Replace with your MFE 2 Application (client) ID from Azure AD
    authority: "https://login.microsoftonline.com/45be41fb-94b4-4b51-85aa-2644f4f4ac68", // Replace with your Azure AD tenant ID
    redirectUri: "http://localhost:4300/", // Redirect after login
    postLogoutRedirectUri: "http://localhost:4300", // Where users land after logout
  },
};

const loginRequest = {
  scopes: [AppConstants.API_SCOPE], // Replace with your Web API's scope
};



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ensure AppRoutingModule is imported
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        interactionType: InteractionType.Redirect,
        authRequest: loginRequest,
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [AppConstants.API_SCOPE, [AppConstants.API_SCOPE]],
        ]),
      }
    ),
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    MsalService, MsalGuard, MsalBroadcastService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }



