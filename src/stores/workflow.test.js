import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { useWorkflowStore } from './workflow'

beforeEach(() => setActivePinia(createPinia()))

describe('product review workflow', () => {
  it('requires feedback, permits revision/resubmission and protects approved records', async () => {
    const store = useWorkflowStore()
    const id = store.reviewProduct.id
    store.decide('Changes requested')
    expect(store.reviewProduct.status).toBe('In review')
    expect(store.reviewError).toContain('feedback')
    store.feedback = 'Clarify the materials.'
    store.decide('Changes requested')
    const returned = store.items.find((row) => row.id === id)
    expect(returned.status).toBe('Changes requested')
    store.openProduct(returned)
    await nextTick()
    store.form.description = 'Revised fictional materials and product description.'
    expect(store.saveProduct('In review')).toBe(true)
    await nextTick()
    store.reviewId = id
    store.decide('Approved')
    const approved = store.items.find((row) => row.id === id)
    expect(approved.status).toBe('Approved')
    store.openProduct(approved)
    store.form.name = 'Cannot overwrite'
    store.saveProduct('Draft')
    expect(approved.name).not.toBe('Cannot overwrite')
    expect(store.events.map((e) => e.action)).toContain('Product approved')
  })

  it('rejects duplicate SKUs and clears categories incompatible with a new department', async () => {
    const store = useWorkflowStore()
    store.newProduct()
    store.form.department = 'Home'
    await nextTick()
    Object.assign(store.form, {
      name: 'New bowl',
      sku: 'DEMO-001',
      category: 'Kitchen',
      price: 20,
      description: 'An entirely fictional ceramic product.',
    })
    expect(store.saveProduct('Draft')).toBe(false)
    expect(store.formError).toContain('SKU already exists')
    store.form.department = 'Pantry'
    await nextTick()
    expect(store.form.category).toBe('')
    store.form.sku = 'DEMO-NEW'
    store.form.category = 'Breakfast'
    expect(store.saveProduct('Draft')).toBe(true)
    expect(store.items).toHaveLength(17)
    store.resetDemo()
    expect(store.items).toHaveLength(16)
  })
})
