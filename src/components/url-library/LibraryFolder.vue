<template>
  <div class="url-tree">
    <ul class="list-group">
      <li v-for="(subfolder, subfolderIndex) in folder.folders" class="list-group-item subfolder">

        <div class="subfolder-title-area">
          <button 
            @click="toggleChildren(subfolderIndex)" 
            class="btn btn-secondary">
            <font-awesome-icon v-if="subfolderExpansion[subfolderIndex] == false || subfolderExpansion[subfolderIndex] == undefined" :icon="['fas', 'chevron-right']" />
            <font-awesome-icon v-if="subfolderExpansion[subfolderIndex] == true" :icon="['fas', 'chevron-down']" />
          </button>

          <span class="subfolder-title">{{ subfolder.name }}</span>

          <button
            v-if="subfolder.libraryItemIds.length == 0 && subfolder.folders.length == 0"
            class="btn btn-outline-danger delete-button"
            @click="deleteLibraryFolder(subfolderIndex)">
            Delete
          </button>
        </div>

        <div class="subfolder-contents" v-show="subfolderExpansion[subfolderIndex]">
          <LibraryFolder
            v-model:folder="folder.folders[subfolderIndex]" 
            :libraryItems="libraryItems" 
            @library-item-clicked="$emit('libraryItemClicked', $event)"
            @library-item-renamed="$emit('libraryItemRenamed', $event)"
            @library-item-deleted="$emit('libraryItemDeleted', $event)"
            @update:folder="$emit('update:folder', folder)" />
        </div>
      </li>

      <li v-for="libraryItemId in folder.libraryItemIds" class="list-group-item item">
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

  .subfolder {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .subfolder-title-area {
    display: flex;
    align-items: center;
  }

  .subfolder-title {
    flex-grow: 1;
    margin-left: 10px;
    font-weight: bold;
  }

  .subfolder-title-area .delete-button {
    display: none;
  }

  .subfolder-title-area:hover .delete-button {
    display: inline;
  }


  .subfolder-contents {
    margin-top: 10px;
  }
</style>
