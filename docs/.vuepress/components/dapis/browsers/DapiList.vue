<!--
  This component displays a list of all dAPIs sorted by name.
  It loads from GitHub.
-->

<template>
  <div>
    <hr />
    <!-- PANE: list -->
    <div v-show="showList">
      <span>
        <!-- prettier-ignore -->
        <i>Network:</i>
        <select
          id="networkPickList"
          class="dapis-network-picklist"
          @change="loadDapis()"
          v-if="chains"
        >
          <option
            v-for="chain in chains"
            v-bind:key="chain.name"
            :value="chain.name"
          >
            {{ chain.name }} - ({{ chain.id }})
          </option>
        </select>
      </span>
      <br />
      <!-- Filter  -->
      <i>Filter by:</i>
      <input
        id="searchText"
        spellcheck="false"
        class="dapis-list-filter-input"
        v-on:keyup="void find()"
        placeholder="must contain all"
      /><span style="margin-top: 4px; color: gray; font-size: medium">
        ({{ cnt }})</span
      >

      <!-- dAPIs -->
      <div class="dapi-flex-container">
        <div v-for="(item, index) in dAPIs" v-bind:key="index">
          <div v-show="item.show" v-on:click="togglePanes(item)">
            {{ item.name }}
            <div style="">
              {{ item.beacons.length }}
              <img
                src="/img/Beacons-active.png"
                width="17px"
                style="opacity: 40%; float: right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PANE: details -->
    <div v-if="showDetails">
      <dapis-browsers-DapiDetails :dapi="dAPI" />
    </div>

    <div style="padding: 155px" v-show="showSpinner">
      <img src="/img/spinner.gif" />
    </div>
    <div v-show="error" class="b2-beacon-list-error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DapiList',
  data: () => ({
    showList: false,
    showDetails: false,
    showSpinner: true,
    error: undefined,
    chains: undefined,
    dAPIs: [],
    beacons: {},
    data: [],
    dAPI: undefined, // Carries data to DapiDetails.vue via togglePanes()
    cnt: 0,
    scrollY: 0, // Remember Y position when going to details pane
  }),
  mounted() {
    this.$nextTick(function () {
      this.init();
    });
  },
  methods: {
    async init() {
      const responseChains = await axios.get(
        'https://operations-development.s3.amazonaws.com/latest/chains.json '
      );
      this.chains = responseChains.data;
      this.chains = this.sortChainsByName(this.chains);
      // Need delay to set network picklist into DOM
      setTimeout(async () => {
        let element = document.getElementById('networkPickList');
        element.value =
          localStorage.getItem('dapi-network') || 'polygon-testnet';
        await this.loadBeacons();
        await this.loadBeaconSets();
        this.loadDapis();
      }, 1);
    },
    async loadBeacons() {
      const response = await axios.get(
        'https://operations-development.s3.amazonaws.com/latest/apis.json'
      );
      for (var provider in response.data) {
        for (var beacon in response.data[provider].beacons) {
          const id = response.data[provider].beacons[beacon].beaconId;
          this.beacons[id] = response.data[provider].beacons[beacon];
        }
      }
    },
    async loadBeaconSets() {},
    async loadDapis() {
      this.showList = false;
      this.error = undefined;
      this.showSpinner = true;
      this.dAPIs = [];
      const network = document.getElementById('networkPickList').value;
      localStorage.setItem('dapi-network', network);
      try {
        const responseDapis = await axios.get(
          'https://operations-development.s3.amazonaws.com/latest/dapis/' +
            network +
            '.json'
        );
        // Construct a dAPI complex object
        for (var dAPI in responseDapis.data) {
          const datafeedId = responseDapis.data[dAPI]; // Get the dAPI's beacon/setId
          const beacon = this.beacons[datafeedId];
          let content = dAPI + ' ';

          // Not sure how to determine NOT a beacon set yet
          let beacons = [];
          // Single beacon
          if (!beacon.beacons) {
            beacons.push(beacon);
            //content += beacon.beaconId + '' + beacon.description;
          }
          // Beacon set
          else {
          }

          let obj = {
            name: dAPI,
            show: true,
            beacons: beacons,
            content: content,
          };
          this.dAPIs.push(obj);
        }
        this.dAPIs.sort(this.sortByName);
        this.cnt = this.dAPIs.length;
        console.log(this.dAPIs);
        this.showSpinner = false;
        this.showList = true;

        /*const response = await axios.get(
          'https://operations-development.s3.amazonaws.com/latest/apis.json'
        );
        console.log('Beacons', response.data);

        const providers = response.data;

        // Providers
        for (var key in providers) {
          const providerKey = key;
          const providerName = providers[key].apiMetadata.name;
          const providerLogo = providers[key].apiMetadata.logoPath;
          let beacons = [];

          // Beacons
          for (var beaconKey in providers[key].beacons) {
            providers[key].beacons[beaconKey].show = true;

            // Get the beacon's template
            const id = providers[key].beacons[beaconKey].templateId;
            // Convert templates json obj to an array
            const templates = Object.values(providers[key].templates);
            providers[key].beacons[beaconKey].template = templates.find(
              (template) => template.templateId === id
            );

            // GRAFANA URLs
            let beaconId = providers[key].beacons[beaconKey].beaconId;
            providers[key].beacons[beaconKey].grafanaURL =
              this.getGrafanaUrl(beaconId);
            providers[key].beacons[beaconKey].grafanaDeviationURL =
              this.getGrafanaDeviationUrl(beaconId);

            // Start content
            providers[key].beacons[beaconKey].content =
              key +
              ' ' +
              providers[key].beacons[beaconKey].name +
              ' ' +
              providers[key].beacons[beaconKey].description;


            for (var chainKey in providers[key].beacons[beaconKey].chains) {
              providers[key].beacons[beaconKey].content += ' ' + chainKey + ' ';
              providers[key].beacons[beaconKey].chains[chainKey].name =
                chainKey;
              providers[key].beacons[beaconKey].chains[chainKey].id =
                this.chains[chainKey].id;
            }
            // Sort the chains by name
            providers[key].beacons[beaconKey].chains = this.sortChainsByName(
              providers[key].beacons[beaconKey].chains
            );
            beacons.push(providers[key].beacons[beaconKey]);
          }
          //
          beacons.sort(this.sortByName);
          this.cnt += beacons.length;
          this.data.push({
            provider: providerKey,
            name: providerName,
            beaconCnt: beacons.length,
            logoPath: providerLogo,
            beacons: beacons,
          });
        }*/
      } catch (err) {
        console.error(err.toString());
        if (err.toString().indexOf('403') > -1) {
          this.error = 'There are currently no dAPIs on this network.';
        } else {
          this.error = err.toString();
        }
      }
      this.showSpinner = false;
      this.showList = true;
    },
    togglePanes(dapi) {
      // If beacon (param) is undefined then this was called by BeaconDetails2.vue
      if (dapi) {
        this.scrollY = window.scrollY;
        // Data to pass to DapiDetails.vue
        this.dAPI = dapi;
      }

      // Toggle the panes
      this.showList = !this.showList;
      this.showDetails = !this.showDetails;

      // Return to last scroll position if dapiList pane active
      if (!this.showDetails) {
        setTimeout(() => {
          window.scrollBy(0, this.scrollY);
        }, 10);
      }
    },
    sortByName(a, b) {
      if (b.name.toLowerCase() > a.name.toLowerCase()) {
        return -1;
      }
      if (b.name.toLowerCase() < a.name.toLowerCase()) {
        return 1;
      }
      return 0;
    },
    /// Sorts the chains json object by its root keys which is the chain names.
    sortChainsByName(o) {
      return Object.keys(o)
        .sort()
        .reduce((r, k) => ((r[k] = o[k]), r), {});
    },
    find() {
      this.cnt = 0;
      let text = this.$el.querySelector('#searchText').value.toLowerCase();
      const arr = text.split(' ');

      this.dAPIs.forEach((dapi) => {
        arr.forEach((str) => {
          if (str.length === 0) {
            dapi.show = true;
            this.cnt++;
          } else if (dapi.content.toLowerCase().indexOf(str) > -1) {
            dapi.show = true;
            this.cnt++;
          } else {
            dapi.show = false;
          }
        });
      });
    },
    getGrafanaUrl(id) {
      return (
        'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?orgId=1&var-chainId=4&var-beaconId=' +
        id +
        '&theme=light&panelId=2'
      );
    },
    getGrafanaDeviationUrl(id) {
      return (
        'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?var-chainId=4&orgId=1&theme=light&panelId=3&var-beaconId=' +
        id
      );
    },
  },
};
</script>

<style>
.b2-beacon-list-error {
  padding: 55px;
  color: red;
}
.dapis-list-filter-input {
  margin-top: 10px;
  margin-left: 3px;
  font-size: large;
  width: 265px;
  max-width: 265px;
  border: 2px s6lid lightgrey;
  border-radius: 2px;
  padding: 3px;
}
.b2-provider-name {
  margin-left: -60px;
  vertical-align: super;
  font-size: x-large;
  font-weight: 400;
}
.dapi-flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
}

.dapi-flex-container > div > div {
  min-width: 205px;
  max-width: 205px;
  width: 205px;
  height: 23px;
  border: 1px solid lightgrey;
  border-radius: 0.3em;
  margin: 8px 8px 8px 5px;
  padding: 5px;
  overflow: auto;
  color: #50c878;
  font-size: 11pt;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 2px 2px 4px lightgrey;
}
.dapi-flex-container > div > div:hover {
  cursor: pointer;
}
/** The beacon cnt and image */
.dapi-flex-container > div > div > div {
  float: right;
  margin-top: -5px;
  font-size: small;
  padding: 5px 5px 5px 10px;
  font-weight: 500;
  font-family: courier;
  color: gray;
}
.dapis-network-picklist {
  font-size: medium;
  color: gray;
  border: 1.5px solid gray;
  border-radius: 5px;
  /* Do not change the below settings. These are needed
     for mobile devices to prevent horizontal scrolling
     of the viewport, excluding margin-top.
  */
  margin-left: 0px;
  max-width: 250px;
}
</style>
