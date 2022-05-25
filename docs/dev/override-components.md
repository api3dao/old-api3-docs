---
title: Override Components
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
- Replacement404.vue > @vuepress/themeConfig/components (as 404.vue)
- Home.vue > is not moved to @vuepress, it is defined as a layout page inside
  the root/README.md frontmatter definitions

## Home.vue

The override component Home.vue is a replacement for the VuePress Home.vue. It
provides a replacement layout for the root README.md file which is rendered as
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

The override component Navbar.vue is a substitute for the VuePress Navbar.vue.
The custom component
[Versions.vue](./custom-components.md#versions-vue-and-versionsmodal-vue) has
been added to **Navbar.vue**.

#### Changes

- Version menu component added.
- Title link updates the setPath key in config.json and returns the user to the
  landing page.
- Logo links to api3.org website.

[Navbar.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Navbar.vue)

## Sidebar.vue

The override component Sidebar.vue is a substitute for the VuePress Sidebar.vue.
The custom component [DocumentSets.vue](./custom-components.md#documentsets-vue)
has been added to **Sidebar.vue**.

#### Changes

- Adds a pick list of document sets on top of the sidebar.

[Sidebar.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Sidebar.vue)

## Replacement404.vue

The override component Replacement404.vue is a substitute for the VuePress
404.vue component.

#### Changes

- Interacts with the [Redirects](./redirects.md).

[Replacement404.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Replacement404.vue)
