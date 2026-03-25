# Recuerdos Inolvidables - Tienda Full Stack

Una aplicación full-stack moderna para tienda de regalos artesanales con cajitas personalizadas, construida con React, Vite y Netlify Functions.

## 🚀 Características

- ✨ **Frontend Moderno**: React 18 + Vite + TailwindCSS
- 🔧 **Backend Serverless**: Netlify Functions
- 📧 **Sistema de Emails**: Notificaciones automáticas para pedidos y cotizaciones
- 📱 **Responsive**: Diseño optimizado para móviles, tablets y desktop
- 🎨 **Personalización en Tiempo Real**: Preview dinámico de la cajita personalizada
- 🛒 **Catálogo Interactivo**: Filtros por categorías
- 💳 **Integración WhatsApp**: Contacto directo con clientes

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta en Netlify (gratuita)
- Cuenta de Gmail para envío de emails (o cualquier SMTP)

## 🛠️ Instalación Local

1. **Clonar o navegar al directorio del proyecto**:
```bash
cd c:\Users\Valeria\Documents\Tienda
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
Copia `.env.example` a `.env` y configura tus valores:
```bash
copy .env.example .env
```

Edita `.env` con tus credenciales:
```env
# WhatsApp
VITE_WHATSAPP_NUMBER=573001234567

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_correo@gmail.com
SMTP_PASS=tu_app_password
SHOP_EMAIL=tu_correo@gmail.com
```

**Nota**: Para Gmail, necesitas crear una "App Password" en tu cuenta de Google:
1. Ve a https://myaccount.google.com/security
2. Activa la verificación en 2 pasos
3. Genera una "App Password" para "Mail"
4. Usa esa contraseña en `SMTP_PASS`

4. **Ejecutar en desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

5. **Probar con Netlify Dev (recomendado)**:
```bash
npm run netlify:dev
```

Esto ejecuta el proyecto con las Netlify Functions activas en `http://localhost:8888`

## 📦 Despliegue en Netlify

### Opción 1: Desde la Interfaz Web de Netlify

1. **Sube tu código a GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

2. **Conecta con Netlify**:
   - Ve a https://app.netlify.com
   - Click en "Add new site" > "Import an existing project"
   - Conecta tu repositorio de GitHub
   - Netlify detectará automáticamente la configuración de `netlify.toml`

3. **Configura las Variables de Entorno**:
   - En el dashboard de Netlify, ve a "Site settings" > "Environment variables"
   - Agrega todas las variables de tu archivo `.env`:
     - `VITE_WHATSAPP_NUMBER`
     - `SMTP_HOST`
     - `SMTP_PORT`
     - `SMTP_USER`
     - `SMTP_PASS`
     - `SHOP_EMAIL`

4. **Deploy**:
   - Click en "Deploy site"
   - Netlify construirá y desplegará automáticamente

### Opción 2: Desde la CLI de Netlify

1. **Instalar Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login en Netlify**:
```bash
netlify login
```

3. **Inicializar el sitio**:
```bash
netlify init
```

4. **Configurar variables de entorno**:
```bash
netlify env:set VITE_WHATSAPP_NUMBER "573001234567"
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_USER "tu_correo@gmail.com"
netlify env:set SMTP_PASS "tu_app_password"
netlify env:set SHOP_EMAIL "tu_correo@gmail.com"
```

5. **Deploy**:
```bash
netlify deploy --prod
```

## 🏗️ Estructura del Proyecto

```
Tienda/
├── netlify/
│   └── functions/          # Netlify Functions (Backend)
│       ├── send-order.js   # Procesar pedidos
│       ├── send-quote.js   # Procesar cotizaciones
│       └── package.json    # Dependencias del backend
├── public/                 # Archivos estáticos
│   ├── ejmplo1.jpg        # Imagen de fondo de la cajita
│   ├── image_ac85fe.png   # Foto de ejemplo
│   └── image_ac867c.png   # Imagen del conejito
├── src/
│   ├── components/        # Componentes React
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── WhatsAppButton.jsx
│   │   ├── ProductHero.jsx
│   │   ├── CuadroPreview.jsx
│   │   ├── CharacterSelector.jsx
│   │   ├── PersonalizationForm.jsx
│   │   ├── OrderModal.jsx
│   │   ├── QuoteModal.jsx
│   │   ├── CatalogPreview.jsx
│   │   └── ProductGrid.jsx
│   ├── pages/             # Páginas
│   │   ├── Home.jsx
│   │   └── Catalog.jsx
│   ├── data/              # Datos
│   │   └── products.js
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── index_new.html         # HTML principal (renombrar a index.html)
├── netlify.toml           # Configuración de Netlify
├── vite.config.js         # Configuración de Vite
├── tailwind.config.js     # Configuración de Tailwind
├── package.json           # Dependencias del proyecto
└── .env.example           # Ejemplo de variables de entorno
```

## 🔧 Configuración Adicional

### Actualizar Imágenes

1. Coloca tus imágenes en la carpeta `public/`
2. Actualiza las rutas en los componentes:
   - `CuadroPreview.jsx`: Imagen de fondo de la cajita
   - `CharacterSelector.jsx`: Imágenes de los personajes

### Personalizar Productos

Edita `src/data/products.js` para agregar, modificar o eliminar productos del catálogo.

### Cambiar Colores y Estilos

Modifica `tailwind.config.js` para personalizar la paleta de colores y otros estilos.

## 📱 Funcionalidades

### Cajita Personalizada
- Preview en tiempo real
- Selección de personaje (Conejito, Osito, Perrito, Gatito)
- Carga de foto del bebé
- Formulario con datos del nacimiento
- Envío de pedido por email

### Catálogo
- Filtros por categoría
- Grid responsive de productos
- Cotización de ideas personalizadas

### Notificaciones por Email
- Email al dueño de la tienda con detalles del pedido
- Email de confirmación al cliente
- Notificaciones de cotizaciones

## 🐛 Solución de Problemas

### Las Netlify Functions no funcionan localmente
- Asegúrate de usar `npm run netlify:dev` en lugar de `npm run dev`
- Verifica que las variables de entorno estén configuradas

### Los emails no se envían
- Verifica que las credenciales SMTP sean correctas
- Para Gmail, asegúrate de usar una "App Password"
- Revisa los logs en Netlify: Site > Functions > Logs

### Error al subir imágenes
- Verifica que el input de archivo esté funcionando
- Las imágenes se convierten a base64 para el preview

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para Recuerdos Inolvidables.

## 🤝 Soporte

Para soporte, contacta a través de WhatsApp o email configurado en las variables de entorno.
