function loadTabsFromLocalStorage(urlLibrary) {
  let tabs = [];
  let activeTab = 0;

  const storedTabs = localStorage.getItem('tabs');
  if (storedTabs) {
    const parsedStoredTabs = JSON.parse(storedTabs)
    tabs = parsedStoredTabs.tabs;
    activeTab = parsedStoredTabs.activeTab;
  } else {
    tabs = getDefaultTabs();
  }

  tabs.forEach(tab => {
    // If there is a libraryItemId, but the library item is not found: remove libraryItemId
    if(tab.libraryItemId && !urlLibrary.items.find(item => item.id == tab.libraryItemId)) {
      tab.libraryItemId = null;
    }

    // For each tab linked to a libraryItemId, if no URL yet: inject its URL
    // (tab.url is the local copy of the URL, that can be edited and not saved yet)
    if(tab.libraryItemId && tab.url == null) {
      const libraryItem = urlLibrary.items.find(item => item.id == tab.libraryItemId);
      if(libraryItem) {
        tab.url = libraryItem.url;
      }
    }
  })

  return {tabs, activeTab};
}

function saveTabsToLocalStorage(tabs, activeTab) {
  localStorage.setItem('tabs', JSON.stringify({version: 1, tabs: tabs, activeTab: activeTab}));
}

function getDefaultTabs() {
  const result = [
    {
      libraryItemId: 100001
    },
    {
      libraryItemId: 100002
    },
    {
      libraryItemId: 100003
    },
  ]

  return result;
}


export { loadTabsFromLocalStorage, saveTabsToLocalStorage, getDefaultTabs }