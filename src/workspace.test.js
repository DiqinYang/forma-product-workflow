import { afterEach, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './App.vue'
import { router as applicationRouter } from './router'
import { useWorkflowStore } from './stores/workflow'

let wrapper
afterEach(() => wrapper?.unmount())

it('submits the Vue form, navigates to review, and restores focus after dismissing a dialog', async () => {
  const pinia = createPinia()
  const router = createRouter({
    history: createMemoryHistory(),
    routes: applicationRouter.options.routes,
  })
  await router.push('/')
  wrapper = mount(App, { attachTo: document.body, global: { plugins: [pinia, router] } })
  await flushPromises()
  expect(wrapper.findAll('.stats button')).toHaveLength(5)
  const createButton = wrapper
    .findAll('button')
    .find((button) => button.text().includes('New product'))
  createButton.element.focus()
  await createButton.trigger('click')
  expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  await wrapper.get('[aria-label="Close product form"]').trigger('keydown', { key: 'Escape' })
  expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  expect(document.activeElement).toBe(createButton.element)
  await createButton.trigger('click')
  await wrapper
    .get('.modal input[placeholder="e.g. Botanical hand wash"]')
    .setValue('Demo ceramic cup')
  await wrapper.get('.modal input[placeholder="DEMO-WL-019"]').setValue('DEMO-INTEGRATION')
  await wrapper.get('.modal input[type="number"]').setValue('25')
  await wrapper.findAll('.modal select')[0].setValue('Home')
  await wrapper.findAll('.modal select')[1].setValue('Kitchen')
  await wrapper
    .get('.modal textarea')
    .setValue('A fictional product for the component interaction test.')
  const submit = wrapper
    .findAll('.modal button')
    .find((button) => button.text().includes('Submit for review'))
  await submit.trigger('click')
  await flushPromises()
  await vi.waitFor(() => expect(router.currentRoute.value.path).toBe('/review'))
  expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  expect(useWorkflowStore(pinia).reviewProduct.sku).toBe('DEMO-INTEGRATION')
  expect(wrapper.text()).toContain('Demo ceramic cup')
})
