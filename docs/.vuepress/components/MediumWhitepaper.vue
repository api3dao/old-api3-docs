<!--
  This component displays Medium blog posts that are related to 
  the API3 Whtepaper.
-->

<template>
  <div>
    <div v-for="(item, index) in medium" :key="index">
      <div class="medium-heading">{{item.tag}}</div>
      <div class="medium-link" v-for="(post, index) in item.posts" :key="index">
        <a :href=post.url target="_api3_medium">{{post.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { medium } from '../medium-whitepaper.json'

export default {
  name: 'MediumWhitepaper',

  data: () => ({
    medium:medium
  }),
  methods: {
    clickMe(ev) {
      console.log('Click Me')
    },
  },

  mounted() {
    console.log('Medium mounted', medium)
  }
}
</script>

<style>
  .medium-heading {
    color:gray;
    font-size:large;
    font-weight:bold;
    margin-top:10px;
    margin-bottom:15px;
    border-bottom:1px solid lightgrey;
  }
  .medium-link {
    padding-left:20px;
    padding-bottom: 10px;
  }
</style>