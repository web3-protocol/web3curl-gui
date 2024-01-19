<template>
  <div>
    <input type="text" v-model="url" />
    <slot name="urlButtons" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const url = defineModel('url', {
  type: String,
  required: true
});

const updateUrl = (event) => {
  url.value = event.target.value;
};
</script>
