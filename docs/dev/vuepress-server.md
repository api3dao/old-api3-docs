---
title: VuePress Server
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

The VuePress live-reload server is best for development purposes and is the default server. It can be changed in the config.jon file if desired.

By default the VuePress server uses the following `patterns` for files to watch if `patterns` is not present in config.json.

```json
patterns: ['**/*.md', '**/*.vue'],
```

If needed files or an entire folder can be excluded as show below `'!not-this-folder/**'` using (!).

```json
patterns: ['**/*.md', '**/*.vue', '!not-this-folder/**']
```
