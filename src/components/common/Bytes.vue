<template>
  <span>
    {{ formatBytes(data, maxSize) }}
  </span>
</template>

<script setup>
  import { ref } from 'vue';
  import { formatBytes as _formatBytes, showBytesAsUTF8 as _showBytesAsUTF8 } from '../../common/filters.js'

  const props = defineProps({
    data: {
      type: String
    },
    // Show truncated form if bigger
    maxSize: {
      type: Number,
      default: 0
    }
  });

  const isExpanded = ref(false);
  const showBytesAsUTF8 = _showBytesAsUTF8;
  const formatBytes = _formatBytes;
</script>

<style scoped>
  span {
    font-family: var(--bs-font-monospace);
    word-break: break-all;
  }
</style>
