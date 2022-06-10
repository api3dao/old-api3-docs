<!--
Gets the Beacon's on-chain value from https://api.api3labs.link/operations.
-->

<template>
  <div>
    <div style="float: right">
      <a
        href="javascript:void(0);"
        v-on:click="getDapiValue()"
        v-show="!loading"
      >
        <img
          width="25px"
          style="float: right; margin-right: 10px; opacity: 0.8"
          src="/img/refresh-icon.png"
      /></a>
    </div>

    <!-- Error -->
    <div v-show="err" class="dapi-value-err">{{ err }}</div>

    <!-- Current value -->
    <div style="margin-top: 15px">
      <i>Current value:</i> <b>{{ value }}</b>
      <img
        v-show="loading"
        width="68px"
        style="opacity: 0.7"
        src="/img/marching-balls.gif"
      />
      <div
        style="
          font-family: courier;
          margin-left: 17px;
          margin-top: 4px;
          font-size: small;
        "
      >
        Date: {{ date }} <br />Time: {{ time }} <br />
      </div>
    </div>

    <!-- Raw value -->
    <div style="margin-top: 15px"><i>Raw value:</i></div>
    <pre
      style="background-color: white; margin-left: -9px; margin-top: -15px"
    ><code style="color:gray;font-size: small;">{{raw}}</code></pre>

    <!-- Previous values-->
    <div style="margin-top: -25px">
      <div style="margin-bottom: 5px">
        <i>Previous values:</i>
        <img
          v-show="loadingPrevious"
          width="68px"
          style="opacity: 0.7"
          src="/img/marching-balls.gif"
        />
      </div>
      <ul
        style="
          margin-left: 17px;
          margin-bottom: 5px;
          font-size: small;
          font-family: courier;
        "
        v-for="(item, i) in previousValues"
        v-bind:key="i"
      >
        <li>{{ item.value }} {{ item.date }} @{{ item.time }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'DapiValue',
  props: ['dapi'],
  data: () => ({
    loading: true,
    loadingPrevious: true,
    value: undefined,
    date: undefined,
    time: undefined,
    _times: undefined,
    previousValues: [],
    raw: {},
    err: null,
  }),
  mounted() {
    this.$nextTick(async function () {
      console.log(this.dapi);
      //this.getDapiValue();
    });
  },
  methods: {
    convertToDate(str) {
      // Multiply by 1000 since JS timestamps need milliseconds and UNIX delivers in seconds.
      return new Date(str * 1000).toDateString();
    },
    convertToTime(str) {
      // Multiply by 1000 since JS timestamps need milliseconds and UNIX delivers in seconds.
      return new Date(str * 1000).toTimeString();
    },
    computeValue(str) {
      if (this._times) return str / this._times;
      return str;
    },
    async getDapiValue() {
      try {
        this.loading = true;
        this.loadingPrevious = true;
        this.value = undefined;
        this.date = undefined;
        this.time = undefined;
        this._times = undefined;
        this.err = undefined;
        this.previousValues = [];

        // Network chainId
        var e = document.getElementById('networkPickList');
        var chainId = e.options[e.selectedIndex].value;

        // Current value
        const res2 = await axios.get(
          'https://api.api3data.link/beacons/on_chain_value/',
          {
            params: {
              chainId: 3,
              dapiName: this.dapi,
            },
          }
        );
        // Displayed in the HTML
        this.raw = res2.data;

        // Look for a embedded response error
        if (res2.data.err) {
          this.err = res2.data.err.toString();
        }
        // The response should now contain valid data
        else {
          // Convert the hex value
          // Get the decimal value by trimming off the '0x' and then parsing the
          // remaining portion using parseInt(something, 16):
          this.value = parseInt(
            res2.data.beaconResponse[0].hex.substring(2),
            16
          );

          // Update this.value based on the reserved parameter _times, if any
          // Look for _times in the decoded parameters
          const decodedParametersArr =
            this.beacon.template.decodedParameters.filter(
              (character) => character.name === '_times'
            );
          if (decodedParametersArr.length !== 0) {
            // The decodedParametersArr field contains the value of _times
            this._times = decodedParametersArr[0].value;
            this.value = this.computeValue(this.value);
          }

          // Current DTTM
          const timestamp = res2.data.beaconResponse[1];
          this.date = this.convertToDate(timestamp);
          this.time = this.convertToTime(timestamp);
          this.loading = false; // Current value ready for display

          // Last 5 transactions ///
          const resTx = await axios.get(
            'https://api.api3data.link/beacons/last_transactions',
            {
              params: {
                chainId: chainId,
                dapiName: dapi,
              },
            }
          );
          resTx.data.forEach((element) => {
            const v = parseInt(element.parsedLog.args[1].hex.substring(2), 16);
            const d = parseInt(element.parsedLog.args[2].hex.substring(2), 16);
            this.previousValues.push({
              value: this.computeValue(v),
              date: this.convertToDate(d),
              time: this.convertToTime(d),
            });
          });
        }

        this.loadingPrevious = false;
      } catch (error) {
        this.err = error;
        this.loading = false;
        this.loadingPrevious = false;
      }
    },
  },
};
</script>

<style>
.dapi-value-err {
  font-family: courier;
  margin-left: 11px;
  margin-top: 10px;
  color: red;
  font-size: small;
}
</style>
