---
title: Custom Components
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

There are three custom Vue Components located in .vuepress/components. See the code comments within each component for execution details.

## TocHeader

[TocHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/TocHeader.vue)

This is a simple label that is rendered above the VuePress provided TOC. 

## Versions.vue and VersionsModal.vue

[Versions.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/VersionsModal.vue)

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been added to the navbar to allow users to switch between versions of the docs.

## Sidebar Header

[SidebarHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/SidebarHeader.vue)

SidebarHeader.vue has been added to the sidebar to allow users to switch between categories of the current version. It is presented as a row of buttons across the top of the sidebar. Some versions may not have categories and as such buttons will not be present.
