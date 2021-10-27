<!--
Fix.vue and FixInline.vue are marker components used as a placeholder for items 
that need to be resolved inside a document. These are not meant to be used 
in production docs. Use only for /next.
-->

<template>
  <div class="slot">
      {{content}}
  </div>
</template>

<script>
  export default {
    name: 'fix',
    props: ['content']
  }
</script>

<style scoped>
  .slot{
    border-left:red 5px solid;
    color:red;
    margin-top:20px;
    padding-left:5px;
    font-size:medium;
  }
</style>