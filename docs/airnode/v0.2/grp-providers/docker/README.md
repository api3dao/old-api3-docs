---
title: Overview
---

<TitleSpan>Docker Images</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Using Docker is the easiest way to both deploy an Airnode to a cloud provider
and to run an Airnode locally. There are two Docker images: the Airnode deployer
image and the Airnode client image. To use these images first install
[Docker](https://docs.docker.com/get-docker/) if it is not present on your
system.

- The [Airnode deployer image](./deployer-image.md) deploys the node in the form
  of serverless functions to a serverless cloud provider (e.g. AWS Lambda).

- The [Airnode client image](client-image.md) is the node itself, containerized.
  The container can be run locally or deployed to a cloud hosting service (e.g.
  AWS EC2 or Lightsail).

## DockerHub

Both the Airnode client image and deployer image are available on DockerHub. It
is not required to download these manually. When you run the Docker commands
provided these images will be downloaded to Docker automatically.

- [Airnode deployer image](https://hub.docker.com/r/api3/airnode-deployer)
- [Airnode client image](https://hub.docker.com/r/api3/airnode-client)

Both the deployer and client images pair with a particular
[nodeVersion](../../reference/deployment-files/config-json.md#nodeversion)
from the [config.json](../../reference/examples/config-json.md) file. For
convenience there is an under-specified version (e.g., `0.2`) and the`latest`
version. Simply use the deployer or client image version that matches the
`nodeVersion` from your config.json file.

| Deployer or Client Image | nodeVersion |
| ------------------------ | ----------- |
| 0.2.2                    | 0.2.2       |
| 0.2                      | 0.2.2       |
| latest                   | 0.2.2       |
