<!-- 
This component is displayed on a generic ChildPage.vue. 
It data is in this.$childPageData, enhanceApp.js.
-->

<template>
  <div style="padding-top: 15px">
    <div v-if="error === true" class="chain-item-error">
      Failed to load. The childPageData was not present. Please go back and and
      try again.
    </div>
    <div v-if="loaded === true">childPageData: {{ childPageData }}</div>
  </div>
</template>

<script>
export default {
  name: 'ChainDetail',
  data: () => ({
    loaded: false,
    showSpinner: false,
    error: false,
    childPageData: undefined,
  }),
  mounted() {
    this.$nextTick(async function () {
      // Needed because the parent has set the localStorage and
      // and a delay is needed for it to set.
      setTimeout(() => {
        this.childPageData =
          JSON.parse(localStorage.getItem('childPageData')) || undefined;
        if (!this.childPageData) {
          this.error = true;
        } else {
          this.loaded = true;
        }
      }, 1);
    });
  },
  methods: {},
};
</script>

<style scoped>
.chain-item-error {
  color: red;
}
</style>
