<template>
  <!-- v-show="beacon.show === true" -->

  <div class="b2-beacon-box" :key="beacon.beaconId">
    <div class="b2-beacon-provider">
      <a :href="beacon.url">{{ beacon.apiName }}</a> <ExternalLinkImage />
    </div>

    <div
      class="b2-beacon-name"
      style="cursor: pointer; user-select: none"
      @click="showDetails()"
    >
      <span style="opacity: 0.6"
        ><Badge type="junk" :text="(cnt + 1).toString()" vertical="middle"
      /></span>

      {{ beacon.templateName }}
    </div>
    <div class="b2-beacon-description">
      {{ beacon.description }}
    </div>
    <div class="b2-ids">Beacon ID: {{ beacon.beaconId }}</div>
  </div>
</template>

<script>
export default {
  name: 'BeaconItem',
  props: ['beacon', 'cnt'],
  methods: {
    showDetails() {
      this.$parent.openOverlay(this.beacon, this.cnt);
    },
  },
};
</script>
