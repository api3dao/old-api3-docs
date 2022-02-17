<template>
  <div v-show="beacon.show === true" class="beacon-box" :key="beacon.beaconId">
    <div class="provider">
      {{ beacon.apiName }}
    </div>

    <div
      class="beacon-name"
      style="cursor: pointer; user-select: none"
      @click="showDetails()"
    >
      {{ beacon.templateName }}
      <img
        :src="getArrowSrc()"
        style="cursor: pointer; height: 12px; margin-top: 0px"
      />
    </div>

    <div class="beacon-description beacon-sub-line">
      {{ beacon.description }}
    </div>
    <div class="beacon-id beacon-sub-line">
      Beacon ID: {{ beacon.beaconId }}
    </div>

    <div v-show="beacon.showDetails === true" class="beacon-display-box">
      <hr />
      <div class="beacon-id">Template ID: {{ beacon.templateId }}</div>
      <!-- prettier-ignore -->
      <pre><code>"decodedParameters": {{beacon.decodedParameters}}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeaconItem',
  props: ['beacon'],
  methods: {
    getArrowSrc() {
      if (!this.beacon.showDetails) return '/img/arrow-right-16.png';
      else return '/img/arrow-down-16.png';
    },
    showDetails(id) {
      this.beacon.showDetails = !this.beacon.showDetails;
    },
  },
};
</script>

<style>
.provider {
  float: right;
  padding-right: 15px;
  color: gray;
  font-size: x-small;
  font-weight: bold;
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
.beacon-description {
  font-size: medium;
  color: gray;
}
.beacon-id {
  font-size: small;
  max-width: 600px;
  overflow-wrap: break-word;
}
</style>
