
import { NgModule } from '@angular/core';
import { RouterModule, ROUTES, Routes } from '@angular/router';

import { CUSTOM_ROUTES } from './platform-routes';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [

    RouterModule.forRoot(
      [
        /* Declare root routes in the factory below */
        { path: 'home', component: HomeComponent, title: "Home" },
      ],
      { initialNavigation: 'enabledNonBlocking' }
    ),
    {
      ngModule: RouterModule,
      providers: [
        {
          provide: ROUTES,
          useFactory: (dynamicRoutes: any = []) => {
            let rootRoutes: Routes = [];
            if (Array.isArray(dynamicRoutes)) {
              rootRoutes = [...rootRoutes, ...dynamicRoutes];
            }
            return rootRoutes.flat();
          },
          deps: [CUSTOM_ROUTES],
          multi: true,
        },
      ],
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
