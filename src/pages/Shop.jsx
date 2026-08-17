import useProducts from '../hooks/useProducts.js'
import IntentFilterNav from '../components/IntentFilterNav.jsx'
import AdvancedFilterPanel from '../components/AdvancedFilterPanel.jsx'
import SearchBar from '../components/SearchBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import categoriesData from '../data/workloadCategories.js'

export default function Shop() {
  const {
    products,
    allProducts,
    loading,
    error,
    filters,
    searchTerm,
    setSearchTerm,
    setWorkloadCategory,
    toggleArrayFilter,
    setMinRAM,
    clearFilters,
  } = useProducts()

  return (
    <div className="container">
      <div className="section-head" style={{ marginTop: 40 }}>
        <div>
       <h2>What are you using this machine for?</h2>
        </div>
      </div>

      <IntentFilterNav
        categories={categoriesData}
        activeCategory={filters.workloadCategory}
        onSelect={setWorkloadCategory}
      />

      <div className="shop-layout">
        <AdvancedFilterPanel
          allProducts={allProducts}
          filters={filters}
          onToggle={toggleArrayFilter}
          onMinRAM={setMinRAM}
          onClear={clearFilters}
        />

        <div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <div className="results-meta">
            {loading ? 'Loading…' : `${products.length} machine${products.length === 1 ? '' : 's'} match`}
          </div>
          <ProductGrid
            products={products}
            activeWorkload={filters.workloadCategory}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}