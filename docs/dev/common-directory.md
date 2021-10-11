---
title: Common Directory
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

```bash
# cd to the directory to place the symlink
# ln -s <path-to-markdown-file> <symlink file-name>
ln -s ../../enormous/dao-tracker.md dao-tracker.md
```

## Internal Links

<Fix>Needs write-up.</Fix>

This will not work as a **markdown link**, the sidebar goes away.<br/>
[Go to contribute](../common/introduction/contributing.md)

Goes directly to Airnode `/next`, **markdown link** with full path.<br/>
[Go to contribute in /next](/airnode/next/introduction/contributing.md)

Uses the current version, works only when in Airnode, using **CommonLink**.<br/>
Click <CommonLink :path="'/airnode/<version>/introduction/contributing.md'">/airnode/-version-/introduction/contributing.md</CommonLink> to see the doc.
- &#60;CommonLink :path="'/airnode/&#60;version>Using the current version&#60;/CommonLink>
- :path="'/airnode/&#60;version>/introduction/contributing.md'"

Goes directly to Airnode /next, using **CommonLink**.<br/>
Click <CommonLink :path="'/airnode/next/introduction/contributing.md'">/airnode/next/introduction/contributing.md</CommonLink> to see the doc.

Goes directly to Airnode /next

- [dev](/dev/) **Markdown Link**
- Click <CommonLink :path="'/dev'">/dev</CommonLink> to see the doc. **CommonLink**
