<!--
  This component displays a list of all Beacons sorted by name.
  It loads from the operations repo real-time and merges its JSON
  file with a local JSON file to get additional attributes.
-->

<template>
  <div v-if="loaded === true">
    <!-- Filter -->
    <input
      id="searchText"
      spellcheck="false"
      class="beacon-filter-input"
      v-on:keyup="find($event)"
      placeholder="Filter (must contain all)"
    />
    <hr />
    <div style="padding-left: 55px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
    <p v-show="error !== null" class="error">
      The Beacon list failed to load: ({{ error }})
    </p>
    <!-- Beacon List -->
    <beacons-BeaconItem
      v-for="(item, i) in beacons"
      v-bind:key="'B' + i"
      v-bind:beacon="item"
      v-show="item.show"
    ></beacons-BeaconItem>
  </div>
</template>

<script>
//import { beaconInfo } from './beaconInfo.json';
//import { env } from '../../config.js';
import axios from 'axios';

export default {
  name: 'BeaconList',
  data: () => ({
    //beaconInfo: beaconInfo,
    //env: env,
    //showCatalog: true,
    //showDetail: false,
    loaded: false,
    showSpinner: false,
    error: null,
    //row: 0, // User selected row.
    //lastScrollPosition: 0, // The last know scroll position.
    beacons: [],
  }),
  mounted() {
    this.$nextTick(async function () {
      try {
        // Get the Beacons from GitHub
        this.showSpinner = true;
        this.error = null;
        const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/operations/83e503ef480a7350dd432d57b182f08e358c4f2f/data/documentation_metadata.json'
          //'https://raw.githubusercontent.com/api3dao/operations/amberdata-lite-deployment/data/apis/Amberdata/documentation_beacons_lite.json'
        );
        // item.show needs to be set before copying the response data to the beacons array
        for (let i = 0; i < response.data.length; i++) {
          let item = response.data[i];
          item.show = true;
          item.showDetails = false;
          item.content =
            item.templateName.toLowerCase() +
            ' ' +
            item.apiName.toLowerCase() +
            ' ' +
            item.chains.toString().toLowerCase().replace(/,/g, ' ');
        }
        this.beacons = response.data;
        this.beacons.sort(this.sortByName);
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
    });
  },
  methods: {
    sortByName(a, b) {
      if (b.templateName.toLowerCase() > a.templateName.toLowerCase()) {
        return -1;
      }
      if (b.templateName.toLowerCase() < a.templateName.toLowerCase()) {
        return 1;
      }
      return 0;
    },
    find(event) {
      let text = this.$el.querySelector('#searchText').value.toLowerCase();
      const arr = text.split(' ');

      this.beacons.forEach((item) => {
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
        });
      });
    },
  },
};
</script>

<style>
/* BeaconItem.vue will see this import. */
@import '../../styles/switcher.styl';

h4 {
  margin-bottom: -10px;
}
.error {
  color: red;
}
.beacon-filter-input {
  margin-top: 10px;
  font-size: large;

  width: 98%;
  max-width: 630px;
  border: 2px solid lightgrey;
  border-radius: 2px;
  padding: 3px;
}
</style>
