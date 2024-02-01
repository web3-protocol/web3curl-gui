<template>
  <UrlElement>
    <template #header-name>
      Resolve mode: 
    </template>

    <template #header-value>

      <Loader :loading="loadingStep == '1.3' && parsedUrl.mode == null">
        {{ parsedUrl.mode }}
      </Loader>

    </template>

    <template #body>
      <div class="entry">
        <span>Resolve mode determination calldata: </span>
        <Loader :loading="loadingStep == '1.3' && parsedUrl.mode == null">
          <span v-if="parsedUrl.mode != null">
            {{ parsedUrl.modeDetermination.calldata }}
          </span>
        </Loader>
      </div>

      <div class="entry">
        <span>Resolve mode determination return: </span>
        <Loader :loading="loadingStep == '1.3' && parsedUrl.mode == null">
          <span v-if="parsedUrl.mode != null">
            {{ parsedUrl.modeDetermination.decodedResult }} (ascii: <code>{{ showBytesAsAscii(parsedUrl.modeDetermination.decodedResult) }}</code>)
          </span>
        </Loader>
      </div>

      <div class="entry">
        <span>Result: </span>
        <Loader :loading="loadingStep == '1.3' && parsedUrl.mode == null">
          {{ parsedUrl.mode }}
        </Loader>
      </div>

    </template>
  </UrlElement>
</template>

<script setup>
  import UrlElement from './UrlElement.vue';
  import Loader from '../common/Loader.vue';
  import { showBytesAsAscii as _showBytesAsAscii } from '../../common/filters.js'
  import { ref, computed } from 'vue';

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

  const showBytesAsAscii = _showBytesAsAscii;
</script>
