function loadLibraryFromLocalStorage() {
  const library = localStorage.getItem('library');
  if (library) {
    return JSON.parse(library).library;
  } else {
    return getDefaultLibrary();
  }
}

function saveLibraryToLocalStorage(library) {
  localStorage.setItem('library', JSON.stringify({version: 1, library: library}));
}

function getDefaultLibrary() {
  const result = {
    // The list of URLs of the library
    items: [
      // Main examples
      {
        id: 1,
        name: "Vitalik's blog on Arbitrum Nova",
        url: "web3://vitalikblog.eth"
      }, 
      {
        id: 2,
        name: "Display a Terraform (on-chain NFT)",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/tokenSVG/9352?mime.type=svg"
      },
      {
        id: 3,
        name: "Fetch the USDC balance of nemorino.eth",
        url: "web3://usdc.eth/balanceOf/nemorino.eth?returns=(uint256)"
      },
      // Examples for manual mode
      {
        id: 100,
        name: "NFT explorer on Ethereum mainnet",
        url: "web3://0xAD41bf1c7f22F0ec988DaC4C0aE79119Cab9BB7E"
      }, 
      {
        id: 101,
        name: "Vitalik's blog on Arbitrum Nova",
        url: "web3://vitalikblog.eth"
      },
      {
        id: 102,
        name: "Fetch a CSS file on Arbitrum Nova",
        url: "web3://vitalikblog.eth/css/misc.css"
      },
      // Examples for auto mode
      {
        id: 201,
        name: "Fetch the USDC balance of nemorino.eth",
        url: "web3://usdc.eth/balanceOf/nemorino.eth?returns=(uint256)"
      },
      {
        id: 202,
        name: "Fetch a complex data structure",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/structureData/1699519297?returns=((uint,uint,int,int,int)[20])"
      },
      {
        id: 203,
        name: "Call a method returning bytes, no MIME cast (bug)",
        url: "web3://0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2/resourceName"
      },
      {
        id: 204,
        name: "Call a method returning bytes, cast result as text",
        url: "web3://0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2/resourceName?mime.type=txt"
      },
      {
        id: 301,
        name: "ResourceRequest resolve mode website",
        url: "web3://0x2b51A751d3c7d3554E28DC72C3b032E5f56Aa656/view/1234?x=1&b=2",
      },
      {
        id: 6,
        name: "Call a contract method on goerli",
        url: "web3://0x76010876050387FA66E28a1883aD73d576D88Bf2:5/levelAndTile/2/50?returns=(uint256,uint256)"
      },
    ],
    // The tree organization of the library
    tree: {
      folders: [{
        name: "Examples",
        folders: [{
          name: "Manual resolve mode",
          folders: [],
          libraryItemIds: [100, 101, 102]
        }, {
          name: "Auto resolve mode",
          folders: [],
          libraryItemIds: [201, 202, 203, 204]
        }, {
          name: "Resource request resolve mode",
          folders: [],
          libraryItemIds: [301]
        }],
        libraryItemIds: []
      }],
      libraryItemIds: [1, 2, 3]
    }
  }

  return result;
}


export { loadLibraryFromLocalStorage, saveLibraryToLocalStorage, getDefaultLibrary }