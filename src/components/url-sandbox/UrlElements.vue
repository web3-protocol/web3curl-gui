<template>
  <div>
    
    <UrlNameResolution :parsedUrl="parsedUrl" :chainList="chainList" :loading="loading" />

    <UrlResolveMode :parsedUrl="parsedUrl" :loading="loading" />

    <UrlContractCall v-model:url="url" :parsedUrl="parsedUrl" :loading="loading" />

    <UrlMainCall :parsedUrl="parsedUrl" :contractReturn="contractReturn" :chainList="chainList" :loading="loading" />
    
    <UrlContractReturnProcessing :fetchedUrl="fetchedUrl" :loading="loading" />
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
    loading: {
      type: Boolean,
      required: true
    }
  });



  // watch(url, (newUrl) => {
  //   // Perform any necessary actions when the URL changes
  // });
</script>
