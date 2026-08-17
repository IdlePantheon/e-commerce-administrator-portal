import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ProductForm, { toProductPayload } from '../components/ProductForm.jsx'

const BIN_URL = 'https://api.jsonbin.io/v3/b/6a8311f2da38895dfeeedf1a'
const HEADERS = {
    'X-Master-Key': '$2a$10$eXIhEk6NzdX.4haxOo0Zm.ivsYHkCL1eTbO0hda4Q6Hpaq1JU.7lq',
    'Content-Type': 'application/json'
}


export default function AddProduct() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  // POST — add a brand new product to the inventory
  async function handleSubmit(values) {
    setStatus('Saving…')
    try {
     const res = await fetch(`${BIN_URL}`, {
        method: 'POST',
        headers: HEADERS,
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