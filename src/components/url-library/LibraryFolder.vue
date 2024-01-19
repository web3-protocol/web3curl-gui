<template>
  <div class="url-tree">
    <ul class="list-group">
      <li v-for="(subfolder, subfolderIndex) in folder.folders" class="list-group-item">

        <button 
          @click="toggleChildren(subfolderIndex)" 
          class="btn btn-primary">
          <font-awesome-icon v-if="subfolderExpansion[subfolderIndex] == false || subfolderExpansion[subfolderIndex] == undefined" :icon="['fas', 'chevron-right']" />
          <font-awesome-icon v-if="subfolderExpansion[subfolderIndex] == true" :icon="['fas', 'chevron-down']" />
        </button>

        <span>{{ subfolder.name }}</span>

        <button
          v-if="subfolder.libraryItemIds.length == 0 && subfolder.folders.length == 0"
          class="btn btn-danger"
          @click="deleteLibraryFolder(subfolderIndex)">
          Delete
        </button>

        <LibraryFolder
          v-if="subfolderExpansion[subfolderIndex]" 
          v-model:folder="folder.folders[subfolderIndex]" 
          :libraryItems="libraryItems" 
          @library-item-clicked="$emit('libraryItemClicked', $event)"
          @library-item-renamed="$emit('libraryItemRenamed', $event)"
          @library-item-deleted="$emit('libraryItemDeleted', $event)"
          @update:folder="$emit('update:folder', folder)" />
      </li>

      <li v-for="libraryItemId in folder.libraryItemIds" class="list-group-item">
        <LibraryItem 
          v-model:libraryItem="libraryItems[libraryItems.findIndex(libraryItem => libraryItem.id == libraryItemId)]"
          @clicked="$emit('libraryItemClicked', libraryItems[libraryItems.findIndex(libraryItem => libraryItem.id == libraryItemId)].id)"
          @renamed="libraryItemRenamed(libraryItemId)"
          @deleted="deleteLibraryItem(libraryItemId)" />
      </li>
    </ul>
  </div>
</template>


<script setup>
  import LibraryItem from './LibraryItem.vue'
  import { ref } from 'vue'  

  // The folder we are showing
  const folder = defineModel('folder', {
    type: Object,
    required: true
  })

  // The global library item list
  const props = defineProps({
    libraryItems: {
      type: Array,
      required: true
    }
  });

  const emit = defineEmits(['libraryItemClicked', 'libraryItemRenamed', 'libraryItemDeleted'])

  const subfolderExpansion = ref({});

  function toggleChildren(subfolderIndex) {
    subfolderExpansion.value[subfolderIndex] = !subfolderExpansion.value[subfolderIndex];
  }

  // When a library item is renamed
  function libraryItemRenamed(libraryItemId) {
    emit('libraryItemRenamed', libraryItemId);
    emit('update:folder', folder.value);
  }

  // Remove a library item from the folder
  function deleteLibraryItem(libraryItemId) {
    const index = folder.value.libraryItemIds.findIndex(id => id == libraryItemId);
    if(index != -1) {
      folder.value.libraryItemIds.splice(index, 1);
    }
    emit('libraryItemDeleted', libraryItemId);
    emit('update:folder', folder.value);
  }

  // Remove a subfolder from the folder
  function deleteLibraryFolder(subfolderIndex) {
    folder.value.folders.splice(subfolderIndex, 1);
    emit('update:folder', folder.value);
  }
</script>


<style scoped>
  .url-tree {
    margin-bottom: 20px;
  }
</style>
