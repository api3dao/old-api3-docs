<!--
2021-11-02 wkande
DEPRECATED, the use of the common folder can get confusing 
but it a neccesary evil. The use of this component makes it worse.

-->

<template>
  <span>
    <router-link class="route-link" :to="url">
      <slot />
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'common-link',
  props: {
    path: String,
  },
  data: () => ({
    url: '',
  }),
  mounted() {
    this.$nextTick(function () {
      // Code that will run only after the entire view has been rendered
      // Use of .md is allowed but must be converted
      if (this.path.indexOf('.md')) {
        this.url = this.path.replace('.md', '.html');
      }
      // Check for use of <version>
      var arr = this.path.split('/');
      var pathArr = this.$route.path.split('/');
      arr.forEach((element, index) => {
        if (element === '<version>') {
          this.url = this.url.replace('<version>', pathArr[index]);
        }
      });
    });
  },
};
</script>

<style scoped></style>
