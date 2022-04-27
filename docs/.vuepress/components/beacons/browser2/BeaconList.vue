<!--
  This component displays a list of all Beacons sorted by name.
  It loads from the operations repo real-time.
-->

<template>
  <!--  Use of v-show (not v-if) is important. 
        The searchText may need to be updated in mount() 
        and thus the input field must be in hte DOM. 
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
      <hr />

      <!-- item line -->
      <beacons-browser2-BeaconItem
        v-for="(item, i) in beacons"
        v-bind:key="'B' + i"
        v-bind:beacon="item"
        v-bind:cnt="i"
      ></beacons-browser2-BeaconItem>
    </div>

    <div style="padding: 55px" v-show="showSpinner">
      <img src="/img/spinner.gif" />
    </div>
    <div v-show="error !== null" class="b2-beacon-list-error">
      The Beacon list failed to load: ({{ error }})
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import providers from '../../../api-providers.json';
import { globalStore } from '../../../enhanceApp.js';

export default {
  name: 'BeaconList',
  data: () => ({
    loaded: false,
    showSpinner: false,
    error: null,
    beacons: [],
  }),
  mounted() {
    this.$nextTick(function () {
      if (globalStore.beacons === undefined) {
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
      }
    });
  },
  methods: {
    async loadBeaconsFromRepo() {
      try {
        /*const responseB = await axios.get(
          'https://api.api3labs.link/operations/beacons'
        );
        console.log('===============================================');
        console.log(responseB);*/

        const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/operations/v0.1/data/documentation_metadata.json'
        );

        for (let i = 0; i < response.data.beacons.length; i++) {
          let item = response.data.beacons[i];
          // Build the grafana URLs
          item.grafanaURL =
            'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?orgId=1&var-chainId=4&var-beaconId=' +
            item.beaconId +
            '&theme=light&panelId=2';
          item.grafanaDeviationURL =
            'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?var-chainId=4&orgId=1&theme=light&panelId=3&var-beaconId=' +
            item.beaconId;

          item.url = providers[item.apiName].url;
          item.content =
            item.templateName.toLowerCase() +
            ' ' +
            item.apiName.toLowerCase() +
            ' ' +
            item.description.toLowerCase() +
            ' ' +
            item.chains.toString().toLowerCase().replace(/,/g, ' ');
        }
        // Move beacons to globalStore and the beacon list.
        globalStore.beacons = response.data.beacons;
        globalStore.beacons.sort(this.sortByName);
        this.beacons = globalStore.beacons;
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
    },
    sortByName(a, b) {
      if (b.templateName.toLowerCase() > a.templateName.toLowerCase()) {
        return -1;
      }
      if (b.templateName.toLowerCase() < a.templateName.toLowerCase()) {
        return 1;
      }
      return 0;
    },
    find() {
      let text = this.$el.querySelector('#searchText').value.toLowerCase();
      globalStore.beaconFind = text.length > 0 ? text : undefined;
      const arr = text.split(' ');

      globalStore.beacons.forEach((item) => {
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
</style>
