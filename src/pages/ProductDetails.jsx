import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext.jsx'

const API_URL = 'https://6a82e1abcb486d2434030089.mockapi.io'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCartContext()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)

    fetch(`${API_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => {
        if (!cancelled) setProduct(data)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="container">
        <p className="empty-state">Loading machine details…</p>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="container">
        <p className="empty-state">
          We couldn&apos;t find that machine. <Link to="/shop">Back to shop</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="container details-layout">
      <div>
        <div className="details-media">{product.name}</div>
      </div>

      <div>
        <span className="product-brand">{product.brand}</span>
        <h1 style={{ fontSize: 28, margin: '8px 0 16px' }}>{product.name}</h1>
        <p className="product-price" style={{ fontSize: 24 }}>
          ${product.priceKES.toLocaleString()}
        </p>

        <table className="spec-table">
          <tbody>
            <tr>
              <td>Processor</td>
              <td>{product.cpu.model} ({product.cpu.architecture})</td>
            </tr>
            <tr>
              <td>Graphics</td>
              <td>{product.gpu.model} ({product.gpu.vendor}, {product.gpu.tier})</td>
            </tr>
            <tr>
              <td>Memory</td>
              <td>{product.ramGB}GB</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>{product.storageGB}GB SSD</td>
            </tr>
            <tr>
              <td>OS Compatibility</td>
              <td>{product.osCompatibility.join(', ')}</td>
            </tr>
            <tr>
              <td>Condition</td>
              <td>{product.condition}</td>
            </tr>
          </tbody>
        </table>

        <div className="why-card">
          <strong>Why this machine?</strong>
          {product.whyThisMachine}
        </div>

        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to cart
          </button>
          <Link to="/shop" className="btn btn-secondary">
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  )
}
