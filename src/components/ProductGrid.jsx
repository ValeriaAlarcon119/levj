import { useState } from 'react'
import { ShoppingCart, Plus, X, Eye, ShoppingBag, MessageCircle, Zap, Clock } from 'lucide-react'
import { useCart } from '../context/CartContext'

// Categorías con entrega inmediata (stock disponible)
const IMMEDIATE_CATEGORIES = ['joyeria']
// Categorías que se trabajan sobre pedido
const ON_ORDER_CATEGORIES = ['amigurumis', 'llaveros', 'boxes', 'parejas', 'fechas']

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '573117449458'

function getAvailability(category) {
    if (IMMEDIATE_CATEGORIES.includes(category)) return 'immediate'
    return 'on-order'
}

function buildWhatsAppLink(product) {
    const availability = getAvailability(product.category)
    const availText = availability === 'immediate'
        ? 'que vi disponible para entrega inmediata'
        : 'que trabajan sobre pedido'
    const msg = `¡Hola! 💕 Vi en su tienda el producto *${product.name}* (${availText}) y me gustaría hacer un pedido. ¿Podría darme más información? 🌸`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

const AvailabilityBadge = ({ category, small = false }) => {
    const type = getAvailability(category)
    const base = small
        ? 'flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full'
        : 'flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow'
    if (type === 'immediate') {
        return (
            <span className={`${base} bg-emerald-100 text-emerald-700 border border-emerald-200`}>
                <Zap className={small ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
                Entrega Inmediata
            </span>
        )
    }
    return (
        <span className={`${base} bg-amber-100 text-amber-800 border border-amber-200`}>
            <Clock className={small ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
            Sobre Pedido
        </span>
    )
}

export default function ProductGrid({ products }) {
    const { addToCart } = useCart()
    const [selectedProduct, setSelectedProduct] = useState(null)
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
        }).format(price || 0)
    }

    const colorMap = {
        emerald: '#10b981',
        blue: '#3b82f6',
        rose: '#f43f5e',
        pink: '#ec4899',
        stone: '#78716c',
        cyan: '#06b6d4',
        teal: '#14b8a6',
        yellow: '#eab308',
        orange: '#f97316',
        purple: '#a855f7',
        gray: '#6b7280',
        amber: '#f59e0b',
        sky: '#0ea5e9',
        green: '#22c55e',
        lime: '#84cc16',
    }

    const themeColor = colorMap[selectedProduct?.color] || colorMap.pink
    const glowStyle = {
        boxShadow: `0 0 35px ${themeColor}44`,
        borderColor: themeColor
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 pb-20">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-500 relative flex flex-col"
                    >
                        {/* Image Section */}
                        <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                            {product.image ? (
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-5xl bg-gray-50">
                                    {product.emoji || '✨'}
                                </div>
                            )}

                            {/* Badge de disponibilidad en la imagen */}
                            <div className="absolute top-3 left-3 z-10">
                                <AvailabilityBadge category={product.category} small />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-pink-500/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                                <button 
                                    onClick={() => setSelectedProduct(product)}
                                    className="bg-white text-gray-900 p-4 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-all transform translate-y-6 group-hover:translate-y-0 active:scale-90"
                                    title="Ver detalles"
                                >
                                    <Eye className="w-6 h-6" />
                                </button>
                                <a
                                    href={buildWhatsAppLink(product)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-green-500 text-white px-5 py-3 rounded-full font-bold text-sm flex items-center gap-2 transform translate-y-6 group-hover:translate-y-0 transition-all shadow-lg hover:bg-green-600 active:scale-90"
                                >
                                    <MessageCircle className="w-5 h-5" /> Pedir
                                </a>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-4 py-1.5 bg-pink-50 text-pink-600 text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-pink-100">
                                    {product.category}
                                </span>
                            </div>
                            
                            <h3 className="font-bold text-gray-800 mb-2 leading-snug group-hover:text-pink-600 transition-colors h-14 overflow-hidden italic font-script text-2xl">
                                {product.name}
                            </h3>
                            
                            <div className="flex justify-between items-center bg-gray-50 p-5 rounded-3xl border border-gray-100 mt-auto group-hover:bg-white transition-colors gap-3">
                                <span className="font-black text-gray-900 text-xl">{formatPrice(product.price)}</span>
                                {/* Botón directo a WhatsApp en lugar de carrito */}
                                <a
                                    href={buildWhatsAppLink(product)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-green-500 text-white p-3 rounded-2xl hover:bg-green-600 transition-all shadow-lg active:scale-95 flex items-center gap-1.5 text-xs font-bold whitespace-nowrap"
                                    aria-label="Pedir por WhatsApp"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="hidden sm:inline">WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Details Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setSelectedProduct(null)}>
                    <div 
                        className="bg-white rounded-[3rem] max-w-4xl w-full p-6 md:p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-10 animate-scale-in"
                        style={{ borderTop: `8px solid ${themeColor}` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all z-20">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>

                        {/* Image with Dynamic Neon Glow */}
                        <div className="w-full md:w-1/2 relative group">
                            <div 
                                className="absolute -inset-4 blur-3xl rounded-[3rem] opacity-30 transition-opacity" 
                                style={{ backgroundColor: themeColor }}
                            />
                            <div 
                                className="relative rounded-[2rem] overflow-hidden border-4 bg-white"
                                style={glowStyle}
                            >
                                <img 
                                    src={selectedProduct.image || `https://ui-avatars.com/api/?name=${selectedProduct.name}&background=fecdd3&color=be185d&size=512`} 
                                    className="w-full h-full object-cover aspect-square" 
                                    alt={selectedProduct.name} 
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span 
                                        className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-block"
                                        style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                                    >
                                        {selectedProduct.category}
                                    </span>
                                    <AvailabilityBadge category={selectedProduct.category} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-script text-gray-900 mb-4 italic">
                                    {selectedProduct.name}
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed italic">
                                    {selectedProduct.description}
                                </p>
                            </div>

                            <div className="text-4xl font-black" style={{ color: themeColor }}>
                                {formatPrice(selectedProduct.price)}
                            </div>

                            {/* Nota de disponibilidad */}
                            {getAvailability(selectedProduct.category) === 'on-order' ? (
                                <p className="text-sm text-amber-700 italic bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                                    ✨ Este producto se realiza <strong>sobre pedido</strong>. Escríbenos y lo hacemos con todo el amor para ti.
                                </p>
                            ) : (
                                <p className="text-sm text-emerald-700 italic bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                                    🚀 <strong>¡Disponible para entrega inmediata!</strong> Contáctanos y coordinamos el envío.
                                </p>
                            )}

                            {/* Botón principal: WhatsApp */}
                            <a
                                href={buildWhatsAppLink(selectedProduct)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-white py-5 rounded-3xl font-bold text-xl flex items-center justify-center gap-4 transition-all shadow-xl active:scale-95 bg-green-500 hover:bg-green-600"
                            >
                                <MessageCircle className="w-6 h-6" />
                                Hacer mi Pedido por WhatsApp
                            </a>

                            {/* Botón secundario: agregar al carrito */}
                            <button
                                onClick={() => {
                                    addToCart(selectedProduct)
                                    setSelectedProduct(null)
                                }}
                                className="w-full border-2 border-gray-200 text-gray-600 py-3 rounded-3xl font-bold text-sm flex items-center justify-center gap-3 transition-all hover:border-gray-900 hover:text-gray-900"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                Agregar a mi Canasta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
