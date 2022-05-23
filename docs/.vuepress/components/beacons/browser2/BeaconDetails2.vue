<!--
displays an individual Beacon's detail, hosts the component to
display the Beacons's value.
-->

<template>
  <div>
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

    <div class="bcd-content-box">
      <i class="bcd-content-box-label">Description:</i>
      <span class="bcd-content-box-value">{{ beacon.description }}</span>
    </div>
    <div class="bcd-content-box">
      <img
        style="width: 105px; margin-top: 2px"
        :src="beacon.provider.logoPath"
      />
      <span class="b2-provider-name">
        {{ beacon.provider.name }}
      </span>
    </div>

    <!-- Value -->
    <div class="bcd-content-box">
      <beacons-browser2-BeaconValue2
        v-bind:beacon="beacon"
        class="bcd-content-box-label"
      />
    </div>

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
</template>

<script>
export default {
  name: 'BeaconDetails2',
  props: {
    beacon: {},
  },
  mounted() {
    this.$nextTick(async function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
  methods: {
    goBack() {
      // Do not pass any parameters
      this.$parent.togglePanes();
    },
  },
};
</script>

<style scoped>
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
