<template>
  <!-- v-show="beacon.show === true" -->

  <div class="b2-beacon-box" :key="beacon.beaconId">
    <div class="b2-beacon-provider">
      <a :href="beacon.url">{{ beacon.apiName }}</a>
    </div>

    <div
      class="b2-beacon-name"
      style="cursor: pointer; user-select: none"
      @click="showDetails()"
    >
      <span style="opacity: 0.65"
        ><Badge type="junk" :text="(cnt + 1).toString()" vertical="middle"
      /></span>

      {{ beacon.templateName }}
      <img
        :src="getArrowSrc()"
        style="cursor: pointer; height: 12px; margin-top: 0px"
      />
    </div>
    <div class="b2-beacon-description">
      {{ beacon.description }}
    </div>
    <div class="b2-beacon-id">Beacon ID: {{ beacon.beaconId }}</div>

    <beacons-browser2-BeaconDetails
      v-show="beacon.showDetails === true"
      v-bind:beacon="beacon"
    />
  </div>
</template>

<script>
export default {
  name: 'BeaconItem',
  props: ['beacon', 'cnt'],
  methods: {
    getArrowSrc() {
      if (!this.beacon.showDetails) return '/img/arrow-right-16.png';
      else return '/img/arrow-down-16.png';
    },
    showDetails() {
      this.$parent.collapseBeaconDetails(this.beacon.beaconId);
      this.beacon.showDetails = !this.beacon.showDetails;
    },
  },
};
</script>

<style>
.b2-beacon-box {
  padding-top: 5px;
  padding-left: 5px;
  padding-bottom: 10px;
  border: solid lightgrey 1px;
  border-radius: 0.5em;
  margin-bottom: 5px;
  max-width: 620px;
}
.b2-beacon-provider {
  float: right;
  padding-right: 15px;
  color: gray;
  font-size: x-small;
  font-weight: bold;
}
.b2-beacon-name {
  font-weight: bold;
  margin-left: 4px;
  margin-bottom: 5px;
}
.b2-beacon-description {
  font-size: medium;
  color: gray;
  padding-left: 10px;
}
.b2-beacon-id {
  font-size: small;
  max-width: 600px;
  overflow-wrap: break-word;
  padding-left: 10px;
}
</style>
