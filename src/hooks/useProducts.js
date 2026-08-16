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
  