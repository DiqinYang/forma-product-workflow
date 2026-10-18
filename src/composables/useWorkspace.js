import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { statuses } from '../data/products'
import { useWorkflowStore } from '../stores/workflow'
export function useWorkspace() {
  const store = useWorkflowStore(),
    router = useRouter(),
    route = useRoute()
  const paths = { catalogue: '/', review: '/review', activity: '/activity' }
  const view = computed({
    get: () => route.meta.section || 'catalogue',
    set: (value) => router.push(paths[value]),
  })
  function saveProduct(status) {
    const saved = store.saveProduct(status)
    if (saved && status === 'In review') router.push('/review')
    return saved
  }
  return {
    ...storeToRefs(store),
    statuses,
    money: store.money,
    icon: store.icon,
    statusClass: store.statusClass,
    clearFilters: store.clearFilters,
    resetDemo: store.resetDemo,
    newProduct: store.newProduct,
    openProduct: store.openProduct,
    closeForm: store.closeForm,
    decide: store.decide,
    view,
    saveProduct,
    submitForm: () => saveProduct('In review'),
  }
}
