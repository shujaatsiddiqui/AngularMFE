import { Component, OnInit } from '@angular/core';
import { PluginInterface, PluginRoute, MenuItem } from '../../plugin.interface';
import { Router, NavigationExtras, Route } from '@angular/router';
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
    this.setupRoutes();
  }

  setupRoutes() {
    this.menuItems = [];
    this.router.config.forEach(route => {
      let path = route.path!;
      this.menuItems.push({
        title: route.path!,
        path: path,
      });
    });
  }

  navigateTo(event: MouseEvent, path: string): void {
    event.preventDefault();
    const app = localStorage.getItem('new_application');
    const parsedApp = app ? JSON.parse(app) : {};
    const route: Route | undefined = this.router.config.find(route => route.path === path);
    const extras: any = {
      queryParams: {},
      skipLocationChange: false,
    };

    if ((route?.data as any)?.query?.isRequired && Array.isArray((route?.data as any)?.query?.params)) {
      (route?.data as any)?.query?.params.forEach((param: string) => {
        const paramValue = parsedApp[param] ?? '';
        if (paramValue) {
          extras.queryParams[param] = paramValue;
        }
      });
    }

    this.router.navigate([`${route?.path}`], extras);
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
