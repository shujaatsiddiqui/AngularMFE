import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DynamicLoaderService {
  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }
}
