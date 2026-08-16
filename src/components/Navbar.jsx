import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/CartContext.jsx'

export default function Navbar() {
  const { totalItems, openCart } = useCartContext()

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark" aria-hidden="true"></span>
          FitStack
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')}>
              Admin Portal
            </NavLink>
          </li>
        </ul>

        <button className="cart-button" onClick={openCart} aria-label="Open cart">
          Cart
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </button>
      </div>
    </header>
  )
}