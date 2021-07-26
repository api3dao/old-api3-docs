<template>
  <div class="title">
    {{title}}
    <div class="divider"/>
  </div>
</template>

<script>
  export default {
    name: 'caption-title', // Cannot use built-in or reserved HTML elements as component id: "caption", so using caption-title.
    props: {title:String}
  }
</script>

<style scoped>
  .title{
    color:grey;
    font-size:medium;
    margin-top:10px;
    margin-bottom:-5px;
  }
  .divider{
    background-color:lightgrey;
    height:2px;
  }
</style>