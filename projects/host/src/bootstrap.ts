import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { AppModule } from './app/app.module';
import { CUSTOM_ROUTES } from './app/platform-routes';

fetch('http://localhost:8080/platform-config').then(async (res) => {
  const config = await res.json();

  const platformRoutes: Routes = [];
  for (const [key, value] of Object.entries<any>(config)) {
    platformRoutes.push({
      data: value,
      path: value.path,
      loadChildren: () =>
        loadRemoteModule({
          remoteEntry: value.remoteEntry,
          remoteName: value.remoteName,
          exposedModule: value.exposedModule,
        }).then((m) => m[value.exposedModuleName]).catch(e => {
          console.error(e)
        }),
    });
  }

  platformBrowserDynamic([
    {
      provide: CUSTOM_ROUTES,
      useValue: platformRoutes,
      multi: true,
    },
  ])
    .bootstrapModule(AppModule)
    .catch((err) => {
      console.log('PLATFORM_ROUTES', CUSTOM_ROUTES);
      console.error(err)
    });
});
