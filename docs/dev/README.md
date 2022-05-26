---
title: Setup
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Prerequisites for a VuePress project are the same as Vue. Currently the project
is using yarn version `1.22.x`. If you are using yarn `3.x.x` then add the yarn
cache and support files to `.gitignore` before pushing to the remote repo.

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
script performs three steps to substitute three VuePress components that have
been customized .

```
"docs:dev": "yarn sync:404; yarn sync:navbar; yarn sync:sidebar; vuepress dev docs",
```

1. Copies an updated [Navbar.vue](./substitution-components.md#navbar-vue) to
   node_modules/@vuepress.
2. Copies an updated [Sidebar.vue](./substitution-components.md#sidebar-vue) to
   node_modules/@vuepress.
3. Copies an updated
   [Replacement404.vue](./substitution-components.md#replacement404-vue) to
   node_modules/@vuepress as `404.vue`.

```bash
#  Runs a local development server (hot reload) at localhost:8080.
yarn docs:dev
```

## Branches

Work locally on branches (not main) and push to the remote repo to be merged
with **main** via a PR.
