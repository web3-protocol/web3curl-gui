<template>
  <div>
    <div id="name-resolution-header">
      <button 
        @click="isExpanded = !isExpanded" 
        class="btn btn-primary">
        <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
      </button>

      <span>Main contract call: </span>
      <span v-if="loading && contractReturn.data == null">
        Loading...
      </span>
      <span v-else-if="contractReturn.data != null">
        {{ formatBytes(contractReturn.data, 64) }}
      </span>
    </div>

    <div id="name-resolution-body" v-show="isExpanded">
      <div class="entry">
        <span>Called contract: </span>
        <span v-if="loading && contractReturn.data == null">
          Loading...
        </span>
        <span v-else-if="contractReturn.data != null">
          <ContractAddress :address="parsedUrl.contractAddress" :chainId="parsedUrl.chainId" :chainList="chainList" />
        </span>
      </div>

      <div class="entry">
        <span>Smart contract calldata: </span>
        <span v-if="loading && contractReturn.data == null">
          Loading...
        </span>
        <span v-else-if="contractReturn.data != null">
          {{ parsedUrl.calldata }} 
        </span>
      </div>

      <div class="entry">
        <span>Smart contract result: </span>
        <span v-if="loading && contractReturn.data == null">
          Loading...
        </span>
        <span v-else-if="contractReturn.data != null">
          {{ contractReturn.data }}
        </span>
      </div>

    </div>
  </div>
</template>

<script setup>
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
    loading: {
      type: Boolean,
      required: true
    }
  });

  const isExpanded = ref(false);

  const formatBytes = _formatBytes;
</script>
