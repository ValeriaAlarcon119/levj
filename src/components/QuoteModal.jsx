import { useState } from 'react'
import { X, Sparkles, Send } from 'lucide-react'
import axios from 'axios'

export default function QuoteModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            await axios.post('/api/send-quote', formData)
            setSuccess(true)
            setTimeout(() => {
                onClose()
            }, 2000)
        } catch (error) {
            console.error('Error al enviar cotización:', error)
            alert('Hubo un error al enviar la cotización. Por favor intenta de nuevo.')
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
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Cotización Enviada!</h3>
                            <p className="text-gray-600">Te contactaremos pronto</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 font-script">
                                    Cotiza tu Idea Única
                                </h3>
                                <p className="text-gray-500 text-sm mt-2">
                                    Cuéntanos qué tienes en mente y lo haremos realidad.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Tu Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Ej: María Pérez"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Celular / WhatsApp
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Para contactarte"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Describe tu Idea
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="input-field"
                                        placeholder="Ej: Quiero un llavero de gatito gris con ojos azules..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-secondary w-full flex justify-center items-center"
                                >
                                    {loading ? (
                                        'Enviando...'
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Enviar Cotización
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
