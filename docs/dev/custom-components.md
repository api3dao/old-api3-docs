---
title: Custom Components
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

There are custom Vue Components located in .vuepress/components. See the code
comments within each component for execution details. These components are
copied to node_modules/@vuepress/themeConfig/components or
node_modules/@vuepress/plugins when running or building the project locally.

## TocHeader.vue

TocHeader.vue adds an element to any markdown file and displays "Table of
Contents" above the VuePress community generated
**vuepress-plugin-table-of-contents**. It aligns itself above the TOC using css
in index.styl, look for the .toc-label class.

[TocHeader.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/TocHeader.vue)

## Fix.vue & FixInline.vue

Fix.vue and FixInline.vue are marker components used as a placeholder for items
that need to be resolved inside a document. These are not meant to be used in
production docs. Use only for `/next`.

[Fix.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Fix.vue)

[FixInline.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/FixInline.vue)

**Usage:**

```html
<Fix content="A paragraph fix tag." />

<FixInline content="An inline fix tag." />
```

<Fix content="A paragraph fix tag." />

The is how:<FixInline content="An inline fix tag" /> looks.

## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been
added to the navbar to allow users to switch between versions of the docs. It
has been added to the [Navbar.vue](override-components.md#navbar-vue) vuepress
component which api3-docs overrides.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/VersionsModal.vue)

## SubSites.vue

SubSites.vue is placed on the top of
[Sidebar.vue](override-components.md#sidebar-vue). It contains icons with
hard-coded links to sub-sites (routes) such as Airnode, DAO Members and API3.

[SubSites.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/SubSites.vue)
