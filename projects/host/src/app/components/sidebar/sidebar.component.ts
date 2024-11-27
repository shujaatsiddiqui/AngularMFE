import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router, Route } from '@angular/router';
import { fromEvent } from 'rxjs';

interface MenuItem {
  icon: string;
  label: string;
  path?: string;
  hasChildren: boolean;
  isOpen: boolean;
  children: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.setupRoutes();
  }

  setupRoutes() {
    this.menuItems = this.router.config.reduce((groupedData: any[], item: any) => {
      const { data, path } = item;

      if (data?.title) {
        let group = groupedData.find((g: any) => g.label === data.title);

        if (!group) {
          group = {
            icon: "fas fa-folder",
            label: data.title,
            hasChildren: true,
            isOpen: false,
            children: []
          };
          groupedData.push(group);
        }

        data.components?.forEach((component: any) => {
          if (!group.children.some((child: any) => child.path === component.path)) {
            group.children.push({
              icon: "fas fa-file",
              label: component.name,
              path: component.path
            });
          }
        });
      } else {
        groupedData.push({
          icon: "fas fa-question",
          label: path ? "Home" : "Unknown",
          path: path || null,
          hasChildren: false,
          isOpen: false,
          children: []
        });
      }

      return groupedData;
    }, []);
    console.log(this.router.config[2]);


  }

  navigateTo(event: MouseEvent, path?: string): void {
    debugger;
    event.preventDefault();
    const app = localStorage.getItem('new_application');
    const parsedApp = app ? JSON.parse(app) : {};
    const route: Route | undefined = this.router.config.find(route => route.path === path);
    const comp = route?.data?.["components"]?.find((com: any) => com.path === path)

    const extras: any = {
      queryParams: {},
      skipLocationChange: false,
    };

    if (comp?.query?.isRequired && Array.isArray(comp?.query?.params)) {
      comp?.query?.params.forEach((param: string) => {
        const paramValue = parsedApp[param] ?? '';
        extras.queryParams[param] = paramValue;
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




  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(selectedItem: MenuItem): void {
    this.menuItems = this.menuItems.map(item => {
      if (item === selectedItem) {
        return { ...item, isOpen: !item.isOpen };
      }
      return { ...item, isOpen: false };
    });
  }


}
