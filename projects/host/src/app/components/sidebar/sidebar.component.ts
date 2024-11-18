import { Component, OnInit } from '@angular/core';
import { PluginInterface, PluginRoute, MenuItem } from '../../plugin.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.router.config.forEach(route => {
      this.menuItems.push({
        title: route.path!,
        path: route.path!,
      });
    });
  }

  addPluginToMenu(plugin: PluginInterface) {
    const menuItem: MenuItem = {
      title: plugin.displayName,
      path: plugin.pluginId,
      children: plugin.getRoutes().map(route => ({
        title: route.routeName,
        path: route.path,
        requiredPermissions: route.permissions || []
      }))
    };
    this.menuItems.push(menuItem);
  }

  addPluginRoutes(routes: PluginRoute[]) {
    routes.forEach(route => {
      this.router.config.push({
        path: route.path,
        component: route.component
      });
    });
  }
}
