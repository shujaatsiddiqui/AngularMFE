// src/app/store/app.state.ts
import { AuthState } from './auth.model';

export interface AppState {
  auth: AuthState; // Include your AuthState
}
