<template>
  <div class="ls-search-list" v-if="suggestions && suggestionsCnt > 0">
    <!-- To show a li below 
      1. is a header and the basePath === '/' and header.cnt > 0
      2. is a true link, has s.path
    -->
    <ul class="ls-suggestions" @mouseleave="unfocus">
      <li
        v-for="(s, i) in suggestions"
        v-show="(s.header && s.header.cnt > 0 && basePath === '/') || s.path"
        :key="i"
        class="ls-suggestion"
        :class="{ focused: i === focusIndex }"
        @mouseenter="focus(i)"
      >
        <!-- Headers -->
        <div v-if="s.header" class="ls-suggestion-header">
          {{ s.header.title }}
          <span style="font-size: x-small">({{ s.header.cnt }})</span>
        </div>

        <!-- Links -->
        <a v-if="s.path" href="javascript:void(0)" @click="go(s.path)">
          <!-- Has folder -->
          <div v-if="s.folder">
            <div class="ls-page-folder">
              <span style="font-size: x-small">📂</span>
              {{ s.folder }}
            </div>
            <div class="ls-page-title">
              └&nbsp;<span style="font-size: xx-small">📄</span>&nbsp;{{
                s.pageTitle
              }}
            </div>
            <div v-if="s.headerTitle" class="ls-header">
              └&nbsp;#&nbsp;{{ s.headerTitle }}
            </div>
          </div>

          <!-- No folder -->
          <div v-if="!s.folder">
            <div class="ls-page-title">
              <span style="font-size: xx-small">📄</span>&nbsp;{{ s.pageTitle }}
            </div>
            <div v-if="s.headerTitle" class="ls-header-no-folder">
              └&nbsp;#&nbsp;{{ s.headerTitle }}
            </div>
          </div>
          <!--div style="font-size: xx-small">:{{ s.path }}</div-->
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchBoxList2',
  props: ['suggestions', 'suggestionsCnt', 'basePath'],
  data() {
    return {
      focused: false,
      focusIndex: undefined,
    };
  },
  methods: {
    go(path) {
      if (this.$route.fullPath !== path) {
        this.$router.push(path);
      }
      this.focusIndex = -1;
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        this.$parent.onClickOutside();
      }
    },

    focus(i) {
      this.focusIndex = i;
    },

    unfocus() {
      this.focusIndex = -1;
    },
  },
};
</script>

<style lang="stylus">

.ls-search-list
  user-select none
  margin-top 9px
  border-top solid lightgrey 2px
  border-bottom solid lightgrey 2px
  .ls-docSet-heading
    max-width 200px
    border-bottom solid lightgrey 1px
    .ls-docSet-cnt
      font-size small
      margin-left 10px
      color gray
  .ls-suggestions
    margin-bottom -50px
    margin-top -10px
    background #fff
    max-width 34rem

    padding 0.1rem
    list-style-type none
    &.align-right
      right 0
  .ls-suggestion
    word-break break-word
    max-width 300px
    line-height 1.4
    padding 0.2rem 0.2rem
    border-radius 6px
    cursor pointer
    margin .5rem
    .ls-suggestion-header
      border-bottom solid 1px lightgrey
      font-weight 600
      margin-left -10px
    a
      white-space normal
      color lighten($textColor, 35%)
      .ls-page-folder
        font-size 0.9em
        font-weight 600
      .ls-page-title
        font-size 0.8em
        font-weight 600
        margin-left:2px

      .ls-header
        font-size 0.7em
        font-weight 400
        margin-left:20px

      .ls-header-no-folder
        font-size 0.7em
        font-weight 400
        margin-left:1px

    &.focused
      background-color #f3f4f5
      a
        color $accentColor
</style>
