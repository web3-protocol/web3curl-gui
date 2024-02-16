function loadLibraryFromLocalStorage() {
  const storedLibrary = localStorage.getItem('library');
  if (storedLibrary) {
    return JSON.parse(storedLibrary).library;
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
    // Id starts at 100000 to avoid conflicts with the one saved by the user
    items: [
      // Main examples
      {
        id: 100001,
        name: "Vitalik's blog on Arbitrum Nova",
        url: "web3://vitalikblog.eth"
      }, 
      {
        id: 100002,
        name: "Display a Terraform (on-chain NFT)",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/tokenSVG/9352?mime.type=svg"
      },
      {
        id: 100003,
        name: "Fetch the USDC balance of nemorino.eth",
        url: "web3://usdc.eth/balanceOf/nemorino.eth?returns=(uint256)"
      },
      // Examples for manual mode
      {
        id: 100101,
        name: "NFT explorer on Ethereum mainnet",
        url: "web3://0xAD41bf1c7f22F0ec988DaC4C0aE79119Cab9BB7E"
      }, 
      {
        id: 100102,
        name: "Vitalik's blog on Arbitrum Nova",
        url: "web3://vitalikblog.eth"
      },
      {
        id: 100103,
        name: "Fetch a CSS file on Arbitrum Nova",
        url: "web3://vitalikblog.eth/css/misc.css"
      },
      // Examples for auto mode
      {
        id: 100201,
        name: "Fetch the USDC balance of nemorino.eth",
        url: "web3://usdc.eth/balanceOf/nemorino.eth?returns=(uint256)"
      },
      {
        id: 100202,
        name: "Fetch a complex data structure",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/structureData/1699519297?returns=((uint,uint,int,int,int)[20])"
      },
      {
        id: 100203,
        name: "Call a method returning bytes, no MIME cast (bug)",
        url: "web3://0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2/resourceName"
      },
      {
        id: 100204,
        name: "Call a method returning bytes, cast result as text",
        url: "web3://0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2/resourceName?mime.type=txt"
      },
      {
        id: 100301,
        name: "ResourceRequest resolve mode website",
        url: "web3://0x2b51A751d3c7d3554E28DC72C3b032E5f56Aa656/view/1234?x=1&b=2",
      },
      {
        id: 100302,
        name: "ResourceRequest mode using chunks",
        url: "web3://0x8e990356262a2f8164981298e167c3ad2409faa1:11155111/getFile/abcd",
      },
      {
        id: 100303,
        name: "ResourceRequest mode using gzip compression",
        url: "web3://0x7cee6ee8a44ba3f429f868114cf7e41aec4f8641:11155111/gziped-file.txt"
      },
      {
        id: 100304,
        name: "ResourceRequest mode using brotli compression",
        url: "web3://0x7cee6ee8a44ba3f429f868114cf7e41aec4f8641:11155111/brotlied-file.txt"
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
          name: "Main",
          folders: [],
          libraryItemIds: [100001, 100002, 100003]
        }, {
          name: "Manual resolve mode",
          folders: [],
          libraryItemIds: [100101, 100102, 100103]
        }, {
          name: "Auto resolve mode",
          folders: [],
          libraryItemIds: [100201, 100202, 100203, 100204]
        }, {
          name: "Resource request resolve mode",
          folders: [],
          libraryItemIds: [100301, 100302, 100303, 100304]
        }],
        libraryItemIds: []
      }],
      libraryItemIds: []
    }
  }

  return result;
}


export { loadLibraryFromLocalStorage, saveLibraryToLocalStorage, getDefaultLibrary }