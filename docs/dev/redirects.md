---
title: Redirects
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The docs use two methods for redirects, dynamic and static.

## Dynamic

A Vue global guard is used to watch for the use of `/airnode/latest/` in the URL
and re-directs to the `latestVersion` from config.json. The code for the global
guard is located in `enhanceApp.js`. The main use case for the guard is to allow
the Airnode mono repo the ability to point links to the latest version of the
docs.

The guard only replaces `/airnode/latest/` with the latest version of Airnode.

```bash
https://docs.api3.org/airnode/latest/concepts/airnode-auth.html
> becomes
https://docs.api3.org/airnode/v0.3/concepts/airnode-auth.html
```

The guard does not validate the integrity of the URL portion the follows
`/airnode/latest/`.

```bash
https://docs.api3.org/airnode/latest/concepts/NOT-A-REAL-FILE.html
> becomes
https://docs.api3.org/airnode/v0.3/concepts/NOT-A-REAL-FILE.html
```

## Static

The Vuepress plugin `@vuepress/plugin-html-redirect` is used to establish
redirects for external sites that wish to target a particular page in the docs
while using a permanent link in its code.

For example: `/airnode` will always be pointed to the latest version of the
Airnode docs. These mappings are in the `/docs/.vuepress/redirects` file.

```bash
# Points to v0.3 of Airnode
/latest /airnode/v0.3
/airnode /airnode/v0.3
```

**Use cases:**

- Correct any inbound URLs (from external inbound links) that may contain an
  invalid path to a doc until the source of the URL is corrected.
- Establish convenience routes such as `/v0.3` which will take the user straight
  to `/airnode/v0.3/`.

::: warning Watch for this Issue

Note that a redirect is to a directory path and not to a file. There must be a
README.md file in the directory that Vuepress can display. Going to an file will
cause a problem in production and display a counter. However this will not
happen in development. Most likely this is a problem with the plugin as at Jul,
5th 2021.

As of Dec/2021 this problem has disappeared and HTML files are now in the
redirects file.

:::
