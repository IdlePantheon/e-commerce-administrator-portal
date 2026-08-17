import { createContext, useContext, useState, useCallback } from 'react'

const BIN_URL = 'https://api.jsonbin.io/v3/b/6a8311f2da38895dfeeedf1a'
const HEADERS = {
    'X-Master-Key': '$2a$10$eXIhEk6NzdX.4haxOo0Zm.ivsYHkCL1eTbO0hda4Q6Hpaq1JU.7lq',
    'Content-Type': 'application/json'
}


const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BIN_URL}`, { headers: HEADERS })
      const data = await res.json()
      setItems(data)
    } catch (err) {
      console.error('Failed to load cart', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // POST — add a product to the cart (or bump quantity if already present)
  const addToCart = useCallback(async (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.productId === product.id)
      if (existing) {
        updateQuantity(existing.id, existing.quantity + 1)
        return prevItems
      }

      ;(async () => {
        const cartItem = {
          productId: product.id,
          name: product.name,
          priceKES: product.priceKES,
          specSummary: product.specSummary,
          quantity: 1,
        }
        try {
          const res = await fetch(`${BIN_URL}`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(cartItem),
          })
          const saved = await res.json()
          setItems((prev) => [...prev, saved])
          setIsOpen(true)
        } catch (err) {
          console.error('Failed to add to cart', err)
        }
      })()

      return prevItems
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // PATCH — update quantity of an existing cart line
  const updateQuantity = useCallback(async (cartId, quantity) => {
    if (quantity < 1) return
    try {
      const res = await fetch(`${BIN_URL}`, {
        method: 'PATCH',
        headers: HEADERS,
        body: JSON.stringify({ quantity }),
      })
      const updated = await res.json()
      setItems((prev) => prev.map((item) => (item.id === cartId ? updated : item)))
    } catch (err) {
      console.error('Failed to update quantity', err)
    }
  }, [])

  // DELETE — remove a line item from the cart
  const removeFromCart = useCallback(async (cartId) => {
    try {
      await fetch(`${BIN_URL}`, {
        method: 'DELETE',
        headers: HEADERS,
      })
      setItems((prev) => prev.filter((item) => item.id !== cartId))
    } catch (err) {
      console.error('Failed to remove item', err)
    }
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.priceKES * item.quantity, 0)

  const value = {
    items,
    isOpen,
    loading,
    totalItems,
    totalPrice,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within a CartProvider')
  return ctx
}
