export enum AUTH_ACTION_NAMES {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Signup = '[Auth] Signup',
  SignupSuccess = '[Auth] Signup Success',
  SignupFailure = '[Auth] Signup Failure',
  Logout = '[Auth] Logout',
  RefreshAccessToken = '[Auth] Refresh Access Token',
  RefreshAccessTokenSuccess = '[Auth] Refresh Access Token Success',
  CheckTokenValidity = '[Auth] Check Token Validity',
  TokenValidityChecked = '[Auth] Token Validity Checked',
}

export enum AUTH_EVENT_NAMES {
  LoginStatus = 'auth:loginStatus',
  AccessToken = 'auth:accessToken',
  RefreshToken = 'auth:refreshToken',
  IsTokenValid = 'auth:isTokenValid'
}
