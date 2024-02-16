<template>
  <UrlElement>
    <template #header-name>
      Main smart contract return processing: 
    </template>

    <template #header-value>

      <span v-if="fetchedUrl.output != null" style="margin-right: 5px;">
        <code>{{ fetchedUrl.parsedUrl.contractReturnProcessing }}</code>
        <span v-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'decodeABIEncodedBytes' && fetchedUrl.parsedUrl.contractReturnProcessingOptions.mimeType">, MIME type: <code>{{ fetchedUrl.parsedUrl.contractReturnProcessingOptions.mimeType }}</code></span>
      </span>
      <Loader :loading="loadingStep == '3' || loadingStep == '4'"></Loader>
    </template>

    <template #body>
    
      <div v-if="fetchedUrl.output != null">
        
        <div v-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'decodeABIEncodedBytes'">
          <div class="mb-2">
            The bytes returned by the smart contract are expected to be <code>abi.encode()</code>-d bytes. The protocol will decode them before returning them to the client.
          </div>
          <div class="entry">
            <strong>MIME Type: </strong>
            <span v-if="fetchedUrl.parsedUrl.contractReturnProcessingOptions.mimeType">
              <code>{{ fetchedUrl.parsedUrl.contractReturnProcessingOptions.mimeType }}</code>
            </span>
            <span v-else>
              <span class="text-warning"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> No Content-type</span> 
              <div style="margin-left: 20px;">
                The protocol cannot determine by itself the MIME type of the returned data, you will need to specify it with either the <code>?mime.type=</code> or <code>?mime.content=</code> URL argument to specify it. 
                <br />
                <a href="https://docs.web3url.io/web3-url-structure/resolve-mode/mode-auto#mime.content-and-mime.type" target="_blank">See here for more information</a>
              </div>

            </span>
          </div>
          <div class="entry">
            <span class="title">Decoded body: </span>
            <Loader :loading="loadingStep == '3'">
              <span v-if="fetchedUrl.decodedContractReturn != null">
                <Bytes :data="fetchedUrl.decodedContractReturn[0]" :maxSize="64" /> 
              </span>
            </Loader>
          </div>

        </div>
        <div v-else-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'jsonEncodeRawBytes'">
          
          The raw bytes returned by the smart contract will be returned JSON-encoded as the only entry of an array. This is an very uncommon and advanced use.

        </div>
        <div v-else-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'jsonEncodeValues'">

          The raw bytes will be decoded with the method signature specified in the <code>?returns=</code> argument of the URL : 
          <MethodReturnSignature :signature="fetchedUrl.parsedUrl.contractReturnProcessingOptions.jsonEncodedValueTypes" />
          The decoded values will be returned JSON-encoded as an array.

        </div>
        <div v-else-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'decodeErc5219Request'">

          <div class="mb-3">
            In <code>resourceRequest</code> mode, the <code>request()</code> method will return the following values: <code>(uint statusCode, string memory body, KeyValue[] memory headers)</code>. These below are the received values prior any chunking or decompression processing :
          </div>
          <div class="entry">
            <span class="title">HTTP status code: </span>
            <Loader :loading="loadingStep == '3'">
              <span v-if="fetchedUrl.decodedContractReturn != null">
                {{ fetchedUrl.decodedContractReturn[0] }}
              </span>
            </Loader>
          </div>
          <div class="entry">
            <span class="title">Body: </span>
            <Loader :loading="loadingStep == '3'">
              <span v-if="fetchedUrl.decodedContractReturn != null">
                <Bytes :data="fetchedUrl.decodedContractReturn[1]" :maxSize="64" /> 
              </span>
            </Loader>
          </div>
          <div class="entry">
            <span class="title">HTTP headers: </span>
            <Loader :loading="loadingStep == '3'">
              <div v-if="fetchedUrl.decodedContractReturn != null">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Header</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(value, header) in fetchedUrl.decodedContractReturn[2]" :key="header">
                      <td>{{ value[0] }}</td>
                      <td>{{ value[1] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Loader>
          </div>

        </div>

      </div>
    </template>
  </UrlElement>
</template>

<script setup>
  import MethodReturnSignature from './misc/MethodReturnSignature.vue';
  import Loader from '../common/Loader.vue';
  import UrlElement from './UrlElement.vue';
  import Bytes from '../common/Bytes.vue';
  import { ref } from 'vue';

  const props = defineProps({
    fetchedUrl: {
      type: Object,
      required: true
    },
    loadingStep: {
      type: String
    }
  });

  const isExpanded = ref(false);

</script>

<style scoped>
  .entry {
    margin-bottom: 5px;
    line-height: 1.3em;
  }
  .entry:last-child {
    margin-bottom: 0;
  }
  

  .entry .title {
    font-weight: bold;
  }
  
</style>