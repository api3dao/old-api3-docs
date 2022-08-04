<template>
  <div v-if="suggestions" class="ls-search-list">
    <ul class="ls-suggestions" @mouseleave="unfocus">
      <li
        v-for="(s, i) in suggestions"
        :key="i"
        class="ls-suggestion"
        :class="{ focused: i === focusIndex }"
        @mouseenter="focus(i)"
      >
        <a href="javascript:void(0)" @click="go(s.path)">
          <!-- Has folder -->
          <div v-if="s.folder">
            <div class="ls-page-folder">
              <span style="font-size: x-small">📂</span>
              {{ s.folder }}
            </div>
            <div class="ls-page-title">└&nbsp;{{ s.pageTitle }}</div>
            <div v-if="s.headerTitle" class="ls-header">
              └&nbsp;#&nbsp;{{ s.headerTitle }}
            </div>
          </div>

          <!-- No folder -->
          <div v-if="!s.folder">
            <div class="ls-page-title">{{ s.pageTitle }}</div>
            <div v-if="s.headerTitle" class="ls-header-no-folder">
              └&nbsp;#&nbsp;{{ s.headerTitle }}
            </div>
          </div>
          <div style="font-size: xx-small">{{ s.path }}</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchBoxList2',
  props: ['suggestions'],
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
        margin-left:17px

      .ls-header-no-folder
        font-size 0.7em
        font-weight 400
        margin-left:1px

    &.focused
      background-color #f3f4f5
      a
        color $accentColor
</style>
