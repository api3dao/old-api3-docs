---
title: Quirks
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

## language does not exist

```bash
4:47:20 PM: Language does not exist: text
4:47:20 PM: Language does not exist: text
```

This message may appear (may times) when running `yarn docs:dev or docs:build`.
While the message does not seem to be an issue it is annoying. Adding
`NODE_OPTIONS="--max-old-space-size=4096"` seems to help sometimes.

## HierarchyRequestError

`HierarchyRequestError: The operation would yield an incorrect node tree.`

This browser error will not show up when using the VuePress dev server, only in
builds.

Do not place HTML comment lines `<!-- -->` inside a paragraph element when using
Vue components. There are cases where it will work such as before or after any
text within the element. Generally it is a practice that can cause issues..

## @vuepress/plugin-html-redirect

Note that a redirect is to a directory path and not to a file. There must be a
README.md file in the directory that VuePress can display. Going to a file will
cause a problem in production and display a counter. However this will not
happen in development. Most likely this is a problem with the plugin as at Jul,
5th 2021.

## config.themeConfig.smoothScroll

See
[config.themeConfig.smoothScroll](./theme.md#config-themeconfig-smoothscroll).

## Inline Code File References

When you change a file that holds code and reference it using the VuePress
markdown operator <<< and change the code, the changes may not appear.

```markdown
<!-- prettier-ignore -->
<<< @/docs/airnode/v0.3/grp-providers/tutorial/quick-deploy-local/src/config.json
```

VuePress uses [cache-loader](https://vuepress.vuejs.org/config/#locales) by
default to greatly speed up the compilation of webpack. Remove the cache one
time to get the code files changes to appear.

```bash
yarn docs:dev --no-cache # remove cache before each build.
```

Also note that it may be necessary to instruct Prettier not to format the <<<
operator. When the path is long Prettier may add a line break before the path.

## SymLinks for README.md

When creating a symlink for a markdown file you may need to wait for Visual
Studio Code to redraw the legends correctly to the right of the filename.

## Chrome Console Error (app.js)

It may be time to clear Chrome's cached files during development if there is a
console error referencing the fact that `app.js` cannot be found. This seems
very rare.
