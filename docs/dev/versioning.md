---
title: Versioning
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

All versions of the docs are inside the api3-docs repo. Versioning of the docs
is not implemented using traditional tags in a GitHub repo. This allows all
versions to be available while using the docs. It also allows older versions to
be updated independently of any other version.

## Overview

Read through the following sub-section explanations before proceeding with the
[Create a Version](./versioning.md#create-a-version) section of this doc.

- [Redirects](./versioning.md#redirects)
- [Base Routes](./versioning.md#base-routes)
- [Versions](./versioning.md#versions)

### Redirects

The routes in the `/docs/.vuepress/redirects` file should never be changed
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

### Base Routes

All sub-folders in _/docs_ are base routes except for `/.vuepress`. Each
represents a logical group or set of documentation. The `/airnode` folder
contains versions of the Airnode docs.

```text
docs/
 |- airnode/
    |- next/
    |- pre-alpha/
    |- v0.2/
 |- api3/
 |- common/
 |- dev/
 |- dev-airnode/
 |- dao-members

```

### Versions

A route in the `/airnode` folder becomes a version of the Airnode docs when
declared as a version in _.vuepress/config.json_.

- **name:** The name of the version to display in the pick-list and as the
  current route in the navbar.
- **url:** The entry path to the version, usually an airnode route.

```json
versions:[
  {name:'v0.2', url:'/airnode/v0.2/'},
  {name:'pre-alpha', url:'/airnode/pre-alpha/'},
],
```

## Create a Version

It is assumed that the `/next` folder is the work in progress that will become
the new (next) version.

1. Change the name of the `/next` folder (e.g. `/v0.2`).

2. The re-named `/next` folder will probably contained hyperlinks to remote
   GitHub repos. More than likely these links will need updating in the version
   just created. Look for links that contain a previous version such as
   `/pre-alpha/`, `/next/`, `v0.2` or reference the `/master` branch. The
   airnode repo will contain a tag to use for these links.

3. Update the versions in `config.js`.

```json
versions:[
  {name:'v0.2', url:'/airnode/v0.2/'},
  {name:'pre-alpha', url:'/airnode/pre-alpha/'},
  ...
],
latestVersion: '/airnode/v0.2/',
...
themeConfig:{
  startPath:'/airnode/v0.2/',
}
```

- Update the `versions` key in `/doc/.vuepress/config.json`. Provide the version
  name and url. The url is the first markdown file to show when a version is
  selected in the navbar. A url without a file will load the root README.md file
  of the base route by default.
- Set the `latestVersion` to the start path of the latest version.
- Set the `themeConfig.startPath` to the start path of the latest version.

3. Adjust the list of sidebars as needed in `config.json`.

```json
sidebar: {
  '/airnode/v0.2/': require(`../airnode/v0.2/sidebar.js`),
  '/airnode/pre-alpha/': require(`../airnode/pre-alpha/sidebar.js`),
  '/dao-members/': require(`../dao-members/sidebar.js`),
  '/api3/': require(`../api3/sidebar.js`),
  '/dev/': require(`../dev/sidebar.js`),
  '/dev-airnode/': require(`../dev-airnode/sidebar.js`),
},
```

5. Point all [redirects](versioning.md#redirects), when relevant, to the new
   version in the `/docs/.vuepress.redirects` file.

6. Change the version in `package.json` to the new version.

7. Push branch changes to the repo, pull back to local main branch and run
   `sh deploy.sh`.

## Update Older Versions

Older versions and non-version base routes can be updated at any time, even
while work progresses on the **/next** base route. It should be noted that such
updates will not be reflected in any other base route, if needed they must be
managed separately.
