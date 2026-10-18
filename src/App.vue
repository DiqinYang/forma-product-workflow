<script setup>
import { useWorkspace } from './composables/useWorkspace'
import { RouterView } from 'vue-router'
import ProductFormDialog from './components/ProductFormDialog.vue'
const { formOpen, notice, pending, resetDemo, newProduct, view } = useWorkspace()
</script>
<template>
  <aside :inert="formOpen">
    <div class="logo"><b>f</b> forma<span>PRODUCT OPERATIONS</span></div>
    <div class="nav-label">WORKSPACE</div>
    <nav>
      <button @click="view = 'catalogue'" :class="{ active: view === 'catalogue' }">
        ▦ &nbsp; Product catalogue</button
      ><button @click="view = 'review'" :class="{ active: view === 'review' }">
        ◈ &nbsp; Approval workspace <small>{{ pending.length }}</small></button
      ><button @click="view = 'activity'" :class="{ active: view === 'activity' }">
        ◷ &nbsp; Activity log
      </button>
    </nav>
    <div class="side-note">
      <span class="dot"></span> Local portfolio demo
      <p>No live systems connected</p>
      <div class="profile">
        <b>DO</b>
        <div>Demo operator<small>Sample workspace</small></div>
      </div>
    </div>
  </aside>
  <main :inert="formOpen">
    <header>
      <span
        >Workspace <i>/</i>
        {{
          view === 'catalogue'
            ? 'Product catalogue'
            : view === 'review'
              ? 'Approval workspace'
              : 'Activity log'
        }}</span
      ><span class="demo-badge">REBUILT DEMO · SYNTHETIC DATA</span>
    </header>
    <div class="content">
      <div class="heading">
        <div>
          <div class="eyebrow">CATALOGUE & WORKFLOW / PORTFOLIO EDITION</div>
          <h1>
            {{
              view === 'catalogue'
                ? 'Product catalogue'
                : view === 'review'
                  ? 'Approval workspace'
                  : 'Activity log'
            }}
          </h1>
          <p>
            {{
              view === 'catalogue'
                ? 'From a new product idea to a review-ready listing.'
                : view === 'review'
                  ? 'Review product details, leave feedback and move work forward.'
                  : 'A transparent history of changes made in this demo session.'
            }}
          </p>
        </div>
        <div class="actions">
          <button class="secondary" @click="resetDemo">↻ Reset demo</button
          ><button class="primary" @click="newProduct">＋ New product</button>
        </div>
      </div>
      <RouterView />

      <footer>
        <span class="dot"></span> Independently rebuilt demo. All products, names and records are
        fictional.<span>Vue 3 · Forms · Workflow interactions</span>
      </footer>
    </div>
  </main>
  <ProductFormDialog v-if="formOpen" />
  <div class="toast" v-if="notice" role="status">{{ notice }}</div>
</template>
