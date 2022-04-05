<!--

W3 Off-Canvas menu
-->

<template>
  <!-- The overlay -->
  <div id="api3-overlay" class="api3-overlay" v-show="showOverlay">
    <a href="javascript:void(0)" class="close-btn" v-on:click="closeOverlay()"
      >&times;</a
    >

    <div ref="childComponent"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import Dialog from './airnode/SponsorWalletWarning';
import ChainItem from './chains/ChainItem';

export default {
  name: 'Overlay',
  components: { Dialog, ChainItem },
  data: () => ({
    width: '414px',
    showOverlay: false,
  }),
  mounted() {
    //var main_page = document.getElementsByClassName(
    //var overlay = document.getElementById('api3-overlay');
    this.$nextTick(async function () {
      console.log('++++++++++++++++++++');

      var ComponentClass = Vue.extend(ChainItem);
      var instance = new ComponentClass({
        propsData: { type: 'primary' },
      });

      instance.$mount(); // pass nothing
      console.log(2, this.$refs.childComponent.appendChild);
      this.$refs.childComponent.appendChild(instance.$el);

      // Mobile starts at 414px
      if (screen.width < 415) {
        this.width = '97%'; // Mobile can be full screen
      }
    });
  },
  methods: {
    openOverlay() {
      this.showOverlay = true;
      document.getElementById('api3-overlay').style.width = this.width;
    },
    closeOverlay() {
      this.showOverlay = false;
    },
    /*resize(width) {
      console.log('resize', width);
      //this.overlay.style.width = width;
      document.getElementById('api3-overlay').style.width = width;
    },*/
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
  transition: 0.5s;

  border-left: 2px solid lightgrey;
  overflow: auto;
}
.b2-overlay-content {
  margin-top: 40px;
  overflow-wrap: break-word;
}

.b2-overlay-content-box {
  width: 97%;
  box-shadow: 2px 2px 5px lightgrey;
  border: 1px solid lightgrey;
  border-radius: 0.4em;
  padding: 3px;
}
.b2-overlay .back-btn {
  position: fixed;
  top: 75px;
  right: 315px;
  font-size: 37px;
  text-decoration: none;
}

.api3-overlay .close-btn {
  /* color: #50c878; to light */
  position: fixed;
  top: 54px;
  right: 15px;
  font-size: 58px;
  text-decoration: none;
}

.b2-overlay-pane-main {
  padding-top: 0px;
}
.b2-overlay-pane-template {
  padding-top: 0px;
}

.b2-overlay-title {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: bold;
  /* Truncate the name, to fit between buttons. */
}
</style>
