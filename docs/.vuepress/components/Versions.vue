<!--
Parent of VersionsModal.vue. Opens a modal of user version selections.

- Opens a modal passing versions list to modal and env (development or production)
- Receives emit message from child component to close modal (@clicked="onChildClick")
-->

<template>
    <span class="nav-site" v-bind:style="{ display: showMenu }">
      <button class="navsite-btn" @click="openModal">
        <!--{{this.$page.path.split('/')[2].replace(/\//g,'')}}-->
        {{this.versionDisplay}}
      </button>
      <VersionsModal v-if="showModal" :showModal=showModal @clicked="onChildClick" :env=environment :versions=versions />
    </span>
</template>

<script>
  import { env, versions } from '../config.js'
  import VersionsModal from './VersionsModal';

  export default {
    name: 'versions',
    components: {
      VersionsModal
    },
    data: () => ({
      environment:env,
      showModal: false,
      versions:versions,
      showMenu:'none',
      versionDisplay:''
    }),
    methods: {
      openModal() {
        this.showModal = !this.showModal;
      },
      onChildClick () {
        // The modal will send a msg to close when user clicks outside the modal
        this.showModal = false;
      },
    },
    mounted() {
      this.$nextTick(function () {
        if(this.$route.path.indexOf('/pre-alpha/') > -1 ||
          this.$route.path.indexOf('/next/') > -1){
          this.versionDisplay = this.$page.path.split('/')[2].replace(/\//g,'')
          this.showMenu = 'block'
        }
        //console.log('Versions: this.$nextTick > $route.path:', this.$route.path)
      })
    }
  }
</script>

<style scoped>
  button.navsite-btn{
    outline: none;
    color:#7CE3CB;
    background-color:black;
    border:solid 0px black;
    font-weight:bold;
    font-size:medium;
    margin-right:27px;
    cursor:pointer;
  }
</style>