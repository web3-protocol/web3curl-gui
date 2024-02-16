<template>
  <UrlElement>
    <template #header-name>
      Main smart contract calling manner: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '1.4' && parsedUrl.contractCallMode == null">
        <span v-if="parsedUrl.contractCallMode != null">
          <span v-if="parsedUrl.contractCallMode == 'calldata'">
            Calldata: <Bytes :data="parsedUrl.calldata" :maxSize="64" :expandable="false" />
          </span>
          <span v-else-if="parsedUrl.contractCallMode == 'method'">
            Method: <code>{{ parsedUrl.methodName }}(<span v-for="(methodArgType, index) in props.parsedUrl.methodArgs" :key="index">
                <em>{{ methodArgType.type }}:</em> {{ parsedUrl.methodArgValues[index] }}{{ index !== props.parsedUrl.methodArgs.length - 1 ? ', ' : '' }}
              </span>)
            </code>
          </span>
        </span>
      </Loader>
    </template>

    <template #body>

      <div class="entry">
        <span class="title">Contract: </span>
        <Loader :loading="loadingStep == '1.4' && parsedUrl.contractCallMode == null">
          <span v-if="parsedUrl.contractCallMode != null">
            <ContractAddress :address="parsedUrl.contractAddress" :chainId="parsedUrl.chainId" :chainList="chainList" />
          </span>
        </Loader>
      </div>
      
      <UrlMainContractCallModeManual 
        v-if="parsedUrl.mode == 'manual'" 
        :parsedUrl="parsedUrl" 
        :loading="loadingStep == '1.4'" />
      
      <UrlMainContractCallModeAuto 
        v-if="parsedUrl.mode == 'auto'" 
        v-model:url="url"
        :parsedUrl="parsedUrl" 
        :loading="loadingStep == '1.4'" />

        <UrlMainContractCallModeResourceRequest
        v-if="parsedUrl.mode == 'resourceRequest'" 
        v-model:url="url"
        :parsedUrl="parsedUrl" 
        :loading="loadingStep == '1.4'" />

      </template>
  </UrlElement>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
  import Bytes from '../common/Bytes.vue';
  import UrlElement from './UrlElement.vue';
  import UrlMainContractCallModeAuto from './UrlMainContractCallModeAuto.vue';
  import UrlMainContractCallModeManual from './UrlMainContractCallModeManual.vue';
  import UrlMainContractCallModeResourceRequest from './UrlMainContractCallModeResourceRequest.vue';
  import ContractAddress from '../common/ContractAddress.vue';
  import { ref } from 'vue';

  const url = defineModel('url', {
    type: String,
    required: true
  });

  const props = defineProps({
    parsedUrl: {
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