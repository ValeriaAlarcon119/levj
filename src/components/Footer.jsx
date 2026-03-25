import { Instagram, Facebook, MessageCircle, Phone } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="text-4xl font-bold font-script text-pink-500 mb-8 italic">
                        Recuerdos y Artesanías Levj
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#" className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-200 text-pink-500 hover:scale-110 hover:shadow-md transition-all">
                            <Instagram className="w-7 h-7" />
                        </a>
                        <a href="#" className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-200 text-blue-600 hover:scale-110 hover:shadow-md transition-all">
                            <Facebook className="w-7 h-7" />
                        </a>
                        <a href="https://wa.me/573117449458" target="_blank" className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-200 text-green-500 hover:scale-110 hover:shadow-md transition-all">
                            <MessageCircle className="w-7 h-7" />
                        </a>
                        <a href="#" className="w-14 h-14 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-200 text-blue-400 hover:scale-110 hover:shadow-md transition-all">
                            <Phone className="w-7 h-7" />
                        </a>
                    </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                        © {new Date().getFullYear()} Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    )
}
