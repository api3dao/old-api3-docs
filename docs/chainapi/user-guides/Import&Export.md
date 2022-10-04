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

Importing and exporting API integrations allows for easy sharing of integrations across workspaces, making integration backups and other use cases.

## Import OIS

When starting a new integration, you have the option to click “Import OIS” which allows you to paste an integration OIS ([click here](https://docs.api3.org/ois/v1.1/) for more information) that will be used to pre-populate the integration wizard for you. You will then be able to complete the integration wizard.

* If you are importing the OIS for a new integration using a config.json, you will only be able to import an object from the OIS array section from the config.json
* Importing an OIS is only available for new integrations and you are not able to import an OIS for an existing integration


## Export OIS

You can export an integration OIS from one of the below sections:
* Navigate to your integrations, click "Manage Versions" on the integration you want to export. Then click the ellipsis on the right of the version you wish to export and select "Export OIS"
* From the "Manage Versions" page above, you can select "View" for the version you want to export. You will then see an "Export OIS" button on the top right of the page
