<template>
  <div>
    <div id="name-resolution-header">
      <button 
        @click="isExpanded = !isExpanded" 
        class="btn btn-primary">
        <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
      </button>

      <span>Smart contract return processing: </span>
      <span v-if="loading && fetchedUrl.output == null">
        Loading...
      </span>
      <span v-else-if="fetchedUrl.output != null">
        {{ fetchedUrl.parsedUrl.contractReturnProcessing }}
      </span>
    </div>

    <div id="name-resolution-body" v-show="isExpanded">
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
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    fetchedUrl: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  });

  const isExpanded = ref(false);

</script>