---
title: Link Validator
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

This custom Node.js script (`link-validator.js`) validates links with or without attached anchors. 

- my-markdown.md
- my-markdown.md#my-anchor

More than often a heading element such as **## My Heading** gets changed and thus breaks any link that references it. Running `link-validator.js` will locate these broken links. 

The link validator is a manual and time consuming process that should be performed as often as possible. Currently it cannot be run as a GitHub action.

## Step 1: Build the Docs

Build the docs as usual using the standard build command provided by VuePress.

```js
 // From the api3-docs project root
 // Build the docs website 
 yarn docs:build
 
 ```

## Step 2: Start http-server

You can install [http-server](https://www.npmjs.com/package/http-server) globally, `npm install http-server -g` or as a dev dependency, `npm install http-server --save-dev`. 

Start an instance of http-server to serve the docs. Do not use the normal VuePress live reload server as it will not work with the script. 

 ```js
 cd docs/.vuepress/dist
 
 // Start an http-server
 // Do not use the VuePress live reload server
 http-server
 ```

## Step 3: Run the Script

Open a new terminal window to run the script. The script's output will display failures as it steps through each file and its links. There will be a summary of all link failures at the end of the script output.

You can run the Link Validator against the entire `/dist` folder which will validate everything (`/pre-alpha, v1.0, /common, /next, etc.`) but this can be time consuming.

Narrowing the scope of the validation to a particular folder can hasten the validation process.

- /dist/airnode/pre-alpha
- /dist/dao-members
- /dist/common
- /dist/airnode/v1.0
- /dist/airnode/next
- /dist/dev
- /dist/dev-airnode   

Be sure to use the correct port displayed by http-server.

 ```js
 // Open a new terminal window
 // From the api3-docs project root
 // Start the node script
 node link-validator.js  http://127.0.0.1:8080  ./docs/.vuepress/dist/airnode/v1.0
```
