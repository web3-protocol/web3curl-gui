<template>
  <div>
    <div class="element-header">
      <button 
        @click="isExpanded = !isExpanded" 
        class="btn btn-secondary">
        <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
      </button>

      <span class="header-name">
        <slot name="header-name" />
      </span>
      <slot name="header-value" />
    </div>

    <div class="element-body" v-show="isExpanded">
      <slot name="body" />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const isExpanded = ref(false);
</script>

<style scoped>
  .header-name {
    font-weight: bold;
    padding-left: 8px;
  }

  .element-body {
    padding-left: 54px;
    padding-top: 10px;
    padding-bottom: 15px;
  }
</style>