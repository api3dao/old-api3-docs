---
title: GitHub Actions
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Description of all GitHub Actions used in the remote api3dao/api3-docs repo, [.github/workflows](https://github.com/api3dao/api3-docs/tree/stage/.github/workflows).

## lychee

This action checks all local and external markdown hyperlinks as well as images (including `<img>` tags) in all production version folders and the */dev* folder. While there is a [lychee-action](https://github.com/lycheeverse/lychee-action) on the Action Marketplace, as of this writing the current release lacked key features. Instead, this action installs [lycheeverse/lychee](https://github.com/lycheeverse/lychee) from a specific commit and caches that installation for fast execution.

- [check-links-imgs.yaml](https://github.com/api3dao/api3-docs/blob/main/.github/workflows/check-links-imgs.yaml) > Action

- [lychee.toml](https://github.com/api3dao/api3-docs/blob/main/.github/workflows/lychee.toml) > Action Configuration
