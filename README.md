# 🌱 PlantApp - Aplicación de Gestión de Plantas

Aplicación full-stack para explorar plantas, identificar enfermedades y acceder a una base de datos global de más de 10,000 especies.

---

## 🚀 Inicio Rápido

### Opción 1: Con Docker (Recomendado)

```bash
# Iniciar todo con un comando
docker-compose up --build
```

Abre tu navegador:
- 🎨 **Frontend**: http://localhost:4200
- 🔧 **Backend**: http://localhost:3000/api
- 💚 **Health**: http://localhost:3000/api/ping

### Opción 2: Sin Docker

```powershell
# Terminal 1 - Backend
cd plant-app_back
npm install
npm run start:dev

# Terminal 2 - Frontend
cd PlantApp_Front
npm install
ng serve -o
```

---

## 📦 Lo que incluye

- ✅ **18 plantas locales** con información detallada
- ✅ **10,000+ plantas** vía API Perenual
- ✅ **44 enfermedades** comunes en plantas
- ✅ **Búsqueda** por nombre
- ✅ **Imágenes reales** de alta calidad
- ✅ **Health check endpoints** para monitoreo
- ✅ **Dockerizado** (deploy fácil)

---

## 🛠️ Tecnologías

**Backend**: NestJS + TypeScript + APIs externas (Perenual, Pexels)  
**Frontend**: Angular 18 + Standalone Components  
**Deploy**: Docker + Docker Compose

---

## 📚 Documentación

- **[DEPLOY_SIMPLE.md](./DEPLOY_SIMPLE.md)** - Guía simple de despliegue
- **[QUICK_START.md](./QUICK_START.md)** - Inicio rápido paso a paso
- **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - Guía completa de Docker

---

## 🔑 API Keys

Ya incluidas en el proyecto (para uso personal):
- Perenual API: 300 requests/día
- Pexels API: 200 requests/hora

Si necesitas más, obtén las tuyas gratis:
- Perenual: https://perenual.com/docs/api
- Pexels: https://www.pexels.com/api/

---

## 🆘 Problemas?

Ver [DEPLOY_SIMPLE.md](./DEPLOY_SIMPLE.md) en la sección "Solución de Problemas"
- **RxJS** - Programación reactiva
- **CSS moderno** - Estilos personalizados

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js 18+ y npm
- Git

### Backend (NestJS)

1. **Navega a la carpeta del backend**:
```bash
cd plant-app_back
```

2. **Instala las dependencias**:
```bash
npm install
```

3. **Copia el archivo de configuración** (ya incluye API key funcional):
```bash
copy .env.example .env
```

4. **¡Listo!** El archivo `.env` ya incluye:
- Puerto 3000 configurado
- **API key gratuita de Perenual** (300 requests/día)
- CORS configurado
- ✅ Funciona sin configuración adicional

**Opcional**: Obtén tu propia API key en [perenual.com](https://perenual.com/docs/api) si quieres tu propia cuota

5. **Inicia el servidor**:
```bash
# Modo desarrollo (con auto-reload)
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El backend estará disponible en: `http://localhost:3000/api`

### Frontend (Angular)

1. **Navega a la carpeta del frontend**:
```bash
cd PlantApp_Front
```

2. **Instala las dependencias**:
```bash
npm install
```

3. **Inicia el servidor de desarrollo**:
```bash
npm start
```

El frontend estará disponible en: `http://localhost:4200`

## 📡 Endpoints de la API

### Plantas
- `GET /api/plants` - Obtener todas las plantas
- `GET /api/plants?category=Interior` - Filtrar por categoría
- `GET /api/plants/:id` - Obtener una planta específica
- `GET /api/plants/:id/diseases` - Obtener enfermedades de una planta
- `POST /api/plants` - Crear una nueva planta
- `PUT /api/plants/:id` - Actualizar una planta
- `DELETE /api/plants/:id` - Eliminar una planta

### Enfermedades
- `GET /api/diseases` - Obtener todas las enfermedades
- `GEerenual API (Datos Reales) 🌟
**Especies de Plantas:**
- `GET /api/perenual/species?page=1&query=tomato` - Lista de especies
- `GET /api/perenual/species/:id` - Detalles de una especie
- `GET /api/perenual/search?q=monstera` - Buscar plantas

**Filtros:**
- `GET /api/perenual/indoor?page=1` - Plantas de interior
- `GET /api/perenual/outdoor?page=1` - Plantas de exterior
- `GET /api/perenual/safe?page=1` - Plantas no tóxicas
- `GET /api/perenual/toxic?page=1` - Plantas tóxicas

**Cuidados y Enfermedades:**
- `GET /api/perenual/care/:speciesId` - Guía de cuidados
- `GET /api/perenual/pests?page=1` - Plagas y enfermedades
- `GET /api/perenual/pests/:id` - Detalles de plaga/enfermedad
### Plant.id API (próximamente)
- `POST /api/plant-id/identify` - Identificar una planta
- `POST /api/plant-id/health-check` - Diagnosticar salud de la planta
- `GET /api/plant-id/conversation/:token` - Oberenual API
│   ├── plant-id.controller.ts  # Endpoints Perenual
│   ├── plant-id.service.ts     # Cliente Perenual
│   └── plant-id.module.ts      # PerenualModule
### Backend (`plant-app_back/`)
```
src/
├── plants/                 # Módulo de plantas
│   ├── dto/               # Data Transfer Objects
│   ├── plants.controller.ts
│   ├── plants.service.ts
│   └── plants.module.ts
├── plant-id/              # Integración con Plant.id API
│   ├── plant-id.controller.ts
│   ├── plant-id.service.ts
│   └── plant-id.module.ts
├── app.module.ts          # Módulo principal
└── main.ts                # Punto de entrada
```

### Frontend (`PlantApp_Front/`)
```
src/app/     # PerenualService (datos reales)
├── components/            # Componentes de la UI
│   ├── navbar/
│   ├── home/
│   ├── plants-list/
│   ├── plant-detail/
│   ├── diseases-list/
│   ├── disease-detail/
│   └── identify/
├── services/              # Servicios HTTP
│   ├── plants.service.ts
│   ├── diseases.service.ts
│   ├── plant-id.service.ts
│   └── environment.service.ts
├── models/                # Interfaces TypeScript
│   ├── plant.model.ts
│   └── disease.model.ts
├── app.routes.ts          # Definición de rutas
└── app.config.ts          # Configuración de la app
```

## 🌟 Características Visuales

- **Diseño Responsivo**: Funciona en móviles, tablets y escritorio
- **Tema Verde Natural**: Paleta de colores inspirada en la naturaleza
- **Navegación Intuitiva**: Menú claro y fácil de usar
- **Tarjetas Informativas**: Información organizada visualmente
- **Filtros Dinámicos**: Filtra plantas y enfermedades fácilmente
- **Transiciones Suaves**: Animaciones CSS elegantes

## 📚 Datos de Ejemplo

La aplicación viene con datos de ejemplo precargados:

**Plantas**:
- Monstera Deliciosa
- Pothos
- Ficus Lyrata
- Tomate

**Enfermedades**:
- Pudrición de Raíz (hongo)
- Ácaros (plaga)
- Manchas en Hojas (hongo)
- Mildiu Polvoriento (hongo)
- Tizón (hongo)
- Virus del Mosaico (virus)

## 🔑 Perenual API - Datos Reales Gratuitos

✅ **Ya está configurado y funcionando**

La aplicación incluye una API key de Perenual que funciona de inmediato:
- ✅ 10,000+ especies de plantas
- ✅ Imágenes reales
- ✅ Información completa de cuidados
- ✅ Base de datos de plagas y enfermedades
- ✅ 300 búsquedas gratis al día

**¿Quieres tu propia API key?** (Opcional)
1. Visita [perenual.com/docs/api](https://perenual.com/docs/api)
2. Regístrate gratis (no requiere tarjeta de crédito)
3. Copia tu API key
4. Reemplázala en `.env`:
   ```env
   PERENUAL_API_KEY=tu_api_key_personal
   ```

**Explora la API**: Ve a la sección "Identificar" en la app para buscar entre miles de especies reales.

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que el puerto 3000 no esté en uso
- Asegúrate de haber ejecutado `npm install`

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Revisa la configuración en `environment.service.ts`

### Error de CORS
- El backend ya está configurado para aceptar peticiones desde `http://localhost:4200`
- Si usas otro puerto, actualiza la variable `CORS_ORIGIN` en `.env`

## ✅ **Perenual API**: ¡Ya integrada! Datos reales de 10,000+ especies
2. **Vista Detallada**: Página completa para cada especie de Perenual
3. **Base de Datos**: Conectar a PostgreSQL o MongoDB para favoritos
4. **Autenticación**: Sistema de usuarios con JWT
5. **Upload de Imágenes**: Permitir subir fotos de plantas
6. **Blog Posts**: Sistema de artículos y guías
7. **Comunidad**: Foro o comentarios
8. **PWA**: Convertir en Progressive Web App

## 🌟 Por qué Perenual API

| Característica | Perenual API | Plant.id |
|----------------|--------------|----------|
| Precio | ✅ **Gratis** (300/día) | ❌ $49/mes |
| Especies | ✅ 10,000+ | ✓ 17,000 |
| Imágenes | ✅ Sí | ✓ Sí |
| Cuidados | ✅ Sí | ✓ Limitado |
| Plagas/Enfermedades | ✅ Sí | ✓ Sí |
| Free tier | ✅ Generoso | ⚠️ Muy limitado |
| Tarjeta requerida | ✅ No | ❌ Sí |

**Resultado**: Perenual es **perfecta para desarrollo, aprendizaje y uso personal**. Sin costos ocultos.

---

## 🛠️ Scripts de Utilidad

Para facilitar el manejo de la aplicación, se incluyen scripts PowerShell:

### Iniciar Ambos Servicios
```powershell
.\start-services.ps1
```
Este script:
- ✅ Limpia automáticamente los puertos 3000 y 4200 si están ocupados
- ✅ Inicia el backend en una ventana separada
- ✅ Inicia el frontend en otra ventana
- ✅ Abre automáticamente el navegador

### Detener Todos los Servicios
```powershell
.\stop-services.ps1
```
Este script:
- 🛑 Detiene el backend y frontend
- 🧹 Limpia procesos residuales
- ✅ Libera los puertos 3000 y 4200

---

## 🐛 Solución de Problemas

### Error: "Port 3000 is already in use"

**Causa**: El backend ya está corriendo o hay un proceso zombie.

**Solución rápida**:
```powershell
# Opción 1: Usar el script
.\stop-services.ps1
.\start-services.ps1

# Opción 2: Manualmente
netstat -ano | findstr :3000
Stop-Process -Id [PID] -Force
```

### Error: "Port 4200 is already in use"

**Causa**: Angular dev server ya está corriendo.

**Solución**:
```powershell
# Opción 1: Usar el script
.\stop-services.ps1

# Opción 2: Manualmente
netstat -ano | findstr :4200
Stop-Process -Id [PID] -Force
```

### La página carga muy lento

**Soluciones**:
1. ✅ **Recarga forzada**: Presiona `Ctrl+Shift+R` en el navegador
2. ✅ **Limpia caché**: Abre DevTools (F12) → Network → Disable cache
3. ✅ **Verifica backend**: Debe responder en < 200ms
   ```powershell
   Invoke-WebRequest http://localhost:3000/api/diseases
   ```
4. ✅ **Reinicia servicios**: Usa `.\stop-services.ps1` y `.\start-services.ps1`

### Backend no responde

**Verificación**:
```powershell
# Ver si está corriendo
netstat -ano | findstr :3000

# Probar manualmente
Invoke-WebRequest http://localhost:3000/api/diseases
```

**Solución**:
```powershell
cd plant-app_back
npm run start:dev
```

### Frontend muestra errores CORS

**Causa**: Backend no está corriendo o CORS mal configurado.

**Solución**:
1. Verifica que el backend esté en `http://localhost:3000`
2. Revisa el archivo `.env` del backend:
   ```env
   CORS_ORIGIN=http://localhost:4200
   ```

### Errores de compilación de Angular

**Solución**:
```powershell
cd PlantApp_Front
rm -r node_modules
npm install
npm start
```

---

1. **Base de Datos**: Conectar a PostgreSQL o MongoDB
2. **Autenticación**: Sistema de usuarios con JWT
3. **Upload de Imágenes**: Permitir subir fotos de plantas
4. **Plant.id Integration**: Completar integración con IA
5. **Blog Posts**: Sistema de artículos y guías
6. **Comunidad**: Foro o comentarios
7. **PWA**: Convertir en Progressive Web App

## 📧 Contacto

- Desarrollado como proyecto educativo
- Datos de ejemplo incluidos
- API REST documentada

## 📄 Licencia

Proyecto de código abierto para fines educativos.

---

**Hecho con 💚 y ☕ para amantes de las plantas**
