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
      />&nbsp;&nbsp;<span v-if="suggestions">({{ suggestionsCnt }})</span>
    </div>
    <search-SearchBoxSelect2 :path="path" />
    <search-SearchBoxList2 :suggestions="suggestions" />
  </div>
</template>

<script>
import { searchPicklist } from '../../config.js'; // "picklist" selections as doc sets"
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
      suggestionsCnt: 0,
      path: undefined,
      publishedPaths: [],
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

      const { pages } = this.$site; // Load the site pages
      pages.sort(this.sortByPath); // Sort the pages by their path
      const max =
        this.$site.themeConfig.searchMaxSuggestions || SEARCH_MAX_SUGGESTIONS; // Max allowed results set

      const res = []; // Add qualified pages to this array, to be returned
      const words = query.split(' '); // Array of words from the query string
      let headerObj = {
        header: { title: undefined, cnt: undefined, position: undefined },
      };

      this.suggestionsCnt = 0;
      let lastHeaderObj = undefined; // Needed by filter functions
      let lastPath = this.path; // Needed by filter functions
      let lastCnt = 0; // Needed by filter functions

      // LOOP thru pages
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break;

        const p = pages[i];

        // Skip the landing page
        if (p.path === '/') continue;

        // ALL DOCUMENTATION - "PUBLISHED" DOC SETS ONLY
        if (this.path === '/' && !this.filterByPath_allPublished(p)) {
          continue;
        }
        // CURRENT DOC SET (published and unpublished) ONLY: filters by the path in "p"
        else if (!this.filterByPath_currentOnly(p)) {
          continue;
        }

        // HEADER WORK: If reader selected "All Documentation" add a
        // header to the list for each docSetName as it changes. So
        // only for this.path === '/'.
        if (this.path === '/') {
          const docSetName = p.frontmatter.docSetName || 'Unknown';
          if (headerObj.header.title != docSetName) {
            // Create the next header
            headerObj = {
              header: { title: docSetName, cnt: 0, position: res.length },
            };
            res.push(headerObj);
            lastHeaderObj = headerObj;
          }
        }

        words.some(checkTitle);
        words.some(checkHeaders);

        // Does the title contain any words (OR)
        function checkTitle(word) {
          if (p.title.toLowerCase().indexOf(word.toLowerCase()) > -1) {
            if (lastPath === '/') {
              res[lastHeaderObj.header.position].header.cnt++;
            }
            lastCnt++;
            res.push({
              level: 0,
              page: p,
              folder: p.frontmatter.folder,
              pageTitle: p.title,
              path: p.path,
              docSetName: p.frontmatter.docSetName || 'Unknown',
              searchPath: p.frontmatter.searchPath || 'searchPath unknown',
            });
            return 1;
          }
          return 0;
        }

        // Do the page frontmatter headers contain any words (OR)
        function checkHeaders(word) {
          if (p.headers) {
            p.headers.forEach((h) => {
              if (h.title.toLowerCase().indexOf(word.toLowerCase()) > -1) {
                if (lastPath === '/') {
                  res[lastHeaderObj.header.position].header.cnt++;
                }
                lastCnt++;
                res.push({
                  p_path: p.path,
                  level: h.level,
                  path: p.path + '#' + h.slug,
                  folder: p.frontmatter.folder,
                  headerTitle: h.title,
                  pageTitle: p.title,
                  docSetName: p.frontmatter.docSetName || 'Unknown',
                  searchPath: p.frontmatter.searchPath || 'searchPath unknown',
                });
                return 1;
              }
            });
          }
          return 0;
        }
      }
      // Suggestions  cnt
      this.suggestionsCnt = lastCnt;
      return res;
    },
  },

  mounted() {
    // Build an array of published paths
    searchPicklist.forEach((item) => {
      if (item.published) this.publishedPaths.push(item.path);
    });
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
    // FROM CHILD, a new path has been selected
    // Called by child "SearchBoxSelect2.vue" component's "picklist"
    updatePathFromChild(path) {
      this.path = path;
    },
    // FROM CHILD, add a doc set as published because the reader found it (e.g. /dev)
    updateDocSetAsPublished(path) {
      if (!this.publishedPaths.includes(path)) this.publishedPaths.push(path);
    },
    // Sorts the pages by their path
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
    // Only all items that are in published do set
    filterByPath_allPublished(p) {
      if (this.publishedPaths.includes(p.frontmatter.searchPath)) {
        return true;
      }
      return false;
    },
    // Only show items found in the reader's selected doc set
    filterByPath_currentOnly(p) {
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
