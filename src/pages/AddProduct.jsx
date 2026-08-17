import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ProductForm, { toProductPayload } from '../components/ProductForm.jsx'

const API_URL = 'https://6a82e1abcb486d2434030088.mockapi.io/products'

export default function AddProduct() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  // POST — add a brand new product to the inventory
  async function handleSubmit(values) {
    setStatus('Saving…')
    try {
     const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toProductPayload(values)),
      })
      if (!res.ok) throw new Error('Failed to save product')
      const saved = await res.json()
      navigate(`/product/${saved.id}`)
    } catch (err) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <div className="container">
      <div className="admin-header">
        <div>
          <div className="eyebrow">Admin Portal</div>
          <h2>Add a new product</h2>
        </div>
        <Link to="/admin" className="btn btn-secondary">
          Back to inventory
        </Link>
      </div>

      <ProductForm onSubmit={handleSubmit} submitLabel="Add product" status={status} />
    </div>
  )
}