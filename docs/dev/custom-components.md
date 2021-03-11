---
title: Custom Components
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

There are several custom Vue Components located in .vuepress/components. See the code comments within each component for execution details. These components, located in .vuepress/compomnents, are copied to node_modules/@vuepress/themeConfig/components or node_modules/@vuepress/plugins when running or building the project locally.

## TocHeader.vue

[TocHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/TocHeader.vue)

TocHeader.vue adds an element to any markdown file and displays "Table of Contents" above the VuePress generated **TOC**. It aligns itself above the TOC using css in index.styl, look for the .toc-label class.

## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been added to the navbar to allow users to switch between versions of the docs.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/VersionsModal.vue)

## SidebarHeader.vue

SidebarHeader.vue has been added to VuePress Sidebar.vue. It allows users to switch between categories (a.k.a Roles) of the current version and is presented as a row of buttons across the top of the sidebar. Some versions may not have categories and as such buttons will not be present.

[SidebarHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/SidebarHeader.vue)
