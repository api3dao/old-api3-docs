<!--
  This component displays a list of all Chains sorted by name.
  It loads from the operations repo real-time.
-->

<template>
  <div v-if="loaded === true">
    <blockquote>
      ChainList.vue
      <button @click="openOverlay()">Open Overlay</button>
    </blockquote>

    <Overlay ref="overlayChild" />
  </div>
</template>

<script>
export default {
  name: 'ChainList',
  data: () => ({
    loaded: false,
    showSpinner: false,
    error: null,
    chains: [],
    chainsFetched: [],
  }),
  mounted() {
    this.loaded = true;
    this.$nextTick(async function () {});
  },
  methods: {
    // This function called by BeaconItem.vue to open and set the beacon in hte overly
    openOverlay() {
      this.$refs.overlayChild.openOverlay();
      // Show overlay
      //document.getElementById('api3-overlay').style.width = '350px';
    },
  },
};
</script>
