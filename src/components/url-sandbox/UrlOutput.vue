
<template>

  <div>
    <ul class="nav nav-tabs" id="myTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class="{ 'active': activeTab === 'bytes' }" @click="changeTab('bytes')" id="bytes-tab" data-bs-toggle="tab" data-bs-target="#bytes" type="button" role="tab" aria-controls="bytes" aria-selected="true">Bytes</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" :class="{ 'active': activeTab === 'text' }" @click="changeTab('text')" id="text-tab" data-bs-toggle="tab" data-bs-target="#text" type="button" role="tab" aria-controls="text" aria-selected="false">Text</button>
      </li>
    </ul>
    <div class="tab-content" id="myTabsContent">
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'bytes' }" id="bytes" role="tabpanel" aria-labelledby="bytes-tab">
        
        <div style="display: flex; gap: 20px">
          <pre>{{ formatBytesBufferToHex(outputBuffer) }}</pre>
          <pre>{{ formatBytesBufferToAscii(outputBuffer) }}</pre>
        </div>
        
      </div>
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'text' }" id="text" role="tabpanel" aria-labelledby="text-tab">
        <!-- Text tab content -->
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps } from 'vue';

  const props = defineProps({
    fetchedUrl: {
      type: Object,
      required: true
    },
    outputBuffer: {
      type: Uint8Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  });

  const activeTab = ref('bytes');

  function changeTab(tab) {
    activeTab.value = tab;
  }

  function formatBytesBufferToHex(buffer) {
    let result = '';
    for (let i = 0; i < buffer.length; i += 32) {
      const line = Array.from(buffer.slice(i, i + 32))
        .map((byte, index) => {
          if (index % 8 === 0 && index !== 0) {
            return ' ' + byte.toString(16).padStart(2, '0');
          } else {
            return byte.toString(16).padStart(2, '0');
          }
        })
        .join(' ');
      result += line + '\n';
    }
    return result;
  }

  function formatBytesBufferToAscii(buffer) {
    let result = '';
    for (let i = 0; i < buffer.length; i += 32) {
      const line = Array.from(buffer.slice(i, i + 32))
        .map((byte) => {
          const char = String.fromCharCode(byte);
          return byte >= 32 && byte <= 126 ? char : '.';
        })
        .join('');
      result += line + '\n';
    }
    return result;
  }
</script>
