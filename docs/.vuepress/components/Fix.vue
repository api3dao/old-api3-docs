<!--
-->

<template>
  <div class="slot">
      <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'fix'
  }
</script>

<style scoped>
  .slot{
    border-left:red 5px solid;
    color:red;

    padding-left:5px;
    font-size:small;
  }
</style>