---
title: Overview
docSetName: Airnode v0.6
folder: API Providers > Docker Images
basePath: /airnode/v0.6
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Using Docker is the easiest way to both deploy an Airnode to a cloud provider
and to run an Airnode locally. There are two Docker images: the Airnode deployer
image and the Airnode client image.

There is also a docker image wrapping the admin CLI package, as an alternative
to using `npx`.

To use these images first install [Docker](https://docs.docker.com/get-docker/)
if it is not present on your system.

If using a Linux distribution that enforces Selinux policies, allow the Docker
images access to the host directory by
[creating an appropriate rule](https://stackoverflow.com/questions/24288616/permission-denied-on-accessing-host-directory-in-docker).

- The [deployer image](./deployer-image.md) deploys the node in the form of
  serverless functions to a serverless cloud provider (e.g. AWS Lambda).

- The [client image](client-image.md) is the node itself, containerized. The
  container can be run locally or deployed to a cloud hosting service (e.g. AWS
  EC2 or Lightsail).

- The [admin CLI image](admin-cli-image.md) wraps the admin CLI package in a
  docker image to provide an alternative usage option to the Admin CLI commands
  (npx).

## DockerHub

<airnode-DockerImageVersions/>
