<!--
Used to output the value of a few VuePress system variables to the browser console.
-->

<template>
  <span> </span>
</template>

<script>
export default {
  name: 'ThemeConfigJson',
  mounted() {
    this.$nextTick(async function () {
      console.log('$site:');
      console.log(this.$site);
      console.log('$themeConfig:');
      console.log(this.$themeConfig);
    });
  },
};
</script>
