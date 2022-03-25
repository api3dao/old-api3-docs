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
    <div class="b2-ids">Beacon ID: {{ beacon.beaconId }}</div>

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
    openOverlay() {},
    getArrowSrc() {
      if (!this.beacon.showDetails) return '/img/arrow-right-16.png';
      else return '/img/arrow-down-16.png';
    },
    showDetails() {
      this.$parent.collapseBeaconDetails(this.beacon.beaconId);
      this.beacon.showDetails = !this.beacon.showDetails;
      //document.getElementById('myNav').style.height = '100%';
    },
  },
};
</script>
