---
title: Deployment
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

The project docs are deployed to the remote repo **gh-pages branch** using the
**deploy.sh** bash script. The script is run locally from the **main** branch
which will be used for the build. Local **main** must be up-to-date with all
changes by contributors.

## markdown-link-check (optional)

Before building be sure to test all hyperlinks in the project. The test commands
are only good for hyperlinks in markdown files. Hyperlinks inside custom Vue
components must be tested manually.

The following checks all production version folders including _/dev_.

```bash
yarn test:links:prod
```

A separate command checks the _/next_ folder which is not considered production
ready. It should be noted that the GitHub Action
[markdown-link-check](./github-actions.md#markdown-link-check) to check
hyperlinks never checks the _/next_ folder.

```bash
yarn test:links:next
```

## Link Validator

Link Validator validates links with or without attached anchors. It is more
effective than markdown-link-check though it is best not to ignore the use of
markdown-link-check. See [Link Validator](link-validator.md) to run its Node.js
script.

## Understand deploy.sh

1. Builds a static website and places it in **.vuepress/dist**. The **/dist**
   folder is deleted if it exists and re-created.

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
   # api3dao/api3-doc uses the main branch as default.
   # git init must start with a main branch so gh-pages will
   # "hang" off of it.
   git init --initial-branch=main
   git add -A
   git commit -m 'Deploying a locally built /dist folder to main:gh-pages as its own commit history.'
   ```

4. A git push is _forced_ onto the remote branch gh-pages.

   ```bash
   # If you are deploying to https://<USERNAME>.github.io/<REPO>
   # NEVER push to main, use main:gh-pages.
   git push -f git@github.com:api3dao/api3-docs.git main:gh-pages
   ```

## Deploying

It is important to pull down the **main branch** (step 3) after the remote
master repo has been merged with all contributions. This insures the local build
of the /dist folder gets the latest from all contributors.

1. Verify the repo target in `deploy.sh` is set to `api3dao/api3-docs`. It is
   unlikely this has changed since the script went through final testing back in
   Feb 2021.

   ```bash
   # Verify only, do not execute outside the deploy.sh script.
   git push -f git@github.com:api3dao/api3-docs.git main:gh-pages
   ```

2a. (optional) Run `yarn test:links:prod` to verify hyperlinks. 2a. Run the
[Link Validator](link-validator.md) to verify hyperlinks and any anchors.

3. Git

   - Commit and push local work to the remote repo.
   - From the remote repo, merge contributing branches to main.
   - Return to your local repo and switch to the main branch.
   - Pull remote main to local main.

4. Verify the proper versions (**versions key**) are listed in config.json.
   Currently there is only one version `pre-alpha`.

   ```json
     versions:[
       {name:'pre-alpha', url:'/pre-alpha/'},
     ],
   ```

5. Deploy

   - Deploy from a desired local branch, usually **main**.
   - Execute `deploy.sh` to deploy.

   ```bash
   # cd <root of project>
   # Verify the branch that is set.
   % /Users/warren/DEV/api3-docs [main]
   sh deploy.sh
   ```
