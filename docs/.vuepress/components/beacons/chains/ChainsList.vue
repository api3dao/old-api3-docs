<!--
  This component displays a list of all chains sorted by name.
-->

<template>
  <div>
    <div v-if="loaded === true">
      <p v-show="error !== null" class="bc-chains-list-error">
        The chain list failed to load: ({{ error }})
      </p>
      <div v-show="!error">
        <div style="margin-top: 4px; font-size: small">
          Chains: ({{ chainsCnt }})
        </div>
        <hr />

        <!-- Start chain list -->
        <div
          class="bc-chains-box"
          v-for="chain in chains"
          v-bind:key="chain.name"
        >
          <beacons-chains-ChainsItem :chain="chain" />
        </div>
      </div>
    </div>
    <div v-else style="padding-left: 155px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { chains, beacons } from './opsexport.json';

export default {
  name: 'ChainsList',
  data: () => ({
    loaded: false,
    showSpinner: true,
    error: null,
    chains: undefined,
    chainsCnt: Number,
  }),
  mounted() {
    this.$nextTick(function () {
      this.loadChainsFromRepo();
    });
  },
  methods: {
    async loadChainsFromRepo() {
      try {
        /*const response = await axios.get(
          'https://api.api3labs.link/operations/chains'
        );

       
        console.log('chains', response);

        this.chains = response.data.payload;*/

        this.chains = chains;
        this.chains = this.sortByName(this.chains);
        var keys = [];
        for (var k in this.chains) keys.push(k);
        this.chainsCnt = keys.length;
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
    },
    /// Sorts the chains json object by its root keys which is the chain names.
    sortByName(o) {
      return Object.keys(o)
        .sort()
        .reduce((r, k) => ((r[k] = o[k]), r), {});
    },
  },
};
</script>

<style>
.bc-chains-list-error {
  color: red;
}
.bc-chains-box {
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 620px;
}
</style>
