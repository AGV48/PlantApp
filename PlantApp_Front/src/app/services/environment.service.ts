import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  // La URL se determina automáticamente según el entorno
  readonly apiUrl = this.getApiUrl();

  private getApiUrl(): string {
    // 1. Primero, verificar si hay una variable de entorno definida (Vercel)
    const envApiUrl = (window as any)['API_URL'];
    if (envApiUrl) {
      console.log('🌍 Using API URL from environment:', envApiUrl);
      return envApiUrl;
    }

    // 2. Si está en Docker (detectar por puerto y hostname)
    if (this.isDocker()) {
      console.log('🐳 Running in Docker, using localhost:3000');
      return 'http://localhost:3000/api';
    }

    // 3. En producción (Vercel)
    if (this.isProduction()) {
      // URL del backend desplegado - actualizar después de desplegar en Railway/Render
      const productionApiUrl = 'https://plantapp-zrwb.onrender.com';
      console.log('🚀 Production mode, using:', productionApiUrl);
      return productionApiUrl;
    }

    // 4. En desarrollo local, usar localhost
    console.log('🏠 Running in development, using localhost:3000');
    return 'http://localhost:3000/api';
  }

  private isDocker(): boolean {
    // Detectar si está corriendo en Docker
    return window.location.port === '4200' 
        && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost' 
        && window.location.hostname !== '127.0.0.1';
  }

  get isProductionEnvironment(): boolean {
    return this.isProduction();
  }

  // Método útil para debugging
  getEnvironmentInfo(): any {
    return {
      apiUrl: this.apiUrl,
      hostname: window.location.hostname,
      port: window.location.port,
      isProduction: this.isProduction(),
      isDocker: this.isDocker(),
    };
  }
}
