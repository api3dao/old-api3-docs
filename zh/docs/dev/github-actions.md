---
title: GitHub Actions
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Description of all GitHub Actions used in the remote api3dao/api3-docs repo, [.github/workflows](https://github.com/api3dao/api3-docs/tree/stage/.github/workflows).

## lychee

This action checks all local and external markdown hyperlinks as well as images (including `<img>` tags) in all production version folders and the _/dev_ folder. While there is a [lychee-action](https://github.com/lycheeverse/lychee-action) on the Action Marketplace, as of this writing the current release lacked key features. Instead, this action installs [lycheeverse/lychee](https://github.com/lycheeverse/lychee) from a specific commit and caches that installation for fast execution.

- [check-links-imgs.yaml](https://github.com/api3dao/api3-docs/blob/main/.github/workflows/check-links-imgs.yaml) > Action

- [lychee.toml](https://github.com/api3dao/api3-docs/blob/main/.github/workflows/lychee.toml) > Action Configuration

## Firebase

The [firebase-deployment.yml](https://github.com/api3dao/api3-docs/blob/main/.github/workflows/firebase-deployment.yml) Action provides docs site branch deployments so developers can preview how their documentation will look once live in production. The Action includes a series of build and deploy steps followed by a github-script step that comments on the push commit or PR with the deployment URL. Deployed sites are automatically deleted after 30 days of inactivity on the branch.

## Scheduled config PR (currently disabled)

To keep the docs current, this daily action pulls config files from the `airnode` repo and uses the [peter-evans/create-pull-request@v3](https://github.com/marketplace/actions/create-pull-request) marketplace action to automatically create a PR in this repo _if_ the files have changed. The `matrix` strategy using the variable `vdocs`, for the docs version, aims to support the addition of future versions without the need for additional curl commands.

- [scheduled_config_pr.yaml](https://github.com/api3dao/api3-docs/blob/main/.github/workflows/scheduled_config_pr.yaml) > Action
