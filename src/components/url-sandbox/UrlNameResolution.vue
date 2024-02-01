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
        <span>Resolver: </span>
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
        <span>Domain name resolver: </span>
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
      </div>

      <div class="entry">
        <span>contentcontract TXT field: </span>
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
      </div>

      <div class="entry">
        <span>Standard name resolution: </span>
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
      </div>

      <div class="entry">
        <span>Result: </span>
        <Loader :loading="loadingStep == '1.2' && parsedUrl.contractAddress == null">
          <span v-if="parsedUrl.contractAddress != null">
            <span v-if="parsedUrl.nameResolution.resolveNameCall">
              <ContractAddress :address="parsedUrl.nameResolution.resultAddress" :chainId="parsedUrl.nameResolution.resultChainId ?? parsedUrl.nameResolution.resolverChainId" :chainList="chainList" />
            </span>
            <span v-else>
              (not made)
            </span>
          </span>
        </Loader>
      </div>
    </template>
  </UrlElement>
</template>

<script setup>
  import Loader from '../common/Loader.vue';
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

  const isExpanded = ref(false);


</script>
