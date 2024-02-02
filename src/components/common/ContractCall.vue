<template>
  <div>
    <div class="entry">
      <span class="title">Contract called: </span>
      <Loader :loading>
        <span v-if="smartContractCall">
          <ContractAddress :address="smartContractCall.contractAddress" :chainId="smartContractCall.chainId" :chainList="chainList" />
        </span>
      </Loader>
    </div>

    <div class="entry">
      <span class="title">RPC gateway: </span>
      <Loader :loading>
        <span v-if="smartContractCall">
          {{ smartContractCall.callResult.rpcUrls[smartContractCall.callResult.rpcUrlUsedIndex] }}
        </span>
      </Loader>
    </div>

    <div class="entry">
      <span v-if="smartContractCall == null || smartContractCall.methodName != null"  class="title">Method: </span>
      <span v-else class="title">Method: </span>
      <Loader :loading>
        <span v-if="smartContractCall">
          <span v-if="smartContractCall.methodName != null">
            <code>{{ smartContractCall.methodName }}({{ smartContractCall.methodArgs.join(', ') }})</code>
            (Calldata: <Bytes :data="smartContractCall.calldata" />)
          </span>
          <span v-else>
            Calldata: <Bytes :data="smartContractCall.calldata" />
          </span>
        </span>
      </Loader>
    </div>

    <div class="entry">
      <span class="title">Smart contract return: </span>
      <Loader :loading>
        <span v-if="smartContractCall">
          <Bytes :data="smartContractCall.callResult.data" :maxSize="64" /> 
        </span>
      </Loader>
    </div>

    <div class="entry">
      <span class="title">Decoded smart contract return: </span>
      <Loader :loading>
        <span v-if="smartContractCall">
          {{ smartContractCall.decodedResult }}
          <span v-if="showReturnUtf8Preview && smartContractCall.decodedResult != '0x'">
            (UTF-8: <code>{{ showBytesAsUTF8(smartContractCall.decodedResult) }}</code>)
          </span>
        </span>
      </Loader>
    </div>

  </div>
</template>

<script setup>
  import ContractAddress from './ContractAddress.vue';
  import Bytes from './Bytes.vue';
  import Loader from './Loader.vue';
  import { showBytesAsUTF8 as _showBytesAsUTF8 } from '../../common/filters.js'

  const props = defineProps({
    smartContractCall: {
      type: Object
    },
    loading: {
      type: Boolean,
      required: true
    },
    showReturnUtf8Preview: {
      type: Boolean,
      default: false
    },
    chainList: {
      type: Array,
      required: true
    },
  });

  const showBytesAsUTF8 = _showBytesAsUTF8;

</script>

<style scoped>
  .entry .title {
    font-weight: bold;
  }
</style>