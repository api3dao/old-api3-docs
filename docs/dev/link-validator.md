---
title: Link Validator
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

This custom nodejs script (`/libs/link-validator.js`) validates links (with or
without attached anchors), images, static redirects and external links in the
monorepo packages that point back to docs.api3.org. The link validator is a
manual and time consuming process that should be performed as often as possible.
Currently it cannot be run as a GitHub action.

## Redirects and Monorepo READMEs

Redirects are handled by reading the actual redirects from a copy of the file
`redirects` renamed as (`redirects-sync `) that is moved to the `/dist` folder
after building the docs. This is an automated process that is only noted here to
understand the need for the script named `sync:build:redirects`. The same is
true for the `monorepo-readme` file renamed as `monorepo-readme-sync`.

The link validator validates any link in the mono repo package READMEs that
point back to the docs. A list of READMEs that are scanned are held in
`/libs/monorepo-readmes`. It is necessary to add the `vX.X` tags from the
monorepo to this file. New tags should be added as soon as they are available.

```json
"docs:build": "yarn sync:navbar; yarn sync:sidebar; yarn sync:searchbox; vuepress build docs; yarn sync:build:redirects; yarn sync:build:monorepo-readmes;"

"sync:build:redirects": "cp docs/.vuepress/redirects docs/.vuepress/dist/redirects-sync;",
"sync:build:monorepo-readmes": "cp libs/monorepo-readmes docs/.vuepress/dist/monorepo-readmes-sync"
```

## Execution

Execution is a three step process.

### Step 1: Build the Docs

Build the docs as usual using the standard build command provided by VuePress.

```js
 // From the api3-docs project root
 // Build the docs website
 yarn docs:build

```

### Step 2: Start http-server

You can install [http-server](https://www.npmjs.com/package/http-server)
globally, `npm install http-server -g` or as a dev dependency,
`yarn add --dev http-server `.

Start an instance of http-server to serve the docs. Do not use the normal
VuePress live reload server as it will not work with the script.

```js
cd docs/.vuepress/dist

// Start an http-server.
// Do not use the VuePress live reload server.
http-server -p 8082
```

### Step 3: Run the Script

Open a new terminal window to run the script. The script's output will display
failures as it steps through each file and its links. There will be a summary of
all link failures at the end of the script output.

You can run the Link Validator against the entire `/dist` folder which will
validate everything (`/pre-alpha, v0.2, /common, /next, etc.`) but this can be
time consuming.

Narrowing the scope of the validation to a particular folder can hasten the
validation process.

- /dist/airnode/pre-alpha
- /dist/dao-members
- /dist/common
- /dist/airnode/v0.2
- /dist/airnode/next
- /dist/dev
- /dist/dev-airnode

Be sure to use the correct port displayed by http-server.

```sh
// Open a new terminal window.
// Run from the project root.
// Start the nodejs script.
node ./libs/link-validator.js  http://127.0.0.1:8082  ./docs/.vuepress/dist/airnode/v0.3
```
