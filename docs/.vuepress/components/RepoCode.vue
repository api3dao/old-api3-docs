<!--
https://morioh.com/p/ff92e45cadd6
-->

<template>
  <div>
    <pre><code style="font-size:.90em;color:goldenrod;">{{code}}</code></pre>
  </div>
</template>



<script>
  import Vue from 'vue'
  import axios from 'axios'; 
  Vue.prototype.$http = axios;

  export default {
    name: 'repo-code',
    props: ['urlRaw'],
    data () {
      return {
        code: null
      }
    },
    mounted() {
      this.fetchCode();
    },
    methods: {
      fetchCode: async function () {
        try {
          const result = await this.$http.get(this.urlRaw);
          this.code = result.data
        }
        catch(error) {
          console.log(error.response.status)
          console.log(error.response.data)
          this.code = 'The file failed to load from the repo.\n\n'+error.response.data+
          '\n\n'+this.urlRaw;

        }
      }
    }
  }

</script>

<style scoped>

</style>