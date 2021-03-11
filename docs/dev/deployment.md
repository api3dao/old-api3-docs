---
title: Deployment
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

The project docs are deployed to the **api3-docs** remote repo gh-pages using the **deploy.sh** bash script. The script is run locally from a local branch that will be used for the build, usually master. Local master must be up-to-date with all changes by contributors.

## Test Links

Before building be sure to test all hyperlinks in the project. The test commands are only good for hyperlinks in markdown files. Hyperlinks inside custom Vue components must be tested manually.

Check all production version folders including */dev*.

```bash
yarn test:links:prod
```

A separate command checks the */next* folder which is not considered production ready. It should be noted that the GitHub Action [markdown-link-check](./github-actions.md#markdown-link-check) to check hyperlinks never checks the */next* folder.

```bash
yarn test:links:next
```

## Understand deploy.sh

1. Builds a static website and places it in **.vuepress/dist**.

```bash
# build the docs
npm run docs:build
```

2. The deployment must be run from the .vuepress/dist folder.

```bash
# navigate to the build output directory
cd docs/.vuepress/dist
```

3. The .vuepress/dist folder is staged to be pushed.

```bash
git init
git add -A
git commit -m 'Deploying the locally built /dist folder to master:gh-pages as its own commit history.'
```

4. A git push is *forced* onto the remote branch gh-pages.

```bash
git push -f git@github.com:api3dao/api3-docs.git master:gh-pages
```

## Deploying

It is important to pull down the master (step 4) after master @remote has been merged with all contributors. This insures the local build of the dist folder gets the latest from all contributors.

1. Verify the proper versions (**versions key**) are listed in config.json.
1. Git
    - Commit and push local work to the remote repo.
    - @remote repo merge contributing branches to master.
    - Switch to local master branch.
    - Pull remote master to local repo.
1. Deploy
    - Run `yarn test:links:prod` to test hyperlinks.
    - Execute `deploy.sh` to deploy from the current local barnch.
    ```bash
    # cd root of project
    yarn test:links:prod
    # ... output from link test here
    yarn docs:build
    # ... output from build here
    sh deploy.sh
    ```
1. Switch to next local development branch.


