<template>
  <div>
    <div id="name-resolution-header">
      <button 
        @click="isExpanded = !isExpanded" 
        class="btn btn-primary">
        <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
      </button>

      <span>Resolve mode: </span>
      <span v-if="loading && parsedUrl.mode == null">
        Loading...
      </span>
      <span v-else-if="parsedUrl.mode != null">
        {{ parsedUrl.mode }}
      </span>
    </div>

    <div id="name-resolution-body" v-show="isExpanded">
      <div class="entry">
        <span>Resolve mode determination calldata: </span>
        <span v-if="loading && parsedUrl.mode == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.mode != null">
          {{ parsedUrl.modeDeterminationCalldata }}
        </span>
      </div>

      <div class="entry">
        <span>Resolve mode determination return: </span>
        <span v-if="loading && parsedUrl.mode == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.mode != null">
          {{ parsedUrl.modeDeterminationReturn }} (ascii: <code>{{ showBytesAsAscii(parsedUrl.modeDeterminationReturn) }}</code>)
        </span>
      </div>

      <div class="entry">
        <span>Result: </span>
        <span v-if="loading && parsedUrl.mode == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.mode != null">
          {{ parsedUrl.mode }}
        </span>
      </div>

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

  const isExpanded = ref(false);

  const showBytesAsAscii = _showBytesAsAscii;
</script>
