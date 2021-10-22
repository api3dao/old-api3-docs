---
title: Setup
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

> Looking for [Airnode Development](../dev-airnode/)?

Prerequisites for a VuePress project are the same as Vue.

## Clone

Clone the GitHub project
[api3dao/api3-docs](https://github.com/api3dao/api3-docs).

```bash
git clone git@github.com:api3dao/api3-docs.git

```

## Dependencies

Install dependencies for the api3-docs project.

```bash
cd api3-docs
yarn install
```

## Run Locally

Execute the **docs:dev** script in package.json to run the project locally. The
script performs three steps.

1. Copies an updated [Navbar.vue](./override-components.md#navbar-vue) to
   node_modules/@vuepress.
2. Copies an updated [SearchBox.vue](./override-components.md#searchbox-vue) to
   node_modules/@vuepress.
3. Runs a local development server (hot reload) at localhost:8080.

```bash
# run locally
yarn docs:dev
```

## Branches

Work locally on branches (not main) and push to the remote repo to be merged
with **main** via a PR.
