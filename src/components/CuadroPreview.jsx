import { Calendar, Clock, Weight, Ruler } from 'lucide-react'

export default function CuadroPreview({ formData, selectedCharacter, charImage }) {
    // Si no hay datos ni personaje, es la versión estática HERO (No tocar nada)
    if (!formData && !selectedCharacter && !charImage) {
        return (
            <div className="relative w-full max-w-[550px] mx-auto aspect-square rounded-2xl shadow-xl overflow-hidden border-8 border-white bg-white">
                <img src="/vistaPrevia.webp" alt="Cajita Original" className="w-full h-full object-cover" />
                <p className="absolute bottom-2 right-2 text-[8px] text-gray-300 opacity-20">Preview Static</p>
            </div>
        )
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return ''
        const date = new Date(dateStr)
        const day = String(date.getDate() + 1).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const formatTime = (timeStr) => {
        if (!timeStr) return ''
        const [hours, minutes] = timeStr.split(':')
        let h = parseInt(hours)
        const ampm = h >= 12 ? 'PM' : 'AM'
        h = h % 12 || 12
        return `${String(h).padStart(2, '0')}:${minutes} ${ampm}`
    }

    const photoSrc = formData?.foto || null
    const hasData = formData?.nombre || formData?.apellidos || charImage || photoSrc

    return (
        <div
            className="relative w-full max-w-[550px] mx-auto aspect-square rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden border-8 border-white bg-white"
        >
            {/* 1. Base Image */}
            <img 
                src="/vistaPrevia.webp" 
                alt="Marco Base" 
                className="w-full h-full object-cover"
            />

            {/* 2. Cleaning Layers (Parches para tapar lo viejo) */}
            {hasData && (
                <>
                    {/* Parche GRANDE para el Nombre y Apellidos (Tapa todo lo de arriba) */}
                    <div className="absolute top-[12%] left-[5%] w-[88%] h-[30%] bg-[#fcfcfc] z-10 rounded-2xl shadow-sm border border-white/40" />
                    
                    {/* Parche para el Círculo Central (Foto vieja) */}
                    <div className="absolute top-[58%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] bg-[#fcfcfc] z-10 rounded-full blur-[4px]" />
                    
                    {/* Parche para la Tabla de Datos (Izquierda) */}
                    <div className="absolute top-[50%] left-[8%] w-[38%] h-[25%] bg-[#fcfcfc] z-10 rounded-lg blur-[2px]" />
                    
                    {/* Parche para el Conejito viejo (Derecha abajo) */}
                    <div className="absolute bottom-[2%] right-[2%] w-[45%] h-[40%] bg-[#fcfcfc] z-10 rounded-full blur-md" />
                </>
            )}

            {/* 3. Nombre y Apellidos */}
            <div className="absolute top-[18%] left-[45%] transform -translate-x-1/2 w-[70%] text-center z-20 space-y-[-10px]">
                <h2 className="text-4xl md:text-5xl font-script text-gray-800 tracking-tight animate-fade-in">
                    {formData?.nombre || ''}
                </h2>
                <p className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-widest mt-1 animate-fade-in">
                    {formData?.apellidos || ''}
                </p>
            </div>

            {/* 4. Tabla de Datos */}
            <div className="absolute top-[52%] left-[12%] z-20 space-y-2 scale-90 md:scale-100 origin-left">
                {formData?.fecha && (
                    <div className="flex items-center text-[10px] md:text-xs font-bold text-gray-700 bg-white/40 px-1 rounded">
                        <Calendar className="w-3 h-3 mr-2 text-pink-400" />
                        {formatDate(formData.fecha)}
                    </div>
                )}
                {formData?.hora && (
                    <div className="flex items-center text-[10px] md:text-xs font-bold text-gray-700 bg-white/40 px-1 rounded">
                        <Clock className="w-3 h-3 mr-2 text-pink-400" />
                        {formatTime(formData.hora)}
                    </div>
                )}
                {formData?.peso && (
                    <div className="flex items-center text-[10px] md:text-xs font-bold text-gray-700 bg-white/40 px-1 rounded">
                        <Weight className="w-3 h-3 mr-2 text-pink-400" />
                        PESO: {formData.peso} KG
                    </div>
                )}
                {formData?.talla && (
                    <div className="flex items-center text-[10px] md:text-xs font-bold text-gray-700 bg-white/40 px-1 rounded">
                        <Ruler className="w-3 h-3 mr-2 text-pink-400" />
                        TALLA: {formData.talla} CM
                    </div>
                )}
            </div>

            {/* 5. Foto del Bebé */}
            {photoSrc && (
                <div className="absolute top-[58%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[28%] aspect-square z-20 animate-scale-in">
                    <div className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden relative bg-gray-50">
                        <img
                            src={photoSrc}
                            alt="Foto Bebé"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -inset-1 border border-pink-100 rounded-full z-[-1] animate-pulse" />
                </div>
            )}

            {/* 6. Amigurumi Seleccionado */}
            {charImage && (
                <div className="absolute bottom-[6%] right-[6%] w-[38%] aspect-square z-30 animate-scale-in">
                    <div className="relative w-full h-full group">
                        <img
                            src={charImage}
                            alt="Compañero Amigurumi"
                            className="w-full h-full object-contain drop-shadow-2xl translate-y-[-5px]"
                        />
                        <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[60%] h-[10%] bg-black/10 blur-md rounded-full -z-10" />
                    </div>
                </div>
            )}
        </div>
    )
}
