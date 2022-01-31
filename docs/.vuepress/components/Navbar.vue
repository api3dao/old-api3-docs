<template>
  <header class="navbar">
    <!-- 
      Changed: 2021-12-15 wkande: The hamburger menu (below) displays on the landing page for mobile.
      Added v-show="isLandingPage" to prevent this.
    -->
    <SidebarButton
      @toggle-sidebar="$emit('toggle-sidebar')"
      v-show="!isLandingPage"
    />

    <!-- 
      Changed: 2021-03-08 wkande: Logo now goes to https://api3.org.
      Changed: 2022-01-31 wkande: The logo is now clipped fro very narrow mobile devices.
    -->
    <a href="https://api3.org" class="home-link">
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        v-bind:class="{ 'logo-clipped': clipLogo }"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      />
    </a>

    <RouterLink :to="$localePath" class="home-link">
      <!-- 
        Added: wkande: v-on:click="$themeConfig.startPath = $route.fullPath" 
        Sets the startPath for the Landing Page (actionLink) with the page 
        the user is currently on.
      -->
      <span
        v-on:click="$themeConfig.startPath = $route.fullPath"
        v-show="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
        >{{ $siteTitle }}</span
      >
    </RouterLink>

    <!-- Links to the right of the searchBox. --->
    <div
      class="links"
      :style="
        linksWrapMaxWidth
          ? {
              'max-width': linksWrapMaxWidth + 'px',
            }
          : {}
      "
    >
      <!-- Added: wkande: This adds the custom Versions component. -->
      <Versions />

      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <!-- Updated: wkande: There are paths where the SearchBox cannot be added. -->
      <SearchBox
        v-else-if="
          $route.path != '/' &&
          $site.themeConfig.search !== false &&
          $page.frontmatter.search !== false
        "
      />
      <!-- Added: wkande: Job posting icon. -->
      <api3-JobsIcon class="can-hide" />

      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox';
import SearchBox from '@SearchBox';
import SidebarButton from '@theme/components/SidebarButton.vue';
import NavLinks from '@theme/components/NavLinks.vue';

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox,
  },
  data() {
    return {
      linksWrapMaxWidth: null,
      // Added 2021-12-15 wkande, see comment above in template.
      isLandingPage: false,
      clipLogo: true,
    };
  },
  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },
    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    },
  },
  mounted() {
    const MOBILE_DESKTOP_BREAKPOINT = 719; // refer to config.styl
    const NAVBAR_VERTICAL_PADDING =
      parseInt(css(this.$el, 'paddingLeft')) +
      parseInt(css(this.$el, 'paddingRight'));
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null;
        if (document.documentElement.clientWidth < 281) {
          this.clipLogo = true;
        } else {
          this.clipLogo = false;
        }
      } else {
        this.clipLogo = false;
        this.linksWrapMaxWidth =
          this.$el.offsetWidth -
          NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0);
      }
    };
    handleLinksWrapWidth();
    window.addEventListener('resize', handleLinksWrapWidth, false);

    // Added 2021-12-15 wkande: the navbar reloads every time the landing page is visited
    // and when entering the SPA. We do not want the hamburger menu to show for the
    // landing page.
    this.$nextTick(function () {
      if (this.$route.path === '/') this.isLandingPage = true;
    });
  },
};

function css(el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView;
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property];
}
</script>

<!-- clip--path
  /* all (top, right, bottom, left)
  https://css-playground.com/view/65/clipping-paths-with-clip-path*/
 number push to the center, not outside positions
-->

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.navbar
  padding $navbar-vertical-padding $navbar-horizontal-padding
  line-height $navbarHeight - 1.4rem
  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .logo-clipped
    clip-path inset(0px 55px 0px 0px)
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    position absolute
    right $navbar-horizontal-padding
    top $navbar-vertical-padding
    display flex
    .search-box
      flex: 0 0 auto
      vertical-align top

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
</style>
