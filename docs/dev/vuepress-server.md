---
title: VuePress Server
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The VuePress live-reload server is best for development purposes and is the default server. It can be changed in the config.jon file if desired.

By default the VuePress server uses the following `patterns` for files to  watch if `patterns` is not present in config.json.

```json
patterns: ['**/*.md', '**/*.vue'],
```

Some folders in the docs contain files that are not used by the docs. The files have been archived in folder call `_deprecated`. The following `patterns` object has been added to config.json to exclude the `_deprecated` folder from being loaded by V the VuePress server.

```json
patterns: ['**/*.md', '**/*.vue', '!**/_deprecated/**']
```
Note that `'!**/_deprecated/**'` is the exclusion.
