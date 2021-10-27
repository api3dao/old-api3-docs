<!--
Fix.vue and FixInline.vue are marker components used as a placeholder for items 
that need to be resolved inside a document. These are not meant to be used 
in production docs. Use only for /next.
-->

<template>
  <span class="slot" >
      <span> > {{content}} < </span>
  </span>
</template>

<script>
  export default {
    name: 'fix-inline',
    props: ['content']
  }
</script>

<style scoped>
  .slot{
    padding-left:10px;
    font-size:medium;
    color:red;
  }

</style>