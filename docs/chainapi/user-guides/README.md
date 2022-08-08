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

## [Sign Up to use ChainAPI](./signup.md)

<!-- If you change the following paragraph, change it in the associated doc. -->

ChainAPI identifies you through a wallet you own by way of
[MetaMask](https://metamask.io). Other wallets will be supported in the future.
ChainAPI will ask you to sign a message (from within MetaMask) for a particular
wallet account proving your ownership of the account. For the first time you
connect, you will be prompted for your email address which will be linked to a
ChainAPI account. Each time you return to ChainAPI you will connect again, using
MetaMask, to identify yourself by signing a message for the same account.

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
