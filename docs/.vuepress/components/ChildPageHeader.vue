<template>
  <div style="margin-top: 20px">
    <div class="child-page-flex-container">
      <div class="child-page-flex-left">
        <a
          href="javascript:void(0)"
          class="child-page-back-btn"
          v-on:click="goBack()"
          >←</a
        >
      </div>
      <div class="child-page-flex-right">
        <div v-if="childPageData" style="font-size: x-large; font-weight: 600">
          {{ childPageData.pageTitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChildPageHeader',
  props: {
    parentPath: {}, // The parent page HTML path.
  },
  data: () => ({
    childPageData: undefined,
  }),
  beforeDestroy() {
    var elements = document.getElementsByClassName('sidebar-link');
    // Here the sidebars selection must be updated.
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
      }, 1);
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
.child-page-back-btn {
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
}

.child-page-flex-container {
  height: 62px;
  display: flex;
  border-bottom: 1px solid gray;
  margin-bottom: 25px;
}

.child-page-flex-left {
  margin-top: 9px;
  width: 58px;
  height: 6vh;
}

.child-page-flex-right {
  margin-top: 19px;
  height: 6vh;
}
</style>
