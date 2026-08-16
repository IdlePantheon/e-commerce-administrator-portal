import { useState, useEffect, useMemo } from 'react'

const API_URL = 'http://localhost:4000'

export const DEFAULT_FILTERS = {
  workloadCategory: null,
  brands: [],
  cpuArchitectures: [],
  gpuVendors: [],
  minRAM: 0,
  osTags: [],
  condition: [],
}
export default function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [searchTerm, setSearchTerm] = useState('') 
  
    useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`${API_URL}/products`)

        if (!res.ok) {
          throw new Error('Failed to fetch inventory')
        }

        const data = await res.json()

        if (!cancelled) {
          setProducts(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      cancelled = true
    }
  }, [])
