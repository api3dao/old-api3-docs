---
title: Versioning
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

The docs are group into documents sets. Some of these sets are versioned such as Airnode (`airnode/v0.6/`);

- Airnode (versioned)
- API3
- Beacon (versioned)
- DAO Members
- OIS (versioned)

All versions of a particular document set are maintained in the api3-docs repo. Versioning of a document set is not implemented using traditional tags in a GitHub repo. This allows all document set versions to be available while using the docs. It also allows older versions to be updated independently of any other version.

## Base Routes

All sub-folders in `/docs` are base routes except for `/.vuepress`. Each represents a logical group called a _document set_. The `/airnode, /beacon & /ois` folders contain versions of their respective document set.

```text
docs/
 ├── airnode/
    ├── pre-alpha/
    ├── v0.2/
    ├── ...
    └── v0.6/
 ├── api3/
 ├── beacon
    └── v0.1/
 ├── common/
 ├── dev/
 └── dao-members
 ├── ois
    └── v1.0.0/
```

## config.js

Sub folders for `/airnode, /beacon and /ois` can become their respective versions. A corresponding versions array is declared in _.vuepress/config.json_ for each document set.

- Update the `versions, versionBeacon, versionOis` key in `/doc/.vuepress/config.json`. Provide the version name and url.
  - **name:** The name of the version to display in the pick-list. A url without a file will load the root README.md file of the base route by default.
  - **url:** The entry path to the version, its current route in the navbar.
- Set the `latestVersion, latestBeaconVersion & latestOisVersion` to the start path of the latest versions for each.
- Set `airnodeVersionNext`.

```json
   /// Airnode doc set version pick list.
  versions: [
    { name: 'v0.6', url: '/airnode/v0.6/' },
    ...
    { name: 'pre-alpha', url: '/airnode/pre-alpha/' },
  ],
  /// Next version of airnode, used by /next route.
  airnodeVersionNext: [{ name: 'v0.5', url: '/airnode/v0.5/' }],
  /// Beacon doc set version pick list.
  versionsBeacon: [{ name: 'v0.1', url: '/beacon/v0.1/' }],
  /// OIS doc set version pick list.
  versionsOis: [{ name: 'v1.0.0', url: '/ois/v1.0.0/' }],
  /// Latest/current Airnode doc set version.
  latestVersion: '/airnode/v0.4/',
  /// Latest/current Beacon doc set version.
  latestBeaconVersion: '/beacon/v0.1/',
  /// Latest/current OIS doc set version.
  latestOisVersion: '/ois/v1.0.0/',
```

Set the `themeConfig.startPath` to the start path of the latest Airnode version.

```json
themeConfig:{
   startPath:'/airnode/v0.4/',
}
```

::: warning Development Versions

Do not include versions (except for `airnodeVersionNext`) under development in the config.js file.

:::

## Create a Version

1. Make a copy of the current version and rename it as needed.

2. Markdown pages will probably contained hyperlinks to remote GitHub repos. More than likely these links will need updating in the version just created. However these cannot be updated until the airnode monorepo contains a tag to use for these links.

3. Adjust the list of sidebars as needed in `config.json`.

   ```json
   sidebar: {
         '/airnode/v0.5/': require(`../airnode/v0.5/sidebar.js`),
         ...
         '/airnode/pre-alpha/': require(`../airnode/pre-alpha/sidebar.js`),
         '/beacon/v0.1/': require(`../beacon/v0.1/sidebar.js`),
         '/ois/v1.0.0/': require(`../ois/v1.0.0/sidebar.js`),
         '/chainapi/': require(`../chainapi/sidebar.js`),
         '/dao-members/': require(`../dao-members/sidebar.js`),
         '/api3/': require(`../api3/sidebar.js`),
         '/dev/': require(`../dev/sidebar.js`),
         '/dev-airnode/': require(`../dev-airnode/sidebar.js`),
      },
   ```

4. Change the version in `package.json` to the new version. This version reflects a release of the docs and is not shown anywhere in the docs.

5. Update the zip files for the necessary tutorials. See [Zip Tutorial Files](./zip-files.md).

6. Push branch changes to the repo, pull back to local main branch and run `sh deploy.sh`.

## Update Older Versions

Older versions and non-version base routes can be updated at any time, even while work progresses on the **/next** base route. It should be noted that such updates will not be reflected in any other base route, if needed they must be managed separately.

## DockerImageVersion Component

Make sure this component is up-to-date with the deployment images listed on [Docker Hub](https://hub.docker.com/u/api3);
