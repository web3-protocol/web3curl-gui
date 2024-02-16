<template>
  <span>
    <button
      v-if="expandable && formattingNeedReducing()" 
      @click="isExpanded = !isExpanded" 
      class="btn btn-sm btn-outline-secondary">
      <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
      <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
    </button>
    {{ formatBytes() }}
  </span>
</template>

<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    data: {
      type: String
    },
    // Show truncated form if bigger
    maxSize: {
      type: Number,
      default: 0
    },
    // Show the expander
    expandable: {
      type: Boolean,
      default: true
    }
  });

  const isExpanded = ref(false);
  
  function formatBytes() {
    let hexBytes = props.data;
    if(hexBytes == null || hexBytes == "") {
        hexBytes = "0x"
    }

    if(formattingNeedReducing() && isExpanded.value == false) {
      hexBytes = hexBytes.substring(0, Math.round(props.maxSize / 2) + 2) + "..." + hexBytes.substring(hexBytes.length - Math.round(props.maxSize / 2))
    }

    return hexBytes;
  }

  function formattingNeedReducing() {
    return props.maxSize > 0 && props.data.length > props.maxSize + 2;
  }
</script>

<style scoped>
  span {
    font-family: var(--bs-font-monospace);
    word-break: break-all;
  }

  button {
    margin-left: 5px;
  }
</style>
