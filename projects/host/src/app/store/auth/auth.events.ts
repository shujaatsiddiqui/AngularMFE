import { Injectable } from '@angular/core';
import { AUTH_EVENT_NAMES } from './auth.enums';

@Injectable()
export class AuthEventsManager {
  constructor() { }

  sendLoginStatus(login_status: boolean): void {
    const loginStatusEvent = new CustomEvent(AUTH_EVENT_NAMES.LoginStatus, {
      detail: {
        data: { login_status }
      }
    });
    dispatchEvent(loginStatusEvent);
  }

  sendAccessToken(access_token: string): void {
    const accessTokenEvent = new CustomEvent(AUTH_EVENT_NAMES.AccessToken, {
      detail: {
        data: { access_token }
      }
    });
    dispatchEvent(accessTokenEvent);
  }

  refreshToken(refresh_token: string): void {
    const refreshTokenEvent = new CustomEvent(AUTH_EVENT_NAMES.RefreshToken, {
      detail: {
        data: { refresh_token }
      }
    });
    dispatchEvent(refreshTokenEvent);
  }

  isTokenValid(is_access_token_valid: boolean): void {
    const isAccessTokenValidEvent = new CustomEvent(AUTH_EVENT_NAMES.IsTokenValid, {
      detail: {
        data: { is_access_token_valid }
      }
    });
    dispatchEvent(isAccessTokenValidEvent);
  }
}



