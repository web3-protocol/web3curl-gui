
<template>

  <div class="main">
    <div class="basic-infos">
      <div>
        <span class="title">HTTP status code:</span> {{ fetchedUrl.httpCode }}
      </div>
      <div>
        <span class="title">Content type:</span> 
        {{ contentTypeHeaderValue }}
        <span v-if="fetchedUrl.httpCode != null && contentTypeHeaderValue == null" class="text-warning"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> 
          No Content-type
          <span v-if="fetchedUrl.parsedUrl.mode == 'auto'">
            : Consider using <a href="https://docs.web3url.io/web3-url-structure/resolve-mode/mode-auto#mime.content-and-mime.type" target="_blank">?mime.type or ?mime.content</a>
          </span>
        </span>
      </div>
    </div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link" :class="{ 'active': activeTab === 'preview' }" @click="changeTab('preview')" id="preview-tab" type="button" role="tab">Preview</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ 'active': activeTab === 'previewInGateway' }" @click="changeTab('previewInGateway')" id="preview-in-gateway-tab" type="button" role="tab">Preview in gateway</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ 'active': activeTab === 'bytes' }" @click="changeTab('bytes')" id="bytes-tab" type="button" role="tab">Bytes</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ 'active': activeTab === 'httpHeaders' }" @click="changeTab('httpHeaders')" id="http-headers-tab" type="button" role="tab">HTTP headers <span v-if="fetchedUrl.output != null">({{ Object.entries(fetchedUrl.httpHeaders).length }})</span></button>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'preview' }">

        <span class="iframe-helptext" v-if="contentTypeHeaderValue == 'text/html'"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> Warning: Linked <code>web3://</code> CSS/JS files won't load, as the browser don't know how to load them. Any <code>web3://</code> links won't work as well. Use "Preview in gateway" for a live preview.</span>
        <iframe :src="dataUrlPreview"></iframe>

      </div>
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'previewInGateway' }">
        
        <span class="iframe-helptext" v-if="contentTypeHeaderValue == 'text/html'"><font-awesome-icon :icon="['fas', 'triangle-exclamation']" /> Warning: Loaded via an external <a href="https://docs.web3url.io/web3-clients/https-gateway" target="_blank"><code>web3://</code> gateway</a>, so that the linked CSS/JS/... ressources are loaded. <br />The gateway result may differ due to different chain configuration (different RPC provider, domain name supported, ...)</span>
        <iframe :src="gatewayPreviewUrl"></iframe>

      </div>
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'bytes' }">
        
        <div style="display: flex; gap: 20px">
          <pre>{{ formatBytesBufferToHex(outputBuffer) }}</pre>
          <pre>{{ formatBytesBufferToAscii(outputBuffer) }}</pre>
        </div>
        
      </div>
      <div class="tab-pane fade" :class="{ 'show active': activeTab === 'httpHeaders' }">
        
        <table class="table">
          <thead>
            <tr>
              <th>Header</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, header) in fetchedUrl.httpHeaders" :key="header">
              <td>{{ header }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, defineProps, computed, watch } from 'vue';

  const props = defineProps({
    fetchedUrl: {
      type: Object,
      required: true
    },
    outputBuffer: {
      type: Uint8Array,
      required: true
    },
    loadingStep: {
      type: String
    }
  });
  const dataUrlPreview = ref('')

  const activeTab = ref('preview');

  function changeTab(tab) {
    activeTab.value = tab;
  }

  const contentTypeHeaderValue = computed(() => {
    return getContentTypeHeaderValue()
  });

  const gatewayPreviewUrl = computed(() => {
    if(props.fetchedUrl.parsedUrl == null || props.fetchedUrl.parsedUrl.url == null) {
      return;
    }

    // Parse the URL
    let matchResult = props.fetchedUrl.parsedUrl.url.match(/^(?<protocol>[^:]+):\/\/(?<hostname>[^:/?]+)(:(?<chainId>[1-9][0-9]*))?(?<path>.*)?$/)
    if(matchResult == null) {
      // Invalid web3:// URL
      return;
    }
    let urlMainParts = matchResult.groups

    // Check protocol name
    if(["web3", "w3"].includes(urlMainParts.protocol) == false) {
      // Bad protocol name"
      return;
    }

    // Get subdomain components
    let gateway = "w3link.io"
    let subDomains = []
    // Is the contract an ethereum address?
    if(/^0x[0-9a-fA-F]{40}$/.test(urlMainParts.hostname)) {
      subDomains.push(urlMainParts.hostname)
      if(urlMainParts.chainId !== undefined) {
        subDomains.push(urlMainParts.chainId)
      }
      else {
        gateway = "w3eth.io"
      }
    }
    // It is a domain name
    else {
      // ENS domains on mainnet have a shortcut
      if(urlMainParts.hostname.endsWith('.eth') && urlMainParts.chainId === undefined) {
        gateway = "w3eth.io"
        subDomains.push(urlMainParts.hostname.slice(0, -4))
      }
      else {
        subDomains.push(urlMainParts.hostname)
        if(urlMainParts.chainId !== undefined) {
          subDomains.push(urlMainParts.chainId)
        }
      }
    }

    let gatewayUrl = "https://" + subDomains.join(".") + "." + gateway + (urlMainParts.path ?? "")
    return gatewayUrl;
  });

  // On outputBuffer change
  watch(() => props.outputBuffer, async (newOutputBuffer, oldOutputBuffer) => {
    // Length of 0 : return right away
    if(newOutputBuffer.length === 0) {
      dataUrlPreview.value = '';
      return;
    }

    // If content type is text/html, and tab is preview, switch to preview in gateway
    if(contentTypeHeaderValue.value == 'text/html' && activeTab.value == 'preview') {
      activeTab.value = 'previewInGateway';
    }

    //
    // Update the iframe preview: build a dataurl, insert it
    //

    // Create a blob containing the outputBuffer
    const contentType = contentTypeHeaderValue.value;
    let blobOptions = {};
    if(contentType) {
      blobOptions = { type: contentType };
    }
    const blob = new Blob([newOutputBuffer], blobOptions);

    // use a FileReader to generate a base64 data URI:
    const base64url = await new Promise(r => {
      const reader = new FileReader()
      reader.onload = () => r(reader.result)
      reader.readAsDataURL(blob)
    });
    dataUrlPreview.value = await base64url;
  })

  function getContentTypeHeaderValue() {
    let result = ''

    if(props.fetchedUrl.httpHeaders) {
      // Convert header keys to lowercase
      const headers = Object.keys(props.fetchedUrl.httpHeaders).reduce((acc, key) => {
        acc[key.toLowerCase()] = props.fetchedUrl.httpHeaders[key];
        return acc;
      }, {});
      result = headers['content-type'];
    }
    return result;
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

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .basic-infos {
    display: flex;
    gap: 20px;
  }

  .basic-infos .title {
    font-weight: bold;
  }

  .iframe-helptext {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    color: #6c757d;
    text-align: center;
  }

  iframe {
    width: 100%;
    border: none;
    height: 600px;
  }
</style>