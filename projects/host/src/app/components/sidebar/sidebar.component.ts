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
    const app = localStorage.getItem("new_application");

    this.router.config.forEach(route => {
      let path = route.path!;
      if (app !== null && app !== undefined && app.trim() !== "" && route.path!.includes("todo")) {
        path = path + "?appId=" + JSON.parse(app).id;
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
      this.menuItems = this.menuItems.map(route => {
        if (route.path.includes("todo")) {
          return {
            ...route,
            path: route.path + "?appId=" + event.detail.data.id,
          }
        }
        return route;
      })
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
