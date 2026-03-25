# Recuerdos y Artesanías Levj - Tienda de Regalos

Una aplicación full-stack moderna para la tienda de regalos artesanales de Valeria Alarcón. Especializada en cajitas de nacimiento personalizadas, amigurumis, joyería en mostacilla y detalles únicos hechos a mano.

🌐 **Sitio web en vivo**: [https://levj.netlify.app](https://levj.netlify.app)

## 🚀 Características

- ✨ **Catálogo Interactivo**: Explora nuestras colecciones de amigurumis, joyería, boxes y más.
- 🎨 **Cajita de Nacimiento Personalizada**: Crea un recuerdo digital y físico con los datos del bebé.
- 📱 **100% Responsive**: Optimizado para una experiencia perfecta en celulares y computadoras.
- 🛍️ **Canasta de Compras**: Agrega múltiples productos y finaliza tu pedido vía WhatsApp y Email.
- ✉️ **Backend Serverless**: Sistema automático de notificaciones gestionado con Netlify Functions.

## 🛠️ Stack Tecnológico

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React.
- **Backend**: Node.js, Netlify Functions.
- **Email**: Integración SMTP para confirmación de pedidos.
- **Diseño**: Estética moderna con toques artesanales y premium.

## 📋 Requisitos Previos

- Node.js 18 o superior.
- Git instalado.
- Cuenta en Netlify para el despliegue.

## 💻 Instalación y Desarrollo Local

1.  **Clonar este repositorio**:
    ```bash
    git clone https://github.com/ValeriaAlarcon119/levj.git
    cd levj
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**:
    Crea un archivo `.env` en la raíz (basado en `.env.example`) con:
    ```env
    VITE_WHATSAPP_NUMBER=57XXXXXXXXXX
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=tu_correo@gmail.com
    SMTP_PASS=tu_app_password
    SHOP_EMAIL=tu_correo@gmail.com
    ```

4.  **Correr en Desarrollo**:
    ```bash
    npm run dev
    ```

## 📦 Despliegue en Netlify

El proyecto ya está configurado con un archivo `netlify.toml` listo para producción.

1.  Conecta tu repositorio de GitHub a Netlify.
2.  Configura las variables de entorno en el panel de Netlify (*Site Settings > Environment variables*).
3.  Netlify detectará automáticamente el comando de construcción `npm run build` y la carpeta de publicación `dist`.

## 📂 Estructura del Proyecto

- `src/components`: Componentes reutilizables de la UI.
- `src/pages`: Vistas principales (Inicio, Catálogo).
- `src/data`: Base de datos de productos y personajes.
- `netlify/functions`: Lógica del servidor para envío de correos.

---
Hecho con ❤ por Valeria Alarcón.
© 2026 Recuerdos y Artesanías Levj. Todos los derechos reservados.
