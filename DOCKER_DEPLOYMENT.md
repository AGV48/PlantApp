# 🐳 Despliegue con Docker - PlantApp

Esta guía te muestra cómo desplegar la aplicación completa usando Docker y Docker Compose.

---

## 📋 Requisitos Previos

- **Docker Desktop** instalado ([descargar aquí](https://www.docker.com/products/docker-desktop))
- **Git** (para clonar el repositorio)
- **Mínimo 4GB RAM** libre
- **5GB** de espacio en disco

---

## 🚀 Quick Start

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/PlantApp.git
cd PlantApp
```

### 2. Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.docker .env

# Editar con tus API keys (opcional, ya tiene valores por defecto)
notepad .env  # Windows
nano .env     # Linux/Mac
```

### 3. Construir e Iniciar

```bash
# Construir y levantar todos los servicios
docker-compose up --build
```

**¡Listo!** La aplicación estará disponible en:
- 🎨 **Frontend**: http://localhost:4200
- 🔧 **Backend**: http://localhost:3000/api
- 💚 **Health Check**: http://localhost:3000/api/ping

---

## 📦 Estructura del Proyecto

```
PlantApp/
├── docker-compose.yml           # Orquestación de servicios
├── docker-compose.prod.yml      # Configuración de producción
├── .env.docker                  # Variables de entorno (ejemplo)
├── plant-app_back/
│   ├── Dockerfile              # Imagen del backend
│   ├── .dockerignore
│   └── ... (código backend)
└── PlantApp_Front/
    ├── Dockerfile              # Imagen del frontend
    ├── nginx.conf              # Configuración de Nginx
    ├── .dockerignore
    └── ... (código frontend)
```

---

## 🛠️ Comandos Útiles

### Desarrollo

```bash
# Iniciar servicios
docker-compose up

# Iniciar en background (detached)
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir imágenes
docker-compose up --build

# Reconstruir forzando recreación
docker-compose up --build --force-recreate
```

### Verificar Estado

```bash
# Ver servicios corriendo
docker-compose ps

# Ver uso de recursos
docker stats

# Inspeccionar un contenedor
docker inspect plantapp-backend
docker inspect plantapp-frontend
```

### Ejecutar Comandos Dentro de Contenedores

```bash
# Entrar al backend
docker exec -it plantapp-backend sh

# Entrar al frontend
docker exec -it plantapp-frontend sh

# Ver logs del backend
docker logs plantapp-backend

# Ver logs del frontend
docker logs plantapp-frontend
```

---

## 🌐 Despliegue en Producción

### Opción 1: Servidor Propio (VPS, DigitalOcean, AWS EC2)

#### 1. Preparar el Servidor

```bash
# Conectar por SSH
ssh user@tu-servidor.com

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Clonar y Configurar

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/PlantApp.git
cd PlantApp

# Configurar variables de entorno
cp .env.docker .env
nano .env

# Actualizar CORS con tu dominio
# FRONTEND_URL=https://tudominio.com
```

#### 3. Levantar en Producción

```bash
# Usando docker-compose con configuración de producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Verificar que estén corriendo
docker-compose ps

# Ver logs
docker-compose logs -f
```

#### 4. Configurar Nginx Reverse Proxy (Opcional pero Recomendado)

Instalar Nginx en el host:

```bash
sudo apt install nginx certbot python3-certbot-nginx
```

Crear configuración (`/etc/nginx/sites-available/plantapp`):

```nginx
server {
    server_name tudominio.com www.tudominio.com;

    # Frontend
    location / {
        proxy_pass http://localhost:4200;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activar y obtener SSL:

```bash
sudo ln -s /etc/nginx/sites-available/plantapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

---

### Opción 2: Railway.app con Docker

Railway soporta desplegar desde Dockerfile automáticamente.

#### 1. Preparar repositorio

Asegúrate de tener en la raíz:
- `Dockerfile` (para un servicio)
- O múltiples servicios (backend y frontend separados)

#### 2. Deploy en Railway

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Crear proyecto
railway init

# Deploy backend
cd plant-app_back
railway up

# Deploy frontend (en otra ventana)
cd PlantApp_Front
railway up
```

#### 3. Configurar Variables de Entorno

En el dashboard de Railway, agrega:
```
CORS_ORIGIN=https://tu-frontend.railway.app
PERENUAL_API_KEY=tu-key
PEXELS_API_KEY=tu-key
```

---

### Opción 3: Render.com con Docker

Render detecta Dockerfile automáticamente.

#### Para el Backend:

1. Crear "Web Service" desde el repo
2. Root Directory: `plant-app_back`
3. Render detecta el Dockerfile
4. Agregar variables de entorno

#### Para el Frontend:

1. Crear otro "Web Service"
2. Root Directory: `PlantApp_Front`
3. Render detecta el Dockerfile
4. Nginx sirve en puerto 80

---

### Opción 4: DigitalOcean App Platform

```yaml
# .do/app.yaml
name: plantapp
services:
  - name: backend
    github:
      repo: tu-usuario/PlantApp
      branch: main
      deploy_on_push: true
    dockerfile_path: plant-app_back/Dockerfile
    envs:
      - key: NODE_ENV
        value: production
      - key: PERENUAL_API_KEY
        value: ${PERENUAL_API_KEY}
    http_port: 3000
    health_check:
      http_path: /api/ping

  - name: frontend
    github:
      repo: tu-usuario/PlantApp
      branch: main
      deploy_on_push: true
    dockerfile_path: PlantApp_Front/Dockerfile
    http_port: 80
    health_check:
      http_path: /health
```

Deploy:
```bash
doctl apps create --spec .do/app.yaml
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno Personalizadas

Editar `.env`:

```bash
# Frontend
FRONTEND_URL=https://tudominio.com

# Backend
NODE_ENV=production
CORS_ORIGIN=https://tudominio.com,https://www.tudominio.com

# APIs
PERENUAL_API_KEY=tu-key-real
PEXELS_API_KEY=tu-key-real
CACHE_TTL_HOURS=24

# Puertos (solo cambiar si hay conflictos)
BACKEND_PORT=3000
FRONTEND_PORT=4200
```

### Escalado

Para manejar más tráfico, puedes escalar horizontalmente:

```bash
# Levantar múltiples instancias del backend
docker-compose up -d --scale backend=3
```

Después configurar un load balancer (nginx, HAProxy, etc.)

### Logs Persistentes

Modificar `docker-compose.prod.yml`:

```yaml
services:
  backend:
    volumes:
      - ./logs/backend:/app/logs
  frontend:
    volumes:
      - ./logs/frontend:/var/log/nginx
```

---

## 🧪 Testing

### Probar Health Checks

```bash
# Backend
curl http://localhost:3000/api/ping
curl http://localhost:3000/api/health

# Frontend
curl http://localhost:4200/health
```

### Probar Conectividad Frontend-Backend

1. Abrir http://localhost:4200
2. Abrir DevTools (F12) → Network
3. Navegar a "Plantas"
4. Verificar requests exitosas a `http://localhost:3000/api/...`

---

## 🐛 Troubleshooting

### Error: "Cannot connect to Docker daemon"

```bash
# Windows: Iniciar Docker Desktop
# Linux: Iniciar servicio Docker
sudo systemctl start docker
```

### Error: "Port already in use"

```bash
# Ver qué está usando el puerto
# Windows:
netstat -ano | findstr :3000
netstat -ano | findstr :4200

# Linux/Mac:
lsof -i :3000
lsof -i :4200

# Detener el proceso o cambiar puerto en docker-compose.yml
```

### Error: "Build failed" o "Out of memory"

```bash
# Aumentar memoria de Docker Desktop
# Settings → Resources → Memory → 4GB mínimo

# O usar build con menos workers
docker-compose build --parallel 1
```

### Frontend no carga o página blanca

```bash
# Ver logs del frontend
docker logs plantapp-frontend

# Entrar al contenedor y verificar archivos
docker exec -it plantapp-frontend sh
ls -la /usr/share/nginx/html
```

### Backend no responde

```bash
# Ver logs
docker logs plantapp-backend

# Verificar health check
docker inspect plantapp-backend | grep -A 10 Health

# Entrar al contenedor
docker exec -it plantapp-backend sh
```

### CORS errors en producción

Verificar que `CORS_ORIGIN` en el backend tenga la URL correcta del frontend:

```bash
# Actualizar .env
FRONTEND_URL=https://tu-dominio-real.com

# Reiniciar
docker-compose restart backend
```

---

## 📊 Monitoreo

### Ver Recursos

```bash
# Ver uso de CPU/memoria en tiempo real
docker stats

# Ver espacio usado
docker system df
```

### Configurar UptimeRobot

Para monitorear tu aplicación desplegada:

1. Crear monitor HTTP(s)
2. URL: `https://tudominio.com/api/ping`
3. Interval: 5 minutos
4. Alertas: Email, Slack, etc.

---

## 🔒 Seguridad

### Buenas Prácticas

1. **No commits de .env** - Usar `.gitignore`
2. **Variables sensibles** - Usar secrets en tu servicio de hosting
3. **HTTPS** - Siempre en producción (Certbot, Let's Encrypt)
4. **Actualizaciones** - Mantener Docker y dependencias actualizadas
5. **Firewall** - Solo abrir puertos necesarios (80, 443)

### Actualizar Imagen Base

```dockerfile
# Usar versiones específicas en lugar de 'latest'
FROM node:18.19.0-alpine
```

---

## 🧹 Mantenimiento

### Limpiar Recursos Docker

```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no usadas
docker image prune -a

# Eliminar volúmenes no usados
docker volume prune

# Limpieza completa (CUIDADO)
docker system prune -a --volumes
```

### Actualizar Aplicación

```bash
# Pull últimos cambios
git pull origin main

# Reconstruir y reiniciar
docker-compose down
docker-compose up --build -d
```

---

## 💰 Costos Estimados

### Hosting con Docker

| Servicio | Specs | Costo Mensual |
|----------|-------|---------------|
| **DigitalOcean Droplet** | 2GB RAM, 1 vCPU | $12/mes |
| **Railway** | Hobby Plan | $5/mes |
| **Render** | Free Tier | $0 (con limitaciones) |
| **AWS Lightsail** | 1GB RAM | $5/mes |
| **Heroku** | Eco Dyno | $5/mes |

---

## ✅ Checklist de Despliegue

- [ ] Docker Desktop instalado y corriendo
- [ ] Repositorio clonado
- [ ] `.env` configurado con API keys
- [ ] `docker-compose up --build` exitoso
- [ ] Frontend accesible en http://localhost:4200
- [ ] Backend accesible en http://localhost:3000/api
- [ ] Health checks funcionando
- [ ] Datos de plantas se cargan en el frontend
- [ ] Sin errores en logs (`docker-compose logs`)
- [ ] Listo para producción

---

## 📚 Recursos Adicionales

- [Docker Docs](https://docs.docker.com/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)

---

¿Necesitas ayuda con algún paso específico?
