import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import QuoteModal from '../components/QuoteModal'
import { products } from '../data/products'

const categories = [
    { id: 'todos', label: 'Todos', color: 'gray' },
    { id: 'boxes', label: 'Cajitas de Regalo', color: 'sky', image: '/vistaPrevia.webp' },
    { id: 'amigurumis', label: 'Amigurumis', color: 'orange', image: '/osito.webp' },
    { id: 'joyeria', label: 'Joyería & Mostacilla', color: 'emerald', image: '/Joyeria/portadaJoyeria.webp' },
    { id: 'parejas', label: 'Parejas & Amor', color: 'rose', image: '/Joyeria/CorazonyMurano.webp' },
    { id: 'llaveros', label: 'Llaveros', color: 'green', image: '/conejito.webp' },
    { id: 'fechas', label: 'Temporadas & Regalos', color: 'purple', image: '/osito.webp' }, // Temporarily osito, or maybe something else
]

export default function Catalog() {
    const { category: urlCategory } = useParams()
    const [activeCategory, setActiveCategory] = useState(urlCategory || 'todos')
    const [showQuoteModal, setShowQuoteModal] = useState(false)

    useEffect(() => {
        if (urlCategory) {
            setActiveCategory(urlCategory)
        }
    }, [urlCategory])

    const filteredProducts = products.filter(p => p.category === activeCategory)
    const showCategories = activeCategory === 'todos'

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in">
            {/* Header */}
            <div className="text-center mb-10 bg-pink-50 text-gray-900 p-12 rounded-[3rem] shadow-sm relative overflow-hidden border-2 border-gray-900">
                <h2 className="text-5xl md:text-6xl font-bold font-script mb-4 text-pink-600">
                    Catálogo de Detalles
                </h2>
                <p className="text-gray-600 max-w-lg mx-auto text-lg italic">
                    Regalos únicos, artesanales y hechos con todo el corazón.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                    <span className="w-10 h-1 rounded-full bg-pink-300"></span>
                    <span className="w-10 h-1 rounded-full bg-blue-300"></span>
                    <span className="w-10 h-1 rounded-full bg-gray-300"></span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 sticky top-20 z-40 bg-white/40 backdrop-blur-md py-4 rounded-3xl shadow-sm px-4 border border-gray-100">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border-2 ${activeCategory === cat.id
                                ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                                : 'bg-white text-gray-500 border-gray-100 hover:border-pink-200'
                            }`}
                    >
                        {cat.id === 'todos' ? '🏠 Menú Principal' : cat.label}
                    </button>
                ))}
            </div>

            {/* Content View: Category Grid or Product Grid */}
            {showCategories ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-14 animate-fade-in-up">
                    {categories.filter(c => c.id !== 'todos').map(cat => (
                        <div 
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className="relative group cursor-pointer overflow-hidden rounded-[3rem] aspect-[4/5] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 border-4 border-white"
                        >
                            <img 
                                src={cat.image || '/conejito.webp'} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                alt={cat.label} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-10">
                                <span className={`w-12 h-1.5 rounded-full mb-4 bg-pink-500`} />
                                <h3 className="text-4xl font-bold text-white mb-2 font-script italic">{cat.label}</h3>
                                <p className="text-gray-300 text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    Explorar Colección →
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="animate-fade-in">
                   <div className="flex items-center gap-4 mb-8">
                       <button 
                         onClick={() => setActiveCategory('todos')}
                         className="text-pink-600 font-bold hover:underline flex items-center gap-2"
                        >
                           ← Volver al Menú
                       </button>
                       <h3 className="text-3xl font-bold font-script italic">{categories.find(c => c.id === activeCategory)?.label}</h3>
                   </div>
                   <ProductGrid products={filteredProducts} />
                </div>
            )}

            {/* Custom Quote Banner */}
            <div className="mt-12 bg-blue-50 text-gray-900 rounded-[3rem] p-10 text-center border-2 border-gray-900 shadow-sm">
                <h3 className="text-3xl font-bold mb-3 font-script">¿Tienes una idea en mente?</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto italic">
                    Hacemos realidad tus diseños personalizados en crochet o mostacilla.
                </p>
                <button
                    onClick={() => setShowQuoteModal(true)}
                    className="inline-block bg-white text-gray-900 border-2 border-gray-900 font-bold py-4 px-10 rounded-full hover:bg-gray-900 hover:text-white transition-all shadow-md active:scale-95"
                >
                    Cotizar mi Idea ✨
                </button>
            </div>

            {/* Quote Modal */}
            {showQuoteModal && (
                <QuoteModal onClose={() => setShowQuoteModal(false)} />
            )}
        </div>
    )
}
