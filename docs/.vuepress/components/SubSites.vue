<!--
@deprecated: This component has been replaced with DocumentSets.vue.


This component places icons (sub-sites) in the header of the sidebar. 

NOTE: When this component is MOUNTED (as it is mounted from a landing page click),
it will alwasy set this.lastVisited to the config.js latestVersion var. Therefor
it is normal behavior to force the user to the lastest version of airnode.
-->

<template>
  <div>
    <div v-if="isMounted" class="container" style="font-size: medium">
      <router-link
        class="route-link"
        :to="{ path: lastVisited }"
        v-bind:class="{ selectedButton: btnAirnode }"
      >
        <img
          v-if="btnAirnode"
          src="/img/01-Airnode-State=Active@2x.png"
          class="icon-shrink"
        />
        <img
          v-if="!btnAirnode"
          src="/img/01-Airnode-State=Default@2x.png"
          class="icon-shrink"
        />
        <div class="btnText">Airnode</div>
      </router-link>
      <router-link
        class="route-link"
        to="/dao-members/"
        v-bind:class="{ selectedButton: btnMembers }"
      >
        <img
          v-if="btnMembers"
          src="/img/02-DAO-State=Active@2x-1.png"
          class="icon-shrink"
        />
        <img
          v-if="!btnMembers"
          src="/img/02-DAO-State=Default@2x-1.png"
          class="icon-shrink"
        />
        <div class="btnText">DAO Members</div>
      </router-link>
      <router-link
        class="route-link"
        to="/api3/"
        v-bind:class="{ selectedButton: btnAPI3 }"
      >
        <img
          v-if="btnAPI3"
          src="/img/03-API3-State=Active@2x-2.png"
          class="icon-shrink"
        />
        <img
          v-if="!btnAPI3"
          src="/img/03-API3-State=Default@2x-2.png"
          class="icon-shrink"
        />
        <div class="btnText">API3</div>
      </router-link>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import { latestVersion } from '../config.js';

export default {
  name: 'sub-sites',
  data: () => ({
    lastVisited: latestVersion,
    btnAPI3: false,
    btnMembers: false,
    btnAirnode: false,
    isMounted: false, // When the page is mounted show icons to avoid flickering
  }),
  watch: {
    $route($event) {
      this.selectIcon();
    },
  },
  methods: {
    selectIcon() {
      this.btnAirnode = false;
      this.btnMembers = false;
      this.btnAPI3 = false;
      if (this.$route.path.indexOf('/dao-members/') > -1) {
        this.btnMembers = true;
      } else if (this.$route.path.indexOf('/airnode/') > -1) {
        this.btnAirnode = true;
        this.setLastVersionVisited();
      } else if (this.$route.path.indexOf('/api3/') > -1) {
        this.btnAPI3 = true;
      }
    },
    setLastVersionVisited() {
      if (this.$route.path.indexOf('/airnode/') > -1) {
        let arr = this.$route.path.split('/');
        this.lastVisited = '/' + arr[1] + '/' + arr[2] + '/';
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
      this.selectIcon();
      this.isMounted = true;
    });
  },
};
</script>

<style scoped>
.selectedButton {
  color: black !important;
}

div.container {
  margin-top: 4px;
  display: flex;
  flex-flow: row;
  align-items: left;
  justify-content: center;
}

.icon-shrink {
  width: auto;
  height: 50%;
}

.btnText {
  font-size: 14px;
  margin-top: -5px;
}

.route-link {
  padding: 5px;
  color: #a0a0a0;
  text-align: center;
  margin-top: 10px;
  margin-bottom: -20px;
}

.divider {
  border-top: solid 2px lightgrey;
  margin-top: -5px;
  margin-bottom: -12px;
}
</style>
