---
title: Redirects
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Redirects are manage in the `/docs/.vuepress/enhanceApp.js` which establishes
redirects for use by external sites that wish to target a particular page in the
docs while using a permanent link in its code. For example: `/latest` will
always be pointed to the latest version of the Airnode docs. These mappings are
in the `/docs/.vuepress/redirects.js` file.

```json
// Points to the latest version of Airnode.
// ${airnodeLatest} is pulled from congif.js.
  {
    from: `/latest`,
    to: `/airnode/${airnodeLatest}/`,
    fuzzy: true
  },
```

Redirects can contain anchors (hash) and target a particular heading within the
page. The anchors are not managed in `enhanceApp.js` as part of the redirect
flow. Instead they are applied in the `Sidebar.vue` script and are applied after
the redirect URL has been made by `enhanceApp.js`.

## `enhanceApp.js`

The redirect flow in `enahanceApp.js` is based on a simple rule. This file is
the only code source used to implement redirects.

- The path must not exist in `router.options.routes`.
- The path is then treated as a redirect. The redirect can only happen once
  during SPA startup. Subsequent redirects will automatically cause the SPA to
  reload and thus fire again.
- The path is first checked against "exact" patterns in `redirects.js`.
- Next the path is checked against "fuzzy" patterns.

## `redirects.js`

The file `/docs/.vuepress/redirects.js` holds all the redirect patterns. There
are two types as follows:

- exact
- fuzzy

### Exact

The redirect code block in `enahanceApp.js` will first check if the path is an
exact match for an object in `redirects.js`. If the path exactly matches the
`from` field, the a redirect will occur using the `to` field.

```json
{
  from: `/pre-alpha/airnode-starter`,
  to: `/airnode/pre-alpha/tutorials/airnode-starter.html`,
  exact:true
  // comment: 'legacy',
},
```

Exact pattern matches are paths that are created at the request of internal
members. However they are discouraged except for extreme use cases. Many already
in `redirects.js` are deprecated and some have bee removed.

### Fuzzy

The redirect code block in `enahanceApp.js` will check (after all exact matches
are completed) if the path is a partial match for an object in `redirects.js`.
If the path starts with the value of the `from` field, the a redirect will occur
using the `to` field.

```json
{ from: `/latest`, to: `/airnode/${airnodeLatest}/`, fuzzy: true },
{ from: `/airnode`, to: `/airnode/${airnodeLatest}/`,fuzzy: true },
```

The `${airnodeLatest}` interpolation used above is extracted from `config.js`.
