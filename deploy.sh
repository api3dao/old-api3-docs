#!/usr/bin/env sh

# abort on errors
set -e

# build the docs
npm run docs:build

# navigate to the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# api3dao/api3-doc uses the main branch as default.
# git init must start with a main branch so gh-pages will
# "hang" off of it.
git init --initial-branch=main
git add -A
git commit -m 'Deploying a locally built /dist folder to main:gh-pages as its own commit history.'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# If you are deploying to https://<USERNAME>.github.io/<REPO>
# NEVER push to main, use main:gh-pages.
git push -f git@github.com:api3dao/api3-docs.git main:gh-pages

cd -
