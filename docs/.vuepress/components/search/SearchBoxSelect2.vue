<template>
  <div style="background-color: white">
    <select
      class="sbs-picklist"
      v-model="selectedPath"
      @change="update($event)"
    >
      <option
        v-for="(value, key, index) in basePaths"
        v-bind:key="index"
        :value="key"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SearchBoxSelect2',
  props: ['pathParam', 'basePathsParam'], // input
  data() {
    return {
      selectedPath: this.pathParam, // "model" used by the picklist that the user selection goes into
      basePaths: this.basePathsParam,
    };
  },
  methods: {
    // Sends user selection to the $parent component
    update(ev) {
      this.$parent.updatePathFromChild(this.selectedPath);
    },
  },
};
</script>

<style lang="stylus">
.sbs-picklist{
  appearance: menu;
  font-size:large;
  width: 280px;
  color:gray;
  border: 2px solid lightgrey;
  border-radius: 5px;
  /* Do not change the below settings. These are needed
     for mobile devices to prevent horizontal scrolling
     of the viewport, excluding margin-top.
  */
  margin-left:0px;margin-top:15px;
  max-width:320px;
}
.sbs-path{
  text-align:center;
  appearance: menulist-text;
  font-size:small;
  width: 280px;
  color:gray;
  border: none;

  /* Do not change the below settings. These are needed
     for mobile devices to prevent horizontal scrolling
     of the viewport, excluding margin-top.
  */
  margin-left:0px;margin-top:0px;
  max-width:320px;
}
</style>
