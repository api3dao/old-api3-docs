---
title: Getting Started
folder: API Providers > Build an Airnode
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The Build an Airnode guide will discuss, in detail, how an Airnode is
constructed. But first, see the [Quick Deploy](../../tutorial/README.md) demos
to get a simple understanding of an Airnode deployment. The demos
[Quick Deploy AWS](../../tutorial/quick-deploy-aws/) and
[Quick Deploy GCP](../../tutorial/quick-deploy-gcp/) each have preconfigured
downloadable project folders with files for a typical deployment. This guide
primarily focuses on a deployment to AWS but describes changes that are needed
for GCP deployments when encountered.

## Project Folder

Create a folder called `/my-airnode` with one more internal folder named
`/config`. Add the files `config.json`, `secrets.env`, and `aws.env` as shown
below. Optionally add `gcp.json` if you intend to deploy to GCP as well.

```
my-airnode
├── aws.env     <- For AWS deployment
├── gcp.json    <- Optional for GCP deployment
├── config
    ├── config.json
    └── secrets.env
```

This guide will explain the content of the configuration files and run the
deployment within this project folder. Use the files in the
[Templates](../../../reference/templates/config-json.md) section of the docs to
get a jump start if you are new to Airnode. Also consider the
[Quick Deploy Demos](../../tutorial/) if you are new to Airnode before using
this guide.

## Configuration

The main focus while creating an Airnode is the preparation of three files (two
for GCP) that both define and support its creation.

- `config.json`: Defines the Airnode and its behavior.
- `secrets.env`: Hold secrets referenced by `config.json` using interpolation.
- `aws.env`: Holds the AWS credentials used by the Docker deployer image to
  deploy the Airnode to AWS.
- `gcp.json`: (GCP) only) Holds the GCP project ID and associated information
  used by the Docker deployer image to deploy the Airnode to GCP.

## Deployment

Last is the deployment. There are two ways to run the Airnode. The most popular
is with a cloud provider like AWS or GCP. You would use the Docker
[Airnode Deployer Image](../docker/../../docker/deployer-image.md) for this type
of deployment. This guide will use the deployer image.

The second method is to run a containerized Airnode hosted internally or with a
cloud provider service (e.g. AWS EC2 or Lightsail). Use the Docker
[Airnode Client Image](../../docker/client-image.md) for this type of
deployment.

Complete the following sections for an in-depth understanding of Airnode.

- [API Integration](api-integration.md)
- [API Security](api-security.md)
- [Configuring Airnode](configuring-airnode.md)
- [Using Authorizers](./apply-auth.md) optional
- [Heartbeat](./heartbeat.md) optional
- [HTTP Gateways](./http-gateways.md) optional
- [Deploying Airnode](./deploying-airnode.md)
