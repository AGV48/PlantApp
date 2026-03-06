# 🚀 Guía de Despliegue - PlantApp

Esta guía te ayuda a desplegar el frontend y backend en servidores separados y conectarlos correctamente.

---

## 📋 Requisitos Previos

- **Backend**: Repositorio con código NestJS
- **Frontend**: Repositorio con código Angular
- Cuentas en servicios de hosting (ver opciones abajo)
- API Keys de Perenual y Pexels

---

## 🔧 Configuración del Backend

### 1. Variables de Entorno (.env)

Crea o actualiza tu archivo `.env` en producción con:

```bash
# Puerto (algunos hosts lo asignan automáticamente)
PORT=3000

# CORS - URLs de tu frontend (separadas por comas)
CORS_ORIGIN=https://tu-frontend.vercel.app,https://www.tu-dominio.com

# Entorno
NODE_ENV=production

# API Keys
PERENUAL_API_KEY=tu-key-real
PEXELS_API_KEY=tu-key-real

# Cache
CACHE_TTL_HOURS=24
```

### 2. Scripts de Build

Asegúrate que `package.json` tenga:

```json
{
  "scripts": {
    "build": "nest build",
    "start": "node dist/main",
    "start:prod": "node dist/main"
  }
}
```

### 3. Asegurar CORS

El archivo `main.ts` ya está configurado para:
- ✅ Aceptar múltiples orígenes (separados por comas)
- ✅ Permitir requests sin origin (Postman, cronjobs)
- ✅ Usar `*` para permitir todos (desarrollo)

---

## 🎨 Configuración del Frontend

### 1. Detecta la URL Automáticamente

El `environment.service.ts` ya está configurado para:
- **Desarrollo**: `http://localhost:3000/api`
- **Producción**: Detecta automáticamente el dominio

### 2. Configurar URL Personalizada (Opcional)

Si tu backend está en un dominio diferente al frontend, crea `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.railway.app/api'  // URL de tu backend
};
```

Y actualiza `environment.service.ts`:

```typescript
import { environment } from '../../environments/environment';

private getApiUrl(): string {
  if (environment.production && environment.apiUrl) {
    return environment.apiUrl;
  }
  // ... resto del código
}
```

### 3. Build de Producción

```bash
ng build --configuration production
```

Esto genera la carpeta `dist/` lista para servir.

---

## ☁️ Opciones de Hosting

### **Backend (NestJS)**

#### 1️⃣ **Railway.app** (Recomendado - Fácil)
- **Costo**: Gratis para empezar ($5/mes plan hobby)
- **Pasos**:
  1. Conectar repositorio de GitHub
  2. Railway detecta Node.js automáticamente
  3. Agregar variables de entorno en el dashboard
  4. Deploy automático con cada push

**Variables de entorno en Railway**:
```
CORS_ORIGIN=https://tu-frontend.vercel.app
PERENUAL_API_KEY=sk-xxx
PEXELS_API_KEY=xxx
NODE_ENV=production
```

#### 2️⃣ **Render.com**
- **Costo**: Gratis (con limitaciones)
- **Pasos**:
  1. Conectar repo
  2. Crear "Web Service"
  3. Build Command: `npm install && npm run build`
  4. Start Command: `npm run start:prod`
  5. Agregar variables de entorno

#### 3️⃣ **Heroku**
- **Costo**: ~$7/mes (ya no tiene plan gratis)
- **Pasos**:
```bash
heroku create plantapp-backend
heroku config:set CORS_ORIGIN=https://tu-frontend.com
heroku config:set PERENUAL_API_KEY=tu-key
git push heroku main
```

#### 4️⃣ **DigitalOcean App Platform**
- **Costo**: $5/mes
- Similar a Railway/Render

---

### **Frontend (Angular)**

#### 1️⃣ **Vercel** (Recomendado - Súper fácil)
- **Costo**: Gratis
- **Pasos**:
  1. Conectar repositorio
  2. Vercel detecta Angular automáticamente
  3. Build Command: `ng build`
  4. Output Directory: `dist/plant-app-front/browser`
  5. Deploy

**Variables de entorno en Vercel** (opcional):
```
API_URL=https://tu-backend.railway.app/api
```

#### 2️⃣ **Netlify**
- **Costo**: Gratis
- **Pasos**:
  1. Conectar repo
  2. Build: `ng build --configuration production`
  3. Publish: `dist/plant-app-front/browser`
  4. Agregar `netlify.toml`:

```toml
[build]
  command = "ng build --configuration production"
  publish = "dist/plant-app-front/browser"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3️⃣ **Firebase Hosting**
- **Costo**: Gratis (generoso)
- **Pasos**:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
ng build --configuration production
firebase deploy
```

#### 4️⃣ **GitHub Pages**
- **Costo**: Gratis
- **Limitación**: Solo sitios estáticos (OK para Angular)
- Usa `angular-cli-ghpages` para deploy

---

## 🔗 Conectar Frontend y Backend

### Escenario 1: Mismo Dominio
```
Frontend: https://miapp.com
Backend:  https://miapp.com/api
```

**Frontend** (`environment.service.ts`):
```typescript
readonly apiUrl = '/api';  // Ruta relativa
```

**Configurar Proxy** en tu servidor web (nginx, etc.)

### Escenario 2: Dominios Diferentes (Más común)
```
Frontend: https://miapp.vercel.app
Backend:  https://miapp-api.railway.app
```

**Backend** (`.env`):
```bash
CORS_ORIGIN=https://miapp.vercel.app
```

**Frontend** (`environment.service.ts`):
```typescript
readonly apiUrl = 'https://miapp-api.railway.app/api';
```

---

## ✅ Checklist de Despliegue

### Backend
- [ ] Repositorio listo en GitHub
- [ ] `.env` configurado con valores de producción
- [ ] CORS_ORIGIN con URL del frontend
- [ ] API Keys configuradas (Perenual, Pexels)
- [ ] Cuenta en Railway/Render creada
- [ ] Variables de entorno agregadas en el dashboard
- [ ] Build exitoso
- [ ] Health check funcionando: `https://tu-backend.com/api/ping`
- [ ] Probar endpoints: `/api/plants/local`, `/api/diseases`

### Frontend
- [ ] Repositorio listo en GitHub
- [ ] `environment.service.ts` configurado
- [ ] Build local exitoso: `ng build --prod`
- [ ] Cuenta en Vercel/Netlify creada
- [ ] Deploy exitoso
- [ ] App carga correctamente
- [ ] Probado en navegador
- [ ] API conecta con backend (revisar Network en DevTools)

---

## 🧪 Probar la Conexión

### 1. Probar Backend
```bash
# Health check
curl https://tu-backend.railway.app/api/ping

# Plantas locales
curl https://tu-backend.railway.app/api/plants/local

# Plantas externas
curl https://tu-backend.railway.app/api/plants/external/list?page=1
```

### 2. Probar Frontend
1. Abre tu app: `https://tu-frontend.vercel.app`
2. Abre DevTools (F12) → Network
3. Navega a "Plantas"
4. Verifica que las requests sean exitosas (200 OK)
5. Si ves errores de CORS, revisa el CORS_ORIGIN del backend

---

## 🐛 Solución de Problemas

### ❌ Error: "CORS policy blocked"
**Causa**: Backend no tiene la URL del frontend en CORS_ORIGIN  
**Solución**:
```bash
# En el backend (.env)
CORS_ORIGIN=https://tu-frontend-real.vercel.app
```
Reiniciar backend después del cambio.

### ❌ Error: "Failed to fetch" o "Network Error"
**Causa**: URL del backend incorrecta  
**Solución**: Verificar que `environment.service.ts` tenga la URL correcta.

### ❌ Frontend carga pero no muestra datos
**Causa**: API no responde o CORS bloqueado  
**Solución**:
1. Probar backend directamente: `curl https://tu-backend.com/api/ping`
2. Revisar logs del backend
3. Verificar Network tab en DevTools

### ❌ Backend responde 404 en todos los endpoints
**Causa**: Falta el prefijo `/api`  
**Solución**: Verificar que `main.ts` tenga `app.setGlobalPrefix('api')`

---

## 🎯 Configuración Recomendada

**Para empezar rápida y gratis:**
- ✅ **Backend**: Railway.app
- ✅ **Frontend**: Vercel
- ✅ **Monitoreo**: UptimeRobot (cronjob al `/api/ping`)

**Ejemplo de configuración final:**
```
Backend:  https://plantapp-api.up.railway.app
Frontend: https://plantapp.vercel.app
Health:   https://plantapp-api.up.railway.app/api/ping
```

---

## 📞 Dominios Personalizados (Opcional)

### Backend (Railway)
1. Comprar dominio (Namecheap, GoDaddy, etc.)
2. Agregar CNAME: `api.tudominio.com` → `plantapp-api.up.railway.app`
3. Configurar en Railway dashboard

### Frontend (Vercel)
1. Ir a Settings → Domains
2. Agregar: `tudominio.com` y `www.tudominio.com`
3. Configurar DNS según instrucciones de Vercel

**Resultado final:**
```
Backend:  https://api.tudominio.com
Frontend: https://tudominio.com
```

---

## 🔐 Seguridad Adicional

1. **Rate Limiting**: Agregar throttling en NestJS
2. **HTTPS**: Habilitado automáticamente en Railway/Vercel
3. **Headers de Seguridad**: Usar Helmet.js
4. **Validación de API Keys**: No exponer en el frontend

---

¿Necesitas ayuda con algún paso específico del despliegue?
