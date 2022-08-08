---
title: Overview
folder: Reference > Example Deployment Files
docSetName: ChainAPI
basePath: /chainapi
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<!-- Normally the "Overview" of a section (folder in hte sidebar)
goes into a README.md file which is always the root document in VuePress for a directory.
This cannot be done here because the deployment example files already has a README.md.
-->

ChainAPI creates integrations. Each integration results in a set of downloadable
files used to deploy an Airnode. This section provides copies of how those file
might look. When creating a deployment in ChainAPI you will be instructed to
download a set of integrations files which will download as a zip file. Extract
the zip file to view each file. Below is an example of the configuration files
used to deploy an Airnode to AWS. The name of your zip file, and it extracted
root folder, will differ.

```bash
# peach-guanaco.zip extracts
# to a folder with deployment files.

peach-guanaco
├── aws.env
├── config
│   ├── config.json
│   └── secrets.env
├── output
└── README.md
```

The [README](./README.md) from the zip file contains the instructions on how to
deploy the Airnode
