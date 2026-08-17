import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ProductForm, { toFormValues, toProductPayload } from '../components/ProductForm.jsx'

const API_URL = 'https://6a82e1abcb486d2434030088.mockapi.io/products'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [status, setStatus] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)

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

  // PATCH — update this product's fields, e.g. price, RAM, or condition
  async function handleSubmit(values) {
    setStatus('Saving…')
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toProductPayload(values)),
      })
      if (!res.ok) throw new Error('Failed to update product')
      setStatus('Saved.')
      navigate(`/product/${id}`)
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <p className="empty-state">Loading product…</p>
      </div>
    )
  }

  if (notFound || !product) {
    return (
      <div className="container">
        <p className="empty-state">
          We couldn&apos;t find that product. <Link to="/admin">Back to inventory</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="admin-header">
        <div>
          <div className="eyebrow">Admin Portal</div>
          <h2>Edit {product.name}</h2>
        </div>
        <Link to="/admin" className="btn btn-secondary">
          Back to inventory
        </Link>
      </div>

      <ProductForm
        initialValues={toFormValues(product)}
        onSubmit={handleSubmit}
        submitLabel="Save changes"
        status={status}
      />
    </div>
  )
}