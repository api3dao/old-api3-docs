---
title: Link Validation
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

## `link-validator.js`

This custom nodejs script (`/libs/link-validator.js`) only validates links (with or without attached anchors)and images in API3 docs. The link validator is a manual process that should be performed as often as possible. Currently it cannot be run as a GitHub action.

### Step 1: Build the Docs

Build the docs as usual using the standard build command provided by VuePress.

```js
 // From the api3-docs project root
 // Build the docs website
 yarn docs:build

```

### Step 2: Start http-server

You can install [http-server](https://www.npmjs.com/package/http-server) globally, `npm install http-server -g` or as a dev dependency, `yarn add --dev http-server`.

Start an instance of http-server to serve the docs. Do not use the normal VuePress live reload server as it will not work with the script. Use any port desired.

```sh
cd docs/.vuepress/dist

# Start an http-server.
# Do not use the VuePress live reload server.
http-server -p 8082
```

### Step 3: Run the Script

Open a new terminal window to run the script. The script's output will display failures as it steps through each file and its links. There will be a summary of all link failures at the end of the script output.

You can run the Link Validator against the entire `/dist` folder which will validate everything (`/pre-alpha, v0.5, /common, /beacon, etc.`) but this can be time consuming. Narrowing the scope of the validation to a particular folder can hasten the validation process as shown in the code example below. Be sure to use the correct port displayed by http-server.

```sh
# Open a new terminal window.
# Run from the project root.
# Start the nodejs script.
node ./libs/link-validator.js  http://127.0.0.1:8082  ./docs/.vuepress/dist/airnode/v0.5
```

## `link-validator-repos.js`

This custom nodejs script (`/libs/link-validator-repos.js`) validates links (with or without attached anchors) in `api3dao` repos that point back to the https://docs.api3.org documentation site. This validator is a manual process that should be performed as often as possible. Currently it cannot be run as a GitHub action.

This script contains its own rewrite mechanism when it encounters the following patterns found in the links.

- `/airnode/latest`
- `/beacon/latest`
- `/ois/latest`

### Execution

To run this script you must add a file (`myGitHubToken.json`) with a personal GitHub access token.

```json
{ "token": "ghp_hn3WSv9...4QIJ4Q1li2" }
```

Run the script from the root of a local api3-docs repo.

```json
node ./libs/link-validator-repos.js
```
