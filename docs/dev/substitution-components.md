---
title: Substitution Components
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

There are a few changes made to some default @vuepress components. See the code
comments within each component for execution details. These components, located
in .vuepress/components, are copied to
`node_modules/@vuepress/themeConfig/components or node_modules/@vuepress/plugins`
when running or building the project locally.

- Navbar.vue > @vuepress/themeConfig/components
- Sidebar.vue > @vuepress/themeConfig/components
- Sub404.vue > @vuepress/themeConfig/components (as 404.vue)
- Home.vue > is not moved to @vuepress, it is defined as a layout page inside
  the root/README.md frontmatter definitions.
- SearchBoxBtn2.vue > is not moved to @vuepress, it is added to `NavBar.vue`
  directly which in turn is moved to @vuepress.

## Home.vue

The component `Home.vue` is a substitute for the VuePress `Home.vue` component.
It provides a different layout for the root README.md file which is rendered as
the Home or Landing Page. The action button will pick up the last page the user
was on before returning to the Home page and use it when returning to the docs.

#### Changes

- Action button uses config.json startUrl to enter the docs.

```js
// Template
---
home: false
layout: Home
...
---

// Computed
actionLink () {
      return {
        /* Changed: wkande: The link is picked up from the config.json file which is set by the title in the Navbar. */
        link: this.$themeConfig.startPath, // Original value: this.data.actionLink,
        text: this.data.actionText
      }
    }
```

[Home.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Home.vue)

## Navbar.vue

The component `Navbar.vue` is a substitute for the VuePress `Navbar.vue`
component. The custom component
[Versions.vue](./custom-components.md#versions-vue-and-versionsmodal-vue) has
been added to `Navbar.vue`.

#### Changes

- Version menu component added.
- Title link updates the setPath key in config.json and returns the user to the
  landing page.
- Logo links to api3.org website.

[Navbar.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Navbar.vue)

## Sidebar.vue

The component `Sidebar.vue` is a substitute for the VuePress `Sidebar.vue`
component. The custom component
[DocumentSets.vue](./custom-components.md#documentsets-vue) has been added to
`Sidebar.vue`.

#### Changes

- Adds a pick list of document sets on top of the sidebar.

[Sidebar.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Sidebar.vue)

## Sub404.vue

The component Sub404.vue is a substitute for the VuePress 404.vue component.

#### Changes

- Interacts with the [Redirects](./redirects.md).

[Sub404.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Sub404.vue)

## SearchBoxBtn2.vue

The component SearchBarBtn2.vue is a substitute for the VuePress `SearchBox.vue`
component. The file `match-query.js` and is located in
`/doc/.vuepress/components` for the purpose of filtering all page content of a
search. Filtering only looks at heading elements (H1-H5).

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

This component starts with a button in the NavBar which opens `SearchBox2.vue`.
The search box collects user input. Each character typed (over 2 total
characters) triggers the `match-query.js` script. The results are then rendered
as individual items in `SearchBoxList2.vue` which is a child component of
`SearchBox2.vue`.
