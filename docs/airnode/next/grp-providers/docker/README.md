---
title: Overview
---

<TitleSpan>Docker Images</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Using Docker is the easiest way to both deploy an Airnode and to run an Airnode locally. There are two docker images : the deployer image and the client image. To use these images first install [Docker](https://docs.docker.com/get-docker/) if it is not present on your system.

- The [deployer image](./deployer-image.md) deploys the node in the form of serverless functions to a serverless cloud provider (e.g. AWS Lambda). 

- The [client image](client-image.md) is the node itself, containerized. The container can be run locally or deployed to a cloud hosting service (e.g. AWS EC2 or Lightsail). 

## Development Use Cases

1. Run the client image container locally while developing, use the deployer image  and deploy to a serverless cloud provider such as AWS Lambda.

2. Run two separate Airnodes on different chains, use the deployer image and deploy to a serverless cloud provider such as AWS Lambda.
 
   - One is development using a chain provider url that is pointed to a testnet.
   - Another is production using a chain provider url that is pointed pointed to mainnet. 

Again it should be noted that Airnode can be hosted on a cloud hosting service (e.g. AWS EC2 or Lightsail) rather than a serverless cloud provider (such as AWS Lambda) using the client image.

In either case there are two separate configuration files (`config.json`) for two separate Airnodes. On points to development and the other to production.

## Cloud Provider Credentials

In order to deploy Airnode to a serverless cloud provider like AWS, you need to provide credentials to the deployer image. Airnode currently only supports deploying to AWS. If you are new to AWS watch this [video](https://www.youtube.com/watch?v=KngM5bfpttA) to set up an AWS account.
