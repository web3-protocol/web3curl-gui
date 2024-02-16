<template>
  <div>
    <div class="element-header">
      <button 
        @click="isExpanded = !isExpanded" 
        class="btn btn-secondary">
        <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
      </button>

      <div class="element-header-text" @click="isExpanded = !isExpanded">
        <span class="header-name">
          <slot name="header-name" />
        </span>
        <span class="header-value">
          <slot name="header-value" />
        </span>
      </div>
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
  .element-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .element-header button {
  }

  .element-header-text {
    /* flex: 0 1 auto; */
    cursor: pointer;
    line-height: 1.3em;
  }

  .header-name {
    font-weight: bold;
  }

  .element-body {
    padding-left: 54px;
    padding-top: 10px;
    padding-bottom: 15px;
  }
</style>