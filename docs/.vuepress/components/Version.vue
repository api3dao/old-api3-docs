<!-- https://code.luasoftware.com/tutorials/vuepress/vuepress-create-custom-component/ -->
<!-- https://designhammer.com/blog/reusable-vuejs-components-part-2-basic-drop-down-and-v-model -->

<template>
  <div>{{selectedVersion}}
    <!--label style="color:gray;">{{selectedVersion}}</label-->
    <!--select v-model="selected">
        <option v-for="(item) in versions" 

        :value="item">
          <a href="/next/">{{item}}</a>
        </option>
      </select-->
  </div>
</template>

<script>
  export default {
    data: () => ({
      selected: 'next',
      versions: ['next', 'pre-alpha'],
    }),
    
    props: ['selectedVersion'],
    methods: {
      
    }
  }
</script>

<style scoped>
    template, div, select{
      position: fixed;
      top:60px;
      right: 5px;
      font-style:italic;
      font-size:small;
      z-index:999;
      font-weight:bold;
      color:gray;
    }
    select{
      font-size:small;
      color:gray;
      border:0px;
      padding:2px;
    }
  
</style>