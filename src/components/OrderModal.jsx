import { useState } from 'react'
import { X, Gift, CheckCircle, Info } from 'lucide-react'
import axios from 'axios'

export default function OrderModal({ onClose, formData, selectedCharacter }) {
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Enviar a Netlify Function
            await axios.post('/api/send-order', {
                clientEmail: email,
                clientPhone: phone,
                boxData: {
                    ...formData,
                    personaje: selectedCharacter,
                },
            })

            setSuccess(true)
            setTimeout(() => {
                onClose()
            }, 2000)
        } catch (error) {
            console.error('Error al enviar pedido:', error)
            alert('Hubo un error al enviar el pedido. Por favor intenta de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Pedido Enviado!</h3>
                            <p className="text-gray-600">Te contactaremos pronto por WhatsApp</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                    <Gift className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 font-script">¡Ya casi es tuya!</h3>
                                <p className="text-gray-500 mt-2">
                                    ✨ Para finalizar tu pedido y coordinar el envío, por favor regálanos tu contacto.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="input-field"
                                        placeholder="tucorreo@ejemplo.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Celular / WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="input-field"
                                        placeholder="Para confirmar envío"
                                    />
                                </div>

                                <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 flex items-start">
                                    <Info className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>
                                        La información de la cajita (Nombre, fecha, etc.) se adjuntará automáticamente.
                                        Recuerda enviarnos la foto por WhatsApp.
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full flex justify-center items-center"
                                >
                                    {loading ? (
                                        'Enviando...'
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Confirmar Pedido
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
