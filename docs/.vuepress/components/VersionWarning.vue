<!--
Shows itself when a versioned doc set is not displaying its latest version.
Each page in a doc set adds this component under its title and before 
the TOC if used.

WARNING: Do not place HTML comment lines inside paragraph elements.
-->

<template>
  <div v-if="show" class="custom-block danger">
    <p class="custom-block-title">Newer Version Available</p>
    <p>
      You are viewing an older version of the {{ docSet }} documentation set.
      Try
      <router-link class="version-warning-link" :to="docSetVersionURL">{{
        docSetVersionDisplay
      }}</router-link>
      which is the latest version.
    </p>
  </div>
</template>

<script>
import { versions, versionsBeacon, versionsOis } from '../config.js';

export default {
  name: 'version-warning',
  data: () => ({
    versions: versions,
    versionsBeacon: versionsBeacon,
    versionsOis: versionsOis,
    show: false,
    docSet: undefined,
    docSetVersionDisplay: undefined,
    docSetVersionURL: undefined,
  }),
  methods: {
    parseRoute() {
      const arr = this.$route.path.split('/');
      if (
        arr[1] === 'airnode' &&
        versions.map((x) => x.url).indexOf('/airnode/' + arr[2] + '/') > 0
      ) {
        this.docSet = 'Airnode';
        this.docSetVersionDisplay = versions[0].name;
        this.docSetVersionURL = versions[0].url;
        this.show = true;
      } else if (
        arr[1] === 'beacon' &&
        versionsBeacon.map((x) => x.url).indexOf('/beacon/' + arr[2] + '/') > 0
      ) {
        this.docSet = 'Beacons';
        this.docSetVersionDisplay = versionsBeacon[0].name;
        this.docSetVersionURL = versionsBeacon[0].url;
        this.show = true;
      } else if (
        arr[1] === 'ois' &&
        versionsOis.map((x) => x.url).indexOf('/ois/' + arr[2] + '/') > 0
      ) {
        this.docSetVersionDisplay = versionsOis[0].name;
        this.docSetVersionURL = versionsOis[0].url;
        this.docSet = 'OIS';
        this.show = true;
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.parseRoute();
    });
  },
};
</script>

<style scoped>
.version-warning-link {
  text-decoration: underline;
}
</style>

<style lang="stylus">

@media (max-width: $MQMobile)
  .version-list
    margin-right -25px
</style>
