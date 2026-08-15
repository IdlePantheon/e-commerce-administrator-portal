export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span aria-hidden="true">🔍</span>
      <input
        type="text"
        placeholder="Search by name, brand, CPU, or GPU…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  )
}
