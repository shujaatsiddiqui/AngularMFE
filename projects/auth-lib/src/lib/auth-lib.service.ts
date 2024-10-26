import { Injectable, NgModule } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
@NgModule({
  providers: [AuthService],
})
export class AuthLibService {

  constructor() { }
}
