<template>
  <div>
    <div id="name-resolution-header">
      <button 
        @click="isExpanded = !isExpanded" 
        class="btn btn-primary">
        <font-awesome-icon v-if="isExpanded == false" :icon="['fas', 'chevron-right']" />
        <font-awesome-icon v-if="isExpanded == true" :icon="['fas', 'chevron-down']" />
      </button>

      <span>Domain name resolution: </span>
      <span v-if="loading && parsedUrl.contractAddress == null">
        Loading...
      </span>
      <span v-else-if="parsedUrl.contractAddress != null">
        <span v-if="parsedUrl.nameResolution.resolver">
          <ContractAddress :address="parsedUrl.contractAddress" :chainId="parsedUrl.chainId" :chainList="chainList" />
        </span>
        <span v-else>
          (none)
        </span>
      </span>
    </div>

    <div id="name-resolution-body" v-show="isExpanded">
      <div class="entry">
        <span>Resolver: </span>
        <span v-if="loading && parsedUrl.contractAddress == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.contractAddress != null">
          {{ parsedUrl.nameResolution.resolver ? parsedUrl.nameResolution.resolver.toUpperCase() : "(none)" }}
          <span v-if="parsedUrl.nameResolution.resolver">
            @
            <span v-if="chainList.find(chain => chain.id == parsedUrl.nameResolution.resolverChainId)">
              {{ chainList.find(chain => chain.id == parsedUrl.nameResolution.resolverChainId).name }} 
              <span v-if="parsedUrl.nameResolution.resolverChainId != 1">
                (id {{ parsedUrl.nameResolution.resolverChainId }})
              </span>
            </span>
            <span v-else>
              chain id {{ parsedUrl.nameResolution.resolverChainId }}
            </span>
          </span>
        </span>
      </div>

      <div class="entry">
        <span>Domain name resolver: </span>
        <span v-if="loading && parsedUrl.contractAddress == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.contractAddress != null">
          <span v-if="parsedUrl.nameResolution.fetchNameResolverCall">
            <ContractAddress :address="parsedUrl.nameResolution.fetchNameResolverCall.decodedResult" :chainId="parsedUrl.nameResolution.resolverChainId" :chainList="chainList" />
          </span>
          <span v-else>
            (not made)
          </span>
        </span>
      </div>

      <div class="entry">
        <span>contentcontract TXT field: </span>
        <span v-if="loading && parsedUrl.contractAddress == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.contractAddress != null">
          <span v-if="parsedUrl.nameResolution.erc6821ContentContractTxtCall">
            {{ parsedUrl.nameResolution.erc6821ContentContractTxtCall.decodedResult }}
          </span>
          <span v-else>
            (not made)
          </span>
        </span>
      </div>

      <div class="entry">
        <span>Standard name resolution: </span>
        <span v-if="loading && parsedUrl.contractAddress == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.contractAddress != null">
          <span v-if="parsedUrl.nameResolution.resolveNameCall">
            <ContractAddress :address="parsedUrl.nameResolution.resolveNameCall.decodedResult" :chainId="parsedUrl.nameResolution.resolverChainId" :chainList="chainList" />
          </span>
          <span v-else>
            (not made)
          </span>
        </span>
      </div>

      <div class="entry">
        <span>Result: </span>
        <span v-if="loading && parsedUrl.contractAddress == null">
          Loading...
        </span>
        <span v-else-if="parsedUrl.contractAddress != null">
          <span v-if="parsedUrl.nameResolution.resolveNameCall">
            <ContractAddress :address="parsedUrl.nameResolution.resultAddress" :chainId="parsedUrl.nameResolution.resultChainId ?? parsedUrl.nameResolution.resolverChainId" :chainList="chainList" />
          </span>
          <span v-else>
            (not made)
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import ContractAddress from '../common/ContractAddress.vue';
  import { ref } from 'vue';

  const props = defineProps({
    parsedUrl: {
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

  const isExpanded = ref(false);


</script>
