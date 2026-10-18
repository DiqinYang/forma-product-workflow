import { groups } from '../data/products'

export function validateProduct(f, items, editingId) {
  if (!f.name.trim() || !f.description.trim() || !f.sku.trim() || !f.department || !f.category)
    return 'Please complete all required fields.'
  if (f.name.trim().length > 80 || f.description.trim().length < 15 || f.description.length > 400)
    return 'Use a name up to 80 characters and a description between 15 and 400 characters.'
  if (!/^[A-Za-z0-9-]{3,30}$/.test(f.sku.trim()))
    return 'SKU must contain 3–30 letters, numbers or hyphens.'
  if (items.some((p) => p.id !== editingId && p.sku.toLowerCase() === f.sku.trim().toLowerCase()))
    return 'This SKU already exists. Please enter a unique SKU.'
  if (!Number.isFinite(Number(f.price)) || Number(f.price) <= 0 || Number(f.price) > 99999)
    return 'Enter a price greater than 0 and no more than 99,999.'
  if (!(groups[f.department] || []).includes(f.category))
    return 'Select a category belonging to this department.'
  return ''
}
