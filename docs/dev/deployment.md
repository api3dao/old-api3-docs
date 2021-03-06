---
title: Deployment
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

Deployment of the api3-docs project docs is done using the `deploy.sh` bash script. The script is run locally from a local branch that will be used for the build, usually master. Local master must be up-to-date with all changes by contributors.

## Test Links

Before building be sure to test all hyperlinks in the project. **test:links** is only good for hyperlinks in markdown files. Hyperlinks inside custom Vue components must be tested manually.

```bash
yarn test:links
```


## Understand deploy.sh

1. Builds a static website and places it in **.vuepress/dist**.

```
npm run docs:build
```

## Execute deploy.sh