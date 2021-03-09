<!--
A version can have 1-N categories. A category is a logical grouping of docs within
a version. Categories are represented as buttons in the sidebar. If the version has 
no categories no buttons are displayed.
  
Reads sidebarHeaders from config.json and based on the currentVersion
derived from this.$page.path, renders the categories (buttons) of the version if any.

Important players:
- currentVersion (var): computed value that gets the version from the $page.path
- headers (var): available sidebars from config.json
- select (method): moves the user to the category selected
- watch (event): detects the button click, sees the route change and calls select()
-->

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
        this.headers.forEach(function(head) {
            if(head.vrs===vrs){
              head.buttons.forEach(function(btn) {
                  btn.isActive = false
                  if(btnUrl.startsWith(btn.url)) btn.isActive = true
              });
            }
        });
      },
    },
    watch: {
    '$route'($event) {     
        this.select(this.$route.path)
      }
    },
  }
</script>

<style scoped>
  .selectedButton {
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