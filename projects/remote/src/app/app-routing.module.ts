import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { ApplicationInfoComponent } from './application-info/application-info.component';

// const routes: Routes = [
//   // {
//   //   path: 'todos',
//   //   loadChildren: () =>
//   //     import('./todo/todo.module').then(m => m.TodoModule),
//   //   // canActivate: [MsalGuard]
//   // },
//   // { path: '', redirectTo: '/todos', pathMatch: 'full' },

// ];

const routes: Routes = [
  { path: 'manage/application', component: ApplicationInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
