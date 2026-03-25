import { useNavigate } from 'react-router-dom'
import { Gift, Heart, Gem, ToyBrick, Key, CalendarHeart } from 'lucide-react'

const categories = [
    {
        id: 'boxes',
        title: 'Cajitas de Regalo',
        description: 'Detalles premium listos para entregar.',
        icon: Gift,
        color: 'pink',
        image: '/osito.webp',
    },
    {
        id: 'amigurumis',
        title: 'Amigurumis',
        description: 'Ternura tejida 100% a mano.',
        icon: ToyBrick,
        color: 'orange',
        image: '/conejito.webp',
    },
    {
        id: 'joyeria',
        title: 'Joyería Artesanal',
        description: 'Mostacilla sagrada y micro-crochet.',
        icon: Gem,
        color: 'blue',
        image: '/Joyeria/portadaJoyeria.webp',
    },
    {
        id: 'llaveros',
        title: 'Llaveros',
        description: 'Mini personajes y letras personalizadas.',
        icon: Key,
        color: 'green',
        image: '/conejito.webp',
    },
]

export default function CatalogPreview() {
    const navigate = useNavigate()

    return (
        <section className="mb-20">
            <div className="text-center mb-12">
                <span className="text-primary-600 font-bold tracking-widest uppercase text-xs">Colecciones</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-script">
                    Explora nuestro Catálogo
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto text-lg italic">
                    Regalos artesanales hechos con el corazón para momentos inolvidables.
                </p>
                <div className="w-24 h-1 bg-primary-200 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categories.map((cat) => {
                    const Icon = cat.icon
                    return (
                        <div
                            key={cat.id}
                            onClick={() => navigate(`/catalog/${cat.id}`)}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-72 rounded-[2.5rem] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 mb-5">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-white mb-1 flex items-center">
                                        <Icon className="w-5 h-5 mr-3 text-primary-400" />
                                        {cat.title}
                                    </h3>
                                    <p className="text-gray-200 text-sm leading-snug transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        {cat.description}
                                    </p>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="inline-flex items-center text-gray-900 font-black text-sm uppercase tracking-widest group-hover:text-primary-600 transition-colors">
                                    Ver Colección
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="RB17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

