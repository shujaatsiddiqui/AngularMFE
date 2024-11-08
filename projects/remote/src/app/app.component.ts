import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { AppConstants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private msalService: MsalService, private http: HttpClient) {}

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

  // callApi() {
  //   this.msalService
  //     .acquireTokenSilent({
  //       scopes: [AppConstants.API_SCOPE], // Replace with your API scope
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         const headers = new HttpHeaders().set('Authorization', `Bearer ${response.accessToken}`);
  //         this.http.post(AppConstants.API_URL, { value: 'New Value' }, { headers }).subscribe(
  //           (result) => {
  //             console.log('API Response:', result);
  //           },
  //           (error) => {
  //             console.error('API Error:', error);
  //           }
  //         );
  //       },
  //       error: (error) => {
  //         if (error instanceof InteractionRequiredAuthError) {
  //           // If silent token acquisition fails, prompt the user to login again
  //           this.msalService.acquireTokenRedirect({
  //             scopes: [AppConstants.API_SCOPE],
  //           });
  //         } else {
  //           console.error('Token acquisition error:', error);
  //         }
  //       },
  //     });
  // }
  
}