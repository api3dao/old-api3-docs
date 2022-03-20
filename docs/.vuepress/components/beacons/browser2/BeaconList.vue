<!--
  This component displays a list of all Beacons sorted by name.
  It loads from the operations repo real-time and merges its JSON
  file with a local JSON file to get additional attributes.
-->

<template>
  <div v-if="loaded === true">
    <!-- Filter  -->
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
    <!-- Beacon List v-show="item.show" -->
    <beacons-browser2-BeaconItem
      v-for="(item, i) in beacons"
      v-bind:key="'B' + i"
      v-bind:beacon="item"
      v-bind:cnt="i"
    ></beacons-browser2-BeaconItem>
  </div>
</template>

<script>
import axios from 'axios';
import all from '../../../api-providers.json';

export default {
  name: 'BeaconList',
  data: () => ({
    loaded: false,
    showSpinner: false,
    error: null,
    beacons: [],
    beaconsFetched: [],
    providers: all,
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

        // item.show needs to be set before copying the response data to the beaconsFetched array
        for (let i = 0; i < response.data.beacons.length; i++) {
          let item = response.data.beacons[i];
          item.show = true;
          item.url = this.providers[item.apiName].url;
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

        this.beaconsFetched = response.data.beacons;
        this.beaconsFetched.sort(this.sortByName);
        // TEMP
        /*this.beaconsFetched = this.beaconsFetched.concat(this.beaconsFetched);
        this.beaconsFetched = this.beaconsFetched.concat(this.beaconsFetched);
        this.beaconsFetched = this.beaconsFetched.concat(this.beaconsFetched);
        this.beaconsFetched = this.beaconsFetched.concat(this.beaconsFetched);
        this.beaconsFetched = this.beaconsFetched.concat(this.beaconsFetched);
        this.beaconsFetched = this.beaconsFetched.concat(this.beaconsFetched);*/
        this.beacons = this.beaconsFetched;
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
    });
  },
  /*computed: {
    beacons: function () {
      return this.beaconsFetched.filter(function (item) {
        console.log('computed >', item.show);
        return item.show % item.show === true;
      });
    },
  },*/
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
      //console.log(1, arr);

      this.beaconsFetched.forEach((item) => {
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
        this.beacons = this.beaconsFetched.filter((item) => item.show === true);
      });

      //console.log(3, this.beacons);
      //console.log('----------------------');
    },
  },
};
</script>

<style>
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
