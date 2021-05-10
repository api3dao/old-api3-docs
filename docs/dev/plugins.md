---
title: Plugins and Packages
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

The default theme for VuePress uses several plugins that are maintained by the VuePress team. Additionally this project uses plugins developed by the VuePress community. An attempt has been made to only use community plugins that are popular and maintained.

All plugins are installed as devDependencies.

```json
"devDependencies": {
  "@fortawesome/fontawesome-svg-core": "^1.2.34",
  "@fortawesome/free-solid-svg-icons": "^5.15.2",
  "@fortawesome/vue-fontawesome": "^2.0.2",
  "@vuepress/plugin-back-to-top": "^1.8.2",
  "@vuepress/plugin-medium-zoom": "^1.8.2",
  "markdown-link-check": "^3.8.6",
  "v-click-outside": "^3.1.2",
  "vuepress": "^1.8.2",
  "vuepress-plugin-element-tabs": "^0.2.8",
  "vuepress-plugin-table-of-contents": "^1.1.7"
},
"dependencies": {}
```

## Vue and VuePress Plugins

These plugins are used and added by VuePress when a project is created. They only need to be updated as new releases come forward. The versions of each should always be in sync (the same). These plugins are not explained further in this document.

- @vuepress/plugin-back-to-top
- @vuepress/plugin-medium-zoom
- vuepress

## Community Plugins

api3-docs uses several community plugins and packages to enhance the user experience.

- @fortawesome/fontawesome-svg-core, free-solid-svg-icons, vue-fontawesome
- markdown-link-check
- v-click-outside
- vuepress-plugin-element-tabs
- vuepress-plugin-table-of-contents

## @fortawesome

Three plugins from [@fortawesome](https://www.npmjs.com/package/@fortawesome/vue-fontawesome) provide access to the  **Font Awesome** icon set. This is a collection of three plugins that work closely together to render Font Awesome icons. An example can be found in the .vuepress.components/SidebarHeader.vue component. SidebarHeader.vue is not in use by this project and is archived. It may be re-introduced in the future.

```js
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faSitemap } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faUsers, faSitemap, faEye)
```

The above imports and code creates three icons that can then be used in HTML code shown below.

```html
// Using bind (:icon) to reference the icon name held in btn.img
<font-awesome-icon :icon="btn.img" size="2x" />

// Using icon to reference the icon directly
<font-awesome-icon icon="users" />
```

## markdown-link-check

This package is used to validate hyperlinks in markdown files. There are two scripts.

- `vuepress "test:links:prod"` validates the production version folders and the dev folder.
- `vuepress "test:links:next"` validates the */next* folder.

This package is also used in a **GitHub Action** on the remote repo to validate hyperlinks on `git push`, see [GitHub Actions](./github-actions.md#markdown-check-link).

Before running `vuepress "docs:build"` or `sh deploy.sh` be sure to run `vuepress "test:links:prod"` first to validate production hyperlinks. See [Deployment](./deployment.md) to learn more about incorporation of this test.

## v-click-outside

This community plugin detects clicks outside an element without stopping the event propagation. It is used in the **.vuepress/components/VersionsModal.vue** custom component to allow clicks behind to close the modal. Note that [VersionsModal.vue](./custom-components.md#VersionsModal.vue) is a child component of **Versions.vue**. VersionsModal.vue uses this plugin to emit an event to Versions.vue that in turn closes the modal.

## vuepress-plugin-element-tabs

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

## vuepress-plugin-table-of-contents

This community plugin was added to avoid using the VuePress native Table of Contents which is not properly adding its links to the browser history stack. This plugin uses the Vue Router for its links which are correctly added to the browser history. As a result the user experience when going back or forward through the history stack is accurate to include anchor positions.
