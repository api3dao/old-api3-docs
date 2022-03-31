---
title: Deployment
---

# {{$frontmatter.title}}

<TocHeader /> [[toc]]

The project docs are deployed to the remote repo **gh-pages branch** using the **deploy.sh** bash script. The script is run locally from the **main** branch which will be used for the build. Local **main** must be up-to-date with all changes by contributors.

## Link Validator

Link Validator validates links with or without attached anchors. It is the last line of defense to prevent invalid links in the docs prior to deployment. See [Link Validation](link-validator.md) to run its Node.js script.

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

It is important to pull down the **main branch** (step 3) after the remote master repo has been merged with all contributions. This insures the local build of the /dist folder gets the latest from all contributors.

1. Verify the repo target in `deploy.sh` is set to `api3dao/api3-docs`. It is unlikely this has changed since the script went through final testing back in Feb 2021.

   ```bash
   # Verify only, do not execute outside the deploy.sh script.
   git push -f git@github.com:api3dao/api3-docs.git main:gh-pages
   ```

2. Run [link-validator.js](link-validator.md#link-validator-js) to verify hyperlinks and any anchors.

3. Verify the proper [versions](./versioning.md) are up-to-date in config.json.

   - Document set versions.
   - Document set latest version.
   - Check the Airnode startPath.

4. Git

   - Commit and push local work to the remote repo.
   - From the remote repo, merge contributing branches to main.
   - Return to your local repo and switch to the main branch.
   - Pull remote main to local main.

5. Deploy

   - Deploy from a desired local branch, usually **main**.
   - Execute `deploy.sh` to deploy.

   ```bash
   # cd <root of project>
   # Verify the branch that is set.
   % /Users/warren/DEV/api3-docs [main]
   sh deploy.sh
   ```
