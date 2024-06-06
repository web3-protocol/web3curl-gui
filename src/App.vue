<template>
  <div id="root">
    <div id="header">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#" @click.prevent>web3:// sandbox</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <!-- <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li> -->
              <li class="nav-item">
                <a class="nav-link" href="https://docs.web3url.io/" target="_blank">Documentation</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://web3url.io" target="_blank">Protocol homepage</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  ERCs
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="https://eips.ethereum.org/EIPS/eip-6860" target="_blank"><span class="badge text-bg-warning">Draft</span> <strong>ERC-6860</strong> Updated web3:// protocol</a></li>
                  <li><a class="dropdown-item" href="https://eips.ethereum.org/EIPS/eip-4804" target="_blank"><span class="badge text-bg-success">Final</span> <strong>ERC-4804</strong> Original web3:// protocol</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="https://eips.ethereum.org/EIPS/eip-6821" target="_blank"><span class="badge text-bg-warning">Draft</span> <strong>ERC-6821</strong> Cross-blockchain domain names</a></li>
                  <li><a class="dropdown-item" href="https://eips.ethereum.org/EIPS/eip-6944" target="_blank"><span class="badge text-bg-warning">Draft</span> <strong>ERC-6944</strong> Resource Request resolve mode</a></li>
                  <li><a class="dropdown-item" href="https://eips.ethereum.org/EIPS/eip-7087" target="_blank"><span class="badge text-bg-warning">Draft</span> <strong>ERC-7087</strong> MIME in auto mode</a></li>
                  <li><a class="dropdown-item" href="https://eips.ethereum.org/EIPS/eip-7617" target="_blank"><span class="badge text-bg-warning">Draft</span> <strong>ERC-7617</strong> Chunks in resource request mode</a></li>
                  <li><a class="dropdown-item" href="https://eips.ethereum.org/EIPS/eip-7618" target="_blank"><span class="badge text-bg-warning">Draft</span> <strong>ERC-7618</strong> Compression in resource request mode</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  web3:// clients
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="https://github.com/web3-protocol/web3curl-js" target="_blank">Web3curl</a></li>
                  <li><a class="dropdown-item" href="https://docs.web3url.io/web3-clients/https-gateway#w3link.io-all-blockchains-public-gateway" target="_blank">w3link.io HTTPS gateway</a></li>
                  <li><a class="dropdown-item" href="https://github.com/nand2/evm-browser" target="_blank">EVM Browser</a></li>
                  <li><a class="dropdown-item" href="https://github.com/ComfyGummy/chrome-web3" target="_blank">Chrome extension</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  web3:// librairies
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="https://github.com/web3-protocol/web3protocol-js" target="_blank">web3protocol-js</a></li>
                  <li><a class="dropdown-item" href="https://github.com/web3-protocol/web3protocol-go" target="_blank">web3protocol-go</a></li>
                </ul>
              </li>
            </ul>
            <!-- <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> -->
          </div>
        </div>
      </nav>


    </div>
    <div id="body">
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
  </div>
</template>

<script setup>
  import UrlLibrary from './components/url-library/UrlLibrary.vue'
  import TabbedUrlSandbox from './components/TabbedUrlSandbox.vue'
  import { loadLibraryFromLocalStorage, saveLibraryToLocalStorage } from './common/url-library.js'
  import { loadTabsFromLocalStorage, saveTabsToLocalStorage } from './common/tabs';
  import { ref, toRaw } from 'vue'

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
    saveLibraryToLocalStorage(toRaw(urlLibrary.value))
  }  

  // On tabs update : update to local storage
  function tabsUpdated() {
    console.log("Tabs updated: Saved to local storage")
    saveTabsToLocalStorage(toRaw(urlTabs.value), activeTab.value)
  }

</script>

<style scoped>
  #root {
    display: flex;
    flex-direction: column;
    gap: 0px;
    height: 100vh;
  }

  #header {
    flex: 0 0 20px;
  }
  #header .navbar-brand small {
    font-size: 12px;
  }

  #body {
    flex: 1 0 0;
    display: flex;
    gap: 20px;
  }

  @media (max-width: 768px) {
    #body {
      flex-direction: column;
      gap: 10px;
    }
  }

  #left-sidebar {
    flex: 0 0 400px;
  }
  @media (max-width: 768px) {
    #left-sidebar {
      flex: 0 0 auto;
    }
  }
  
  #main {
    flex: 1 0 0;
    padding-top: 10px;
    padding-right: 10px;
  }
  @media (max-width: 768px) {
    #main {
      padding-top: 0px;
      padding-left: 10px;
    }
  }
</style>
