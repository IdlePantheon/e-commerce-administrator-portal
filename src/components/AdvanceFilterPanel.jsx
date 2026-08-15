import { useMemo } from 'react'

export default function AdvancedFilterPanel({ allProducts, filters, onToggle, onMinRAM, onClear }) {
  const options = useMemo(() => {
    const brands = new Set()
    const cpuArchitectures = new Set()
    const gpuVendors = new Set()
    const osTags = new Set()
    const conditions = new Set()

    allProducts.forEach((p) => {
      brands.add(p.brand)
      cpuArchitectures.add(p.cpu.architecture)
      gpuVendors.add(p.gpu.vendor)
      p.osCompatibility.forEach((os) => osTags.add(os))
      conditions.add(p.condition)
    })

    return {
      brands: [...brands].sort(),
      cpuArchitectures: [...cpuArchitectures].sort(),
      gpuVendors: [...gpuVendors].sort(),
      osTags: [...osTags].sort(),
      conditions: [...conditions].sort(),
    }
  }, [allProducts])

  const ramSteps = [0, 16, 32, 64]

  return (
    <aside className="filter-panel">
      <h3>Advanced specs</h3>

      <div className="filter-group">
        <span className="filter-group-label">Brand</span>
        {options.brands.map((brand) => (
          <label className="checkbox-row" key={brand}>
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => onToggle('brands', brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Processor architecture</span>
        {options.cpuArchitectures.map((arch) => (
          <label className="checkbox-row" key={arch}>
            <input
              type="checkbox"
              checked={filters.cpuArchitectures.includes(arch)}
              onChange={() => onToggle('cpuArchitectures', arch)}
            />
            {arch}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Graphics</span>
        {options.gpuVendors.map((vendor) => (
          <label className="checkbox-row" key={vendor}>
            <input
              type="checkbox"
              checked={filters.gpuVendors.includes(vendor)}
              onChange={() => onToggle('gpuVendors', vendor)}
            />
            {vendor}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-group-label">
          Minimum RAM <span className="range-value">{filters.minRAM}GB+</span>
        </span>
        <input
          type="range"
          min="0"
          max="3"
          step="1"
          value={ramSteps.indexOf(filters.minRAM) === -1 ? 0 : ramSteps.indexOf(filters.minRAM)}
          onChange={(e) => onMinRAM(ramSteps[Number(e.target.value)])}
          aria-label="Minimum RAM"
        />
      </div>

      <div className="filter-group">
        <span className="filter-group-label">OS compatibility</span>
        {options.osTags.map((os) => (
          <label className="checkbox-row" key={os}>
            <input
              type="checkbox"
              checked={filters.osTags.includes(os)}
              onChange={() => onToggle('osTags', os)}
            />
            {os}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-group-label">Condition</span>
        {options.conditions.map((condition) => (
          <label className="checkbox-row" key={condition}>
            <input
              type="checkbox"
              checked={filters.condition.includes(condition)}
              onChange={() => onToggle('condition', condition)}
            />
            {condition}
          </label>
        ))}
      </div>

      <button type="button" className="clear-filters" onClick={onClear}>
        Clear all filters
      </button>
    </aside>
  )
}