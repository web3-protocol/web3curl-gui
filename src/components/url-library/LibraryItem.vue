<template>
  <div>
    <div @click="$emit('clicked')">
      {{ libraryItem.name }}
      {{ libraryItem.url }}
    </div>

    <button 
      class="btn btn-secondary"
      @click="showRenameModal">
      Rename
    </button>

    <button 
      class="btn btn-secondary"
      @click="showDeleteModal">
      Delete
    </button>

    <Modal title="Rename library item" ref="renameModal">
      <template #body>
        <input type="text" v-model="editedName" />
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="saveRenamingChanges()">Save</button>
      </template>
    </Modal>

    <Modal title="Delete library item" ref="deleteModal">
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <button class="btn btn-danger" @click="deleteLibraryItem()">Delete</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
  import Modal from '../common/Modal.vue'
  import { ref } from 'vue'

  const libraryItem = defineModel('libraryItem',{
    type: Object,
    required: true
  })

  const emit = defineEmits(['clicked', 'renamed', 'deleted'])

  // Renaming modal
  const renameModal = ref(null);
  const editedName = ref(null);
  // Show popup
  function showRenameModal(){
    editedName.value = libraryItem.value.name
    renameModal.value.show();
  }
  // Save changes
  function saveRenamingChanges(){
    const isChanged = (libraryItem.value.name != editedName.value);
    if(isChanged) {
      libraryItem.value.name = editedName.value;
      emit('renamed', libraryItem.value.id);
    }
    renameModal.value.hide();
  }

  // Delete modal
  const deleteModal = ref(null);
  // Show popup
  function showDeleteModal(){
    deleteModal.value.show();
  }
  // Delete
  function deleteLibraryItem() {
    deleteModal.value.hide();
    emit('deleted', libraryItem.value.id);
  }

</script>

<style scoped>
/* Add your component styles here */
</style>
