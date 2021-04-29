<!-- 
  Overlay
  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_overlay
-->

<template>
  <div>
    
      <div @click="openModal" style="padding-left:2px;cursor:pointer;display:flex;align-items: center;">
        <font-awesome-icon icon="eye" style="font-size:x-large;border-left:solid 4px #7963B2;color:#7963B2;padding-left:10px;"/> 
        <span style="font-size:medium;padding-left:10px;color:#7963B2;">{{label}}</span>
      </div> 
      

      <!-- The Overlay -->
      <div :id="overlayID" class="overlay">
        
        <a href="javascript:void(0)" :id="overlayID+'closeBtn'" class="closebtn" @click="closeModal()">&times;</a>
        <div class="overlay-content">
          <h2 style="padding-left:20px;">{{title}}</h2>
          <p style="padding-left:20px;padding-right:20px;"><slot>The slot</slot></p>
        </div>
      </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { library, icon } from '@fortawesome/fontawesome-svg-core'
  import { faEye } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  Vue.component('font-awesome-icon', FontAwesomeIcon)
  library.add(faEye)
  //const eye = icon({prefix: 'fas', iconName: 'eye'})

  var overlayPane;
  var closeBtn;
  export default {
    name: 'overlay',
    props:{
      overlayID:String,
      title:String,
      label:String
    },
    data: () => ({
      icon:icon({prefix: 'fas', iconName: 'eye'})
    }),
    methods: {
      openModal (url, event) {
        overlayPane = document.getElementById(this.overlayID);
        overlayPane.style.width = "100%";
        closeBtn = document.getElementById(this.overlayID+'closeBtn');
        closeBtn.style.visibility = 'visible';
        
      },
      closeModal (url, event, id) {
        closeBtn.style.visibility = 'hidden';
        overlayPane.style.width = "0%";
      }
    },
    mounted() {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        console.log(this.overlayID)
      })
    }
  }
</script>

<style scoped>


.overlay {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 999; /* was 1 */
  top: 0;
  left: 0;
  background-color:#f5fffa;
  /*background-color:rgba(56,56,56);*/
  /*background-color:rgb(0,0,0);*/
  /*background-color: rgba(0,0,0, 0.9);*/
  overflow-x: hidden;
  transition: 0.5s;

}

.overlay-content {
  position: relative;
  top: 0%; /* was 25% */
  width: 100%;
  text-align: left; /* was center */
  margin-top: 0px;
  /*color:#f5fffa;*/
  color:#181818;
  padding-left:0px;
}

.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/*.overlay a:hover, .overlay a:focus {
  color: #f1f1f1;
}*/

.overlay .closebtn {
  position: fixed;
  top: -20px;
  right: 45px;
  font-size: 60px; /* was 60px */
  z-index:1000;
  visibility:hidden;
}

@media screen and (max-height: 450px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
  font-size: 40px;
  top: 20px;
  right: 35px;
  }
}

</style>