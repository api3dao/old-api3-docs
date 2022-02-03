<template>
  <div v-show="beacon.show === true" class="beacon-box" :key="beacon.beaconId">
    <!-- //https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/ -->
    <label class="switch beacon-display-cb">
      <input type="checkbox" @click="showDetails()" />
      <span class="slider round"></span>
    </label>
    <div class="provider">
      {{ beacon.apiName }}
    </div>
    <div class="beacon-name">{{ beacon.templateName }}</div>
    <div class="beacon-id beacon-sub-line">
      {{ beacon.beaconId }}
    </div>
    <div v-show="beacon.showDetails === true" class="beacon-display-box">
      <!--button class="beaconTryItBtn" @click="execute()">Try It</button>
      <img
        src="/img/spinner.gif"
        v-show="showTrySpinner"
        style="width: 20px; position: relative; top: 6px"
      />
      < prettier-ignore >
      <code style="position: relative; top: 1px" v-show="tryData">{{ tryData }}</code-->
      <!-- prettier-ignore -->
      <pre><code>"decodedParameters": {{beacon.decodedParameters}}</code></pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'BeaconItem',
  props: ['beacon'],
  data: () => ({
    tryData: null,
    showTrySpinner: false,
  }),
  methods: {
    showDetails(id) {
      this.beacon.showDetails = !this.beacon.showDetails;
    },
    /**
     * This method is not used. It may be evaluated for future use.
     */
    async execute() {
      try {
        console.log('start');
        this.showTrySpinner = true;
        this.errorTry = null;
        this.tryData = null;
        const response = await axios.get(
          'http://localhost:3000/beacons/' + this.beacon.beaconId
        );
        console.log(response.data);

        this.tryData = response.data;
      } catch (err) {
        console.error(err.toString());
        this.error = err.toString();
      }
      this.showTrySpinner = false;
    },
  },
};
</script>

<style>
.provider {
  float: right;
  padding-right: 0px;
  color: gray;
  font-size: x-small;
  font-weight: bold;
}
.beaconTryItBtn {
  background-color: #2196f3;
  border-radius: 0.5em;
  border: 1px solid white;
  font-weight: bold;
  cursor: pointer;
  color: white;
  margin-top: 7px;
}
.beacon-box {
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 620px;
}
.beacon-sub-line {
  padding-left: 10px;
  font-size: small;
  border-left: solid lightgrey 3px;
}
.beacon-display-box {
  margin-right: 10px;
  display: block;
  padding-left: 11px;
  border-left: solid lightgrey 3px;
}
.beacon-name {
  font-weight: bold;
  margin-left: -5px;
  margin-bottom: 5px;
}
.beacon-id {
  max-width: 600px;
  overflow-wrap: break-word;
}
.beacon-display-cb {
  float: right;
  margin-top: -10px;
}
</style>
