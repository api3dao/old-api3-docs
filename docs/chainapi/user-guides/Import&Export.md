---
title: Import & Export OIS
folder: How to Guides
docSetName: ChainAPI
basePath: /chainapi
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Importing and exporting allows for easy sharing of integrations
across workspaces, making integration backups and other use cases.

## Import OIS

When adding a new integration, you have the option to click “Import OIS” which
allows you to paste an OIS
([click here](https://docs.api3.org/ois/latest/) for more information) that will
be used to pre-populate the integration wizard for you. You will then be able to
complete the integration.

::: tip Important notes
- Importing an OIS is only available for new integrations
- If you are using a config.json file, copy the OIS object from within the array and paste
into the text area provided ([click here](https://docs.api3.org/ois/latest/example.html) for an example OIS object).
:::

## Export OIS

You can export an OIS from one of the below sections:

**Manage Versions page**
1. navigate to your integrations by clicking "Integrate" on the sidebar
2. click "Manage Versions" on the integration you
   want to export
3. click the ellipsis on the right of the version you wish
   to export
4. select "Export OIS"

**View Version page**
1. navigate to your integrations by clicking "Integrate" on the sidebar
2. click "Manage Versions" on the integration you
   want to export
3. select "View" for the version you wish to export
4. click "Export OIS" on the top right of the page