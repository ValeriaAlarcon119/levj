import { useState } from 'react'
import { CheckCircle2, X, Gift } from 'lucide-react'

export const characters = [
    { name: 'Conejito', image: '/conejito.webp', neon: '#fbbf24' },
    { name: 'Osito', image: '/osito.webp', neon: '#ea580c' },
    { name: 'Perrito', image: '/perrito.webp', neon: '#65a30d' },
    { name: 'Gatito', image: '/gatito.webp', neon: '#9333ea' },
    { name: 'Conejita', image: '/conejita.webp', neon: '#ec4899' },
    { name: 'Tigre', image: '/Tigre.webp', neon: '#f97316' },
    { name: 'Gorila', image: '/gorila.webp', neon: '#3b82f6' },
    { name: 'Hipopótamo', image: '/hipopotamo.webp', neon: '#d946ef' },
    { name: 'Vaquita', image: '/vaquita.webp', neon: '#06b6d4' },
    { name: 'Pato', image: '/pato.webp', neon: '#eab308' },
    { name: 'Pollito', image: '/pollito.webp', neon: '#84cc16' },
    { name: 'Pingüino', image: '/pinguino.webp', neon: '#0ea5e9' },
    { name: 'Pingüina', image: '/pinguina.webp', neon: '#f43f5e' },
    { name: 'Sapito', image: '/sapito.webp', neon: '#22c55e' },
    { name: 'Kitty', image: '/kitty.webp', neon: '#fda4af' },
    { name: 'Garfield', image: '/garfield.webp', neon: '#f59e0b' },
    { name: 'Micky', image: '/mickymouse.webp', neon: '#ef4444' },
    { name: 'Pantera Rosa', image: '/panteraRosa.webp', neon: '#db2777' },
    { name: 'Piolín', image: '/piolin.webp', neon: '#fde047' },
]

export default function CharacterSelector({ selectedCharacter, onSelect, onConfirm, isConfirmed }) {
    const [previewChar, setPreviewChar] = useState(null)

    const handleModalConfirm = () => {
        if (previewChar) {
            onSelect(previewChar.name)
            setPreviewChar(null)
        }
    }

    return (
        <section id="selector-compañero" className="mb-20 scroll-mt-24">
            <div className="text-center mb-10">
                <span className="text-pink-500 font-bold tracking-widest uppercase text-xs">Paso 1</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800 font-script">Elige tu Compañero</h2>
                <p className="text-gray-500">Haz clic en un diseño para verlo en grande y seleccionarlo.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                {characters.map((char) => {
                    const isSelected = selectedCharacter === char.name
                    
                    return (
                        <div
                            key={char.name}
                            onClick={() => setPreviewChar(char)}
                            className={`relative cursor-pointer bg-white p-3 rounded-2xl border-2 text-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                                isSelected
                                    ? 'border-pink-500 bg-pink-50/50 shadow-md scale-[1.02]'
                                    : 'border-gray-100 hover:border-pink-300'
                            }`}
                        >
                            {isSelected && (
                                <div className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md z-10 transition-transform animate-bounce">
                                    <CheckCircle2 className="w-6 h-6 text-pink-500 fill-pink-100" />
                                </div>
                            )}

                            <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50/50">
                                <img
                                    src={char.image}
                                    alt={char.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    style={{ objectPosition: 'center 20%' }}
                                />
                            </div>
                            <h3 className={`font-bold transition-colors ${isSelected ? 'text-pink-600' : 'text-gray-700'}`}>
                                {char.name}
                            </h3>
                        </div>
                    )
                })}
            </div>

            {/* BOTÓN DE CONFIRMACIÓN FINAL */}
            <div className="flex flex-col items-center justify-center bg-gray-50 rounded-[2rem] p-8 border-2 border-dashed border-gray-200">
                {selectedCharacter ? (
                    <div className="text-center animate-fade-in">
                        <p className="text-gray-600 mb-4">Has elegido a: <span className="font-bold text-pink-600 text-xl">{selectedCharacter}</span></p>
                        <button
                            onClick={onConfirm}
                            className={`flex items-center px-10 py-4 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 ${
                                isConfirmed ? 'bg-green-500' : 'bg-gray-900 hover:bg-pink-600'
                            }`}
                        >
                            {isConfirmed ? (
                                <><CheckCircle2 className="w-5 h-5 mr-2" /> Compañero Confirmado</>
                            ) : (
                                <><Gift className="w-5 h-5 mr-2" /> Confirmar este Muñequito</>
                            )}
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-400 italic">Selecciona un compañero arriba para continuar...</p>
                )}
            </div>

            {/* MODAL DE VISTA PREVIA CON GLOW NEON */}
            {previewChar && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setPreviewChar(null)}    
                >
                    <div 
                        className="relative bg-black p-2 rounded-3xl max-w-lg w-full transform scale-100 transition-all duration-300"
                        style={{
                            boxShadow: `0 0 40px ${previewChar.neon}, inset 0 0 20px ${previewChar.neon}`
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button 
                            onClick={() => setPreviewChar(null)}
                            className="absolute -top-4 -right-4 bg-black border-2 rounded-full p-2 text-white hover:scale-110 transition-transform z-10"
                            style={{ borderColor: previewChar.neon, boxShadow: `0 0 10px ${previewChar.neon}` }}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="rounded-2xl overflow-hidden bg-gray-900 border" style={{ borderColor: previewChar.neon }}>
                            <img 
                                src={previewChar.image} 
                                alt={previewChar.name} 
                                className="w-full h-auto object-contain max-h-[60vh] opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </div>

                        <div className="text-center mt-6 mb-4">
                            <h3 
                                className="text-4xl font-script text-white mb-6 drop-shadow-lg"
                                style={{ textShadow: `0 0 10px ${previewChar.neon}` }}
                            >
                                {previewChar.name}
                            </h3>
                            <button 
                                onClick={handleModalConfirm}
                                className="px-8 py-3 rounded-full font-bold text-white text-lg transition-all hover:scale-105"
                                style={{ 
                                    backgroundColor: previewChar.neon,
                                    boxShadow: `0 0 20px ${previewChar.neon}80`
                                }}
                            >
                                Seleccionar este compañero
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
