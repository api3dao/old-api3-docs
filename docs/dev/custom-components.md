---
title: Custom Components
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

There are custom Vue Components located in .vuepress/components. See the code comments within each component for execution details. These components are copied to node_modules/@vuepress/themeConfig/components or node_modules/@vuepress/plugins when running or building the project locally.

## TocHeader.vue

[TocHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/TocHeader.vue)

TocHeader.vue adds an element to any markdown file and displays "Table of Contents" above the VuePress community generated **vuepress-plugin-table-of-contents**. It aligns itself above the TOC using css in index.styl, look for the .toc-label class.

## Todo.vue

[Todo.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Todo.vue)

Todo.vue is a temporary component used as a placeholder for items that need to be resolved inside a document. A marker (badge) activates in the upper right hand corner of any document that contains one or more Todo components. The Todo can also reference a GitHub issue. Note that there must be a blank line before the closing tag (&lt;/Todo>) as this component uses Vue **slots**.

```html
<Todo :issueID="68">
Example Todo, notice the badge in the upper right hand corner. The Todo can also reference a GitHub issue.

</Todo>
```

<Todo :issueID="68">
Example Todo, notice the badge in the upper right hand corner. The Todo can also reference a GitHub issue.

</Todo>


## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been added to the navbar to allow users to switch between versions of the docs.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/VersionsModal.vue)

## SidebarHeader.vue

::: danger No Longer Used
This component is no longer used but is kept as an archived component in case it is needed again. It could be used as a sidebar header to hold almost anything.
:::

[SidebarHeader.vue](https://github.com/api3dao/api3-docs/blob/stage/docs/.vuepress/components/SidebarHeader.vue)
