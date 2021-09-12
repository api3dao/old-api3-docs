---
title: Link Validator
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

This custom Node.js script (`link-check.js`) validates links with or without attached anchors. The script is used in supplement the markdown-link-check plugin that is run using the command `test:links:prod` which is also attached to a GitHub action in the project repo. However the markdown-link-check plugin does not validate anchors when attached to links, only the link.

- my-markdown.md
- my-markdown.md#my-anchor

More than often a heading element such as **## My Heading** gets changed and thus breaks any link that references it. Running `link-check.js` will locate such broken links. 

The link validator is a manual and time consuming process that should be performed as often as possible. 

## Step 1: Build the Docs

Build the docs as usual using the standard build command provided by VuePress.

```js
 // Build the docs website from the api3-docs project root
 yarn docs:build
 
 ```

## Step 2: Start http-server

Start an instance of [http-server](https://www.npmjs.com/package/http-server) to serve the docs. Do not use the normal VuePress live reload server as it will not work with the script. 

 ```js
 // Change directories to the build root (dist)
 cd docs/.vuepress/dist
 
 // Start an http-server, do not use the VuePress live reload server
 http-server
 ```

 ## Step 3: Run the Script

Open a new terminal window to run the script. The script's output will display failures as it steps through each file and its links. There will be a summary of all link failures at the end of the script output.

 ```js
 // Open a new terminal window
 // Go to the api3-docs project root
 // Start the node script
 * node link-check.js  http://127.0.0.1:8080  ./docs/.vuepress/dist

```






