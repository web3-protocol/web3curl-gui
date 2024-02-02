<template>
  <div>
    <ul>
      <li v-for="entry in signature" :key="entry.id">
        {{ entry.type }}
        <MethodReturnSignature v-if="entry.components" :signature="entry.components" />
      </li>
    </ul>
  </div>
</template>

<script setup>
  const props = defineProps({
    signature: {
      type: Array,
      required: true
    }
  });
</script>