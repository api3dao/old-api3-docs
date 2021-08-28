<!--
-->

<template>
  <span class="slot" >
      <span style="font-weight:bold;font-size:medium;">></span> <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'fix-inline'
  }
</script>

<style scoped>
  .slot{
    padding-left:10px;
    font-size:small;
    color:red;
  }

</style>