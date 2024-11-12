import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationInfoComponent } from './application-info/application-info.component';

import { PluginInterface, PluginRoute } from '../../../host/src/app/plugin.interface';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'manage/application', component: ApplicationInfoComponent },
    ]),
  ],
})
export class ManageApplicationModule implements PluginInterface {
  pluginId = "remote";
  displayName = "Manage Application";
  requiredPermissions = ["admin"];

  initialize(config?: any) {
    console.log("Plugin initialized with config:", config);
  }

  getRoutes(): PluginRoute[] {
    return [
      {
        path: 'manage/application',
        component: ApplicationInfoComponent,
        routeName: "Application",
        permissions: ["view_application"]
      }
    ];
  }
}


// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { ApplicationInfoComponent } from './application-info/application-info.component';

// @NgModule({
//   declarations: [ApplicationInfoComponent],
//   imports: [
//     CommonModule,
//     RouterModule.forChild([
//       { path: 'manage/application', component: ApplicationInfoComponent },
//     ]),
//   ],
// })
// export class ManageApplicationModule { }

// // Ensure the default export is provided
// export default ManageApplicationModule;
