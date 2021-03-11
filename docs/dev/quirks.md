---
title: Quirks
---

# {{$frontmatter.title}}

<TocHeader />
[[toc]]

## language does not exist

```bash
4:47:20 PM: Language does not exist: text
4:47:20 PM: Language does not exist: text
```

This message may appear (may times) when running `yarn docs:dev or docs:build`. While the message does not seem to be an issue it is annoying. Adding `NODE_OPTIONS="--max-old-space-size=4096"` seems to help sometimes.

## markdown-links-check

When running the `test:links:prod` or `test:links:next` scripts the following error may be caused by a file with a space in its name.

```bash
ERROR: File not found! Please provide a valid filename as an argument.
```

## Remove origin/gh-pages

May be needed to clear **origin/gh-pages locally** if you do not want it hanging around. Caused by missue of the deploy.sh script. Of course it does not hurt anything to leave it locally.

```bash
git branch -d -r origin/<remote branch name> (This will not delete the branch on the remote repo!)
```

Reference: [https://gist.github.com/magnusbae/10182865](https://gist.github.com/magnusbae/10182865)
