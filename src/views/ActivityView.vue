<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const { events } = useWorkspace()
</script>
<template>
  <section class="panel activity">
    <div class="panel-heading">
      <div>
        <h3>Workflow activity</h3>
        <p>Local session events and illustrative starting history</p>
      </div>
      <span class="queue-badge">{{ events.length }}</span>
    </div>
    <div class="event" v-for="e in events">
      <span class="event-dot"></span>
      <div>
        <b>{{ e.action }}</b>
        <p>{{ e.product }}</p>
        <p v-if="e.note" class="event-note">{{ e.note }}</p>
      </div>
      <small>{{ e.time }} · Demo operator</small>
    </div>
  </section>
</template>
