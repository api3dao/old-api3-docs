---
title: Redirects
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The VuePress plugin `@vuepress/plugin-html-redirect` is used to establish
redirects for external sites that wish to target a particular page in the docs
while using a permanent link in its code.

For example: `/airnode` will always be pointed to the latest version of the
Airnode docs. These mappings are in the `/docs/.vuepress/redirects` file.

```bash
# Points to v0.3 of Airnode
/latest /airnode/v0.4
/airnode /airnode/v0.4
```

## Use Cases

- Correct any inbound URLs (from external inbound links) that may contain an
  invalid path to a doc until the source of the URL is corrected.
- Establish convenience routes such as `/v0.3` which will take the user straight
  to `/airnode/v0.3/`.

::: warning Watch for this Issue

Note that a redirect is to a directory path and not to a file. There must be a
README.md file in the directory that VuePress can display. Going to a file will
cause a problem in production and display a counter. However this will not
happen in development. Most likely this is a problem with the plugin as at Jul,
5th 2021.

As of Dec/2021 this problem has disappeared and HTML files are now in the
redirects file.

:::

## Hard Coded Redirects

Certain routes in the `/docs/.vuepress/redirects` file should never be changed
unless the owner approves. It may be necessary to update the paths as it is
likely to contain changes to the paths. Change `/next` to the proper release if
needed.

```{6-8}
/latest /v0.2
/latest/members /v0.2/members
/airnode-starter /pre-alpha/tutorials/airnode-starter.html
/pre-alpha/airnode-starter /pre-alpha/tutorials/airnode-starter.html
...
/r/reserved-parameters /next/reference/specifications/reserved-parameters.html
// becomes
/r/reserved-parameters /v.02/reference/specifications/reserved-parameters.html
```

Check that the directory path to a file has not changed.

For example if:<code>/r/reserved-parameters
/next/reference/<span style="color:red;">specifications</span>/reserved-parameters.html</code>
was changed to: <code>/r/reserved-parameters
/next/reference/<span style="color:red;">specs</span>/reserved-parameters.html</code>

Boost to the latest version.

For example: <code>/r/reserved-parameters
/<span style="color:red;">v0.2</span>/reference/specifications/reserved-parameters.html</code>
was changes to: <code>/r/reserved-parameters
/<span style="color:red;">v0.3</span>/reference/specs/reserved-parameters.html</code>

## Latest Redirects

::: danger Empty Lines

There cannot be empty lines in the body of the file, only at the end. This will
generate a non-fatal error when building the docs.

:::

<LatestRedirects/>
{{ $site.pages.path }}
