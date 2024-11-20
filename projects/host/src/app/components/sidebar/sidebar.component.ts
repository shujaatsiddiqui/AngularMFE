import { Component, OnInit } from '@angular/core';
import { PluginInterface, PluginRoute, MenuItem } from '../../plugin.interface';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';

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
    this.subscribeToEvents();
    this.setupRoutes();
  }

  setupRoutes() {
    const app = localStorage.getItem("new_application");
    this.menuItems = [];
    this.router.config.forEach(route => {
      let path = route.path!;
      if ((route?.data as any)?.query?.isRequired) {
        path = path + "?" + (route?.data as any)?.query?.params?.map((param: string) => {
          const paramValue = JSON.parse(app!)?.[param] || "";
          return param + "=" + paramValue
        }).join("&");
      }
      this.menuItems.push({
        title: route.path!,
        path: path,
      });
    });
  }

  subscribeToEvents() {
    fromEvent(window, "new_application_created").subscribe((event: any) => {
      localStorage.setItem("new_application", JSON.stringify(event.detail.data));
      this.setupRoutes();
    })
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
