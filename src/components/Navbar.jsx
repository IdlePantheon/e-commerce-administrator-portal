NavLink to="/shop" className={({ isActive }) => (isActive ? 'active' : '')}>
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