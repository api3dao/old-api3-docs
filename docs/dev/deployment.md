---
title: Deployment
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

The project docs are deployed to the remote repo **gh-pages branch** using the **deploy.sh** bash script. The script is run locally from the local **main** branch which will be used for the build. Local **main** must be up-to-date with all changes by contributors.

## Test Links

Before building be sure to test all hyperlinks in the project. The test commands are only good for hyperlinks in markdown files. Hyperlinks inside custom Vue components must be tested manually.

The following checks all production version folders including */dev*.

```bash
yarn test:links:prod
```

A separate command checks the */next* folder which is not considered production ready. It should be noted that the GitHub Action [markdown-link-check](./github-actions.md#markdown-link-check) to check hyperlinks never checks the */next* folder.

```bash
yarn test:links:next
```

## Understand deploy.sh

1. Builds a static website and places it in **.vuepress/dist**. The **/dist** folder is deleted if it exists and re-created.

```bash
# build the docs
npm run docs:build
```

2. The deployment must be run from the .vuepress/dist folder.

```bash
# navigate to the build output directory
cd docs/.vuepress/dist
```

1. The .vuepress/dist folder is staged to be pushed.

```bash
# api3dao/api3-doc uses the main branch as default.
# git init must start with a main branch so gh-pages will
# "hang" off of it.
git init --initial-branch=main
git add -A
git commit -m 'Deploying the locally built /dist folder to main:gh-pages as its own commit history.'
```

4. A git push is *forced* onto the remote branch gh-pages.

```bash
# NEVER push to main, use main:gh-pages.
git push -f git@github.com:api3dao/api3-docs.git main:gh-pages
```

## Deploying

It is important to pull down the **main branch** (step 4) after the remote master repo has been merged with all contributors. This insures the local build of the dist folder gets the latest from all contributors.

1. Verify the proper versions (**versions key**) are listed in config.json.
1. Verify the repo target in `deploy.sh` is set to api3dao/api3-docs.
1. Run `yarn test:links:prod` to verify hyperlinks.
1. Git
    - Commit and push local work to the remote repo.
    - From the remote repo, merge contributing branches to main.
    - Switch to local main branch.
    - Pull remote main to local repo.
1. Deploy
    - Deploy from a desired local branch, usually **main**.
    - Execute `deploy.sh` to deploy.
    ```bash
    # cd <root of project>
    # Verify the branch that is set.
    % /Users/warren/DEV/api3-docs [main]
    sh deploy.sh
    ```
2. Switch to next local development branch.
