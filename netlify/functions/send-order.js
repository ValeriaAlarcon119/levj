import nodemailer from 'nodemailer'

export const handler = async (event) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
        }
    }

    try {
        const { clientEmail, clientPhone, boxData } = JSON.parse(event.body)

        // Create transporter
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        // Email to shop owner
        const shopEmail = {
            from: process.env.SMTP_USER,
            to: process.env.SHOP_EMAIL,
            subject: `Nuevo Pedido Cajita - ${boxData.nombre}`,
            html: `
        <h2>¡Nuevo Pedido de Cajita Personalizada!</h2>
        
        <h3>Datos del Cliente:</h3>
        <ul>
          <li><strong>Email:</strong> ${clientEmail}</li>
          <li><strong>Teléfono/WhatsApp:</strong> ${clientPhone}</li>
        </ul>

        <h3>Datos de la Cajita:</h3>
        <ul>
          <li><strong>Bebé:</strong> ${boxData.nombre} ${boxData.apellidos}</li>
          <li><strong>Fecha de Nacimiento:</strong> ${boxData.fecha}</li>
          <li><strong>Hora:</strong> ${boxData.hora}</li>
          <li><strong>Peso:</strong> ${boxData.peso} kg</li>
          <li><strong>Talla:</strong> ${boxData.talla} cm</li>
          <li><strong>Personaje Elegido:</strong> ${boxData.personaje}</li>
        </ul>

        <p><em>Nota: El cliente enviará la foto del bebé por WhatsApp.</em></p>
      `,
        }

        // Email to customer
        const customerEmail = {
            from: process.env.SMTP_USER,
            to: clientEmail,
            subject: '¡Pedido Recibido! - Recuerdos Inolvidables',
            html: `
        <h2>¡Gracias por tu pedido!</h2>
        
        <p>Hemos recibido tu pedido de Cajita Personalizada con los siguientes datos:</p>

        <h3>Detalles de tu Cajita:</h3>
        <ul>
          <li><strong>Bebé:</strong> ${boxData.nombre} ${boxData.apellidos}</li>
          <li><strong>Fecha de Nacimiento:</strong> ${boxData.fecha}</li>
          <li><strong>Personaje:</strong> ${boxData.personaje}</li>
          <li><strong>Precio:</strong> $45.000 COP</li>
        </ul>

        <p>Te contactaremos pronto por WhatsApp al número <strong>${clientPhone}</strong> para coordinar el pago y envío.</p>
        
        <p><strong>Recuerda enviarnos la foto del bebé por WhatsApp.</strong></p>

        <p>¡Gracias por confiar en nosotros!</p>
        <p><em>Recuerdos Inolvidables</em></p>
      `,
        }

        // Send emails
        await transporter.sendMail(shopEmail)
        await transporter.sendMail(customerEmail)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Pedido enviado exitosamente' }),
        }
    } catch (error) {
        console.error('Error sending order:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al enviar el pedido' }),
        }
    }
}
