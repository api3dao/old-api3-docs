---
title: Overview
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />


An **API Provider** is you, if you wish to publish data from your API to on-chain contracts which are called requesters. You can do so by building an Airnode. An Airnode is a first-party oracle that will push off-chain API data to any on-chain requester. See the [Developer](../grp-developers/) section to learn more about how developers will use your Airnode.

See the [Guides](guides/provider/api-integration.md) section in the API Provider docs to build the necessary files required to deploy an Airnode. The diagram below illustrates the basic steps to successfully deploy an Airnode. 

> ![image](../assets/images/api-provider-overview.png)

In summary you only need to do a few things.

- Create cloud provider account if you do not have one.
- Get a blockchain provider URL for the chain you wish to use (mainnet and/or testnet).
- Create the config.json (with an OIS object) and secrets.env files that defines your Airnode.
- Run the Docker image to deploy your Airnode.
