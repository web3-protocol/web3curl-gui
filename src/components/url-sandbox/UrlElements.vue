<template>
  <div>
    <div class="element">
      <UrlNameResolution :parsedUrl="parsedUrl" :chainList="chainList" :loadingStep="loadingStep" />
    </div>

    <div class="element">
      <UrlResolveMode :parsedUrl="parsedUrl" :loadingStep="loadingStep" :chainList />
    </div>

    <div class="element">
      <UrlMainContractCall v-model:url="url" :parsedUrl="parsedUrl" :loadingStep="loadingStep" />
    </div>

    <div class="element">
      <UrlMainContractCallExecution :parsedUrl="parsedUrl" :contractReturn="contractReturn" :chainList="chainList" :loadingStep="loadingStep" />
    </div>
    
    <div class="element">
      <UrlMainContractReturnProcessing :fetchedUrl="fetchedUrl" :loadingStep="loadingStep" />
    </div>
  </div>
</template>

<script setup>
  import UrlNameResolution from './UrlNameResolution.vue';
  import UrlResolveMode from './UrlResolveMode.vue';
  import UrlMainContractCall from './UrlMainContractCall.vue';
  import UrlMainContractCallExecution from './UrlMainContractCallExecution.vue';
  import UrlMainContractReturnProcessing from './UrlMainContractReturnProcessing.vue';
  import { ref, watch } from 'vue';

  const url = defineModel('url', {
    type: String,
    required: true
  });

  const props = defineProps({
    parsedUrl: {
      type: Object,
      required: true
    },
    contractReturn: {
      type: Object,
      required: true
    },
    fetchedUrl: {
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



  // watch(url, (newUrl) => {
  //   // Perform any necessary actions when the URL changes
  // });
</script>

<style scoped>
  .element {
    margin-bottom: 10px;
  }
</style>