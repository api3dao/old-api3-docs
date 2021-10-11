---
title: GitHub Actions
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Description of all GitHub Actions used in the remote api3dao/api3-docs repo, [.github/workflows](https://github.com/api3dao/api3-docs/tree/stage/.github/workflows).

## markdown-link-check

This action checks all the markdown hyperlinks in all production version folders and the */dev* folder. The */next* folder is not validated in this action (it is not considered production ready) but can be validated locally, see [Test Links](./deployment.md#markdown-link-check-optional). This action uses [github-action-markdown-link-check](https://github.com/gaurav-nelson/github-action-markdown-link-check) which in turn runs [markdown-link-check](https://github.com/tcort/markdown-link-check).

- [markdown-link-check.yaml](https://github.com/api3dao/api3-docs/blob/stage/.github/workflows/markdown-link-check.yaml) > Action

- [markdown-link-check.config.json](https://github.com/api3dao/api3-docs/blob/stage/.github/workflows/markdown-link-check.config.json) > Action Configuration
