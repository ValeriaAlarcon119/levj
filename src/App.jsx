import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import FloatingCart from './components/FloatingCart'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import './App.css'

function App() {
    return (
        <Router>
            <CartProvider>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/catalog/:category" element={<Catalog />} />
                        </Routes>
                    </main>
                    <Footer />
                    <FloatingCart />
                    <WhatsAppButton />
                </div>
            </CartProvider>
        </Router>
    )
}

export default App
