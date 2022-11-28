---
title: Overview
folder: How to Guides
docSetName: ChainAPI
basePath: /chainapi
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The **How to Guides** mimic different sections of the ChainAPI UI and provide
insight about the different steps to complete their workflow.

## [Registration](./registration.md)

<!-- If you change the following paragraph, change it in the associated doc. -->

ChainAPI identifies you through a wallet you own by way of
[MetaMask](https://metamask.io). ChainAPI will ask you to sign a message within
MetaMask for a particular wallet account proving your ownership of the account.
For the first time you connect, you will be prompted for your email address
which will be linked to a ChainAPI account.

When you return to ChainAPI, you'll be able to choose whether to login using
your email address or by connecting with your Metamask wallet.

## [Create an Integration](./integrations.md)

<!-- If you change the following paragraph, change it in the associated doc. -->

Setting up an integration is the first step that is required to deploy an
Airnode. Here you will capture the required details for your existing API, which
will be used to populate the files for deploying an Airnode. See
[Deployment Files](../../airnode/v0.7/reference/deployment-files/) in the
Airnode document set for more information.

## [Create a Deployment](./deployments.md)

<!-- If you change the following paragraph, change it in the associated doc. -->

This section will step you through deploying an Airnode using a configuration
that was built when creating an integration. An integration can be used for
multiple deployments if desired. Deployments can be made on AWS or GCP.
