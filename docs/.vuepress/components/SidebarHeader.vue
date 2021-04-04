<!--

IMPORTANT: This is an archived component, no longer in use. It may be needed in the future
and may no longer be compatible with the versioning scheme. Reintroduction may require 
some cleanup.

A version can have 1-N categories. A category is a logical grouping of docs within
a version. Categories are represented as buttons in the sidebar. If the version has 
no categories no buttons are displayed.
  
Reads sidebarHeaders from config.json and based on the currentVersion
derived from this.$page.path, renders the categories (buttons) of the version if any.

The "Info btn" (if any) must be first row in the header.buttons array.

Important players:
- currentVersion (var): computed value that gets the version from the $page.path
- headers (var): available sidebars from config.json
- select (method): moves the user to the category selected
- watch (event): detects the button click, sees the route change and calls select()
-->

<template>
    <div>

      <div class="container" :name="header.vrs" v-for="(header, index) in headers" :key="index" :selected="header.vrs">

        <div v-for="(btn, index) in header.buttons" :key="index">
            <div v-if="header.vrs===currentVersion && btn.info" >
              <router-link v-bind:class="{ selectedButton: btn.isActive }" class="route-link" :to="btn.baseUrl">
                <font-awesome-icon :icon="btn.img" style="font-size:large;margin-top:-30px;" />
              </router-link>
            </div>
        
            <div v-else-if="header.vrs===currentVersion && !btn.info">
              <router-link v-bind:class="{ selectedButton: btn.isActive }" class="route-link" :to="btn.baseUrl">
                <font-awesome-icon :icon="btn.img" size="2x" />
                <br />
                <span class="label">{{btn.label}}</span>
              </router-link>
            </div>
        </div>
      </div>
      <div style="border-top:solid 1px lightgrey;margin-bottom:-10px;"></div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faUsers } from '@fortawesome/free-solid-svg-icons'
  import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
  import { faSitemap } from '@fortawesome/free-solid-svg-icons'
  import { faEye } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  library.add(faUsers, faSitemap, faEye, faInfoCircle)
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
      select(route) {
        let vrs = route.split('/')[1]
        console.log('\nRoute:', route)
        this.headers.forEach(function(head) {
            if(head.vrs===vrs){
              for (let btn of head.buttons) {
                btn.isActive = false
              }
              let foundIt = false
              for (let btn of head.buttons) {
                  btn.isActive = false
                  if(!btn.info && route.startsWith(btn.baseUrl)) // Roles
                  {
                    console.log('Activated:', btn.baseUrl)
                    btn.isActive = true
                    foundIt = true
                    break
                  }
              };
              /*
                If a category btn was not found then activate the Info btn.
                The header may or may not have an Info button. If not then there
                should have been a category btn match.
              */
              if(!foundIt && head.buttons.length > 0 ){ // Then it goes to the Info btn if the version has buttons.
                console.log('Activated:', head.buttons[0].baseUrl)
                head.buttons[0].isActive = true;
              }
            }
        });
      },
    },
    watch: {
    '$route'($event) {
        //console.log('$route', this.$route.path)     
        this.select(this.$route.path)
      }
    },
    mounted() {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        // console.log('this.$nextTick > $route.path', this.$route.path)
        this.select(this.$route.path)
      })
    }
  }
</script>

<style scoped>
  .selectedButton {
      color:black !important;
  }

  div.container{
    display:flex;flex-flow: row wrap;align-items: left;
    justify-content: left;
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