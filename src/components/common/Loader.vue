<template>
  <span v-if="loading">
    <div class="spinner-border spinner-border-sm" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </span>
  <span v-else>
    <slot />
  </span>
</template>

<script setup>
  const props = defineProps({
    loading: {
      type: Boolean,
      required: true
    },
  });
</script>