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