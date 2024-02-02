<template>
  <div>
    <div class="entry">
      <span>Method name: </span>
      <Loader :loading="loading && parsedUrl.contractCallMode == null">
        <span v-if="parsedUrl.contractCallMode != null">
          {{ parsedUrl.methodName }}
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
