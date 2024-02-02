<template>
  <div class="library-item">
    <div @click.stop="$emit('clicked')">
      <div class="name">
        <div class="btn-group" role="group" @click.stop>
          <button type="button" class="btn btn-outline-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" @click.prevent="showRenameModal">Rename</a></li>
            <li><a class="dropdown-item" href="#" @click.prevent="showDeleteModal">Delete</a></li>
          </ul>
        </div>

        {{ libraryItem.name }}
      </div>
      <div class="url">
        {{ libraryItem.url }}
      </div>
    </div>


    <Modal title="Rename library item" ref="renameModal" @click.stop>
      <template #body>
        <input type="text" v-model="editedName" style="width: 100%;" />
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="saveRenamingChanges()">Save</button>
      </template>
    </Modal>

    <Modal title="Delete library item" ref="deleteModal" @click.stop>
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
  .library-item {
    cursor: pointer;
    position: relative;
  }

  .library-item .name {
    font-weight: bold;
    margin-bottom: 2px;
  }

  .library-item .url {
    font-size: 12px;
    word-break: break-all;
  }

  .library-item .name .btn-group {
    display: none;
    position: absolute;
    right: 0;
    z-index: 1;
    background-color: var(--bs-body-bg);
  }

  .library-item:hover .name .btn-group{
    display: block;
  }
</style>
