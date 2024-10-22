import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const MFE_APP_URL= "http://localhost:4300/remoteEntry.js";

const routes: Routes = [
  {
    path: 'todos',
    // loadChildren: () =>
    //   loadRemoteModule('remote', 'TodoModule'), // Ensure this matches the exposed name
    loadChildren: () =>
      {
        return loadRemoteModule({ 
          remoteEntry : MFE_APP_URL,
          remoteName : "remote",
          exposedModule : "./TodoModule"
        }).then(m=>m.TodoModule).catch(err => console.log(err));
      },
  },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
