<template>
  <div>
    <div class="element">
      <UrlNameResolution :parsedUrl="parsedUrl" :chainList="chainList" :loadingStep="loadingStep" />
    </div>

    <div class="element">
      <UrlResolveMode :parsedUrl="parsedUrl" :loadingStep="loadingStep" />
    </div>

    <div class="element">
      <UrlContractCall v-model:url="url" :parsedUrl="parsedUrl" :loadingStep="loadingStep" />
    </div>

    <div class="element">
      <UrlMainCall :parsedUrl="parsedUrl" :contractReturn="contractReturn" :chainList="chainList" :loadingStep="loadingStep" />
    </div>
    
    <div class="element">
      <UrlContractReturnProcessing :fetchedUrl="fetchedUrl" :loadingStep="loadingStep" />
    </div>
  </div>
</template>

<script setup>
  import UrlNameResolution from './UrlNameResolution.vue';
  import UrlResolveMode from './UrlResolveMode.vue';
  import UrlContractCall from './UrlContractCall.vue';
  import UrlMainCall from './UrlMainCall.vue';
  import UrlContractReturnProcessing from './UrlContractReturnProcessing.vue';
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