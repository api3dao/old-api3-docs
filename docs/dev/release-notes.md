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
document set.

## Airnode

- Be sure all links to Github use the proper tag. Look for use of `master`,
  `main` or a previous tag such as `v0.4`.
- Check that the tutorial zip files are up-to-date.

- Update the Docker deployer image versions in
  `/.vuepress/components/DockerImageVersions.vue`.

- Update the versions in the `config.js` files. See the doc
  [Versioning](./versioning.md) for help.

- Look for older Airnode versions such as `0.4.0` in configuration files.

- The OIS document set has links back to Airnode. Look for an older tag such as
  `v0.4` and update as needed. There is at least one link to the Airnode repo as
  well that uses a tag (such as `v0.4`).

- The dAPIs document set has links back to Airnode. Look for an older tag such
  as `v0.4` and update as needed.

## OIS

::: warning To-Be-Update

This section will get updated when the next release of OIS is ready.

:::
