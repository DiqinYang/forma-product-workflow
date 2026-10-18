<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import { ref } from 'vue'
import { useDialog } from '../composables/useDialog'
const dialog = ref(null)
useDialog(dialog, () => closeForm())
const {
  editingId,
  isReadOnly,
  formError,
  form,
  formCategories,
  statusClass,
  closeForm,
  saveProduct,
  submitForm,
} = useWorkspace()
</script>
<template>
  <div class="modal-backdrop" @click.self="closeForm">
    <section
      ref="dialog"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div class="modal-top">
        <div>
          <div class="eyebrow">PRODUCT INFORMATION</div>
          <h2 id="form-title">
            {{
              isReadOnly ? 'Product details' : editingId ? 'Edit product' : 'Create a new product'
            }}
          </h2>
          <p>
            {{
              isReadOnly
                ? 'Review the saved product information.'
                : 'Complete the details below to prepare a review-ready listing.'
            }}
          </p>
        </div>
        <button class="close" aria-label="Close product form" @click="closeForm">×</button>
      </div>
      <div class="steps">
        <span class="current">1 Product details</span><i></i><span>2 Submit for review</span><i></i
        ><span>3 Approval</span>
      </div>
      <form @submit.prevent="saveProduct('Draft')">
        <fieldset :disabled="isReadOnly">
          <div class="form-grid">
            <label class="full"
              >Product name <em>*</em
              ><input
                v-model="form.name"
                required
                maxlength="80"
                placeholder="e.g. Botanical hand wash"
              /><small>Use a clear, customer-facing product name.</small></label
            ><label
              >Product SKU <em>*</em
              ><input
                v-model="form.sku"
                required
                pattern="[A-Za-z0-9-]{3,30}"
                placeholder="DEMO-WL-019" /></label
            ><label
              >Unit price (USD) <em>*</em
              ><input
                v-model="form.price"
                type="number"
                min="0.01"
                max="99999"
                step="0.01"
                required
                placeholder="0.00" /></label
            ><label
              >Department <em>*</em
              ><select v-model="form.department" required>
                <option value="" disabled>Select department</option>
                <option>Home</option>
                <option>Wellness</option>
                <option>Pantry</option>
              </select></label
            ><label
              >Category <em>*</em
              ><select v-model="form.category" required :disabled="!form.department || isReadOnly">
                <option value="" disabled>Select category</option>
                <option v-for="c in formCategories">{{ c }}</option>
              </select></label
            ><label class="full"
              >Product description <em>*</em
              ><textarea
                v-model="form.description"
                required
                minlength="15"
                maxlength="400"
                placeholder="Describe the product, materials and intended use…"
              ></textarea
              ><small>{{ form.description.length }} / 400 characters</small></label
            >
          </div>
        </fieldset>
        <div class="privacy-note">
          ◇ Use fictional product details only. This demo does not connect to a live catalogue.
        </div>
        <p v-if="formError" class="error" role="alert">{{ formError }}</p>
        <div class="modal-bottom">
          <button type="button" class="link" @click="closeForm">Cancel</button
          ><template v-if="!isReadOnly"
            ><button class="secondary" type="submit">Save draft</button
            ><button class="primary" type="button" @click="submitForm">
              Submit for review →
            </button></template
          ><span v-else class="pill" :class="statusClass(form.status)">{{ form.status }}</span>
        </div>
      </form>
    </section>
  </div>
</template>
