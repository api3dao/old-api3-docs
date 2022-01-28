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

## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been
added to the navbar to allow users to switch between versions of the docs. It
has been added to the [Navbar.vue](override-components.md#navbar-vue) VuePress
component which api3-docs overrides.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/VersionsModal.vue)

## DocumentSets.vue

DocumentSets.vue is placed on the top of
[Sidebar.vue](override-components.md#sidebar-vue). It contains a pick list to
the different document sets of which some are versioned.

[DocumentSets.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/DocumentSets.vue)

## JobsIcon.vue

This component displays a checkmark badge when a new job(s) is posted. It is
triggered off the `jobPageRevision` field in `config.js`. The browser stores a
key in localStorage (equal to the current value of `jobPageRevision`) if the
reader has visited the job page followed by the hiding of the badge. So if the
browser localStorage key `jobPageRevision` equals the config.js field
`jobPageRevision`, the badge is hidden.

All the logic for the jobs icon and its badge are self contained in this
component.

Anytime you add a new job to the `workd.md` page, increment the
`jobPageRevision` field in the `config.js` file by (1) before redeploying the
docs. Doing so will cause the badge to reappear for all readers.
