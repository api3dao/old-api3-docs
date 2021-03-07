<template>
    <div >
      <div class="container" :name="header.vrs" v-for="(header, index) in headers" :selected="header.vrs">
            <div v-if="header.vrs===currentVersion" v-for="(btn, index) in header.buttons">
              <router-link v-bind:class="{ selectedButton: btn.isActive }" class="route-link" :to="btn.url">
                <font-awesome-icon :icon="btn.img" size="2x" />
                <br />
                <span class="label">{{btn.label}}</span>
              </router-link>
            </div>
          
      </div>
      <div style="border-top:solid 1px lightgrey;margin-bottom:-10px;"/></div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faUsers } from '@fortawesome/free-solid-svg-icons'
  import { faSitemap } from '@fortawesome/free-solid-svg-icons'
  import { faEye } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  library.add(faUsers, faSitemap, faEye)
  import { sidebarHeaders } from '../config.js'

  export default {
    components: {
    },
    computed: {
      currentVersion: function () {
          return this.$page.path.split('/')[1].replace(/\//g,'');
      },
    },
    data: () => ({
      headers:sidebarHeaders,
    }),
    methods: {
      select(btnUrl) {
        let vrs = btnUrl.split('/')[1]
        //console.log('\n>>> 1', vrs, btnUrl)
        
        this.headers.forEach(function(head) {
            if(head.vrs===vrs){
              //console.log(2, head.vrs, vrs)
              head.buttons.forEach(function(btn) {
                  btn.isActive = false
                  //console.log('> flag', btnUrl.startsWith(btn.url))
                  if(btnUrl.startsWith(btn.url)) btn.isActive = true
                  //console.log(3, btn.url, btnUrl)
              });
            }
        });
      },
    },
    watch: {
    '$route'($event) {
        //console.clear()
        //console.log('\n--------------------------\n>>> $route', this.$route.path)     
        this.select(this.$route.path)
      }
    },
    beforeRouteUpdate (to, from, next) {
      console.log('beforeRouteUpdate')
    },
    beforeMount() {
      console.log('\n-----SidebarHeader -----')
      console.log('this.$page.path:', this.$page.path)
      console.log('currentVersion:', this.currentVersion)
      //console.log('beforeMount env:', env)
      //this.environment = env
      //console.log('this.environment:', this.environment)
    },
  }
</script>

<style scoped>
  .selectedButton {
      /*outline: solid 1px gray;*/
      color:black !important;
  }

  div.container{
    display:flex;flex-flow: row wrap;align-items: center;
    justify-content: center;
  }

  .route-link{
    color:#A0A0A0;
    text-align:center;
    margin:10px;
  }

  span.label{
    font-size:small;
    color:black;
  }

</style>