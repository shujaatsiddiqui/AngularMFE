// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { PluginLoaderService } from '../../plugin-loader.service';
// import { PluginInterface, PluginRoute, MenuItem } from '../../plugin.interface';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
// })
// export class SidebarComponent implements OnInit {
//   menuItems: MenuItem[] = [];

//   constructor(
//     private http: HttpClient,
//     private pluginLoader: PluginLoaderService,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.loadPlugins();
//   }

//   async loadPlugins() {
//     this.http.get('/assets/plugins.json').subscribe(async (data: any) => {
//       const plugins = data.plugins;

//       for (const pluginConfig of plugins) {
//         const plugin: PluginInterface | null = await this.pluginLoader.loadPlugin(pluginConfig);

//         if (plugin) {
//           this.addPluginToMenu(plugin);
//           this.addPluginRoutes(plugin.getRoutes());
//         }
//       }
//     });
//   }

//   addPluginToMenu(plugin: PluginInterface) {
//     const menuItem: MenuItem = {
//       title: plugin.displayName,
//       path: plugin.pluginId,
//       children: plugin.getRoutes().map(route => ({
//         title: route.routeName,
//         path: route.path,
//         requiredPermissions: route.permissions || []
//       }))
//     };
//     this.menuItems.push(menuItem);
//   }

//   addPluginRoutes(routes: PluginRoute[]) {
//     routes.forEach(route => {
//       this.router.config.push({
//         path: route.path,
//         component: route.component
//       });
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PluginLoaderService } from '../../plugin-loader.service';
import { MenuItem } from '../../plugin.interface';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  routes: Routes = [];

  constructor(
    private http: HttpClient,
    private pluginLoader: PluginLoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadPlugins();
  }

  async loadPlugins() {
    this.http.get('/assets/plugins.json').subscribe(async (data: any) => {
      const plugins = data.plugins;

      for (const pluginConfig of plugins) {
        try {
          // Load the plugin using the PluginLoaderService
          await this.pluginLoader.loadPlugin(pluginConfig);

          // Add plugin routes dynamically from loaded module
          this.addPluginRoutes(pluginConfig);

          // Add menu items for the plugin
          this.addPluginToMenu(pluginConfig);
        } catch (error) {
          console.error(`Failed to load plugin: ${pluginConfig.remoteName}`, error);
        }
      }
    });
  }

  addPluginToMenu(pluginConfig: any) {
    const menuItem: MenuItem = {
      title: pluginConfig.displayName,
      path: '', // Since plugins are routed individually
      children: pluginConfig.routes.map((route: any) => ({
        title: route.routeName,
        path: route.path
      }))
    };
    this.menuItems.push(menuItem);
    console.log(this.menuItems[0].children);
  }

  addPluginRoutes(pluginConfig: any) {
    // Add new routes from the plugin
    const routes = pluginConfig.routes.map((route: any) => ({
      path: route.path,
      loadChildren: () => import(pluginConfig.remoteEntry)
        .then(module => module[pluginConfig.exposedModule])
    }));

    // Dynamically add plugin routes to Router's config
    this.router.resetConfig([...this.router.config, ...routes]);
    this.routes = this.router.config;
  }
}
