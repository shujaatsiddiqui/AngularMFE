// auth-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { AppConstants } from './app.constants';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private msalService: MsalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is to a protected resource
    if (req.url.includes(AppConstants.API_URL)) {
      return from(this.msalService.acquireTokenSilent({ scopes: [AppConstants.API_SCOPE] })).pipe(
        switchMap((response) => {
          
         
          const token = response.accessToken;
          // Clone the request to add the new header
          const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
          });
          // Pass on the cloned request instead of the original request
          return next.handle(authReq);
        }),
        catchError((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            // If silent token acquisition fails, prompt the user to login
            this.msalService.acquireTokenRedirect({ scopes: [AppConstants.API_SCOPE] });
          }
          
          console.log(error);
          throw error;
        })
      );
    } else {
      // If not a protected resource, continue without adding token
      return next.handle(req);
    }
  }
}
