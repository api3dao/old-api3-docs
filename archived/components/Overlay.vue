<!--
Loads a child component dynamically as provide in the property
childComponent. Caller passes childComponent and data to pass
along to the childComponent.
-->

<template>
  <!-- The overlay -->
  <div id="api3-overlay" class="api3-overlay" v-show="showOverlay">
    <a href="javascript:void(0)" class="close-btn" v-on:click="closeOverlay()"
      >&times;</a
    >
    <!-- Dynamically loaded child component-->
    <div ref="childComponent"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Overlay',
  props: {
    childComponent: {}, // The Vue component to display
    data: {}, // A single object with all the property data the child component requires
  },
  data: () => ({
    width: '414px', // Set to the max width of popular mobile devices
    showOverlay: false,
  }),
  mounted() {
    this.$nextTick(async function () {
      var ComponentClass = Vue.extend(this.childComponent);
      var instance = new ComponentClass({
        propsData: { data: this.data },
      });
      instance.$mount(); // pass nothing
      this.$refs.childComponent.appendChild(instance.$el);

      // Mobile starts at 414px
      if (screen.width < 415) {
        this.width = '96.7%'; // Mobile can be full screen
      }
    });
  },
  methods: {
    openOverlay() {
      document.getElementById('api3-overlay').style.width = this.width;
      this.showOverlay = true;
    },
    closeOverlay() {
      this.showOverlay = false;
    },
  },
};
</script>

<style>
.api3-overlay {
  height: 100%;
  position: fixed;
  z-index: 1;
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 50px;
  top: 0;
  right: 0;
  background-color: white;
  border-left: 2px solid lightgrey;
  overflow: auto;
}

.api3-overlay .close-btn {
  /* color: #50c878; to light */
  position: fixed;
  top: 54px;
  right: 15px;
  font-size: 58px;
  text-decoration: none;
  font-weight: bold;
}

.xb2-overlay-content {
  margin-top: 40px;
  overflow-wrap: break-word;
}

.xb2-overlay-content-box {
  width: 97%;
  box-shadow: 2px 2px 5px lightgrey;
  border: 1px solid lightgrey;
  border-radius: 0.4em;
  padding: 3px;
}
.xb2-overlay .back-btn {
  position: fixed;
  top: 75px;
  right: 315px;
  font-size: 37px;
  text-decoration: none;
}

.xb2-overlay-pane-main {
  padding-top: 0px;
}
.xb2-overlay-pane-template {
  padding-top: 0px;
}

.xb2-overlay-title {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: bold;
  /* Truncate the name, to fit between buttons. */
}
</style>
