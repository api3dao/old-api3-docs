<!--
  This component displays a list of all Beacons sorted by name.
  It loads from:.
  https://api.api3labs.link/operations
  /explorer
  /dapis
  /beacons
  /apis
  /chains
-->

<template>
  <!--  Use of v-show (not v-if) is important. 
        The searchText may need to be updated in mount() 
        and thus the input field must be in the DOM. 
  -->
  <div>
    <div v-show="loaded === true">
      <!-- Filter  -->
      <input
        id="searchText"
        spellcheck="false"
        class="b2-beacon-list-filter-input"
        v-on:keyup="void find()"
        placeholder="Filter (must contain all)"
      />
      <div style="margin-top: 4px; font-size: small">
        Beacons: ({{ beacons.length }})
      </div>

      <div
        v-for="(provider, key) in providers"
        v-bind:key="key"
        style="margin-top: 7px"
      >
        1(key) - {{ key }}
        <!-- Each provider has a set of keys. Use apiMetadata and beacons, both are JSON Objects. -->
        <div v-for="(item, key) in provider" v-bind:key="item.xpub + ' ' + key">
          <!-- provider heading -->

          <div
            v-show="key === 'apiMetadata'"
            style="border-top: solid 2px lightgrey"
          >
            2(key) - {{ item.xpub + ' ' + key }}
            <img
              style="width: 35px; float: left; margin-top: 2px"
              :src="item.logoPath"
            />
            <div class="b2-provider-name">
              {{ item.name }}
            </div>
          </div>
          <!-- Beacons -->
          <div v-show="key === 'beacons'" class="flex-container">
            <div v-for="beacon in item" v-bind:key="beacon.beaconId">
              {{ beacon.beaconId }}
              <div v-show="beacon.show">
                {{ beacon.name }}
                <div>{{ beacon.show }} - {{ beacon.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="padding: 155px" v-show="showSpinner">
      <img src="/img/spinner.gif" />
    </div>
    <div v-show="error !== null" class="b2-beacon-list-error">
      The Beacon list failed to load: ({{ error }})
    </div>
    <!-- PANE display a beacons details -->
    <div v-show="showBeaconDetails">A beacon</div>
  </div>
</template>

<script>
import axios from 'axios';
import providers from '../../../api-providers.json';
import { globalStore } from '../../../enhanceApp.js';

export default {
  name: 'BeaconList2',
  data: () => ({
    loaded: false,
    showSpinner: false,
    showBeaconDetails: false,
    error: null,
    beacons: [],
    providers: undefined,
  }),
  mounted() {
    this.$nextTick(function () {
      this.showSpinner = true;
      this.loadBeaconsFromRepo();
      /*if (globalStore.beacons === undefined) {
        this.showSpinner = true;
        this.loadBeaconsFromRepo();
      } else {
        this.beacons = globalStore.beacons;
        this.loaded = true;
        // If the user last used a filtered find apply it
        if (globalStore.beaconFind) {
          document.getElementById('searchText').value = globalStore.beaconFind;
          this.find();
        }
      }*/
    });
  },
  methods: {
    async loadBeaconsFromRepo() {
      try {
        const response = await axios.get(
          'https://api.api3labs.link/operations/beacons'
        );
        console.log('\n===============RESPONSE=====================');
        const beaconKeys = response.data.payload.apis.api3.beacons;
        console.log(response);
        this.providers = response.data.payload.apis;
        this.providers['wkande'] = JSON.parse(
          JSON.stringify(response.data.payload.apis.api3)
        );
        this.providers['wkande'].apiMetadata.name = "Warren's Better Beacons";
        this.providers['wkande'].apiMetadata.logoPath = '/img/beacon.png';
        // Add content for the filter
        for (var providerKey in this.providers) {
          for (var beaconKey in this.providers[providerKey].beacons) {
            this.providers[providerKey].beacons[beaconKey].show = true;
            this.providers[providerKey].beacons[beaconKey].content =
              this.providers[providerKey].beacons[beaconKey].name +
              ' ' +
              this.providers[providerKey].beacons[beaconKey].description;
            //console.log(this.providers[providerKey].beacons[beaconKey].chains);
            // Add chain names
            this.providers[providerKey].beacons[beaconKey].chains.forEach(
              (chain) => {
                this.providers[providerKey].beacons[beaconKey].content +=
                  ' ' + chain.name + ' ';
              }
            );
          }
        }
        console.log(2, this.providers);

        /*const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/operations/v0.1/data/documentation_metadata.json'
        );*/
        for (var key in beaconKeys) {
          const item = beaconKeys[key];
          // Build the grafana URLs
          item.grafanaURL =
            'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?orgId=1&var-chainId=4&var-beaconId=' +
            item.beaconId +
            '&theme=light&panelId=2';
          item.grafanaDeviationURL =
            'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?var-chainId=4&orgId=1&theme=light&panelId=3&var-beaconId=' +
            item.beaconId;

          item.provider = {};
          item.provider.name = 'unknown'; // = providers[item.apiName].url || 'unknown';
          item.provider.url = 'https://api3.org';

          // Build the content search data
          item.content = '';
          item.chains.forEach((chain) => {
            //  chains
            if (chain.active === true)
              item.content = item.content + ' ' + chain.name + ' ';
          });
          item.content =
            item.content +
            ' ' + // name and desc
            item.name.toLowerCase() +
            ' ' +
            item.description.toLowerCase();
          this.beacons.push(item);
        }
        this.beacons.sort(this.sortByName);

        // Move beacons to globalStore and the beacon list.
        globalStore.beacons = this.beacons; //response.data.beacons;
        //globalStore.beacons.sort(this.sortByName);
        //this.beacons = globalStore.beacons;
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
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
    find() {
      let text = this.$el.querySelector('#searchText').value.toLowerCase();
      globalStore.beaconFind = text.length > 0 ? text : undefined;
      const arr = text.split(' ');
      console.log(arr);
      for (var providerKey in this.providers) {
        console.log(providerKey);
        for (var beaconKey in this.providers[providerKey].beacons) {
          console.log(beaconKey);
          console.log(this.providers[providerKey].beacons[beaconKey]);

          this.providers[providerKey].beacons[beaconKey].show = undefined;
        }
      }

      /*globalStore.beacons.forEach((item) => {
        let results = [];
        arr.forEach((str) => {
          if (str.length === 0) {
            // Do nothing if an empty values
          } else if (item.content.indexOf(str) > -1) {
            results.push(true);
          } else {
            results.push(false);
          }
          if (results.includes(false)) item.show = false;
          else item.show = true;
          item.showDetails = false; // Close any expanded details (tabs/panes)
        });
      });
      this.beacons = globalStore.beacons.filter((item) => item.show === true);
      */
    },
  },
};
</script>

<style>
.b2-beacon-list-error {
  padding: 55px;
  color: red;
}
.b2-beacon-list-filter-input {
  margin-top: 10px;
  font-size: large;
  width: 97%;
  max-width: 615px;
  border: 2px solid lightgrey;
  border-radius: 2px;
  padding: 3px;
}
.b2-provider-name {
  margin-left: 44px;
  margin-top: 6px;
  font-size: large;
  font-weight: bold;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
}

.flex-container > div > div {
  min-width: 185px;
  max-width: 185px;
  width: 185px;
  height: 84px;
  border: 1px solid lightgrey;

  border-radius: 0.3em;
  margin: 8px 8px 8px 5px;
  padding: 5px;
  overflow: auto;
  color: #50c878;
  font-size: medium;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 2px 2px 4px lightgrey;
}
.flex-container > div > div:hover {
  cursor: pointer;
}
.flex-container > div > div > div {
  font-size: 8.5pt;
  padding: 5px 5px 5px 10px;
  color: gray;
}
</style>
