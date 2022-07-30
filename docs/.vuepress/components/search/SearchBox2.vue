<!--
Possible text highlighting: https://x-team.com/blog/highlight-text-vue-regex/
-->

<template>
  <div
    class="sb-search2-modal"
    v-click-outside="onClickOutside"
    style="user-select: none"
  >
    <div class="sb-search-input-box">
      <input
        ref="input"
        aria-label="Search"
        :value="query"
        :class="{ focused: focused }"
        placeholder="minimum 3 characters"
        autocomplete="off"
        spellcheck="false"
        @input="query = $event.target.value"
        @focus="focused = true"
        @blur="focused = false"
        @keyup.enter="go(focusIndex)"
        @keyup.up="onUp"
        @keyup.down="onDown"
      />&nbsp;&nbsp;<span v-if="suggestions">({{ suggestions.length }})</span>
    </div>
    <search-SearchBoxList2 :suggestions="suggestions" />
  </div>
</template>

<script>
import Vue from 'vue';
import vClickOutside from 'v-click-outside';
Vue.use(vClickOutside);

/* global SEARCH_MAX_SUGGESTIONS, SEARCH_PATHS, SEARCH_HOTKEYS */
export default {
  name: 'SearchBox2',
  data() {
    return {
      query: localStorage.getItem('search_query') || '',
      scrollY: localStorage.getItem('scrollY'),
      focused: false,
      focusIndex: 0,
      currentDocSetWithVersion: undefined, // The doc set the user is reading
    };
  },

  computed: {
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length;
    },
    suggestions() {
      const query = this.query.trim().toLowerCase();
      if (!this.currentDocSetWithVersion) {
        this.setCurrentDocSet();
      }
      if (query.length < 3) {
        localStorage.setItem('search_query', '');
        return;
      }
      localStorage.setItem('search_query', query);

      const { pages } = this.$site;
      const max =
        this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS;

      const res = [];
      const words = query.split(' ');

      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break;
        const p = pages[i];
        // Filters by the path in "p", current doc set only
        if (!this.filterByPath(p)) {
          continue;
        }

        words.some(checkTitle);
        words.some(checkHeaders);

        // Does the title contain any words (OR)
        function checkTitle(word) {
          if (p.title.toLowerCase().indexOf(word.toLowerCase()) > -1) {
            res.push({
              level: 0,
              path: p.path,
              folder: p.frontmatter.folder,
              pageTitle: p.title,
            });
          }
        }

        // Do the headers contain any words (OR)
        function checkHeaders(word) {
          if (p.headers) {
            p.headers.forEach((h) => {
              if (h.title.toLowerCase().indexOf(word.toLowerCase()) > -1) {
                res.push({
                  level: h.level,
                  path: p.path + '#' + h.slug,
                  folder: p.frontmatter.folder,
                  headerTitle: h.title,
                  pageTitle: p.title,
                });
              }
            });
          }
        }
      }
      return res;
    },
  },

  mounted() {
    this.placeholder = this.$site.themeConfig.searchPlaceholder || '';
    document.addEventListener('keydown', this.onHotkey);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onHotkey);
  },

  methods: {
    onClickOutside(url, event) {
      this.$emit('clicked'); // goes to parent method
    },
    setCurrentDocSet() {
      const docSet = this.$route.path.split('/');

      if (['airnode', 'ois'].includes(docSet[1])) {
        this.currentDocSetWithVersion = '/' + docSet[1] + '/' + docSet[2];
      } else {
        this.currentDocSetWithVersion = '/' + docSet[1];
      }
    },
    filterByPath(p) {
      // Only allow the search to show items found in the current doc set
      if (p.regularPath.indexOf(this.currentDocSetWithVersion) === 0) {
        return true;
      }
      return false;
    },
    onHotkey(event) {
      if (
        event.srcElement === document.body &&
        SEARCH_HOTKEYS.includes(event.key)
      ) {
        this.$refs.input.focus();
        event.preventDefault();
      }
    },

    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--;
        } else {
          this.focusIndex = this.suggestions.length - 1;
        }
      }
    },

    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++;
        } else {
          this.focusIndex = 0;
        }
      }
    },
  },
};
</script>

<style scoped>
.sb-search2-modal {
  font-size: medium;
  padding: 10px;
  border-radius: 6px;
  color: gray;
  position: absolute;
  left: 0px;
  top: 46px;
  width: 300px !important;
  height: 700px;
  z-index: 999;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-y: auto;
}
</style>

<style lang="stylus">

.sb-show-path{
  font-size x-large
  height: 2rem
}
.sb-search-input-box

  input
    width 13rem
    cursor text
    height 1.5rem
    color lighten($textColor, 25%)
    display inline-block
    border 2px solid darken($borderColor, 10%)
    border-radius 2rem
    font-size 1.2rem
    line-height 2rem
    padding 0.3rem 0.5rem .4rem 2rem
    outline none
    transition all .2s ease
    background #fff url(./search.svg) 0.6rem 0.6rem no-repeat
    background-size 1.2rem

@media (max-width: $MQMobile)
  .sb-search2-modal
    width 300px
    margin-left calc(100% - 90vw)
</style>
