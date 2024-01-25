<template>
  <div>
    <div class="entry">
      <span>Calldata: </span>
      <span v-if="loading && parsedUrl.contractCallMode == null">
        Loading...
      </span>
      <span v-else-if="parsedUrl.contractCallMode != null">
        {{ parsedUrl.calldata }} (ascii: <code>{{ showBytesAsAscii(parsedUrl.calldata) }}</code>)
      </span>
    </div>
  </div>
</template>

<script setup>
  import { showBytesAsAscii as _showBytesAsAscii } from '../../common/filters.js'
  import { ref, computed } from 'vue';

  const props = defineProps({
    parsedUrl: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  });

  const showBytesAsAscii = _showBytesAsAscii;

</script>
