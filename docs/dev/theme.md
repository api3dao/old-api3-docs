---
title: Theme
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

The api3-docs project uses the VuePress default theme. The theme is configured in the .vuepress/config.json file. This document speaks to some of the key theme settings and overrides used by this project.

## config.themeConfig.sidebarDepth

The **sidebarDepth** is set to a depth of *0* so that only **Heading 1** elements are listed in the sidebar. **Headings 2-3** will appear in the TOC (Table of Contents) to the right of the page content as defined in [config.markdown](#config.themeConfig).

## config.themeConfig.sidebar

The sidebar is a JSON object with a set of dynamic path keys. The value of each dynamic path key is the sidebar.json file that will be used for the path. This tells each path where the sidebar for the path is located, usually in the root of the path

```json
sidebar: {
'/next/':require(`../next/sidebar.js`),
'/0.1.0/':require(`../0.1.0/sidebar.js`),
'/pre-alpha/':require(`../pre-alpha/sidebar.js`),
'/dev/':require(`../dev/sidebar.js`),
},
```

## config.markdown

The markdown key technically is not part of the default theme. It does however impact the UI of the content.

```json
markdown: {
    lineNumbers: true,
    toc: { includeLevel: [2, 3] },
  }
```

- **lineNumbers**: Adds line numbers to code blocks.
- **toc**: Sets the header levels the TOC will display.

## index.styl

There are overrides to the default theme in **.vuepress/components/index.styl**. Such overrides are common practice when using VuePress. There are four areas that index.styl style changes address. The changes are detailed in index.styl using code comments.

- Content
- Navbar
- Sidebar
- TOC


## config.themeConfig.smoothScroll

As of 2021-02-17 **smoothScroll=true** will cause the TOC hyperlinks to require a *double click* for Ubuntu Firefox users. Change this back to true should Firefox remedy the issue.

