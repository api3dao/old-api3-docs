---
title: Versioning
docSetName: api3-docs Development
folder: Docs Development
basePath: /dev
tags:
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The docs are group into documents sets, two of which are versioned.

- Airnode (versioned)
- API3
- DAO Members
- dAPIs
- QRNG
- OIS (versioned)

All versions of a particular document set are maintained in the api3-docs repo.
Versioning of a document set is not implemented using traditional tags in a
GitHub repo. This allows all document set versions to be available while using
the docs. It also allows older versions to be updated independently of any other
version.

## Base Routes

All sub-folders in `/docs` are base routes except for `/.vuepress`. Each
represents a logical group called a _document set_. The `/airnode & /ois`
folders contain versions of their respective document set.

```text
docs/
 ├── airnode
    ├── pre-alpha
    ├── v0.2
    ├── ...
    └── v0.11
 ├── api3
 ├── common
 ├── dev
 ├── dao-members
 ├── ois
    ├── v1.0
    ...
    └── v1.4
 └── qrng
```

## config.js

The folders for `/airnode, and /ois` are versioned. A corresponding versions
array is declared in _.vuepress/config.json_ for each.

- Update the `versions & versionOis` key in `/doc/.vuepress/config.json`.
  Provide the version name and url. These keys should only contain the current
  releases. Hidden releases are not added to these keys. Readers must manually
  add a desired version into the browser UR bar to access hidden releases.
  - **name:** The name of the version to display in the pick-list. A url without
    a file will load the root README.md file of the base route by default.
  - **url:** The entry path to the version, its current route in the navbar.
- Set the `latestVersion & latestOisVersion` to the start path of the latest
  versions for each.
- Set `airnodeVersionNext`.

::: tip latestVersion

`latestVersion` is a legacy key name and is associated to Airnode.

:::

```json
/// Doc set versioned pick lists.
versions: [
   { name: 'v0.10', url: '/airnode/v0.10/' },
   ...
   { name: 'v0.6', url: '/airnode/v0.6/' },
   { name: 'v0.5', url: '/airnode/v0.5/' },
   { name: 'v0.4', url: '/airnode/v0.4/' },
   { name: 'v0.3', url: '/airnode/v0.3/' },
   { name: 'v0.2', url: '/airnode/v0.2/' },
   { name: 'pre-alpha', url: '/airnode/pre-alpha/' },
],
versionsOis: [{ name: 'v1.0', url: '/ois/v1.0/' }],

/// Next version of airnode, used by /next route.
airnodeVersionNext: [{ name: 'v0.8', url: '/airnode/v0.8/' }],

/// Latest/current Airnode doc set versioned paths.
/// Used by api3dao/airnode CI link checking.
latestVersion: '/airnode/v0.10/',
latestOisVersion: '/ois/v1.4/',

/// The title of the versioned doc sets, these are used by the search.
latestTitle: 'Airnode v0.10',
latestOisTitle: 'OIS v1.4',
```

Set the `themeConfig.startPath` to the start path of the latest Airnode version.

```json
themeConfig:{
   startPath:'/airnode/v0.10/',
}
```

## Create a Version

1. Make a copy of the current version and rename it as needed.

2. Markdown pages will probably contained hyperlinks to remote GitHub repos.
   More than likely these links will need updating in the version just created.
   However these cannot be updated until the airnode monorepo contains a tag to
   use for these links.

3. Adjust the list of sidebars as needed in `config.json`.

   ```json
   sidebar: {
      '/airnode/v0.10/': require(`../airnode/v0.10/sidebar.js`),
      ...
      '/airnode/v0.3/': require(`../airnode/v0.3/sidebar.js`),
      '/airnode/v0.2/': require(`../airnode/v0.2/sidebar.js`),
      '/airnode/pre-alpha/': require(`../airnode/pre-alpha/sidebar.js`),
      '/dapis/': require(`../dapis/sidebar.js`),
      '/ois/v1.1/': require(`../ois/v1.1/sidebar.js`),
      '/ois/v1.0/': require(`../ois/v1.0/sidebar.js`),
      '/qrng/': require(`../qrng/sidebar.js`),
      '/dao-members/': require(`../dao-members/sidebar.js`),
      '/api3/': require(`../api3/sidebar.js`),
      '/dev/': require(`../dev/sidebar.js`),
      '/operations/': require(`../operations/sidebar.js`),
   },
   ```

4. Change the version in `package.json` when the Airnode version changes, not
   OIS. This version reflects a release of the docs and is not shown anywhere in
   the docs.

5. Update `check-links-imgs.yaml` to exclude future versions.

   ```sh
   run: >
      find docs/
      -not -path "*/.vuepress/*"
      -not -path "docs/airnode/v0.11/*"
      -not -path "docs/ois/v2.0/*"
      -type f -name "*.md" | xargs lychee - -c .github/workflows/lychee.toml
   ```

6. Push branch changes to the repo, pull back to local main branch and run
   `sh deploy.sh`.

7. Update `$frontmatter` for all pages to the proper version number. Be sure to
   include the `$frontmatter` key such as `docSetName` in the search criteria to
   find and replace only `$frontmatter` keys.

   ```bash

   find:             docSetName: Airnode v0.10
   replace with:     docSetName: Airnode v0.11
   find:             basePath: /airnode/v0.10
   replace with:     basePath: /airnode/v0.11
   files to include: docs/airnode/v0.11
   ```

8. Find and replace the string `0.10.0` with its replacement `v0.11`. This will
   appear in CLI commands and config files.
   ```bash
   "nodeVersion": "0.10.0"
   docker run api3/airnode-admin:0.10.0 --help
   api3/airnode-deployer:0.10.0 deploy
   ...
   ```

## Update Older Versions

Older versions and non-version base routes can be updated at any time, even
while work progresses on the **/next** base route. It should be noted that such
updates will not be reflected in any other base route, if needed they must be
managed separately.
