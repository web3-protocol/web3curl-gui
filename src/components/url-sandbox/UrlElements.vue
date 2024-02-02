<template>
  <div>
    <div class="element">
      <UrlNameResolution :parsedUrl :chainList :loadingStep />
    </div>

    <div class="element">
      <UrlResolveMode :parsedUrl :loadingStep :chainList />
    </div>

    <div class="element">
      <UrlMainContractCall v-model:url="url" :parsedUrl :loadingStep />
    </div>

    <div class="element">
      <UrlMainContractCallExecution :parsedUrl :contractReturn :chainList :loadingStep />
    </div>
    
    <div class="element">
      <UrlMainContractReturnProcessing :fetchedUrl :loadingStep />
    </div>
  </div>
</template>

<script setup>
  import UrlNameResolution from './UrlNameResolution.vue';
  import UrlResolveMode from './UrlResolveMode.vue';
  import UrlMainContractCall from './UrlMainContractCall.vue';
  import UrlMainContractCallExecution from './UrlMainContractCallExecution.vue';
  import UrlMainContractReturnProcessing from './UrlMainContractReturnProcessing.vue';

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

</script>

<style scoped>
  .element {
    margin-bottom: 10px;
  }
</style>