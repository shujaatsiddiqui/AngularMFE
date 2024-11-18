import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationInfoComponent } from './application-info/application-info.component';

const routes: Routes = [
  { path: 'manage/application', component: ApplicationInfoComponent },
  { path: '', redirectTo: 'manage/application', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot only here
  exports: [RouterModule],
})
export class AppRoutingModule {}
