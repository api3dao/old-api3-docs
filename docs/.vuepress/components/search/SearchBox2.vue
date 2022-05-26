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

import matchQuery from './match-query';

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
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break;
        const p = pages[i];

        // Filter by the path in "p"
        if (!this.filterByPath(p)) {
          continue;
        }

        if (matchQuery(query, p)) {
          res.push(p);
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break;
            const h = p.headers[j];
            if (h.title && matchQuery(query, p, h.title)) {
              res.push(
                Object.assign({}, p, {
                  path: p.path + '#' + h.slug,
                  folder: p.folder,
                  header: h,
                })
              );
            }
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

      if (['airnode', 'beacon', 'ois'].includes(docSet[1])) {
        this.currentDocSetWithVersion = '/' + docSet[1] + '/' + docSet[2];
      } else {
        this.currentDocSetWithVersion = '/' + docSet[1];
      }
    },
    filterByPath(p) {
      // Only allow the search to show items found in hte current doc set
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
