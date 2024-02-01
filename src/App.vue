<template>
  <div id="root">
    <div id="left-sidebar">
      <UrlLibrary 
        v-model:urlLibrary="urlLibrary"
        @library-item-clicked="libraryItemClicked"
        @library-item-renamed="libraryItemRenamed"
        @library-item-deleted="libraryItemDeleted"
        @update:urlLibrary="libraryUpdated" />
    </div>

    <div id="main">
      <TabbedUrlSandbox 
        v-model:tabs="urlTabs" 
        v-model:activeTab="activeTab"
        v-model:urlLibrary="urlLibrary"
        @update:urlLibrary="libraryUpdated" />
    </div>
  </div>
</template>

<script setup>
  import UrlLibrary from './components/url-library/UrlLibrary.vue'
  import TabbedUrlSandbox from './components/TabbedUrlSandbox.vue'
  import { loadLibraryFromLocalStorage, saveLibraryToLocalStorage } from './common/url-library.js'
  import { ref } from 'vue'

  const urlLibrary = ref(loadLibraryFromLocalStorage())

  const tabsFromLocalStorage = [
    {
      libraryItemId: 1
    },
    {
      libraryItemId: null,
      url: 'web3://xaaaa'
    },
    {
      libraryItemId: 2
    },
  ]
  // For each tab linked to a libraryItemId, inject its URL
  tabsFromLocalStorage.forEach(tab => {
    if(tab.libraryItemId) {
      const libraryItem = urlLibrary.value.items.find(item => item.id == tab.libraryItemId);
      if(libraryItem) {
        tab.url = libraryItem.url;
      }
      // Library item not found: remove libraryItemId
      else {
        tab.libraryItemId = null;
      }
    }
  })
  const urlTabs = ref(tabsFromLocalStorage)
  const activeTab = ref(0)

  function libraryItemClicked(libraryItemId) {
    console.log("Library item clicked", libraryItemId)
    const tabIndex = urlTabs.value.findIndex(tab => tab.libraryItemId == libraryItemId);
    // Library item not yet present: We add tab
    if(tabIndex == -1) {
      urlTabs.value.push({
        libraryItemId: libraryItemId,
        url: urlLibrary.value.items.find(item => item.id == libraryItemId).url
      })
      // And we switch the tab
      activeTab.value = urlTabs.value.length - 1;
    }
    // Library item present: we switch tab
    else {
      activeTab.value = tabIndex;
    }
  }

  function libraryItemRenamed(libraryItemId) {
  }

  function libraryItemDeleted(libraryItemId) {
    // In tabs, delete the tab with the library item
    const tabIndex = urlTabs.value.findIndex(tab => tab.libraryItemId == libraryItemId);
    if(tabIndex != -1) {
      urlTabs.value.splice(tabIndex, 1);
      if(activeTab.value >= urlTabs.value.length) {
        activeTab.value = urlTabs.value.length - 1;
      }
    }
  }

  // On library update : update to local storage
  function libraryUpdated() {
    console.log("Library updated: Saved to local storage")
    saveLibraryToLocalStorage(urlLibrary.value)
  }  

</script>

<style scoped>
  #root {
    display: flex;
    gap: 20px;
    height: 100vh;
  }

  #left-sidebar {
    flex: 0 0 400px;
  }
  
  #main {
    flex: 1 0 0;
  }
</style>
