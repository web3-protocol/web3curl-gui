<template>
  <span>
    <a v-if="chainId in chainExplorerUrls" :href="chainExplorerUrls[chainId].replace('<address>', address)" target="_blank">
      {{ address }}
    </a>
    <span v-else>
      {{ address }}
    </span>
    @
    <span v-if="chainList.find(chain => chain.id == chainId)">
      {{ chainList.find(chain => chain.id == chainId).name }} 
      <span v-if="chainId != 1">
        (id {{ chainId }})
      </span>
    </span>
    <span v-else>
      chain id {{ chainId }}
    </span>
  </span>
</template>

<script setup>
  const props = defineProps({
    address: {
      type: String,
      required: true
    },
    chainId: {
      type: Number,
      required: true
    },
    chainList: {
      type: Array,
      required: true
    },
  });

  const chainExplorerUrls = {
    1: "https://etherscan.io/address/<address>#code",
    5: "https://goerli.etherscan.io/address/<address>#code",
    11155111: "https://sepolia.etherscan.io/address/<address>#code",
    137: "https://polygonscan.com/address/<address>#code",
    42170: "https://nova.arbiscan.io/address/<address>#code",
    10: "https://optimistic.etherscan.io/address/<address>#code",
  }
</script>