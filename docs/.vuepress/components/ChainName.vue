<!--
  This component displays the fullname (display name) of a chain. It
  takes one arg, the chain ID. The ID is used to look up the chain from
  chains.json.
-->

<template>
  <span>{{ chainName }}</span>
</template>

<script>
import chainsRef from '../chains.json';

export default {
  name: 'ChainsName',
  props: ['chainId'],
  data: () => ({
    chainName: '',
  }),
  mounted() {
    this.$nextTick(async function () {
      this.chainName = chainsRef[this.chainId].fullname;
    });
  },
};
</script>
