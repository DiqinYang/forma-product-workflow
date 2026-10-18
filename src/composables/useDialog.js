import { onMounted, onUnmounted } from 'vue'
// Dialogs own focus and DOM events; domain stores remain independent of the document.
export function useDialog(element, close) {
  let previous
  function onKey(event) {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
      return
    }
    if (event.key !== 'Tab') return
    const nodes = [
      ...element.value.querySelectorAll(
        'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]',
      ),
    ]
    const first = nodes[0],
      last = nodes[nodes.length - 1]
    if (!first) {
      event.preventDefault()
      return
    }
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
  onMounted(() => {
    previous = document.activeElement
    element.value
      .querySelector('input:not(:disabled),button:not(:disabled),textarea:not(:disabled)')
      ?.focus()
    document.addEventListener('keydown', onKey)
  })
  onUnmounted(() => {
    document.removeEventListener('keydown', onKey)
    if (previous?.isConnected) previous.focus()
  })
}
