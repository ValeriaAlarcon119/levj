# Arquitectura de la Aplicación Full-Stack

## 🏗️ Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                            │
│                    (Navegador Web / Móvil)                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NETLIFY CDN                                 │
│                   (Edge Network Global)                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    FRONTEND                               │  │
│  │  ┌────────────────────────────────────────────────┐      │  │
│  │  │  React App (SPA)                               │      │  │
│  │  │  - Vite Build                                  │      │  │
│  │  │  - TailwindCSS                                 │      │  │
│  │  │  - React Router                                │      │  │
│  │  │  - Componentes:                                │      │  │
│  │  │    • Header / Footer                           │      │  │
│  │  │    • ProductHero                               │      │  │
│  │  │    • CuadroPreview (Tiempo Real)               │      │  │
│  │  │    • CharacterSelector                         │      │  │
│  │  │    • PersonalizationForm                       │      │  │
│  │  │    • Catalog + Filters                         │      │  │
│  │  │    • Modals (Order, Quote)                     │      │  │
│  │  └────────────────────────────────────────────────┘      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         │                                        │
│                         │ API Calls (/api/*)                     │
│                         ▼                                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              NETLIFY FUNCTIONS (Backend)                  │  │
│  │  ┌────────────────────────────────────────────────┐      │  │
│  │  │  send-order.js                                 │      │  │
│  │  │  - Recibe datos del pedido                     │      │  │
│  │  │  - Valida información                          │      │  │
│  │  │  - Envía emails                                │      │  │
│  │  │  - Retorna confirmación                        │      │  │
│  │  └────────────────────────────────────────────────┘      │  │
│  │  ┌────────────────────────────────────────────────┐      │  │
│  │  │  send-quote.js                                 │      │  │
│  │  │  - Recibe cotización                           │      │  │
│  │  │  - Envía notificación                          │      │  │
│  │  │  - Retorna confirmación                        │      │  │
│  │  └────────────────────────────────────────────────┘      │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ SMTP
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SERVICIOS EXTERNOS                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Gmail SMTP      │  │  WhatsApp API    │  │  Analytics   │  │
│  │  (Emails)        │  │  (Contacto)      │  │  (Opcional)  │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Flujo de Datos - Pedido de Cajita

```
1. USUARIO
   │
   ├─ Personaliza cajita (nombre, fecha, foto, etc.)
   │  └─ Preview se actualiza en tiempo real (React State)
   │
   ├─ Selecciona personaje
   │  └─ Estado local actualizado
   │
   ├─ Click "Pedir Cajita"
   │  └─ Abre OrderModal
   │
   ├─ Ingresa email y teléfono
   │  └─ Click "Confirmar Pedido"
   │
   ▼
2. FRONTEND (OrderModal.jsx)
   │
   ├─ Valida formulario
   ├─ Prepara datos:
   │  {
   │    clientEmail: "cliente@email.com",
   │    clientPhone: "3001234567",
   │    boxData: {
   │      nombre: "Luciana",
   │      apellidos: "Barrera",
   │      fecha: "2021-12-10",
   │      hora: "07:45",
   │      peso: "3.2",
   │      talla: "50",
   │      personaje: "Conejito",
   │      foto: "base64..."
   │    }
   │  }
   │
   ├─ POST /api/send-order
   │
   ▼
3. NETLIFY FUNCTION (send-order.js)
   │
   ├─ Recibe request
   ├─ Valida método (POST)
   ├─ Parse JSON body
   │
   ├─ Configura transporter SMTP
   │  └─ Usa variables de entorno
   │
   ├─ Prepara email para DUEÑO:
   │  │ To: SHOP_EMAIL
   │  │ Subject: "Nuevo Pedido - Luciana"
   │  │ Body: HTML con todos los datos
   │  └─ Envía
   │
   ├─ Prepara email para CLIENTE:
   │  │ To: clientEmail
   │  │ Subject: "Pedido Recibido"
   │  │ Body: Confirmación con detalles
   │  └─ Envía
   │
   ├─ Return 200 OK
   │
   ▼
4. FRONTEND (OrderModal.jsx)
   │
   ├─ Recibe respuesta exitosa
   ├─ Muestra mensaje de éxito
   ├─ Cierra modal después de 2s
   │
   ▼
5. EMAILS ENVIADOS
   │
   ├─ DUEÑO recibe notificación con:
   │  - Datos del cliente
   │  - Detalles de la cajita
   │  - Instrucción de contactar por WhatsApp
   │
   └─ CLIENTE recibe confirmación con:
      - Resumen del pedido
      - Precio
      - Próximos pasos
```

## 🎨 Flujo de Personalización en Tiempo Real

```
USUARIO INTERACTÚA
       │
       ├─ Escribe nombre
       │  └─ onChange → updateFormData → React State
       │     └─ Re-render CuadroPreview
       │        └─ Texto actualizado en preview
       │
       ├─ Cambia fecha
       │  └─ onChange → updateFormData → formatDate()
       │     └─ Preview muestra fecha formateada
       │
       ├─ Sube foto
       │  └─ onChange → FileReader → base64
       │     └─ updateFormData → foto state
       │        └─ Preview muestra nueva foto
       │
       └─ Selecciona personaje
          └─ onClick → setSelectedCharacter
             └─ Visual feedback (border, bg color)
```

## 📊 Stack Tecnológico Detallado

### Frontend
```
React 18.2
├── Vite 5.0 (Build Tool)
│   ├── Hot Module Replacement
│   ├── Fast Refresh
│   └── Optimized Build
│
├── React Router 6.20 (Routing)
│   ├── BrowserRouter
│   ├── Routes / Route
│   └── useNavigate, useParams
│
├── TailwindCSS 3.3 (Styling)
│   ├── Utility-first CSS
│   ├── Custom theme
│   ├── Responsive design
│   └── Animations
│
├── Lucide React (Icons)
│   └── Tree-shakeable icons
│
└── Axios 1.6 (HTTP Client)
    └── API calls to Functions
```

### Backend (Serverless)
```
Netlify Functions
├── Node.js 18+
├── esbuild (Bundler)
│
└── Dependencies
    └── Nodemailer 6.9
        ├── SMTP Transport
        ├── HTML emails
        └── Attachments support
```

### Deployment
```
Netlify
├── Build
│   ├── npm run build
│   ├── Vite optimization
│   └── Output: dist/
│
├── Functions
│   ├── Auto-deploy from netlify/functions/
│   ├── Serverless execution
│   └── Environment variables
│
├── CDN
│   ├── Global edge network
│   ├── HTTPS automatic
│   └── Cache optimization
│
└── Features
    ├── Continuous Deployment (GitHub)
    ├── Preview Deploys
    ├── Rollbacks
    └── Analytics
```

## 🔐 Seguridad

```
Variables de Entorno
├── .env (Local - NO en Git)
│   └── .gitignore incluye .env
│
└── Netlify Dashboard (Producción)
    ├── Encriptadas en reposo
    ├── Inyectadas en build time
    └── Accesibles en Functions

HTTPS
├── Certificado SSL automático
├── Let's Encrypt
└── Renovación automática

Headers de Seguridad
├── X-Frame-Options: DENY
├── X-XSS-Protection
├── X-Content-Type-Options
└── Referrer-Policy
```

## 📈 Performance

```
Frontend Optimization
├── Code Splitting
│   ├── Vendor chunk (React, Router)
│   ├── Icons chunk (Lucide)
│   └── Lazy loading (futuro)
│
├── Asset Optimization
│   ├── Images: WebP, lazy load
│   ├── CSS: Purged, minified
│   └── JS: Minified, tree-shaken
│
└── Caching
    ├── Static assets: 1 year
    ├── HTML: No cache
    └── API: No cache

Backend Optimization
├── Serverless Functions
│   ├── Cold start: ~100-300ms
│   ├── Warm execution: ~50ms
│   └── Auto-scaling
│
└── Email Delivery
    ├── Async processing
    └── Error handling
```

## 🚀 Escalabilidad

```
Netlify Free Tier
├── 100 GB bandwidth/month
├── 300 build minutes/month
├── 125k function invocations/month
└── 100 hours function runtime/month

Suficiente para:
├── ~10,000 visitantes/mes
├── ~1,000 pedidos/mes
└── ~500 cotizaciones/mes

Para escalar:
├── Upgrade a plan Pro ($19/mes)
│   ├── 400 GB bandwidth
│   ├── 1000 build minutes
│   └── 2M function invocations
│
└── Optimizaciones adicionales:
    ├── Image CDN (Cloudinary)
    ├── Database (Supabase/Firebase)
    └── Queue system (para emails masivos)
```

## 🔄 Ciclo de Desarrollo

```
1. DESARROLLO LOCAL
   npm run netlify:dev
   └─ http://localhost:8888

2. COMMIT & PUSH
   git add .
   git commit -m "Feature: ..."
   git push

3. NETLIFY BUILD
   ├─ Detecta push
   ├─ Ejecuta npm run build
   ├─ Despliega Functions
   └─ Publica a CDN

4. PREVIEW DEPLOY
   ├─ URL única de preview
   ├─ Pruebas en producción
   └─ Comentario en PR (si aplica)

5. PRODUCCIÓN
   ├─ Merge a main
   ├─ Deploy automático
   └─ URL principal actualizada

6. MONITOREO
   ├─ Netlify Analytics
   ├── Function Logs
   └─ Error tracking
```

Esta arquitectura proporciona:
- ✅ **Escalabilidad**: Serverless auto-scaling
- ✅ **Performance**: CDN global + optimizaciones
- ✅ **Seguridad**: HTTPS + variables encriptadas
- ✅ **Mantenibilidad**: Código modular + documentación
- ✅ **Costo-efectivo**: Free tier generoso
- ✅ **Developer Experience**: Hot reload + CI/CD
