---
title: Overview
---

<TitleSpan>Tutorials</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

The tutorials section of the docs provides some simple guides regarding the setup and use of Airnodes.

The **"Quick"** series of tutorials are simple introductions to setting up an Airnode. The purpose is to demonstrate what is needed to deploy an Airnode. Configuration files are provided with only minor changes to be made on your part.

- **Quick Deploy AWS** or [Deploying Airnode to AWS](./quick-deploy-aws/): This guide is a straight forward starter to create an Airnode on AWS. This deployment type is a typical production environment.

- **Quick Deploy GCP** or [Deploying Airnode to GCP](./quick-deploy-gcp/): This guide is a straight forward starter to create an Airnode on GCP. This deployment type is a typical production environment.

- **Quick Deploy Container** or [Deploying Airnode to a Docker Container](./quick-deploy-container/): This guide is a straight forward starter to create an Airnode locally in a Docker container. This deployment type is a typical development environment although self hosted Docker containers can be used for production environments.

::: tip Monorepo Examples

There are additional examples of Airnode deployments in the [examples package](https://github.com/api3dao/airnode/tree/v0.4/packages/airnode-examples) of the Airnode monorepo.

- Run Airnode as a docker container locally while connected to Rinkeby network.
- Run Airnode as a docker container locally, but connected to the hardhat (local) network.
- Deploy Airnode on AWS and use the Rinkeby network.
- Deploy Airnode on GCP and use the Rinkeby network.

:::
