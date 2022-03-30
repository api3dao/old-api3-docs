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
          <img
            v-show="docSets[0].name !== 'ChainAPI'"
            :src="docSets[0].iconActive"
            class="icon-shrink"
          />
          <!-- This is temp for ChainAPI. Remove the v-show in hte directive above
          when ChainAPI is removed. -->
          <img
            v-show="docSets[0].name === 'ChainAPI'"
            :src="docSets[0].iconActive"
            class="icon-shrink-chainapi"
            style="
              width: 35px;
              height: 35px;
              margin-top: 10px;
              margin-bottom: 2px;
            "
          />
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
            <!-- Temp until ChainAPI moves out of the docs -->
            <img
              :src="item.iconInactive"
              class="icon-shrink-chainapi"
              v-if="!item.active && item.name === 'ChainAPI'"
            />
            <!-- For ChainAPI update the v-if statement -->
            <img
              :src="item.iconInactive"
              class="icon-shrink"
              v-if="!item.active && item.name !== 'ChainAPI'"
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
        iconInactive: '/img/01-Airnode-State=Default@2x.png',
        path: latestVersion,
      },
      {
        name: 'Beacons',
        iconActive: '/img/Beacons-active.png',
        iconInactive: '/img/Beacons-default.png',
        path: latestBeaconVersion,
      },
      {
        name: 'OIS',
        iconActive: '/img/ois-active.png',
        iconInactive: '/img/ois-inactive.png',
        path: latestOisVersion,
      },
      {
        name: 'ChainAPI',
        iconActive: '/img/chainapi-active.png',
        iconInactive: '/img/chainapi-inactive.png',
        path: '/chainapi/',
      },
      {
        name: 'DAO Members',
        iconActive: '/img/02-DAO-State=Active@2x-1.png',
        iconInactive: '/img/02-DAO-State=Default@2x-1.png',
        path: '/dao-members/',
      },
      {
        name: 'API3',
        iconActive: '/img/03-API3-State=Active@2x-2.png',
        iconInactive: '/img/03-API3-State=Default@2x-2.png',
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

      // START TEMPORARY
      // This is a temp fix until ChainAPI goes into prod. If the user discovers
      // ChainAPI (via url) then add it into the pick list.
      let flag = false;
      for (var i = 0; i < this.docSets.length; i++) {
        if (this.docSets[i].name === 'ChainAPI') {
          flag = true;
          break;
        }
      }
      if (!flag && path.indexOf('/chainapi') > -1) {
        this.docSets.push({
          name: 'ChainAPI',
          iconActive: '/img/chainapi-active.png',
          iconInactive: '/img/chainapi-inactive.png',
          path: '/chainapi/',
        });
      }
      /// END TEMPORARY

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
          path.indexOf('/airnode/v') > -1 &&
          this.docSets[i].path.indexOf('/airnode/v') > -1
        ) {
          let arr = path.split('/');
          this.docSets[i].path = '/' + arr[1] + '/' + arr[2] + '/';
        }
        // Beacon (versioned)
        else if (
          path.indexOf('/beacon/v') > -1 &&
          this.docSets[i].path.indexOf('/beacon/v') > -1
        ) {
          let arr = path.split('/');
          this.docSets[i].path = '/' + arr[1] + '/' + arr[2] + '/';
        }
        // OIS (versioned)
        else if (
          path.indexOf('/ois/v') > -1 &&
          this.docSets[i].path.indexOf('/ois/v') > -1
        ) {
          let arr = path.split('/');
          this.docSets[i].path = '/' + arr[1] + '/' + arr[2] + '/';
        }

        // Splice and push the path to top of doc set array
        if (path.indexOf(this.docSets[i].path) > -1) {
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
      // TEMP remove ChainApi for now
      if (this.env != 'development') {
        this.docSets.splice(3, 1); // Removes ChainApi
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
.icon-shrink-chainapi {
  width: 39px;
  height: 39px;
  margin-top: 8px;
  margin-right: 7px;
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
