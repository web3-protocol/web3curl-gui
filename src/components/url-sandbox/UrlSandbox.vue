<template>
  <div>
    <div>
      <input type="text" v-model="url" @keydown.enter="loadUrl()" />
      <button class="btn btn-primary" @click="loadUrl()">Send</button>
      <slot name="urlButtons" />
    </div>

    <div>
      {{ errorMessage }}
    </div>

    <UrlElements v-model:url="url" :parsedUrl :contractReturn :fetchedUrl :chainList :loading />

    <UrlOutput :fetchedUrl :outputBuffer :loading />
  </div>
</template>

<script setup>
  import UrlElements from './UrlElements.vue';
  import UrlOutput from './UrlOutput.vue';
  import { Client } from 'web3protocol';
  import { getDefaultChainList } from 'web3protocol/chains';
  import { ref } from 'vue';

  const url = defineModel('url', {
    type: String,
    required: true
  });


  const chainList = ref(getDefaultChainList())
  const web3Client = new Client(chainList.value, {
    // Disable caches
    domainNameResolverCache: {
      maxEntries: 0,
      maxAgeSeconds: 0,
    },
    resolveModeDeterminatorCache: {
      maxEntries: 0,
      maxAgeSeconds: 0,
    },
  })

  // Step 1 state: parsing of the URL
  let parsedUrl = ref({});
  // Step 2 state: The main contract call
  let contractReturn = ref({});
  // Step 3 state: Processing of the contract return
  let fetchedUrl = ref({})
  // Output buffer: Filled as it is loaded
  let outputBuffer = ref(new Uint8Array())
  const loading = ref(false);
  const errorMessage = ref("");
  async function loadUrl() {
    console.log("Loading URL: " + url.value);
    loading.value = true;

    // Reinit all to empty
    errorMessage.value = "";
    parsedUrl.value = {
      url: url.value,
    }
    contractReturn.value = {}
    fetchedUrl.value = {}
    outputBuffer.value = new Uint8Array()

    let urlMainParts
    // Step 1.1 : Extract parts of the URL, determine if a chain id was provided.
    try {
      let chainId
      ({urlMainParts, chainId} = web3Client.parseUrlBasic(parsedUrl.value.url))
      parsedUrl.value.chainId = chainId
    }
    catch(err) {
      loading.value = false;
      errorMessage.value = "Basic parsing: Error: " + err.message
      return;
    }

    // Step 1.2 : For a given hostname, determine the target contract address.
    try {
      let {contractAddress, chainId: updatedChainId, nameResolution} = await web3Client.determineTargetContractAddress(urlMainParts.hostname, parsedUrl.value.chainId)
      parsedUrl.value.contractAddress = contractAddress
      parsedUrl.value.chainId = updatedChainId
      // Informations on how the hostname of the URL was resolved
      parsedUrl.value.nameResolution = nameResolution
    }
    catch(err) {
      loading.value = false;
      errorMessage.value = "Hostname resolution: Error: " + err.message
      return;
    }

    // Step 1.3 : Determine the resolve mode.
    try {
      const resolveModeDeterminationResult = await web3Client.determineResolveMode(parsedUrl.value.contractAddress, parsedUrl.value.chainId)
      // Web3 resolve mode: 'auto', 'manual' or 'resourceRequest'
      parsedUrl.value.mode = resolveModeDeterminationResult.mode
      // Infos about the mode determination
      parsedUrl.value.modeDetermination = resolveModeDeterminationResult.modeDetermination
    }
    catch(err) {
      loading.value = false;
      errorMessage.value = "Resolve mode determination: Error: " + err.message
      return
    }

    // Step 1.4 : Parse the path part of the URL, given the web3 resolve mode.
    try {
      let parsedPath = await web3Client.parsePathForResolveMode(urlMainParts.path, parsedUrl.value.mode, parsedUrl.value.chainId)
      parsedUrl.value = {...parsedUrl.value, ...parsedPath}
    }
    catch(err) {
      loading.value = false;
      errorMessage.value = "Path parsing: Error: " + err.message
      return
    }

    // Step 2 : Fetch the contract return
    try {
      contractReturn.value = await web3Client.fetchContractReturn(parsedUrl.value)
    }
    catch(err) {
      loading.value = false;
      errorMessage.value = "Main contract call: Error: " + err.message
      return
    }

    // Step 3 : Process the contract return
    try {
      fetchedUrl.value = await web3Client.processContractReturn(parsedUrl.value, contractReturn.value)
    }
    catch(err) {
      loading.value = false;
      errorMessage.value = "Contract return processing: Error: " + err.message
      return
    }

    // Step 4 : Fetched the whole output
    const reader = fetchedUrl.value.output.getReader();
    let chunkNumber = 0;
    let fileWriteStream = null;
    while (true) {
      const { done, value } = await reader.read();

      // We got a chunk
      if(value) {
        // Appnd it to the output buffer
        outputBuffer.value = new Uint8Array([...outputBuffer.value, ...value]);

        chunkNumber++;
      }

      // When no more data needs to be consumed, break the reading
      if (done) {
        break;
      }
    }


    console.log("parsedUrl: ", parsedUrl.value)
    console.log("contractReturn: ", contractReturn.value)
    console.log("fetchedUrl: ", fetchedUrl.value)
    console.log("outputBuffer: ", outputBuffer.value)
    loading.value = false;
  }


  // const updateUrl = (event) => {
  //   url.value = event.target.value;
  // };
</script>
