<!-- https://code.luasoftware.com/tutorials/vuepress/vuepress-create-custom-component/ -->

<template>
  <div>
    <button @click="testAlert">{{ displayText }}</button>
  </div>
</template>

<script>
export default {
  
  props: ['displayText'],
  methods: {
    testAlert() {
      console.log('Test Alert DUDE')
      alert('Test Alert DUDE');
    }
  }
}
</script>

<style scoped>
    template, div{
      position: fixed;
      top:60px;
      left: 50px;
      z-index:120;
    }
    button {
      background-color:white;
    }
  
</style>