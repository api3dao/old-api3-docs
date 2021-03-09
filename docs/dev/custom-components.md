---
title: Custom Components
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

There are several custom Vue Components located in .vuepress/components. See the code comments within each component for execution details.

## Home

Provides a replacement layout for the root README.md file which is rendered as the Home or Landing Page. The action button will now pick up the last page the user was on before returning to the Home page and use it when returning to the docs.

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

## TocHeader

[TocHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/TocHeader.vue)

Adds a element to any page and displays "Table of Contents" above the VuePress generated **TOC**. It aligns itself above the TOC using css in index.styl, look for the .toc-label class.

## Navbar

This Navbar is a replacement for the VuePress Navbar. Each time the project is run or built this file overwrites the VuePress Navbar.vue file.

- Version menu component added
- Title link updates the setPath key in config.json
- Logo links to api3.org website

[Navbar.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Navbar.vue)

## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been added to the navbar to allow users to switch between versions of the docs.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/VersionsModal.vue)

## SidebarHeader

SidebarHeader.vue has been added to VuePress Sidebar.vue. It allows users to switch between categories of the current version and is presented as a row of buttons across the top of the sidebar. Some versions may not have categories and as such buttons will not be present.

[SidebarHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/SidebarHeader.vue)
