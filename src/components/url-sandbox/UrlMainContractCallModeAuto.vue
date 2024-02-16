<template>
  <div>
    <div class="entry">
      <span class="title">Method name: </span>
      <Loader :loading="loading && parsedUrl.contractCallMode == null">
        <span v-if="parsedUrl.contractCallMode != null">
          <code>{{ parsedUrl.methodName }}</code>
        </span>
      </Loader>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Method Argument Type</th>
          <th>Method Argument</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(arg, index) in parsedUrl.methodArgs" :key="index">
          <td>{{ arg.type }}</td>
          <td>{{ parsedUrl.methodArgValues[index] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import Loader from '../common/Loader.vue';

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
