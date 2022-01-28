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
    left:39px;
    font-size:small;
}
.jobsIcon {
    width: 28px;
    height: 28px;
    padding-top: 4px;
    margin-right: 10px
}
</style>
