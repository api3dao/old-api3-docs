<template>
  <div class="foo-layout">
    <header>
      <SearchBox/>
    </header>
    <main>
      Some more stuff
    </main>
  </div>
</template>

<script>
import SearchBox from '@SearchBox'

  export default {
    components: { SearchBox },
    beforeMount() {
        console.log('\n----- MySearchBox -----')
        console.log('this.$page.path:', this.$page.path)
    }
  }
</script>