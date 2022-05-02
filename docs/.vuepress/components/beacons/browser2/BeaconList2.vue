<!--
  This component displays a list of all Beacons sorted by name.
  It loads from: https://api.api3labs.link/operations/beacons
  The API payload is parse and loaded into the data array. 
-->

<template>
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
      <div style="margin-top: 4px; font-size: small">Beacons: ({{ cnt }})</div>

      <!-- PANE, beacon list -->
      <div
        v-for="(item, index) in data"
        v-bind:key="index"
        style="margin-top: 17px"
      >
        <!-- If the provider has no beacons that match the search criteria 
        then the provider is not shown.  -->
        <div
          v-show="item.beaconCnt > 0"
          style="border-top: solid 2px lightgrey"
        >
          <img
            style="width: 35px; float: left; margin-top: 2px"
            :src="item.logoPath"
          />
          <div class="b2-provider-name">
            {{ item.name }}
            <span style="font-size: x-small; font-weight: 200">
              ({{ item.beaconCnt }})</span
            >
          </div>
          <!-- Beacons -->
          <div class="flex-container">
            <div v-for="beacon in item.beacons" v-bind:key="beacon.beaconId">
              <div
                v-show="beacon.show"
                class="b2-beacon-box"
                v-on:click="togglePanes(beacon, item)"
              >
                {{ beacon.name }}
                <div>{{ beacon.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PANE, beacon details -->
    <div v-if="showDetails">
      <hr />
      <beacons-browser2-BeaconDetails2 :dataDetails="dataDetails" />
    </div>

    <div style="padding: 155px" v-show="showSpinner">
      <img src="/img/spinner.gif" />
    </div>
    <div v-show="error !== null" class="b2-beacon-list-error">
      The Beacon list failed to load: ({{ error }})
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BeaconList2',
  data: () => ({
    loaded: false,
    showSpinner: false,
    showDetails: false,
    error: null,
    data: [],
    dataDetails: undefined, // Passes data to child pane BeaconDetails2.vue
    cnt: 0,
    scrollY: 0, // Remember Y position when going to details pane
  }),
  mounted() {
    this.$nextTick(function () {
      this.showSpinner = true;
      this.loadBeacons();
    });
  },
  methods: {
    async loadBeacons() {
      try {
        const response = await axios.get(
          'https://api.api3labs.link/operations/beacons'
        );

        this.providers = response.data.payload.apis;
        this.providers['wkande'] = JSON.parse(
          JSON.stringify(response.data.payload.apis.api3)
        );
        this.providers['wkande'].apiMetadata.name = 'Better Beacon Company';
        this.providers['wkande'].apiMetadata.logoPath = '/img/beacon.png';

        // Providers
        for (var key in this.providers) {
          const providerKey = key;
          const providerName = this.providers[key].apiMetadata.name;
          const providerLogo = this.providers[key].apiMetadata.logoPath;
          let beacons = [];
          let templates = [];

          // Templates
          for (var templateKey in this.providers[key].templates) {
            templates.push(this.providers[key].templates[templateKey]);
          }

          // Beacons
          for (var beaconKey in this.providers[key].beacons) {
            this.providers[key].beacons[beaconKey].show = true;

            this.providers.templates;

            // Get the Beacon's template which is a hassle because
            // the template name does not match the beacons name. Will
            // to spin thru the templates and find the templateId.
            /*console.log('T', beaconKey, this.providers[key].templates);
            for (var template in this.providers[key].templates) {
              console.log(1, template);
              console.log(2, beaconKey);
              if (
                template.templateId ===
                this.providers[key].beacons[beaconKey].templateId
              ) {
                this.providers[key].beacons[beaconKey].template = template;
                exit;
              }
            }*/

            // Build the grafana URLs
            let beaconId = this.providers[key].beacons[beaconKey].beaconId;
            this.providers[key].beacons[beaconKey].grafanaURL =
              'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?orgId=1&var-chainId=4&var-beaconId=' +
              beaconId +
              '&theme=light&panelId=2';
            this.providers[key].beacons[beaconKey].grafanaDeviationURL =
              'https://monitor.api3.org/d-solo/SDapXdy7z/documentation-dashboard?var-chainId=4&orgId=1&theme=light&panelId=3&var-beaconId=' +
              beaconId;

            // Start content
            this.providers[key].beacons[beaconKey].content =
              this.providers[key].beacons[beaconKey].name +
              ' ' +
              this.providers[key].beacons[beaconKey].description;

            // Add chain to content
            this.providers[key].beacons[beaconKey].chains.forEach((chain) => {
              this.providers[key].beacons[beaconKey].content +=
                ' ' + chain.name + ' ';
            });
            beacons.push(this.providers[key].beacons[beaconKey]);
          }
          beacons.sort(this.sortByName);
          this.cnt += beacons.length;
          this.data.push({
            provider: providerKey,
            name: providerName,
            beaconCnt: beacons.length,
            logoPath: providerLogo,
            beacons: beacons,
            templates: templates,
          });
        }
        console.log('Data >', this.data);
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.loaded = true;
    },
    togglePanes(beacon, provider) {
      if (beacon) {
        this.scrollY = window.scrollY;
        this.dataDetails = { provider: provider, beacon: beacon }; // Pass to BeaconDetails.vue
      } else {
        this.dataDetails = undefined;
      }
      this.loaded = !this.loaded;
      this.showDetails = !this.showDetails;
      if (!this.showDetails) {
        // Return to last scroll position
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
    find() {
      this.cnt = 0;
      let text = this.$el.querySelector('#searchText').value.toLowerCase();
      const arr = text.split(' ');

      this.data.forEach((provider) => {
        provider.beaconCnt = 0;
        provider.beacons.forEach((beacon) => {
          arr.forEach((str) => {
            if (str.length === 0) {
              beacon.show = true;
              this.cnt++;
              provider.beaconCnt++;
            } else if (beacon.content.indexOf(str) > -1) {
              beacon.show = true;
              this.cnt++;
              provider.beaconCnt++;
            } else {
              beacon.show = false;
            }
          });
        });
      });
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
  color: black;
}
</style>
