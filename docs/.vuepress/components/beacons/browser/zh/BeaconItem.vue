<template>
  <div
    v-show="beacon.show === true"
    class="b1-beacon-box"
    :key="beacon.beaconId"
  >
    <div class="b1-provider">
      {{ beacon.apiName }}
    </div>

    <div
      class="b1-beacon-name"
      style="cursor: pointer; user-select: none"
      @click="showDetails()"
    >
      {{ beacon.templateName }}
      <img
        :src="getArrowSrc()"
        style="cursor: pointer; height: 12px; margin-top: 0px"
      />
    </div>

    <div class="b1-beacon-description b1-beacon-sub-line">
      {{ beacon.description }}
    </div>
    <div class="b1-beacon-id b1-beacon-sub-line">
      Beacon ID: {{ beacon.beaconId }}
    </div>

    <div v-show="beacon.showDetails === true" class="b1-beacon-display-box">
      <hr />
      <div class="b1-beacon-id">Template ID: {{ beacon.templateId }}</div>
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
.b1-provider {
  float: right;
  padding-right: 15px;
  color: gray;
  font-size: x-small;
  font-weight: bold;
}
.b1-beacon-box {
  padding-top: 5px;
  padding-left: 20px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 620px;
}
.b1-beacon-sub-line {
  padding-left: 10px;
  border-left: solid lightgrey 3px;
}
.b1-beacon-display-box {
  margin-right: 10px;
  display: block;
  padding-left: 11px;
  border-left: solid lightgrey 3px;
}
.b1-beacon-name {
  font-weight: bold;
  margin-left: -5px;
  margin-bottom: 5px;
}
.b1-beacon-description {
  font-size: medium;
  color: gray;
}
.b1-beacon-id {
  font-size: small;
  max-width: 600px;
  overflow-wrap: break-word;
}
</style>
