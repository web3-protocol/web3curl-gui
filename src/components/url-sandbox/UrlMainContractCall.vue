<template>
  <UrlElement>
    <template #header-name>
      Main smart contract call: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '1.4' && parsedUrl.contractCallMode == null">
        <span v-if="parsedUrl.contractCallMode != null">
          <span v-if="parsedUrl.contractCallMode == 'calldata'">
            Calldata: <Bytes :data="parsedUrl.calldata" :maxSize="64" />
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
  import { ref, computed } from 'vue';

  const url = defineModel('url', {
    type: String,
    required: true
  });

  const props = defineProps({
    parsedUrl: {
      type: Object,
      required: true
    },
    loadingStep: {
      type: String
    }
  });

  const isExpanded = ref(false);



</script>
