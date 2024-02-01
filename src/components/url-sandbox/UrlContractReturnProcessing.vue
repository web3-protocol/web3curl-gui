<template>
  <UrlElement>
    <template #header-name>
      Smart contract return processing: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '3' && fetchedUrl.output == null">
        <span v-if="fetchedUrl.output != null">
          {{ fetchedUrl.parsedUrl.contractReturnProcessing }}
        </span>
      </Loader>
    </template>

    <template #body>
      <div class="entry">
        <span v-if="fetchedUrl.output != null">
          
          <span v-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'decodeABIEncodedBytes'">
            The bytes returned by the smart contract are expected to be <code>abi.encode()</code>-d <code>bytes</code>. The protocol will decode them before returning them to the client.
          </span>
          <span v-else-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'jsonEncodeRawBytes'">
            The raw bytes returned by the smart contract will be returned JSON-encoded as the only entry of an array.
          </span>
          <span v-else-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'jsonEncodeValues'">
            The raw bytes will be decoded with the method signature specified in the URL. The decoded values will be returned JSON-encoded as an array.
          </span>
          <span v-else-if="fetchedUrl.parsedUrl.contractReturnProcessing == 'decodeErc5219Request'">
            In the resourceRequest mode (ERC-6944), the smart contract is expected to implement the <code>function request(string[] memory resource, KeyValue[] memory params) external view returns (uint statusCode, string memory body, KeyValue[] memory headers)</code> interface. As such, the returned bytes will be decoded as <code>(uint statusCode, string memory body, KeyValue[] memory headers)</code>.
          </span>

        </span>
      </div>
    </template>
  </UrlElement>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
  import UrlElement from './UrlElement.vue';
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