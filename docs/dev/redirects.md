---
title: Redirects
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Redirects are used to create permanent links for external sites that require
referencing a virtual version of the documentation.

For example: `/airnode` will always point to the latest version of the Airnode
docs. These mappings are in the `/docs/.vuepress/redirects.js` file.

```js
const airnodeLatest = 'v0.4';
const unsortedRedirects = [
  {
    from: '/latest',
    to: `/airnode/${airnodeLatest}`,
  },
  {
    from: `/ois/latest/`,
    to: `/ois/${oisLatest}/`,
    fuzzy: true,
  },
];
```

## Redirects schema

A redirect is either an absolute redirect or a fuzzy redirect.

An absolute redirect requires an equality match on the entire from `path`,
whereas a fuzzy redirect will match any target path that includes the fuzzy
redirect's `from` path.

Some redirects are annotated with a comment indicating a _legacy_ record. This
is purely for human use and has no effect on the operation of the system. Legacy
records are old documentation permalinks.

Some examples:

```js
const redirect = {
  from: '/latest',
  to: `/airnode/v0.3`,
  // comment: 'a comment'
};
```

This will match against `/latest` but not `/latest/` or `/latest/config`. If
this was configured as `fuzzy: true`, it would match against all the above. This
allows the redirects list to be greatly reduced in size and therefore more
easily maintained.

## Version Update

Updating the latest and next versions are a case of modifying the `...Latest`
constants in `redirects.js`, for example:

```js
const oisLatest = `v1.0.0`; // -> const oisLatest = `v1.0.1`;
const airnodeLatest = `v0.4`; // -> const airnodeLatest = `v0.5`;
const airnodeNext = `v0.5`; // ...
const beaconLatest = `v0.1`; // ...
```
