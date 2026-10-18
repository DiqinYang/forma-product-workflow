import { ref, computed, watch, onScopeDispose } from 'vue'
import { defineStore } from 'pinia'
import { groups, initial } from '../data/products'
import { validateProduct } from '../utils/validateProduct'
export const useWorkflowStore = defineStore('workflow', () => {
  const items = ref(initial()),
    status = ref('All'),
    search = ref(''),
    department = ref('All departments'),
    category = ref('All categories'),
    ascending = ref(false),
    page = ref(1),
    formOpen = ref(false),
    editingId = ref(null),
    isReadOnly = ref(false),
    formError = ref(''),
    notice = ref(''),
    reviewId = ref(1),
    feedback = ref(''),
    reviewError = ref('')
  let timer
  const initialEvents = () => [
    {
      action: 'Product submitted for review',
      product: 'Botanical hand wash · DEMO-001',
      time: 'Sample history',
      note: 'Illustrative starting event, not a real user action.',
    },
    {
      action: 'Product approved',
      product: 'Stoneware breakfast bowl · DEMO-002',
      time: 'Sample history',
      note: '',
    },
  ]
  const events = ref(initialEvents())
  const blank = () => ({
      name: '',
      sku: '',
      price: '',
      department: '',
      category: '',
      description: '',
      status: 'Draft',
    }),
    form = ref(blank())
  const formCategories = computed(() => groups[form.value.department] || []),
    filterCategories = computed(() =>
      department.value === 'All departments'
        ? Object.values(groups).flat()
        : groups[department.value],
    )
  const filtered = computed(() =>
    items.value
      .filter(
        (p) =>
          (status.value === 'All' || status.value === p.status) &&
          (department.value === 'All departments' || department.value === p.department) &&
          (category.value === 'All categories' || category.value === p.category) &&
          (p.name + ' ' + p.sku).toLowerCase().includes(search.value.toLowerCase()),
      )
      .sort((a, b) => (ascending.value ? a.price - b.price : b.price - a.price)),
  )
  const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 7))),
    pageRows = computed(() => filtered.value.slice((page.value - 1) * 7, page.value * 7))
  const pending = computed(() => items.value.filter((p) => p.status === 'In review')),
    reviewProduct = computed(
      () => pending.value.find((p) => p.id === reviewId.value) || pending.value[0],
    )
  watch([status, search, department, category, ascending], () => (page.value = 1))
  watch(department, () => (category.value = 'All categories'))
  watch(
    () => form.value.department,
    () => {
      if (!formCategories.value.includes(form.value.category)) form.value.category = ''
    },
  )
  watch(reviewId, () => {
    feedback.value = ''
    reviewError.value = ''
  })
  const money = (n) =>
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n),
    icon = (d) => ({ Home: '▧', Wellness: '♧', Pantry: '◒' })[d],
    statusClass = (s) =>
      ({
        Draft: 'draft',
        'In review': 'review',
        'Changes requested': 'changes',
        Approved: 'approved',
      })[s]
  function toast(s) {
    notice.value = s
    clearTimeout(timer)
    timer = setTimeout(() => (notice.value = ''), 2800)
  }
  function clearFilters() {
    search.value = ''
    department.value = 'All departments'
    category.value = 'All categories'
    status.value = 'All'
    page.value = 1
  }
  function resetDemo() {
    items.value = initial()
    events.value = initialEvents()
    ascending.value = false
    clearFilters()
    feedback.value = ''
    reviewError.value = ''
    reviewId.value = 1
    toast('Demo reset to its fictional sample data')
  }
  function showForm() {
    formOpen.value = true
  }
  function closeForm() {
    formOpen.value = false
  }
  function newProduct() {
    editingId.value = null
    isReadOnly.value = false
    formError.value = ''
    form.value = blank()
    showForm()
  }
  function openProduct(p) {
    editingId.value = p.id
    isReadOnly.value = !['Draft', 'Changes requested'].includes(p.status)
    formError.value = ''
    form.value = { ...p }
    showForm()
  }
  function addEvent(action, p, note = '') {
    events.value.unshift({ action, product: p.name + ' · ' + p.sku, note, time: 'This session' })
  }
  function saveProduct(newStatus) {
    if (isReadOnly.value) return false
    if (!['Draft', 'In review'].includes(newStatus)) return false
    formError.value = validateProduct(form.value, items.value, editingId.value)
    if (formError.value) return false
    const p = {
      ...form.value,
      id: editingId.value || Math.max(...items.value.map((x) => x.id)) + 1,
      name: form.value.name.trim(),
      sku: form.value.sku.trim(),
      description: form.value.description.trim(),
      price: Math.round(Number(form.value.price) * 100) / 100,
      status: newStatus,
      updated: 'This session',
    }
    if (editingId.value) {
      const index = items.value.findIndex((x) => x.id === editingId.value)
      if (!['Draft', 'Changes requested'].includes(items.value[index].status)) return
      items.value[index] = p
    } else items.value.unshift(p)
    addEvent(newStatus === 'In review' ? 'Product submitted for review' : 'Product draft saved', p)
    closeForm()
    clearFilters()
    if (newStatus === 'In review') {
      reviewId.value = p.id
    }
    toast(
      newStatus === 'In review'
        ? 'Product submitted to the local demo review queue'
        : 'Draft saved for this demo session',
    )
    return true
  }
  function decide(newStatus) {
    if (!['Approved', 'Changes requested'].includes(newStatus)) return
    const p = reviewProduct.value
    if (!p) return
    if (newStatus === 'Changes requested' && !feedback.value.trim()) {
      reviewError.value = 'Please add feedback before requesting changes.'
      return
    }
    p.status = newStatus
    p.updated = 'This session'
    addEvent(
      newStatus === 'Approved' ? 'Product approved' : 'Changes requested',
      p,
      feedback.value.trim(),
    )
    feedback.value = ''
    reviewError.value = ''
    reviewId.value = pending.value[0]?.id || null
    toast(
      newStatus === 'Approved'
        ? 'Product approved in the demo'
        : 'Feedback saved; product returned for revision',
    )
  }

  onScopeDispose(() => clearTimeout(timer))
  return {
    items,
    status,
    search,
    department,
    category,
    ascending,
    page,
    formOpen,
    editingId,
    isReadOnly,
    formError,
    notice,
    reviewId,
    feedback,
    reviewError,
    events,
    form,
    filtered,
    pages,
    pageRows,
    pending,
    reviewProduct,
    formCategories,
    filterCategories,
    money,
    icon,
    statusClass,
    clearFilters,
    resetDemo,
    newProduct,
    openProduct,
    closeForm,
    saveProduct,
    decide,
  }
})
