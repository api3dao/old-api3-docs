<!--
  This component displays a list of all Beacons sorted by name.
  It loads from the operations repo real-time.
-->

<template>
  <div v-if="loaded === true">
    <!-- Filter  -->

    <input
      id="searchText"
      spellcheck="false"
      class="b2-beacon-filter-input"
      v-on:keyup="void find($event)"
      placeholder="Filter (must contain all)"
    />
    <div style="margin-top: 4px; font-size: small">
      Beacons: ({{ beacons.length }})
    </div>
    <hr />
    <div style="padding-left: 55px">
      <img src="/img/spinner.gif" v-show="showSpinner" />
    </div>
    <p v-show="error !== null" class="b2-error">
      The Beacon list failed to load: ({{ error }})
    </p>

    <beacons-browser2-BeaconItem
      v-for="(item, i) in beacons"
      v-bind:key="'B' + i"
      v-bind:beacon="item"
      v-bind:cnt="i"
    ></beacons-browser2-BeaconItem>

    <beacons-browser2-BeaconOverlay ref="overlayChild" />
  </div>
</template>

<script>
import axios from 'axios';
import providers from '../../../api-providers.json';

export default {
  name: 'BeaconList',
  data: () => ({
    loaded: false,
    showSpinner: false,
    error: null,
    beacons: [],
    beaconsFetched: [],
  }),
  mounted() {
    this.$nextTick(async function () {
      try {
        // Get the Beacons from GitHub
        this.showSpinner = true;
        this.error = null;
        const response = await axios.get(
          'https://raw.githubusercontent.com/api3dao/operations/v0.1/data/documentation_metadata.json'
        );

        // item.show needs to be set before copying the response data to the beaconsFetched array
        for (let i = 0; i < response.data.beacons.length; i++) {
          let item = response.data.beacons[i];
          // Get the grafana URLs
          //if (providers.beacons[item.beaconId]) {
          item.grafanaURL =
            providers.beacons[item.beaconId].grafanaURL || undefined;
          //}
          //if (providers.beacons[item.beaconId]) {
          item.grafanaDeviationURL =
            providers.beacons[item.beaconId].grafanaDeviationURL || undefined;
          //}

          item.show = true;

          item.url = providers[item.apiName].url;
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
        /*
        this.beaconsFetched = this.beaconsFetched.concat(this.beaconsFetched);
        */
        this.beacons = this.beaconsFetched;
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
    });
  },
  methods: {
    // This function called by BeaconItem.vue to open and set the beacon in hte overly
    openOverlay(beacon, cnt) {
      // Call (child) BeaconOverlay.vue and pass along the beacon
      this.$refs.overlayChild.setBeacon(beacon, cnt);
      // Open overlay
      document.getElementById('b2-overlay').style.width = '350px';
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
    find(event) {
      let text = this.$el.querySelector('#searchText').value.toLowerCase();
      const arr = text.split(' ');

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
          item.showDetails = false; // Close any expanded details (tabs/panes)
        });
      });
      this.beacons = this.beaconsFetched.filter((item) => item.show === true);
    },
  },
};
</script>

<style>
/* ---> START BeaconList.vue --- */
.b2-error {
  color: red;
}
.b2-beacon-filter-input {
  margin-top: 10px;
  font-size: large;

  width: 98%;
  max-width: 630px;
  border: 2px solid lightgrey;
  border-radius: 2px;
  padding: 3px;
}
/* --- END BeaconList.vue --- */

/* --- START BeaconItem.vue --- */
.b2-beacon-box {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 620px;
}
.b2-beacon-provider {
  float: right;
  padding-right: 15px;
  color: gray;
  font-size: x-small;
  font-weight: bold;
}
.b2-beacon-name {
  color: #50c878;
  font-weight: bold;
  margin-left: 4px;
  margin-bottom: 5px;
}
.b2-beacon-description {
  font-size: medium;
  color: gray;
  padding-left: 10px;
}
.b2-ids {
  font-size: small;
  max-width: 600px;
  overflow-wrap: break-word;
  padding-left: 10px;
}
/* --- END BeaconItem.vue --- */

/* --- START BeaconDetails.vue --- */
.b2-beacon-tab-box {
  margin-right: 10px;
  display: block;
  padding-left: 11px;
}

/* Style the tab (button)*/
.b2-tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
}

/* Style the tab (buttons) that are used to open the pane */
.b2-tab button {
  font-size: small;
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 4px 8px;
  transition: 0.5s;
}

/* Change background color of tab (buttons)) on hover */
.b2-tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tab (button) class */
.b2-tab button.active {
  background-color: white;
  color: green;
  border: 2px #ccc solid;
  font-weight: bold;
}

/* Style the pane content */
.b2-tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-top: none;
  height: 365px;
}
/* --- END BeaconDetails.vue --- */
</style>
