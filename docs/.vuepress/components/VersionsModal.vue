<!-- https://morioh.com/p/cbf9735ca6fb -->

<template>
    <div class="modal" v-if="showModal" v-click-outside="onClickOutside">
        <div v-if="showModal" class="modal-content">
            <!--div class="modal-header">
                <slot name="header"></slot>
            </div-->

            <div class="modal-body">
                <!--slot name="body"></slot-->
                <div style="border-bottom:1px solid lightgrey;">Versions</div>
                  <div v-for="vrs in versions" v-on:click="onClickOutside">
                    <router-link  :to="vrs.url" v-if="vrs.name!='next' || (vrs.name==='next' && env==='development')">
                      <span class="label">{{vrs.name}}</span>
                    </router-link>
                  </div>
            </div>
            <!--div class="modal-footer"></div-->
  
        </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import vClickOutside from 'v-click-outside'
  import { versions, env } from '../config.js'
  Vue.use(vClickOutside)

  export default {
    name: 'versions-modal',
    props: {
      env: String,
      showModal: Boolean,
      versions: Array
    },
    methods: {
      onClickOutside (event) {
        console.log('Clicked outside. Event: ', event)
        this.$emit('clicked') // goes to parent method
      },
    },
  };
</script>

<style>
  .modal {
    font-size:medium;
    padding: 10px;
    border-radius:10px;
    color:gray;
    position: absolute;
    top: 125px;
    left: 100px;
    transform: translate(-50%, -50%);
    width: 100px;
    max-width: 100px;
    height: 160px;
    max-height: 160px;
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
  }
</style>