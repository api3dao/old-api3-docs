<!--
Gets the Beacon's on-chain value from an API using ethers.js.
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
        style="float: right; margin-right: 10px; opacity: 0.8"
        src="/img/refresh-icon.png"
    /></a>

    <i>Value:</i> <b>{{ value }}</b
    ><img
      v-show="loading"
      width="68px"
      style="opacity: 0.7"
      src="/img/marching-balls.gif"
    />
    <div style="margin-left: 11px; font-family: courier; font-size: small">
      Date: {{ date }} <br />Time: {{ time }} <br /><!--ISO: {{ iso }}-->
    </div>
    <div v-show="err" class="beacon-value-err">
      {{ err }}
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'BeaconValue',
  props: ['beaconParam'],
  data: () => ({
    beacon: undefined,
    loading: true,
    value: null,
    date: null,
    time: null,
    timestamp: null,
    err: null,
  }),
  mounted() {
    this.$nextTick(async function () {
      this.beacon = this.beaconParam;
      this.setBeaconValue();
    });
  },
  methods: {
    async setBeaconValue() {
      try {
        this.loading = true;
        this.value = undefined;
        this.date = undefined;
        this.time = undefined;
        this.timestamp = undefined;
        this.error = undefined;
        const res = await axios.get(
          'https://api-ethers.herokuapp.com/beacons/' + this.beacon.beaconId
        );

        if (res.data.reason || res.data.code) {
          this.err = res.data.reason + ' - ' + res.data.code;
        } else {
          const arr = res.data.split(',');

          // Look for _times in the decoded parameters
          const _timesArr = this.beacon.decodedParameters.filter(
            (character) => character.name === '_times'
          );

          if (_timesArr.length !== 0) {
            // The _timesArr[0].value field contains a pair
            let pairArr = _timesArr[0].value.split(',');
            this.value = arr[0] / pairArr[0];
          } else {
            this.value = arr[0];
          }
          // DTTM
          this.timestamp = arr[1];
          // Multiply by 1000 since JS timestamps need milliseconds and UNIX delivers in seconds.
          const dttm = new Date(arr[1] * 1000);
          this.date = dttm.toDateString();
          this.time = dttm.toTimeString();
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

<style>
.beacon-value-err {
  font-family: courier;
  margin-left: 11px;
  color: red;
  font-size: small;
}
</style>
