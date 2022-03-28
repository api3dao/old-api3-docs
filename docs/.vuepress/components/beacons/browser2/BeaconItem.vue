<template>
  <div class="b2-beacon-box" :key="beacon.beaconId">
    <div class="b2-beacon-provider">
      <a :href="beacon.url">{{ beacon.apiName }}</a> <ExternalLinkImage />
    </div>

    <div
      class="b2-beacon-name"
      style="cursor: pointer; user-select: none"
      @click="showDetails()"
    >
      <a href="#">
        <span style="opacity: 0.8"
          ><Badge type="junk" :text="(cnt + 1).toString()" vertical="middle"
        /></span>
        {{ beacon.templateName }}</a
      >
    </div>
    <div class="b2-beacon-description">
      {{ beacon.description }}
    </div>
    <div class="b2-ids">ID: {{ beacon.beaconId }}</div>
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

<!-- styles for list items are in BeaconList.vue. -->
