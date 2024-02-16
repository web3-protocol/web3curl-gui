<template>
  <div>
    <div class="entry">
      <span class="title">Calldata: </span>
      <Loader :loading="loading && parsedUrl.contractCallMode == null">
        <span v-if="parsedUrl.contractCallMode != null">
          <Bytes :data="parsedUrl.calldata" /> (UTF-8: <code>{{ showBytesAsUTF8(parsedUrl.calldata) }}</code>)
        </span>
      </Loader>
    </div>
  </div>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
  import Bytes from '../common/Bytes.vue';
  import { showBytesAsUTF8 as _showBytesAsUTF8 } from '../../common/filters.js'

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

  const showBytesAsUTF8 = _showBytesAsUTF8;

</script>

<style scoped>
  .entry {
    margin-bottom: 5px;
    line-height: 1.3em;
  }
  .entry:last-child {
    margin-bottom: 0;
  }
  

  .entry .title {
    font-weight: bold;
  }
  
</style>
