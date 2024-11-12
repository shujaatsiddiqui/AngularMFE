export interface PluginInterface {
  pluginId: string;
  displayName: string;
  initialize(config?: any): void;
  getRoutes(): PluginRoute[];
  requiredPermissions: string[];
}

export interface PluginRoute {
  path: string;
  component: any;
  routeName: string;
  permissions?: string[];
}

export interface MenuItem {
  title: string;
  icon?: string;
  path: string;
  children?: MenuItem[];
  requiredPermissions?: string[];
}

export interface PluginCommunication {
  notifyEvent(eventName: string, payload: any): void;
  getSharedData(key: string): any;
  setSharedData(key: string, value: any): void;
}
