<template>
  <UrlElement>
    <template #header-name>
      Main contract call: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '2' && contractReturn.data == null">
        <span v-if="contractReturn.data != null">
          {{ formatBytes(contractReturn.data, 64) }}
        </span>
      </Loader>
    </template>

    <template #body>
      <div class="entry">
        <span>Called contract: </span>
        <Loader :loading="loadingStep == '2' && contractReturn.data == null">
          <span v-if="contractReturn.data != null">
            <ContractAddress :address="parsedUrl.contractAddress" :chainId="parsedUrl.chainId" :chainList="chainList" />
          </span>
        </Loader>
      </div>

      <div class="entry">
        <span>Smart contract calldata: </span>
        <Loader :loading="loadingStep == '2' && contractReturn.data == null">
          <span v-if="contractReturn.data != null">
            {{ parsedUrl.calldata }} 
          </span>
        </Loader>
      </div>

      <div class="entry">
        <span>Smart contract result: </span>
        <Loader :loading="loadingStep == '2' && contractReturn.data == null">
          <span v-if="contractReturn.data != null">
            {{ contractReturn.data }}
          </span>
        </Loader>
      </div>

    </template>
  </UrlElement>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
  import UrlElement from './UrlElement.vue';
  import ContractAddress from '../common/ContractAddress.vue'
  import { formatBytes as _formatBytes } from '../../common/filters.js'
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

  const formatBytes = _formatBytes;
</script>
