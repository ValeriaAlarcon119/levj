import { Frame, HeartHandshake, ArrowDown } from 'lucide-react'
import CuadroPreview from './CuadroPreview'

export default function ProductHero() {
    const scrollToPersonalize = () => {
        const element = document.getElementById('personalizar')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Preview */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                    <CuadroPreview />
                    <p className="text-center text-xs text-gray-400 mt-4 italic">
                        * Vista previa digital. Puedes subir tu propia foto abajo.
                    </p>
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 space-y-8">
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-pink-100 text-primary-700 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
                            Producto Estrella
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-script">
                            Cajita de Nacimiento
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Un recuerdo eterno. Nuestra cajita combina la elegancia de un marco profundo con la ternura de un amigurumi tejido a mano.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl flex items-start">
                            <div className="bg-white p-2 rounded-lg shadow-sm mr-3 text-primary-500">
                                <Frame className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Marco Premium</h4>
                                <p className="text-sm text-gray-500">Resistente y elegante</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl flex items-start">
                            <div className="bg-white p-2 rounded-lg shadow-sm mr-3 text-primary-500">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">100% Artesanal</h4>
                                <p className="text-sm text-gray-500">Tejido con amor</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-b border-gray-100 py-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-500">Precio Regular</span>
                            <span className="text-gray-400 line-through">$60.000 COP</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-800">Precio Oferta</span>
                            <span className="text-5xl font-bold text-primary-600">$45.000</span>
                        </div>
                    </div>

                    <button
                        onClick={scrollToPersonalize}
                        className="w-full bg-gray-900 text-white text-lg font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-xl flex justify-center items-center group"
                    >
                        Personalizar mi Cajita
                        <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    )
}
