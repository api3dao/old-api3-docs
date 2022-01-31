<!--
Child of Versions.vue. Presents a list of user version selections. 

Parameters from parent
- env
- versions
- shoModal

- Renders a versions list
- Sends user to selects version using router-link
- Sends emit message to parent to close modal both on a selection or click-behind
-->

<template>
  <div class="modal" v-if="showModal" v-click-outside="onClickOutside">
    <div v-if="showModal">
      <div>
        <div style="border-bottom: 1px solid lightgrey">Versions</div>
        <div
          v-for="(vrs, index) in versions"
          :key="index"
          v-on:click="onClickOutside(vrs.url, $event)"
        >
          <router-link :to="vrs.url">
            <span class="label">{{ vrs.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import vClickOutside from 'v-click-outside';
Vue.use(vClickOutside);

export default {
  name: 'versions-modal',
  props: {
    env: String,
    showModal: Boolean,
    versions: Array,
  },
  methods: {
    onClickOutside(url, event) {
      this.$emit('clicked'); // goes to parent method
    },
  },
};
</script>

<style>
.modal {
  font-size: medium;
  padding: 10px;
  border-radius: 6px;
  color: gray;
  position: absolute;
  top: 136px;
  left: 93px;
  transform: translate(-50%, -50%);
  width: 100px;
  max-width: 100px;
  height: 160px;
  max-height: 160px;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
}
</style>
