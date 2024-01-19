<template>
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
      v-model:urlLibrary="urlLibrary" />
  </div>
</template>

<script setup>
  import UrlLibrary from './components/url-library/UrlLibrary.vue'
  import TabbedUrlSandbox from './components/TabbedUrlSandbox.vue'
  import { ref } from 'vue'

  const urlLibrary = ref({
    // The list of URLs of the library
    items: [{
        id: 1,
        name: 'AA',
        url: 'web3://xoxo'
      }, 
      {
        id: 2,
        name: 'YY',
        url: 'web3://yoyo'
      },
      {
        id: 3,
        name: 'CC',
        url: 'web3://yoyo1'
      },
      {
        id: 4,
        name: 'DD',
        url: 'web3://yoyo2'
      },
      {
        id: 5,
        name: 'FF',
        url: 'web3://yoyox'
      },
      {
        id: 6,
        name: 'GG',
        url: 'web3://yeex'
      },
      {
        id: 7,
        name: 'AAGG',
        url: 'web3://aayeex'
      },
    ],
    // The tree organization of the library
    tree: {
      folders: [{
        name: "Folder 1",
        folders: [{
          name: "Folder 1.1",
          folders: [],
          libraryItemIds: [5]
        }],
        libraryItemIds: [3, 4]
      }, {
        name: "Folder 2",
        folders: [],
        libraryItemIds: [6, 7]
      }],
      libraryItemIds: [1, 2]
    }
  })

  const tabsFromLocalStorage = [
    {
      libraryItemId: 1
    },
    {
      libraryItemId: null,
      url: 'web3://xaaaa'
    },
    {
      libraryItemId: 4
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
        libraryItemId: libraryItemId
      })
    }
    // Library item present: we switch tab
    else {
      activeTab.value = tabIndex;
    }
  }

  function libraryItemRenamed(libraryItemId) {
    console.log("Library item renamed", libraryItemId)
  }

  function libraryItemDeleted(libraryItemId) {
    console.log("Library item deleted", libraryItemId)

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
    console.log("Library updated")
  }  

</script>

<style scoped>
  #left-sidebar {
    flex: 0 1 400px;
  }
  
  #main {
    flex: 1 0 auto;
  }
</style>
