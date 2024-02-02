<template>
  <div id="tabbed-url-sandbox">
    <div id="tabs-area">
      <ul class="nav nav-tabs">
        <li class="nav-item" 
          v-for="(tab, index) in tabs"
          @click="activeTab = index">
          <a :class="{ 'nav-link': true, active: activeTab === index }" href="#">
            <span v-if="tab.libraryItemId">
              {{ urlLibrary.items.find(url => url.id == tab.libraryItemId).name }}
              <span v-if="urlLibrary.items.find(url => url.id == tab.libraryItemId).url != tab.url">
                *
              </span>
            </span>
            <span v-else>New Tab</span>

            <button
              v-if="index == activeTab"
              @click="closeTab(index)"
              class="btn btn-outline-secondary btn-sm btn-close-tab">
              <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
          </a>
        </li>
      </ul>
      <div id="new-tab">
        <button class="btn btn-outline-secondary" @click="addNewTab()">+</button>
      </div>
    </div>

    <div class="tab-content" v-for="(tab, index) in tabs">
      <UrlSandbox 
        v-show="index == activeTab" 
        v-model:url="tab.url"
        @update:url="emit('update:tabs', tabs)">
        <template #urlButtons>
          
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul class="dropdown-menu">
              <li>
                <a v-if="tab.libraryItemId != null" 
                   :class="{ 'dropdown-item': true, disabled: urlLibrary.items.find(url => url.id == tab.libraryItemId).url == tab.url }" 
                   @click.prevent="saveToLibrary()" 
                   href="#">
                  Save
                </a>
              </li>
              <li><a class="dropdown-item" @click.prevent="showSaveAsModal" href="#">Save as</a></li>
            </ul>
          </div>
        </template>
      </UrlSandbox>
    </div>
  </div>

  <Modal title="Save to library" ref="saveAsModal">
    <template #body>
      <div class="mb-3">
        <input type="text" v-model="newLibraryItemName" placeholder="Title" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Folder</label>
        <select v-model="selectedFolder" class="form-control">
          <option :value="null">(Root folder)</option>
          <option :value="'new'">(Root folder): Add new folder</option>
          <option v-for="folder in foldersForSelectInput" :value="folder.position">
            {{ folder.name }}
          </option>
        </select>
      </div>
      <div class="mb-3" v-if="selectedFolder && selectedFolder.endsWith('new')">
        <input type="text" v-model="newFolderName" placeholder="New folder name" class="form-control" />
      </div>
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

  const emit = defineEmits(['update:urlLibrary', 'update:tabs'])

  function addNewTab() {
    tabs.value.push({url:''});
    emit('update:tabs', tabs)
  }
  
  function closeTab(index) {
    tabs.value.splice(index, 1); 
    emit('update:tabs', tabs)

    // Does not work, need to investigate later
    if(index > tabs.value.length - 1) {
      activeTab.value = tabs.value.length - 1
    }
  }
  

  //
  // Save as modal
  //

  // Folder list for folder selection input
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

  // Modal
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

    // Manually emit the update
    emit('update:urlLibrary', urlLibrary.value);
  }


  // Save to library
  function saveToLibrary() {
    // Update the url of the library item
    urlLibrary.value.items.find(url => url.id == tabs.value[activeTab.value].libraryItemId).url = tabs.value[activeTab.value].url;
    // Manually emit the update
    emit('update:urlLibrary', urlLibrary.value);
  }
</script>

<style scoped>
  #tabbed-url-sandbox {
    padding-top: 10px;
    padding-right: 10px;
  }

  .btn-close-tab {
    margin-left: 5px;
  }

  #tabs-area { 
    display: flex;
    align-items: center;    
    gap: 10px;
  }
  #tabs-area .nav-tabs {
    flex: 1 0 0;
  }
  #tabs-area #new-tab {
    flex: 0 0 auto;
  }
</style>
