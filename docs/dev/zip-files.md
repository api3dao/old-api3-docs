---
title: Zip Tutorial Files
---

# {{$frontmatter.title}}

::: danger Deprecated

As of v0.4 the zip-files.js Nodejs library has been deprecated in favor of a simple manual zip file build.

:::

## v0.3 Only

Some tutorials ask the reader to create project folders to run the tutorial. Rather than creating them manually the reader can download a zip file of the project ready to go. This is done with the `/libs/zip-files.js` nodejs script for `v0.3` only of the docs.

Each time the script is executed all zip files for the `v0.3` tutorials are updated and will show up in `git status` as changed. This is due to the header changes to the zip files regardless if the contents of the zip file changes.

```js
run('v0.3', 'quick-deploy-aws', 'aws');
run('v0.3', 'quick-deploy-gcp', 'gcp');
run('v0.3', 'quick-deploy-container', 'local');
...
```

See the code comments in `zip-files.js` for details on the parameters in the above code.

Run the script from the root of the `api3-docs` project.

```nodejs
node ./libs/zip-files.js;
```

## After v0.3 use Manual Method

The directory structure for the tutorial `/src` folders have been changed to mimic the actual project the reader will download. Therefore it is easier to compress the project folders (e.g., `/quick-deploy-aws`) in place, rename the zip files and move them to `/docs/.vuepress/public/assets/zip-files/...`. Using this method also allows for an individual zip file to be updated.

```
public
└── zip-files
    └── quick-deploy-aws
        ├── quick-deploy-aws-v0.3.zip
        ├── quick-deploy-aws-v0.4.zip
        ├── quick-deploy-container-v0.3.zip
        ├── quick-deploy-container-v0.4.zip
        ├── quick-deploy-gcp-v0.3.zip
        └── quick-deploy-gcp-v0.4.zip
```
