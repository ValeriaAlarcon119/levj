import { useState, useMemo } from 'react'
import { Heart } from 'lucide-react'
import ProductHero from '../components/ProductHero'
import CharacterSelector from '../components/CharacterSelector'
import PersonalizationForm from '../components/PersonalizationForm'
import CatalogPreview from '../components/CatalogPreview'
import CheckoutModal from '../components/CheckoutModal'

export default function Home() {
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalMsg, setModalMsg] = useState('')
    const [showCheckout, setShowCheckout] = useState(false)

    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        fecha: '',
        hora: '',
        peso: '',
        talla: '',
        foto: null,
    })

    // Validation
    const isFormFullyFilled = useMemo(() => {
        return (
            formData.nombre.trim().length > 0 &&
            formData.apellidos.trim().length > 0 &&
            formData.fecha !== '' &&
            formData.hora !== '' &&
            formData.peso !== '' &&
            formData.talla !== ''
        )
    }, [formData])

    const handleConfirmCompanion = () => {
        if (!selectedCharacter) {
            setModalMsg('Por favor selecciona primero un compañero amigurumi para tu cajita. 💕')
            setShowModal(true)
            return
        }
        
        setIsConfirmed(true)
        
        if (!isFormFullyFilled) {
            setModalMsg('¡Genial! Tu compañero está listo. Ahora, por favor completa los datos del bebé abajo para finalizar tu pedido. ✨')
            setShowModal(true)
            const formSection = document.getElementById('personalizar')
            formSection?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in relative bg-white">
            {/* Hero Section */}
            <ProductHero />

            {/* Character Selection */}
            <CharacterSelector
                selectedCharacter={selectedCharacter}
                onSelect={(val) => {
                    setSelectedCharacter(val)
                    setIsConfirmed(false)
                }}
                onConfirm={handleConfirmCompanion}
                isConfirmed={isConfirmed}
            />

            {/* Personalization Form */}
            <div id="personalizar">
                <PersonalizationForm
                    formData={formData}
                    setFormData={setFormData}
                    selectedCharacter={selectedCharacter}
                    isFullyFilled={isFormFullyFilled}
                    onOrder={() => setShowCheckout(true)}
                />
            </div>

            {/* Checkout Modal for Cajita */}
            <CheckoutModal 
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
                orderType="cajita"
                orderData={{
                    ...formData,
                    personaje: selectedCharacter
                }}
            />

            {/* CUSTOM MODAL ALERT */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 text-center shadow-2xl scale-100 border-t-8 border-pink-500">
                        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600">
                            <Heart className="w-10 h-10 fill-pink-500 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 font-script">¡Adelante, Corazón!</h3>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            {modalMsg}
                        </p>
                        <button 
                            onClick={() => setShowModal(false)}
                            className="bg-gray-900 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-pink-600 transition-all shadow-lg active:scale-95"
                        >
                            ¡Entendido!
                        </button>
                    </div>
                </div>
            )}

            {/* Catalog Preview */}
            <CatalogPreview />
        </div>
    )
}
