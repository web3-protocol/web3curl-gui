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
        @update:urlLibrary="libraryUpdated"
        @update:tabs="tabsUpdated"
        @update:activeTab="tabsUpdated" />
    </div>
  </div>
</template>

<script setup>
  import UrlLibrary from './components/url-library/UrlLibrary.vue'
  import TabbedUrlSandbox from './components/TabbedUrlSandbox.vue'
  import { loadLibraryFromLocalStorage, saveLibraryToLocalStorage } from './common/url-library.js'
  import { loadTabsFromLocalStorage, saveTabsToLocalStorage } from './common/tabs';
  import { ref, watch } from 'vue'

  const urlLibrary = ref(loadLibraryFromLocalStorage())
  const {tabs: initialTabs, activeTab: initialActiveTab} = loadTabsFromLocalStorage(urlLibrary.value)
  const urlTabs = ref(initialTabs)
  const activeTab = ref(initialActiveTab)

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

    // Indicate that the tabs were updated
    tabsUpdated();
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

  // On tabs update : update to local storage
  function tabsUpdated() {
    console.log("Tabs updated: Saved to local storage")
    saveTabsToLocalStorage(urlTabs.value, activeTab.value)
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
