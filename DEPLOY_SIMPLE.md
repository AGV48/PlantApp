# 🚀 Despliegue Simple - PlantApp

## ⚡ Despliegue Rápido (3 opciones fáciles)

---

### **Opción 1: Railway (Recomendada - Todo en Uno)**

Railway puede desplegar ambos servicios desde tu repo usando Docker.

#### Pasos:

1. **Ir a [Railway.app](https://railway.app)** y hacer login con GitHub

2. **New Project** → **Deploy from GitHub repo** → Seleccionar `PlantApp`

3. Railway detectará el `docker-compose.yml` automáticamente

4. **Agregar variables de entorno**:
   ```
   PERENUAL_API_KEY=sk-exLE69aa5a751646615239
   PEXELS_API_KEY=563492ad6f917000010000011234567890abcdef1234567890abcdef
   CORS_ORIGIN=*
   ```

5. **Deploy** - Railway levantará backend y frontend automáticamente

6. **Obtener URLs**:
   - Backend: `https://plantapp-backend-production.up.railway.app`
   - Frontend: `https://plantapp-frontend-production.up.railway.app`

7. **Actualizar CORS**: Cambiar `CORS_ORIGIN` a la URL real del frontend

**Costo**: $5/mes (suficiente para proyectos personales)

---

### **Opción 2: Render (Gratis pero Separado)**

#### A. Desplegar Backend:

1. Ir a [Render.com](https://render.com)
2. **New** → **Web Service**
3. Conectar repo `PlantApp`
4. **Configuración**:
   - Name: `plantapp-backend`
   - Root Directory: `plant-app_back`
   - Environment: `Docker`
   - Plan: `Free`
5. **Variables de entorno**:
   ```
   PERENUAL_API_KEY=sk-exLE69aa5a751646615239
   PEXELS_API_KEY=563492ad6f917000010000011234567890abcdef1234567890abcdef
   CORS_ORIGIN=*
   ```
6. **Create Web Service**
7. Anotar la URL: `https://plantapp-backend.onrender.com`

#### B. Desplegar Frontend:

1. **New** → **Static Site**
2. Conectar el mismo repo
3. **Configuración**:
   - Name: `plantapp-frontend`
   - Root Directory: `PlantApp_Front`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist/plant-app-front/browser`
4. **Create Static Site**

5. **Actualizar CORS del backend** con la URL del frontend

**Costo**: Gratis (con limitaciones)

---

### **Opción 3: Vercel + Railway (Tu situación actual)**

El error 404 que tuviste fue porque Vercel no sabía dónde estaba el frontend.

#### A. Frontend en Vercel:

```bash
# Ya creé vercel.json que le indica a Vercel dónde está el frontend
git add vercel.json
git commit -m "Add Vercel config"
git push origin main
```

Ahora en Vercel:
1. **Import Project** → Tu repo `PlantApp`
2. Vercel detectará el `vercel.json` automáticamente
3. **Deploy**

#### B. Backend en Railway:

1. Ir a Railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Seleccionar el repo
4. Railway preguntará qué servicio desplegar → Seleccionar `backend`
5. Agregar variables de entorno (las de arriba)
6. Deploy

7. **Actualizar CORS** del backend con la URL de Vercel

---

## 🔧 Configuración Post-Deploy

### Actualizar CORS del Backend

Una vez que tengas la URL del frontend desplegado:

1. Ve al dashboard de tu servicio de backend (Railway/Render)
2. Actualiza la variable `CORS_ORIGIN`:
   ```
   CORS_ORIGIN=https://tu-frontend.vercel.app
   ```
3. Reinicia el backend

### Verificar que Funciona

```bash
# Probar backend
curl https://tu-backend.railway.app/api/ping
# Debe responder: OK

# Probar frontend
# Abrir en navegador y verificar que carga datos
```

---

## 🐛 Solución de Problemas

### Error 404 en Vercel
**Causa**: No encuentra el proyecto  
**Solución**: Asegúrate de hacer push del `vercel.json` al repo

### CORS Error
**Causa**: Backend no permite requests del frontend  
**Solución**: Actualizar `CORS_ORIGIN` en el backend con la URL real del frontend

### Frontend carga pero sin datos
**Causa**: No puede conectar con el backend  
**Solución**: 
1. Verificar que backend esté corriendo: `curl https://tu-backend.com/api/ping`
2. Revisar Network tab en DevTools del navegador

### Build falla
**Causa**: Dependencias faltantes  
**Solución**: Verificar que `package.json` esté commiteado

---

## 📝 Resumen de URLs

Anota tus URLs aquí:

```
Frontend: https://_________________________.vercel.app
Backend:  https://_________________________.railway.app
Health:   https://_________________________.railway.app/api/ping
```

---

## 💰 Costos

| Servicio | Plan | Costo |
|----------|------|-------|
| **Railway** (todo en uno) | Hobby | $5/mes |
| **Render** | Free | $0 (con sleep) |
| **Vercel + Railway** | Free + Hobby | $5/mes |

---

## ✅ Checklist

- [ ] Repo en GitHub con todo el código
- [ ] `vercel.json` commiteado (si usas Vercel)
- [ ] Backend desplegado y respondiendo en `/api/ping`
- [ ] Frontend desplegado y cargando
- [ ] CORS configurado con URL real del frontend
- [ ] App funciona end-to-end

---

## 🎯 Mi Recomendación

Para una app personal:

1. **Usa Railway** - Más fácil, todo en uno con Docker
2. **O usa Render Free** - 100% gratis pero con sleep después de inactividad
3. **Evita complicaciones** - No necesitas configuraciones de producción complejas

---

¿Necesitas ayuda con algún paso específico?
