<template>
  <UrlElement>
    <template #header-name>
      Resolve mode: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '1.3' && parsedUrl.mode == null">
        <span v-if="parsedUrl.mode">
          <code>{{ parsedUrl.mode }}</code>
          <sup style="margin-left: 3px"><a :href="getModeHelpUrl(parsedUrl.mode)" target="_blank" @click.stop><font-awesome-icon :icon="['far', 'circle-question']" /></a></sup>
        </span>
      </Loader>

    </template>

    <template #body>

      <div class="entry">
        <span class="title">Smart contract call: </span>
        <div class="smart-contract-call">
          <ContractCall
            :smartContractCall="parsedUrl.modeDetermination"
            :loading="loadingStep == '1.3' && parsedUrl.mode == null"
            :showReturnUtf8Preview="true"
            :chainList />
        </div>
      </div>

      <div class="entry">
        <span class="title">Result: </span>
        <Loader :loading="loadingStep == '1.3' && parsedUrl.mode == null">
          <code>{{ parsedUrl.mode }}</code>
        </Loader>
      </div>

    </template>
  </UrlElement>
</template>

<script setup>
  import UrlElement from './UrlElement.vue';
  import ContractCall from '../common/ContractCall.vue';
  import Loader from '../common/Loader.vue';
  import { ref, computed } from 'vue';

  const props = defineProps({
    parsedUrl: {
      type: Object,
      required: true
    },
    loadingStep: {
      type: String
    },
    chainList: {
      type: Array,
      required: true
    },
  });

  const isExpanded = ref(false);

  function getModeHelpUrl(mode) {
    if(mode == 'auto') {
      return 'https://docs.web3url.io/web3-url-structure/resolve-mode/mode-auto';
    } else if(mode == 'manual') {
      return 'https://docs.web3url.io/web3-url-structure/resolve-mode/mode-manual';
    } else if(mode == 'resourceRequest') {
      return 'https://docs.web3url.io/web3-url-structure/resolve-mode/mode-resource-request';
    }
  }
</script>

<style scoped>
  .entry {
    margin-bottom: 5px;
  }
  .entry:last-child {
    margin-bottom: 0;
  }

  .entry .title {
    font-weight: bold;
  }

  .smart-contract-call {
    padding-left: 20px;
    padding-top: 5px;
  }
</style>