<template>
  <div>
    <div id="name-resolution-header">
      <button 
        @click="isExpanded = !isExpanded" 
        class="btn btn-primary">
        <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
      </button>

      <span>Smart contract call: </span>
      <span v-if="loading && parsedUrl.contractCallMode == null">
        Loading...
      </span>
      <span v-else-if="parsedUrl.contractCallMode != null">
        <span v-if="parsedUrl.contractCallMode == 'calldata'">
          Calldata: {{ formatBytes(parsedUrl.calldata, 64) }}
        </span>
        <span v-else-if="parsedUrl.contractCallMode == 'method'">
          Method: {{ parsedUrl.methodName }}(<span v-for="(methodArgType, index) in props.parsedUrl.methodArgs" :key="index">
              <em>{{ methodArgType.type }}:</em> {{ parsedUrl.methodArgValues[index] }}{{ index !== props.parsedUrl.methodArgs.length - 1 ? ', ' : '' }}
            </span>)
        </span>
      </span>
    </div>

    <div id="name-resolution-body" v-show="isExpanded">
      
      <UrlContractCallModeManual 
        v-if="parsedUrl.mode == 'manual'" 
        :parsedUrl="parsedUrl" 
        :loading="loading" />
      
      <UrlContractCallModeAuto 
        v-if="parsedUrl.mode == 'auto'" 
        v-model:url="url"
        :parsedUrl="parsedUrl" 
        :loading="loading" />

        <UrlContractCallModeResourceRequest
        v-if="parsedUrl.mode == 'resourceRequest'" 
        v-model:url="url"
        :parsedUrl="parsedUrl" 
        :loading="loading" />

    </div>
  </div>
</template>

<script setup>
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
    loading: {
      type: Boolean,
      required: true
    }
  });

  const isExpanded = ref(false);

  const formatBytes = _formatBytes


</script>
