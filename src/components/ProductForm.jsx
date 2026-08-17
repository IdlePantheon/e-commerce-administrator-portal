import { useId, useState } from 'react'

const WORKLOAD_OPTIONS = [
  { id: 'Dev-Office', label: 'Software Development & General Office' },
  { id: 'CAD-Engineering', label: '3D CAD, Architecture & Engineering' },
  { id: 'Video-Editing', label: 'Video Editing & Motion Design' },
  { id: 'AI-ML', label: 'Local AI & Machine Learning' },
  { id: 'Gaming', label: 'Gaming & Heavy Media' },
]

const CONDITION_OPTIONS = ['New', 'Refurbished', 'Used']

const emptyProduct = {
  name: '',
  brand: '',
  workloadCategory: 'Dev-Office',
  cpuArchitecture: '',
  cpuModel: '',
  gpuVendor: '',
  gpuModel: '',
  gpuTier: '',
  ramGB: '',
  storageGB: '',
  osCompatibility: '',
  condition: 'New',
  priceKES: '',
  whyThisMachine: '',
  specSummary: '',
}

// Flattens a product record from db.json into the form's field shape.
export function toFormValues(product) {
  if (!product) return emptyProduct
  return {
    name: product.name ?? '',
    brand: product.brand ?? '',
    workloadCategory: product.workloadCategory ?? 'Dev-Office',
    cpuArchitecture: product.cpu?.architecture ?? '',
    cpuModel: product.cpu?.model ?? '',
    gpuVendor: product.gpu?.vendor ?? '',
    gpuModel: product.gpu?.model ?? '',
    gpuTier: product.gpu?.tier ?? '',
    ramGB: product.ramGB ?? '',
    storageGB: product.storageGB ?? '',
    osCompatibility: (product.osCompatibility ?? []).join(', '),
    condition: product.condition ?? 'New',
    priceKES: product.priceKES ?? '',
    whyThisMachine: product.whyThisMachine ?? '',
    specSummary: product.specSummary ?? '',
  }
}

// Reshapes flat form values back into the nested product structure db.json expects.
export function toProductPayload(values) {
  return {
    name: values.name.trim(),
    brand: values.brand.trim(),
    workloadCategory: values.workloadCategory,
    cpu: { architecture: values.cpuArchitecture.trim(), model: values.cpuModel.trim() },
    gpu: {
      vendor: values.gpuVendor.trim(),
      model: values.gpuModel.trim(),
      tier: values.gpuTier.trim(),
    },
    ramGB: Number(values.ramGB),
    storageGB: Number(values.storageGB),
    osCompatibility: values.osCompatibility
      .split(',')
      .map((os) => os.trim())
      .filter(Boolean),
    condition: values.condition,
    priceKES: Number(values.priceKES),
    whyThisMachine: values.whyThisMachine.trim(),
    specSummary: values.specSummary.trim(),
  }
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Product name is required.'
  if (!values.brand.trim()) errors.brand = 'Brand is required.'
  if (!values.priceKES || Number(values.priceKES) <= 0) errors.priceKES = 'Enter a price greater than 0.'
  if (!values.ramGB || Number(values.ramGB) <= 0) errors.ramGB = 'Enter RAM in GB.'
  if (!values.cpuModel.trim()) errors.cpuModel = 'CPU model is required.'
  return errors
}

export default function ProductForm({ initialValues, onSubmit, submitLabel, status }) {
  const formId = useId()
  const [values, setValues] = useState(initialValues ?? emptyProduct)
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit(values)
  }

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor={`${formId}-name`}>Product name</label>
        <input
          id={`${formId}-name`}
          type="text"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="e.g. ThinkPad P16 Gen 2"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${formId}-brand`}>Brand</label>
          <input
            id={`${formId}-brand`}
            type="text"
            value={values.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            placeholder="e.g. Lenovo"
          />
          {errors.brand && <span className="form-error">{errors.brand}</span>}
        </div>

        <div className="form-field">
          <label htmlFor={`${formId}-workload`}>Workload category</label>
          <select
            id={`${formId}-workload`}
            value={values.workloadCategory}
            onChange={(e) => handleChange('workloadCategory', e.target.value)}
          >
            {WORKLOAD_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${formId}-cpu-arch`}>CPU architecture</label>
          <input
            id={`${formId}-cpu-arch`}
            type="text"
            value={values.cpuArchitecture}
            onChange={(e) => handleChange('cpuArchitecture', e.target.value)}
            placeholder="Intel / AMD / Apple M-Series / ARM"
          />
        </div>
        <div className="form-field">
          <label htmlFor={`${formId}-cpu-model`}>CPU model</label>
          <input
            id={`${formId}-cpu-model`}
            type="text"
            value={values.cpuModel}
            onChange={(e) => handleChange('cpuModel', e.target.value)}
            placeholder="e.g. Core i9-14900HX"
          />
          {errors.cpuModel && <span className="form-error">{errors.cpuModel}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${formId}-gpu-vendor`}>GPU vendor</label>
          <input
            id={`${formId}-gpu-vendor`}
            type="text"
            value={values.gpuVendor}
            onChange={(e) => handleChange('gpuVendor', e.target.value)}
            placeholder="NVIDIA / AMD / Apple / Intel"
          />
        </div>
        <div className="form-field">
          <label htmlFor={`${formId}-gpu-model`}>GPU model</label>
          <input
            id={`${formId}-gpu-model`}
            type="text"
            value={values.gpuModel}
            onChange={(e) => handleChange('gpuModel', e.target.value)}
            placeholder="e.g. RTX 5000 Ada"
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-gpu-tier`}>GPU tier</label>
        <input
          id={`${formId}-gpu-tier`}
          type="text"
          value={values.gpuTier}
          onChange={(e) => handleChange('gpuTier', e.target.value)}
          placeholder="consumer / workstation / integrated"
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${formId}-ram`}>RAM (GB)</label>
          <input
            id={`${formId}-ram`}
            type="number"
            min="0"
            value={values.ramGB}
            onChange={(e) => handleChange('ramGB', e.target.value)}
          />
          {errors.ramGB && <span className="form-error">{errors.ramGB}</span>}
        </div>
        <div className="form-field">
          <label htmlFor={`${formId}-storage`}>Storage (GB)</label>
          <input
            id={`${formId}-storage`}
            type="number"
            min="0"
            value={values.storageGB}
            onChange={(e) => handleChange('storageGB', e.target.value)}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-os`}>OS compatibility</label>
        <input
          id={`${formId}-os`}
          type="text"
          value={values.osCompatibility}
          onChange={(e) => handleChange('osCompatibility', e.target.value)}
          placeholder="Windows, macOS, Linux (certified)"
        />
        <span className="hint">Comma-separated list.</span>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor={`${formId}-condition`}>Condition</label>
          <select
            id={`${formId}-condition`}
            value={values.condition}
            onChange={(e) => handleChange('condition', e.target.value)}
          >
            {CONDITION_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor={`${formId}-price`}>Price (KES)</label>
          <input
            id={`${formId}-price`}
            type="number"
            min="0"
            value={values.priceKES}
            onChange={(e) => handleChange('priceKES', e.target.value)}
          />
          {errors.priceKES && <span className="form-error">{errors.priceKES}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-summary`}>Spec summary</label>
        <input
          id={`${formId}-summary`}
          type="text"
          value={values.specSummary}
          onChange={(e) => handleChange('specSummary', e.target.value)}
          placeholder="One line shown on the product card"
        />
      </div>

      <div className="form-field">
        <label htmlFor={`${formId}-why`}>Why this machine?</label>
        <textarea
          id={`${formId}-why`}
          rows="4"
          value={values.whyThisMachine}
          onChange={(e) => handleChange('whyThisMachine', e.target.value)}
          placeholder="Plain-English explanation of why this fits the workload"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>

      {status && <span className="form-status">{status}</span>}
    </form>
  )
}
