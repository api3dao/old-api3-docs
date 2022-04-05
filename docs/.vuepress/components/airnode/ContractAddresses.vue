<!--
  This component displays a list of all protocol contracts and their chain. If the chain
  is not listed in /docs/.vuepress/chains.json then any address related to it will not 
  appear in this component.
-->

<template>
  <div v-if="loaded === true">
    <!-- LOADING IMAGE -->
    <div style="padding-left: 55px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
    <!-- ERROR -->
    <p v-show="error !== null" class="contract-addresses-error">
      The Chain list failed to load: ({{ error }})
    </p>

    <!-- OUTER CONTRACT LIST -->
    <div v-for="(contract, index) in contracts" :key="index">
      <h3>{{ contract.contractName }}</h3>
      <table>
        <th class="contract-addresses-heading">Chain</th>
        <th class="contract-addresses-heading">Chain ID</th>
        <th class="contract-addresses-heading">Contract Address</th>
        <tr
          v-for="(item, index) in contract.addresses"
          v-bind:key="index"
          v-show="type === item.chain.type"
        >
          <td
            v-bind:class="{
              contract_addresses_mainnet: item.chain.name === 'mainnet',
            }"
          >
            {{ item.chain.name }}
          </td>
          <td
            v-bind:class="{
              contract_addresses_mainnet: item.chain.name === 'mainnet',
            }"
          >
            {{ item.chainId }}
          </td>
          <td
            v-bind:class="{
              contract_addresses_mainnet: item.chain.name === 'mainnet',
            }"
          >
            <span class="contract-addresses-address">{{ item.address }}</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import chains from '../../chains.json';
export default {
  name: 'ContractAddresses',
  props: ['type'],
  data: () => ({
    loaded: false,
    showSpinner: true,
    error: null,
    contracts: [],
  }),
  mounted() {
    this.$nextTick(async function () {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/airnode/master/packages/airnode-protocol/deployments/references.json'
        );

        let mainnetObj = [];
        // Create a list of contracts with addresses
        for (const key in response.data) {
          // ADDRESSES
          let addresses = [];
          for (const key2 in response.data[key]) {
            const add = {
              address: response.data[key][key2],
              chainId: key2,
              chain: chains[key2] || { name: 'Unknown' },
            };
            if (add.chainId === '1') mainnetObj = add;
            else addresses.push(add);
          }
          addresses = addresses.filter((item) => item.chain.type === this.type);
          // Sort addresses by  chain name
          addresses.sort((a, b) => (a.chain.name > b.chain.name ? 1 : -1));

          // Move mainnet to top
          addresses.unshift(mainnetObj);

          // Build contract with addresses
          let contract = { contractName: key, addresses: addresses };
          this.contracts.push(contract);
        }
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
    });
  },
};
</script>

<style lang="stylus">

.contract-addresses-address{
    font-family: courier;
    font-size: small;
}
.contract-addresses-heading{
    text-align:left;
}
.contract-addresses-error{
    color:red;
}
.contract-addresses-table tr:nth-child(even) td {
  background: white;
}
.contract_addresses_mainnet{
    background:#e5ecf9;
}
</style>
