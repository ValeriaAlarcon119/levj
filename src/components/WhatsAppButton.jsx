import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ''

    return (
        <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 bg-green-500 text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
            aria-label="Contactar por WhatsApp"
        >
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
        </a>
    )
}
