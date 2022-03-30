<!--
  This component displays a checkmark badge when a new job(s) 
  is posted. It is triggered off the jobPageRevision field in
  config.js. The browser stores a key in localStorage if the reader
  has visited the job page and the badge is hidden. So if the browser
  localStorage key = the config.js field jobPageRevision, the badge 
  is hidden.
-->

<template>
  <div>
    <RouterLink to="/api3/introduction/work" class="home-link"
      ><span v-if="showBadge === true" class="jobsBadge">✅</span>
      <img src="/img/work.png" class="jobsIcon" />
    </RouterLink>
  </div>
</template>

<script>
import { jobPageRevision } from '../../config.js';

export default {
  name: 'JobsIcon',
  data() {
    return {
      jobPageRevision: jobPageRevision,
      showBadge: false,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.showBadge =
        this.jobPageRevision ===
        parseInt(localStorage.getItem('jobPageRevision'))
          ? false
          : true;
    });
  },
  watch: {
    $route(event) {
      if (event.path.indexOf('/api3/introduction/work.') > -1) {
        localStorage.setItem('jobPageRevision', this.jobPageRevision);
        this.showBadge = false;
      }
    },
  },
};
</script>

<style lang="stylus">
.jobsBadge {
    position:relative;
    top:1px;
    left:29px;
    font-size:small;
}
.jobsIcon {
    width: 28px;
    height: 28px;
    padding-top: 4px;
    margin-right: 28px
}
</style>
