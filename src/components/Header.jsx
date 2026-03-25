import { Link, useNavigate } from 'react-router-dom'
import { Gift, Store } from 'lucide-react'

export default function Header() {
    const navigate = useNavigate()

    const scrollToPersonalize = () => {
        navigate('/')
        setTimeout(() => {
            const element = document.getElementById('personalizar')
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }, 100)
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900 flex items-center hover:text-pink-600 transition font-script italic">
                    <Gift className="mr-2 text-pink-500" />
                    Recuerdos y Artesanías Levj
                </Link>
                <nav>
                    <ul className="flex space-x-2 md:space-x-6 text-sm md:text-base font-medium">
                        <li>
                            <Link to="/" className="hover:text-primary-600 transition px-2 py-1">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/catalog" className="hover:text-primary-600 transition px-2 py-1 flex items-center">
                                <Store className="w-4 h-4 mr-1" />
                                Catálogo
                            </Link>
                        </li>
                        <li className="hidden md:block">
                            <button
                                onClick={scrollToPersonalize}
                                className="bg-primary-600 text-white px-4 py-1.5 rounded-full hover:bg-primary-700 transition"
                            >
                                Personalizar Caja
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
