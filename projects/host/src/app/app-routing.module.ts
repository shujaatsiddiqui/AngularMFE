import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { RemoteLoaderService } from './remoteupload';

const routes: Routes = [
  // Placeholder for dynamically added routes
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

async function loadPluginRoutes() {
  const remoteLoaderService = inject(RemoteLoaderService);
  const pluginsConfig = await remoteLoaderService.fetchPluginsConfig();

  for (const plugin of pluginsConfig.plugins) {
    debugger;
    for (const route of plugin.routes) {
      routes.push({
        path: route.path,
        loadChildren: async () => {
          const module = await remoteLoaderService.loadRemoteModule(
            plugin.remoteEntry,
            plugin.pluginId,
            plugin.exposedModule
          );
          return module;
        },
        data: {
          permissions: route.permissions, // Attach permissions for later use
        },
      });
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {
    loadPluginRoutes(); // Dynamically load plugin routes at runtime
  }
}
