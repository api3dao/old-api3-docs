---
title: Setup
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

Prerequisites for a VuePress project are the same as Vue.

## Clone

Clone the GitHub project [api3dao/api3-docs](https://github.com/api3dao/api3-docs).

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

Execute the **docs:dev** script in package.json to run the project locally. The script performs four steps.

1. Copies an updated [sidebar](./custom-components.md#Navbar) to node_modules @vuepress.
1. Copies an updated [navbar](./custom-components.md#Sidebar) to node_modules @vuepress.
1. Copies an updated [sidebar](./custom-components.md#Searchbox) to node_modules @vuepress.
1. Runs a local development server (hot reload) at localhost:8080.

```bash
# run locally
yarn docs:dev
```
