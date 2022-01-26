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
      class="beacon-filter-input"
      v-on:keyup="find($event)"
      placeholder="Filter (contains all)"
    />
    <hr />
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
import { beaconInfo } from './beaconInfo.json';
import { env } from '../../config.js';
import axios from 'axios';

export default {
  name: 'BeaconList',
  props: { tab: String },
  data: () => ({
    beaconInfo: beaconInfo,
    env: env,
    showCatalog: true,
    showDetail: false,
    loaded: false,
    row: 0, // User selected row.
    lastScrollPosition: 0, // The last know scroll position.
    beacons: [],
  }),
  mounted() {
    this.$nextTick(async function () {
      // Get the Beacons from GitHub
      const response = await axios.get(
        'https://raw.githubusercontent.com/api3dao/operations/amberdata-lite-deployment/data/apis/Amberdata/documentation_beacons_lite.json'
      );
      // item,show needs to be set before copying the response data to the beacons array
      for (let i = 0; i < response.data.length; i++) {
        let item = response.data[i];
        item.show = true;
        item.name = this.beaconInfo[item.beaconId].name || '?';
        item.desc = this.beaconInfo[item.beaconId].desc || '?';
        item.provider = this.beaconInfo[item.beaconId].provider || '?';
        item.content = this.beaconInfo[item.beaconId].content;
        item.tag = this.beaconInfo[item.beaconId].tag || '?';
        item.content +=
          ' ' +
          item.name.toLowerCase() +
          ' ' +
          item.beaconId.toLowerCase() +
          ' ' +
          item.desc.toLowerCase() +
          ' ' +
          item.provider.toLowerCase() +
          ' ' +
          item.tag.toLowerCase();
      }
      this.beacons = response.data;
      this.loaded = true;
      this.beacons.sort(this.sortByName);
    });
  },
  methods: {
    sortByName(a, b) {
      if (b.name.toLowerCase() > a.name.toLowerCase()) {
        return -1;
      }
      if (b.name.toLowerCase() < a.name.toLowerCase()) {
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
h4 {
  margin-bottom: -10px;
}
.beacon-filter-input {
  margin-top: 10px;
  font-size: large;

  width: 98%;
  max-width: 560px;
  border: 2px solid lightgrey;
  border-radius: 2px;
  padding: 3px;
}
</style>
