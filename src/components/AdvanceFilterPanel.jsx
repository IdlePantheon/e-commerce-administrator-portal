import { useMemo } from 'react'

/**
 * Granular "advanced spec" layer of the dual-filter engine — for
 * enthusiasts who already know the exact brand/CPU/GPU/RAM/OS they need.
 */
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