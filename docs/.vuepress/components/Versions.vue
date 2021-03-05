<!-- https://code.luasoftware.com/tutorials/vuepress/vuepress-create-custom-component/ -->

<template>
    <span class="nav-site">
      <button class="navsite-btn" @click="openModal">
        {{this.$page.path.split('/')[1].replace(/\//g,'')}}
      </button>
      <VersionsModal v-if="showModal" :showModal=showModal @clicked="onChildClick" :env=environment :versions=versions />
    </span>
</template>

<script>
  import { beforeMount } from 'vue'
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
      versions:versions
    }),
    methods: {
      openModal() {
        this.showModal = !this.showModal;
      },
      onChildClick () {
        // The modal will send a msg to close when user clicks outside the modal
        this.showModal = false;
      }
    },
    beforeMount() {
      //this.selected = this.$page.path;
      console.log('\n-----NavSite -----')
      console.log('NavSite: this.$page.path:', this.$page.path)
      console.log('NavSite:', this.environment)
    },
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