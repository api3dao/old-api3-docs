<!--
This component places document sets in the header of the sidebar. 

NOTE: When this component is MOUNTED (as it is mounted from a landing page click),
it will always default to the startPath in config.json.
-->

<template>
  <div class="landing-container">
    <li>
      <img src="/img/01-Airnode-State=Active@2x.png" />
      <router-link class="nav-link" :to="latestVersion">Airnode</router-link>
      <p>
        First-party serverless oracle node that solves the Web3 API connectivity
        problem
      </p>
    </li>
    <li>
      <img src="/img/Beacons-active.png" />
      <router-link class="nav-link" :to="latestBeaconVersion"
        >Beacons</router-link
      >
      <p>
        First-party Web3 data feeds powering transparent, reliable, and
        cost-efficient dAPIs, dApps, and more
      </p>
    </li>
    <li>
      <img src="/img/ois-active.png" />
      <router-link class="nav-link" :to="latestOisVersion">OIS</router-link>
      <p>
        Oracle Integration Specifications - linking Airnode endpoints to API
        operations
      </p>
    </li>
    <li>
      <img src="/img/02-DAO-State=Active@2x-1.png" />
      <router-link class="nav-link" to="/dao-members/">DAO Members</router-link>
      <p>API3 DAO structure, functionality, and resources</p>
    </li>
    <li>
      <img src="/img/03-API3-State=Active@2x-2.png" />
      <router-link class="nav-link" to="/api3/">API3 Overview</router-link>
      <p>Resources for learning more about the project and its mission</p>
    </li>
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
/* "nav-link" are from the VuePress classes. */
.landing-container {
  display: flex;
  list-style: none;
  flex-flow: row wrap;
  justify-content: space-between;
}
.landing-container img {
  display: block;
  margin: 0.5rem 0px;
  width: 64px;
}
.landing-container li {
  flex-basis: 160px;
  flex-grow: 1;
  padding: 1rem;
}
.landing-container a {
  font-size: 1.2rem;
}
.landing-container a:hover {
  text-decoration: underline;
}
</style>
