<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const { reviewId, feedback, reviewError, pending, reviewProduct, money, icon, decide, view } =
  useWorkspace()
</script>
<template>
  <div class="review-layout">
    <section class="panel queue">
      <div class="panel-heading">
        <div>
          <h3>Review queue</h3>
          <p>{{ pending.length }} products awaiting review</p>
        </div>
        <span class="queue-badge">{{ pending.length }}</span>
      </div>
      <button
        v-for="p in pending"
        class="queue-item"
        :class="{ selected: reviewId === p.id }"
        @click="reviewId = p.id"
      >
        <span class="product-icon" :class="p.department.toLowerCase()">{{
          icon(p.department)
        }}</span>
        <div>
          <b>{{ p.name }}</b
          ><small>{{ p.sku }} · {{ p.department }}</small>
        </div>
        <span>→</span>
      </button>
      <p v-if="!pending.length" class="empty">
        All caught up. Submit a draft from the catalogue to continue.
      </p>
      <div class="queue-note">
        Demo mode combines operator and reviewer roles. No real approval is sent.
      </div>
    </section>
    <section v-if="reviewProduct" class="panel review-card">
      <div class="panel-heading">
        <div>
          <div class="eyebrow">PRODUCT SUBMISSION</div>
          <h2>{{ reviewProduct.name }}</h2>
          <p>{{ reviewProduct.sku }} · Submitted by Demo operator</p>
        </div>
        <span class="pill review">In review</span>
      </div>
      <div class="steps">
        <span class="done">✓ Draft created</span><i></i><span class="current">2 Review details</span
        ><i></i><span>3 Decision</span>
      </div>
      <div class="review-body">
        <div class="summary">
          <div class="preview-art" :class="reviewProduct.department.toLowerCase()">
            <div class="pack">
              <span>FORMA</span><b>{{ reviewProduct.name }}</b
              ><small>FICTIONAL PRODUCT</small>
            </div>
          </div>
          <div class="summary-fields">
            <div>
              <small>DEPARTMENT / CATEGORY</small
              ><b>{{ reviewProduct.department }} / {{ reviewProduct.category }}</b>
            </div>
            <div>
              <small>UNIT PRICE</small><b>{{ money(reviewProduct.price) }} USD</b>
            </div>
            <div>
              <small>DESCRIPTION</small>
              <p>{{ reviewProduct.description }}</p>
            </div>
          </div>
        </div>
        <div class="checklist">
          <h3>Submission checklist</h3>
          <div
            v-for="c in [
              'Required product information is complete',
              'Category matches the selected department',
              'Price is a valid positive amount',
            ]"
          >
            <span>✓</span>{{ c }}
          </div>
        </div>
        <label class="feedback"
          >Review feedback <span>Required when requesting changes</span
          ><textarea v-model="feedback" placeholder="Add clear, actionable feedback…"></textarea>
        </label>
        <p v-if="reviewError" class="error" role="alert">{{ reviewError }}</p>
        <div class="review-actions">
          <small>Local simulation only · session data resets on reload</small
          ><button class="secondary" @click="decide('Changes requested')">Request changes</button
          ><button class="primary" @click="decide('Approved')">✓ Approve product</button>
        </div>
      </div>
    </section>
    <section v-else class="panel empty-review">
      <span>✓</span>
      <h2>Review queue cleared</h2>
      <p>Create or submit a draft to explore the approval flow.</p>
      <button class="primary" @click="view = 'catalogue'">Return to catalogue</button>
    </section>
  </div>
</template>
