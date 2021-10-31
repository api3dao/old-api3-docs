---
title: Plugins and Packages
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The default theme for VuePress uses several plugins that are maintained by the
VuePress team. Additionally this project uses plugins developed by the VuePress
community. An attempt has been made to only use community plugins that are
popular and maintained.

All plugins are installed as
[devDependencies](https://github.com/api3dao/api3-docs/blob/main/package.json).

## VuePress Plugins

There Vuepress plugins are used and added by VuePress when a project is created.
They only need to be updated as new releases come forward. The versions of each
should always be in sync (the same). These plugins are not explained further in
this document.

- @vuepress/plugin-back-to-top
- @vuepress/plugin-medium-zoom
- vuepress

### @vuepress/plugin-html-redirect

The following Vuepress plugin is used to establish redirects for external sites
that wish to target a particular page in the docs while using a permanent link
in its code.

- @vuepress/plugin-html-redirect

For example: `/latest/members` will always be pointed to the latest version of
the docs. These mappings are in the `docs/.vuepress/redirects` file.

```bash
# When pre-alpha is the latest version,
/latest /airnode/pre-alpha
/airnode /airnode/pre-alpha
...

# it changes to 0.2 when 0.2.x becomes the latest version.
/latest/ /airnode/v0.2
/airnode /airnode/v0.2
...
```

Note that a redirect is to a directory path and not to a file. There must be a
README.md file in the directory that Vuepress can display. Going to an file will
cause a problem in production and display a counter. However this will not
happen in development. Most likely this is a problem with the plugin as at Jul,
5th 2021.

## Community Plugins

api3-docs uses a few community plugins and packages to enhance the user
experience.

- v-click-outside
- vuepress-plugin-element-tabs
- vuepress-plugin-table-of-contents

### Lychee

[Lychee](https://github.com/lycheeverse/lychee) finds broken hyperlinks, image
src and mail addresses inside Markdown, HTML, reStructuredText, or any other
text file or website. It is available as a CLI utility and as a GitHub Action:
[lycheeverse/lychee-action](https://github.com/lycheeverse/lychee-action).

See the [GitHub Action](./plugin.md) doc for info on its implementation.

### Link Validator

This custom Node.js script uses the following packages to validate links. See
[Link Validator](link-validator.md) to understand and run the script.

- axios
- colors
- file
- oust

### v-click-outside

This community plugin detects clicks outside an element without stopping the
event propagation. It is used in the **.vuepress/components/VersionsModal.vue**
custom component to allow clicks behind to close the modal. Note that
[VersionsModal.vue](./custom-components.md#versions-vue-and-versionsmodal-vue)
is a child component of **Versions.vue**. VersionsModal.vue uses this plugin to
emit an event to Versions.vue that in turn closes the modal.

### vuepress-plugin-element-tabs

This
[community plugin](https://www.npmjs.com/package/vuepress-plugin-element-tabs)
is used to add tabs inside markdown files.

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

This community plugin was added to avoid using the VuePress native Table of
Contents which is not properly adding its links to the browser history stack.
This plugin uses the Vue Router for its links which are correctly added to the
browser history. As a result the user experience when going back or forward
through the history stack is accurate to include anchor positions.
