<!--
Component for the ChildPage beacon-child-detail.md
-->

<template>
  <!--
Use v-if="dataLoaded" not v-show. The beacon is loading from localStorage
with a delay. We do not want to load the DOM until the Beacon is loaded
or the value block will fail to get its parameter.
-->
  <div v-if="loaded === true">
    <div class="bcd-flex-container">
      <div class="bcd-flex-left">
        <a href="javascript:void(0)" class="bcd-back-btn" v-on:click="goBack()"
          >←</a
        >
      </div>
      <div class="bcd-flex-right">
        <div style="font-size: x-large; font-weight: 600">
          {{ beacon.name }}
        </div>
      </div>
    </div>

    <div class="bcd-error" v-if="error">
      {{ error }} Please report this error.
    </div>

    <div v-show="!error">
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Description:</i>
        <span class="bcd-content-box-value">{{ beacon.description }}</span>
      </div>
      <div class="bcd-content-box">
        <img style="width: 25px; margin-top: 2px" :src="provider.logoPath" />
        <div
          style="
            margin-top: -26px;
            margin-left: 34px;
            padding-bottom: 4px;
            font-size: large;
          "
        >
          {{ provider.name }}
        </div>
      </div>

      <!-- Value -->
      <!--div class="bcd-content-box">
        <beacons-browser2-BeaconValue2
          v-bind:beaconParam="beacon"
          class="bcd-content-box-label"
        />
      </div-->

      <!-- Beacon ID -->
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Beacon ID:</i>
        <span class="bcd-content-box-value">
          {{ beacon.beaconId }}<CopyIcon :text="beacon.beaconId" />
        </span>
      </div>

      <!-- Template ID -->
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Template ID:</i>
        <span class="bcd-content-box-value">
          {{ beacon.templateId }}<CopyIcon :text="beacon.templateId" />
        </span>
      </div>

      <!-- Airnode address -->
      <div class="bcd-content-box">
        <i class="bcd-content-box-label">Airnode address:</i>
        <span class="bcd-content-box-value">
          {{ beacon.airnodeAddress }}<CopyIcon :text="beacon.airnodeAddress" />
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
        <i class="bcd-content-box-label">Template:</i>
        <pre><code>{{beacon.template}}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconDetails2',
  props: {
    dataDetails: {},
  },
  data: () => ({
    beacon: {},
    provider: {},
    loaded: false,
    error: String,
  }),
  mounted() {
    this.$nextTick(async function () {
      this.error = null;
      this.provider = this.dataDetails.provider;
      this.beacon = this.dataDetails.beacon;
      this.loaded = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
  methods: {
    goBack() {
      this.$parent.togglePanes();
    },
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

.bcd-content-box-value {
  margin-left: 5px;
  font-family: courier;
  font-size: small;
  overflow-wrap: break-word;
}

.bcd-back-btn {
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
}

.bcd-flex-container {
  height: 62px;
  display: flex;
  border-bottom: 1px solid gray;
  margin-bottom: 25px;
}

.bcd-flex-left {
  margin-top: 9px;
  width: 58px;
  height: 6vh;
}

.bcd-flex-right {
  margin-top: 19px;
  height: 6vh;
}
</style>
