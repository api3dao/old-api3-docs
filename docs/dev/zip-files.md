---
title: Zip Tutorial Files
---

# {{$frontmatter.title}}

Some tutorials ask the reader to create project folders to run the tutorial.
Rather than creating them manually the reader can download a zip file of the
project ready to go. This is done with the `/libs/zip-files.js` nodejs script.

Each time the script is executed all zip files for all tutorials are updated and
will show up in `git status` as changed. This is due to the header changes to
the zip files regardless if the contents of the zip file changes.

When a new version of the docs is started it will be necessary to update
`zip-files.js` with the new version by adding a function call.

```js
run('v0.3', 'quick-deploy-aws', true);
run('v0.3', 'quick-deploy-local', false);
run('v0.4', 'quick-deploy-aws', true);
run('v0.4', 'quick-deploy-local', false);
...
```

See the code comments in `zip-files.js` for details on the parameters in the
above code.

## Run the Script

Run the script from the root of the `api3-docs` project.

```nodejs
node ./libs/zip-files.js;
```
