# Recuerdos y Artesanías Levj - Documentación del Sistema

Esta aplicación es una tienda virtual completa para la gestión de detalles artesanales de Valeria Alarcón. El sistema permite la personalización de productos en tiempo real y gestiona las ventas de manera directa a través de WhatsApp y Correo Electrónico.

🌐 **Sitio web**: [https://levj.netlify.app](https://levj.netlify.app)

---

## 🎨 Personalización y Experiencia del Cliente

### 🧸 Selección de Compañero
El cliente inicia su experiencia eligiendo un personaje amigurumi (Conejito, Osito, Tigre, etc.) que será el protagonista de su cajita. Este sistema permite:
- **Vista Previa con Glow**: Al hacer clic en un diseño, se abre un modal con un efecto de resplandor neón decorativo.
- **Confirmación Visual**: Una vez seleccionado, el sistema bloquea la elección para que el cliente pase al siguiente paso con seguridad.

### 🖼️ Personalización del Cuadro (Cajita)
El sistema genera una **vista previa dinámica** del cuadro de nacimiento:
- **Nombre y Apellidos**: Se visualizan con una fuente cursiva elegante (font-script) sobre el diseño base.
- **Métrica de Nacimiento**: La fecha, hora, peso y talla se posicionan automáticamente en el diseño.
- **Foto del Bebé**: El cliente puede subir una foto (opcional) que se visualiza dentro de un marco circular neón en el centro del cuadro.
- **Eliminación de Elementos Viejos**: El software aplica "capas de limpieza" inteligentes (divs de color base con blur) para tapar elementos del diseño original y que los nuevos datos se vean limpios.

---

## 🛒 Proceso de Compra y Redireccionamiento

### 1. Validación del Cliente
El sistema implementa una **memoria local inteligente**:
- Al intentar comprar, el cliente ingresa su número de celular.
- **Si el cliente ya compró antes**: El sistema lo reconoce mediante `localStorage`, lo saluda por su nombre ("¡Hola de nuevo, Maria!") y le muestra sus datos de entrega guardados (Nombre y Dirección).
- **Si es nuevo**: Se le solicita completar sus datos por única vez.

### 2. Edición de Datos
En cualquier momento antes de finalizar, el cliente puede:
- **Editar**: Un botón de edición permite corregir el nombre o la dirección si ha cambiado.
- **Validación en Tiempo Real**: El botón de envío solo se activa si los datos mínimos de contacto están presentes.

### 3. Venta por WhatsApp y Correo (Flujo Directo)
Al presionar "Finalizar Pedido", el sistema realiza dos acciones simultáneas:
- **WhatsApp Web (Redireccionamiento)**: Abre automáticamente una conversación con la dueña de la tienda (`3117449458`). El mensaje está **pre-diseñado** en negritas y con formato, detallando:
    - Nombre del cliente y datos de entrega.
    - El tipo de pedido (Cajita Personalizada o Productos del Catálogo).
    - El desglose de precios y el total a pagar.
- **Notificación por Correo**: Envía un formulario invisible a Netlify (`marialevj1967@gmail.com`) que guarda el registro del pedido como respaldo y notificación oficial.

---

## 📦 Gestión del Catálogo y Precios

- **Detalles y Precios**: Cada producto en el catálogo muestra su precio formateado en pesos colombianos ($ COP), una descripción detallada de los materiales y un botón de acción rápida para agregar a la canasta.
- **Cajitas de la Tienda**: Los productos del catálogo son independientes de la "Cajita Personalizada" de la página principal, permitiendo que el cliente compre ambos tipos de artículos en un solo pedido consolidado.

## ⚙️ Configuración del Servidor (Netlify)

Para que los correos y el contacto funcionen, se deben configurar estas **Variables de Entorno** en Netlify:
- `VITE_WHATSAPP_NUMBER`: El número sin espacios (Ej: 573117449458).
- `SHOP_EMAIL`: marialevj1967@gmail.com
- `SMTP_USER`: Tu correo Gmail.
- `SMTP_PASS`: Tu Contraseña de Aplicación de Google.

---
© 2026 Recuerdos y Artesanías Levj. Hecho con amor para durar por siempre.
