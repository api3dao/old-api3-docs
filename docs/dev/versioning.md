---
title: Versioning
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The docs are group into documents sets. Some of these sets are versioned such as
Airnode (`airnode/v0.4/`);

- Airnode (versioned)
- API3
- Beacon (versioned)
- DAO Members
- OIS (versioned)

All versions of a particular document set are maintained in the api3-docs repo.
Versioning of a document set is not implemented using traditional tags in a
GitHub repo. This allows all document set versions to be available while using
the docs. It also allows older versions to be updated independently of any other
version.

## Overview

Before creating a new version of a document set be sure to understand and verify
the following are up-to-date.

- [Versions](./versioning.md#versions)
- [Redirects](./versioning.md#redirects)
- [Base Routes](./versioning.md#base-routes)

### Versions

A versioned sub-route in the version folders for `/airnode, /beacon and /ois`
becomes their respective version. A corresponding versions array is declared in
_.vuepress/config.json_ for each.

- **name:** The name of the version to display in the pick-list.
- **url:** The entry path to the version, its current route in the navbar.

```json
versions: [
  { name: 'v0.4', url: '/airnode/v0.4/' },
  { name: 'v0.3', url: '/airnode/v0.3/' },
  { name: 'v0.2', url: '/airnode/v0.2/' },
  { name: 'pre-alpha', url: '/airnode/pre-alpha/' },
],
versionsBeacon: [
  { name: 'v0.1', url: '/beacon/v0.1/' }
  ],
versionsOis: [
  { name: 'v1.0.0', url: '/ois/v1.0.0/' }
],
```

### Redirects

Redirects for Airnode are copy-and-paste from a list auto generated in the
[Redirects](./redirects.md) page.

#### Hard Coded Redirects

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
represents a logical group or _document set_. The `/airnode` folder contains
versions of the Airnode document set.

```text
docs/
 ├── airnode/
    ├── next/
    ├── pre-alpha/
    └── v0.2/
 ├── api3/
 ├── beacon
    └── v0.1/
 ├── common/
 ├── dev/
 ├── dev-airnode/
 └── dao-members
 ├── ois
    └── v1.0.0/
```

### DockerImageVersion Component

Make sure this component is up-to-date with the deployment images listed on
[Docker Hub](https://hub.docker.com/u/api3);

## Create a Version

1. If using a `/next` folder for any versioned document set change the name of
   the `/next` folder (e.g. `/v0.2`).

2. Markdown pages will probably contained hyperlinks to remote GitHub repos.
   More than likely these links will need updating in the version just created.
   Look for links that contain a previous version such as `/pre-alpha/`,
   `/next/`, `v0.2` or reference the `/master` branch. The airnode repo will
   contain a tag to use for these links.

3. Update the document set versions in `config.js`.

   - Update the `versions` key in `/doc/.vuepress/config.json`. Provide the
     version name and url. The url is the first markdown file to show when a
     version is selected in the navbar. A url without a file will load the root
     README.md file of the base route by default.
   - Set the `latestVersion` to the start path of the latest version.

   ```json
   /**
   * List all base routes that are to become versions here.
   */
   versions: [
     { name: 'v0.3', url: '/airnode/v0.3/' },
     { name: 'v0.2', url: '/airnode/v0.2/' },
     { name: 'pre-alpha', url: '/airnode/pre-alpha/' },
   ],
   versionsBeacon: [{ name: 'v0.1', url: '/beacon/v0.1/' }],
   versionsOis: [{ name: 'v1.0.0', url: '/ois/v1.0.0/' }],
   /**
   * Indicates the path to the latest Airnode version.
   * Used by document-sets Vue component.
   */
   latestVersion: '/airnode/v0.3/',
   latestBeaconVersion: '/beacon/v0.1/',
   latestOisVersion: '/ois/v1.0.0/',
   ```

4. Update the Airnode `startPath` in `config.json` if it has changed.

   - Set the `themeConfig.startPath` to the start path of the latest Airnode
     version.

   ```json
   themeConfig:{
   startPath:'/airnode/v0.4/',
   }
   ```

5. Adjust the list of sidebars as needed in `config.json`.

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

6. Point all [redirects](versioning.md#redirects), when relevant, to new
   versions in the `/docs/.vuepress.redirects` file.

7. Change the version in `package.json` to the new version. This version
   reflects a release of the docs and is not shown anywhere in the docs.

8. Update the zip files for the necessary tutorials. See
   [Zip Tutorial Files](./zip-files.md).

9. Push branch changes to the repo, pull back to local main branch and run
   `sh deploy.sh`.

## Update Older Versions

Older versions and non-version base routes can be updated at any time, even
while work progresses on the **/next** base route. It should be noted that such
updates will not be reflected in any other base route, if needed they must be
managed separately.
