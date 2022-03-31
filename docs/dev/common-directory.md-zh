---
title: Common Directory
---

# {{$frontmatter.title}}

The `/common` folder holds files that may be common to different document sets. Such a file is [blog-posts.md](../common/blog-posts.md). The general rule is that a common file should not contain links to other docs in document sets unless the link is guaranteed to be the same in those document sets.

A document set can create one or more symlinks, anywhere within itself, to common files and then use the symlink in its sidebar to render the common file.

```bash
# cd to the directory to place the symlink
# ln -s <path-to-markdown-file> <symlink file-name>
ln -s ../common/blog-posts.md symlink-blog-posts.md
```

::: danger Warning

Use the `/common` folder with caution. It is difficult to link to other internal docs content from docs within `/common`. See the `CommonLink.vue` component but think hard about using it.

:::
