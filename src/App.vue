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
        name: "Vitalik's blog on Arbitrum Nova",
        url: "web3://vitalikblog.eth"
      }, 
      {
        id: 2,
        name: "Display a Terraform (on-chain NFT)",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/tokenHTML/9352"
      },
      {
        id: 3,
        name: "USDC balance of nemorino.eth",
        url: "web3://usdc.eth/balanceOf/nemorino.eth?returns=(uint256)"
      },
      {
        id: 4,
        name: "Fetch a complex data structure",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/structureData/1699519297?returns=((uint,uint,int,int,int)[20])"
      },
      {
        id: 5,
        name: "ResourceRequest resolve mode website",
        url: "web3://0x2b51A751d3c7d3554E28DC72C3b032E5f56Aa656/view/1234?x=1&b=2",
      },
      {
        id: 6,
        name: "Call a contract method on goerli",
        url: "web3://0x76010876050387FA66E28a1883aD73d576D88Bf2:5/levelAndTile/2/50?returns=(uint256,uint256)"
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
