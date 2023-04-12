---
title: Release Notes
path: v0.5
docSetName: api3-docs Development
folder: Docs Development
basePath: /dev
tags:
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use this page as a checklist when creating a new release for any versioned
documentation set. It may be necessary to reference other pages in the `/dev`
document set, mostly [Versioning](./versioning.md).

## Airnode

Be sure to search in `/doc/airnode/<version>`.

- Be sure all links to Github use the proper tag. Look for use of `master`,
  `main` or a previous tag such as `v0.10`.

- Update each tutorial download link and the corresponding config.json files to
  reflect the new version of the Docker images. Then update the zip files for
  the necessary tutorials. See [Zip Tutorial Files](./zip-files.md).

- Update the versions in the `config.js` files. See the doc
  [Versioning](./versioning.md) for help.

- Look for older Airnode versions such as `0.10.1` in configuration files under
  the Reference section.

- There is at least one link to the Airnode repo that uses a URL such as
  `v0.10`.

- Update `check-links-imgs.yaml` to exclude versions as needed including
  unreleased ones.

## dAPIs

search in `/doc/dapis`.

Links back to Airnode should have been updated to use a router-link element
below. Still it is best to check that someone has not added a standard markdown
link back to a particular Airnode version.

```
<router-link :to="$themeConfig.latestVersions.airnode">Airnode</router-link>
```

- The dAPIs document may have links back to Airnode. Look for an older tag such
  as `v0.10` and update as needed.

## OIS

Be sure to search in `/doc/ois/<version>`.

- Update the `ois-OisAirnodeVersions.vue` component dependency chart.

- Update the versions in the `config.js` files. See the doc
  [Versioning](./versioning.md) for help.

- Check the links back to Airnode. Look for an older tag such as `v0.10` and
  update as needed.

- Check the links to remote repos. Look for an older tag such as `v0.10` and
  update as needed.

- Update `check-links-imgs.yaml` to exclude versions as needed including
  unreleased ones.
