<template>
  <UrlElement>
    <template #header-name>
      Main smart contract call execution: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '2' && contractReturn.data == null">
        <span v-if="contractReturn.data != null">
          <Bytes :data="contractReturn.data" :maxSize="64" />
        </span>
      </Loader>
    </template>

    <template #body>
      
      <div class="entry">
        <span class="title">Contract called: </span>
        <Loader :loading="loadingStep == '2' && contractReturn.data == null">
          <span v-if="contractReturn.data != null">
            <ContractAddress :address="parsedUrl.contractAddress" :chainId="parsedUrl.chainId" :chainList="chainList" />
          </span>
        </Loader>
      </div>

      <div class="entry">
        <span class="title">RPC gateway: </span>
        <Loader :loading="loadingStep == '2' && contractReturn.data == null">
          <span v-if="contractReturn.data != null">
            {{ contractReturn.rpcUrls[contractReturn.rpcUrlUsedIndex] }}
          </span>
        </Loader>
      </div>

      <div class="entry">
        <span class="title">Calldata: </span>
        <Loader :loading="loadingStep == '2' && contractReturn.data == null">
          <span v-if="contractReturn.data != null">
            <Bytes :data=parsedUrl.calldata />
          </span>
        </Loader>
      </div>

      <div class="entry">
        <span class="title">Smart contract return: </span>
        <Loader :loading="loadingStep == '2' && contractReturn.data == null">
          <span v-if="contractReturn.data != null">
            <Bytes :data="contractReturn.data" :maxSize=256 />
          </span>
        </Loader>
      </div>

    </template>
  </UrlElement>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
  import Bytes from '../common/Bytes.vue';
  import UrlElement from './UrlElement.vue';
  import ContractAddress from '../common/ContractAddress.vue'
  import { ref } from 'vue';

  const props = defineProps({
    parsedUrl: {
      type: Object,
      required: true
    },
    contractReturn: {
      type: Object,
      required: true
    },
    chainList: {
      type: Array,
      required: true
    },
    loadingStep: {
      type: String
    }
  });

  const isExpanded = ref(false);
</script>

<style scoped>
  .entry .title {
    font-weight: bold;
  }
</style>
