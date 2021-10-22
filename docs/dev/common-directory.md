---
title: Common Directory
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The `/common` folder holds files that may be common to different sub-site. Such
a file is [Why use Airnode?](../common/why-use-airnode.md).

A sub-site can create one or more symlinks, anywhere within itself, to common
files and then use the symlink in its sidebar to render the common file.

```bash
# cd to the directory to place the symlink
# ln -s <path-to-markdown-file> <symlink file-name>
ln -s ../common/why-use-airnode.md symlink-why-use-airnode.md
```

## Airnode Version

<Fix>This is not right.</Fix> Markdown links within the common files would work
as expected except for the Airnode versions. If two Airnode versions reference
the same file, how would the common file know which version to link to.

The solution is to use the **CommonLink** Vue component within `/common` files
rather than markdown links.

```html
<CommonLink
  :path="'../airnode/<version>/grp-providers/guides/build-an-airnode/#configuration'"
>
  Build an Airnode
</CommonLink>
```
