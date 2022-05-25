---
title: Replacement Components
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Replacement components "replace" default VuePress components. Therefore the
original VuePress component is no longer referenced in the SPA framework (as
with [Override Components](./override-components.md)) that starts and loads the
docs.

## SearchBoxBtn2.vue

The replacement component SearchBar2.vue replaces VuePress `SearchBox.vue`. The
file `match-query.js` and is located in `/doc/.vuepress/components` for the
purpose of filtering all page content of a search. Filtering only looks at
heading elements (H1-H5).

`SearchBoxBtn2.vue` is loaded into the SPA via the
[NavBar.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Navbar.vue)
component.

#### Changes

- Filters out results that are not part of the current document set including a
  particular version, if any.
- Searching can be done on the landing pages across all document sets.
- Adds a folder indicator when the filtered doc is not in the root level of the
  sidebar.

[SearchBox2.vue, SearchBoxBtn2.vue, SearchBoxList2.vue, search.svg](https://github.com/api3dao/api3-docs/tree/main/docs/.vuepress/components/search)
