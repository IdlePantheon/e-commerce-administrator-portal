import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === product.id)
      if (existing) {
        return prevItems.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }

      const cartItem = {
        id: Date.now().toString(),
        productId: product.id,
        name: product.name,
        priceKES: product.priceKES,
        specSummary: product.specSummary,
        quantity: 1,
      }
      return [...prevItems, cartItem]
    })
    setIsOpen(true)
  }, [])

  const updateQuantity = useCallback((cartId, quantity) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((item) => (item.id === cartId ? { ...item, quantity } : item)))
  }, [])

  const removeFromCart = useCallback((cartId) => {
    setItems((prev) => prev.filter((item) => item.id !== cartId))
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.priceKES * item.quantity, 0)

  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    isOpen,
    setIsOpen,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
