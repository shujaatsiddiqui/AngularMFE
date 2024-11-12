// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { PluginInterface, PluginRoute, PluginCommunication } from './plugin.interface';

// @Injectable({ providedIn: 'root' })
// export class PluginLoaderService {
//   private sharedData = new Map<string, any>();

//   constructor(private http: HttpClient) { }

//   loadScript(url: string): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement('script');
//       script.src = url;
//       script.onload = () => resolve();
//       script.onerror = () => reject(`Failed to load script: ${url}`);
//       document.body.appendChild(script);
//     });
//   }

//   async loadPlugin(pluginConfig: any): Promise<PluginInterface | null> {
//     await this.loadScript(pluginConfig.remoteEntry);

//     const container = (window as any)[pluginConfig.pluginId];
//     if (!container) {
//       console.error(`Plugin ${pluginConfig.pluginId} failed to load`);
//       return null;
//     }

//     await container.init(__webpack_share_scopes__.default);

//     // Fetch the exposed module
//     const factory = await container.get(pluginConfig.exposedModule);
//     const ModuleOrFactory = factory();

//     console.log('ModuleFactory:', ModuleOrFactory);

//     if (ModuleOrFactory.AppModule) {
//       const Module = ModuleOrFactory.AppModule;

//       const plugin: PluginInterface = new Module();
//       plugin.initialize();
//       return plugin;
//     } else {
//       console.error(`AppModule not found in the loaded plugin.`);
//       return null;
//     }
//   }


//   getSharedData(key: string): any {
//     return this.sharedData.get(key);
//   }

//   setSharedData(key: string, value: any): void {
//     this.sharedData.set(key, value);
//   }
// }



import { Injectable, Injector, Compiler, NgModuleRef, NgModuleFactory, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PluginLoaderService {
  constructor(
    private injector: Injector,
    private compiler: Compiler,
    private appRef: ApplicationRef,
    private router: Router
  ) { }

  async loadPlugin(pluginConfig: any): Promise<void> {
    await this.loadScript(pluginConfig.remoteEntry);

    const container = (window as any)[pluginConfig.pluginId];
    if (!container) {
      console.error(`Plugin ${pluginConfig.pluginId} failed to load`);
      return;
    }

    await container.init(__webpack_share_scopes__.default);

    const factory = await container.get(pluginConfig.exposedModule);
    const ModuleOrFactory = factory();

    console.log('ModuleFactory:', ModuleOrFactory); // Debugging log

    if (ModuleOrFactory?.ManageApplicationModule) {
      const ManageApplicationModule = ModuleOrFactory.ManageApplicationModule;

      // Handle loading of Angular modules
      this.loadAndBootstrapModule(ManageApplicationModule);
    } else {
      console.error(`ManageApplicationModule not found in the loaded plugin.`);
    }
  }

  private async loadAndBootstrapModule(ManageApplicationModule: any) {
    try {
      const moduleFactory = await this.compileModule(ManageApplicationModule);

      // Create a module reference
      const moduleRef = moduleFactory.create(this.injector);

      // Load the routes dynamically into the router
      const routeConfig = moduleRef.instance.routes; // Assuming the module exposes its routes via a property
      if (routeConfig) {
        this.router.resetConfig([...this.router.config, ...routeConfig]);
      }

      console.log(`Successfully loaded ${ManageApplicationModule.name}`);
    } catch (error) {
      console.error(`Error while bootstrapping module: ${error}`);
    }
  }

  private async compileModule(ManageApplicationModule: any): Promise<NgModuleFactory<any>> {
    if (ManageApplicationModule instanceof NgModuleFactory) {
      return ManageApplicationModule;
    } else {
      // Use Angular's compiler to compile module dynamically
      return await this.compiler.compileModuleAsync(ManageApplicationModule);
    }
  }

  private async loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(`Failed to load script: ${url}`);
      document.body.appendChild(script);
    });
  }
}
