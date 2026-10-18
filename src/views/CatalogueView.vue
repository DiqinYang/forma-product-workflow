<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const {
  items,
  status,
  search,
  department,
  category,
  ascending,
  page,
  statuses,
  filtered,
  pages,
  pageRows,
  filterCategories,
  money,
  icon,
  statusClass,
  clearFilters,
  openProduct,
  view,
} = useWorkspace()
</script>
<template>
  <div class="stats">
    <button v-for="s in statuses" @click="status = s" :class="{ chosen: status === s }">
      <span>{{ s === 'All' ? 'Total products' : s }}</span
      ><strong>{{ s === 'All' ? items.length : items.filter((p) => p.status === s).length }}</strong
      ><small>{{
        s === 'All'
          ? 'Across the catalogue'
          : s === 'Draft'
            ? 'Ready to work on'
            : s === 'In review'
              ? 'Awaiting a decision'
              : s === 'Changes requested'
                ? 'Feedback to address'
                : 'Ready for publication'
      }}</small>
    </button>
  </div>
  <section class="panel">
    <div class="filters">
      <label>Search products<input v-model="search" placeholder="Search name or SKU…" /></label
      ><label
        >Department<select v-model="department">
          <option>All departments</option>
          <option>Home</option>
          <option>Wellness</option>
          <option>Pantry</option>
        </select></label
      ><label
        >Category<select v-model="category">
          <option>All categories</option>
          <option v-for="c in filterCategories">{{ c }}</option>
        </select></label
      ><button class="link" @click="clearFilters">Clear filters</button
      ><span>{{ filtered.length }} products</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>PRODUCT</th>
            <th>SKU</th>
            <th>DEPARTMENT</th>
            <th><button @click="ascending = !ascending">UNIT PRICE ↕</button></th>
            <th>STATUS</th>
            <th>UPDATED</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pageRows">
            <td>
              <div class="product">
                <span class="product-icon" :class="p.department.toLowerCase()">{{
                  icon(p.department)
                }}</span>
                <div>
                  <b>{{ p.name }}</b
                  ><small>{{ p.category }}</small>
                </div>
              </div>
            </td>
            <td>{{ p.sku }}</td>
            <td>{{ p.department }}</td>
            <td>{{ money(p.price) }}</td>
            <td>
              <span class="pill" :class="statusClass(p.status)">{{ p.status }}</span>
            </td>
            <td>{{ p.updated }}</td>
            <td>
              <button class="row-action" @click="openProduct(p)">
                {{
                  p.status === 'Draft' || p.status === 'Changes requested'
                    ? 'Edit product'
                    : 'View details'
                }}
                →
              </button>
            </td>
          </tr>
          <tr v-if="!filtered.length">
            <td colspan="7" class="empty">
              No products match your filters. Try another search or clear filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>{{ filtered.length }} products · Page {{ page }} of {{ pages }}</span>
      <div>
        <button :disabled="page === 1" @click="page--">← Previous</button
        ><button :disabled="page === pages" @click="page++">Next →</button>
      </div>
    </div>
  </section>
  <div class="callout">
    <b>One workflow, from draft to decision.</b
    ><span>Create a product → Submit for review → Approve or request changes</span
    ><button @click="view = 'review'">Explore approval workflow →</button>
  </div>
</template>
