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
      // Basic examples
      {
        id: 100001,
        name: "Call a contract method on sepolia",
        url: "web3://0x10fE786Dc7Cb9527197C24c53d7330D3db329524:11155111/levelAndTile/2/50?returns=(uint256,uint256)"
      },
      // Examples for domain names
      {
        id: 100401,
        name: "Fetch an USDC balance",
        url: "web3://usdc.eth/balanceOf/vitalik.eth?returns=(uint256)"
      },
      {
        id: 100402,
        name: "Fetch a CSS file on Arbitrum Nova",
        url: "web3://vitalikblog.eth/css/misc.css"
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
      // Examples for auto mode
      {
        id: 100201,
        name: "Fetch the USDC balance of nemorino.eth",
        url: "web3://usdc.eth/balanceOf/nemorino.eth?returns=(uint256)"
      },
      {
        id: 100202,
        name: "Display a Terraform (on-chain NFT)",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/tokenSVG/9352?mime.type=svg"
      },
      {
        id: 100203,
        name: "Fetch a complex data structure",
        url: "web3://0x4e1f41613c9084fdb9e34e11fae9412427480e56/structureData/1699519297?returns=((uint,uint,int,int,int)[20])"
      },
      {
        id: 100204,
        name: "Call a method returning bytes, no MIME cast (bug)",
        url: "web3://0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2/resourceName"
      },
      {
        id: 100205,
        name: "Call a method returning bytes, cast result as text",
        url: "web3://0xA5aFC9fE76a28fB12C60954Ed6e2e5f8ceF64Ff2/resourceName?mime.type=txt"
      },
      // Examples for resource request mode
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
      }
    ],
    // The tree organization of the library
    tree: {
      folders: [{
        name: "Examples",
        folders: [{
          name: "Basic",
          folders: [],
          libraryItemIds: [100001]
        }, {
          name: "Domain name resolution",
          folders: [],
          libraryItemIds: [100401, 100402]
        }, {
          name: "Manual resolve mode",
          folders: [],
          libraryItemIds: [100101, 100102]
        }, {
          name: "Auto resolve mode",
          folders: [],
          libraryItemIds: [100201, 100202, 100203, 100204, 100205]
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