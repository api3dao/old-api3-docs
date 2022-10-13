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

Importing and exporting allows for easy sharing of integrations across
workspaces, making integration backups and other use cases. Read more about OIS
[here](https://docs.api3.org/ois/v1.2/).

## Import OIS

When adding a new integration, you have the option to click **Import OIS** which
allows you to paste an OIS that will be used to pre-populate the integration for
you. You will then be able to complete the integration.

::: tip Important Notes

- Importing an OIS is only available for new integrations
- If you are using a config.json file, copy the OIS object from within the array
  and paste into the text area provided
  ([click here](https://docs.api3.org/ois/v1.2/example.html) for an example OIS
  object)

  :::

## Export OIS

You can export an OIS from one of the below sections:

**Manage Versions page**

1. Navigate to your integrations by clicking **Integrate** on the sidebar.
2. Click **Manage Versions** on the integration you want to export.
3. Click the ellipsis on the right of the version you wish to export.
4. Select **Export OIS**.

**View Version page**

1. Navigate to your integrations by clicking **Integrate** on the sidebar.
2. Click **Manage Versions** on the integration you want to export.
3. Select **View** for the version you wish to export.
4. Click **Export OIS** on the top right of the page.

In the modal that appears, you have two options to export your OIS:

- **Download OIS** will download a .json file containing your OIS, this can then
  be used to backup your OIS or at a later date for import purposes
- **Copy** will copy your OIS which you can then paste directly into the
  **Import OIS** text box or add it to an external file
