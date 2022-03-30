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
      class="b1-beacon-filter-input"
      v-on:keyup="find($event)"
      placeholder="Filter (must contain all)"
    />
    <hr />
    <div style="padding-left: 55px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
    <p v-show="error !== null" class="b1-error">
      The Beacon list failed to load: ({{ error }})
    </p>
    <!-- Beacon List -->
    <beacons-browser-BeaconItem
      v-for="(item, i) in beacons"
      v-bind:key="'B' + i"
      v-bind:beacon="item"
      v-show="item.show"
    ></beacons-browser-BeaconItem>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BeaconList',
  data: () => ({
    loaded: false,
    showSpinner: false,
    error: null,
    beacons: [],
  }),
  mounted() {
    this.$nextTick(async function () {
      try {
        // Get the Beacons from GitHub
        this.showSpinner = true;
        this.error = null;
        const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/operations/main/data/documentation_metadata.json'
        );
        // item.show needs to be set before copying the response data to the beacons array
        for (let i = 0; i < response.data.beacons.length; i++) {
          let item = response.data.beacons[i];
          item.show = true;
          item.showDetails = false;
          item.content =
            item.templateName.toLowerCase() +
            ' ' +
            item.apiName.toLowerCase() +
            ' ' +
            item.description.toLowerCase() +
            ' ' +
            item.chains.toString().toLowerCase().replace(/,/g, ' ');
        }
        this.beacons = response.data.beacons;
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
.b1-error {
  color: red;
}
.b1-beacon-filter-input {
  margin-top: 10px;
  font-size: large;

  width: 98%;
  max-width: 630px;
  border: 2px solid lightgrey;
  border-radius: 2px;
  padding: 3px;
}
</style>
