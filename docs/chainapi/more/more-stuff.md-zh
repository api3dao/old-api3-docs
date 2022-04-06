---
title: More Stuff
---

<TitleSpan>More</TitleSpan>

# {{$frontmatter.title}}


<!-- Uncomment the TOC when needed. --> <!--TocHeader /><TOC class="table-of-contents" :include-level="[2,3]" >

This page is titled **More Stuff** but its name in the sidebar is titled **More Stuff about ChainAPI**. This is not all that practical but it can be done. See line 16 below from hte `sidebar.js` file.

```json{16}
{
    title: 'Introduction',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      '', //README
      'introduction/why-use-chainapi',
    ],
  },
  {
    title: 'More',
    initialOpenGroupIndex: 1,
    collapsable: false,
    children: [
      'more/', // README
      { title: 'More Stuff about ChainAPI', path: 'more/more-stuff' },
    ],
  },
```

If there is no path, then the `README.md` of the directory is displayed. See line 6 and 15.

- Line 6: The path is empty so the README of the `chainapi` folder root is displayed.
- Line 16: The path moves to the `more/` folder but does not include a file so the README of the `more/` folder is displayed.
- Line 17: The JSON object sets the title and the path to a file named `more-stuff.md` but does not use the file's extension.
