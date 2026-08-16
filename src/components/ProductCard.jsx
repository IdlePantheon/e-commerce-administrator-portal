import { Link } from 'react-router-dom'
import { useCartContext } from '../context/CartContext.jsx'

const CATEGORY_LABELS = {
  'dev-office': 'Dev & Office',
  'cad-engineering': 'CAD & Engineering',
  'video-editing': 'Video Editing',
  'ai-ml': 'AI & ML',
  'gaming': 'Gaming',
}

function badgeClass(condition) {
  if (condition === 'New') return 'badge badge-new'
  if (condition === 'Refurbished') return 'badge badge-refurbished'
  return 'badge badge-used'
}

export default function ProductCard({ product, activeWorkload }) {
  const { addToCart } = useCartContext()

  // Presentational fit score: full confidence when the card matches the
  // currently selected intent filter, slightly lower otherwise.
  const filledSegments = activeWorkload
    ? activeWorkload === product.workloadCategory
      ? 5
      : 2
    : 4

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card-top-row">
          <span className="product-brand">{product.brand}</span>
          <span className={badgeClass(product.condition)}>{product.condition}</span>
        </div>

        <div className="product-name">{product.name}</div>
        <div className="product-spec-summary">{product.specSummary}</div>

        <div className="spec-tags">
          <span className="spec-tag">{CATEGORY_LABELS[product.workloadCategory]}</span>
          <span className="spec-tag">{product.ramGB}GB RAM</span>
          <span className="spec-tag">{product.gpu.vendor}</span>
        </div>

        <div className="fit-meter">
          <div className="fit-meter-label">
            <span>WORKLOAD FIT</span>
            <span>{filledSegments}/5</span>
          </div>
          <div className="fit-meter-track">
            {[1, 2, 3, 4, 5].map((seg) => (
              <div key={seg} className={`fit-meter-seg${seg <= filledSegments ? ' filled' : ''}`} />
            ))}
          </div>
        </div>
      </Link>

      <div className="card-bottom-row">
        <span className="product-price">${product.priceUSD.toLocaleString()}</span>
        <button type="button" className="btn btn-secondary" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
