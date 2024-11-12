import { loadRemoteModule } from '@angular-architects/module-federation';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';

const MFE_APP_URL = "http://localhost:4300/remoteEntry.js";

// const routes: Routes = [
//   {
//     path: 'todos',
//     // loadChildren: () =>
//     //   loadRemoteModule('remote', 'TodoModule'), // Ensure this matches the exposed name
//     loadChildren: () => {
//       return loadRemoteModule({
//         remoteEntry: MFE_APP_URL,
//         remoteName: "remote",
//         exposedModule: "./TodoModule"
//       }).then(m => m.TodoModule).catch(err => console.log({ err }));
//     }, canActivate: [MsalGuard]
//   },
//   { path: '', component: HomeComponent, canActivate: [MsalGuard] },
// ];

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
