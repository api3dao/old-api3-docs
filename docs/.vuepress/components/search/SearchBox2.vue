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
    <search-SearchBoxSelect2 :path="path" />
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
      v: Vue.version,
      query: localStorage.getItem('search_query') || '',
      scrollY: localStorage.getItem('scrollY'),
      focused: false,
      focusIndex: 0,
      path: undefined,
    };
  },
  computed: {
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length;
    },
    suggestions() {
      const query = this.query.trim().toLowerCase();

      // This prevents excessive filtering when now
      // looking thru "All Documentation" .
      if (!this.path) {
        this.setPath();
      }

      // Store the query
      if (query.length < 3) {
        localStorage.setItem('search_query', '');
        return;
      }
      localStorage.setItem('search_query', query);

      const { pages } = this.$site;
      pages.sort(this.sortByPath);
      const max =
        this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS;

      const res = []; // The array to the pages to, to be returned
      const words = query.split(' '); // Array of words from the query string

      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break;
        const p = pages[i];

        // Filters by the path in "p", current doc set only
        if (!this.filterByPath(p)) {
          continue;
        }

        // Skip the landing page
        if (p.path === '/') continue;

        words.some(checkTitle);
        words.some(checkHeaders);

        // Does the title contain any words (OR)
        function checkTitle(word) {
          if (p.title.toLowerCase().indexOf(word.toLowerCase()) > -1) {
            res.push({
              level: 0,
              page: p,
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
                  p_path: p.path,
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

        // Sort the pages from $site
      }
      console.log(res);
      return res;
    },
  },

  mounted() {
    this.setPath();
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
    updatePathFromChild(path) {
      // Called by child "SearchBoxSelect2.vue" component's "picklist"
      this.path = path;
    },
    sortByPath(a, b) {
      if (a.path > b.path) {
        return -1;
      }
      if (a.path < b.path) {
        return 1;
      }
      return 0;
    },
    setPath() {
      const docSet = this.$route.path.split('/');
      if (['airnode', 'ois'].includes(docSet[1])) {
        this.path = '/' + docSet[1] + '/' + docSet[2];
      } else {
        this.path = '/' + docSet[1];
      }
    },
    filterByPath(p) {
      // Only show items found in the reader's select doc set
      if (p.regularPath.indexOf(this.path) === 0) {
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

select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  cursor: inherit;
  line-height: inherit;
}

.select {
  display: grid;
  grid-template-areas: 'select';
  align-items: center;
  position: relative;
}
</style>

<style lang="stylus">

.sb-tab
  border none
  padding 0
  background none
  color #50c878
  font-size medium
  font-weight 600
  cursor pointer
  margin-top 12px
  .sb-tab-selected
    padding-bottom 3px
    color black
    border-bottom solid black 2px

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
