# 🚀 Guía Rápida de Despliegue

## ⚠️ IMPORTANTE

Tu frontend está en **Vercel** pero necesitas el backend en **otro servicio** porque Vercel solo sirve archivos estáticos (no puede correr Node.js/NestJS en el plan gratuito).

---

## 📋 Pasos para Desplegar Correctamente

### 1️⃣ Desplegar el Backend en Railway (GRATIS los primeros $5)

1. **Ve a** https://railway.app
2. **Sign up** con tu cuenta de GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Selecciona** tu repositorio PlantApp
5. **Root Directory:** `plant-app_back` ← MUY IMPORTANTE
6. **Agrega variables de entorno:**
   ```
   PORT=3000
   PERENUAL_API_KEY=sk-exLE69aa5a751646615239
   PEXELS_API_KEY=563492ad6f917000010000011234567890abcdef1234567890abcdef
   CORS_ORIGIN=https://plant-app-peach-two.vercel.app
   CACHE_TTL_HOURS=24
   ```
7. **Deploy** → Espera a que termine
8. **Copia la URL** que te da Railway (ej: `https://plantapp-production.up.railway.app`)

---

### 2️⃣ Actualizar el Frontend para Conectarse al Backend

**Edita este archivo:**
`PlantApp_Front/src/app/services/environment.service.ts`

**Línea 25-29**, cambia:
```typescript
if (this.isProduction()) {
  // PEGA AQUÍ LA URL DE TU BACKEND EN RAILWAY
  return 'https://TU-BACKEND.railway.app/api';
}
```

**Ejemplo:**
```typescript
if (this.isProduction()) {
  return 'https://plantapp-production.up.railway.app/api';
}
```

---

### 3️⃣ Hacer Commit y Push

```bash
git add .
git commit -m "fix: Configure production backend URL"
git push origin main
```

---

### 4️⃣ Vercel Redesplegar Automáticamente

Vercel detectará el push y redespleará automáticamente el frontend con la nueva configuración.

**Espera 2-3 minutos** y luego visita:
- ✅ Frontend: https://plant-app-peach-two.vercel.app
- ✅ Backend: https://TU-BACKEND.railway.app/api/health

---

## 🔍 Verificar que Todo Funciona

1. **Abre:** https://plant-app-peach-two.vercel.app
2. **Abre DevTools:** F12 → Console
3. **Busca logs:** Deberías ver requests a tu backend en Railway
4. **Ve a Plantas:** Click en "Plantas" y deberías ver las 18 plantas

---

## 🆘 Si Algo No Funciona

### Backend no responde (404):
- Verifica que Railway haya terminado de desplegar
- Ve a Railway dashboard → Logs → Busca errores
- Prueba el endpoint: https://TU-BACKEND.railway.app/api/health

### CORS Error:
- Verifica que `CORS_ORIGIN` en Railway tenga la URL exacta de Vercel
- No agregues `/` al final
- Ejemplo correcto: `https://plant-app-peach-two.vercel.app`

### Frontend muestra páginas en blanco:
1. `Ctrl + Shift + R` (hard refresh)
2. Verifica que vercel.json esté commiteado y pusheado
3. Ve a Vercel dashboard → Deployments → Busca errores

---

## 📊 URLs Finales

Una vez desplegado todo:

| Servicio | URL | Costo |
|----------|-----|-------|
| 🎨 Frontend | https://plant-app-peach-two.vercel.app | GRATIS |
| 🔧 Backend | https://TU-BACKEND.railway.app | $5 gratis/mes |
| 💚 Health Check | https://TU-BACKEND.railway.app/api/health | - |

---

## ✅ Checklist Final

- [ ] Backend desplegado en Railway
- [ ] Variables de entorno configuradas en Railway
- [ ] URL del backend copiada
- [ ] environment.service.ts actualizado con URL de Railway
- [ ] Commit y push a GitHub
- [ ] Vercel redespleado automáticamente
- [ ] Frontend funcionando en navegador
- [ ] DevTools sin errores CORS
