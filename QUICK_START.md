# ⚡ Quick Start - PlantApp con Docker

## 🎯 Opción 1: Con Docker (Más Fácil - Recomendado)

### Paso 1: Instalar Docker Desktop

1. **Descargar**: https://www.docker.com/products/docker-desktop
2. **Instalar**: Ejecutar el instalador
3. **Reiniciar** la computadora si es necesario
4. **Verificar** que Docker Desktop esté corriendo (ícono en la bandeja del sistema)

### Paso 2: Iniciar la Aplicación

```powershell
# En la carpeta PlantApp
cd PlantApp

# Copiar variables de entorno
cp .env.docker .env

# Iniciar todo con Docker
docker-compose up --build
```

**Espera 2-3 minutos** mientras se construyen las imágenes...

### Paso 3: Abrir en el Navegador

Una vez que veas el mensaje:
```
plantapp-backend   | 🌱 PlantApp Backend ejecutándose en http://localhost:3000/api
plantapp-frontend  | /docker-entrypoint.sh: Configuration complete; ready for start up
```

Abre:
- 🎨 **Frontend**: http://localhost:4200
- 🔧 **Backend**: http://localhost:3000/api/ping

### Para Detener

```powershell
# Detener servicios
docker-compose down
```

---

## 🚀 Opción 2: Sin Docker (Desarrollo Local)

### Requisitos
- Node.js 18+ instalado
- npm o yarn

### Backend

```powershell
# Terminal 1 - Backend
cd plant-app_back

# Instalar dependencias
npm install

# Copiar .env
cp .env.example .env

# Iniciar
npm run start:dev
```

### Frontend

```powershell
# Terminal 2 - Frontend  
cd PlantApp_Front

# Instalar dependencias
npm install

# Iniciar
ng serve -o
```

---

## 📊 Verificar que Todo Funciona

### 1. Backend Health Check

```powershell
# En PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/ping"
# Debe responder: OK

Invoke-RestMethod -Uri "http://localhost:3000/api/plants/local" | ConvertTo-Json
# Debe responder con JSON de plantas
```

### 2. Frontend

1. Abre http://localhost:4200
2. Haz clic en "Plantas"
3. Deberías ver el catálogo de plantas
4. Cambia a "Base de Datos Global" para ver plantas de la API externa

---

## 🐛 Problemas Comunes

### "Docker no está instalado"

**Solución**: Descargar e instalar Docker Desktop
1. https://www.docker.com/products/docker-desktop
2. Instalar y reiniciar
3. Verificar que Docker Desktop esté corriendo
4. Intentar de nuevo: `docker --version`

### "Port already in use"

**Solución**: Detener procesos en los puertos

```powershell
# Detener puerto 3000
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($port3000) { Stop-Process -Id $port3000 -Force }

# Detener puerto 4200
$port4200 = Get-NetTCPConnection -LocalPort 4200 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess
if ($port4200) { Stop-Process -Id $port4200 -Force }
```

### "Cannot find module" (sin Docker)

**Solución**: Reinstalar dependencias

```powershell
# Backend
cd plant-app_back
rm -rf node_modules package-lock.json
npm install

# Frontend
cd PlantApp_Front
rm -rf node_modules package-lock.json .angular
npm install
```

### "CORS error" en el navegador

**Solución**: Verificar que backend esté corriendo
1. Abrir http://localhost:3000/api/ping
2. Debe responder "OK"
3. Si no funciona, revisar logs del backend

---

## 📚 Siguientes Pasos

Una vez que la aplicación esté funcionando:

1. **Explorar la App**:
   - Navega por las diferentes secciones
   - Prueba la búsqueda de plantas externas
   - Revisa las enfermedades

2. **Leer la Documentación**:
   - [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) - Guía completa de Docker
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Desplegar a producción
   - [plant-app_back/HEALTH_CHECK.md](./plant-app_back/HEALTH_CHECK.md) - Endpoints de monitoreo

3. **Desplegar a Producción**:
   - Ver [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) para desplegar con Docker
   - Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para otras opciones

---

## ✅ Checklist

Marca cuando completes cada paso:

**Con Docker:**
- [ ] Docker Desktop instalado y corriendo
- [ ] `.env` configurado (copiar de `.env.docker`)
- [ ] `docker-compose up --build` ejecutado sin errores
- [ ] Frontend abre en http://localhost:4200
- [ ] Backend responde en http://localhost:3000/api/ping
- [ ] Datos de plantas se muestran en el frontend

**Sin Docker:**
- [ ] Node.js 18+ instalado
- [ ] Backend: `npm install` exitoso
- [ ] Backend: `.env` configurado
- [ ] Backend: `npm run start:dev` corriendo
- [ ] Frontend: `npm install` exitoso
- [ ] Frontend: `ng serve` corriendo
- [ ] App funciona en http://localhost:4200

---

## 💡 Tips

- **Docker** es más fácil porque no necesitas instalar Node.js, npm, etc.
- **Sin Docker** es mejor para desarrollo activo (hot reload más rápido)
- Puedes usar ambos métodos en diferentes momentos
- Los logs de Docker se ven con: `docker-compose logs -f`

---

¿Necesitas ayuda? Revisa [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) para más detalles.
