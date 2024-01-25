<template>
  <div>
    <div id="tabs-area">
      <ul class="nav nav-tabs">
        <li class="nav-item" 
          v-for="(tab, index) in tabs"
          @click="activeTab = index">
          <a :class="{ 'nav-link': true, active: activeTab === index }" href="#">
            {{ tab.libraryItemId ? urlLibrary.items.find(url => url.id == tab.libraryItemId).name : 'New Tab' }}

            <button
              v-if="index == activeTab"
              @click="tabs.splice(index, 1)"
              class="btn btn-danger btn-sm">
              Remove
            </button>
          </a>
        </li>
      </ul>
      <div id="new-tab">
        <button class="btn btn-primary" @click="tabs.push({})">New Tab</button>
      </div>
    </div>

    <div class="tab-content" v-for="(tab, index) in tabs">
      <UrlSandbox 
        v-show="index == activeTab" 
        v-model:url="tab.url" >
        <template #urlButtons>
          <button 
            v-if="tab.libraryItemId != null"
            class="btn btn-secondary"
            @click="saveToLibrary()">
            Save
          </button>
          <button 
            class="btn btn-secondary"
            @click="showSaveAsModal">
            Save as
          </button>
        </template>
      </UrlSandbox>
    </div>
  </div>

  <Modal title="Save to library" ref="saveAsModal">
    <template #body>
      <input type="text" v-model="newLibraryItemName" placeholder="Name" />
      <select v-model="selectedFolder">
        <option :value="null">(Root folder)</option>
        <option :value="'new'">(Root folder): New folder</option>
        <option v-for="folder in foldersForSelectInput" :value="folder.position">
          {{ folder.name }}
        </option>
      </select>
      <input type="text" v-model="newFolderName" placeholder="New folder name" v-if="selectedFolder && selectedFolder.endsWith('new')" />
    </template>
    <template #footer>
      <button class="btn btn-primary" :disabled="!newLibraryItemName" @click="saveAsToLibrary()">Save</button>
    </template>
  </Modal>
</template>

<script setup>
  import UrlSandbox from './url-sandbox/UrlSandbox.vue';
  import Modal from './common/Modal.vue';
  import { ref, computed } from 'vue';

  const urlLibrary = defineModel('urlLibrary', {
    type: Object,
    required: true
  })
  const tabs = defineModel('tabs', {
    type: Array,
    required: true
  })
  const activeTab = defineModel('activeTab', {
    type: Number,
    required: true
  })

  const foldersForSelectInput = computed(() => {
    const extractFolders = (folder, position) => {
      const result = [];
      result.push({
        name: `${"--".repeat(position.split('.').length - 1)} ${folder.name}`,
        position
      });
      // Add a special entry for "Add new folder"
      result.push({
        name: `${"--".repeat(position.split('.').length - 1)} ${folder.name}: Add new folder`,
        position: `${position}.new`
      });
      if (folder.folders && folder.folders.length > 0) {
        folder.folders.forEach((subFolder, index) => {
          result.push(...extractFolders(subFolder, `${position}.${index}`));
        });
      }
      return result;
    };

    return urlLibrary.value.tree.folders.flatMap((folder, index) => extractFolders(folder, `${index}`));
  });
  
  
  // Save as modal
  const saveAsModal = ref(null);
  const newLibraryItemName = ref(null);
  const selectedFolder = ref(null);
  const newFolderName = ref(null)
  function showSaveAsModal() {
    newLibraryItemName.value = '';
    selectedFolder.value = null;
    newFolderName.value = '';
    saveAsModal.value.show();
  }
  function saveAsToLibrary() {
    saveAsModal.value.hide();

    // Determine to which folder we will save the new item
    let folder;
    if(selectedFolder.value == null) {
      // Use root folder
      folder = urlLibrary.value.tree;
    }
    else if(selectedFolder.value.endsWith('new')) {
      // Create a new folder
      let parentFolder
      if(selectedFolder.value == 'new') {
        parentFolder = urlLibrary.value.tree;
      }
      else {
        const parentFolderPosition = selectedFolder.value.slice(0, selectedFolder.value.lastIndexOf('.'));
        parentFolder = parentFolderPosition.split('.').reduce((folder, index) => folder.folders[index], urlLibrary.value.tree);
      }
      parentFolder.folders.push({
        name: newFolderName.value,
        folders: [],
        libraryItemIds: []
      });
      folder = parentFolder.folders[parentFolder.folders.length - 1];
    }
    else {
      // Use an existing folder
      folder = selectedFolder.value.split('.').reduce((folder, index) => folder.folders[index], urlLibrary.value.tree);
    }

    // Compute the id of the new item
    const newItemId = Math.max(...urlLibrary.value.items.map(item => item.id)) + 1;
    // Add new item to library
    urlLibrary.value.items.push({
      id: newItemId,
      name: newLibraryItemName.value,
      url: tabs.value[activeTab.value].url,
    });

    // Add the new item to the folder fetched/created above
    folder.libraryItemIds.push(newItemId)

    // Indicate that the tab is modifying this new item
    tabs.value[activeTab.value].libraryItemId = newItemId;
  }

  // Save to library
  function saveToLibrary() {
    // Update the url of the library item
    urlLibrary.value.items.find(url => url.id == tabs.value[activeTab.value].libraryItemId).url = tabs.value[activeTab.value].url;
  }
</script>

<style scoped>
  #tabs-area { 
    display: flex;
  }
  #tabs-area .nav-tabs {
    flex: 1 0 auto;
  }
  #tabs-area #new-tab {
    flex: 0 0 auto;
  }
</style>
