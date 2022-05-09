---
title: Overview
---

<TitleSpan>API Providers</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

An **API Provider** is you, if you wish to publish data from your API to on-chain contracts which are called requesters. You can do so by building an Airnode. An Airnode is a first-party oracle that will push off-chain API data to any on-chain requester. See the [Developer](../grp-developers/) section to learn more about how developers will use your Airnode.

See the [Guides](guides/build-an-airnode/) section in the API Provider docs to build the necessary files required to deploy an Airnode. The diagrams below illustrate the required components to successfully deploy an Airnode to AWS, GCP or a Docker Container.

:::: tabs

::: tab AWS

![image](../assets/images/api-provider-overview-aws.png)

1. <p class="diagram-line" style="color:black;"><b>config.json</b>: Contains the Airnode's configuration. The OIS object is important as it maps an API to Airnode endpoints.</p>
2. <p class="diagram-line" style="color:green;margin-top:10px;"><b>secrets.env</b>: Values that should not be exposed in config.json.</p>
3. <p class="diagram-line" style="color:blue;margin-top:10px;">aws.env: AWS credentials required by the Docker deployer image.</p>
4. <p class="diagram-line" style="color:gray;margin-top:10px;"><b>Docker deployer image</b>: Deploys Airnode using its deploy command.</p>

:::

::: tab GCP

![image](../assets/images/api-provider-overview-gcp.png)

1. <p class="diagram-line" style="color:black;"><b>config.json</b>: Contains the Airnode's configuration. The OIS object is important as it maps an API to Airnode endpoints.</p>
2. <p class="diagram-line" style="color:green;margin-top:10px;"><b>secrets.env</b>: Values that should not be exposed in config.json.</p>
3. <p class="diagram-line" style="color:gray;margin-top:10px;"><b>Docker deployer image</b>: Deploys Airnode using its deploy command.</p>

:::

::: tab Container

![image](../assets/images/api-provider-overview-container.png)

1. <p class="diagram-line" style="color:black;"><b>config.json</b>: Contains the Airnode's configuration. The OIS object is important as it maps an API to Airnode endpoints.</p>
2. <p class="diagram-line" style="color:green;margin-top:10px;"><b>secrets.env</b>: Values that should not be exposed in config.json.</p>
3. <p class="diagram-line" style="color:gray;margin-top:10px;"><b>Docker client image</b>: Deploys Airnode using its deploy command.</p>

:::

::::
