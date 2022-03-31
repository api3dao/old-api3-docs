---
title: Getting Started
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

The Build an Airnode guide will discuss, in detail, how an Airnode is constructed. But first, see the [Quick Deploy](../../tutorial/README.md) demo to get a simple understanding of an Airnode deployment. The demo has preconfigured files for a typical deployment.

## Project Folder

Create a folder called `/my-airnode` with two more internal folders named `/config` and `/output`. Create the files config.json, secrets.env and aws.env into the locations show below.

```
my-airnode
├── aws.env
├── config
│   ├── config.json
│   └── secrets.env
└── output
    ├── receipt.json
```

Within this project, build out the configuration files and run the deployment.

## Configuration

The main focus of creating an Airnode is the preparation of three files that both define and support its creation.

- `config.json`: Defines the Airnode and its behavior.
- `secrets.env`: Hold secrets referenced by `config.json` using interpolation.
- `aws.env`: Holds the AWS credentials used by the Docker deployer image to deploy the Airnode to AWS.

## Deployment

Lastly is the deployment. There are two ways to run the Airnode. The most popular is with a cloud provider like AWS. You would use the Docker [deployer image](../docker/../../docker/deployer-image.md) for this type of deployment. This guide (Build an Airnode) will use the deployer image.

The second method is to run a containerized Airnode on a hosted internally or with a cloud provider service (e.g. AWS EC2 or Lightsail). You would use the Docker [client image](../../docker/client-image.md) for this type of deployment.

Complete the following to build and deploy an Airnode.

- [API Integration](api-integration.md)
- [Configuring Airnode](configuring-airnode.md)
- [Applying Authorization](./apply-auth.md) optional
- [Heartbeat](./heartbeat.md) optional
- [HTTP Gateway](./http-gateway.md) optional
- [Deploying Airnode](./deploying-airnode.md)
