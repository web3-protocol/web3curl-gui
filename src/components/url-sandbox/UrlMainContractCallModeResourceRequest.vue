<template>
  <div>
    <span>Resource parts: </span>
    <table class="table" v-if="parsedUrl.contractCallMode != null">
      <thead>
        <tr>
          <th>#</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(arg, index) in parsedUrl.methodArgValues[0]" :key="index">
          <td>{{ index }}</td>
          <td>{{ arg }}</td>
        </tr>
      </tbody>
    </table>

    <span>Params: </span>
    <table class="table" v-if="parsedUrl.contractCallMode != null">
      <thead>
        <tr>
          <th>Method Argument Type</th>
          <th>Method Argument</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(queryArg, index) in parsedUrl.methodArgValues[1]" :key="index">
          <td>{{ queryArg[0] }}</td>
          <td>{{ queryArg[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

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
