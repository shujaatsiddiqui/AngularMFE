import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { AppModule } from './app/app.module';
import { CUSTOM_ROUTES } from './app/platform-routes';

fetch('/assets/platform-config.json').then(async (res) => {
  const config = await res.json();

  const platformRoutes: Routes = [];
  for (const [key, value] of Object.entries<any>(config)) {
    const { components = [], title, path, remoteEntry, remoteName, exposedModule, exposedModuleName } = value;

    const createRoute = (component: any) => ({
      data: value,
      title: component?.name || title,
      path: component?.path || path,
      loadChildren: () =>
        loadRemoteModule({
          remoteEntry: component?.remoteEntry || remoteEntry,
          remoteName: component?.remoteName || remoteName,
          exposedModule: component?.exposedModule || exposedModule,
        })
          .then((m) => m[component?.exposedModuleName || exposedModuleName])
          .catch((e) => console.error('Error loading remote module:', e)),
    });

    if (components.length > 0) {
      components.forEach((comp: any) => platformRoutes.push(createRoute(comp)));
    } else {
      platformRoutes.push(createRoute({}));
    }
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
