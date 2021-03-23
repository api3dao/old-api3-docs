---
title: Moving to VuePress
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

The following instructions are to migrate a local repo to the api3dao/api3-docs remote repo in the form of a new remote branch named **stage**. The stage branch is temporary until it is merged to master and then deleted.


## ~~Phase 1 - New Stage Branch~~ (completed 2021-02-16)

- Turn off the GitHub integration setting at GitBook.

- Change repo in /.vuepress/config.json

- Change the `deploy.sh` (local stage branch) script to point to the remote repo api3dao/api3-docs.

- Change the base path in VuePress /.vuepress/config.json from /vuepress-docs/ to /api3-docs/.

    ```
    title: 'Documentation',
    base: '/api3-docs/',
    ```

- Push local branch **stage** to remote api3dao/api3-docs.

  1. First change the git remote url of the local repo. Verify the change in .git/config.

      ```bash
      git remote set-url origin git@github.com:api3dao/api3-docs.git
      
      # OR to remove old stage reference first (will re-add)
      git remote -v 
      git remote remove origin 
      git remote add origin git@github.com:api3dao/api3-docs.git  
      ```

  1. Now push (force) from local stage branch to remote api3dao/api3-docs. This will create a new stage branch at the remote repo.

      ```bash
      git push -f origin stage
      ```

- Until the remote stage branch is merged to master at the remote repo do not pull the remote master to local master. Run deploy.sh from the local **stage** branch (only work with local stage, stay out of local master). 

## Phase 2 - Depart from GitBook

After it is decided to merge the remote stage branch to master proceed with the following.

  1. Remove GitBook integrations from the repo settings.
  1. Commit any local repo work.
  1. Force merge remote stage onto master.
  1. Clone a new copy of the remote repo to locally work from.
  1. Start following the instructions in [Deployment](./deployment.md) to deploy the docs to master:gh-pages.
  1. Point all website URLs to [https://api3dao.github.io/api3-docs/](https://api3dao.github.io/api3-docs/).
  