import { useId } from 'react'


 // Coarse "intent" layer of the dual-filter engine lets non-technical buyers filter by what they actually plan to do, not by spec jargon.
export default function IntentFilterNav({ categories, activeCategory, onSelect }) {
  const groupId = useId()

  return (
    <nav className="intent-nav" aria-labelledby={groupId}>
      <h2 id={groupId} className="visually-hidden" style={{ display: 'none' }}>
        Filter by intended workload
      </h2>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`intent-card${activeCategory === category.id ? ' active' : ''}`}
          onClick={() => onSelect(category.id)}
          aria-pressed={activeCategory === category.id}
        >
          <span className="intent-icon" aria-hidden="true">{category.icon}</span>
          <span className="intent-label">{category.label}</span>
        </button>
      ))}
    </nav>
  )
}
