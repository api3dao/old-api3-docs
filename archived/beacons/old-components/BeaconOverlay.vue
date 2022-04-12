<!--

W3 Off-Canvas menu
-->

<template>
  <!-- The overlay -->
  <div id="b2-overlay" class="b2-overlay" v-show="!hideContent">
    <a href="javascript:void(0)" class="close-btn" v-on:click="closeOverlay()"
      >&times;</a
    >

    <a
      href="javascript:void(0)"
      class="back-btn"
      v-on:click="showPaneMain()"
      v-show="showTemplate"
      >←</a
    >

    <!-- MAIN TEMPLATE -->
    <div
      id="b2-overlay-pane-main"
      class="b2-overlay-pane-main"
      v-show="showMain"
    >
      <div class="b2-overlay-content">
        <div style="text-align: center; margin-left: -30px">
          <span
            style="
              opacity: 0.6;
              color: white;
              background-color: gray;
              padding: 0.7px 6px 0.7px 6px;
              border-radius: 0.2em;
            "
            >{{ cnt + 1 }}</span
          >
          <span class="b2-overlay-title">
            {{ beacon.templateName }}
          </span>
        </div>
        <hr />
        <div>
          <i>Description:</i>
          {{ beacon.description }}
        </div>
        <hr />
        <div>
          <i>Provider:</i>
          <a :href="beacon.url">{{ beacon.apiName }}</a> <ExternalLinkImage />
        </div>
        <hr />

        <!-- Value -->
        <div class="b2-overlay-content-box">
          <beacons-browser2-BeaconOverlayValue ref="overlayValueChild" />
        </div>
        <hr />
        <!-- Beacon ID -->
        <div class="b2-overlay-content-box">
          <i style="margin-left: 5px">Beacon ID:</i>
          <div
            style="margin-left: 10px; font-family: courier; font-size: small"
          >
            {{ beacon.beaconId }}
          </div>
        </div>
        <hr />
        <!-- Template -->
        <div class="b2-overlay-content-box">
          <a href="javascript:void(0)"
            ><i style="margin-left: 5px" v-on:click="showPaneTemplate()"
              >Template</i
            ></a
          ><i> ID:</i>
          <div
            style="margin-left: 10px; font-family: courier; font-size: small"
          >
            {{ beacon.templateId }}
          </div>
        </div>
        <hr />
        <!-- Value Chart -->
        <div>
          <Grafana
            v-if="beacon.grafanaURL"
            :src="beacon.grafanaURL"
            widthOverride="99%"
            heightOverride="240"
          />
          <div v-else style="padding: 59px">
            Value graph data not available.
          </div>
        </div>
        <hr />
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
        <hr />
      </div>

      <hr />
      <br /><br />
    </div>

    <!-- PANE TEMPLATE -->
    <div
      id="b2-overlay-pane-template"
      v-show="showTemplate"
      class="b2-overlay-pane-template"
    >
      <div class="b2-overlay-content">
        <div style="margin: auto; text-align: center; margin-top: -20px">
          <div>
            {{ beacon.templateName }}
          </div>
          <strong>Decoded Parameters</strong>
        </div>
        <hr />
        <pre><code>{{beacon.decodedParameters}}</code></pre>
        <hr />
        <br /><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconOverlay',
  data: () => ({
    beacon: {},
    cnt: 0,
    hideContent: true,
    showMain: true,
    showTemplate: false,
  }),
  methods: {
    closeOverlay() {
      this.hideContent = true;
      this.beacon = {};
      document.getElementById('b2-overlay').style.width = '0px';
    },
    setBeacon(beacon, cnt) {
      this.showTemplate = false;
      this.showMain = true;
      this.beacon = beacon;
      this.cnt = cnt;
      this.hideContent = false;
      this.$refs.overlayValueChild.setBeaconValue(beacon);
    },
    showPaneMain() {
      this.showTemplate = false;
      this.showMain = true;
    },
    showPaneTemplate() {
      this.showTemplate = true;
      this.showMain = false;
    },
  },
};
</script>

<style>
.b2-overlay {
  height: 100%;
  width: 0%;
  position: fixed;
  z-index: 1;
  padding-left: 5px;
  padding-right: 5px;
  top: 0;
  right: 0;
  background-color: white;
  transition: 0.5s;
  padding-top: 50px;
  border-left: 2px solid lightgrey;
  overflow: auto;
}
.b2-overlay-content {
  margin-top: 40px;
  overflow-wrap: break-word;
}

.b2-overlay-content-box {
  width: 97%;
  box-shadow: 2px 2px 5px lightgrey;
  border: 1px solid lightgrey;
  border-radius: 0.4em;
  padding: 3px;
}
.b2-overlay .back-btn {
  position: fixed;
  top: 75px;
  right: 315px;
  font-size: 37px;
  text-decoration: none;
}

.b2-overlay .close-btn {
  /* color: #50c878; to light */
  position: fixed;
  top: 64px;
  right: 15px;
  font-size: 48px;
  text-decoration: none;
}

.b2-overlay-pane-main {
  padding-top: 0px;
}
.b2-overlay-pane-template {
  padding-top: 0px;
}

.b2-overlay-title {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: bold;
  /* Truncate the name, to fit between buttons. */
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
