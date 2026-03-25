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
        const { name, phone, message } = JSON.parse(event.body)

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
            subject: `Nueva Cotización - ${name}`,
            html: `
        <h2>¡Nueva Solicitud de Cotización!</h2>
        
        <h3>Datos del Cliente:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Teléfono/WhatsApp:</strong> ${phone}</li>
        </ul>

        <h3>Descripción de la Idea:</h3>
        <p>${message}</p>

        <p><em>Contacta al cliente lo antes posible por WhatsApp.</em></p>
      `,
        }

        // Send email
        await transporter.sendMail(shopEmail)

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Cotización enviada exitosamente' }),
        }
    } catch (error) {
        console.error('Error sending quote:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al enviar la cotización' }),
        }
    }
}
