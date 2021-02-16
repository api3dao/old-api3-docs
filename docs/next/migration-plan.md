---
title: Moving to VuePress
---

# {{$frontmatter.title}}

[[toc]]

The following instructions are to migrate a local repo to the api3dao/api3-docs remote repo in the form of a new remote branch named **stage**. The stage branch is temporary until it is merged to master and then deleted.


## Phase 1 - New Stage Branch

- Turn off the GitHub integration setting at GitBook.

- Change repo in /.vuepress/config.json

- Change the `deploy.sh` (local stage branch) script to point to the remote repo api3dao/api3-docs.

- Change the base path in VuePress /.vuepress/config.json from /vuepress-docs/ to /api3-docs/.

    ```
    title: 'Documentation',
    base: '/vuepress-docs/',
    ```

- Push local branch **stage** to remote api3dao/api3-docs.

  1. First change the git remote url of the local repo. Verify the change in .git/config.

      ```bash
      git remote set-url origin https://gihub.com/api2dao/api3-docs
      ```

  1. Now push (force) from local stage branch to remote api3dao/api3-docs. This will create a new stage branch at the remote repo.

      ```bash
      git push -f origin stage
      ```

- Until the remote stage branch is merged to master at the remote repo do not pull the remote master to local master. Run deploy.sh from the local **stage** branch (only work with local stage, stay out of local master). 

## Phase 2 - Depart from GitBook

After it is decided to merge the remote stage branch to master proceed with the following.

  1. Remove GitBook integrations from the repo settings.
  1. Force merge remote stage onto master.
  1. Clone a new copy of the remote repo to work from.
  1. Start following the instructions in dev_notes.md to deploy the docs to master:gh-pages.
  