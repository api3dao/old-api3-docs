<template>
  <aside class="sidebar">
    <NavLinks />

    <slot name="top" />

    <!-- wkande added 2021-09-20 replaces the sub-sites component. -->
    <DocumentSets />

    <SidebarLinks :depth="0" :items="items" />
    <slot name="bottom" />
  </aside>
</template>

<script>
import SidebarLinks from '@theme/components/SidebarLinks.vue';
import NavLinks from '@theme/components/NavLinks.vue';

export default {
  name: 'Sidebar',
  // Added wkande 2021-12-13 usable for various reasons.
  data: () => ({
    env: process.env.NODE_ENV,
  }),
  components: { SidebarLinks, NavLinks },
  props: ['items'],
  /** Added wkande 2022-02-24 - This allow for the SPA to recognize any
    anchor (hash) that may be attached to the URL that loads the SPA. It 
    will force the viewport to scroll to the heading that matches the 
    anchor if it exists. The setTimeout is needed to allow the scrollIntoView()
    function to get the heading completely to the top of the page.
  */
  mounted() {
    this.$nextTick(function () {
      setTimeout(() => {
        const hash = document.location.hash;
        if (hash && hash.length > 1) {
          const id = hash.substring(1);
          const element = document.getElementById(id);
          if (element) element.scrollIntoView(true);
        }
      }, 10); // 10 so that repeated refreshes come to the top
    });
  },
};
</script>

<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top .75rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
