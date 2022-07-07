<!--
  This component displays a list of all Beacons sorted by name.
  It loads from the S3 bucket.
  The API payload is parse and loaded into the data array. 
-->

<template>
  <div>
    <div v-show="showBeacons === true">
      <!-- Filter  -->
      <input
        id="searchText"
        spellcheck="false"
        class="b2-beacon-list-filter-input"
        v-on:keyup="void find()"
        placeholder="Filter (must contain all)"
      /><span style="margin-top: 4px; color: gray; font-size: medium">
        ({{ cnt }})</span
      >

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
          <img style="width: 105px; margin-top: 5px" :src="item.logoPath" />
          <span class="b2-provider-name">
            {{ item.name }}
            <span style="font-size: x-small; font-weight: 200">
              ({{ item.beaconCnt }})</span
            >
          </span>
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
      <beacons-browser2-BeaconDetails2 :beacon="beacon" />
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
    showBeacons: false,
    showDetails: false,
    showSpinner: true,
    error: null,
    data: [],
    beacon: undefined, // Passes data BeaconDetails2.vue via togglePanes()
    cnt: 0,
    scrollY: 0, // Remember Y position when going to details pane
  }),
  mounted() {
    this.$nextTick(function () {
      this.loadBeacons();
    });
  },
  methods: {
    async loadBeacons() {
      try {
        const response = await axios.get(
          'https://operations-development.s3.amazonaws.com/latest/apis.json'
        );
        const responseChains = await axios.get(
          'https://operations-development.s3.amazonaws.com/latest/chains.json '
        );
        const providers = response.data;
        const chains = responseChains.data;

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

            /**
              1. Add chain name to content
              2. Add the name to the chain object
              3. Add the logo to the chain object
              4. Add the chainId to the chain object
            */
            for (var chainKey in providers[key].beacons[beaconKey].chains) {
              providers[key].beacons[beaconKey].content += ' ' + chainKey + ' ';
              providers[key].beacons[beaconKey].chains[chainKey].name =
                chainKey;
              providers[key].beacons[beaconKey].chains[chainKey].id =
                chains[chainKey].id;
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
        }
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showSpinner = false;
      this.showBeacons = true;
    },
    togglePanes(beacon, providerParam) {
      // If beacon (param) is null then this was called by BeaconDetails2.vue
      if (beacon) {
        this.scrollY = window.scrollY;
        // Data to pass to BeaconDetails.vue
        this.beacon = beacon;
        this.beacon['provider'] = {
          name: providerParam.name,
          logoPath: providerParam.logoPath,
        };
      } else {
        this.dataPayload = undefined;
      }

      // Toggle the panes
      this.showBeacons = !this.showBeacons;
      this.showDetails = !this.showDetails;

      // Return to last scroll position if beaconList pane active
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

      this.data.forEach((provider) => {
        provider.beaconCnt = 0;
        provider.beacons.forEach((beacon) => {
          arr.forEach((str) => {
            if (str.length === 0) {
              beacon.show = true;
              this.cnt++;
              provider.beaconCnt++;
            } else if (beacon.content.toLowerCase().indexOf(str) > -1) {
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
.b2-beacon-list-filter-input {
  margin-top: 10px;
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
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
}

.flex-container > div > div {
  min-width: 205px;
  max-width: 205px;
  width: 205px;
  height: 54px;
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
.flex-container > div > div:hover {
  cursor: pointer;
}
.flex-container > div > div > div {
  font-size: small;
  padding: 5px 5px 5px 10px;
  font-weight: 500;
  font-family: courier;
  color: gray;
}
</style>
