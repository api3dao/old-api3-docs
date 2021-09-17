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

## Fix.vue & FixInline.vue

[Fix.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Fix.vue)

[FixInline.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/FixInline.vue)

Fix.vue and FixInline.vue are marker components used as a placeholder for items that need to be resolved inside a document. Use &lt;Fix> to set a marker between paragraphs and &lt;FixInline> to place a marker within a sentence.

The content must be wrapped in paragraph tags (&lt;p>&lt;/p>) to display properly if there are line breaks between the opening and closing (&lt;Fix>&lt;/Fix>) or (&lt;FixInline>&lt;/FixInline>)tags. The use of the paragraph tags is considered a temporary fix until a workaround is found as Vue `slots` seems to have issue with the line breaks.

**Usage:**
```html
<Fix>The usage is valid because there are line breaks between tags.</Fix>

<Fix>
<p>Because there are line breaks between tags, use of a <p> element is needed.</p>
</Fix>
```

<Fix>The usage is valid because there are line breaks between tags.</Fix>

<Fix>
<p>Because there are line breaks between tags, use of a &#60;p> element is needed.</p>
</Fix>

## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been added to the navbar to allow users to switch between versions of the docs.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/VersionsModal.vue)

## SidebarHeader.vue

::: warning No Longer Used
This component is no longer used but is kept as an archived component in case it is needed again. It could be used as a sidebar header to hold almost anything.
:::

[SidebarHeader.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/SidebarHeader.vue)
