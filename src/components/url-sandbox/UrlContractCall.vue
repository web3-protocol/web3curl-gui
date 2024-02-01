<template>
  <UrlElement>
    <template #header-name>
      Smart contract call: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '1.4' && parsedUrl.contractCallMode == null">
        <span v-if="parsedUrl.contractCallMode != null">
          <span v-if="parsedUrl.contractCallMode == 'calldata'">
            Calldata: {{ formatBytes(parsedUrl.calldata, 64) }}
          </span>
          <span v-else-if="parsedUrl.contractCallMode == 'method'">
            Method: {{ parsedUrl.methodName }}(<span v-for="(methodArgType, index) in props.parsedUrl.methodArgs" :key="index">
                <em>{{ methodArgType.type }}:</em> {{ parsedUrl.methodArgValues[index] }}{{ index !== props.parsedUrl.methodArgs.length - 1 ? ', ' : '' }}
              </span>)
          </span>
        </span>
      </Loader>
    </template>

    <template #body>
      
      <UrlContractCallModeManual 
        v-if="parsedUrl.mode == 'manual'" 
        :parsedUrl="parsedUrl" 
        :loading="loadingStep == '1.4'" />
      
      <UrlContractCallModeAuto 
        v-if="parsedUrl.mode == 'auto'" 
        v-model:url="url"
        :parsedUrl="parsedUrl" 
        :loading="loadingStep == '1.4'" />

        <UrlContractCallModeResourceRequest
        v-if="parsedUrl.mode == 'resourceRequest'" 
        v-model:url="url"
        :parsedUrl="parsedUrl" 
        :loading="loadingStep == '1.4'" />

      </template>
  </UrlElement>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
  import UrlElement from './UrlElement.vue';
  import UrlContractCallModeAuto from './UrlContractCallModeAuto.vue';
  import UrlContractCallModeManual from './UrlContractCallModeManual.vue';
  import UrlContractCallModeResourceRequest from './UrlContractCallModeResourceRequest.vue';
  import { formatBytes as _formatBytes } from '../../common/filters.js'
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

  const formatBytes = _formatBytes


</script>
