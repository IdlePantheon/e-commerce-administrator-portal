import { useState, useEffect, useMemo } from 'react'

const API_URL = 'https://6a82e1abcb486d2434030088.mockapi.io/products'

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

    const setWorkloadCategory = (categoryId) => {
    setFilters((prev) => ({
      ...prev,
      workloadCategory:
        prev.workloadCategory === categoryId ? null : categoryId,
    }))
  }
    const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const current = prev[key]

      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]

      return { ...prev, [key]: next }
    })
  }
    const setMinRAM = (value) => {
    setFilters((prev) => ({
      ...prev,
      minRAM: value,
    }))
  }

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS)
    setSearchTerm('')
  }

    const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        filters.workloadCategory &&
        product.workloadCategory !== filters.workloadCategory
      ) {
        return false
      }

      if (
        filters.brands.length &&
        !filters.brands.includes(product.brand)
      ) {
        return false
      }

      if (
        filters.cpuArchitectures.length &&
        !filters.cpuArchitectures.includes(product.cpu.architecture)
      ) {
        return false
      }

      if (
        filters.gpuVendors.length &&
        !filters.gpuVendors.includes(product.gpu.vendor)
      ) {
        return false
      }

      if (product.ramGB < filters.minRAM) {
        return false
      }

      if (
        filters.osTags.length &&
        !filters.osTags.some((tag) =>
          product.osCompatibility.includes(tag)
        )
      ) {
        return false
      }

      if (
        filters.condition.length &&
        !filters.condition.includes(product.condition)
      ) {
        return false
      }

      if (searchTerm.trim()) {
        const q = searchTerm.trim().toLowerCase()

        const haystack = `
          ${product.name}
          ${product.brand}
          ${product.cpu.model}
          ${product.gpu.model}
        `.toLowerCase()

        if (!haystack.includes(q)) {
          return false
        }
      }

      return true
    })
  }, [products, filters, searchTerm])
  
    return {
    products: filteredProducts,
    allProducts: products,
    loading,
    error,
    filters,
    searchTerm,
    setSearchTerm,
    setWorkloadCategory,
    toggleArrayFilter,
    setMinRAM,
    clearFilters,
  }
}