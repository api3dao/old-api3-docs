<!--
  This component displays a list of all protocol contracts and their chain. If the chain
  is not listed in /docs/.vuepress/chains.json then any address related to it will not 
  appear in this component.
-->

<template>
  <div v-if="loaded === true">
    <!-- LOADING IMAGE -->

    <!-- ERROR -->
    <p v-show="error !== null" class="contract-addresses-error">
      The Contract list failed to load: ({{ error }})
    </p>

    <!-- OUTER CONTRACT LIST -->
    <div v-show="error == null">
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
            v-bind:class="{
              contract_tr_highlight: item.chain.important,
            }"
          >
            <td>
              {{ item.chain.fullname }}
            </td>
            <td>
              {{ item.chainId }}
            </td>
            <td NOWRAP>
              <!--a
                target="_etherscan"
                :href="'https://etherscan.io/address/' + item.address"
                :id="contract.contractName + index"
                class="contract-addresses-address"
                >{{ item.address }}</a
              ><ExternalLinkImage /-->

              <span
                :id="
                  item.chain.type + '-' + contract.contractName + '-' + index
                "
                class="contract-addresses-address"
                >{{ item.address }}</span
              >
              <CopyIcon :text="item.address" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <div v-else>
    <div style="padding-left: 55px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import chainsRef from '../../chains.json';
export default {
  name: 'ContractAddresses',
  props: ['type'],
  data: () => ({
    loaded: false,
    showSpinner: true,
    error: null,
    contracts: [],
    chains: {},
  }),
  methods: {
    /** Create a chain JSON obj from the chainNames
     * received from the repo. Add in the type (mainnet or testnet)
     * and if important (1, ropsten, kovan, goerli, rinkeby).
     */
    buildChainsObj(repoChains) {
      for (const chainId in repoChains) {
        let chain = {};
        this.chains[chainId] = { name: repoChains[chainId] };

        // Set the network type (mainnet or testnet).
        this.chains[chainId].type = chainsRef[chainId].type;

        // Set (mainnet, ropsten, kovan, goerli, rinkeby) as important for display purpose.
        // Note: chainId is a string
        const important = ['1', '3', '4', '5', '42'];
        if (important.includes(chainId)) {
          this.chains[chainId].important = true;
        }
        // Add fullname
        if (chainsRef[chainId]) {
          this.chains[chainId].fullname = chainsRef[chainId].fullname;
        } else {
          this.chains[chainId].fullname = this.chains[chainId].name + '*';
        }
      }
    },
  },
  mounted() {
    this.$nextTick(async function () {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/airnode/master/packages/airnode-protocol/deployments/references.json'
        );

        // These are holders of specific chains that go on top of each contract's
        // array, under them chains are sort A-Z.
        // In testnets, start with ropsten, rinkeby, goerli, kovan,
        // then continue with the others in A-Z order.
        let mainnetObj = [];
        let ropstenObj = [];
        let rinkebyObj = [];
        let goerliObj = [];
        let kovanObj = [];

        // Pull the chainNames from resp
        this.buildChainsObj(response.data.chainNames);
        delete response.data['chainNames'];
        // Jun 2022, networks was add to the payload, not needed.
        // See GitHub issue 833
        delete response.data['networks'];

        // Create a list of contracts with addresses
        for (const key in response.data) {
          // ADDRESSES
          let addresses = [];
          for (const chainId in response.data[key]) {
            const add = {
              address: response.data[key][chainId],
              chainId: chainId,
              chain: this.chains[chainId] || { name: 'Unknown' },
            };
            if (add.chainId === '1') mainnetObj = add;
            else if (add.chainId === '3') ropstenObj = add;
            else if (add.chainId === '4') rinkebyObj = add;
            else if (add.chainId === '5') goerliObj = add;
            else if (add.chainId === '42') kovanObj = add;
            else addresses.push(add);
          }
          addresses = addresses.filter((item) => item.chain.type === this.type);
          // Sort addresses by chain name
          addresses.sort((a, b) => (a.chain.name > b.chain.name ? 1 : -1));

          // Move mainnet to top, then  special testnets
          addresses.unshift(kovanObj);
          addresses.unshift(goerliObj);
          addresses.unshift(rinkebyObj);
          addresses.unshift(ropstenObj);
          addresses.unshift(mainnetObj);

          // Build contract with addresses
          let contract = { contractName: key, addresses: addresses };
          this.contracts.push(contract);
        }

        // Need to reorder the response.data by contract
        // AirnodeRrp (first), RequesterAuthorizerWithAirnode, AccessControlRegistry,
        // then any "other" contracts that might be present

        // AccessControlRegistry
        let index = this.contracts.findIndex(
          (x) => x.contractName === 'AccessControlRegistry'
        );
        let contract = this.contracts.splice(index, 1);
        this.contracts.unshift(contract[0]);
        // RequesterAuthorizerWithAirnode
        index = this.contracts.findIndex(
          (x) => x.contractName === 'RequesterAuthorizerWithAirnode'
        );
        contract = this.contracts.splice(index, 1);
        this.contracts.unshift(contract[0]);
        // AirnodeRrp
        index = this.contracts.findIndex(
          (x) => x.contractName === 'AirnodeRrp'
        );
        contract = this.contracts.splice(index, 1);
        this.contracts.unshift(contract[0]);
      } catch (err) {
        this.error = err.toString();
        console.error('error:', this.error);
      }

      // Page state
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
.contract-addresses-copy-icon{
    margin-left:5px
    cursor:pointer;
    height:11px;
}
.contract_tr_highlight td {
  background-color: #e5ecf9;
  /*-webkit-transition: all 1s linear;*/
}
</style>
