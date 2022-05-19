<!--
  This component displays a list of all Chains sorted by name.
  It loads from the operations repo real-time.
-->

<template>
  <div>
    <div v-if="error === true" />
    <div v-if="loaded === true">
      <br /><br />
      <div @click="setChildPageData('Rinkeby')">
        <router-link to="./chain-detail.html">Rinkeby</router-link>
      </div>
      <hr />
      <div @click="setChildPageData('Ropsten')">
        <router-link to="./chain-detail.html">Ropsten</router-link>
      </div>

      <hr />
      <router-link to="./chain-detail.html?chain_id=12345">
        <div @click="setChildPageData('Ropsten-2')">Ropsten-2</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChainList',
  data: () => ({
    loaded: false,
    showSpinner: false,
    error: null,
    chains: [],
    chainsFetched: [],
  }),
  mounted() {
    this.loaded = true;
    this.$nextTick(async function () {});
  },
  methods: {
    setChildPageData(name) {
      let childPageData = {
        pageTitle: name,
        chain: { name: name },
      };
      localStorage.setItem('childPageData', JSON.stringify(childPageData));
    },
  },
};
</script>
