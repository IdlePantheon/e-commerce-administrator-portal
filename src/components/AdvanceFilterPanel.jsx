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
    } }, [allProducts])

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

