<!--


Was built 8-8-2022 for the search re-write across multiple doc set. Was 
retired in favor of a select (picklist) and moved to archived just incase it is needed in 
the short term. After a few months probably delete it.

-->

<template>
  <div v-if="basePaths">
    <div style="display: flex; flex-wrap: wrap">
      <div
        v-for="(item, index) in basePaths"
        v-bind:key="index"
        class="sbs-pill-button"
      >
        <span>{{ searchBasePaths[item] }}&nbsp;✖️</span>
      </div>
    </div>

    <div style="border-top: solid lightgrey 1px">Filters</div>
    <div class="sbs-row">
      <div class="sbs-column">
        <div
          v-show="key.indexOf('/airnode') > -1"
          v-for="(value, key, index) in searchBasePaths"
          v-bind:key="index"
        >
          <input
            :checked="setChecked(key)"
            type="checkbox"
            :id="key"
            :value="key"
            @change="updateBasePaths($event)"
            v-on:input="key = $event.target.value"
          />
          <label :for="key">{{ value }}</label>
          <br />
        </div>
      </div>
      <div class="sbs-column">
        <div
          v-show="key.indexOf('/airnode') === -1"
          v-for="(value, key, index) in searchBasePaths"
          v-bind:key="index"
        >
          <input
            :checked="setChecked(key)"
            type="checkbox"
            :id="key"
            :value="key"
            @change="updateBasePaths($event)"
            v-on:input="key = $event.target.value"
          />
          <label :for="key">{{ value }}</label>
          <br />
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import { searchBasePaths } from '../../config.js'; // "searchBasePaths" selections as doc sets"
export default {
  name: 'SearchBoxSelections2',

  data() {
    return {
      basePaths: undefined,
      searchBasePaths: searchBasePaths,
    };
  },
  methods: {
    // Sends user selection to the $parent component
    /*update(ev) {
      this.$parent.updatePathFromChild(this.selectedPath);
    },*/
    setChecked(key) {
      if (this.basePaths.includes(key)) return true;
    },
    updateBasePaths(ev) {
      console.log('\n>>>', ev.target.checked);
      console.log('>>>', ev.target.id);
      console.log('>>>', this.basePaths);
      console.log('-----------------');
      // Remove
      if (!ev.target.checked && this.basePaths.includes(ev.target.id)) {
        for (let i = 0; i < this.basePaths.length; i++) {
          const path = this.basePaths[i];
          if (path === ev.target.id) {
            console.log('> remove @ index:', path, i);
            this.basePaths.splice(i, 1);
            break;
          }
        }
      } else if (ev.target.checked && !this.basePaths.includes(ev.target.id)) {
        console.log('> add', ev.target.id);
        this.basePaths.push(ev.target.id);
      }
      console.log('Final', this.basePaths);
      this.$parent.setBasePathsToLocalStorage(this.basePaths);
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
    //console.log(3, this.pickList);
    this.basePaths = JSON.parse(localStorage.getItem('search_base_paths'));
    console.log(3, this.searchBasePaths);
    console.log(3.1, this.basePaths);
    // If the "path" is not in the picklist as "published"
    // then set it to published because the reader has discovered it (SPA reload).
    /*let obj = this.pickList.find((o) => o.path === this.path && o.published);
    if (!obj) {
      obj = this.pickList.find((o) => o.path === this.path);
      obj.published = true;
      // Let the parent know a new (sudo) published path has been added
      this.$parent.updateDocSetAsPublished(this.path);
    }*/

    // Now remove anything still unpublished.
    // It sucks that I go thru the array 3 times to clean it
    // up. Can someone fix this to be cleaner?
    /*let i = 0;
    while (i < 3) {
      this.pickList.forEach((item, index, arr) => {
        if (!item.published) {
          arr.splice(index, 1);
        }
      });
      i++;
    }*/
  },
};
</script>

<style lang="stylus">

.sbs-pill-button {
  height:20px;
  font-size:small;
  border: solid 1px lightgrey;
  color: black;
  padding: 0px 3px 0px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 26px;
}
.sbs-pill-button span{
  position: relative; top: -8px;
}
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

.sbs-row {
  display: flex;
}

.sbs-column {
  float: left;
  width: 50%;
}
</style>
