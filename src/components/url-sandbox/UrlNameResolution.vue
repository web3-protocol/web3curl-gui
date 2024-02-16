<template>
  <UrlElement>
    <template #header-name>
      Domain name resolution: 
    </template>

    <template #header-value>
      <Loader :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null">
        <span v-if="parsedUrl.contractAddress != null">
          <span v-if="parsedUrl.nameResolution.resolver">
            <ContractAddress :address="parsedUrl.contractAddress" :chainId="parsedUrl.chainId" :chainList="chainList" />
          </span>
          <span v-else>
            (none)
          </span>
        </span>
      </Loader>
    </template>
  

    <template #body>
      <div class="entry">
        <span class="title">Resolver: </span>
        <Loader :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null">
          <span v-if="parsedUrl.contractAddress != null">
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
        </Loader>
      </div>


      <div class="entry">
        <div class="entry-header">
          <button
            :disabled="parsedUrl.nameResolution?.fetchNameResolverCall == null"
            @click="isFetchNameResolverCallExpanded = !isFetchNameResolverCallExpanded" 
            class="btn btn-outline-secondary btn-sm btn-contract-detail-expander">
            <font-awesome-icon v-if="isFetchNameResolverCallExpanded == false" :icon="['fas', 'chevron-right']" />
            <font-awesome-icon v-if="isFetchNameResolverCallExpanded == true" :icon="['fas', 'chevron-down']" />
          </button>
          
          <span
            :class="{clickable: parsedUrl.nameResolution?.fetchNameResolverCall != null}" 
            @click="parsedUrl.nameResolution?.fetchNameResolverCall != null && (isFetchNameResolverCallExpanded = !isFetchNameResolverCallExpanded)">
            <span class="title">Domain name resolver: </span>
            <Loader :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null">
              <span v-if="parsedUrl.contractAddress != null">
                <span v-if="parsedUrl.nameResolution.fetchNameResolverCall">
                  <ContractAddress :address="parsedUrl.nameResolution.fetchNameResolverCall.decodedResult" :chainId="parsedUrl.nameResolution.resolverChainId" :chainList="chainList" />
                </span>
                <span v-else>
                  (not made)
                </span>
              </span>
            </Loader>
          </span>
        </div>

        <div class="smart-contract-call" v-if="isFetchNameResolverCallExpanded">
          <ContractCall
            :smartContractCall="parsedUrl.nameResolution?.fetchNameResolverCall"
            :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null"
            :chainList />
        </div>
      </div>


      <div class="entry">
        <div class="entry-header">
          <button
            :disabled="parsedUrl.nameResolution?.erc6821ContentContractTxtCall == null"
            @click="isErc6821ContentContractTxtCallExpanded = !isErc6821ContentContractTxtCallExpanded" 
            class="btn btn-outline-secondary btn-sm btn-contract-detail-expander">
            <font-awesome-icon v-if="isErc6821ContentContractTxtCallExpanded == false" :icon="['fas', 'chevron-right']" />
            <font-awesome-icon v-if="isErc6821ContentContractTxtCallExpanded == true" :icon="['fas', 'chevron-down']" />
          </button>

          <span 
            :class="{clickable: parsedUrl.nameResolution?.erc6821ContentContractTxtCall != null}" 
            @click="parsedUrl.nameResolution?.erc6821ContentContractTxtCall != null && (isErc6821ContentContractTxtCallExpanded = !isErc6821ContentContractTxtCallExpanded)">
            <span class="title">contentcontract TXT field: </span>
            <Loader :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null">
              <span v-if="parsedUrl.contractAddress != null">
                <span v-if="parsedUrl.nameResolution.erc6821ContentContractTxtCall">
                  {{ parsedUrl.nameResolution.erc6821ContentContractTxtCall.decodedResult }}
                </span>
                <span v-else>
                  (not made)
                </span>
              </span>
            </Loader>
          </span>
        </div>

        <div class="smart-contract-call" v-if="isErc6821ContentContractTxtCallExpanded">
          <ContractCall
            :smartContractCall="parsedUrl.nameResolution?.erc6821ContentContractTxtCall"
            :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null"
            :chainList />
        </div>
      </div>


      <div class="entry">
        <div class="entry-header">
          <button
            :disabled="parsedUrl.nameResolution?.resolveNameCall == null"
            @click="isResolveNameCallExpanded = !isResolveNameCallExpanded" 
            class="btn btn-outline-secondary btn-sm btn-contract-detail-expander">
            <font-awesome-icon v-if="isResolveNameCallExpanded == false" :icon="['fas', 'chevron-right']" />
            <font-awesome-icon v-if="isResolveNameCallExpanded == true" :icon="['fas', 'chevron-down']" />
          </button>

          <span
            :class="{clickable: parsedUrl.nameResolution?.resolveNameCall != null}" 
            @click="parsedUrl.nameResolution?.resolveNameCall != null && (isResolveNameCallExpanded = !isResolveNameCallExpanded)">
            <span class="title">Standard name resolution: </span>
            <Loader :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null">
              <span v-if="parsedUrl.contractAddress != null">
                <span v-if="parsedUrl.nameResolution.resolveNameCall">
                  <ContractAddress :address="parsedUrl.nameResolution.resolveNameCall.decodedResult" :chainId="parsedUrl.nameResolution.resolverChainId" :chainList="chainList" />
                </span>
                <span v-else>
                  (not made)
                </span>
              </span>
            </Loader>
          </span>
        </div>

        <div class="smart-contract-call" v-if="isResolveNameCallExpanded">
          <ContractCall
            :smartContractCall="parsedUrl.nameResolution?.resolveNameCall"
            :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null"
            :chainList />
        </div>
      </div>


      <div class="entry">
        <span class="title">Result: </span>
        <Loader :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null">
          <span v-if="parsedUrl.contractAddress != null">
            <span v-if="parsedUrl.nameResolution.resultAddress">
              <ContractAddress :address="parsedUrl.nameResolution.resultAddress" :chainId="parsedUrl.nameResolution.resultChainId ?? parsedUrl.nameResolution.resolverChainId" :chainList="chainList" />
            </span>
            <span v-else>
              (none)
            </span>
          </span>
        </Loader>
      </div>
    </template>
  </UrlElement>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
  import ContractCall from '../common/ContractCall.vue';
  import ContractAddress from '../common/ContractAddress.vue';
  import UrlElement from './UrlElement.vue';
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
    loadingStep: {
      type: String
    }
  });

  const isFetchNameResolverCallExpanded = ref(false);
  const isErc6821ContentContractTxtCallExpanded = ref(false);
  const isResolveNameCallExpanded = ref(false);


</script>

<style scoped>
  .entry {
    margin-bottom: 5px;
  }
  .entry:last-child {
    margin-bottom: 0;
  }

  .entry-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }

  .entry button {
  }

  .entry .title {
    font-weight: bold;
  }
  .entry .clickable {
    cursor: pointer;
  }

  .btn-contract-detail-expander {

  }

  .smart-contract-call {
    padding-left: 42px;
    padding-top: 2px;
    padding-bottom: 10px;
  }
</style>