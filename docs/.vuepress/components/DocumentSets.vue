<!--
This component places document sets in the header of the sidebar. 

NOTE: When this component is MOUNTED (as it is mounted from a landing page click),
it will always default to the startPath in config.json.
-->

<template>
  <div>
    <div style="padding-left: 12px; margin-top: -4px" v-if="isMounted">
      <!-- Current Route -->
      <div class="list-line">
        <div
          class="route-link"
          style="cursor: pointer"
          v-on:click="showDocSets = !(showDocSets != false)"
        >
          <img :src="docSets[0].iconActive" class="icon-shrink" />
          <span class="list-line-name" style="margin-top: 12px; color: black">{{
            docSets[0].name
          }}</span>
          <img
            :src="getArrowSrc()"
            v-bind:alt="getArrowSrc()"
            class="route-link"
            style="
              cursor: pointer;
              height: 16px;
              margin-top: 15px;
              color: gray;
              margin-left: 5px;
            "
          />
        </div>
      </div>
      <!-- LOOP -->
      <ul id="doc-sets" v-if="showDocSets" style="border-top: 1px solid gray">
        <li class="list-line" v-for="(item, index) in docSets" :key="item.name">
          <router-link
            class="route-link"
            :to="{ path: item.path }"
            v-if="index > 0"
          >
            <img
              :src="item.iconActive"
              class="icon-shrink"
              v-if="item.active"
            />
            <img
              :src="item.iconInactive"
              class="icon-shrink"
              v-if="!item.active"
            />
            <span class="list-line-name">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import {
  env,
  latestVersion,
  latestBeaconVersion,
  latestOisVersion,
} from '../config.js';

export default {
  name: 'document-sets',
  data: () => ({
    docSets: [
      {
        name: 'Airnode',
        iconActive: '/img/01-Airnode-State=Active@2x.png',
        iconInactive: '/img/airnode-inactive.png',
        path: latestVersion,
      },
      {
        name: 'Beacons',
        iconActive: '/img/beacon-active.png',
        iconInactive: '/img/beacon-inactive.png',
        path: latestBeaconVersion,
      },
      {
        name: 'OIS',
        iconActive: '/img/ois-active.png',
        iconInactive: '/img/ois-inactive.png',
        path: latestOisVersion,
      },
      {
        name: 'DAO Members',
        iconActive: '/img/02-DAO-State=Active@2x-1.png',
        iconInactive: '/img/dao-inactive.png',
        path: '/dao-members/',
      },
      {
        name: 'API3',
        iconActive: '/img/03-API3-State=Active@2x-2.png',
        iconInactive: '/img/api3-inactive.png',
        path: '/api3/',
      },
    ],
    env: env,
    showDocSets: false,
    isMounted: false, // When the page is mounted show icons to avoid flickering
  }),
  watch: {
    $route(event) {
      this.selectIcon(event.path);
    },
  },
  methods: {
    selectIcon(path) {
      // Close the mobile list
      this.showDocSets = false;

      // If the path is still part of the displayed DocSet
      // then do not proceed to change the docSet.
      if (path.substring(0, 13) === this.docSets[0].path) {
        return;
      }

      // Sort the docSets array
      this.docSets.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0
      );

      // Place the current docSet at the top of the array.
      for (var i = 0; i < this.docSets.length; i++) {
        // Airnode (versioned)
        if (
          path.indexOf('/airnode/') > -1 &&
          this.docSets[i].path.indexOf('/airnode/') > -1
        ) {
          let arr = path.split('/');
          this.docSets[i].path = '/' + arr[1] + '/' + arr[2] + '/';
        }
        // Beacon (versioned)
        else if (
          path.indexOf('/beacon/') > -1 &&
          this.docSets[i].path.indexOf('/beacon/') > -1
        ) {
          let arr = path.split('/');
          this.docSets[i].path = '/' + arr[1] + '/' + arr[2] + '/';
        }
        // OIS (versioned)
        else if (
          path.indexOf('/ois/') > -1 &&
          this.docSets[i].path.indexOf('/ois/') > -1
        ) {
          let arr = path.split('/');
          this.docSets[i].path = '/' + arr[1] + '/' + arr[2] + '/';
        }

        // Splice and push selected row to top of array
        if (this.docSets[i].path === path) {
          const obj = this.docSets[i];
          this.docSets.splice(i, 1);
          this.docSets.unshift(obj);
        }
      }
    },
    getArrowSrc() {
      if (!this.showDocSets) return '/img/arrow-right-16.png';
      else return '/img/arrow-down-16.png';
    },
  },
  mounted() {
    // Code that will run only after the entire view has been rendered
    this.$nextTick(function () {
      // TEMP remove Beacon and OIS for now
      if (this.env != 'development') {
        this.docSets.splice(1, 1);
        this.docSets.splice(1, 1);
      }
      this.selectIcon(this.$route.path);
      this.isMounted = true;
    });
  },
};
</script>

<style scoped>
.list-line {
  font-size: x-large;
  font-weight: 500;
}
.list-line-name {
  margin-top: 5px;
  color: gray;
  margin-left: 10px;
}

.icon-shrink {
  width: 45px;
  height: 39px;
  margin-top: 8px;
}

.route-link {
  display: flex;
  flex-flow: row;
  align-items: left;
  justify-content: left;
  padding: 5px;
  color: #a0a0a0;
}

.divider {
  border-top: solid 2px lightgrey;
  margin-top: -5px;
  margin-bottom: -12px;
}
</style>
