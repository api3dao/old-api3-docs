<template>
  <div style="margin-top: 20px">
    <div class="flex-container">
      <div class="flex-left">
        <a
          href="javascript:void(0)"
          class="chain-page-back-btn"
          v-on:click="goBack()"
          >←</a
        >
      </div>
      <div class="flex-right">
        <div v-if="childPageData" style="font-size: x-large; font-weight: 600">
          {{ childPageData.pageTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildPage',
  props: {
    parentPath: {}, // The parent page HTML path.
  },
  data: () => ({
    childPageData: undefined,
  }),
  beforeDestroy() {
    var elements = document.getElementsByClassName('sidebar-link');
    elements.forEach((element) => {
      // If the new route does is not the current route, make inactive
      if (!element.href.endsWith(this.$router.currentRoute.path)) {
        element.classList.remove('active');
        element.removeAttribute('aria-current');
      }
      // If the route is returning to the parent, make the parent active
      else if (element.href.endsWith(this.parentPath)) {
        element.className += ' active';
        element.setAttribute('aria-current', 'page');
      }
    });
  },
  mounted() {
    this.$nextTick(async function () {
      var elements = document.getElementsByClassName('sidebar-link');
      elements.forEach((element) => {
        if (element.href.endsWith(this.parentPath)) {
          element.className += ' active';
          element.setAttribute('aria-current', 'page');
        } else {
          element.classList.remove('active');
          element.removeAttribute('aria-current');
        }
      });
      // Needed because the parent has set the localStorage and
      // and a delay is needed for it to set.
      setTimeout(() => {
        this.childPageData =
          JSON.parse(localStorage.getItem('childPageData')) || undefined;
      }, 20);
    });
  },
  methods: {
    goBack() {
      history.back();
    },
  },
};
</script>

<style scoped>
.chain-page-back-btn {
  /*position: fixed;
  top: 65px;
  margin-left: -25px;
  margin-right: 30px;*/

  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
}
.flex-container {
  display: flex;
  border-bottom: 1px solid gray;
  /*border: 1px solid gray;*/
}

.flex-left {
  margin-top: 9px;
  width: 58px;
  height: 6vh;
}

.flex-right {
  margin-top: 19px;
  height: 6vh;
}
</style>
