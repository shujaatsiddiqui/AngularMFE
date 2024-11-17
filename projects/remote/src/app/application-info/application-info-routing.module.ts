import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationInfoComponent } from './application-info.component';

const routes: Routes = [
  { path: '', component: ApplicationInfoComponent }, // Default route for this module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationInfoRoutingModule { }
