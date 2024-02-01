<template>
  <div>
    <div class="entry">
      <span>Calldata: </span>
      <Loader :loading="loading && parsedUrl.contractCallMode == null">
        <span v-if="parsedUrl.contractCallMode != null">
          {{ parsedUrl.calldata }} (ascii: <code>{{ showBytesAsAscii(parsedUrl.calldata) }}</code>)
        </span>
      </Loader>
    </div>
  </div>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
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
