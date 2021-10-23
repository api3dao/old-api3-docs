---
title: Common Directory
---

# {{$frontmatter.title}}

The `/common` folder holds files that may be common to different sub-sites. Such
a file is [blog-posts.md](../common/blog-posts.md). The general rule is that a
common file should not contain links to other docs in sub-sites unless the link
is guaranteed to be the same in those sub-sites.

A sub-site can create one or more symlinks, anywhere within itself, to common
files and then use the symlink in its sidebar to render the common file.

```bash
# cd to the directory to place the symlink
# ln -s <path-to-markdown-file> <symlink file-name>
ln -s ../common/blog-posts.md symlink-blog-posts.md
```
