import { ShoppingBag, CheckCircle2 } from 'lucide-react'

export default function PersonalizationForm({ formData, setFormData, selectedCharacter, isFullyFilled, onOrder }) {

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, foto: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const isOrderEnabled = isFullyFilled && selectedCharacter

    return (
        <section id="personalizar" className="mb-20 scroll-mt-24">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/50 border-t-8 border-t-pink-400">
                    <div className="text-center mb-10">
                        <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Paso 2</span>
                        <h2 className="text-4xl font-bold font-script text-gray-800 mt-4">Personaliza tu Cajita</h2>
                        <p className="text-gray-500 mt-2">Ingresa los datos del bebé para tu mural.</p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-sm p-8 md:p-10 border border-white relative group">
                        {/* BLOQUEO SI NO HAY COMPAÑERO */}
                        {!selectedCharacter && (
                            <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[6px] rounded-[2rem] flex flex-col items-center justify-center p-6 text-center">
                                <div className="bg-pink-100 p-4 rounded-full mb-4">
                                    <ShoppingBag className="w-8 h-8 text-pink-600 animate-bounce" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 font-script mb-2">¡Pausa un momento! ✨</h3>
                                <p className="text-gray-600 max-w-xs mb-6">
                                    Para personalizar tu cajita, primero debes elegir a tu <b>compañero amigurumi</b> en la sección de arriba.
                                </p>
                                <button 
                                    type="button"
                                    onClick={() => {
                                        const selector = document.getElementById('selector-compañero')
                                        selector?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                    className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg active:scale-95"
                                >
                                    Ir a elegir compañero
                                </button>
                            </div>
                        )}

                        <form className={`space-y-8 transition-all duration-500 ${!selectedCharacter ? 'opacity-20 pointer-events-none scale-95 blur-[2px]' : ''}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-700 ml-1 block">Nombre del Bebé</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Ej: Luciana"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-pink-400 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-700 ml-1 block">Apellidos</label>
                                    <input
                                        type="text"
                                        name="apellidos"
                                        placeholder="Ej: Barrera Andrade"
                                        value={formData.apellidos}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl px-5 py-4 focus:border-pink-400 focus:bg-white outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-gray-700 ml-1 block italic text-pink-500">
                                    ¿Tienes una foto del bebé? (Opcional)
                                </label>
                                <div className="relative group/photo">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="border-2 border-dashed border-pink-200 rounded-3xl p-8 text-center bg-pink-50/30 group-hover/photo:bg-pink-50/50 transition-all flex flex-col md:flex-row items-center justify-center gap-4">
                                        <button type="button" className="bg-pink-500 text-white px-6 py-3 rounded-2xl font-bold pointer-events-none shadow-md">
                                            Elegir archivo
                                        </button>
                                        <span className="text-gray-500 italic max-w-[200px] truncate">
                                            {formData.foto ? '✅ Foto cargada correctamente' : 'No se ha seleccionado ningún archivo'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Fecha</label>
                                    <input
                                        type="date"
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-pink-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Hora</label>
                                    <input
                                        type="time"
                                        name="hora"
                                        value={formData.hora}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-pink-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Peso (KG)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="peso"
                                        placeholder="3.2"
                                        value={formData.peso}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-pink-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Talla (CM)</label>
                                    <input
                                        type="number"
                                        name="talla"
                                        placeholder="50"
                                        value={formData.talla}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-pink-400 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Alerta de Datos Listos */}
                            {isFullyFilled && (
                                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center text-blue-700 shadow-sm animate-pulse">
                                    <CheckCircle2 className="w-6 h-6 mr-3 text-blue-500" />
                                    <span className="font-medium italic text-sm">¡Excelente! Ya puedes pedir tu cajita personalizada aquí abajo. 👇</span>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    if (isFullyFilled) {
                                        onOrder()
                                    } else {
                                        // Scroll to top of form to remind completion
                                        const formTop = document.getElementById('personalizar')
                                        formTop?.scrollIntoView({ behavior: 'smooth' })
                                        alert("Por favor completa todos los datos del bebé para tu cajita. ✨")
                                    }
                                }}
                                disabled={!selectedCharacter}
                                className={`w-full py-6 rounded-[2rem] font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98] ${
                                    selectedCharacter 
                                    ? (isFullyFilled ? 'bg-gray-900 text-white hover:bg-pink-600 hover:-translate-y-1' : 'bg-pink-200 text-pink-500 cursor-pointer') 
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {isFullyFilled ? "Pedir mi Cajita Personalizada" : "Faltan datos por completar"}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4 px-10">
                                Al completar el pedido, te contactaremos por WhatsApp para coordinar el pago y la entrega.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
