---
title: Prettier
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<Fix> These are just notes about what needs to be explained.</Fix>

## Editor Settings

Search on `Editor: Format on Save` and `Editor: Default Formatter`

`yarn add prettier` might be needed

```json
{
  "cSpell.ignoreWords": ["markdownlint"],
  "cSpell.words": ["Keccak", "MYOISTITLE", "errored"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## `.prettierignore`

Always ignore `/pre-alpha`

Now changes without a discussion.

## `.prettierrc`

configuration

Leave printWidth at 80 for those that use a viewer on right side on VS Code.
