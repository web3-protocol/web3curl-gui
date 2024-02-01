<template>
  <div>
    <div class="url-area">
      <input class="url-input" type="text" v-model="url" @keydown.enter="loadUrl()" />
      <div class="url-buttons">

        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
          <button class="btn btn-primary" @click="loadUrl()">Send</button>
          <slot name="urlButtons" />
        </div>
        
      </div>
    </div>

    <div class="alert alert-danger alert-dismissible" role="alert" v-show="errorMessage">
      {{ errorMessage }}
      <button type="button" class="btn-close" @click="errorMessage = null"></button>
    </div>

    <UrlElements v-model:url="url" :parsedUrl :contractReturn :fetchedUrl :chainList :loadingStep />

    <hr />

    <UrlOutput :fetchedUrl :outputBuffer :loadingStep />
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
  const loadingStep = ref(null);
  const errorMessage = ref("");
  async function loadUrl() {

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
    loadingStep.value = "1.1";
    try {
      let chainId
      ({urlMainParts, chainId} = web3Client.parseUrlBasic(parsedUrl.value.url))
      parsedUrl.value.chainId = chainId
    }
    catch(err) {
      loadingStep.value = null;
      errorMessage.value = "Basic parsing: Error: " + err.message
      return;
    }

    // Step 1.2 : For a given hostname, determine the target contract address.
    loadingStep.value = "1.2";
    try {
      let {contractAddress, chainId: updatedChainId, nameResolution} = await web3Client.determineTargetContractAddress(urlMainParts.hostname, parsedUrl.value.chainId)
      parsedUrl.value.contractAddress = contractAddress
      parsedUrl.value.chainId = updatedChainId
      // Informations on how the hostname of the URL was resolved
      parsedUrl.value.nameResolution = nameResolution
    }
    catch(err) {
      loadingStep.value = null;
      errorMessage.value = "Hostname resolution: Error: " + err.message
      return;
    }

    // Step 1.3 : Determine the resolve mode.
    loadingStep.value = "1.3";
    try {
      const resolveModeDeterminationResult = await web3Client.determineResolveMode(parsedUrl.value.contractAddress, parsedUrl.value.chainId)
      // Web3 resolve mode: 'auto', 'manual' or 'resourceRequest'
      parsedUrl.value.mode = resolveModeDeterminationResult.mode
      // Infos about the mode determination
      parsedUrl.value.modeDetermination = resolveModeDeterminationResult.modeDetermination
    }
    catch(err) {
      loadingStep.value = null;
      errorMessage.value = "Resolve mode determination: Error: " + err.message
      return
    }

    // Step 1.4 : Parse the path part of the URL, given the web3 resolve mode.
    loadingStep.value = "1.4";
    try {
      let parsedPath = await web3Client.parsePathForResolveMode(urlMainParts.path, parsedUrl.value.mode, parsedUrl.value.chainId)
      parsedUrl.value = {...parsedUrl.value, ...parsedPath}
    }
    catch(err) {
      loadingStep.value = null;
      errorMessage.value = "Path parsing: Error: " + err.message
      return
    }

    // Step 2 : Fetch the contract return
    loadingStep.value = "2";
    try {
      contractReturn.value = await web3Client.fetchContractReturn(parsedUrl.value)
    }
    catch(err) {
      loadingStep.value = null;
      errorMessage.value = "Main contract call: Error: " + err.message
      return
    }

    // Step 3 : Process the contract return
    loadingStep.value = "3";
    try {
      fetchedUrl.value = await web3Client.processContractReturn(parsedUrl.value, contractReturn.value)
    }
    catch(err) {
      loadingStep.value = null;
      errorMessage.value = "Contract return processing: Error: " + err.message
      return
    }

    // Step 4 : Fetched the whole output
    loadingStep.value = "4";
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

    // console.log("parsedUrl: ", parsedUrl.value)
    // console.log("contractReturn: ", contractReturn.value)
    // console.log("fetchedUrl: ", fetchedUrl.value)
    // console.log("outputBuffer: ", outputBuffer.value)
    loadingStep.value = null;
  }


  // const updateUrl = (event) => {
  //   url.value = event.target.value;
  // };
</script>

<style scoped>
  .url-area {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .url-input {
    flex-grow: 1;
    font-size: 18px;
    padding: 5px 5px;
  }
</style>