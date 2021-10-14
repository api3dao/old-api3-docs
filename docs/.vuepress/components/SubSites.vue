<!--
This component places icons (sub-sites) in the header of the sidebar. 

NOTE: When this component is MOUNTED (as it is mounted from a landing page click),
it will alwasy set this.lastVisited to the config.js latestVersion var. Therefor
it is normal behavior to force the user to the lastest version of airnode.
-->

<template>
  <div>
    <div v-if="isMounted" class="container" style="font-size:medium;">
        <router-link class="route-link" :to="{ path: lastVisited }" v-bind:class="{ selectedButton: btnAirnode }">
          <font-awesome-icon icon="sitemap" size="2x"/>
          <br/><span style="font-size:14px;">Airnode</span>
        </router-link>
        <router-link class="route-link" to="/dao-members/" v-bind:class="{ selectedButton: btnMembers }">
          <font-awesome-icon icon="users" size="2x"/>
          <br/><span style="font-size:14px;">DAO Members</span>
        </router-link>
        <router-link class="route-link" to="/api3/" v-bind:class="{ selectedButton: btnAPI3 }">
          <font-awesome-icon icon="bars" size="2x"/>
          <br/><span style="font-size:14px;">API3</span>
        </router-link>
      </div>
    <div style="border-top:solid 2px lightgrey;margin-top:-5px;margin-bottom:-12px;"></div>
  </div>
</template>

<script>
  
  import Vue from 'vue'
  import { library, icon } from '@fortawesome/fontawesome-svg-core'
  import { faUsers } from '@fortawesome/free-solid-svg-icons'
  import { faSitemap } from '@fortawesome/free-solid-svg-icons'
  import { faEye } from '@fortawesome/free-solid-svg-icons'
  import { faBars } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  library.add(faBars, faUsers, faSitemap, faEye)
  import { latestVersion } from '../config.js'

  export default {
    name: 'sub-sites',
    data: () => ({
      lastVisited: latestVersion,
      btnAPI3: false,
      btnMembers: false,
      btnAirnode: false,
      isMounted: false // When the page is mounted show icons to avoid flickering 
    }),
    watch: {
      '$route'($event) {
        this.selectIcon();
      }
    },
    methods: {
      selectIcon () {
        this.btnAirnode = false
        this.btnMembers = false
        this.btnAPI3 = false
        if(this.$route.path.indexOf('/dao-members/') > -1){
          this.btnMembers = true
        }
        else if(this.$route.path.indexOf('/airnode/') > -1){
          this.btnAirnode = true
          this.setLastVersionVisited()
        }
        else if(this.$route.path.indexOf('/api3/') > -1){
          this.btnAPI3 = true
        }
      },
      setLastVersionVisited() {
        if(this.$route.path.indexOf('/airnode/') > -1){
          let arr = this.$route.path.split('/')
          this.lastVisited = '/'+arr[1]+'/'+arr[2]+'/'
        }
      },
    },
    mounted() {
      this.$nextTick(function () {
        // Code that will run only after the entire view has been rendered
        this.selectIcon();
        this.isMounted = true;
      })
    }
  }
</script>

<style scoped>
  .selectedButton {
      color:black !important;
  }

  div.container{
    margin-top:4px;
    display:flex;flex-flow: row wrap;align-items: left;
    justify-content: center;
  }
  
  .route-link{
    color:#A0A0A0;
    text-align:center;
    margin:10px;
  }
</style>