<!--
  This component displays Medium blog posts.
  It loads the titles from blog-posts.json which 
  must be updated on a regular basis.
-->

<template>
  <div>
    <!-- By Group -->
    <div
      v-show="tab === 'byGroup'"
      v-for="(item, index) in medium"
      :key="index"
    >
      <div class="medium-heading">{{ item.tag }}</div>
      <div class="medium-link" v-for="(post, index) in item.posts" :key="index">
        <a :href="post.url" target="api3_docs">{{ post.title }}</a>
        - <span class="date">{{ post.date }}</span>
      </div>
    </div>

    <!-- By Date -->
    <div
      v-show="tab === 'byDate'"
      class="medium-link"
      v-for="(post, i) in mediumByDate"
      :key="'A' + i"
    >
      <a :href="post.url" target="api3_docs">{{ post.title }}</a>
      - <span class="date">{{ post.date }}</span>
    </div>
  </div>
</template>

<script>
import { medium } from '../blog-posts.json';

export default {
  name: 'BlogPosts',
  props: { tab: String },
  data: () => ({
    medium: medium,
    mediumByDate: [],
  }),
  mounted() {
    this.arr = medium;
    this.arr.forEach((group) => {
      group.posts.forEach((post) => {
        this.mediumByDate.push(post);
      });
    });
    this.mediumByDate.sort(this.sortByDate);
  },
  methods: {
    sortByDate(a, b) {
      if (a.dt > b.dt) {
        return -1;
      }
      if (a.dt < b.dt) {
        return 1;
      }
      return 0;
    },
  },
};
</script>

<style>
.date {
  color: gray;
  font-size: x-small;
  font-weight: bold;
}
.medium-heading {
  color: gray;
  font-size: large;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid lightgrey;
}
.medium-link {
  padding-left: 20px;
  padding-bottom: 10px;
}
</style>
