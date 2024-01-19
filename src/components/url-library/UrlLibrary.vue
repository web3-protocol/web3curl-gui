<template>
  <div id="url-library">
    <LibraryFolder 
      v-model:folder="urlLibrary.tree" 
      :libraryItems="urlLibrary.items" 
      @update:folder="folderUpdated"
      @library-item-clicked="$emit('libraryItemClicked', $event)"
      @library-item-renamed="$emit('libraryItemRenamed', $event)"
      @library-item-deleted="$emit('libraryItemDeleted', $event)" />
  </div>
</template>
  
  
<script setup>
  import LibraryFolder from './LibraryFolder.vue'

  const urlLibrary = defineModel('urlLibrary', {
    type: Object,
    required: true
  })

  const emit = defineEmits(['libraryItemClicked', 'libraryItemRenamed', 'libraryItemDeleted'])

  function folderUpdated() {
    emit('update:urlLibrary', urlLibrary.value);
  }
</script>