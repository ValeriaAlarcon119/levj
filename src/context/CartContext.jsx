import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    const [user, setUser] = useState(null) // { phone, name, address }

    // Load from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('tienda_cart')
        const savedUser = localStorage.getItem('tienda_user')
        if (savedCart) setCart(JSON.parse(savedCart))
        if (savedUser) setUser(JSON.parse(savedUser))
    }, [])

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem('tienda_cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if (user) localStorage.setItem('tienda_user', JSON.stringify(user))
    }, [user])

    const addToCart = (product) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id)
            if (exists) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id))
    }

    const clearCart = () => setCart([])

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }))
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, user, setUser }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
