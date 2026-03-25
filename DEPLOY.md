# Guía de Despliegue en Netlify - Paso a Paso

Esta guía te llevará paso a paso para desplegar tu tienda en Netlify con todas las funcionalidades backend funcionando.

## 📋 Preparación Previa

### 1. Configurar Gmail para Envío de Emails

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Click en "Seguridad" en el menú lateral
3. Activa la "Verificación en 2 pasos" si no la tienes activada
4. Una vez activada, busca "Contraseñas de aplicaciones"
5. Selecciona "Correo" y "Otro (nombre personalizado)"
6. Escribe "Tienda Netlify" y genera la contraseña
7. **Guarda esta contraseña** - la necesitarás para las variables de entorno

### 2. Preparar el Código

1. **Renombrar archivo HTML**:
```bash
# Renombra index_new.html a index.html
move index_new.html index.html.backup
move index.html index_old.html
move index_new.html index.html
```

2. **Copiar imágenes necesarias**:
Asegúrate de que estas imágenes estén en la carpeta `public/`:
- `ejmplo1.jpg` (fondo de la cajita)
- `image_ac85fe.png` (foto de ejemplo del bebé)
- `image_ac867c.png` (imagen del conejito)

## 🚀 Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Subir a GitHub

1. **Crear repositorio en GitHub**:
   - Ve a https://github.com/new
   - Nombre: `recuerdos-inolvidables` (o el que prefieras)
   - Privado o Público según prefieras
   - NO inicialices con README, .gitignore ni licencia

2. **Subir tu código**:
```bash
# Navega a tu carpeta
cd c:\Users\Valeria\Documents\Tienda

# Inicializa git
git init

# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit - Tienda Recuerdos Inolvidables"

# Conecta con GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU_USUARIO/recuerdos-inolvidables.git

# Sube el código
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Netlify

1. **Crear cuenta en Netlify**:
   - Ve a https://app.netlify.com/signup
   - Regístrate con GitHub (recomendado) o email

2. **Importar proyecto**:
   - Click en "Add new site" > "Import an existing project"
   - Selecciona "GitHub"
   - Autoriza a Netlify a acceder a tus repositorios
   - Selecciona el repositorio `recuerdos-inolvidables`

3. **Configurar build**:
   Netlify detectará automáticamente la configuración desde `netlify.toml`, pero verifica:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

4. **Click en "Deploy site"**

### Paso 3: Configurar Variables de Entorno

1. En el dashboard de Netlify, ve a:
   **Site settings** > **Environment variables** > **Add a variable**

2. Agrega las siguientes variables una por una:

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `VITE_WHATSAPP_NUMBER` | Tu número de WhatsApp con código de país | `573001234567` |
| `SMTP_HOST` | Servidor SMTP | `smtp.gmail.com` |
| `SMTP_PORT` | Puerto SMTP | `587` |
| `SMTP_USER` | Tu email de Gmail | `tucorreo@gmail.com` |
| `SMTP_PASS` | La App Password que generaste | `abcd efgh ijkl mnop` |
| `SHOP_EMAIL` | Email donde recibirás pedidos | `tucorreo@gmail.com` |

3. **Click en "Save"** después de agregar cada variable

### Paso 4: Redesplegar

1. Ve a **Deploys** en el menú superior
2. Click en "Trigger deploy" > "Deploy site"
3. Espera a que termine el despliegue (2-3 minutos)

### Paso 5: Probar tu Sitio

1. Una vez desplegado, verás un URL como: `https://nombre-aleatorio.netlify.app`
2. Puedes cambiar el nombre:
   - Ve a **Site settings** > **Site details** > **Change site name**
   - Elige algo como: `recuerdos-inolvidables`
   - Tu URL será: `https://recuerdos-inolvidables.netlify.app`

3. **Prueba las funcionalidades**:
   - ✅ Navega por el sitio
   - ✅ Personaliza una cajita
   - ✅ Envía un pedido de prueba
   - ✅ Solicita una cotización
   - ✅ Verifica que lleguen los emails

## 🚀 Opción 2: Despliegue Directo con Netlify CLI

### Paso 1: Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Paso 2: Login

```bash
netlify login
```

Se abrirá tu navegador para autorizar. Acepta y vuelve a la terminal.

### Paso 3: Inicializar Sitio

```bash
cd c:\Users\Valeria\Documents\Tienda
netlify init
```

Selecciona:
- "Create & configure a new site"
- Elige tu team
- Nombre del sitio: `recuerdos-inolvidables`

### Paso 4: Configurar Variables de Entorno

```bash
netlify env:set VITE_WHATSAPP_NUMBER "573001234567"
netlify env:set SMTP_HOST "smtp.gmail.com"
netlify env:set SMTP_PORT "587"
netlify env:set SMTP_USER "tucorreo@gmail.com"
netlify env:set SMTP_PASS "tu_app_password_aqui"
netlify env:set SHOP_EMAIL "tucorreo@gmail.com"
```

### Paso 5: Deploy

```bash
# Deploy de prueba
netlify deploy

# Si todo se ve bien, deploy a producción
netlify deploy --prod
```

## 🔄 Actualizaciones Futuras

### Con GitHub (Automático):
```bash
# Haz cambios en tu código
git add .
git commit -m "Descripción de los cambios"
git push

# Netlify desplegará automáticamente
```

### Con CLI (Manual):
```bash
netlify deploy --prod
```

## ✅ Checklist Post-Despliegue

- [ ] El sitio carga correctamente
- [ ] Las imágenes se ven bien
- [ ] El formulario de cajita funciona
- [ ] Se pueden seleccionar personajes
- [ ] El preview se actualiza en tiempo real
- [ ] Se puede subir una foto
- [ ] El modal de pedido se abre
- [ ] Se envía el email al hacer un pedido
- [ ] El catálogo muestra productos
- [ ] Los filtros funcionan
- [ ] El modal de cotización funciona
- [ ] El botón de WhatsApp funciona
- [ ] El sitio es responsive en móvil

## 🐛 Solución de Problemas Comunes

### Error: "Function invocation failed"

**Causa**: Las variables de entorno no están configuradas o las Netlify Functions tienen un error.

**Solución**:
1. Ve a Site settings > Environment variables
2. Verifica que todas las variables estén configuradas
3. Redesplega el sitio
4. Revisa los logs: Site > Functions > [nombre-función] > Logs

### Los emails no llegan

**Causa**: Credenciales SMTP incorrectas o Gmail bloqueando el acceso.

**Solución**:
1. Verifica que uses una "App Password" de Google, no tu contraseña normal
2. Asegúrate de que la verificación en 2 pasos esté activada
3. Revisa los logs de la función `send-order` en Netlify

### Las imágenes no se ven

**Causa**: Las imágenes no están en la carpeta `public/`.

**Solución**:
1. Asegúrate de que las imágenes estén en `public/`
2. Haz commit y push de las imágenes
3. Redesplega

### Error 404 al navegar

**Causa**: Falta la configuración de redirects.

**Solución**:
El archivo `netlify.toml` ya incluye los redirects necesarios. Si persiste:
1. Verifica que `netlify.toml` esté en la raíz del proyecto
2. Redesplega el sitio

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Netlify: Site > Functions > Logs
2. Verifica la consola del navegador (F12)
3. Consulta la documentación de Netlify: https://docs.netlify.com

## 🎉 ¡Listo!

Tu tienda está ahora desplegada en Netlify con:
- ✅ Frontend moderno y responsive
- ✅ Backend serverless con Netlify Functions
- ✅ Sistema de emails automático
- ✅ Integración con WhatsApp
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Despliegues automáticos (si usas GitHub)

**URL de tu tienda**: `https://tu-sitio.netlify.app`
