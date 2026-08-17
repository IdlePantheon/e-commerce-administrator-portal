import { useCartContext } from '../context/CartContext.jsx'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, totalPrice } = useCartContext()

  if (!isOpen) return null

  return (
    <>
      <div className="drawer-overlay" onClick={closeCart} />
      <div className="cart-drawer" role="dialog" aria-label="Shopping cart">
        <div className="drawer-header">
          <h2>Your cart</h2>
          <button className="drawer-close" onClick={closeCart} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 && <p className="empty-state">Your cart is empty.</p>}

          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-spec">{item.specSummary}</div>
                <div className="qty-control">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="mono">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
              <span className="mono">${(item.priceKES * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="cart-footer">
          <div className="cart-total-row">
            <span>Total</span>
            <span className="mono">${totalPrice.toLocaleString()}</span>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} disabled={items.length === 0}>
            Checkout
          </button>
        </div>
      </div>
    </>
  )
}
