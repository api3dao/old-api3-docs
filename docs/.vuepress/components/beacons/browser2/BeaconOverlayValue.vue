<!--

W3 Off-Canvas menu
-->

<template>
  <div>
    <a
      href="javascript:void(0);"
      v-on:click="setBeaconValue()"
      v-show="!loading"
    >
      <img
        width="25px"
        style="float: right; margin-right: 10px"
        src="/img/refresh-icon.png"
    /></a>

    <i style="margin-left: 5px">Value:</i> <b>{{ value }}</b
    ><img v-show="loading" width="20%" src="/img/marching-balls.gif" />
    <div style="margin-left: 11px; font-family: courier; font-size: small">
      Date: {{ date }} <br />Time: {{ time }} <br /><!--ISO: {{ iso }}-->
    </div>
    <div
      v-show="err"
      style="
        font-family: courier;
        margin-left: 11px;
        color: red;
        font-size: small;
      "
    >
      {{ err }}
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'BeaconOverlayValue',
  data: () => ({
    beacon: null,
    loading: true,
    value: null,
    date: null,
    time: null,
    timestamp: null,
    iso: null,
    err: null,
  }),
  /*mounted() {
    this.$nextTick(async function () {
      this.setBeaconValue(this.beaconId);
    });
  },*/
  methods: {
    async setBeaconValue(beacon) {
      if (beacon != undefined) this.beacon = beacon;
      try {
        this.loading = true;
        this.value = undefined;
        this.date = undefined;
        this.time = undefined;
        this.timestamp = undefined;
        this.iso = undefined;
        this.error = undefined;
        const res = await axios.get(
          'https://api-ethers.herokuapp.com/beacons/' + this.beacon.beaconId
        );
        /*const res = await axios.get(
          'http://localhost:3000/beacons/' + this.beacon.beaconId
        );*/

        if (res.data.reason || res.data.code) {
          this.err = res.data.reason + ' - ' + res.data.code;
        } else {
          const arr = res.data.split(',');

          // Look for _times in the decoded parameters
          const _timesArr = this.beacon.decodedParameters.filter(
            (character) => character.name === '_times'
          );

          if (_timesArr.length !== 0) {
            this.value = arr[0] / 1000000; // Template has an error_timesArr[0].value; There is a comma in hte value
          } else {
            this.value = arr[0];
          }
          // DTTM
          this.timestamp = arr[1];
          // Multiply by 1000 since JS timestamps need milliseconds and UNIX delivers in seconds.
          const dttm = new Date(arr[1] * 1000);
          this.date = dttm.toDateString();
          this.time = dttm.toTimeString();
          //this.iso = dttm.toISOString();
        }
        this.loading = false;
      } catch (error) {
        this.err = error;
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
