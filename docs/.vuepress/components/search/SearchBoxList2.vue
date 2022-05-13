<template>
  <div class="ls-search-list">
    <H3
      style="
        user-select: none;
        max-width: 200px;
        border-bottom: solid lightgrey 1px;
      "
      >{{ docSetTitle }}
      <span style="font-size: small; margin-left: 10px; color: gray"
        >({{ suggestions.length }})</span
      >
    </H3>

    <ul class="ls-suggestions" @mouseleave="unfocus">
      <li
        v-for="(s, i) in suggestions"
        :key="docSetTitle + i"
        class="ls-suggestion"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path" @click.prevent>
          <span class="ls-page-title">{{ s.title || s.path }}</span
          ><br />
          <span v-if="s.header" class="ls-header">
            &gt; {{ s.header.title }}</span
          >
          <div v-if="showPath" style="font-family: courier; font-size: x-small">
            {{ s.path }}
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
export default {
  name: 'SearchBoxList2',
  props: ['docSetTitle', 'showPath', 'suggestions'],
  data() {
    return {
      focused: false,
      focusIndex: undefined,
    };
  },
  mounted() {},
  methods: {
    go(i) {
      this.$router.push(this.suggestions[i].path);
      this.focusIndex = -1;
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


  .ls-suggestions

    margin-top -15px
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
      .ls-page-title
        font-size 0.9em
        font-weight 600

      .ls-header
        font-size 0.8em
        user-select none


    &.focused
      background-color #f3f4f5
      a
        color $accentColor
</style>
