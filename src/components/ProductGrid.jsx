import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, activeWorkload, loading, error }) {
  if (loading) {
    return (
      <div className="product-grid">
        <p className="empty-state">Loading inventory…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="product-grid">
        <p className="empty-state">
          Couldn&apos;t reach the inventory server. Make sure <code>json-server</code> is running on port 4000.
        </p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="product-grid">
        <p className="empty-state">No machines match those filters yet. Try clearing a few.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} activeWorkload={activeWorkload} />
      ))}
    </div>
  )
}
