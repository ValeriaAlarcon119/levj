import { useState, useEffect } from 'react'
import { X, Phone, User, MapPin, Send, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CheckoutModal({ isOpen, onClose, orderType, orderData }) {
    const { user, setUser, clearCart } = useCart()
    const [step, setStep] = useState('phone') // phone, verify, details
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setStep('phone')
            setPhone(user?.phone || '')
            setName(user?.name || '')
            setAddress(user?.address || '')
            setIsEditing(!user?.name)
        }
    }, [isOpen, user])

    if (!isOpen) return null

    const handleVerifyPhone = () => {
        if (phone.length < 7) return
        
        // If user already exists in context/localStorage
        if (user && user.phone === phone) {
            setStep('verify')
        } else {
            // Check if phone was saved before (mock persistence check if not in context)
            const savedData = localStorage.getItem(`client_${phone}`)
            if (savedData) {
                const parsed = JSON.parse(savedData)
                setName(parsed.name)
                setAddress(parsed.address)
                setUser(parsed)
                setStep('verify')
            } else {
                setStep('details')
                setIsEditing(true)
            }
        }
    }

    const encodeOrder = () => {
        let text = `*NUEVO PEDIDO - ${orderType.toUpperCase()}*\n\n`
        text += `*Cliente:* ${name}\n`
        text += `*Teléfono:* ${phone}\n`
        text += `*Dirección:* ${address}\n\n`
        
        if (orderType === 'cajita') {
            text += `*Cajita de Nacimiento:*\n`
            text += `- Bebé: ${orderData.nombre} ${orderData.apellidos}\n`
            text += `- Personaje: ${orderData.personaje}\n`
            text += `- Fecha: ${orderData.fecha}\n`
            text += `- Hora: ${orderData.hora}\n`
            text += `- Peso: ${orderData.peso}kg | Talla: ${orderData.talla}cm\n`
        } else {
            text += `*Productos del Catálogo:*\n`
            orderData.items.forEach(item => {
                text += `- ${item.name} (x${item.quantity}) - $${item.price * item.quantity}\n`
            })
            text += `\n*Total:* $${orderData.total}`
        }

        return encodeURIComponent(text)
    }

    const submitToNetlify = async () => {
        const formData = new FormData()
        formData.append('form-name', 'orders')
        formData.append('type', orderType)
        formData.append('customer_name', name)
        formData.append('customer_phone', phone)
        formData.append('customer_address', address)
        formData.append('order_details', JSON.stringify(orderData))

        try {
            await fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
        } catch (e) {
            console.error(e)
        }
    }

    const handleFinalSubmit = () => {
        const newUser = { phone, name, address }
        setUser(newUser)
        localStorage.setItem(`client_${phone}`, JSON.stringify(newUser))
        
        submitToNetlify()
        
        const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '573117449458'
        const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeOrder()}`
        window.open(waUrl, '_blank')
        
        if (orderType === 'catalogo') clearCart()
        onClose()
    }

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-[3rem] max-w-lg w-full p-8 md:p-10 shadow-2xl relative overflow-hidden border-t-8 border-pink-500">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-20">
                    <X className="w-6 h-6 text-gray-400" />
                </button>

                {/* Step 1: Phone */}
                {step === 'phone' && (
                    <div className="animate-fade-in">
                        <div className="w-20 h-20 bg-pink-100 rounded-3xl flex items-center justify-center mb-6">
                            <Phone className="w-10 h-10 text-pink-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 font-script mb-2">¡Casi listo! ✨</h2>
                        <p className="text-gray-500 mb-8">Dinos tu número de celular para completar el pedido.</p>
                        
                        <div className="space-y-6">
                            <div className="relative">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="tel"
                                    placeholder="Número de celular"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-5 pl-14 pr-5 focus:border-pink-500 outline-none font-bold text-lg"
                                />
                            </div>
                            <button 
                                onClick={handleVerifyPhone}
                                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center group hover:bg-pink-600 transition-all shadow-lg"
                            >
                                Siguiente <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Verification */}
                {step === 'verify' && !isEditing && (
                    <div className="animate-fade-in">
                        <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 font-script mb-2">¡Hola de nuevo, {name}! 🎉</h2>
                        <p className="text-gray-500 mb-8">¿Tus datos de entrega siguen siendo los mismos?</p>
                        
                        <div className="bg-gray-50 p-6 rounded-3xl space-y-4 mb-8 border border-gray-100">
                            <div className="flex items-start gap-4">
                                <User className="w-5 h-5 text-pink-400 mt-1" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Nombre</p>
                                    <p className="font-bold text-gray-800">{name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
                                <MapPin className="w-5 h-5 text-pink-400 mt-1" />
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Dirección de entrega</p>
                                    <p className="font-bold text-gray-800">{address}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-200 transition-all"
                            >
                                <Edit3 className="w-4 h-4 mr-2" /> Editar
                            </button>
                            <button 
                                onClick={handleFinalSubmit}
                                className="bg-pink-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center shadow-lg hover:bg-pink-700 transition-all"
                            >
                                <Send className="w-4 h-4 mr-2" /> Confirmar
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Details Input */}
                {(isEditing || step === 'details') && (
                    <div className="animate-fade-in">
                        <div className="w-20 h-20 bg-pink-100 rounded-3xl flex items-center justify-center mb-6 text-pink-600">
                            <User className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 font-script mb-2">{user?.name ? 'Editar Datos' : 'Tus Datos'} ✨</h2>
                        <p className="text-gray-500 mb-8">Por favor confirma tu nombre y dirección de envío.</p>
                        
                        <div className="space-y-4 mb-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Nombre Completo</label>
                                <input 
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 focus:border-pink-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Dirección de Envío</label>
                                <input 
                                    type="text"
                                    placeholder="Ej: Carrera 10 # 5-20, Apto 302"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-5 focus:border-pink-500 outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleFinalSubmit}
                            disabled={!name || !address}
                            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center shadow-lg transition-all ${
                                (name && address) ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Finalizar Pedido <Send className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
