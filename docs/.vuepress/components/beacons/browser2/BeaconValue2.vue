<!--
Gets the Beacon's on-chain value from an API using ethers.js.
-->

<template>
  <div>
    <div style="float: right">
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
    </div>

    <div>
      <i>Network:</i>
      <span v-for="chain in beaconParam.chains" v-bind:key="chain.id">
        <!-- prettier-ignore -->
        <select class="beacon-value-picklist" @change="setRegion($event)">
          <option :value="chain.id">{{ chain.name }}</option>
        </select>
      </span>
    </div>

    <div style="margin-top: 15px">
      <i>Value:</i> {{ value }}
      <img
        v-show="loading"
        width="68px"
        style="opacity: 0.7"
        src="/img/marching-balls.gif"
      />
      <div style="margin-left: 51px; font-family: courier; font-size: small">
        Date: {{ date }} <br />Time: {{ time }} <br /><!--ISO: {{ iso }}-->
      </div>
    </div>

    <div style="margin-top: 15px"><i>Raw value:</i></div>
    <pre
      style="background-color: white; margin-left: 30px; margin-top: -15px"
    ><code style="color:gray;font-size: small;">{{raw}}</code></pre>

    <div v-show="err" class="beacon-value-err">
      {{ err }}
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'BeaconValue2',
  props: ['beaconParam', 'chains'],
  data: () => ({
    beacon: undefined,
    loading: true,
    value: null,
    date: null,
    time: null,
    timestamp: null,
    raw: {},
    err: null,
  }),
  mounted() {
    this.$nextTick(async function () {
      this.beacon = this.beaconParam;
      this.setBeaconValue();
      console.log('beacon value chains >', this.chains);
      console.log(this.beacon);
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
        /*const res = await axios.get(
          'https://api-ethers.herokuapp.com/beacons/' + this.beacon.beaconId
        );*/
        //console.log(1, res);

        const res2 = await axios.get(
          'https://api.api3labs.link/operations/chainValue/dataPoint?chainId=3&dataFeedId=' +
            this.beacon.beaconId
        );
        console.log(2, res2);
        this.raw = res2.data;

        // Look for a embedded response error
        if (res2.data.err) {
          this.err = res2.data.err;
        } else {
          // The response should now contain valid data
          const arr = res2.data.beaconResponse; //res2.data.beaconResponse.split(',');
          console.log('arr', arr);
          console.log('template', this.beacon.template.decodedParameters);

          // Look for _times in the decoded parameters
          /*const _timesArr = this.beacon.template.decodedParameters.filter(
            (character) => character.name === '_times'
          );*/

          // Get _times pair if available
          const _timesArr = this.beacon.template.decodedParameters._times;
          console.log('_times', _timesArr);

          /*if (_timesArr.length !== 0) {
            // The _timesArr[0].value field contains a pair
            let pairArr = _timesArr[0].value.split(',');
            this.value = arr[0] / pairArr[0];
          } else {
            this.value = arr[0];
          }*/
          this.value = arr[0];
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

.beacon-value-picklist {
  font-size: medium;
  padding: 5px;
  color: gray;
  border: 1.5px solid gray;
  border-radius: 5px;
  /* Do not change the below settings. These are needed
     for mobile devices to prevent horizontal scrolling
     of the viewport, excluding margin-top.
  */
  margin-left: 0px;
  max-width: 220px;
}
</style>
