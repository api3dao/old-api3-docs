---
title: Overview
---

<TitleSpan>API Providers</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/> An **API Provider** is you, if you wish to publish data from your API to on-chain contracts which are called requesters. You can do so by building an Airnode. An Airnode is a first-party oracle that will push off-chain API data to any on-chain requester. See the [Developer](../grp-developers/) section to learn more about how developers will use your Airnode.

See the [Guides](guides/build-an-airnode/api-integration.md) section in the API Provider docs to build the necessary files required to deploy an Airnode. The diagram below illustrates the basic steps to successfully deploy an Airnode.

> ![image](../assets/images/api-provider-overview.png)
> 
> 1. <p class="diagram-line" style="color:black;">config.json: Contains the Airnode's 
>    configuration. The OIS object is important as it maps an API to Airnode endpoints.</p>
> 
> 2. <p class="diagram-line" style="color:green;margin-top:10px;">secrets.env: Values 
>    that should not be exposed in config.json.</p>
> 
> 3. <p class="diagram-line" style="color:blue;margin-top:10px;">aws.env: AWS 
>    credentials required by the Docker deployer image.</p>

In summary you only need to do a few things.

- Create cloud provider credentials (AWS), add them to [aws.env](../reference/templates/aws-env.md).
- Get a blockchain provider URL for the chain you wish to use (mainnet and/or a test network).
- Create the [config.json](../reference/templates/config-json.md) (with an OIS object) that defines an Airnode and place any secret values in and [secrets.env](../reference/templates/secrets-env.md).
- Run the Docker [deployer-image](./docker/deployer-image.md) to deploy the Airnode.
