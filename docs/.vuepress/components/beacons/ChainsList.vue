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
          class="bc-chain-box"
          v-for="chain in chains"
          v-bind:key="chain.name"
        >
          <img
            :src="chain.logoPath"
            width="33px;"
            style="float: left; margin-top: -4px; margin-right: 15px"
          />
          <span class="bc-chain-name">{{ chain.name }}</span>

          <!-- Start contract list -->
          <hr style="margin-left: 48px" />
          <div
            class="bc-contract-address"
            v-for="(address, key) in chain.contracts"
            v-bind:key="address"
          >
            {{ key }}: <span>{{ address }}</span
            ><CopyIcon :text="address" />
          </div>
          <!-- End contract list-->
        </div>
        <!-- End chain list-->
      </div>
    </div>
    <div v-else style="padding-left: 155px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChainsList',
  data: () => ({
    loaded: false,
    showSpinner: true,
    error: null,
    chains: {},
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
        const response = await axios.get(
          'https://api.api3labs.link/operations/chains'
        );
        console.log('chains', response);

        this.chains = response.data.payload;
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
.bc-chain-box {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 620px;
}
.bc-chain-name {
  font-size: large;
}
.bc-contract-address {
  font-family: courier;
  font-size: small;
  margin-left: 48px;
}
</style>
