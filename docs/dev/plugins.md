---
title: Plugins and Packages
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

The default theme for VuePress uses several plugins that are maintained by the VuePress team. Additionally this project uses plugins developed by the VuePress community. An attempt has been made to only use community plugins that are popular and maintained.

All plugins are installed as [devDependencies](https://github.com/api3dao/api3-docs/blob/main/package.json).

## VuePress Plugins

VuePress plugins are used and some are added by VuePress when a project is created. They only need to be updated as new releases come forward. The versions of each should always be in sync (the same). These plugins are not explained further in this document.

### @vuepress/plugin-back-to-top

Places an up arrow in the bottom right corner that takes the reader to the top of the current page.

### @vuepress/plugin-last-updated

This plugin is added to the project by the default-theme. By default, this plugin produces a 13-bit timestamp for each page, you can also pass in a transformer to convert it to any format that you want.

## Community Plugins

The docs use a few community plugins and packages to enhance the reader experience and to validate certain content.

- v-click-outside
- vuepress-plugin-element-tabs
- vuepress-plugin-table-of-contents

### Lychee

[Lychee](https://github.com/lycheeverse/lychee) finds broken hyperlinks, image src and mail addresses inside Markdown, HTML, reStructuredText, or any other text file or website. It is available as a CLI utility and as a GitHub Action: [lycheeverse/lychee-action](https://github.com/lycheeverse/lychee-action).

See the [GitHub Action](./github-actions.md) doc for info on its implementation.

### Link Validator

This custom Node.js script uses the following packages to validate links. See [Link Validator](link-validator.md) to understand and run the script.

- axios
- colors
- file
- oust

### v-click-outside

This community plugin detects clicks outside an element without stopping the event propagation. It is used in the **.vuepress/components/VersionsModal.vue** custom component to allow clicks behind to close the modal. Note that [VersionsModal.vue](./custom-components.md#versions-vue-and-versionsmodal-vue) is a child component of **Versions.vue**. VersionsModal.vue uses this plugin to emit an event to Versions.vue that in turn closes the modal.

### vuepress-plugin-element-tabs

This [community plugin](https://www.npmjs.com/package/vuepress-plugin-element-tabs) is used to add tabs inside markdown files.

:::: tabs

::: tab Tab One

Tab one contents

:::

::: tab Tab Two

Tab two contents

:::

::::

```md
:::: tabs

::: tab Tab One

Tab one contents

:::

::: tab Tab Two

Tab two contents

:::

::::
```

### vuepress-plugin-table-of-contents

This community plugin was added to avoid using the VuePress native Table of Contents which is not properly adding its links to the browser history stack. This plugin uses the Vue Router for its links which are correctly added to the browser history. As a result the user experience when going back or forward through the history stack is accurate to include anchor positions.
