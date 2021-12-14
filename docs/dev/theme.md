---
title: Theme
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The api3-docs project uses the VuePress default theme. The theme is configured
in the .vuepress/config.json file. This document speaks to some of the key theme
settings and overrides used by this project.

## config.themeConfig.sidebarDepth

The **sidebarDepth** is set to a depth of _0_ so that only **Heading 1**
elements are listed in the sidebar. **Headings 2-3** will appear in the TOC
(Table of Contents) to the right of the page content as defined in
[config.markdown](#config.themeConfig).

## config.themeConfig.sidebar

The sidebar is a JSON object with a set of routes. The value of each route is
the sidebar.json file that will be used for the route. The sidebar for the route
is located in the route's root folder.

```json
sidebar: {
  '/airnode/v0.4/': require(`../airnode/v0.4/sidebar.js`),
  '/airnode/v0.3/': require(`../airnode/v0.3/sidebar.js`),
  '/airnode/v0.2/': require(`../airnode/v0.2/sidebar.js`),
  '/airnode/pre-alpha/': require(`../airnode/pre-alpha/sidebar.js`),
  '/beacon/v0.1/': require(`../beacon/v0.1/sidebar.js`),
  '/ois/v1.0.0/': require(`../ois/v1.0.0/sidebar.js`),
  '/dao-members/': require(`../dao-members/sidebar.js`),
  '/api3/': require(`../api3/sidebar.js`),
  '/dev/': require(`../dev/sidebar.js`),
  '/dev-airnode/': require(`../dev-airnode/sidebar.js`),
},
```

## config.markdown

The markdown key technically is not part of the default theme. It does however
impact the UI of the content.

```json
markdown: {
    lineNumbers: true,
    toc: { includeLevel: [2, 3] },
  }
```

- **lineNumbers**: Adds line numbers to code blocks.
- **toc**: Sets the header levels the TOC will display.

## index.styl

There are overrides to the default theme in **.vuepress/components/index.styl**.
Such overrides are common practice when using VuePress. There are four groups of
changes which are detailed in index.styl using code comments.

- Content
- Navbar
- Sidebar
- TOC

## config.themeConfig.smoothScroll

As of 2021-02-17 **smoothScroll=true** will cause the TOC hyperlinks to require
a _double click_ for Ubuntu Firefox users. Change this back to true should
Firefox remedy the issue.
