<template>
  <div class="toc-label">
    Table of Contents
  </div>
</template>

<script>
  export default {
    name:'toc-header',
    data: () => ({

    }),
    beforeMount() {
      console.log('\n----- TocHeader -----')
    },
  }
</script>

<!-- There is a style for TocHeader in index.styl as part of the TOC changes.-->
<style scoped>
  
</style>