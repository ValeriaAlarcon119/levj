import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, X, Plus, Minus, Send, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CheckoutModal from './CheckoutModal'

export default function FloatingCart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
    const [isOpen, setIsOpen] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)
    const [isVibrating, setIsVibrating] = useState(false)
    const prevItems = useRef(0)

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    useEffect(() => {
        if (totalItems > prevItems.current) {
            setIsVibrating(true)
            setTimeout(() => setIsVibrating(false), 500)
        }
        prevItems.current = totalItems
    }, [totalItems])

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(price || 0)
    }

    return (
        <>
            {/* Floating Toggle Button */}
            <div className="fixed bottom-24 left-6 md:left-10 z-[100]">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all border-2 group active:scale-95 ${
                        totalItems > 0 
                        ? 'bg-white border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.6)] text-pink-600' 
                        : 'bg-white border-gray-900 text-gray-900 shadow-sm'
                    } ${isVibrating ? 'animate-shake' : ''}`}
                >
                    <ShoppingCart className="w-7 h-7" />
                    <span className={`absolute -top-1 -right-1 text-white text-xs font-black min-w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-md ${
                        totalItems > 0 ? 'bg-pink-500 scale-110' : 'bg-gray-400'
                    } transition-all duration-300`}>
                        {totalItems}
                    </span>
                    
                    {/* Pulsing Neon Ring */}
                    {totalItems > 0 && (
                        <span className="absolute inset-0 rounded-full animate-ping bg-pink-400/20 pointer-events-none"></span>
                    )}
                </button>
            </div>

            {/* Cart Drawer */}
            <div className={`fixed inset-y-0 left-0 w-full max-w-md bg-white shadow-2xl z-[120] transition-transform duration-500 border-r border-gray-100 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold font-script text-gray-800">Tu Canasta ✨</h2>
                            <p className="text-gray-400 text-sm italic">{totalItems} artículos en camino</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="p-3 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Items List */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-40">
                                <ShoppingBag className="w-20 h-20 mb-4" />
                                <p className="text-xl font-bold font-script italic">Tu canasta está vacía</p>
                                <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest">¡Agrega cositas lindas!</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-gray-50/50 p-4 rounded-3xl border border-gray-100 group transition-all hover:bg-white hover:shadow-sm">
                                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0">
                                        <img src={item.image || 'https://placehold.co/100/f8f8f8/999?text=Product'} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow space-y-1">
                                        <h4 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-pink-600 transition-colors">
                                            {item.name}
                                        </h4>
                                        <p className="text-pink-500 font-bold text-xs">{formatPrice(item.price)}</p>
                                        
                                        <div className="flex items-center gap-3 pt-1">
                                            <div className="flex items-center gap-3 bg-white p-1 rounded-full border border-gray-100 shadow-sm">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-1 hover:bg-pink-100 rounded-full text-pink-500 transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="font-bold text-xs text-gray-700 w-4 text-center">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-1 hover:bg-pink-100 rounded-full text-pink-500 transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-[10px] font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest pl-2"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer / Summary */}
                    {cart.length > 0 && (
                        <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6">
                            <div className="flex justify-between items-center text-lg">
                                <span className="font-script text-gray-500 text-2xl">Total del pedido</span>
                                <span className="font-black text-gray-900 text-2xl">{formatPrice(totalPrice)}</span>
                            </div>
                            
                            <div className="space-y-3">
                                <button 
                                    onClick={() => {
                                        setShowCheckout(true)
                                        setIsOpen(false)
                                    }}
                                    className="w-full bg-gray-900 text-white py-5 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:bg-pink-600 transition-all hover:-translate-y-1 group"
                                >
                                    <Send className="w-6 h-6 transform group-hover:rotate-12 transition-transform" />
                                    Finalizar Compra
                                </button>
                                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed">
                                    Se enviará un resumen de tu canasta a nuestro WhatsApp y a tu correo.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div 
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[115] animate-fade-in"
                />
            )}

            <CheckoutModal 
                isOpen={showCheckout} 
                onClose={() => setShowCheckout(false)}
                orderType="catalogo"
                orderData={{
                    items: cart,
                    total: formatPrice(totalPrice)
                }}
            />
        </>
    )
}
