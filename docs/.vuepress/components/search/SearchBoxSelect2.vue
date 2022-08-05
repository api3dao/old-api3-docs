<template>
  <div style="background-color: white">
    <select
      class="sbs-picklist"
      v-model="selectedPath"
      @change="update($event)"
    >
      <option
        v-for="item in pickList"
        v-bind:key="item.path"
        :value="item.path"
      >
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
import { searchPicklist } from '../../config.js'; // "picklist" selections as doc sets"
export default {
  name: 'SearchBoxSelect2',
  props: ['path'], // input
  data() {
    return {
      selectedPath: this.path, // "model" used by the picklist that the user selection goes into
      pickList: searchPicklist, // "picklist" values from config.json
    };
  },
  methods: {
    // Sends user selection to the $parent component
    update(ev) {
      this.$parent.updatePathFromChild(this.selectedPath);
    },
  },
  mounted() {
    /**
     * https://stackoverflow.com/questions/15025555/option-style-display-none-not-working-in-safari
     *
     * Safari does not allow style "display:none" on "select > option" elements
     * which is what Vue's v-show does. So hiding an option element for "!item.published"
     * will not work.
     *
     * We need to remove the unpublished doc sets from the picklist that are not needed.
     */

    // If the "path" is not in the picklist as "published"
    // then set it to published because the reader has discovered it (SPA reload).
    let obj = this.pickList.find((o) => o.path === this.path && o.published);
    if (!obj) {
      obj = this.pickList.find((o) => o.path === this.path);
      obj.published = true;
      // Let the parent know a new (sudo) published path has been added
      this.$parent.updateDocSetAsPublished(this.path);
    }

    // Now remove anything still unpublished.
    // It sucks that I go thru the array 3 times to clean it
    // up. Can someone fix this to be cleaner?
    let i = 0;
    while (i < 3) {
      this.pickList.forEach((item, index, arr) => {
        if (!item.published) {
          arr.splice(index, 1);
        }
      });
      i++;
    }
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
  border: none

  /* Do not change the below settings. These are needed
     for mobile devices to prevent horizontal scrolling
     of the viewport, excluding margin-top.
  */
  margin-left:0px;margin-top:0px;
  max-width:320px;
}
</style>
