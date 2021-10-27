---
title: Prettier
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Standard formatting for all docs after `/pre-alpha`. If needed run
`yarn add prettier` to install the prettier dependency.

## `/.prettierignore`

Always ignore `/pre-alpha`. It is useful to have a discussion with others before
updating this file.

## `/.prettierrc`

Note the `"printWidth": 80` which allows VS Code to have two panes open
side-by-side, one for the markdown editor and another for a viewer. This allows
the editor content to be mostly in view while editing.

```json
{
  "bracketSpacing": true,
  "printWidth": 80,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "parser": "markdown",
        "proseWrap": "always"
      }
    }
  ]
}
```

## Editor Settings

It is helpful to format on save and to use prettier as the default formatter
over other formatters.

Use VS Code settings.

> Search on `Editor: Format on Save` and `Editor: Default Formatter`

OR update the `.vscode/settings.json` file manually.

```json
{
  "cSpell.ignoreWords": ["markdownlint"],
  "cSpell.words": ["Keccak", "MYOISTITLE", "errored"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```
