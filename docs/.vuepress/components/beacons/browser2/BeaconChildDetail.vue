<!--
Component for the ChildPage beacon-child-detail.md
-->

<template>
  <!--
Use v-if="dataLoaded" not v-show. The beacon is loading from localStorage
with a delay. We do not want to load the DOM until the Beacon is loaded
or the value block will fail to get its parameter.
-->
  <div v-if="dataLoaded === true">
    <div class="bcd-error" v-if="error">
      {{ error }} Please report this error.
    </div>

    <div v-show="!error">
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Description:</i>
        {{ beacon.description }}
      </div>
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Provider:</i>
        <a :href="beacon.url">{{ beacon.apiName }}</a> <ExternalLinkImage />
      </div>

      <!-- Value -->
      <div class="bcd-content-box">
        <beacons-browser2-BeaconValue
          v-bind:beaconParam="beacon"
          class="bcd-content-box-label"
        />
      </div>

      <!-- Beacon ID -->
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Beacon ID:</i>
        <span class="bcd-content-box-id">
          {{ beacon.beaconId }}
        </span>
      </div>

      <!-- Template ID -->
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Template ID:</i>
        <span class="bcd-content-box-id">
          {{ beacon.templateId }}
        </span>
      </div>

      <!-- Value Chart -->
      <div>
        <Grafana
          v-if="beacon.grafanaURL"
          :src="beacon.grafanaURL"
          widthOverride="99%"
          heightOverride="240"
        />
        <div v-else style="padding: 59px">Value graph data not available.</div>
      </div>
      <br />
      <!-- Deviation Chart -->
      <div>
        <Grafana
          v-if="beacon.grafanaDeviationURL"
          :src="beacon.grafanaDeviationURL"
          widthOverride="99%"
          heightOverride="240px"
        />
        <div v-else style="padding: 59px">
          Deviation graph data not available.
        </div>
      </div>
      <br />

      <!-- Template -->
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Template decoded parameters:</i>
        <pre><code>{{beacon.decodedParameters}}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconChildDetail',
  data: () => ({
    beacon: {},
    //cnt: 0,
    dataLoaded: false,
    error: String,
    //showMain: true,
    //showTemplate: false,
  }),
  mounted() {
    this.$nextTick(async function () {
      // Get the Beacons from GitHub
      this.error = null;
      // Needed because the parent has set the localStorage and
      // and a delay is needed for it to set.
      setTimeout(() => {
        const childPageData =
          JSON.parse(localStorage.getItem('childPageData')) || undefined;
        if (childPageData === undefined) {
          this.error = 'The Beacon in localStorage is undefined.';
        } else {
          this.beacon = childPageData.beacon;
        }
        this.dataLoaded = true;
      }, 1);
    });
  },
};
</script>

<style scoped>
.bcd-error {
  color: red;
}

.bcd-content-box {
  width: 97%;
  box-shadow: 2px 2px 5px lightgrey;
  border: 1px solid lightgrey;
  border-radius: 0.4em;
  padding: 6px;
  margin-bottom: 20px;
}

.bcd-content-box-label {
  margin-left: 5px;
}

.bcd-content-box-id {
  margin-left: 5px;
  font-family: courier;
  font-size: small;
  overflow-wrap: break-word;
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links
and position the close button again, so they don't overlap */
/*@media screen and (max-height: 450px) {
  .b2-overlay a {
    font-size: 20px;
  }
  .b2-overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 25px;
  }
}*/

/*@media screen and (max-width: 450px) {
  .b2-overlay-content-box {
    width: 97%;
    box-shadow: 2px 2px 5px lightgrey;
    border: 1px solid lightgrey;
    border-radius: 0.4em;
    padding: 3px;
  }
}*/
</style>
