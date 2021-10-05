---
title: Overview
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Using Docker is the easiest way to both deploy an Airnode and to run an Airnode locally. There are two docker images for each: the deployer image and the client image. 

- The [deployer image](./deployer-image.md) deploys the node in the form of serverless functions to a cloud provider (e.g. AWS Lambda). 

- The [client image](client-image.md) is the node itself, containerized. The container can be run locally or deployed to the cloud (e.g. AWS EC2 or Lightsail). 

## Development Use Cases

1. You can run the client image container locally while developing, and use the deployer image to deploy the serverless functions for production.

2. Run an Airnode that responds to two chains using the deployer image.
 
   - One is development using a chain provider url that is pointed pointed to a testnet.
   - Another is production using a chain provider url that is pointed pointed to mainnet. 
   
## Cloud Provider Credentials

In order to deploy Airnode to a cloud provider like AWS, you need to provide your cloud credentials to the container. Airnode currently only supports deploying to AWS.
