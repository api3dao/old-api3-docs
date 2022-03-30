<!--
This component places document sets in the header of the sidebar. 

NOTE: When this component is MOUNTED (as it is mounted from a landing page click),
it will always default to the startPath in config.json.
-->

<template>
  <div>
    <h3 style="auto; text-align:center;">Document Sets</h3>
    <header class="hero">
      <router-link class="nav-link action-button btn" :to="latestVersion"
        ><span class="btnText">Airnode →</span></router-link
      >

      <router-link class="nav-link action-button btn" :to="latestBeaconVersion"
        ><span class="btnText">Beacons →</span></router-link
      >

      <router-link class="nav-link action-button btn" :to="latestOisVersion"
        ><span class="btnText">OIS →</span></router-link
      >
      <br />
      <router-link class="nav-link action-button btn" to="/dao-members/"
        ><span class="btnText">DAO Members →</span></router-link
      >

      <router-link class="nav-link action-button btn" to="/api3/"
        ><span class="btnText">API3 →</span></router-link
      >
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
