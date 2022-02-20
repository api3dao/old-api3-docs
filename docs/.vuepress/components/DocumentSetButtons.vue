<!--
This component places document sets in the header of the sidebar. 

NOTE: When this component is MOUNTED (as it is mounted from a landing page click),
it will always default to the startPath in config.json.
-->

<template>
  <div>
    <header class="hero">
      <div class="features">
        <div class="feature">
          <router-link class="nav-link action-button btn" :to="latestVersion"
            ><span class="btnText">Airnode</span></router-link
          >
          <br />
          <h2>Serverless oracle node</h2>
        </div>

        <div class="feature">
          <router-link
            class="nav-link action-button btn"
            :to="latestBeaconVersion"
            ><span class="btnText">Beacons</span></router-link
          >
          <br />
          <h2>First-party Web3 data feeds</h2>
        </div>
        <div class="feature">
          <router-link class="nav-link action-button btn" :to="latestOisVersion"
            ><span class="btnText">OIS</span></router-link
          >
          <br />
          <h2>Oracle Integration Specifications</h2>
        </div>
        <div class="feature">
          <router-link class="nav-link action-button btn" to="/dao-members/"
            ><span class="btnText">DAO Members</span></router-link
          >
          <br />
          <h2>API3 DAO structure and functionality</h2>
        </div>
        <div class="feature">
          <router-link class="nav-link action-button btn" to="/api3/"
            ><span class="btnText">API3</span></router-link
          >
          <br />
          <h2>About the project</h2>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import {
  latestVersion,
  latestBeaconVersion,
  latestOisVersion,
} from '../config.js';

export default {
  name: 'document-set-buttons',
  data: () => ({
    latestVersion: latestVersion,
    latestBeaconVersion: latestBeaconVersion,
    latestOisVersion: latestOisVersion,
  }),
};
</script>

<style scoped>
/* "hero, nav-link, action-button, and action" are from the VuePress classes. */
.btn {
  margin-top: 5px;
}
</style>
