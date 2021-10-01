<!--
This component places icons (sub-sites) in the header of the sidebar. 
-->

<template>
  <div>
    <div v-if="isMounted" class="container" style="font-size:medium;">
        <router-link class="route-link" to="/airnode/pre-alpha/" v-bind:class="{ selectedButton: btnAirnode }">
          <font-awesome-icon icon="sitemap" size="2x"/>
          <br/><span style="font-size:14px;">Airnode</span>
        </router-link>
        <router-link class="route-link" to="/dao-members/" v-bind:class="{ selectedButton: btnMembers }">
          <font-awesome-icon icon="users" size="2x"/>
          <br/><span style="font-size:14px;">DAO Members</span>
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
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  library.add(faUsers, faSitemap, faEye)

  export default {
    name: 'sub-sites',
    data () {
      return {
        btnMembers: false,
        btnAirnode: false,
        isMounted: false // When the page is mounted show icons to avoid flickering 
      }
    },
    watch: {
      '$route'($event) {
        this.selectIcon();
      }
    },
    methods: {
      selectIcon () {
        this.btnAirnode = false
        this.btnMembers = false
        if(this.$route.path.indexOf('/dao-members/') > -1){
          this.btnMembers = true
        }
        else if(this.$route.path.indexOf('/airnode/') > -1){
          this.btnAirnode = true
        }
      },
    },
    mounted() {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        this.selectIcon();
        this.isMounted = true;
        //console.log('this.$nextTick > $route.path', this.$route.path)
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