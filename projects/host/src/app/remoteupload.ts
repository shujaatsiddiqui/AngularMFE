import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RemoteLoaderService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches the plugins configuration file.
   */
  fetchPluginsConfig(): Promise<any> {
    return this.http.get('/assets/plugins.json').toPromise(); // Adjust the path if necessary
  }

  /**
   * Dynamically loads a remote module using Webpack's Module Federation APIs.
   */
  loadRemoteModule(remoteEntry: string, scope: string, exposedModule: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${remoteEntry}"]`)) {
        this.loadModule(scope, exposedModule, resolve, reject);
        return;
      }

      const script = document.createElement('script');
      script.src = remoteEntry;
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        this.loadModule(scope, exposedModule, resolve, reject);
      };

      script.onerror = () => {
        reject(`Failed to load remote module from ${remoteEntry}`);
      };

      document.body.appendChild(script);
    });
  }

  private async loadModule(scope: string, exposedModule: string, resolve: any, reject: any): Promise<void> {
    try {
      await __webpack_init_sharing__('default');
      const container = (window as any)[scope];
      if (!container) {
        return reject(`Container for scope "${scope}" not found.`);
      }
      await container.init(__webpack_share_scopes__.default);
      const factory = await container.get(exposedModule);
      resolve(factory());
    } catch (error) {
      reject(error);
    }
  }
}
