<!-- https://github.com/vuejs/vuepress/issues/257 

https://stackoverflow.com/questions/54697757/read-file-inside-current-directory-using-vue
-->

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import helloText from './test.md';  // OR: const helloText = require('./hello.txt')

export default {
  methods: {
    getPoemList () {
      console.log({ helloText });
    }
  },
  mounted() {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        // console.log('this.$nextTick > $route.path', this.$route.path)
        console.log({ helloText });
      })
    }
}
</script>