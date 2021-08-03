---
title: Custom Components
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

There are custom Vue Components located in .vuepress/components. See the code comments within each component for execution details. These components are copied to node_modules/@vuepress/themeConfig/components or node_modules/@vuepress/plugins when running or building the project locally.

## TocHeader.vue

[TocHeader.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/TocHeader.vue)

TocHeader.vue adds an element to any markdown file and displays "Table of Contents" above the VuePress community generated **vuepress-plugin-table-of-contents**. It aligns itself above the TOC using css in index.styl, look for the .toc-label class.

## Todo.vue

[Todo.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Todo.vue)

Todo.vue is a temporary component used as a placeholder for items that need to be resolved inside a document. A marker (badge) activates in the upper right hand corner of any document that contains one or more Todo components. The content must be wrapped in paragraph tags (&lt;p>&lt;/p>) to display properly as this component uses Vue **slots**.

```html
<Todo>
<p>Example Todo, notice the badge in the upper right hand corner.</p>
</Todo>
```

<Todo>
<p>Example Todo, notice the badge in the upper right hand corner.</p>
</Todo>


## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been added to the navbar to allow users to switch between versions of the docs.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/VersionsModal.vue)

## SidebarHeader.vue

::: danger No Longer Used
This component is no longer used but is kept as an archived component in case it is needed again. It could be used as a sidebar header to hold almost anything.
:::

[SidebarHeader.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/SidebarHeader.vue)
