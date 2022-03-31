---
title: Custom Components
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

There are custom Vue Components located in .vuepress/components. See the code comments within each component for execution details. These components are copied to node_modules/@vuepress/themeConfig/components or node_modules/@vuepress/plugins when running or building the project locally.

## TocHeader.vue

TocHeader.vue adds an element to any markdown file and displays "Table of Contents" above the VuePress community generated **vuepress-plugin-table-of-contents**. It aligns itself above the TOC using css in index.styl, look for the .toc-label class.

[TocHeader.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/TocHeader.vue)

## Versions.vue and VersionsModal.vue

VersionsModal.vue is a child component of Versions.vue. Versions.vue has been added to the navbar to allow users to switch between versions of the docs. It has been added to the [Navbar.vue](override-components.md#navbar-vue) VuePress component which api3-docs overrides.

[Versions.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/Versions.vue)

[VersionsModal.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/VersionsModal.vue)

## VersionWarning.vue

VersionsModal.vue is a warning dialog that appears at the top of each page in older versions of all versioned documents sets. It contains a link to the latest version.

[VersionWarning.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/VersionWarning.vue)

## DocumentSets.vue

DocumentSets.vue is placed on the top of [Sidebar.vue](override-components.md#sidebar-vue). It contains a pick list to the different document sets of which some are versioned.

[DocumentSets.vue](https://github.com/api3dao/api3-docs/blob/main/docs/.vuepress/components/DocumentSets.vue)

## JobsIcon.vue

This component displays a _Job Icon_ that links to a job listing page in the API3 document set. It also displays a checkmark badge when a counter (`jobPageRevision`) from the `config.js` file is incremented and is larger than the counter stored in the browser's localStorage by the SPA.

Therefore, when the user visits the job page the SPA stores a reference to the `jobPageRevision` integer locally in the browser's localStorage. The badge will be removed for the life of the SPA. So if the browser localStorage key `jobPageRevision` equals the config.js field `jobPageRevision`, the badge is hidden.

All the logic for the jobs icon and its badge are self contained in this component.

Anytime you wish to force the reappearance of the badge, increment the `jobPageRevision` field in the `config.js` file by (1) before redeploying the docs. Once incremented the badge will eventually reappear. This is accomplished by the reader's behavior.

- The reader launches the doc site from a blank browser page thus loading the SPA.
- The reader reloads the currently displayed SPA.

Not all readers will experience the reappearance of the badge at the same time. There is no backend support such as websockets for the docs to implement such behavior at his time.
