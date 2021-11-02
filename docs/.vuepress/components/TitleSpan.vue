<!--
-->

<template>
  <div id="title-span" :style="cssVars">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'title-span',
  props: ['left'],
  computed: {
    cssVars() {
      return {
        /* variables you want to pass to css */
        '--left': this.left + 'px',
      };
    },
  },
};
</script>

/*
https://stackoverflow.com/questions/42872002/in-vue-js-component-how-to-use-props-in-css
*/
<style scoped>
#title-span {
  opacity: 0.5;
  /*width:300px;*/
  margin-bottom: -70px;
  color: green;
  /*margin-left:var(--left);
    margin-top:-80px;
    margin-bottom:44px;
    transform: rotate(-10deg);*/
  font-weight: 900;
}
</style>
